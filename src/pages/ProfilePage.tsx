import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, Settings, LogOut, Key, Bike, Calendar, Bell, 
  CreditCard, MapPin, Clock, Shield
} from 'lucide-react';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  preferredLocation: string;
  memberSince: string;
}

const mockUserProfile: UserProfile = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  address: '123 Bike Street, Cycle City, BC 12345',
  preferredLocation: 'Home',
  memberSince: 'January 2024'
};

const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'services' | 'settings'>('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>(mockUserProfile);

  const handleLogout = () => {
    // Handle logout logic here
    navigate('/');
  };

  const handlePasswordChange = () => {
    navigate('/reset-password');
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Handle profile update API call here
  };

  const upcomingServices = [
    {
      id: 1,
      service: 'Premium Tune-Up',
      date: '2024-03-15',
      time: '10:00 AM',
      status: 'Scheduled'
    },
    {
      id: 2,
      service: 'Brake Service',
      date: '2024-03-20',
      time: '2:30 PM',
      status: 'Pending'
    }
  ];

  const serviceHistory = [
    {
      id: 3,
      service: 'Basic Maintenance',
      date: '2024-02-10',
      mechanic: 'Mike Smith',
      rating: 5
    },
    {
      id: 4,
      service: 'Tire Replacement',
      date: '2024-01-15',
      mechanic: 'Sarah Johnson',
      rating: 4
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
              <div className="text-center">
                <div className="h-24 w-24 rounded-full bg-[#FFF5F2] flex items-center justify-center mx-auto">
                  <User className="h-12 w-12 text-[#FF5733]" />
                </div>
                <h2 className="mt-4 text-xl font-semibold text-gray-900">{profile.name}</h2>
                <p className="text-sm text-gray-500">Member since {profile.memberSince}</p>
              </div>

              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center px-4 py-2 text-sm rounded-lg ${
                    activeTab === 'profile'
                      ? 'bg-[#FFF5F2] text-[#FF5733]'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <User className="h-5 w-5 mr-3" />
                  Profile Information
                </button>
                <button
                  onClick={() => setActiveTab('services')}
                  className={`w-full flex items-center px-4 py-2 text-sm rounded-lg ${
                    activeTab === 'services'
                      ? 'bg-[#FFF5F2] text-[#FF5733]'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Bike className="h-5 w-5 mr-3" />
                  My Services
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center px-4 py-2 text-sm rounded-lg ${
                    activeTab === 'settings'
                      ? 'bg-[#FFF5F2] text-[#FF5733]'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Settings className="h-5 w-5 mr-3" />
                  Settings
                </button>
              </nav>

              <div className="pt-6 border-t border-gray-200">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Logout
                </button>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Profile Information</h3>
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-sm text-[#FF5733] hover:text-[#ff4019]"
                  >
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Full Name</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF5733] focus:border-[#FF5733]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF5733] focus:border-[#FF5733]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Phone</label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF5733] focus:border-[#FF5733]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Preferred Location</label>
                      <input
                        type="text"
                        value={profile.preferredLocation}
                        onChange={(e) => setProfile({ ...profile, preferredLocation: e.target.value })}
                        disabled={!isEditing}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF5733] focus:border-[#FF5733]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address</label>
                    <input
                      type="text"
                      value={profile.address}
                      onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                      disabled={!isEditing}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#FF5733] focus:border-[#FF5733]"
                    />
                  </div>

                  {isEditing && (
                    <div className="flex justify-end space-x-4">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveProfile}
                        className="px-4 py-2 bg-[#FF5733] text-white rounded-lg hover:bg-[#ff4019]"
                      >
                        Save Changes
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Services</h3>
                  <div className="space-y-4">
                    {upcomingServices.map((service) => (
                      <div key={service.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-[#FFF5F2] flex items-center justify-center">
                            <Bike className="h-5 w-5 text-[#FF5733]" />
                          </div>
                          <div className="ml-4">
                            <h4 className="font-medium text-gray-900">{service.service}</h4>
                            <p className="text-sm text-gray-500">
                              {service.date} at {service.time}
                            </p>
                          </div>
                        </div>
                        <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
                          {service.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Service History</h3>
                  <div className="space-y-4">
                    {serviceHistory.map((service) => (
                      <div key={service.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-full bg-[#FFF5F2] flex items-center justify-center">
                            <Clock className="h-5 w-5 text-[#FF5733]" />
                          </div>
                          <div className="ml-4">
                            <h4 className="font-medium text-gray-900">{service.service}</h4>
                            <p className="text-sm text-gray-500">
                              {service.date} • {service.mechanic}
                            </p>
                          </div>
                        </div>
                        <div className="flex text-yellow-400">
                          {[...Array(service.rating)].map((_, i) => (
                            <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h3>
                  <div className="space-y-4">
                    <button
                      onClick={handlePasswordChange}
                      className="w-full flex items-center justify-between p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center">
                        <Key className="h-5 w-5 text-gray-400" />
                        <span className="ml-3">Change Password</span>
                      </div>
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    <button className="w-full flex items-center justify-between p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center">
                        <Bell className="h-5 w-5 text-gray-400" />
                        <span className="ml-3">Notification Settings</span>
                      </div>
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    <button className="w-full flex items-center justify-between p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center">
                        <CreditCard className="h-5 w-5 text-gray-400" />
                        <span className="ml-3">Payment Methods</span>
                      </div>
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    <button className="w-full flex items-center justify-between p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-gray-400" />
                        <span className="ml-3">Saved Locations</span>
                      </div>
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    <button className="w-full flex items-center justify-between p-4 text-left border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 text-gray-400" />
                        <span className="ml-3">Privacy Settings</span>
                      </div>
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Danger Zone</h3>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;