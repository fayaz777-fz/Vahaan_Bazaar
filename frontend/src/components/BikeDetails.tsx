import { Bike } from '../types';
import { X, Calendar, Gauge, DollarSign, FileText, Fuel, Zap, Clock, Thermometer as Speedometer } from 'lucide-react';

interface BikeDetailsProps {
  bike: Bike | null;
  onClose: () => void;
}

export default function BikeDetails({ bike, onClose }: BikeDetailsProps) {
  if (!bike) return null;

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Excellent': return 'text-green-600 bg-green-50 border-green-200';
      case 'Good': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'Fair': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Poor': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const savings = bike.pastPrice - bike.presentPrice;
  const savingsPercentage = ((savings / bike.pastPrice) * 100).toFixed(1);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-end">
      <div className="bg-white h-full w-full max-w-lg overflow-y-auto transform transition-transform duration-300 ease-out">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Bike Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {/* Bike Image */}
          <div className="relative mb-6">
            <img
              src={bike.image}
              alt={bike.name}
              className="w-full h-64 object-cover rounded-xl"
            />
            <div className="absolute top-4 right-4">
              {bike.type === 'Electric' ? (
                <div className="bg-green-500 text-white px-3 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                  <Zap size={16} />
                  Electric
                </div>
              ) : (
                <div className="bg-orange-500 text-white px-3 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                  <Fuel size={16} />
                  Petrol
                </div>
              )}
            </div>
          </div>

          {/* Basic Info */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{bike.name}</h1>
            <p className="text-lg text-gray-600">{bike.brand} • {bike.year}</p>
          </div>

          {/* Condition Badge */}
          <div className="mb-6">
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium border ${getConditionColor(bike.condition)}`}>
              {bike.condition} Condition
            </span>
          </div>

          {/* Price Section */}
          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-bold text-blue-600">₹{bike.presentPrice.toLocaleString()}</span>
              <span className="text-lg text-gray-500 line-through">₹{bike.pastPrice.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-600 font-medium">Save ₹{savings.toLocaleString()}</span>
              <span className="text-sm text-gray-600">({savingsPercentage}% off)</span>
            </div>
          </div>

          {/* Details Grid */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
            
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="text-blue-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Days Used</p>
                  <p className="font-semibold text-gray-900">{bike.daysUsed} days</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Gauge className="text-green-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Mileage</p>
                  <p className="font-semibold text-gray-900">{bike.mileage} km/l</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FileText className="text-purple-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">License Number</p>
                  <p className="font-semibold text-gray-900">{bike.license}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Speedometer className="text-orange-600" size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Top Speed</p>
                  <p className="font-semibold text-gray-900">{bike.topSpeed} km/h</p>
                </div>
              </div>

              {bike.engineCapacity && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <Fuel className="text-red-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Engine Capacity</p>
                    <p className="font-semibold text-gray-900">{bike.engineCapacity}</p>
                  </div>
                </div>
              )}

              {bike.batteryCapacity && (
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Zap className="text-green-600" size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Battery Capacity</p>
                    <p className="font-semibold text-gray-900">{bike.batteryCapacity}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 space-y-3">
            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Contact Seller
            </button>
            <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Schedule Test Drive
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}