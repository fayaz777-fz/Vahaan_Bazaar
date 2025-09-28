import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Mail, Phone, Calendar, MapPin, Heart, Settings, LogOut } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  // Default user data if not available in context
  const defaultUserData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+91 98765 43210',
    gender: 'male',
    joinDate: 'January 15, 2023',
    location: 'Hyderabad, Telangana',
    favoriteVehicles: 5,
    totalBookings: 12
  };

  const [userData, setUserData] = useState(defaultUserData);

  // Update user data when context changes
  useEffect(() => {
    if (user) {
      setUserData({
        ...defaultUserData,
        name: user.name,
        email: user.email,
        phone: user.phone,
        gender: user.gender
      });
    }
  }, [user]);

  const handleLogout = () => {
    // Clear user data from context
    setUser(null);
    // Navigate to login page
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/main')}
                className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 flex items-center"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
                <span className="ml-1 text-gray-600">Back</span>
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                My Profile
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32"></div>
              <div className="px-6 pb-6 -mt-16">
                <div className="flex justify-center">
                  <div className="relative">
                    {userData.gender === 'male' ? (
                      <div className="w-32 h-32 rounded-full bg-blue-100 border-4 border-white flex items-center justify-center">
                        <User className="w-16 h-16 text-blue-500" />
                      </div>
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-pink-100 border-4 border-white flex items-center justify-center">
                        <User className="w-16 h-16 text-pink-500" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-center mt-4">
                  <h2 className="text-2xl font-bold text-gray-800">{userData.name}</h2>
                  <p className="text-gray-600">{userData.email}</p>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Mail className="w-5 h-5 mr-3 text-blue-500" />
                    <span>{userData.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="w-5 h-5 mr-3 text-green-500" />
                    <span>{userData.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-3 text-red-500" />
                    <span>{userData.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-5 h-5 mr-3 text-purple-500" />
                    <span>Member since {userData.joinDate}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">My Activity</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <Heart className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-800">{userData.favoriteVehicles}</p>
                  <p className="text-sm text-gray-600">Favorites</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <Settings className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-800">{userData.totalBookings}</p>
                  <p className="text-sm text-gray-600">Bookings</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Profile Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <div className="bg-gray-50 px-4 py-3 rounded-lg">{userData.name}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="bg-gray-50 px-4 py-3 rounded-lg">{userData.email}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <div className="bg-gray-50 px-4 py-3 rounded-lg">{userData.phone}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                  <div className="bg-gray-50 px-4 py-3 rounded-lg capitalize">{userData.gender}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <div className="bg-gray-50 px-4 py-3 rounded-lg">{userData.location}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                  <div className="bg-gray-50 px-4 py-3 rounded-lg">{userData.joinDate}</div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b">Account Settings</h3>
              <div className="space-y-4">
                <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                  <div className="flex items-center">
                    <Settings className="w-5 h-5 text-blue-500 mr-3" />
                    <span className="font-medium text-gray-800">Edit Profile</span>
                  </div>
                  <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                  <div className="flex items-center">
                    <Heart className="w-5 h-5 text-red-500 mr-3" />
                    <span className="font-medium text-gray-800">My Favorites</span>
                  </div>
                  <ChevronLeft className="w-5 h-5 text-gray-400 rotate-180" />
                </button>
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between p-4 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-200"
                >
                  <div className="flex items-center">
                    <LogOut className="w-5 h-5 text-red-500 mr-3" />
                    <span className="font-medium text-red-700">Logout</span>
                  </div>
                  <ChevronLeft className="w-5 h-5 text-red-400 rotate-180" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;