import { Bike } from '../types';
import { Calendar, Fuel, Zap } from 'lucide-react';

interface BikeCardProps {
  bike: Bike;
  onClick: (bike: Bike) => void;
}

export default function BikeCard({ bike, onClick }: BikeCardProps) {
  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Excellent': return 'text-green-600 bg-green-50';
      case 'Good': return 'text-blue-600 bg-blue-50';
      case 'Fair': return 'text-yellow-600 bg-yellow-50';
      case 'Poor': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 overflow-hidden"
      onClick={() => onClick(bike)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={bike.image}
          alt={bike.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          {bike.type === 'Electric' ? (
            <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Zap size={12} />
              Electric
            </div>
          ) : (
            <div className="bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <Fuel size={12} />
              Petrol
            </div>
          )}
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{bike.name}</h3>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(bike.condition)}`}>
            {bike.condition}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3">{bike.brand} • {bike.year}</p>
        
        <div className="flex items-center gap-4 mb-3 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar size={14} />
            <span>{bike.daysUsed} days</span>
          </div>
          <div>
            <span>{bike.mileage} km/l</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">₹{bike.presentPrice.toLocaleString()}</span>
            <span className="text-sm text-gray-500 line-through ml-2">₹{bike.pastPrice.toLocaleString()}</span>
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}