import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bike, Zap, Plus, TrendingUp, Eye, ShoppingCart, RefreshCw, MessageCircle, Users, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';

interface DashboardStats {
  bikes: {
    total: number;
    available: number;
    sold: number;
    petrol: number;
    electric: number;
  };
  scooters: {
    total: number;
    available: number;
    sold: number;
    petrol: number;
    electric: number;
  };
  contacts: {
    total: number;
    new: number;
    inProgress: number;
    resolved: number;
    pendingContacts: number;
  };
}

const VehicleDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats>({
    bikes: { total: 0, available: 0, sold: 0, petrol: 0, electric: 0 },
    scooters: { total: 0, available: 0, sold: 0, petrol: 0, electric: 0 },
    contacts: { total: 0, new: 0, inProgress: 0, resolved: 0, pendingContacts: 0 }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const fetchStats = async () => {
    setLoading(true);
    setError('');
    try {
      // Fetch bike, scooter, and contact stats concurrently
      const [bikeStatsResponse, scooterStatsResponse, contactStatsResponse] = await Promise.all([
        apiService.getBikeStats().catch(() => ({ data: { total: 0, available: 0, sold: 0, petrol: 0, electric: 0 } })),
        apiService.getScooterStats().catch(() => ({ data: { total: 0, available: 0, sold: 0, petrol: 0, electric: 0 } })),
        apiService.getContactStats().catch(() => ({ data: { total: 0, new: 0, inProgress: 0, resolved: 0, pendingContacts: 0 } }))
      ]);

      setStats({
        bikes: bikeStatsResponse.data,
        scooters: scooterStatsResponse.data,
        contacts: contactStatsResponse.data
      });
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
      setError('Failed to load dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    color, 
    bgColor, 
    onClick 
  }: { 
    title: string; 
    value: number; 
    icon: React.ElementType; 
    color: string; 
    bgColor: string;
    onClick?: () => void;
  }) => (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${bgColor} p-4 rounded-xl border-2 border-transparent hover:border-gray-200 transition-all cursor-pointer`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
        </div>
        <Icon className={`w-8 h-8 ${color}`} />
      </div>
    </motion.div>
  );

  const ActionCard = ({ 
    title, 
    description, 
    icon: Icon, 
    color, 
    bgColor, 
    onClick 
  }: { 
    title: string; 
    description: string; 
    icon: React.ElementType; 
    color: string; 
    bgColor: string;
    onClick: () => void;
  }) => (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${bgColor} p-6 rounded-xl border-2 border-transparent hover:border-gray-200 transition-all w-full text-left`}
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <div className={`p-3 rounded-lg ${color} bg-white bg-opacity-20`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
          <p className="text-white text-opacity-80 text-sm">{description}</p>
        </div>
      </div>
    </motion.button>
  );

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex items-center justify-center space-x-3">
          <RefreshCw className="w-6 h-6 animate-spin text-blue-600" />
          <span className="text-gray-600">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">VAHAAN BAZAAR Dashboard</h2>
          <p className="text-gray-600">Manage vehicles, contacts, and business operations</p>
        </div>
        <button
          onClick={fetchStats}
          className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <StatCard
          title="Total Bikes"
          value={stats.bikes.total}
          icon={Bike}
          color="text-green-600"
          bgColor="bg-green-50"
          onClick={() => navigate('/sell-bikes')}
        />
        <StatCard
          title="Available Bikes"
          value={stats.bikes.available}
          icon={Eye}
          color="text-blue-600"
          bgColor="bg-blue-50"
          onClick={() => navigate('/sell-bikes')}
        />
        <StatCard
          title="Total Scooters"
          value={stats.scooters.total}
          icon={Zap}
          color="text-purple-600"
          bgColor="bg-purple-50"
          onClick={() => navigate('/sell-scooters')}
        />
        <StatCard
          title="Available Scooters"
          value={stats.scooters.available}
          icon={Eye}
          color="text-orange-600"
          bgColor="bg-orange-50"
          onClick={() => navigate('/sell-scooters')}
        />
        <StatCard
          title="Total Contacts"
          value={stats.contacts.total}
          icon={MessageCircle}
          color="text-indigo-600"
          bgColor="bg-indigo-50"
          onClick={() => navigate('/contact')}
        />
      </div>

      {/* Contact Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="New Messages"
          value={stats.contacts.new}
          icon={MessageCircle}
          color="text-red-600"
          bgColor="bg-red-50"
          onClick={() => navigate('/contact')}
        />
        <StatCard
          title="In Progress"
          value={stats.contacts.inProgress}
          icon={Clock}
          color="text-yellow-600"
          bgColor="bg-yellow-50"
          onClick={() => navigate('/contact')}
        />
        <StatCard
          title="Resolved"
          value={stats.contacts.resolved}
          icon={Users}
          color="text-green-600"
          bgColor="bg-green-50"
          onClick={() => navigate('/contact')}
        />
        <StatCard
          title="Pending"
          value={stats.contacts.pendingContacts}
          icon={Clock}
          color="text-orange-600"
          bgColor="bg-orange-50"
          onClick={() => navigate('/contact')}
        />
      </div>

      {/* Fuel Type Distribution */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Bike className="w-5 h-5 mr-2 text-green-600" />
            Bike Distribution
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Petrol Bikes</span>
              <span className="font-semibold text-orange-600">{stats.bikes.petrol}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Electric Bikes</span>
              <span className="font-semibold text-blue-600">{stats.bikes.electric}</span>
            </div>
            <div className="flex justify-between items-center border-t pt-2">
              <span className="text-gray-600">Sold Bikes</span>
              <span className="font-semibold text-gray-800">{stats.bikes.sold}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-xl">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-purple-600" />
            Scooter Distribution
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Petrol Scooters</span>
              <span className="font-semibold text-orange-600">{stats.scooters.petrol}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Electric Scooters</span>
              <span className="font-semibold text-blue-600">{stats.scooters.electric}</span>
            </div>
            <div className="flex justify-between items-center border-t pt-2">
              <span className="text-gray-600">Sold Scooters</span>
              <span className="font-semibold text-gray-800">{stats.scooters.sold}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ActionCard
          title="Sell Your Bike"
          description="List your bike for sale and reach thousands of buyers"
          icon={Plus}
          color="bg-green-600"
          bgColor="bg-gradient-to-r from-green-500 to-green-600"
          onClick={() => navigate('/sell-bikes')}
        />
        <ActionCard
          title="Sell Your Scooter"
          description="List your scooter for sale with our easy-to-use platform"
          icon={Plus}
          color="bg-purple-600"
          bgColor="bg-gradient-to-r from-purple-500 to-purple-600"
          onClick={() => navigate('/sell-scooters')}
        />
      </div>

      {/* Market Insights */}
      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
          Market Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-blue-600">
              {stats.bikes.total + stats.scooters.total}
            </p>
            <p className="text-sm text-gray-600">Total Vehicles</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">
              {stats.bikes.available + stats.scooters.available}
            </p>
            <p className="text-sm text-gray-600">Available Now</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-600">
              {stats.bikes.sold + stats.scooters.sold}
            </p>
            <p className="text-sm text-gray-600">Successfully Sold</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleDashboard;