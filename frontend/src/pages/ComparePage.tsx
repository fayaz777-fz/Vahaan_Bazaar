import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, Star, Gauge, Fuel, Calendar, CheckCircle, Wrench, Clock, Award, MapPin, ShoppingCart, TestTube } from 'lucide-react';

const ComparePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { vehicles = [] } = location.state || {};
  
  const [compareVehicles, setCompareVehicles] = useState(vehicles);

  // If no vehicles are passed, redirect to main page
  useEffect(() => {
    if (!vehicles || vehicles.length === 0) {
      navigate('/main');
    }
  }, [vehicles, navigate]);

  // Remove a vehicle from comparison
  const removeVehicle = (id: number) => {
    const updatedVehicles = compareVehicles.filter((vehicle: any) => vehicle.id !== id);
    setCompareVehicles(updatedVehicles);
    
    // If no vehicles left, go back to main page
    if (updatedVehicles.length === 0) {
      navigate('/main');
    }
  };

  // Format date if available
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? dateString : date.toLocaleDateString();
  };

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
                VAHAAN BAZAAR - VEHICLE COMPARISON
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {compareVehicles.length > 0 ? (
          <>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Detailed Vehicle Comparison</h2>
              <p className="text-gray-600">Side-by-side comparison of specifications, features, and performance</p>
            </div>

            {/* Comparison Table */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b bg-gray-50">
                      <th className="p-4 text-left text-gray-700 font-bold">Specification</th>
                      {compareVehicles.map((vehicle: any) => (
                        <th key={vehicle.id} className="p-4 text-center min-w-[300px]">
                          <div className="flex flex-col items-center">
                            <div className="relative mb-3">
                              <img 
                                src={vehicle.image} 
                                alt={vehicle.name} 
                                className="w-40 h-32 object-contain"
                              />
                              <button 
                                onClick={() => removeVehicle(vehicle.id)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600 transition-colors duration-200"
                              >
                                ×
                              </button>
                            </div>
                            <h3 className="font-bold text-gray-800 text-lg">{vehicle.name}</h3>
                            <p className="text-blue-600 font-bold text-lg">{vehicle.price}</p>
                            <div className="flex items-center mt-1">
                              <Star className="w-5 h-5 text-yellow-400 fill-current" />
                              <span className="ml-1 text-sm text-gray-600">{vehicle.rating}/5</span>
                            </div>
                            {vehicle.category && (
                              <span className="mt-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                {vehicle.category.charAt(0).toUpperCase() + vehicle.category.slice(1)}
                              </span>
                            )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Basic Information */}
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-bold text-gray-800 bg-gray-50">Basic Information</td>
                      {compareVehicles.map((vehicle: any) => (
                        <td key={vehicle.id} className="p-4 text-center bg-gray-50"></td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-700">On Road Mileage</td>
                      {compareVehicles.map((vehicle: any) => (
                        <td key={vehicle.id} className="p-4 text-center">
                          {vehicle.specs?.mileage || vehicle.mileage || 'N/A'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-700">Fuel Type</td>
                      {compareVehicles.map((vehicle: any) => (
                        <td key={vehicle.id} className="p-4 text-center">
                          {vehicle.specs?.fuelType || vehicle.fuelType || 'N/A'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-700">Fuel Tank Capacity</td>
                      {compareVehicles.map((vehicle: any) => (
                        <td key={vehicle.id} className="p-4 text-center">
                          {vehicle.specs?.tankCapacity || 'N/A'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-700">Engine</td>
                      {compareVehicles.map((vehicle: any) => (
                        <td key={vehicle.id} className="p-4 text-center">
                          {vehicle.specs?.engine || vehicle.engine || 'N/A'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-700">Brakes</td>
                      {compareVehicles.map((vehicle: any) => (
                        <td key={vehicle.id} className="p-4 text-center">
                          {vehicle.specs?.brakes || 'N/A'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-700">Transmission</td>
                      {compareVehicles.map((vehicle: any) => (
                        <td key={vehicle.id} className="p-4 text-center">
                          {vehicle.transmission || vehicle.specs?.transmission || 'N/A'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-700">Launch Date in India</td>
                      {compareVehicles.map((vehicle: any) => (
                        <td key={vehicle.id} className="p-4 text-center">
                          {formatDate(vehicle.launchDate) || 'N/A'}
                        </td>
                      ))}
                    </tr>
                    
                    {/* Performance */}
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-bold text-gray-800 bg-gray-50">Performance</td>
                      {compareVehicles.map((vehicle: any) => (
                        <td key={vehicle.id} className="p-4 text-center bg-gray-50"></td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-700">Top Speed</td>
                      {compareVehicles.map((vehicle: any) => (
                        <td key={vehicle.id} className="p-4 text-center">
                          {vehicle.specs?.topSpeed || vehicle.topSpeed || 'N/A'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-700">Acceleration (0-60 km/h)</td>
                      {compareVehicles.map((vehicle: any) => (
                        <td key={vehicle.id} className="p-4 text-center">
                          {vehicle.specs?.acceleration || vehicle.acceleration || 'N/A'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-700">Power</td>
                      {compareVehicles.map((vehicle: any) => (
                        <td key={vehicle.id} className="p-4 text-center">
                          {vehicle.specs?.power || vehicle.power || 'N/A'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-700">Torque</td>
                      {compareVehicles.map((vehicle: any) => (
                        <td key={vehicle.id} className="p-4 text-center">
                          {vehicle.specs?.torque || vehicle.torque || 'N/A'}
                        </td>
                      ))}
                    </tr>
                    
                    {/* Dimensions & Capacity */}
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-bold text-gray-800 bg-gray-50">Dimensions & Capacity</td>
                      {compareVehicles.map((vehicle: any) => (
                        <td key={vehicle.id} className="p-4 text-center bg-gray-50"></td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-700">Seating Capacity</td>
                      {compareVehicles.map((vehicle: any) => (
                        <td key={vehicle.id} className="p-4 text-center">
                          {vehicle.specs?.seating || vehicle.seatingCapacity || 'N/A'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-700">Weight</td>
                      {compareVehicles.map((vehicle: any) => (
                        <td key={vehicle.id} className="p-4 text-center">
                          {vehicle.weight || vehicle.specs?.weight || 'N/A'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-700">Length</td>
                      {compareVehicles.map((vehicle: any) => (
                        <td key={vehicle.id} className="p-4 text-center">
                          {vehicle.length || vehicle.specs?.length || 'N/A'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-700">Width</td>
                      {compareVehicles.map((vehicle: any) => (
                        <td key={vehicle.id} className="p-4 text-center">
                          {vehicle.width || vehicle.specs?.width || 'N/A'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-700">Height</td>
                      {compareVehicles.map((vehicle: any) => (
                        <td key={vehicle.id} className="p-4 text-center">
                          {vehicle.height || vehicle.specs?.height || 'N/A'}
                        </td>
                      ))}
                    </tr>
                    
                    {/* Features & Comfort */}
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-bold text-gray-800 bg-gray-50">Features & Comfort</td>
                      {compareVehicles.map((vehicle: any) => (
                        <td key={vehicle.id} className="p-4 text-center bg-gray-50"></td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-700">Lights</td>
                      {compareVehicles.map((vehicle: any) => (
                        <td key={vehicle.id} className="p-4 text-center">
                          {vehicle.specs?.lights || 'N/A'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-700">Comfort Features</td>
                      {compareVehicles.map((vehicle: any) => (
                        <td key={vehicle.id} className="p-4 text-center">
                          {vehicle.specs?.comfort || 'N/A'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-700">Compatibility</td>
                      {compareVehicles.map((vehicle: any) => (
                        <td key={vehicle.id} className="p-4 text-center">
                          {vehicle.specs?.compatibility || 'N/A'}
                        </td>
                      ))}
                    </tr>
                    
                    {/* Second-hand Specific Information */}
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-bold text-gray-800 bg-gray-50">Second-hand Information</td>
                      {compareVehicles.map((vehicle: any) => (
                        <td key={vehicle.id} className="p-4 text-center bg-gray-50"></td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-700">Used Kilometers</td>
                      {compareVehicles.map((vehicle: any) => (
                        <td key={vehicle.id} className="p-4 text-center">
                          {vehicle.usedKms || 'N/A'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-700">Years Used</td>
                      {compareVehicles.map((vehicle: any) => (
                        <td key={vehicle.id} className="p-4 text-center">
                          {vehicle.yearsUsed || 'N/A'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-700">Condition</td>
                      {compareVehicles.map((vehicle: any) => (
                        <td key={vehicle.id} className="p-4 text-center">
                          <span className={`px-2 py-1 rounded-full text-sm ${
                            vehicle.condition === 'Like New' ? 'bg-green-100 text-green-800' :
                            vehicle.condition === 'Excellent' ? 'bg-blue-100 text-blue-800' :
                            vehicle.condition === 'Good' ? 'bg-yellow-100 text-yellow-800' :
                            vehicle.condition === 'Fair' ? 'bg-orange-100 text-orange-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {vehicle.condition || 'N/A'}
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-700">Tool Kit</td>
                      {compareVehicles.map((vehicle: any) => (
                        <td key={vehicle.id} className="p-4 text-center">
                          {vehicle.toolKit || 'N/A'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-700">Damages/Issues</td>
                      {compareVehicles.map((vehicle: any) => (
                        <td key={vehicle.id} className="p-4 text-center">
                          {vehicle.damages || 'None reported'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-700">Complaints</td>
                      {compareVehicles.map((vehicle: any) => (
                        <td key={vehicle.id} className="p-4 text-center">
                          {vehicle.complaints || 'None reported'}
                        </td>
                      ))}
                    </tr>
                    
                    {/* Market Information */}
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-bold text-gray-800 bg-gray-50">Market Information</td>
                      {compareVehicles.map((vehicle: any) => (
                        <td key={vehicle.id} className="p-4 text-center bg-gray-50"></td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-700">Original Price</td>
                      {compareVehicles.map((vehicle: any) => (
                        <td key={vehicle.id} className="p-4 text-center">
                          {vehicle.originalPrice || 'N/A'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-700">Current Price</td>
                      {compareVehicles.map((vehicle: any) => (
                        <td key={vehicle.id} className="p-4 text-center">
                          {vehicle.price || 'N/A'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-700">Estimated Life</td>
                      {compareVehicles.map((vehicle: any) => (
                        <td key={vehicle.id} className="p-4 text-center">
                          {vehicle.estimatedLife || 'N/A'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-700">Number of Sales</td>
                      {compareVehicles.map((vehicle: any) => (
                        <td key={vehicle.id} className="p-4 text-center">
                          {vehicle.salesCount || vehicle.noOfSales || 'N/A'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-700">Reviews</td>
                      {compareVehicles.map((vehicle: any) => (
                        <td key={vehicle.id} className="p-4 text-center">
                          {vehicle.reviews ? `${vehicle.reviews} reviews` : 'N/A'}
                        </td>
                      ))}
                    </tr>
                    <tr className="border-b hover:bg-gray-50">
                      <td className="p-4 font-medium text-gray-700">Offers</td>
                      {compareVehicles.map((vehicle: any) => (
                        <td key={vehicle.id} className="p-4 text-center">
                          {vehicle.offers || 'No current offers'}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <button
                onClick={() => navigate('/main')}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200 flex items-center"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add More Vehicles
              </button>
              <button
                onClick={() => {
                  // Reset comparison and go back to main
                  setCompareVehicles([]);
                  navigate('/main');
                }}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 flex items-center"
              >
                <CheckCircle className="w-5 h-5 mr-2" />
                Start New Comparison
              </button>
              <button
                className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center"
              >
                <TestTube className="w-5 h-5 mr-2" />
                Request Test Drive
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Vehicles to Compare</h2>
            <p className="text-gray-600 mb-6">Please select vehicles from the main page to compare.</p>
            <button
              onClick={() => navigate('/main')}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
            >
              Go to Main Page
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default ComparePage;