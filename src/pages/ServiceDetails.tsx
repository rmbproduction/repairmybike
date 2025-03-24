import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Shield, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { ServiceData, iconComponents, services } from '../data/services';
import ManufacturerSelect from '../components/ManufacturerSelect';

interface Manufacturer {
  id: string;
  name: string;
  logo: string;
  specializations: string[];
  rating?: number;
  experience?: string;
}

const ServiceDetails = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const [service, setService] = useState<ServiceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showManufacturers, setShowManufacturers] = useState(false);

  useEffect(() => {
    const fetchServiceDetails = async () => {
      if (!serviceId) {
        setError('Invalid service ID');
        setLoading(false);
        return;
      }

      try {
        const localService = services.find(s => s.id === serviceId);
        if (localService) {
          setService(localService);
        } else {
          setError('Service not found');
        }
      } catch (err) {
        console.error('Error:', err);
        setError('Failed to fetch service details');
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [serviceId]);

  const handleManufacturerSelect = (manufacturer: Manufacturer) => {
    // Navigate using the manufacturer's id
    navigate(`/booking?service=${serviceId}&manufacturer=${manufacturer.id}`);
  };

  const handleBookNow = () => {
    setShowManufacturers(true);
    navigate(`/manufacturers?service=${serviceId}`);
  };

  if (loading) return <div className="py-12 text-center">Loading...</div>;
  if (error) return <div className="py-12 text-center text-red-500">{error}</div>;
  if (!service) return <div className="py-12 text-center">Service not found</div>;
  if (showManufacturers && service) {
    return (
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ManufacturerSelect 
            manufacturers={service.manufacturers || []}
            onSelect={handleManufacturerSelect} 
          />
        </div>
      </div>
    );
  }

  const IconComponent = iconComponents[service.iconName] || iconComponents['tool'];

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Service Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-[#FFF5F2] rounded-xl flex items-center justify-center">
                <IconComponent className="w-8 h-8 text-[#FF5733]" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{service.title}</h1>
                <p className="text-gray-600 mt-1">{service.description}</p>
                {service.rating && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-yellow-500">★ {service.rating}</span>
                    <span className="text-gray-500">({service.reviews} reviews)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Service Packages or Features */}
            {service.packages ? (
              <div className="grid gap-8 mt-8">
                {service.packages.map((pkg) => (
                  <motion.div
                    key={pkg.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="border border-gray-200 rounded-xl p-6"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{pkg.name}</h3>
                        <div className="text-2xl font-bold text-[#FF5733] mt-2">₹{pkg.price}</div>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center text-gray-600">
                            <Clock className="w-4 h-4 mr-1" />
                            {pkg.duration}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <Shield className="w-4 h-4 mr-1" />
                            {pkg.warranty}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          Recommended: {pkg.recommended}
                        </p>
                      </div>
                      <button
                        onClick={handleBookNow}
                        className="bg-[#FF5733] text-white px-6 py-2 rounded-xl hover:bg-[#ff4019] transition-colors"
                      >
                        Book Now
                      </button>
                    </div>
                    <div className="grid gap-3">
                      {pkg.features.map((feature, i) => (
                        <div key={i} className="flex items-center text-gray-700">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="mt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Features</h3>
                <div className="grid gap-3">
                  {service.features?.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center text-gray-700"
                    >
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                      {feature}
                    </motion.div>
                  ))}
                </div>
                <button
                  onClick={handleBookNow}
                  className="mt-6 bg-[#FF5733] text-white px-6 py-2 rounded-xl hover:bg-[#ff4019] transition-colors"
                >
                  Book Now
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServiceDetails;