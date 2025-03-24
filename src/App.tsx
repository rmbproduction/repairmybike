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
import BookingForm from './components/BookingForm';
import { Manufacturer } from './types/manufacturer';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
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
          <Route path="/services/:serviceId" element={<ServiceDetails />} />
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
          <Route path="/booking" element={<BookingForm />} />
          <Route path="/test-api" element={<TestAPI />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;