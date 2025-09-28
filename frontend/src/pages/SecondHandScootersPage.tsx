import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Fuel, Gauge, Calendar, FileText, CheckCircle, X, Wrench, Image, Star, MapPin } from 'lucide-react';
import Footer from '../components/Footer';

const SecondHandScootersPage = () => {
  const navigate = useNavigate();
  const [selectedScooter, setSelectedScooter] = useState<any>(null);

  // Sample second-hand scooter data with unique details
  const secondHandScooters = [
    {
      id: 1,
      name: 'HONDA ACTIVA',
      price: '₹65,000',
      originalPrice: '₹78,000',
      image: 'https://imgd.aeplcdn.com/0X0/n/cw/ec/44686/activa-6g-right-front-three-quarter.jpeg?q=80',
      rating: 4.2,
      condition: 'Good',
      usedKms: '15,200 km',
      fuelType: 'Petrol',
      status: 'Well Maintained',
      yearsUsed: '2.0 years',
      registration: 'Approved',
      numberPlate: 'TS 08 MN 4567',
      complaints: 'No major issues',
      toolKit: 'Available',
      damages: 'Minor scratch on front mudguard',
      images: [
        'https://imgd.aeplcdn.com/0X0/n/cw/ec/44686/activa-6g-right-front-three-quarter.jpeg?q=80',
        'https://imgd.aeplcdn.com/0X0/n/cw/ec/44686/activa-6g-right-front-three-quarter.jpeg?q=80',
        'https://imgd.aeplcdn.com/0X0/n/cw/ec/44686/activa-6g-right-front-three-quarter.jpeg?q=80'
      ],
      specs: {
        mileage: '45 km/l',
        fuelType: 'Petrol',
        tankCapacity: '5.3 liters',
        seating: 'Dual seat',
        brakes: 'Drum brakes (Front & Rear)',
        lights: 'LED headlights and taillights',
        speed: 'Top speed of 85 km/h',
        comfort: 'Step-through design, spacious underseat storage',
        compatibility: 'Ideal for daily commuting and city travel'
      }
    },
    {
      id: 2,
      name: 'TVS Jupiter',
      price: '₹58,000',
      originalPrice: '₹70,000',
      image: 'https://media.zigcdn.com/media/model/2024/Aug/rear-left-view-2039748958_930x620.jpg',
      rating: 4.0,
      condition: 'Excellent',
      usedKms: '10,500 km',
      fuelType: 'Petrol',
      status: 'Like New',
      yearsUsed: '1.5 years',
      registration: 'Approved',
      numberPlate: 'TS 14 OP 8901',
      complaints: 'No issues',
      toolKit: 'Available',
      damages: 'No visible damages',
      images: [
        'https://media.zigcdn.com/media/model/2024/Aug/rear-left-view-2039748958_930x620.jpg',
        'https://media.zigcdn.com/media/model/2024/Aug/rear-left-view-2039748958_930x620.jpg',
        'https://media.zigcdn.com/media/model/2024/Aug/rear-left-view-2039748958_930x620.jpg'
      ],
      specs: {
        mileage: '42 km/l',
        fuelType: 'Petrol',
        tankCapacity: '6 liters',
        seating: 'Dual seat with ample legroom',
        brakes: 'Disc brake (Front), Drum brake (Rear)',
        lights: 'LED headlight with DRLs',
        speed: 'Top speed of 90 km/h',
        comfort: 'Comfortable seating, spacious footboard',
        compatibility: 'Great for city rides and short trips'
      }
    },
    {
      id: 3,
      name: 'Suzuki Access 125',
      price: '₹62,000',
      originalPrice: '₹75,000',
      image: 'https://www.topwebstory.com/wp-content/uploads/2025/09/Suzuki-Access-125-2025-scooter-India.webp',
      rating: 4.1,
      condition: 'Good',
      usedKms: '18,700 km',
      fuelType: 'Petrol',
      status: 'Well Maintained',
      yearsUsed: '2.8 years',
      registration: 'Approved',
      numberPlate: 'TS 06 QR 2345',
      complaints: 'Minor engine noise',
      toolKit: 'Available',
      damages: 'Scratch on right side panel',
      images: [
        'https://www.topwebstory.com/wp-content/uploads/2025/09/Suzuki-Access-125-2025-scooter-India.webp',
        'https://www.topwebstory.com/wp-content/uploads/2025/09/Suzuki-Access-125-2025-scooter-India.webp',
        'https://www.topwebstory.com/wp-content/uploads/2025/09/Suzuki-Access-125-2025-scooter-India.webp'
      ],
      specs: {
        mileage: '48 km/l',
        fuelType: 'Petrol',
        tankCapacity: '5.5 liters',
        seating: 'Dual seat with underseat storage',
        brakes: 'Drum brakes (Front & Rear)',
        lights: 'LED headlight and taillight',
        speed: 'Top speed of 80 km/h',
        comfort: 'Spacious footboard, easy maneuverability',
        compatibility: 'Ideal for city commuting and fuel efficiency'
      }
    },
    {
      id: 4,
      name: 'Hero Maestro Edge 125',
      price: '₹55,000',
      originalPrice: '₹68,000',
      image: 'https://bd.gaadicdn.com/processedimages/hero/maestro-edge-125/source/maestro-edge-125616539547bf6d.jpg?imwidth=880',
      rating: 3.9,
      condition: 'Fair',
      usedKms: '25,400 km',
      fuelType: 'Petrol',
      status: 'Regular Maintenance',
      yearsUsed: '3.5 years',
      registration: 'Approved',
      numberPlate: 'TS 11 ST 6789',
      complaints: 'Brake pads need replacement',
      toolKit: 'Available',
      damages: 'Scratches on tank and side panels',
      images: [
        'https://bd.gaadicdn.com/processedimages/hero/maestro-edge-125/source/maestro-edge-125616539547bf6d.jpg?imwidth=880',
        'https://bd.gaadicdn.com/processedimages/hero/maestro-edge-125/source/maestro-edge-125616539547bf6d.jpg?imwidth=880',
        'https://bd.gaadicdn.com/processedimages/hero/maestro-edge-125/source/maestro-edge-125616539547bf6d.jpg?imwidth=880'
      ],
      specs: {
        mileage: '50 km/l',
        fuelType: 'Petrol',
        tankCapacity: '6 liters',
        seating: 'Dual seat with passenger pillion',
        brakes: 'Drum brakes (Front & Rear)',
        lights: 'Halogen headlight, LED taillight',
        speed: 'Top speed of 95 km/h',
        comfort: 'Comfortable seating, easy handling',
        compatibility: 'Perfect for daily commuting and short tours'
      }
    },
    {
      id: 5,
      name: 'Ola S1',
      price: '₹85,000',
      originalPrice: '₹99,000',
      image: 'https://media.zigcdn.com/media/model/2022/Jul/right-side-view-1285934282_930x620.jpg',
      rating: 4.3,
      condition: 'Excellent',
      usedKms: '8,200 km',
      fuelType: 'Electric',
      status: 'Like New',
      yearsUsed: '1.0 year',
      registration: 'Approved',
      numberPlate: 'TS 03 UV 1357',
      complaints: 'No issues',
      toolKit: 'Available',
      damages: 'No visible damages',
      images: [
        'https://media.zigcdn.com/media/model/2022/Jul/right-side-view-1285934282_930x620.jpg',
        'https://media.zigcdn.com/media/model/2022/Jul/right-side-view-1285934282_930x620.jpg',
        'https://media.zigcdn.com/media/model/2022/Jul/right-side-view-1285934282_930x620.jpg'
      ],
      specs: {
        mileage: '100+ km per charge',
        fuelType: 'Electric',
        tankCapacity: 'N/A (Battery pack)',
        seating: 'Dual seat with premium padding',
        brakes: 'Disc brakes (Front & Rear) with regenerative braking',
        lights: 'Full LED smart lighting system',
        speed: '0-40 km/h in 3.0 seconds',
        comfort: 'Smart connectivity, app-controlled features',
        compatibility: 'Perfect for eco-conscious urban commuters'
      }
    },
    {
      id: 6,
      name: 'Okaya iPraise+',
      price: '₹78,000',
      originalPrice: '₹92,000',
      image: 'https://5.imimg.com/data5/SELLER/Default/2022/7/TB/BL/MX/155488885/okaya-classiq-150-plus-electric-scooty-1000x1000.jpg',
      rating: 4.0,
      condition: 'Good',
      usedKms: '12,500 km',
      fuelType: 'Electric',
      status: 'Well Maintained',
      yearsUsed: '1.8 years',
      registration: 'Approved',
      numberPlate: 'TS 17 WX 9753',
      complaints: 'Minor battery degradation',
      toolKit: 'Available',
      damages: 'Scratch on left side panel',
      images: [
        'https://5.imimg.com/data5/SELLER/Default/2022/7/TB/BL/MX/155488885/okaya-classiq-150-plus-electric-scooty-1000x1000.jpg',
        'https://5.imimg.com/data5/SELLER/Default/2022/7/TB/BL/MX/155488885/okaya-classiq-150-plus-electric-scooty-1000x1000.jpg',
        'https://5.imimg.com/data5/SELLER/Default/2022/7/TB/BL/MX/155488885/okaya-classiq-150-plus-electric-scooty-1000x1000.jpg'
      ],
      specs: {
        mileage: '90 km per charge',
        fuelType: 'Electric',
        tankCapacity: 'N/A (Battery pack)',
        seating: 'Dual seat with comfortable padding',
        brakes: 'Drum brakes (Front & Rear)',
        lights: 'LED headlight and taillight',
        speed: 'Top speed of 25 km/h',
        comfort: 'Easy to ride, low maintenance',
        compatibility: 'Ideal for short commutes and last-mile connectivity'
      }
    }
  ];

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
                VAHAAN BAZAAR - SECOND HAND SCOOTERS
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Premium Second Hand Scooters</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our carefully inspected collection of second hand scooters with detailed condition reports, 
            maintenance history, and transparent pricing.
          </p>
        </div>

        {/* Second Hand Scooters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {secondHandScooters.map((scooter) => (
            <div 
              key={scooter.id} 
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200"
            >
              {/* Scooter Image */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={scooter.image} 
                  alt={scooter.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  {scooter.condition}
                </div>
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 text-gray-800 px-2 py-1 rounded-full flex items-center shadow-lg">
                  <Star className="w-4 h-4 fill-current text-amber-400 mr-1" />
                  <span className="text-sm font-bold">{scooter.rating}</span>
                </div>
              </div>
              
              {/* Scooter Details */}
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">{scooter.name}</h3>
                
                <div className="flex items-center mb-3">
                  <span className="text-2xl font-bold text-purple-700">{scooter.price}</span>
                  {scooter.originalPrice && (
                    <span className="text-base text-gray-500 line-through ml-3">{scooter.originalPrice}</span>
                  )}
                </div>
                
                {/* Key Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Gauge className="w-4 h-4 mr-2 text-purple-500" />
                    <span className="text-sm">{scooter.specs.mileage}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Fuel className="w-4 h-4 mr-2 text-green-500" />
                    <span className="text-sm">{scooter.fuelType}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-amber-500" />
                    <span className="text-sm">{scooter.usedKms} • {scooter.yearsUsed}</span>
                  </div>
                </div>
                
                {/* Status Badge */}
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    scooter.status === 'Like New' ? 'bg-green-100 text-green-800' :
                    scooter.status === 'Excellent' ? 'bg-blue-100 text-blue-800' :
                    scooter.status === 'Good' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {scooter.status}
                  </span>
                </div>
                
                {/* Action Button */}
                <button
                  onClick={() => navigate('/vehicle-details', { state: { vehicle: scooter } })}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  View Complete Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* The modal has been replaced with navigation to VehicleDetailsPage */}
      <Footer />
    </div>
  );
};

export default SecondHandScootersPage;