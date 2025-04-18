import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Clock, Shield, CheckCircle2, Timer, Calendar } from 'lucide-react';
import SelectVehicle from '../components/SelectVehicle';
import { VehicleModel } from '../components/SelectVehicle';

interface Feature {
  id: string;
  name: string;
}

interface ServiceData {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: string;
  discount: string;
  discounted_price: number;
  description: string;
  duration: string;
  warranty: string;
  recommended: string;
  features: Feature[];
  image?: string;
  manufacturer?: string;
  vehicle_type?: number;
  packages?: Array<{
    id: number;
    name: string;
    price: number;
    duration: string;
    warranty: string;
    recommended: string;
    features: string[];
  }>;
}

const ServiceDetails = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();
  const [services, setServices] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<VehicleModel | null>(null);
  const [cart, setCart] = useState<ServiceData[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Retrieve stored vehicle and cart data from sessionStorage
  useEffect(() => {
    try {
      const ownershipData = sessionStorage.getItem('userVehicleOwnership');
      if (ownershipData) {
        setSelectedVehicle(JSON.parse(ownershipData));
      }
      const storedCart = sessionStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (err) {
      console.error('Error parsing stored data:', err);
      // Clear invalid data
      sessionStorage.removeItem('userVehicleOwnership');
      sessionStorage.removeItem('cart');
    }
  }, []);

  // Update cart in sessionStorage whenever cart state changes
  useEffect(() => {
    try {
      sessionStorage.setItem('cart', JSON.stringify(cart));
    } catch (err) {
      console.error('Error saving cart to sessionStorage:', err);
    }
  }, [cart]);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!serviceId) throw new Error('Service ID is missing from the URL.');
        
        // Base URL from env or default to your API base
        const baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api/service';
        
        // Construct URL properly matching your API structure
        const url = `${baseUrl}/categories/${serviceId}/services/`;

        console.log('Fetching URL:', url); // Debug log

        const response = await fetch(url);
        console.log('Response status:', response.status); // Debug log
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          console.error('Error response:', errorData); // Debug log
          throw new Error(errorData.message || `Failed to fetch service details: ${response.statusText}`);
        }
        
        const data: ServiceData[] = await response.json();
        console.log('Received data:', data); // Debug log
        
        if (!Array.isArray(data)) {
          console.error('Data is not an array:', data); // Debug log
          throw new Error('Invalid response format: expected an array');
        }
        
        if (data.length === 0) {
          console.log('No services found for category:', serviceId); // Debug log
          throw new Error('No services found for this category.');
        }
        
        setServices(data);
      } catch (err: any) {
        console.error('Error fetching service details:', err);
        setError(err.message || 'An unexpected error occurred.');
      } finally {
        setLoading(false);
      }
    };
    fetchServiceDetails();
  }, [serviceId]);

  const addToCart = (service: ServiceData) => {
    setCart([...cart, service]);
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-xl mx-auto">
            <input
              type="text"
              placeholder="Search services..."
              className="w-full px-4 py-3 pl-12 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF5733] focus:border-transparent"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg"
        >
          {loading ? (
            <div className="text-center text-gray-600 p-8">Loading...</div>
          ) : error ? (
            <div className="text-center text-red-500 p-8">
              <p>{error}</p>
            </div>
          ) : (
            <div className="grid gap-8">
              {services.map((service) => (
                <div key={service.id} className="p-8">
                  <div className="flex flex-col">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{service.name}</h2>
                    <p className="text-gray-600 mb-6">{service.description}</p>

                    <div className="flex items-center gap-6 mb-4">
                      <div className="flex items-center text-gray-600">
                        <Timer className="w-5 h-5 mr-2" />
                        <span>{service.duration} Taken</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <Calendar className="w-5 h-5 mr-2" />
                        <span>{service.warranty}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-6">
                      Recommended: {service.recommended}
                    </p>

                    {selectedVehicle ? (
                      <div className="flex justify-between items-center mb-6">
                        <div>
                          <p className="text-2xl font-bold text-[#FF5733]">₹{service.price}</p>
                          {service.discount && (
                            <p className="text-sm text-gray-500">
                              Save ₹{service.discount}
                            </p>
                          )}
                        </div>
                        <button
                          onClick={() => addToCart(service)}
                          className="bg-[#FF5733] text-white px-6 py-2 rounded-xl hover:bg-[#ff4019] transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full bg-[#FF5733] text-white px-6 py-2 rounded-xl hover:bg-[#ff4019] transition-colors mb-6"
                      >
                        SELECT CAR
                      </button>
                    )}

                    <div className="grid gap-3">
                      {service.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center text-gray-700"
                        >
                          <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                          {feature.name}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {cart.length > 0 && (
          <button
            onClick={() => navigate('/cart')}
            className="mt-6 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition block mx-auto"
          >
            Show Cart ({cart.length})
          </button>
        )}
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition"
              >
                Close
              </button>
              <SelectVehicle />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServiceDetails;
