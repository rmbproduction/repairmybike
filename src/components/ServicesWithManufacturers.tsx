import { Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { services } from '../data/services';

interface Manufacturer {
  id: string;
  name: string;
  logo: string;
  specializations: string[];
  rating?: number;
  experience?: string;
}

const ManufacturerCard = ({ manufacturer }: { manufacturer: Manufacturer }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-4 mb-4">
        <img 
          src={manufacturer.logo} 
          alt={manufacturer.name} 
          className="h-16 w-16 object-contain"
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.src = '/manufacturers/default.png';
          }}
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{manufacturer.name}</h3>
          {manufacturer.rating && (
            <div className="flex items-center gap-2 mt-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-600">{manufacturer.rating}</span>
            </div>
          )}
          {manufacturer.experience && (
            <p className="text-sm text-gray-500">{manufacturer.experience}</p>
          )}
        </div>
      </div>
      
      <div className="mt-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Specializations:</p>
        <div className="flex flex-wrap gap-2">
          {manufacturer.specializations.map((spec, i) => (
            <span 
              key={i}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ServicesWithManufacturers = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      {services.map((service) => (
        <div key={service.id} className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            {service.iconName && (
              <div className="p-3 bg-[#FF5733] bg-opacity-10 rounded-xl">
                <Star className="w-6 h-6 text-[#FF5733]" />
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{service.title}</h2>
              <p className="text-gray-600 mt-1">{service.description}</p>
            </div>
          </div>
          
          {service.manufacturers && service.manufacturers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {service.manufacturers.map((manufacturer) => (
                <ManufacturerCard 
                  key={manufacturer.id} 
                  manufacturer={manufacturer} 
                />
              ))}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-6 text-center">
              <p className="text-gray-500">No manufacturers available for this service.</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ServicesWithManufacturers;