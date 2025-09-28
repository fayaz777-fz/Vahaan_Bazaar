import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Search, RefreshCw } from 'lucide-react';
import { Scooter } from '../types';
import { scooters as existingScooters } from '../data/scooters';
import ScooterCard from '../components/ScooterCard';
import ScooterDetails from '../components/ScooterDetails';
import SellScooterForm from '../components/SellScooterForm';
import apiService from '../services/api';

const SellScootersPage = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'list' | 'form' | 'details'>('list');
  const [selectedScooter, setSelectedScooter] = useState<Scooter | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [userScooters, setUserScooters] = useState<Scooter[]>([]);
  const [backendScooters, setBackendScooters] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    sold: 0,
    petrol: 0,
    electric: 0
  });

  // Fetch scooters from backend
  const fetchScooters = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await apiService.getScooters({
        page: 1,
        limit: 50,
        availability: 'available'
      });
      setBackendScooters(response.data.scooters || []);
    } catch (err: any) {
      console.error('Error fetching scooters:', err);
      setError('Failed to load scooters from server');
    } finally {
      setLoading(false);
    }
  };

  // Fetch scooter statistics
  const fetchStats = async () => {
    try {
      const response = await apiService.getScooterStats();
      setStats(response.data);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchScooters();
    fetchStats();
  }, []);

  // Convert backend scooter to local scooter format
  const convertBackendScooter = (backendScooter: any): Scooter => {
    return {
      id: backendScooter._id || backendScooter.id || Date.now().toString(),
      name: backendScooter.name,
      brand: backendScooter.brand,
      images: backendScooter.images || ['https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=800'],
      daysUsed: backendScooter.daysUsed,
      condition: 'used', // Map backend condition to vehicle condition
      mileage: backendScooter.mileage,
      presentPrice: backendScooter.presentPrice,
      pastPrice: backendScooter.pastPrice,
      license: backendScooter.license,
      type: backendScooter.type,
      year: backendScooter.year,
      engineCapacity: backendScooter.engineCapacity,
      batteryCapacity: backendScooter.batteryCapacity,
      // Vehicle interface required fields
      _id: backendScooter._id || backendScooter.id || Date.now().toString(),
      model: backendScooter.model || '',
      price: backendScooter.presentPrice,
      discount: Math.round(((backendScooter.pastPrice - backendScooter.presentPrice) / backendScooter.pastPrice) * 100) || 0,
      fuelType: backendScooter.type === 'Electric' ? 'electric' : 'petrol',
      transmission: 'automatic',
      description: '',
      features: [],
      specifications: {
        topSpeed: backendScooter.topSpeed
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

  // Combine all scooters (existing + user added + backend)
  const allScooters = [
    ...existingScooters,
    ...userScooters,
    ...backendScooters.map(convertBackendScooter)
  ];

  // Filter scooters based on search term
  const filteredScooters = allScooters.filter(scooter =>
    scooter.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    scooter.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleScooterClick = (scooter: Scooter) => {
    setSelectedScooter(scooter);
    setCurrentView('details');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedScooter(null);
  };

  const handleShowForm = () => {
    setCurrentView('form');
    setSelectedScooter(null);
  };

  const handleAddNewScooter = async (scooterData: any) => {
    try {
      setLoading(true);
      setError('');
      
      // Submit to backend first
      const backendData = {
        name: scooterData.name,
        brand: scooterData.brand,
        daysUsed: parseInt(scooterData.daysUsed),
        condition: scooterData.condition, // Keep original condition for backend
        mileage: parseFloat(scooterData.mileage),
        presentPrice: parseFloat(scooterData.presentPrice),
        pastPrice: parseFloat(scooterData.pastPrice),
        license: scooterData.license,
        type: scooterData.type as 'Petrol' | 'Electric',
        year: parseInt(scooterData.year),
        topSpeed: parseFloat(scooterData.topSpeed),
        engineCapacity: scooterData.engineCapacity,
        batteryCapacity: scooterData.batteryCapacity,
        sellerName: 'Current User',
        sellerEmail: 'user@example.com',
        sellerPhone: '1234567890'
      };
      
      const response = await apiService.createScooterListing(backendData as any);

      // Add to local state for immediate UI update
      const newScooter: Scooter = {
        id: (response.data._id || Date.now()).toString(),
        name: scooterData.name || '',
        brand: scooterData.brand || '',
        images: ['https://images.pexels.com/photos/1119796/pexels-photo-1119796.jpeg?auto=compress&cs=tinysrgb&w=800'],
        daysUsed: typeof scooterData.daysUsed === 'string' ? parseInt(scooterData.daysUsed) || 0 : scooterData.daysUsed || 0,
        condition: 'used',
        mileage: typeof scooterData.mileage === 'string' ? parseInt(scooterData.mileage) || 0 : scooterData.mileage || 0,
        presentPrice: typeof scooterData.presentPrice === 'string' ? parseInt(scooterData.presentPrice) || 0 : scooterData.presentPrice || 0,
        pastPrice: typeof scooterData.pastPrice === 'string' ? parseInt(scooterData.pastPrice) || 0 : scooterData.pastPrice || 0,
        license: scooterData.license || '',
        type: scooterData.type || 'Petrol',
        year: typeof scooterData.year === 'string' ? parseInt(scooterData.year) || new Date().getFullYear() : scooterData.year || new Date().getFullYear(),
        engineCapacity: scooterData.engineCapacity,
        batteryCapacity: scooterData.batteryCapacity,
        // Vehicle interface required fields
        _id: (response.data._id || Date.now()).toString(),
        model: '',
        price: typeof scooterData.presentPrice === 'string' ? parseInt(scooterData.presentPrice) || 0 : scooterData.presentPrice || 0,
        discount: 0,
        fuelType: scooterData.type === 'Electric' ? 'electric' : 'petrol',
        transmission: 'automatic',
        description: '',
        features: [],
        specifications: {
          topSpeed: typeof scooterData.topSpeed === 'string' ? parseInt(scooterData.topSpeed) || 0 : scooterData.topSpeed || 0
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

      setUserScooters(prev => [...prev, newScooter]);
      setCurrentView('list');
      
      // Refresh data from backend
      await fetchScooters();
      await fetchStats();
      
    } catch (err: any) {
      console.error('Error adding scooter:', err);
      setError(err.message || 'Failed to add scooter listing');
    } finally {
      setLoading(false);
    }
  };

  if (currentView === 'form') {
    return <SellScooterForm onBack={handleBackToList} onSubmit={handleAddNewScooter} />;
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
              <h1 className="text-2xl font-bold text-gray-900">Sell Your Scooters</h1>
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
                placeholder="Search scooters by name or brand..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => {
                  fetchScooters();
                  fetchStats();
                }}
                disabled={loading}
                className="flex items-center gap-2 px-3 py-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
            
            <div className="flex gap-6 text-center">
              <div>
                <p className="text-2xl font-bold text-purple-600">{stats.available}</p>
                <p className="text-sm text-gray-600">Available</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{userScooters.length}</p>
                <p className="text-sm text-gray-600">Your Listings</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">{stats.petrol}</p>
                <p className="text-sm text-gray-600">Petrol</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-600">{stats.electric}</p>
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
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            <span className="ml-3 text-gray-600">Loading scooters...</span>
          </div>
        )}

        {/* Scooters Grid */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredScooters.map((scooter) => (
              <div key={scooter.id} className="relative">
                <ScooterCard scooter={scooter} onClick={handleScooterClick} />
                {userScooters.some(userScooter => userScooter.id === scooter.id) && (
                  <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    Your Listing
                  </div>
                )}
                {backendScooters.some(backendScooter => backendScooter._id === scooter.id) && (
                  <div className="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    Listed
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Sell New Scooter Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleShowForm}
            className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-medium text-lg shadow-lg"
          >
            <Plus size={24} />
            Sell New Scooter
          </button>
        </div>

        {!loading && filteredScooters.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🛵</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No scooters found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm ? 'Try adjusting your search terms' : 'Start by listing your first scooter'}
            </p>
            <button
              onClick={handleShowForm}
              className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              List Your Scooter
            </button>
          </div>
        )}
      </div>

      {/* Scooter Details Modal */}
      {currentView === 'details' && selectedScooter && (
        <ScooterDetails scooter={selectedScooter} onClose={handleBackToList} />
      )}
    </div>
  );
};

export default SellScootersPage;