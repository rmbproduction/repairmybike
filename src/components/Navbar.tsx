// import { useState } from 'react';
// import { Wrench, Menu, X, LogIn } from 'lucide-react';
// import { Link, useLocation } from 'react-router-dom';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const location = useLocation();
  
//   // Determine if we are in the Dashboard area
//   const isDashboard = location.pathname.startsWith('/dashboard');

//   return (
//     <nav className="bg-white shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {isDashboard ? (
//           // Dashboard header with slide menu trigger
//           <div className="flex items-center h-16">
//             <button
//               onClick={() => setIsOpen(!isOpen)}
//               className="text-gray-700 hover:text-[#FF5733]"
//             >
//               {isOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//             <Link to="/dashboard" className="ml-2 text-xl font-bold text-gray-900">
//               Dashboard
//             </Link>
//           </div>
//         ) : (
//           // Standard Navbar for non-dashboard routes
//           <div className="flex justify-between h-16 items-center">
//             <div className="flex items-center">
//               <Wrench className="h-8 w-8 text-[#FF5733]" />
//               <Link to="/" className="ml-2 text-xl font-bold text-gray-900">
//                 RepairMyBike
//               </Link>
//             </div>
//             <div className="hidden md:flex items-center space-x-8">
//               <Link to="/about" className="text-gray-700 hover:text-[#FF5733]">
//                 About
//               </Link>
//               <Link to="/pricing" className="text-gray-700 hover:text-[#FF5733]">
//                 Pricing
//               </Link>
//               <Link to="/contact" className="text-gray-700 hover:text-[#FF5733]">
//                 Contact
//               </Link>
//               <Link
//                 to="/login-signup"
//                 className="bg-[#FF5733] text-white px-6 py-2 rounded-full hover:bg-[#ff4019] transition-colors"
//               >
//                 Login
//               </Link>
//             </div>
//             <div className="md:hidden">
//               <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="text-gray-700 hover:text-[#FF5733]"
//               >
//                 {isOpen ? <X size={24} /> : <Menu size={24} />}
//               </button>
//             </div>
//           </div>
//         )}

//         {/* Mobile Menu / Dashboard Slide Menu */}
//         {isOpen && (
//           <>
//             {isDashboard ? (
//               // Slide-out sidebar for Dashboard
//               <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-md z-50">
//                 <div className="px-4 pt-4 pb-6 space-y-4">
//                   <Link
//                     to="/dashboard/overview"
//                     onClick={() => setIsOpen(false)}
//                     className="block text-gray-700 hover:text-[#FF5733]"
//                   >
//                     Overview
//                   </Link>
//                   <Link
//                     to="/dashboard/settings"
//                     onClick={() => setIsOpen(false)}
//                     className="block text-gray-700 hover:text-[#FF5733]"
//                   >
//                     Settings
//                   </Link>
//                   <Link
//                     to="/dashboard/profile"
//                     onClick={() => setIsOpen(false)}
//                     className="block text-gray-700 hover:text-[#FF5733]"
//                   >
//                     Profile
//                   </Link>
//                   {/* Add more dashboard links as needed */}
//                 </div>
//               </div>
//             ) : (
//               // Mobile menu for non-dashboard pages
//               <div className="md:hidden">
//                 <div className="px-2 pt-2 pb-3 space-y-1">
//                   <Link
//                     to="/about"
//                     onClick={() => setIsOpen(false)}
//                     className="block px-3 py-2 text-gray-700 hover:text-[#FF5733]"
//                   >
//                     About
//                   </Link>
//                   <Link
//                     to="/pricing"
//                     onClick={() => setIsOpen(false)}
//                     className="block px-3 py-2 text-gray-700 hover:text-[#FF5733]"
//                   >
//                     Pricing
//                   </Link>
//                   <Link
//                     to="/contact"
//                     onClick={() => setIsOpen(false)}
//                     className="block px-3 py-2 text-gray-700 hover:text-[#FF5733]"
//                   >
//                     Contact
//                   </Link>
//                   <Link
//                     to="/login-signup"
//                     onClick={() => setIsOpen(false)}
//                     className="block px-3 py-2 text-gray-700 hover:text-[#FF5733]"
//                   >
//                     Login / Sign Up
//                   </Link>
//                   <Link
//                     to="/booking"
//                     onClick={() => setIsOpen(false)}
//                     className="block w-full mt-2 bg-[#FF5733] text-white px-6 py-2 rounded-full hover:bg-[#ff4019] transition-colors text-center"
//                   >
//                     Book Now
//                   </Link>
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



// Navbar.tsx
import { useState, useEffect } from 'react';
import { Wrench, Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine if we are in the Dashboard area
  const isDashboard = location.pathname.startsWith('/dashboard');

  // Check for auth token when component mounts (or when needed)
  useEffect(() => {
    setIsAuthenticated(!!localStorage.getItem("authToken"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/"); // Redirect after logout, adjust route if needed
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isDashboard ? (
          // Dashboard header with slide menu trigger
          <div className="flex items-center h-16">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#FF5733]"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/dashboard" className="ml-2 text-xl font-bold text-gray-900">
              Dashboard
            </Link>
          </div>
        ) : (
          // Standard Navbar for non-dashboard routes
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Wrench className="h-8 w-8 text-[#FF5733]" />
              <Link to="/" className="ml-2 text-xl font-bold text-gray-900">
                RepairMyBike
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/about" className="text-gray-700 hover:text-[#FF5733]">
                About
              </Link>
              <Link to="/pricing" className="text-gray-700 hover:text-[#FF5733]">
                Pricing
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-[#FF5733]">
                Contact
              </Link>
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="bg-[#FF5733] text-white px-6 py-2 rounded-full hover:bg-[#ff4019] transition-colors"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login-signup"
                  className="bg-[#FF5733] text-white px-6 py-2 rounded-full hover:bg-[#ff4019] transition-colors"
                >
                  Login
                </Link>
              )}
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 hover:text-[#FF5733]"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu / Dashboard Slide Menu */}
        {isOpen && (
          <>
            {isDashboard ? (
              // Slide-out sidebar for Dashboard
              <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-md z-50">
                <div className="px-4 pt-4 pb-6 space-y-4">
                  <Link
                    to="/dashboard/overview"
                    onClick={() => setIsOpen(false)}
                    className="block text-gray-700 hover:text-[#FF5733]"
                  >
                    Overview
                  </Link>
                  <Link
                    to="/dashboard/settings"
                    onClick={() => setIsOpen(false)}
                    className="block text-gray-700 hover:text-[#FF5733]"
                  >
                    Settings
                  </Link>
                  <Link
                    to="/dashboard/profile"
                    onClick={() => setIsOpen(false)}
                    className="block text-gray-700 hover:text-[#FF5733]"
                  >
                    Profile
                  </Link>
                  {/* Add more dashboard links as needed */}
                </div>
              </div>
            ) : (
              // Mobile menu for non-dashboard pages
              <div className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <Link
                    to="/about"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 text-gray-700 hover:text-[#FF5733]"
                  >
                    About
                  </Link>
                  <Link
                    to="/pricing"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 text-gray-700 hover:text-[#FF5733]"
                  >
                    Pricing
                  </Link>
                  <Link
                    to="/contact"
                    onClick={() => setIsOpen(false)}
                    className="block px-3 py-2 text-gray-700 hover:text-[#FF5733]"
                  >
                    Contact
                  </Link>
                  {isAuthenticated ? (
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="block px-3 py-2 text-gray-700 hover:text-[#FF5733]"
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      to="/login-signup"
                      onClick={() => setIsOpen(false)}
                      className="block px-3 py-2 text-gray-700 hover:text-[#FF5733]"
                    >
                      Login / Sign Up
                    </Link>
                  )}
                  <Link
                    to="/booking"
                    onClick={() => setIsOpen(false)}
                    className="block w-full mt-2 bg-[#FF5733] text-white px-6 py-2 rounded-full hover:bg-[#ff4019] transition-colors text-center"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
