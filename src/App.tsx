// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import Navbar from './components/Navbar';
// // import Hero from './components/Hero';
// // import Services from './components/Services';
// // import HowItWorks from './components/HowItWorks';
// // import Testimonials from './components/Testimonials';
// // import Footer from './components/Footer';
// // import ServiceDetails from './pages/ServiceDetails';
// // import TestAPI from './components/TestAPI';
// // import ManufacturerSelect from './components/ManufacturerSelect';
// // import BookingForm from './components/BookingForm';
// // import LoginSignupPage from './pages/LoginSignupPage';
// // // Change this line
// // import { Manufacturer } from './data/services';

// // function App() {
// //   return (
// //     <Router>
// //       <div className="min-h-screen bg-gray-50">
// //         <Navbar />
// //         <Routes>
// //           <Route 
// //             path="/" 
// //             element={
// //               <main>
// //                 <Hero />
// //                 <Services />
// //                 <HowItWorks />
// //                 <Testimonials />
// //               </main>
// //             } 
// //           />
// //           <Route path="/services/:serviceId" element={<ServiceDetails />} />
// //           <Route 
// //             path="/manufacturers" 
// //             element={
// //               <ManufacturerSelect 
// //                 manufacturers={[]} 
// //                 onSelect={(manufacturer: Manufacturer) => {
// //                   console.log('Manufacturer selected:', manufacturer.id);
// //                 }} 
// //               />
// //             } 
// //           />
// //           <Route path="/booking" element={<BookingForm />} />
// //           <Route path="/test-api" element={<TestAPI />} />
// //           <Route path="/login-signup" element={<LoginSignupPage />} />
// //         </Routes>
// //         <Footer />
// //       </div>
// //     </Router>
// //   );
// // }

// // export default App;


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ServiceDetails from './pages/ServiceDetails';
import TestAPI from './components/TestAPI';
import ManufacturerSelect from './components/ManufacturerSelect';
import LoginSignupPage from './pages/LoginSignupPage';
import About from './pages/About';
import Contact from './pages/Contact';
import Pricing from './pages/Pricing';
import CheckoutPage from './pages/Checkout';
import { Manufacturer } from './data/services';
import FaqPage from './pages/FAQ';
import Booking from './pages/Booking';
import EmailVerification from './pages/EmailVerfication';
import PasswordResetConfirmation from './pages/PasswordResetConfirmation';
import Profile from './pages/ProfilePage';
// import CartPage from './pages/Cart';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />

        <Routes>
          {/* Home Route */}
          <Route 
            path="/" 
            element={
              <main>
                <Hero />
                <Services />
                <HowItWorks />
                <Testimonials />
              </main>
            } 
          />

          {/* Additional Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login-signup" element={<LoginSignupPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Password-reset-confirmation" element={<PasswordResetConfirmation />} />
          {/* <Route path="/cart" element={<CartPage/>} /> */}


          {/* Booking */}
          <Route path="/booking" element={<Booking />} />

          {/* Service Details */}
          <Route path="/services/:serviceId" element={<ServiceDetails />} />
          <Route path="/email-verfied" element={<EmailVerification />} />

          {/* Other Example Pages */}
          <Route 
            path="/manufacturers" 
            element={
              <ManufacturerSelect 
                manufacturers={[]} 
                onSelect={(manufacturer: Manufacturer) => {
                  console.log('Manufacturer selected:', manufacturer.id);
                }} 
              />
            } 
          />
          <Route path="/test-api" element={<TestAPI />} />
        </Routes>

        <Footer />
      </div>
    </Router>

    
  );
}

export default App;
// import "./App.css";
// import { useState, useEffect } from 'react'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Navbar from './components/Navbar'
// import Hero from './components/Hero'
// import Services from './components/Services'
// import HowItWorks from './components/HowItWorks'
// import Testimonials from './components/Testimonials'
// import Footer from './components/Footer'
// import ServiceDetails from './pages/ServiceDetails'
// import TestAPI from './components/TestAPI'
// import ManufacturerSelect from './components/ManufacturerSelect'
// import LoginSignupPage from './pages/LoginSignupPage'
// import About from './pages/About'
// import Contact from './pages/Contact'
// import Pricing from './pages/Pricing'
// import CheckoutPage from './pages/Checkout'
// import { Manufacturer } from './data/services'
// import FaqPage from './pages/FAQ'
// import Booking from './pages/Booking'
// import EmailVerification from './pages/EmailVerfication'
// import PasswordResetConfirmation from './pages/PasswordResetConfirmation'
// import Profile from './pages/ProfilePage'

// function App() {
//   const [session, setSession] = useState(null)

//   useEffect(() => {
//     // Fetch current session
    

//     /
//   }, [])

//   return (
//     <Router>
//       <div className="min-h-screen bg-gray-50">
//         <Navbar />

//         <Routes>
//           {/* Home Route */}
//           <Route 
//             path="/" 
//             element={
//               <main>
//                 <Hero />
//                 <Services />
//                 <HowItWorks />
//                 <Testimonials />
//               </main>
//             } 
//           />

//           {/* Authentication Route */}
//           {!session ? (
//             <Route path="/login-signup" element={<LoginSignupPage />} />
//           ) : (
//             <Route 
//               path="/account"
//               element={<Account key={session.user.id} session={session} />}
//             />
//           )}

//           {/* Additional Pages */}
//           <Route path="/about" element={<About />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/pricing" element={<Pricing />} />
//           <Route path="/checkout" element={<CheckoutPage />} />
//           <Route path="/faq" element={<FaqPage />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/Password-reset-confirmation" element={<PasswordResetConfirmation />} />
//           <Route path="/email-verfied" element={<EmailVerification />} />

//           {/* Booking */}
//           <Route path="/booking" element={<Booking />} />

//           {/* Service Details */}
//           <Route path="/services/:serviceId" element={<ServiceDetails />} />

//           {/* Manufacturer Select Example */}
//           <Route 
//             path="/manufacturers" 
//             element={
//               <ManufacturerSelect 
//                 manufacturers={[]} 
//                 onSelect={(manufacturer: Manufacturer) => {
//                   console.log('Manufacturer selected:', manufacturer.id)
//                 }} 
//               />
//             } 
//           />

//           {/* Other Example Pages */}
//           <Route path="/test-api" element={<TestAPI />} />
//         </Routes>

//         <Footer />
//       </div>
//     </Router>
//   )
// }

// export default App
