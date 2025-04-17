import os
import requests
import logging
import jwt  # Added for JWT decoding
from django.shortcuts import redirect, render
from django.contrib.auth.decorators import login_required  # Added for success_page decorator
from django.contrib.auth import authenticate, login
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from django.contrib.auth import get_user_model
from django.conf import settings
from decouple import config
from django.core.cache import cache
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.exceptions import TokenError
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from django.core.mail import send_mail
from django.urls import reverse
from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator
from django.core.exceptions import ValidationError
from django.utils import timezone
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.contrib.auth.tokens import default_token_generator
from rest_framework.permissions import AllowAny
from collections import defaultdict
from datetime import datetime

from .models import User
from .serializers import (
    UserSerializer,
    LoginSerializer,
    LogoutSerializer,
    PasswordResetSerializer,
    PasswordResetConfirmSerializer,
    get_tokens_for_user
)

logger = logging.getLogger(__name__)

# Google OAuth settings
GOOGLE_CLIENT_ID = config("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = config("GOOGLE_CLIENT_SECRET")
GOOGLE_REDIRECT_URI = "http:/127.0.0.1:8000/api/accounts/google/callback/"  # use HTTPS in prod

# Simple rate limiting using cache for persistence across workers
def check_rate_limit(ip, limit=5, window=60):
    key = f"rate_limit_{ip}"
    count = cache.get(key, 0)
    if count >= limit:
        return True
    cache.set(key, count + 1, timeout=window)
    return False


def validate_password_strength(password):
    if len(password) < 8:
        raise ValidationError("Password must be at least 8 characters long")
    if not any(c.isupper() for c in password):
        raise ValidationError("Password must contain at least one uppercase letter")
    if not any(c.islower() for c in password):
        raise ValidationError("Password must contain at least one lowercase letter")
    if not any(c.isdigit() for c in password):
        raise ValidationError("Password must contain at least one number")
    if not any(c in '!@#$%^&*()_+-=[]{}|;:,.<>?' for c in password):
        raise ValidationError("Password must contain at least one special character")


def check_login_attempts(email):
    attempts = cache.get(f'login_attempts_{email}', 0)
    if attempts >= 5:
        lockout_time = cache.get(f'account_lockout_{email}')
        if lockout_time and lockout_time > timezone.now():
            remaining = int((lockout_time - timezone.now()).total_seconds() / 60)
            raise ValidationError(f"Account locked. Try again in {remaining} minutes.")
        cache.delete(f'account_lockout_{email}')
        cache.delete(f'login_attempts_{email}')

# Password Reset and Confirm views unchanged
class PasswordResetView(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = PasswordResetSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

    @method_decorator(ratelimit(key='ip', rate='3/h', method=['POST']))
    def post(self, request):
        if getattr(request, 'limited', False):
            return Response({"error": "Too many password reset attempts."}, status=status.HTTP_429_TOO_MANY_REQUESTS)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        reset_attempts = cache.get(f'reset_attempts_{email}', 0)
        if reset_attempts >= 3:
            return Response({"error": "Too many reset attempts."}, status=status.HTTP_429_TOO_MANY_REQUESTS)
        try:
            user = User.objects.get(email=email)
            token = default_token_generator.make_token(user)
            uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
            reset_path = reverse('password-reset-confirm', args=[uidb64, token])
            reset_url = request.build_absolute_uri(reset_path)
            send_mail(
                subject="Password Reset",
                message=f"Reset link: {reset_url}",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[email],
                fail_silently=False
            )
            cache.set(f'reset_attempts_{email}', reset_attempts + 1, timeout=3600)
            logger.info(f"Password reset requested for {email}")
            return Response({"message": "Password reset email sent."}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"message": "If this email is registered, you will receive a reset link."}, status=status.HTTP_200_OK)

class PasswordResetConfirmView(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = PasswordResetConfirmSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

    def post(self, request, uidb64, token):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except Exception:
            return Response({"error": "Invalid or expired token."}, status=status.HTTP_400_BAD_REQUEST)
        if not default_token_generator.check_token(user, token):
            return Response({"error": "Invalid or expired token."}, status=status.HTTP_400_BAD_REQUEST)
        new_password = serializer.validated_data['password']
        validate_password_strength(new_password)
        if user.check_password(new_password):
            return Response({"error": "New password must differ from old."}, status=status.HTTP_400_BAD_REQUEST)
        user.set_password(new_password)
        user.save()
        cache.delete(f'reset_attempts_{user.email}')
        logger.info(f"Password reset successful for {user.email}")
        return Response({"message": "Password reset successful."}, status=status.HTTP_200_OK)

class SignupView(generics.GenericAPIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = UserSerializer
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        password = serializer.validated_data.get('password')
        validate_password_strength(password)
        user = serializer.save(is_active=False)
        uidb64 = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        verify_path = reverse('verify-email')
        verification_url = request.build_absolute_uri(f"{verify_path}?uid={uidb64}&token={token}")
        send_mail(
            subject="Verify your email",
            message=f"Click to verify: {verification_url}",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
            fail_silently=False
        )
        logger.info(f"New signup: {user.email}")
        return Response({"message": "Registration successful. Check email to verify."}, status=status.HTTP_201_CREATED)

class VerifyEmailView(APIView):
    permission_classes = (AllowAny,)

    def get(self, request):
        uidb64 = request.GET.get('uid')
        token = request.GET.get('token')
        try:
            uid = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(pk=uid)
        except Exception:
            return Response({"error": "Invalid verification link."}, status=status.HTTP_400_BAD_REQUEST)
        if not default_token_generator.check_token(user, token):
            return Response({"error": "Expired or invalid token."}, status=status.HTTP_400_BAD_REQUEST)
        user.is_active = True
        user.email_verified = True
        user.save()
        logger.info(f"Email verified: {user.email}")
        return Response({"message": "Email verified. Please log in."}, status=status.HTTP_200_OK)

class LoginView(APIView):
    permission_classes = (permissions.AllowAny,)
    serializer_class = LoginSerializer

    @method_decorator(ratelimit(key='ip', rate='5/m', method=['POST']))
    def post(self, request):
        if getattr(request, 'limited', False):
            return Response({"error": "Too many login attempts."}, status=status.HTTP_429_TOO_MANY_REQUESTS)
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']
        try:
            check_login_attempts(email)
        except ValidationError as e:
            return Response({"error": str(e)}, status=status.HTTP_429_TOO_MANY_REQUESTS)
        user = authenticate(request, email=email, password=password)
        if not user:
            cache.set(f'login_attempts_{email}', cache.get(f'login_attempts_{email}', 0) + 1, timeout=3600)
            logger.warning(f"Failed login: {email}")
            return Response({"error": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)
        if not user.is_active:
            return Response({"error": "Please verify your email first."}, status=status.HTTP_401_UNAUTHORIZED)
        cache.delete(f'login_attempts_{email}')
        cache.delete(f'account_lockout_{email}')
        logger.info(f"Login successful: {email}")
        tokens = get_tokens_for_user(user)
        return Response({"message": "Login successful", "tokens": tokens}, status=status.HTTP_200_OK)

class LogoutView(APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        serializer = LogoutSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        refresh_token = serializer.validated_data['refresh']
        try:
            token = RefreshToken(refresh_token)
            token.blacklist()
            logger.info(f"Logout: {request.user.email}")
            return Response({"message": "Logged out."}, status=status.HTTP_200_OK)
        except TokenError:
            return Response({"error": "Invalid token."}, status=status.HTTP_400_BAD_REQUEST)

@login_required
def success_page(request):
    user = request.user
    refresh = RefreshToken.for_user(user)
    return render(request, 'success.html', {
        'access_token': str(refresh.access_token),
        'refresh_token': str(refresh),
        'user': user,
    })

def rate_limit_view(request, exception):
    return Response({"error": "Rate limit exceeded."}, status=status.HTTP_429_TOO_MANY_REQUESTS)

class GoogleLoginView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request):
        url = (
            f"https://accounts.google.com/o/oauth2/v2/auth?"
            f"client_id={GOOGLE_CLIENT_ID}&"
            f"redirect_uri={GOOGLE_REDIRECT_URI}&"
            f"response_type=code&"
            f"scope=openid%20email%20profile"
        )
        return Response({"auth_url": url})

class GoogleCallbackView(APIView):
    permission_classes = (permissions.AllowAny,)
    def get(self, request):
        code = request.GET.get('code')
        if not code:
            return Response({"error": "Authorization code missing."}, status=status.HTTP_400_BAD_REQUEST)
        try:
            token_resp = requests.post(
                'https://oauth2.googleapis.com/token',
                data={'code': code,
                      'client_id': GOOGLE_CLIENT_ID,
                      'client_secret': GOOGLE_CLIENT_SECRET,
                      'redirect_uri': GOOGLE_REDIRECT_URI,
                      'grant_type': 'authorization_code'}
            )
            token_resp.raise_for_status()
            id_token = token_resp.json().get('id_token')
            user_info = jwt.decode(id_token, options={"verify_signature": False})
            email = user_info.get('email')
            user, created = User.objects.get_or_create(
                email=email,
                defaults={'username': email, 'is_active': True, 'email_verified': True}
            )
            if created:
                user.set_unusable_password()
                user.save()
            tokens = get_tokens_for_user(user)
            return Response({"message": "Login successful", "tokens": tokens}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Google OAuth error: {e}")
            return Response({"error": "Google login failed."}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Root endpoint
def accounts_root_view(request):
    return Response({"message": "Welcome to the Accounts API!"})
