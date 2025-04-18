// import React, { useState, useEffect } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { CheckCircle2, XCircle, RefreshCw, Mail } from 'lucide-react';

// const EmailVerification = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
//   const [countdown, setCountdown] = useState(60);

//   const email = searchParams.get('email') || '';
//   const token = searchParams.get('token') || '';

//   useEffect(() => {
//     // Simulate verification process
//     const timer = setTimeout(() => {
//       // Here you would typically make an API call to verify the token
//       setVerificationStatus(token ? 'success' : 'error');
//     }, 2000);

//     return () => clearTimeout(timer);
//   }, [token]);

//   useEffect(() => {
//     if (verificationStatus === 'error' && countdown > 0) {
//       const timer = setInterval(() => {
//         setCountdown(prev => prev - 1);
//       }, 1000);

//       return () => clearInterval(timer);
//     }
//   }, [verificationStatus, countdown]);

//   const handleResendVerification = () => {
//     // Here you would typically make an API call to resend the verification email
//     setCountdown(60);
//   };

//   const handleContinue = () => {
//     navigate('/');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg"
//       >
//         <div className="text-center">
//           <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-[#FFF5F2]">
//             <Mail className="h-8 w-8 text-[#FF5733]" />
//           </div>
//           <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Email Verification</h2>
//           <p className="mt-2 text-sm text-gray-600">
//             {verificationStatus === 'loading' ? (
//               'Verifying your email address...'
//             ) : verificationStatus === 'success' ? (
//               'Your email has been verified successfully!'
//             ) : (
//               `We sent a verification link to ${email}`
//             )}
//           </p>
//         </div>

//         <div className="mt-8">
//           {verificationStatus === 'loading' ? (
//             <div className="flex justify-center">
//               <RefreshCw className="h-8 w-8 text-[#FF5733] animate-spin" />
//             </div>
//           ) : verificationStatus === 'success' ? (
//             <div className="space-y-6">
//               <div className="flex justify-center">
//                 <CheckCircle2 className="h-16 w-16 text-green-500" />
//               </div>
//               <button
//                 onClick={handleContinue}
//                 className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-[#FF5733] hover:bg-[#ff4019] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5733]"
//               >
//                 Continue to Homepage
//               </button>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               <div className="flex justify-center">
//                 <XCircle className="h-16 w-16 text-red-500" />
//               </div>
//               <div className="text-center text-sm text-gray-600">
//                 <p>Didn't receive the email? Check your spam folder or</p>
//                 <button
//                   onClick={handleResendVerification}
//                   disabled={countdown > 0}
//                   className={`mt-2 font-medium ${
//                     countdown > 0 
//                       ? 'text-gray-400 cursor-not-allowed' 
//                       : 'text-[#FF5733] hover:text-[#ff4019]'
//                   }`}
//                 >
//                   {countdown > 0 
//                     ? `Resend email in ${countdown}s` 
//                     : 'Click to resend verification email'}
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="mt-4 text-center">
//           <button
//             onClick={() => navigate('/')}
//             className="text-sm font-medium text-[#FF5733] hover:text-[#ff4019]"
//           >
//             Return to Homepage
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default EmailVerification;



// import React, { useState, useEffect } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { CheckCircle2, XCircle, RefreshCw, Mail } from 'lucide-react';

// const API_BASE_URL = "http://localhost:8000/api/auth"; // Change if needed

// const EmailVerification = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
  
//   // State for verification status and a countdown for resending verification email.
//   const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
//   const [countdown, setCountdown] = useState(60);

//   const token = searchParams.get('token') || '';
//   const email = searchParams.get('email') || '';

//   useEffect(() => {
//     // Call the backend to verify the email using the token as key.
//     if (token) {
//       fetch(`${API_BASE_URL}/register/verify-email/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ key: token }),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.detail === "ok") {
//             setVerificationStatus('success');
//           } else {
//             setVerificationStatus('error');
//           }
//         })
//         .catch(() => setVerificationStatus('error'));
//     } else {
//       setVerificationStatus('error');
//     }
//   }, [token]);

//   useEffect(() => {
//     if (verificationStatus === 'error' && countdown > 0) {
//       const timer = setInterval(() => {
//         setCountdown((prev) => prev - 1);
//       }, 1000);
//       return () => clearInterval(timer);
//     }
//   }, [verificationStatus, countdown]);

//   const handleResendVerification = () => {
//     // Here you would call an endpoint to resend the verification email.
//     // For demonstration, we reset the countdown.
//     setCountdown(60);
//     alert("Verification email resent (simulate API call).");
//   };

//   const handleContinue = () => {
//     navigate('/');
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg"
//       >
//         <div className="text-center">
//           <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-[#FFF5F2]">
//             <Mail className="h-8 w-8 text-[#FF5733]" />
//           </div>
//           <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Email Verification</h2>
//           <p className="mt-2 text-sm text-gray-600">
//             {verificationStatus === 'loading'
//               ? 'Verifying your email address...'
//               : verificationStatus === 'success'
//               ? 'Your email has been verified successfully!'
//               : `We sent a verification link to ${email}`}
//           </p>
//         </div>

//         <div className="mt-8">
//           {verificationStatus === 'loading' ? (
//             <div className="flex justify-center">
//               <RefreshCw className="h-8 w-8 text-[#FF5733] animate-spin" />
//             </div>
//           ) : verificationStatus === 'success' ? (
//             <div className="space-y-6">
//               <div className="flex justify-center">
//                 <CheckCircle2 className="h-16 w-16 text-green-500" />
//               </div>
//               <button
//                 onClick={handleContinue}
//                 className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-[#FF5733] hover:bg-[#ff4019]"
//               >
//                 Continue to Homepage
//               </button>
//             </div>
//           ) : (
//             <div className="space-y-6">
//               <div className="flex justify-center">
//                 <XCircle className="h-16 w-16 text-red-500" />
//               </div>
//               <div className="text-center text-sm text-gray-600">
//                 <p>Didn't receive the email? Check your spam folder or</p>
//                 <button
//                   onClick={handleResendVerification}
//                   disabled={countdown > 0}
//                   className={`mt-2 font-medium ${
//                     countdown > 0
//                       ? 'text-gray-400 cursor-not-allowed'
//                       : 'text-[#FF5733] hover:text-[#ff4019]'
//                   }`}
//                 >
//                   {countdown > 0
//                     ? `Resend email in ${countdown}s`
//                     : 'Click to resend verification email'}
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="mt-4 text-center">
//           <button
//             onClick={() => navigate('/')}
//             className="text-sm font-medium text-[#FF5733] hover:text-[#ff4019]"
//           >
//             Return to Homepage
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default EmailVerification;



// // EmailVerification.tsx
// import React, { useState, useEffect } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { CheckCircle2, XCircle, RefreshCw, Mail } from 'lucide-react';

// const API_BASE_URL = "http://localhost:8000/api/auth"; // Adjust as needed

// const EmailVerification = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');

//   // Assuming your email confirmation link is structured with a query param:
//   // http://localhost:5173/email/confirm?token=...
//   const token = searchParams.get('token') || '';

//   useEffect(() => {
//     if (token) {
//       fetch(`${API_BASE_URL}/register/verify-email/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ key: token }),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.detail === "ok") {
//             setVerificationStatus('success');
//           } else {
//             setVerificationStatus('error');
//           }
//         })
//         .catch(() => setVerificationStatus('error'));
//     } else {
//       setVerificationStatus('error');
//     }
//   }, [token]);

//   // If verification is successful, automatically redirect after 2 seconds
//   useEffect(() => {
//     if (verificationStatus === 'success') {
//       setTimeout(() => {
//         navigate("http://127.0.0.1:5173");
//       }, 2000);
//     }
//   }, [verificationStatus, navigate]);

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg"
//       >
//         <div className="text-center">
//           <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-[#FFF5F2]">
//             <Mail className="h-8 w-8 text-[#FF5733]" />
//           </div>
//           <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Email Verification</h2>
//           <p className="mt-2 text-sm text-gray-600">
//             {token
//               ? (verificationStatus === 'loading'
//                   ? 'Verifying your email address...'
//                   : verificationStatus === 'success'
//                   ? 'Your email has been verified successfully! Redirecting...'
//                   : 'Verification failed, please try again.')
//               : 'A verification email has been sent to your inbox. Please click the link in your email.'}
//           </p>
//         </div>

//         {verificationStatus === 'loading' && token && (
//           <div className="flex justify-center">
//             <RefreshCw className="h-8 w-8 text-[#FF5733] animate-spin" />
//           </div>
//         )}

//         {verificationStatus === 'success' && token && (
//           <div className="flex justify-center">
//             <CheckCircle2 className="h-16 w-16 text-green-500" />
//           </div>
//         )}

//         {verificationStatus === 'error' && token && (
//           <div className="flex justify-center">
//             <XCircle className="h-16 w-16 text-red-500" />
//           </div>
//         )}

//         <div className="mt-4 text-center">
//           <button
//             onClick={() => navigate('/')}
//             className="text-sm font-medium text-[#FF5733] hover:text-[#ff4019]"
//           >
//             Return to Homepage
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default EmailVerification;


// src/pages/EmailVerification.tsx


// import React, { useState, useEffect } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { CheckCircle2, XCircle, RefreshCw, Mail } from 'lucide-react';

// const EmailVerification = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');

//   // Get token from URL query params
//   const token = searchParams.get('') || '';

//   useEffect(() => {
//     if (token) {
//       fetch(`http://localhost:8000/api/auth/verify-and-login/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ key: token }),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           if (data.access && data.refresh) {
//             // Save tokens
//             localStorage.setItem('access_token', data.access);
//             localStorage.setItem('refresh_token', data.refresh);

//             setVerificationStatus('success');

//             setTimeout(() => {
//               navigate('/');
//             }, 2000);
//           } else {
//             setVerificationStatus('error');
//           }
//         })
//         .catch(() => setVerificationStatus('error'));
//     } else {
//       setVerificationStatus('error');
//     }
//   }, [token, navigate]);

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg"
//       >
//         <div className="text-center">
//           <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-[#FFF5F2]">
//             <Mail className="h-8 w-8 text-[#FF5733]" />
//           </div>
//           <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Email Verification</h2>
//           <p className="mt-2 text-sm text-gray-600">
//             {token
//               ? (verificationStatus === 'loading'
//                   ? 'Verifying your email address...'
//                   : verificationStatus === 'success'
//                   ? 'Your email has been verified successfully! Logging you in...'
//                   : 'Verification failed, please try again.')
//               : 'A verification email has been sent to your inbox. Please click the link in your email.'}
//           </p>
//         </div>

//         {verificationStatus === 'loading' && token && (
//           <div className="flex justify-center">
//             <RefreshCw className="h-8 w-8 text-[#FF5733] animate-spin" />
//           </div>
//         )}

//         {verificationStatus === 'success' && token && (
//           <div className="flex justify-center">
//             <CheckCircle2 className="h-16 w-16 text-green-500" />
//           </div>
//         )}

//         {verificationStatus === 'error' && token && (
//           <div className="flex justify-center">
//             <XCircle className="h-16 w-16 text-red-500" />
//           </div>
//         )}

//         <div className="mt-4 text-center">
//           <button
//             onClick={() => navigate('/')}
//             className="text-sm font-medium text-[#FF5733] hover:text-[#ff4019]"
//           >
//             Return to Homepage
//           </button>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default EmailVerification;


// src/pages/EmailVerification.tsx
// src/pages/EmailVerification.tsx

import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, RefreshCw, Mail } from 'lucide-react';

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [username, setUsername] = useState<string>('');

  // Read the token from the query parameter "key"
  const token = searchParams.get('key') || '';

  useEffect(() => {
    if (token) {
      // Call the backend verify-and-login endpoint with the token
      fetch(`http://localhost:8000/api/auth/verify-and-login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: token }),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Response data:", data); // Inspect returned tokens in console

          if (data.access && data.refresh) {
            // Save JWT tokens in localStorage
            localStorage.setItem('access_token', data.access);
            localStorage.setItem('refresh_token', data.refresh);
            
            // Fetch user details using the access token
            fetch(`http://localhost:8000/api/auth/user/`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${data.access}`,
              },
            })
              .then((res) => res.json())
              .then((userData) => {
                // Extract the username; if not available, use the email's local-part as a fallback.
                const name = userData.username || userData.email.split('@')[0];
                setUsername(name);
                setVerificationStatus('success');
                // After displaying the greeting, redirect to the homepage after 2 seconds.
                setTimeout(() => {
                  navigate('/');
                }, 2000);
              })
              .catch(() => setVerificationStatus('error'));
          } else {
            setVerificationStatus('error');
          }
        })
        .catch(() => setVerificationStatus('error'));
    } else {
      setVerificationStatus('error');
    }
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-lg"
      >
        <div className="text-center">
          <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-[#FFF5F2]">
            <Mail className="h-8 w-8 text-[#FF5733]" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Email Verification</h2>
          <p className="mt-2 text-sm text-gray-600">
            {token
              ? verificationStatus === 'loading'
                ? 'Verifying your email address...'
                : verificationStatus === 'success'
                ? `Hi ${username}, your email has been verified successfully! Logging you in...`
                : 'Verification failed, please try again.'
              : 'A verification email has been sent to your inbox. Please click the link in your email.'}
          </p>
        </div>

        {verificationStatus === 'loading' && token && (
          <div className="flex justify-center">
            <RefreshCw className="h-8 w-8 text-[#FF5733] animate-spin" />
          </div>
        )}

        {verificationStatus === 'success' && token && (
          <div className="flex justify-center">
            <CheckCircle2 className="h-16 w-16 text-green-500" />
          </div>
        )}

        {verificationStatus === 'error' && token && (
          <div className="flex justify-center">
            <XCircle className="h-16 w-16 text-red-500" />
          </div>
        )}

        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/')}
            className="text-sm font-medium text-[#FF5733] hover:text-[#ff4019]"
          >
            Return to Homepage
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default EmailVerification;
