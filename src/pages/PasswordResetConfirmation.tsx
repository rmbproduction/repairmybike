// import React, { useState, useEffect } from 'react';
// import { useSearchParams, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { CheckCircle2, XCircle, RefreshCw, Lock } from 'lucide-react';

// const PasswordResetConfirmation = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const [resetStatus, setResetStatus] = useState<'loading' | 'success' | 'error'>('loading');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');

//   const token = searchParams.get('token') || '';

//   useEffect(() => {
//     // Simulate token validation
//     const timer = setTimeout(() => {
//       setResetStatus(token ? 'success' : 'error');
//     }, 1500);

//     return () => clearTimeout(timer);
//   }, [token]);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     if (password.length < 8) {
//       setError('Password must be at least 8 characters long');
//       return;
//     }

//     // Here you would make an API call to reset the password
//     setResetStatus('success');
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
//             <Lock className="h-8 w-8 text-[#FF5733]" />
//           </div>
//           <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Reset Password</h2>
//           <p className="mt-2 text-sm text-gray-600">
//             {resetStatus === 'loading' ? 'Validating your reset link...' :
//              resetStatus === 'error' ? 'Invalid or expired reset link' :
//              resetStatus === 'success' ? 'Create your new password' : ''}
//           </p>
//         </div>

//         {resetStatus === 'loading' ? (
//           <div className="flex justify-center">
//             <RefreshCw className="h-8 w-8 text-[#FF5733] animate-spin" />
//           </div>
//         ) : resetStatus === 'error' ? (
//           <div className="space-y-6">
//             <div className="flex justify-center">
//               <XCircle className="h-16 w-16 text-red-500" />
//             </div>
//             <p className="text-center text-sm text-gray-600">
//               The password reset link has expired or is invalid. Please request a new password reset link.
//             </p>
//             <button
//               onClick={() => navigate('/forgot-password')}
//               className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-[#FF5733] hover:bg-[#ff4019] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5733]"
//             >
//               Request New Reset Link
//             </button>
//           </div>
//         ) : (
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {error && (
//               <div className="text-red-500 text-sm text-center">{error}</div>
//             )}
//             <div>
//               <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//                 New Password
//               </label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF5733] focus:border-[#FF5733]"
//                 required
//               />
//             </div>
//             <div>
//               <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
//                 Confirm New Password
//               </label>
//               <input
//                 type="password"
//                 id="confirmPassword"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF5733] focus:border-[#FF5733]"
//                 required
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-[#FF5733] hover:bg-[#ff4019] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF5733]"
//             >
//               Reset Password
//             </button>
//           </form>
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

// export default PasswordResetConfirmation;













import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { RefreshCw, Lock } from 'lucide-react';

const API_BASE_URL = "http://localhost:8000/api/auth"; // Change as needed

const PasswordResetConfirmation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // New state for error and reset status
  const [resetStatus, setResetStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const token = searchParams.get('token') || '';
  const uid = searchParams.get('uid') || '';

  useEffect(() => {
    // Instead of simulation, you might want to verify token on backend.
    // For now, we assume if token & uid exist, status is success.
    if (token && uid) {
      setResetStatus('success');
    } else {
      setResetStatus('error');
    }
  }, [token, uid]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/password/reset/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: uid,
          token: token,
          new_password1: password,
          new_password2: confirmPassword,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Password reset successful!");
        navigate('/');
      } else {
        setError(data.detail || "Error resetting password");
      }
    } catch (err: any) {
      setError("Network error: " + err.message);
    }
  };

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
            <Lock className="h-8 w-8 text-[#FF5733]" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Reset Password</h2>
          <p className="mt-2 text-sm text-gray-600">
            {resetStatus === 'loading'
              ? 'Validating your reset link...'
              : resetStatus === 'error'
              ? 'Invalid or expired reset link'
              : 'Create your new password'}
          </p>
        </div>

        {resetStatus === 'loading' ? (
          <div className="flex justify-center">
            <RefreshCw className="h-8 w-8 text-[#FF5733] animate-spin" />
          </div>
        ) : resetStatus === 'error' ? (
          <div className="space-y-6">
            <p className="text-center text-sm text-gray-600">
              The password reset link has expired or is invalid. Please request a new password reset link.
            </p>
            <button
              onClick={() => navigate('/forgot-password')}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-[#FF5733] hover:bg-[#ff4019]"
            >
              Request New Reset Link
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FF5733] focus:border-[#FF5733]"
                required
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[#FF5733] focus:border-[#FF5733]"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-[#FF5733] hover:bg-[#ff4019]"
            >
              Reset Password
            </button>
          </form>
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

export default PasswordResetConfirmation;
