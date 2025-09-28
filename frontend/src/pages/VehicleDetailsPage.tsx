import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Star, ChevronLeft, Bike, Car, Wrench, Gauge, Fuel, Calendar, FileText, MapPin, Image, CheckCircle } from 'lucide-react';

const VehicleDetailsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { vehicle } = location.state || {};

  // If no vehicle data, redirect to main page
  if (!vehicle) {
    navigate('/');
    return null;
  }

  // Determine if it's a bike or scooter based on category or name
  const isBike = vehicle.category === 'popular' || vehicle.category === 'upcoming' || 
                 (vehicle.name && (vehicle.name.includes('R15') || vehicle.name.includes('CB350RS') || 
                 vehicle.name.includes('Classic') || vehicle.name.includes('Ninja') || 
                 vehicle.name.includes('Apache') || vehicle.name.includes('Dominar') ||
                 vehicle.name.includes('FZ') || vehicle.name.includes('MT-15') || 
                 vehicle.name.includes('Duke') || vehicle.name.includes('Hayabusa')));
                 
  // Determine if vehicle is upcoming (not yet launched)
  const isUpcoming = vehicle.category === 'upcoming' || vehicle.yearsUsed === 'New Launch' || vehicle.usedKms === 'N/A';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 flex items-center"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
                <span className="ml-1 text-gray-600">Back</span>
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                VAHAAN BAZAAR
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Vehicle Details */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Vehicle Image */}
        <div className="relative h-96 rounded-xl overflow-hidden shadow-lg mb-8">
          <img
            src={vehicle.image}
            alt={vehicle.name}
            className="w-full h-full object-cover bg-white"
          />
        </div>

        {/* Vehicle Details */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">{vehicle.name}</h2>
              <div className="flex items-center">
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <span className="ml-1 text-lg text-gray-600">{vehicle.rating}</span>
              </div>
            </div>
            <span className="text-3xl font-bold text-blue-600">{vehicle.price}</span>
          </div>

          {/* For Second Hand Vehicles - Show Additional Details */}
          {vehicle.condition ? (
            <>
              {/* Condition Details */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b">Condition Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center text-gray-600 mb-1">
                      <Wrench className="w-4 h-4 mr-2 text-blue-500" />
                      <span className="text-sm font-medium">Condition</span>
                    </div>
                    <p className="font-semibold">{vehicle.condition}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center text-gray-600 mb-1">
                      <Gauge className="w-4 h-4 mr-2 text-green-500" />
                      <span className="text-sm font-medium">Kilometers</span>
                    </div>
                    <p className="font-semibold">{vehicle.usedKms}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center text-gray-600 mb-1">
                      <Fuel className="w-4 h-4 mr-2 text-purple-500" />
                      <span className="text-sm font-medium">Fuel Type</span>
                    </div>
                    <p className="font-semibold">{vehicle.fuelType}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center text-gray-600 mb-1">
                      <Calendar className="w-4 h-4 mr-2 text-amber-500" />
                      <span className="text-sm font-medium">Years Used</span>
                    </div>
                    <p className="font-semibold">{vehicle.yearsUsed}</p>
                  </div>
                </div>
              </div>
              
              {/* Registration and Legal */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b">Registration & Legal</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-blue-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Registration Status</p>
                      <p className="font-semibold">{vehicle.registration}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-green-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-600">Number Plate</p>
                      <p className="font-semibold">{vehicle.numberPlate}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Accessories and Issues */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b">Accessories & Condition</h3>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Wrench className="w-5 h-5 text-purple-500 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Tool Kit</p>
                      <p className="font-semibold">{vehicle.toolKit}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Complaints/Issues</p>
                      <p className="font-semibold">{vehicle.complaints}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Image className="w-5 h-5 text-amber-500 mr-3 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Damages</p>
                      <p className="font-semibold">{vehicle.damages}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Full Specifications */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b">Full Specifications</h3>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-600">Mileage</p>
                    <p className="font-semibold">{vehicle.specs?.mileage || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Fuel Type</p>
                    <p className="font-semibold">{vehicle.specs?.fuelType || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Tank Capacity</p>
                    <p className="font-semibold">{vehicle.specs?.tankCapacity || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Seating</p>
                    <p className="font-semibold">{vehicle.specs?.seating || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Brakes</p>
                    <p className="font-semibold">{vehicle.specs?.brakes || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Lights</p>
                    <p className="font-semibold">{vehicle.specs?.lights || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Speed Raise</p>
                    <p className="font-semibold">{vehicle.specs?.speed || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Comfort</p>
                    <p className="font-semibold">{vehicle.specs?.comfort || 'N/A'}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-gray-600">Compatibility</p>
                    <p className="font-semibold">{vehicle.specs?.compatibility || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* For New Vehicles - Show Standard Specifications */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Specifications</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium">{vehicle.category || 'Scooter'}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Engine:</span>
                    <span className="font-medium">
                      {vehicle.name.includes('150') || vehicle.name.includes('200') || 
                       vehicle.name.includes('300') || vehicle.name.includes('400') ? '150cc' : '125cc'}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Mileage:</span>
                    <span className="font-medium">
                      {vehicle.name.includes('Activa') || vehicle.name.includes('Jupiter') ? '60 km/l' : '40 km/l'}
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Transmission:</span>
                    <span className="font-medium">Manual</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Fuel Tank Capacity:</span>
                    <span className="font-medium">
                      {vehicle.name.includes('Activa') || vehicle.name.includes('Jupiter') ? '5.3L' : '12L'}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Features</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-gray-600">Digital Speedometer</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-gray-600">LED Headlight</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-gray-600">Mobile Charging Port</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-gray-600">Tubeless Tyres</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-gray-600">Alloy Wheels</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium">
              Enquire Now
            </button>
            {!isUpcoming && (
              <button className="flex-1 bg-white border border-blue-500 text-blue-500 py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors duration-200 font-medium">
                Schedule Test Ride
              </button>
            )}
            {!isUpcoming ? (
              <button className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 font-medium">
                Book Now
              </button>
            ) : (
              <button className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 px-6 rounded-lg cursor-not-allowed font-medium">
                Coming Soon
              </button>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Choose This Vehicle?</h3>
          <p className="text-gray-600 mb-4">
            The {vehicle.name} is designed for both performance and comfort. With its powerful engine, 
            excellent fuel efficiency, and stylish design, it's perfect for daily commuting and weekend 
            adventures alike.
          </p>
          <p className="text-gray-600">
            Our vehicles come with a comprehensive warranty and access to our nationwide service network. 
            Experience the perfect blend of technology, comfort, and reliability with every ride.
          </p>
        </div>
      </main>
    </div>
  );
};

export default VehicleDetailsPage;