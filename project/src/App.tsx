import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ServiceDetails from './pages/ServiceDetails';
import TestAPI from './components/TestAPI';  // Add this import

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
          <Route 
            path="/service/:serviceId" 
            element={<ServiceDetails />} 
          />
          <Route 
            path="/test-api" 
            element={<TestAPI />} 
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;