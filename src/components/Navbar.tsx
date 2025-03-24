import { useState } from 'react';
import { Wrench, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Wrench className="h-8 w-8 text-[#FF5733]" />
            <Link to="/" className="ml-2 text-xl font-bold text-gray-900">RepairMyBike</Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="text-gray-700 hover:text-[#FF5733]">Services</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-[#FF5733]">How It Works</a>
            <a href="#pricing" className="text-gray-700 hover:text-[#FF5733]">Pricing</a>
            <a href="#contact" className="text-gray-700 hover:text-[#FF5733]">Contact</a>
            <button className="bg-[#FF5733] text-white px-6 py-2 rounded-full hover:bg-[#ff4019] transition-colors">
              Book Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-[#FF5733]"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#services" className="block px-3 py-2 text-gray-700 hover:text-[#FF5733]">Services</a>
              <a href="#how-it-works" className="block px-3 py-2 text-gray-700 hover:text-[#FF5733]">How It Works</a>
              <a href="#pricing" className="block px-3 py-2 text-gray-700 hover:text-[#FF5733]">Pricing</a>
              <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-[#FF5733]">Contact</a>
              <button className="w-full mt-2 bg-[#FF5733] text-white px-6 py-2 rounded-full hover:bg-[#ff4019] transition-colors">
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;