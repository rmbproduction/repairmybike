import { useState } from 'react';

interface Manufacturer {
  id: string;
  name: string;
  logo: string;
  specializations: string[];
  rating?: number;
  experience?: string;
}

interface ManufacturerSelectProps {
  manufacturers: Manufacturer[];
  onSelect: (manufacturer: Manufacturer) => void;
}

const ManufacturerSelect = ({ manufacturers, onSelect }: ManufacturerSelectProps) => {
  const [selectedManufacturer, setSelectedManufacturer] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = manufacturers.find(m => m.id === e.target.value);
    if (selected) {
      setSelectedManufacturer(selected.id);
      onSelect(selected);
    }
  };

  return (
    <div className="w-full">
      <select
        value={selectedManufacturer}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF5733] focus:border-transparent"
      >
        <option value="">Select a Manufacturer</option>
        {manufacturers.map((manufacturer) => (
          <option key={manufacturer.id} value={manufacturer.id}>
            {manufacturer.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ManufacturerSelect;