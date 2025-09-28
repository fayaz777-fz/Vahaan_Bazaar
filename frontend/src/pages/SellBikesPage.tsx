import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Search, RefreshCw } from 'lucide-react';
import { Bike } from '../types';
import { bikes as existingBikes } from '../data/bikes';
import BikeCard from '../components/BikeCard';
import BikeDetails from '../components/BikeDetails';
import SellBikeForm from '../components/SellBikeForm';
import apiService from '../services/api';

const SellBikesPage = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'list' | 'form' | 'details'>('list');
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [userBikes, setUserBikes] = useState<Bike[]>([]);
  const [backendBikes, setBackendBikes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    sold: 0,
    petrol: 0,
    electric: 0
  });

  // Fetch bikes from backend
  const fetchBikes = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await apiService.getBikes({
        page: 1,
        limit: 50,
        availability: 'available'
      });
      setBackendBikes(response.data.bikes || []);
    } catch (err: any) {
      console.error('Error fetching bikes:', err);
      setError('Failed to load bikes from server');
    } finally {
      setLoading(false);
    }
  };

  // Fetch bike statistics
  const fetchStats = async () => {
    try {
      const response = await apiService.getBikeStats();
      setStats(response.data);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchBikes();
    fetchStats();
  }, []);

  // Convert backend bike to local bike format
  const convertBackendBike = (backendBike: any): Bike => {
    return {
      id: backendBike._id || backendBike.id || Date.now().toString(),
      name: backendBike.name,
      brand: backendBike.brand,
      images: backendBike.images || ['https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=800'],
      daysUsed: backendBike.daysUsed,
      condition: 'used', // Map backend condition to vehicle condition
      mileage: backendBike.mileage,
      presentPrice: backendBike.presentPrice,
      pastPrice: backendBike.pastPrice,
      license: backendBike.license,
      type: backendBike.type,
      year: backendBike.year,
      engineCapacity: backendBike.engineCapacity,
      batteryCapacity: backendBike.batteryCapacity,
      // Vehicle interface required fields
      _id: backendBike._id || backendBike.id || Date.now().toString(),
      model: backendBike.model || '',
      price: backendBike.presentPrice,
      discount: Math.round(((backendBike.pastPrice - backendBike.presentPrice) / backendBike.pastPrice) * 100) || 0,
      fuelType: backendBike.type === 'Electric' ? 'electric' : 'petrol',
      transmission: 'manual',
      description: '',
      features: [],
      specifications: {
        topSpeed: backendBike.topSpeed
      },
      availability: 'available',
      location: { country: 'India' },
      seller: {
        _id: '',
        name: '',
        email: ''
      },
      isPromoted: false,
      rating: 0,
      reviewCount: 0,
      viewCount: 0,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  };

  // Combine all bikes (existing + user added + backend)
  const allBikes = [
    ...existingBikes,
    ...userBikes,
    ...backendBikes.map(convertBackendBike)
  ];

  // Filter bikes based on search term
  const filteredBikes = allBikes.filter(bike =>
    bike.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bike.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBikeClick = (bike: Bike) => {
    setSelectedBike(bike);
    setCurrentView('details');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedBike(null);
  };

  const handleShowForm = () => {
    setCurrentView('form');
    setSelectedBike(null);
  };

  const handleAddNewBike = async (bikeData: any) => {
    try {
      setLoading(true);
      setError('');
      
      // Submit to backend first
      const backendData = {
        name: bikeData.name,
        brand: bikeData.brand,
        daysUsed: parseInt(bikeData.daysUsed),
        condition: bikeData.condition, // Keep original condition for backend
        mileage: parseFloat(bikeData.mileage),
        presentPrice: parseFloat(bikeData.presentPrice),
        pastPrice: parseFloat(bikeData.pastPrice),
        license: bikeData.license,
        type: bikeData.type as 'Petrol' | 'Electric',
        year: parseInt(bikeData.year),
        topSpeed: parseFloat(bikeData.topSpeed),
        engineCapacity: bikeData.engineCapacity,
        batteryCapacity: bikeData.batteryCapacity,
        sellerName: 'Current User',
        sellerEmail: 'user@example.com',
        sellerPhone: '1234567890'
      };
      
      const response = await apiService.createBikeListing(backendData as any);

      // Add to local state for immediate UI update
      const newBike: Bike = {
        id: (response.data._id || Date.now()).toString(),
        name: bikeData.name || '',
        brand: bikeData.brand || '',
        images: ['https://images.pexels.com/photos/2116475/pexels-photo-2116475.jpeg?auto=compress&cs=tinysrgb&w=800'],
        daysUsed: typeof bikeData.daysUsed === 'string' ? parseInt(bikeData.daysUsed) || 0 : bikeData.daysUsed || 0,
        condition: 'used',
        mileage: typeof bikeData.mileage === 'string' ? parseInt(bikeData.mileage) || 0 : bikeData.mileage || 0,
        presentPrice: typeof bikeData.presentPrice === 'string' ? parseInt(bikeData.presentPrice) || 0 : bikeData.presentPrice || 0,
        pastPrice: typeof bikeData.pastPrice === 'string' ? parseInt(bikeData.pastPrice) || 0 : bikeData.pastPrice || 0,
        license: bikeData.license || '',
        type: bikeData.type || 'Petrol',
        year: typeof bikeData.year === 'string' ? parseInt(bikeData.year) || new Date().getFullYear() : bikeData.year || new Date().getFullYear(),
        engineCapacity: bikeData.engineCapacity,
        batteryCapacity: bikeData.batteryCapacity,
        // Vehicle interface required fields
        _id: (response.data._id || Date.now()).toString(),
        model: '',
        price: typeof bikeData.presentPrice === 'string' ? parseInt(bikeData.presentPrice) || 0 : bikeData.presentPrice || 0,
        discount: 0,
        fuelType: bikeData.type === 'Electric' ? 'electric' : 'petrol',
        transmission: 'manual',
        description: '',
        features: [],
        specifications: {
          topSpeed: typeof bikeData.topSpeed === 'string' ? parseInt(bikeData.topSpeed) || 0 : bikeData.topSpeed || 0
        },
        availability: 'available',
        location: { country: 'India' },
        seller: { _id: '', name: '', email: '' },
        isPromoted: false,
        rating: 0,
        reviewCount: 0,
        viewCount: 0,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setUserBikes(prev => [...prev, newBike]);
      setCurrentView('list');
      
      // Refresh data from backend
      await fetchBikes();
      await fetchStats();
      
    } catch (err: any) {
      console.error('Error adding bike:', err);
      setError(err.message || 'Failed to add bike listing');
    } finally {
      setLoading(false);
    }
  };

  if (currentView === 'form') {
    return <SellBikeForm onBack={handleBackToList} onSubmit={handleAddNewBike} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/main')}
                className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Sell Your Bikes</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Search and Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search bikes by name or brand..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  fetchBikes();
                  fetchStats();
                }}
                disabled={loading}
                className="flex items-center gap-2 px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
            
            <div className="flex gap-6 text-center">
              <div>
                <p className="text-2xl font-bold text-blue-600">{stats.available}</p>
                <p className="text-sm text-gray-600">Available</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{userBikes.length}</p>
                <p className="text-sm text-gray-600">Your Listings</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-600">{stats.petrol}</p>
                <p className="text-sm text-gray-600">Petrol</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">{stats.electric}</p>
                <p className="text-sm text-gray-600">Electric</p>
              </div>
            </div>
          </div>
          
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading bikes...</span>
          </div>
        )}

        {/* Bikes Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBikes.map((bike) => (
              <div key={bike.id} className="relative">
                <BikeCard bike={bike} onClick={handleBikeClick} />
                {userBikes.some(userBike => userBike.id === bike.id) && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    Your Listing
                  </div>
                )}
                {backendBikes.some(backendBike => backendBike._id === bike.id) && (
                  <div className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    Listed
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Sell New Bike Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleShowForm}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium text-lg shadow-lg"
          >
            <Plus size={24} />
            Sell New Bike
          </button>
        </div>

        {!loading && filteredBikes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🏍️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No bikes found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'Try adjusting your search terms' : 'Start by listing your first bike'}
            </p>
            <button
              onClick={handleShowForm}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              List Your Bike
            </button>
          </div>
        )}
      </div>

      {/* Bike Details Modal */}
      {currentView === 'details' && selectedBike && (
        <BikeDetails bike={selectedBike} onClose={handleBackToList} />
      )}
    </div>
  );
};

export default SellBikesPage;