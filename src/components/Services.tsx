import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import type { ServiceData } from '../data/services';
import { getServiceIcon } from '../data/services';

interface ApiServiceData {
  uuid: string;
  slug: string;
  name: string;
  description?: string;
  features?: string[];
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

const Services = () => {
  const [servicesData, setServicesData] = useState<ServiceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        setError(null);

        const url = import.meta.env.VITE_SERVICE_CATEGORIES_URL;
        if (!url) {
          throw new Error('Service categories URL is not configured');
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch services: ${response.statusText}`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Invalid response format: expected an array');
        }

        const formattedData: ServiceData[] = data
          .filter((item): item is ApiServiceData => {
            return (
              typeof item === 'object' &&
              item !== null &&
              typeof item.uuid === 'string' &&
              typeof item.slug === 'string' &&
              typeof item.name === 'string'
            );
          })
          .map((item) => ({
            id: item.uuid,
            iconName: item.slug.includes('battery') ? 'battery' : 'tool',
            title: item.name,
            description: item.description || 'No description available',
            features: Array.isArray(item.features) ? item.features : [],
            packages: Array.isArray(item.packages)
              ? item.packages.map((pkg) => ({
                  id: pkg.id,
                  name: pkg.name,
                  price: pkg.price,
                  duration: pkg.duration,
                  warranty: pkg.warranty,
                  recommended: pkg.recommended,
                  features: Array.isArray(pkg.features) ? pkg.features : [],
                }))
              : [],
          }));

        if (formattedData.length === 0) {
          throw new Error('No valid service data found in response');
        }

        if (mounted) {
          setServicesData(formattedData);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
        if (mounted) {
          setError(
            error instanceof Error
              ? error.message
              : 'Unable to load services. Please try again later.'
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchServices();
  }, [mounted]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF5733]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] space-y-4">
        <div className="text-red-600 text-center">
          <p className="font-medium">Error loading services</p>
          <p className="text-sm text-gray-600">{error}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="bg-[#FF5733] text-white px-4 py-2 rounded-lg hover:bg-[#ff4019] transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!servicesData.length) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[400px] space-y-4">
        <div className="text-gray-600 text-center">
          <p className="font-medium">No services available</p>
          <p className="text-sm">Please check back later for our service offerings.</p>
        </div>
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
                {service.features && service.features.length > 0 && (
                  <ul className="space-y-2">
                    {service.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-center text-sm text-gray-600">
                        <span className="w-1.5 h-1.5 bg-[#FF5733] rounded-full mr-2"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
                {service.packages && service.packages.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-900">
                      Starting from ₹{Math.min(...service.packages.map((pkg) => pkg.price))}
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
