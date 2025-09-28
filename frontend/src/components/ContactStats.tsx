import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  MessageCircle, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  Filter,
  RefreshCw,
  Download,
  Eye,
  PieChart
} from 'lucide-react';
import apiService from '../services/api';

interface ContactStatsData {
  total: number;
  new: number;
  inProgress: number;
  resolved: number;
  closed: number;
  urgent: number;
  high: number;
  medium: number;
  low: number;
  recentContacts: number;
  pendingContacts: number;
  categoryBreakdown: Array<{
    _id: string;
    count: number;
    avgResponseTime: number;
  }>;
}

interface ContactStatsProps {
  className?: string;
  showTitle?: boolean;
  compactView?: boolean;
}

const ContactStats: React.FC<ContactStatsProps> = ({ 
  className = "", 
  showTitle = true,
  compactView = false 
}) => {
  const [stats, setStats] = useState<ContactStatsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');

  const fetchStats = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await apiService.getContactStats();
      setStats(response.data);
    } catch (err) {
      console.error('Error fetching contact stats:', err);
      setError('Failed to load contact statistics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [timeRange]);

  const StatCard = ({ 
    title, 
    value, 
    icon: Icon, 
    color, 
    bgColor,
    trend,
    trendValue 
  }: { 
    title: string; 
    value: number; 
    icon: React.ElementType; 
    color: string; 
    bgColor: string;
    trend?: 'up' | 'down' | 'stable';
    trendValue?: string;
  }) => (
    <motion.div
      whileHover={{ scale: compactView ? 1.02 : 1.05 }}
      className={`${bgColor} p-${compactView ? '4' : '6'} rounded-xl border-2 border-transparent hover:border-gray-200 transition-all`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className={`text-${compactView ? 'xs' : 'sm'} text-gray-600 mb-1`}>{title}</p>
          <p className={`text-${compactView ? 'lg' : '2xl'} font-bold ${color}`}>{value}</p>
          {trend && trendValue && (
            <div className={`flex items-center mt-1 text-${compactView ? 'xs' : 'sm'}`}>
              {trend === 'up' ? (
                <TrendingUp className={`w-${compactView ? '3' : '4'} h-${compactView ? '3' : '4'} text-green-500 mr-1`} />
              ) : trend === 'down' ? (
                <TrendingDown className={`w-${compactView ? '3' : '4'} h-${compactView ? '3' : '4'} text-red-500 mr-1`} />
              ) : (
                <div className={`w-${compactView ? '3' : '4'} h-${compactView ? '3' : '4'} bg-gray-400 rounded-full mr-1`} />
              )}
              <span className={trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-600'}>
                {trendValue}
              </span>
            </div>
          )}
        </div>
        <Icon className={`w-${compactView ? '6' : '8'} h-${compactView ? '6' : '8'} ${color}`} />
      </div>
    </motion.div>
  );

  const PriorityChart = () => {
    if (!stats) return null;

    const total = stats.urgent + stats.high + stats.medium + stats.low;
    const priorities = [
      { name: 'Urgent', value: stats.urgent, color: 'bg-red-500', percentage: ((stats.urgent / total) * 100).toFixed(1) },
      { name: 'High', value: stats.high, color: 'bg-orange-500', percentage: ((stats.high / total) * 100).toFixed(1) },
      { name: 'Medium', value: stats.medium, color: 'bg-yellow-500', percentage: ((stats.medium / total) * 100).toFixed(1) },
      { name: 'Low', value: stats.low, color: 'bg-green-500', percentage: ((stats.low / total) * 100).toFixed(1) }
    ];

    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <PieChart className="w-5 h-5 mr-2 text-purple-600" />
            Priority Distribution
          </h3>
        </div>
        <div className="space-y-3">
          {priorities.map((priority, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full ${priority.color}`} />
                <span className="text-sm font-medium text-gray-700">{priority.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{priority.value}</span>
                <span className="text-xs text-gray-500">({priority.percentage}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const CategoryBreakdown = () => {
    if (!stats || !stats.categoryBreakdown) return null;

    return (
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
            Category Breakdown
          </h3>
        </div>
        <div className="space-y-4">
          {stats.categoryBreakdown.map((category, index) => {
            const avgResponseHours = category.avgResponseTime ? (category.avgResponseTime / (1000 * 60 * 60)).toFixed(1) : 'N/A';
            return (
              <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 capitalize">
                    {category._id === 'general' ? '💬 General' :
                     category._id === 'support' ? '🛠️ Support' :
                     category._id === 'sales' ? '💰 Sales' :
                     category._id === 'feedback' ? '📝 Feedback' :
                     category._id === 'complaint' ? '⚠️ Complaint' :
                     category._id === 'partnership' ? '🤝 Partnership' :
                     category._id}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">{category.count}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Avg Response Time:</span>
                  <span>{avgResponseHours}h</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className={`bg-white rounded-xl shadow-lg p-8 ${className}`}>
        <div className="flex items-center justify-center space-x-3">
          <RefreshCw className="w-6 h-6 animate-spin text-indigo-600" />
          <span className="text-gray-600">Loading contact statistics...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-white rounded-xl shadow-lg p-8 ${className}`}>
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchStats}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const resolvedRate = stats.total > 0 ? ((stats.resolved / stats.total) * 100).toFixed(1) : '0';
  const responseRate = stats.total > 0 ? (((stats.resolved + stats.inProgress) / stats.total) * 100).toFixed(1) : '0';

  return (
    <div className={className}>
      {showTitle && !compactView && (
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <MessageCircle className="w-6 h-6 mr-3 text-indigo-600" />
              Contact Analytics
            </h2>
            <p className="text-gray-600">Comprehensive contact management insights</p>
          </div>
          <div className="flex items-center space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="all">All time</option>
            </select>
            <button
              onClick={fetchStats}
              className="flex items-center space-x-2 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </button>
          </div>
        </div>
      )}

      {/* Key Metrics */}
      <div className={`grid grid-cols-1 ${compactView ? 'md:grid-cols-2 lg:grid-cols-4' : 'md:grid-cols-2 lg:grid-cols-5'} gap-${compactView ? '4' : '6'} mb-8`}>
        <StatCard
          title="Total Contacts"
          value={stats.total}
          icon={Users}
          color="text-blue-600"
          bgColor="bg-blue-50"
          trend="up"
          trendValue="+12%"
        />
        <StatCard
          title="New Messages"
          value={stats.new}
          icon={MessageCircle}
          color="text-red-600"
          bgColor="bg-red-50"
          trend="stable"
          trendValue="0%"
        />
        <StatCard
          title="In Progress"
          value={stats.inProgress}
          icon={Clock}
          color="text-yellow-600"
          bgColor="bg-yellow-50"
          trend="down"
          trendValue="-5%"
        />
        <StatCard
          title="Resolved"
          value={stats.resolved}
          icon={CheckCircle}
          color="text-green-600"
          bgColor="bg-green-50"
          trend="up"
          trendValue="+18%"
        />
        {!compactView && (
          <StatCard
            title="Pending"
            value={stats.pendingContacts}
            icon={AlertCircle}
            color="text-orange-600"
            bgColor="bg-orange-50"
            trend="down"
            trendValue="-3%"
          />
        )}
      </div>

      {/* Performance Metrics */}
      {!compactView && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Resolution Rate</p>
                <p className="text-2xl font-bold">{resolvedRate}%</p>
                <p className="text-green-100 text-xs mt-1">of total contacts</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Response Rate</p>
                <p className="text-2xl font-bold">{responseRate}%</p>
                <p className="text-blue-100 text-xs mt-1">contacts addressed</p>
              </div>
              <TrendingUp className="w-8 h-8 text-blue-200" />
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Recent Activity</p>
                <p className="text-2xl font-bold">{stats.recentContacts}</p>
                <p className="text-purple-100 text-xs mt-1">in last 7 days</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-200" />
            </div>
          </div>
        </div>
      )}

      {/* Charts and Breakdown */}
      {!compactView && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PriorityChart />
          <CategoryBreakdown />
        </div>
      )}

      {/* Export Options */}
      {!compactView && (
        <div className="mt-8 flex justify-center">
          <button className="flex items-center space-x-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export Statistics</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default ContactStats;