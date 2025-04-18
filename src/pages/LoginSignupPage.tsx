// // // LoginSignupPage.tsx
// // import { useState } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { FaGoogle, FaFacebookF } from "react-icons/fa";

// // type Mode = "login" | "signup" | "forgot";

// // const LoginSignupPage = () => {
// //   const [mode, setMode] = useState<Mode>("login");
// //   const [formData, setFormData] = useState({
// //     email: "",
// //     password: "",
// //     confirmPassword: "",
// //   });

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     if (mode === "signup" && formData.password !== formData.confirmPassword) {
// //       alert("Passwords do not match!");
// //       return;
// //     }
// //     if (mode === "login") {
// //       console.log("Logging in...", formData);
// //     } else if (mode === "signup") {
// //       console.log("Signing up...", formData);
// //     } else if (mode === "forgot") {
// //       console.log("Reset password for:", formData.email);
// //     }
// //     // Add your API call or further logic here
// //   };

// //   const switchMode = (newMode: Mode) => {
// //     setFormData({ email: "", password: "", confirmPassword: "" });
// //     setMode(newMode);
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white to-[#ffe4d4] p-6">
// //       {/* Card Container */}
// //       <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8">
// //         <AnimatePresence mode="wait">
// //           <motion.div
// //             key={mode}
// //             initial={{ opacity: 0, y: 30 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             exit={{ opacity: 0, y: -30 }}
// //             transition={{ duration: 0.4 }}
// //           >
// //             {/* Heading */}
// //             {mode === "login" && (
// //               <>
// //                 <h2 className="text-4xl font-extrabold text-center text-gray-800">
// //                   Welcome Back
// //                 </h2>
// //                 {/* Accent Bar Under Heading */}
// //                 <div className="mt-2 h-1 w-16 bg-[#FF5733] mx-auto" />
// //                 <p className="mt-3 text-center text-gray-500">
// //                   Log in to your account
// //                 </p>
// //                 <form onSubmit={handleSubmit} className="mt-6 space-y-5">
// //                   <div>
// //                     <label className="block text-sm font-semibold text-gray-700">
// //                       Email
// //                     </label>
// //                     <input
// //                       type="email"
// //                       name="email"
// //                       value={formData.email}
// //                       onChange={handleChange}
// //                       className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5733]"
// //                       required
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-semibold text-gray-700">
// //                       Password
// //                     </label>
// //                     <input
// //                       type="password"
// //                       name="password"
// //                       value={formData.password}
// //                       onChange={handleChange}
// //                       className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5733]"
// //                       required
// //                     />
// //                   </div>
// //                   <button
// //                     type="submit"
// //                     className="w-full py-2 px-4 bg-[#FF5733] text-white rounded-md hover:bg-[#ff4019] transition-colors"
// //                   >
// //                     Login
// //                   </button>
// //                 </form>
// //                 <div className="mt-4 flex justify-between text-sm">
// //                   <button
// //                     onClick={() => switchMode("forgot")}
// //                     className="text-[#FF5733] hover:underline"
// //                   >
// //                     Forgot Password?
// //                   </button>
// //                   <button
// //                     onClick={() => switchMode("signup")}
// //                     className="text-[#FF5733] hover:underline"
// //                   >
// //                     Sign Up
// //                   </button>
// //                 </div>
// //               </>
// //             )}

// //             {mode === "signup" && (
// //               <>
// //                 <h2 className="text-4xl font-extrabold text-center text-gray-800">
// //                   Create Account
// //                 </h2>
// //                 <div className="mt-2 h-1 w-16 bg-[#FF5733] mx-auto" />
// //                 <p className="mt-3 text-center text-gray-500">
// //                   Sign up for a new account
// //                 </p>
// //                 <form onSubmit={handleSubmit} className="mt-6 space-y-5">
// //                   <div>
// //                     <label className="block text-sm font-semibold text-gray-700">
// //                       Email
// //                     </label>
// //                     <input
// //                       type="email"
// //                       name="email"
// //                       value={formData.email}
// //                       onChange={handleChange}
// //                       className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5733]"
// //                       required
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-semibold text-gray-700">
// //                       Password
// //                     </label>
// //                     <input
// //                       type="password"
// //                       name="password"
// //                       value={formData.password}
// //                       onChange={handleChange}
// //                       className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5733]"
// //                       required
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-semibold text-gray-700">
// //                       Confirm Password
// //                     </label>
// //                     <input
// //                       type="password"
// //                       name="confirmPassword"
// //                       value={formData.confirmPassword}
// //                       onChange={handleChange}
// //                       className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5733]"
// //                       required
// //                     />
// //                   </div>
// //                   <button
// //                     type="submit"
// //                     className="w-full py-2 px-4 bg-[#FF5733] text-white rounded-md hover:bg-[#ff4019] transition-colors"
// //                   >
// //                     Sign Up
// //                   </button>
// //                 </form>
// //                 <div className="mt-4 text-center">
// //                   <button
// //                     onClick={() => switchMode("login")}
// //                     className="text-sm text-[#FF5733] hover:underline"
// //                   >
// //                     Already have an account? Login
// //                   </button>
// //                 </div>
// //               </>
// //             )}

// //             {mode === "forgot" && (
// //               <>
// //                 <h2 className="text-4xl font-extrabold text-center text-gray-800">
// //                   Reset Password
// //                 </h2>
// //                 <div className="mt-2 h-1 w-16 bg-[#FF5733] mx-auto" />
// //                 <p className="mt-3 text-center text-gray-500">
// //                   Enter your email to reset your password
// //                 </p>
// //                 <form onSubmit={handleSubmit} className="mt-6 space-y-5">
// //                   <div>
// //                     <label className="block text-sm font-semibold text-gray-700">
// //                       Email
// //                     </label>
// //                     <input
// //                       type="email"
// //                       name="email"
// //                       value={formData.email}
// //                       onChange={handleChange}
// //                       className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5733]"
// //                       required
// //                     />
// //                   </div>
// //                   <button
// //                     type="submit"
// //                     className="w-full py-2 px-4 bg-[#FF5733] text-white rounded-md hover:bg-[#ff4019] transition-colors"
// //                   >
// //                     Reset Password
// //                   </button>
// //                 </form>
// //                 <div className="mt-4 text-center">
// //                   <button
// //                     onClick={() => switchMode("login")}
// //                     className="text-sm text-[#FF5733] hover:underline"
// //                   >
// //                     Back to Login
// //                   </button>
// //                 </div>
// //               </>
// //             )}

// //             {/* Social Login */}
// //             <div className="mt-8">
// //               <p className="text-center text-sm text-gray-500">
// //                 or continue with
// //               </p>
// //               <div className="mt-4 flex justify-center space-x-4">
// //                 <button className="flex items-center justify-center border border-gray-300 p-2 rounded-full hover:bg-gray-100 transition-colors">
// //                   <FaGoogle className="text-red-500" size={20} />
// //                 </button>
// //                 <button className="flex items-center justify-center border border-gray-300 p-2 rounded-full hover:bg-gray-100 transition-colors">
// //                   <FaFacebookF className="text-blue-800" size={20} />
// //                 </button>
// //               </div>
// //             </div>
// //           </motion.div>
// //         </AnimatePresence>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LoginSignupPage;



// // // LoginSignupPage.tsx
// // import { useState } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { FaGoogle, FaFacebookF } from "react-icons/fa";

// // type Mode = "login" | "signup" | "forgot";

// // const API_BASE_URL = "http://localhost:8000/api/auth"; // Base URL for your Django auth endpoints

// // const LoginSignupPage = () => {
// //   const [mode, setMode] = useState<Mode>("login");
// //   const [formData, setFormData] = useState({
// //     email: "",
// //     password: "",
// //     confirmPassword: "",
// //   });

// //   // Updates fields on change
// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   // Submit handler for Login, Signup, Forgot Password
// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     // Check for matching passwords in signup
// //     if (mode === "signup" && formData.password !== formData.confirmPassword) {
// //       alert("Passwords do not match!");
// //       return;
// //     }

// //     try {
// //       let url = "";
// //       let payload: any = {};

// //       if (mode === "signup") {
// //         // Construct payload for registration
// //         url = `${API_BASE_URL}/register/`;
// //         payload = {
// //           username: formData.email.split("@")[0], // Simple username from email
// //           email: formData.email,
// //           password1: formData.password,
// //           password2: formData.confirmPassword,
// //         };
// //       } else if (mode === "login") {
// //         // Construct payload for login
// //         url = `${API_BASE_URL}/login/`;
// //         payload = {
// //           email: formData.email,
// //           password: formData.password,
// //         };
// //       } else if (mode === "forgot") {
// //         // Construct payload for password reset request
// //         url = `${API_BASE_URL}/password/reset/`;
// //         payload = {
// //           email: formData.email,
// //         };
// //       }

// //       const response = await fetch(url, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(payload),
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         if (mode === "signup") {
// //           // For registration, show the verification message.
// //           alert(data.detail || "Verification e-mail sent. Please check your inbox.");
// //         } else if (mode === "login") {
// //           // For login, save auth token to localStorage.
// //           alert("Login successful!");
// //           localStorage.setItem("authToken", data.key);
// //         } else if (mode === "forgot") {
// //           // For forgot password, notify user that reset email has been sent.
// //           alert(data.detail || "Password reset email sent. Please check your email.");
// //         }
// //       } else {
// //         // If response is not OK, show error detail.
// //         alert("Error: " + (data.detail || "Something went wrong."));
// //       }
// //     } catch (error: any) {
// //       alert("Network error: " + error.message);
// //     }
// //   };

// //   // Social Login using Google (for Facebook, similar logic can be applied if endpoint available)
// //   const handleGoogleLogin = async () => {
// //     // In a real app, proper OAuth flow would be implemented.
// //     // For demonstration, we simply ask for an id_token.
// //     const idToken = prompt("Enter your Google id_token:");
// //     if (!idToken) return;

// //     try {
// //       const response = await fetch(`${API_BASE_URL}/google/`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ access_token: idToken }),
// //       });
// //       const data = await response.json();

// //       if (response.ok) {
// //         alert("Google login successful!");
// //         localStorage.setItem("authToken", data.key);
// //       } else {
// //         alert("Google login error: " + (data.detail || "Error occurred."));
// //       }
// //     } catch (error: any) {
// //       alert("Network error: " + error.message);
// //     }
// //   };

// //   // Facebook login can be similarly implemented if available.
// //   // For now, we leave it unimplemented.
// //   const handleFacebookLogin = () => {
// //     alert("Facebook login integration pending implementation.");
// //   };

// //   // Switch the current mode and reset formData.
// //   const switchMode = (newMode: Mode) => {
// //     setFormData({ email: "", password: "", confirmPassword: "" });
// //     setMode(newMode);
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white to-[#ffe4d4] p-6">
// //       {/* Card Container */}
// //       <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8">
// //         <AnimatePresence mode="wait">
// //           <motion.div
// //             key={mode}
// //             initial={{ opacity: 0, y: 30 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             exit={{ opacity: 0, y: -30 }}
// //             transition={{ duration: 0.4 }}
// //           >
// //             {/* LOGIN MODE */}
// //             {mode === "login" && (
// //               <>
// //                 <h2 className="text-4xl font-extrabold text-center text-gray-800">
// //                   Welcome Back
// //                 </h2>
// //                 <div className="mt-2 h-1 w-16 bg-[#FF5733] mx-auto" />
// //                 <p className="mt-3 text-center text-gray-500">
// //                   Log in to your account
// //                 </p>
// //                 <form onSubmit={handleSubmit} className="mt-6 space-y-5">
// //                   <div>
// //                     <label className="block text-sm font-semibold text-gray-700">
// //                       Email
// //                     </label>
// //                     <input
// //                       type="email"
// //                       name="email"
// //                       value={formData.email}
// //                       onChange={handleChange}
// //                       className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5733]"
// //                       required
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-semibold text-gray-700">
// //                       Password
// //                     </label>
// //                     <input
// //                       type="password"
// //                       name="password"
// //                       value={formData.password}
// //                       onChange={handleChange}
// //                       className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5733]"
// //                       required
// //                     />
// //                   </div>
// //                   <button
// //                     type="submit"
// //                     className="w-full py-2 px-4 bg-[#FF5733] text-white rounded-md hover:bg-[#ff4019] transition-colors"
// //                   >
// //                     Login
// //                   </button>
// //                 </form>
// //                 <div className="mt-4 flex justify-between text-sm">
// //                   <button
// //                     onClick={() => switchMode("forgot")}
// //                     className="text-[#FF5733] hover:underline"
// //                   >
// //                     Forgot Password?
// //                   </button>
// //                   <button
// //                     onClick={() => switchMode("signup")}
// //                     className="text-[#FF5733] hover:underline"
// //                   >
// //                     Sign Up
// //                   </button>
// //                 </div>
// //               </>
// //             )}

// //             {/* SIGNUP MODE */}
// //             {mode === "signup" && (
// //               <>
// //                 <h2 className="text-4xl font-extrabold text-center text-gray-800">
// //                   Create Account
// //                 </h2>
// //                 <div className="mt-2 h-1 w-16 bg-[#FF5733] mx-auto" />
// //                 <p className="mt-3 text-center text-gray-500">
// //                   Sign up for a new account
// //                 </p>
// //                 <form onSubmit={handleSubmit} className="mt-6 space-y-5">
// //                   <div>
// //                     <label className="block text-sm font-semibold text-gray-700">
// //                       Email
// //                     </label>
// //                     <input
// //                       type="email"
// //                       name="email"
// //                       value={formData.email}
// //                       onChange={handleChange}
// //                       className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5733]"
// //                       required
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-semibold text-gray-700">
// //                       Password
// //                     </label>
// //                     <input
// //                       type="password"
// //                       name="password"
// //                       value={formData.password}
// //                       onChange={handleChange}
// //                       className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5733]"
// //                       required
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-semibold text-gray-700">
// //                       Confirm Password
// //                     </label>
// //                     <input
// //                       type="password"
// //                       name="confirmPassword"
// //                       value={formData.confirmPassword}
// //                       onChange={handleChange}
// //                       className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5733]"
// //                       required
// //                     />
// //                   </div>
// //                   <button
// //                     type="submit"
// //                     className="w-full py-2 px-4 bg-[#FF5733] text-white rounded-md hover:bg-[#ff4019] transition-colors"
// //                   >
// //                     Sign Up
// //                   </button>
// //                 </form>
// //                 <div className="mt-4 text-center">
// //                   <button
// //                     onClick={() => switchMode("login")}
// //                     className="text-sm text-[#FF5733] hover:underline"
// //                   >
// //                     Already have an account? Login
// //                   </button>
// //                 </div>
// //               </>
// //             )}

// //             {/* FORGOT PASSWORD MODE */}
// //             {mode === "forgot" && (
// //               <>
// //                 <h2 className="text-4xl font-extrabold text-center text-gray-800">
// //                   Reset Password
// //                 </h2>
// //                 <div className="mt-2 h-1 w-16 bg-[#FF5733] mx-auto" />
// //                 <p className="mt-3 text-center text-gray-500">
// //                   Enter your email to reset your password
// //                 </p>
// //                 <form onSubmit={handleSubmit} className="mt-6 space-y-5">
// //                   <div>
// //                     <label className="block text-sm font-semibold text-gray-700">
// //                       Email
// //                     </label>
// //                     <input
// //                       type="email"
// //                       name="email"
// //                       value={formData.email}
// //                       onChange={handleChange}
// //                       className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5733]"
// //                       required
// //                     />
// //                   </div>
// //                   <button
// //                     type="submit"
// //                     className="w-full py-2 px-4 bg-[#FF5733] text-white rounded-md hover:bg-[#ff4019] transition-colors"
// //                   >
// //                     Reset Password
// //                   </button>
// //                 </form>
// //                 <div className="mt-4 text-center">
// //                   <button
// //                     onClick={() => switchMode("login")}
// //                     className="text-sm text-[#FF5733] hover:underline"
// //                   >
// //                     Back to Login
// //                   </button>
// //                 </div>
// //               </>
// //             )}

// //             {/* SOCIAL LOGIN BUTTONS */}
// //             <div className="mt-8">
// //               <p className="text-center text-sm text-gray-500">
// //                 or continue with
// //               </p>
// //               <div className="mt-4 flex justify-center space-x-4">
// //                 <button
// //                   onClick={handleGoogleLogin}
// //                   className="flex items-center justify-center border border-gray-300 p-2 rounded-full hover:bg-gray-100 transition-colors"
// //                 >
// //                   <FaGoogle className="text-red-500" size={20} />
// //                 </button>
// //                 <button
// //                   onClick={handleFacebookLogin}
// //                   className="flex items-center justify-center border border-gray-300 p-2 rounded-full hover:bg-gray-100 transition-colors"
// //                 >
// //                   <FaFacebookF className="text-blue-800" size={20} />
// //                 </button>
// //               </div>
// //             </div>
// //           </motion.div>
// //         </AnimatePresence>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LoginSignupPage;

// // import { useState } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import { FaGoogle, FaFacebookF } from "react-icons/fa";

// // type Mode = "login" | "signup" | "forgot";

// // const API_BASE_URL = "http://localhost:8000/api/auth"; // Change if needed

// // const LoginSignupPage = () => {
// //   const [mode, setMode] = useState<Mode>("login");
// //   const [formData, setFormData] = useState({
// //     email: "",
// //     password: "",
// //     confirmPassword: "",
// //   });

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     if (mode === "signup" && formData.password !== formData.confirmPassword) {
// //       alert("Passwords do not match!");
// //       return;
// //     }

// //     try {
// //       let url = "";
// //       let payload: any = {};

// //       if (mode === "signup") {
// //         url = `${API_BASE_URL}/register/`;
// //         payload = {
// //           username: formData.email.split("@")[0], // generate simple username
// //           email: formData.email,
// //           password1: formData.password,
// //           password2: formData.confirmPassword,
// //         };
// //       } else if (mode === "login") {
// //         url = `${API_BASE_URL}/login/`;
// //         payload = {
// //           email: formData.email,
// //           password: formData.password,
// //         };
// //       } else if (mode === "forgot") {
// //         url = `${API_BASE_URL}/password/reset/`;
// //         payload = { email: formData.email };
// //       }

// //       const response = await fetch(url, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(payload),
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         if (mode === "signup") {
// //           alert(data.detail || "Verification e-mail sent. Please check your inbox.");
// //         } else if (mode === "login") {
// //           alert("Login successful!");
// //           localStorage.setItem("authToken", data.key);
// //         } else if (mode === "forgot") {
// //           alert(data.detail || "Password reset email sent. Please check your email.");
// //         }
// //       } else {
// //         alert("Error: " + (data.detail || "Something went wrong."));
// //       }
// //     } catch (error: any) {
// //       alert("Network error: " + error.message);
// //     }
// //   };

// //   // Social login example (Google). Replace this logic with proper OAuth flow in production.
// //   const handleGoogleLogin = async () => {
// //     const idToken = prompt("Enter your Google id_token:");
// //     if (!idToken) return;
// //     try {
// //       const response = await fetch(`${API_BASE_URL}/google/`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ access_token: idToken }),
// //       });
// //       const data = await response.json();
// //       if (response.ok) {
// //         alert("Google login successful!");
// //         localStorage.setItem("authToken", data.key);
// //       } else {
// //         alert("Google login error: " + (data.detail || "Error occurred."));
// //       }
// //     } catch (error: any) {
// //       alert("Network error: " + error.message);
// //     }
// //   };

// //   const handleFacebookLogin = () => {
// //     alert("Facebook login integration pending implementation.");
// //   };

// //   const switchMode = (newMode: Mode) => {
// //     setFormData({ email: "", password: "", confirmPassword: "" });
// //     setMode(newMode);
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white to-[#ffe4d4] p-6">
// //       <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8">
// //         <AnimatePresence mode="wait">
// //           <motion.div
// //             key={mode}
// //             initial={{ opacity: 0, y: 30 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             exit={{ opacity: 0, y: -30 }}
// //             transition={{ duration: 0.4 }}
// //           >
// //             {mode === "login" && (
// //               <>
// //                 <h2 className="text-4xl font-extrabold text-center text-gray-800">
// //                   Welcome Back
// //                 </h2>
// //                 <div className="mt-2 h-1 w-16 bg-[#FF5733] mx-auto" />
// //                 <p className="mt-3 text-center text-gray-500">
// //                   Log in to your account
// //                 </p>
// //                 <form onSubmit={handleSubmit} className="mt-6 space-y-5">
// //                   <div>
// //                     <label className="block text-sm font-semibold text-gray-700">
// //                       Email
// //                     </label>
// //                     <input
// //                       type="email"
// //                       name="email"
// //                       value={formData.email}
// //                       onChange={handleChange}
// //                       className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5733]"
// //                       required
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-semibold text-gray-700">
// //                       Password
// //                     </label>
// //                     <input
// //                       type="password"
// //                       name="password"
// //                       value={formData.password}
// //                       onChange={handleChange}
// //                       className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5733]"
// //                       required
// //                     />
// //                   </div>
// //                   <button
// //                     type="submit"
// //                     className="w-full py-2 px-4 bg-[#FF5733] text-white rounded-md hover:bg-[#ff4019] transition-colors"
// //                   >
// //                     Login
// //                   </button>
// //                 </form>
// //                 <div className="mt-4 flex justify-between text-sm">
// //                   <button
// //                     onClick={() => switchMode("forgot")}
// //                     className="text-[#FF5733] hover:underline"
// //                   >
// //                     Forgot Password?
// //                   </button>
// //                   <button
// //                     onClick={() => switchMode("signup")}
// //                     className="text-[#FF5733] hover:underline"
// //                   >
// //                     Sign Up
// //                   </button>
// //                 </div>
// //               </>
// //             )}

// //             {mode === "signup" && (
// //               <>
// //                 <h2 className="text-4xl font-extrabold text-center text-gray-800">
// //                   Create Account
// //                 </h2>
// //                 <div className="mt-2 h-1 w-16 bg-[#FF5733] mx-auto" />
// //                 <p className="mt-3 text-center text-gray-500">
// //                   Sign up for a new account
// //                 </p>
// //                 <form onSubmit={handleSubmit} className="mt-6 space-y-5">
// //                   <div>
// //                     <label className="block text-sm font-semibold text-gray-700">
// //                       Email
// //                     </label>
// //                     <input
// //                       type="email"
// //                       name="email"
// //                       value={formData.email}
// //                       onChange={handleChange}
// //                       className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5733]"
// //                       required
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-semibold text-gray-700">
// //                       Password
// //                     </label>
// //                     <input
// //                       type="password"
// //                       name="password"
// //                       value={formData.password}
// //                       onChange={handleChange}
// //                       className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5733]"
// //                       required
// //                     />
// //                   </div>
// //                   <div>
// //                     <label className="block text-sm font-semibold text-gray-700">
// //                       Confirm Password
// //                     </label>
// //                     <input
// //                       type="password"
// //                       name="confirmPassword"
// //                       value={formData.confirmPassword}
// //                       onChange={handleChange}
// //                       className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5733]"
// //                       required
// //                     />
// //                   </div>
// //                   <button
// //                     type="submit"
// //                     className="w-full py-2 px-4 bg-[#FF5733] text-white rounded-md hover:bg-[#ff4019] transition-colors"
// //                   >
// //                     Sign Up
// //                   </button>
// //                 </form>
// //                 <div className="mt-4 text-center">
// //                   <button
// //                     onClick={() => switchMode("login")}
// //                     className="text-sm text-[#FF5733] hover:underline"
// //                   >
// //                     Already have an account? Login
// //                   </button>
// //                 </div>
// //               </>
// //             )}

// //             {mode === "forgot" && (
// //               <>
// //                 <h2 className="text-4xl font-extrabold text-center text-gray-800">
// //                   Reset Password
// //                 </h2>
// //                 <div className="mt-2 h-1 w-16 bg-[#FF5733] mx-auto" />
// //                 <p className="mt-3 text-center text-gray-500">
// //                   Enter your email to reset your password
// //                 </p>
// //                 <form onSubmit={handleSubmit} className="mt-6 space-y-5">
// //                   <div>
// //                     <label className="block text-sm font-semibold text-gray-700">
// //                       Email
// //                     </label>
// //                     <input
// //                       type="email"
// //                       name="email"
// //                       value={formData.email}
// //                       onChange={handleChange}
// //                       className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5733]"
// //                       required
// //                     />
// //                   </div>
// //                   <button
// //                     type="submit"
// //                     className="w-full py-2 px-4 bg-[#FF5733] text-white rounded-md hover:bg-[#ff4019] transition-colors"
// //                   >
// //                     Reset Password
// //                   </button>
// //                 </form>
// //                 <div className="mt-4 text-center">
// //                   <button
// //                     onClick={() => switchMode("login")}
// //                     className="text-sm text-[#FF5733] hover:underline"
// //                   >
// //                     Back to Login
// //                   </button>
// //                 </div>
// //               </>
// //             )}

// //             {/* SOCIAL LOGIN */}
// //             <div className="mt-8">
// //               <p className="text-center text-sm text-gray-500">or continue with</p>
// //               <div className="mt-4 flex justify-center space-x-4">
// //                 <button
// //                   onClick={handleGoogleLogin}
// //                   className="flex items-center justify-center border border-gray-300 p-2 rounded-full hover:bg-gray-100 transition-colors"
// //                 >
// //                   <FaGoogle className="text-red-500" size={20} />
// //                 </button>
// //                 <button
// //                   onClick={handleFacebookLogin}
// //                   className="flex items-center justify-center border border-gray-300 p-2 rounded-full hover:bg-gray-100 transition-colors"
// //                 >
// //                   <FaFacebookF className="text-blue-800" size={20} />
// //                 </button>
// //               </div>
// //             </div>
// //           </motion.div>
// //         </AnimatePresence>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LoginSignupPage;

// // LoginSignupPage.tsx
// import { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { FaGoogle, FaFacebookF } from "react-icons/fa";

// type Mode = "login" | "signup" | "forgot";
// type Notification = { message: string; type: "error" | "success" };

// const API_BASE_URL = "http://localhost:8000/api/auth"; // Update as needed

// // A Notification Card Component to show messages beautifully
// const NotificationCard = ({
//   notification,
//   onClose,
// }: {
//   notification: Notification;
//   onClose: () => void;
// }) => {
//   // Remove after 3 seconds automatically
//   useEffect(() => {
//     const timer = setTimeout(onClose, 3000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   // Animation variants for the card
//   const variants = {
//     hidden: { opacity: 0, y: -20 },
//     visible: { opacity: 1, y: 0 },
//     exit: { opacity: 0, y: -20 },
//   };

//   return (
//     <AnimatePresence>
//       {notification && (
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           exit="exit"
//           variants={variants}
//           transition={{ duration: 0.5 }}
//           className={`fixed top-5 right-5 z-50 p-4 rounded-md shadow-lg 
//             ${notification.type === "success" ? "bg-green-100 border-green-400 text-green-800" : "bg-red-100 border-red-400 text-red-800"}
//             border`}
//         >
//           <p className="font-semibold">{notification.message}</p>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// const LoginSignupPage = () => {
//   const [mode, setMode] = useState<Mode>("login");
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
//   const [notification, setNotification] = useState<Notification | null>(null);

//   // Helper to show notification with auto-clear
//   const notify = (message: string, type: "error" | "success") => {
//     setNotification({ message, type });
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (mode === "signup" && formData.password !== formData.confirmPassword) {
//       notify("Passwords do not match!", "error");
//       return;
//     }

//     try {
//       let url = "";
//       let payload: any = {};

//       if (mode === "signup") {
//         url = `${API_BASE_URL}/register/`;
//         payload = {
//           username: formData.email.split("@")[0], // Use email-part as username
//           email: formData.email,
//           password1: formData.password,
//           password2: formData.confirmPassword,
//         };
//       } else if (mode === "login") {
//         url = `${API_BASE_URL}/login/`;
//         payload = {
//           email: formData.email,
//           password: formData.password,
//         };
//       } else if (mode === "forgot") {
//         url = `${API_BASE_URL}/password/reset/`;
//         payload = { email: formData.email };
//       }

//       const response = await fetch(url, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       const data = await response.json();

//       if (response.ok) {
//         if (mode === "signup") {
//           notify(
//             data.detail || "Verification e-mail sent. Please check your inbox.",
//             "success"
//           );
//         } else if (mode === "login") {
//           notify("Login successful!", "success");
//           localStorage.setItem("authToken", data.key);
//         } else if (mode === "forgot") {
//           notify(
//             data.detail || "Password reset email sent. Please check your email.",
//             "success"
//           );
//         }
//       } else {
//         notify("Error: " + (data.detail || "Something went wrong."), "error");
//       }
//     } catch (error: any) {
//       notify("Network error: " + error.message, "error");
//     }
//   };

//   // Social login example (Google)
//   const handleGoogleLogin = async () => {
//     const idToken = prompt("Enter your Google id_token:");
//     if (!idToken) return;
//     try {
//       const response = await fetch(`${API_BASE_URL}/google/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ access_token: idToken }),
//       });
//       const data = await response.json();
//       if (response.ok) {
//         notify("Google login successful!", "success");
//         localStorage.setItem("authToken", data.key);
//       } else {
//         notify("Google login error: " + (data.detail || "Error occurred."), "error");
//       }
//     } catch (error: any) {
//       notify("Network error: " + error.message, "error");
//     }
//   };

//   const handleFacebookLogin = () => {
//     notify("Facebook login integration pending implementation.", "error");
//   };

//   const switchMode = (newMode: Mode) => {
//     setFormData({ email: "", password: "", confirmPassword: "" });
//     setMode(newMode);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white to-[#ffe4d4] p-6">
//       {/* Display Notification */}
//       {notification && (
//         <NotificationCard notification={notification} onClose={() => setNotification(null)} />
//       )}
//       {/* Card Container */}
//       <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8">
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={mode}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -30 }}
//             transition={{ duration: 0.4 }}
//           >
//             {mode === "login" && (
//               <>
//                 <h2 className="text-4xl font-extrabold text-center text-gray-800">
//                   Welcome Back
//                 </h2>
//                 <div className="mt-2 h-1 w-16 bg-[#FF5733] mx-auto" />
//                 <p className="mt-3 text-center text-gray-500">
//                   Log in to your account
//                 </p>
//                 <form onSubmit={handleSubmit} className="mt-6 space-y-5">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700">
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5733]"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700">
//                       Password
//                     </label>
//                     <input
//                       type="password"
//                       name="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5733]"
//                       required
//                     />
//                   </div>
//                   <button
//                     type="submit"
//                     className="w-full py-2 px-4 bg-[#FF5733] text-white rounded-md hover:bg-[#ff4019] transition-colors"
//                   >
//                     Login
//                   </button>
//                 </form>
//                 <div className="mt-4 flex justify-between text-sm">
//                   <button
//                     onClick={() => switchMode("forgot")}
//                     className="text-[#FF5733] hover:underline"
//                   >
//                     Forgot Password?
//                   </button>
//                   <button
//                     onClick={() => switchMode("signup")}
//                     className="text-[#FF5733] hover:underline"
//                   >
//                     Sign Up
//                   </button>
//                 </div>
//               </>
//             )}

//             {mode === "signup" && (
//               <>
//                 <h2 className="text-4xl font-extrabold text-center text-gray-800">
//                   Create Account
//                 </h2>
//                 <div className="mt-2 h-1 w-16 bg-[#FF5733] mx-auto" />
//                 <p className="mt-3 text-center text-gray-500">
//                   Sign up for a new account
//                 </p>
//                 <form onSubmit={handleSubmit} className="mt-6 space-y-5">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700">
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5733]"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700">
//                       Password
//                     </label>
//                     <input
//                       type="password"
//                       name="password"
//                       value={formData.password}
//                       onChange={handleChange}
//                       className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5733]"
//                       required
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700">
//                       Confirm Password
//                     </label>
//                     <input
//                       type="password"
//                       name="confirmPassword"
//                       value={formData.confirmPassword}
//                       onChange={handleChange}
//                       className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5733]"
//                       required
//                     />
//                   </div>
//                   <button
//                     type="submit"
//                     className="w-full py-2 px-4 bg-[#FF5733] text-white rounded-md hover:bg-[#ff4019] transition-colors"
//                   >
//                     Sign Up
//                   </button>
//                 </form>
//                 <div className="mt-4 text-center">
//                   <button
//                     onClick={() => switchMode("login")}
//                     className="text-sm text-[#FF5733] hover:underline"
//                   >
//                     Already have an account? Login
//                   </button>
//                 </div>
//               </>
//             )}

//             {mode === "forgot" && (
//               <>
//                 <h2 className="text-4xl font-extrabold text-center text-gray-800">
//                   Reset Password
//                 </h2>
//                 <div className="mt-2 h-1 w-16 bg-[#FF5733] mx-auto" />
//                 <p className="mt-3 text-center text-gray-500">
//                   Enter your email to reset your password
//                 </p>
//                 <form onSubmit={handleSubmit} className="mt-6 space-y-5">
//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700">
//                       Email
//                     </label>
//                     <input
//                       type="email"
//                       name="email"
//                       value={formData.email}
//                       onChange={handleChange}
//                       className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5733]"
//                       required
//                     />
//                   </div>
//                   <button
//                     type="submit"
//                     className="w-full py-2 px-4 bg-[#FF5733] text-white rounded-md hover:bg-[#ff4019] transition-colors"
//                   >
//                     Reset Password
//                   </button>
//                 </form>
//                 <div className="mt-4 text-center">
//                   <button
//                     onClick={() => switchMode("login")}
//                     className="text-sm text-[#FF5733] hover:underline"
//                   >
//                     Back to Login
//                   </button>
//                 </div>
//               </>
//             )}

//             {/* SOCIAL LOGIN */}
//             <div className="mt-8">
//               <p className="text-center text-sm text-gray-500">or continue with</p>
//               <div className="mt-4 flex justify-center space-x-4">
//                 <button
//                   onClick={handleGoogleLogin}
//                   className="flex items-center justify-center border border-gray-300 p-2 rounded-full hover:bg-gray-100 transition-colors"
//                 >
//                   <FaGoogle className="text-red-500" size={20} />
//                 </button>
//                 <button
//                   onClick={handleFacebookLogin}
//                   className="flex items-center justify-center border border-gray-300 p-2 rounded-full hover:bg-gray-100 transition-colors"
//                 >
//                   <FaFacebookF className="text-blue-800" size={20} />
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// };

// export default LoginSignupPage;

// LoginSignupPage.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaGoogle, FaFacebookF } from "react-icons/fa";

type Mode = "login" | "signup" | "forgot";
type Notification = { message: string; type: "error" | "success" };

const API_BASE_URL = "http://localhost:8000/api/auth"; // Adjust if needed

// NotificationCard component to display messages with animation
const NotificationCard = ({
  notification,
  onClose,
}: {
  notification: Notification;
  onClose: () => void;
}) => {
  // Auto-close after 3 seconds using useEffect
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <AnimatePresence>
      {notification && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ duration: 0.5 }}
          className={`fixed top-5 right-5 z-50 p-4 rounded-md shadow-lg border
            ${notification.type === "success"
              ? "bg-green-100 border-green-400 text-green-800"
              : "bg-red-100 border-red-400 text-red-800"}`}
        >
          <p className="font-semibold">{notification.message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const LoginSignupPage = () => {
  const [mode, setMode] = useState<Mode>("login");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [notification, setNotification] = useState<Notification | null>(null);
  const navigate = useNavigate();

  // Function to show notification messages
  const notify = (message: string, type: "error" | "success") => {
    setNotification({ message, type });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "signup" && formData.password !== formData.confirmPassword) {
      notify("Passwords do not match!", "error");
      return;
    }

    try {
      let url = "";
      let payload: any = {};

      if (mode === "signup") {
        url = `${API_BASE_URL}/register/`;
        payload = {
          username: formData.email.split("@")[0],
          email: formData.email,
          password1: formData.password,
          password2: formData.confirmPassword,
        };
      } else if (mode === "login") {
        url = `${API_BASE_URL}/login/`;
        payload = { email: formData.email, password: formData.password };
      } else if (mode === "forgot") {
        url = `${API_BASE_URL}/password/reset/`;
        payload = { email: formData.email };
      }

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        if (mode === "signup") {
          // On signup success, notify the user and navigate to email verification page
          notify(
            data.detail || "Verification e-mail sent. Please check your inbox.",
            "success"
          );
          navigate("/email-verfied/");
        } else if (mode === "login") {
          notify("Login successful!", "success");
          localStorage.setItem("authToken", data.key);
        } else if (mode === "forgot") {
          notify(
            data.detail || "Password reset email sent. Please check your email.",
            "success"
          );
        }
      } else {
        // Log the full error response for debugging
        console.error("Registration error:", data);
        notify("Error: " + (data.detail || "Something went wrong."), "error");
      }
    } catch (error: any) {
      notify("Network error: " + error.message, "error");
    }
  };

  // Social login handler example for Google
  const handleGoogleLogin = async () => {
    const idToken = prompt("Enter your Google id_token:");
    if (!idToken) return;
    try {
      const response = await fetch(`${API_BASE_URL}/google/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ access_token: idToken }),
      });
      const data = await response.json();
      if (response.ok) {
        notify("Google login successful!", "success");
        localStorage.setItem("authToken", data.key);
      } else {
        notify("Google login error: " + (data.detail || "Error occurred."), "error");
      }
    } catch (error: any) {
      notify("Network error: " + error.message, "error");
    }
  };

  const handleFacebookLogin = () => {
    notify("Facebook login integration pending implementation.", "error");
  };

  const switchMode = (newMode: Mode) => {
    setFormData({ email: "", password: "", confirmPassword: "" });
    setMode(newMode);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-white to-[#ffe4d4] p-6">
      {notification && (
        <NotificationCard
          notification={notification}
          onClose={() => setNotification(null)}
        />
      )}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.4 }}
          >
            {mode === "login" && (
              <>
                <h2 className="text-4xl font-extrabold text-center text-gray-800">
                  Welcome Back
                </h2>
                <div className="mt-2 h-1 w-16 bg-[#FF5733] mx-auto" />
                <p className="mt-3 text-center text-gray-500">
                  Log in to your account
                </p>
                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5733]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5733]"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-[#FF5733] text-white rounded-md hover:bg-[#ff4019] transition-colors"
                  >
                    Login
                  </button>
                </form>
                <div className="mt-4 flex justify-between text-sm">
                  <button
                    onClick={() => switchMode("forgot")}
                    className="text-[#FF5733] hover:underline"
                  >
                    Forgot Password?
                  </button>
                  <button
                    onClick={() => switchMode("signup")}
                    className="text-[#FF5733] hover:underline"
                  >
                    Sign Up
                  </button>
                </div>
              </>
            )}

            {mode === "signup" && (
              <>
                <h2 className="text-4xl font-extrabold text-center text-gray-800">
                  Create Account
                </h2>
                <div className="mt-2 h-1 w-16 bg-[#FF5733] mx-auto" />
                <p className="mt-3 text-center text-gray-500">
                  Sign up for a new account
                </p>
                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5733]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5733]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5733]"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-[#FF5733] text-white rounded-md hover:bg-[#ff4019] transition-colors"
                  >
                    Sign Up
                  </button>
                </form>
                <div className="mt-4 text-center">
                  <button
                    onClick={() => switchMode("login")}
                    className="text-sm text-[#FF5733] hover:underline"
                  >
                    Already have an account? Login
                  </button>
                </div>
              </>
            )}

            {mode === "forgot" && (
              <>
                <h2 className="text-4xl font-extrabold text-center text-gray-800">
                  Reset Password
                </h2>
                <div className="mt-2 h-1 w-16 bg-[#FF5733] mx-auto" />
                <p className="mt-3 text-center text-gray-500">
                  Enter your email to reset your password
                </p>
                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5733]"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-[#FF5733] text-white rounded-md hover:bg-[#ff4019] transition-colors"
                  >
                    Reset Password
                  </button>
                </form>
                <div className="mt-4 text-center">
                  <button
                    onClick={() => switchMode("login")}
                    className="text-sm text-[#FF5733] hover:underline"
                  >
                    Back to Login
                  </button>
                </div>
              </>
            )}

            {/* SOCIAL LOGIN */}
            <div className="mt-8">
              <p className="text-center text-sm text-gray-500">or continue with</p>
              <div className="mt-4 flex justify-center space-x-4">
                <button
                  onClick={handleGoogleLogin}
                  className="flex items-center justify-center border border-gray-300 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <FaGoogle className="text-red-500" size={20} />
                </button>
                <button
                  onClick={handleFacebookLogin}
                  className="flex items-center justify-center border border-gray-300 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <FaFacebookF className="text-blue-800" size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LoginSignupPage;
