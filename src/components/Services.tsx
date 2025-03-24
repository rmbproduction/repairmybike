import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { ServiceData } from '../data/services';
import { getServiceIcon } from '../data/services';

const Services = () => {
  const [servicesData, setServicesData] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Import services dynamically to avoid potential issues
        const { services } = await import('../data/services');
        
        if (!Array.isArray(services) || services.length === 0) {
          throw new Error('No services data available');
        }
        
        setServicesData(services);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to fetch services');
        console.error('Error fetching services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF5733]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!servicesData.length) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-gray-600">No services available</div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gray-50" id="services">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => {
            const IconComponent = getServiceIcon(service.iconName);
            return (
              <Link
                to={`/services/${service.id}`}
                key={service.id}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-[#FF5733] bg-opacity-10 rounded-lg">
                    <IconComponent className="w-6 h-6 text-[#FF5733]" />
                  </div>
                  <h3 className="text-xl font-semibold ml-3">{service.title}</h3>
                </div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                {service.features && (
                  <ul className="space-y-2">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 bg-[#FF5733] rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
                {service.packages && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-900">
                      Starting from ₹{Math.min(...service.packages.map(pkg => pkg.price))}
                    </p>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;