import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Fuel, Gauge, Calendar, FileText, CheckCircle, X, Wrench, Image, Star, MapPin } from 'lucide-react';
import Footer from '../components/Footer';

// Second hand bikes page component
const SecondHandBikesPage = () => {
  const navigate = useNavigate();
  const [selectedBike, setSelectedBike] = useState<any>(null);

  // Sample second-hand bike data with unique details
  const secondHandBikes = [
    {
      id: 1,
      name: 'YAMAHA FZ',
      price: '₹95,000',
      originalPrice: '₹1.05 Lakh',
      image: 'https://www.bikebikroy.com/storage/app/files/shares/uploads/2024/02/yamaha-fz-v2-black-sale-in-savar65ddca292c2fa.webp',
      rating: 4.2,
      condition: 'Good',
      usedKms: '18,500 km',
      fuelType: 'Petrol',
      status: 'Well Maintained',
      yearsUsed: '2.5 years',
      registration: 'Approved',
      numberPlate: 'TS 09 AB 1234',
      complaints: 'No major issues',
      toolKit: 'Available',
      damages: 'Minor scratch on front mudguard',
      images: [
        'https://www.bikebikroy.com/storage/app/files/shares/uploads/2024/02/yamaha-fz-v2-black-sale-in-savar65ddca292c2fa.webp',
        'https://imgd.aeplcdn.com/370x208/bw/models/yamaha-fz-s-v3-standard-right-side-view.png',
        'https://imgd.aeplcdn.com/370x208/bw/models/yamaha-fz-s-v3-standard-left-side-view.png'
      ],
      specs: {
        mileage: '42 km/l',
        fuelType: 'Petrol',
        tankCapacity: '10 liters',
        seating: 'Dual seat',
        brakes: 'Disc brakes (Front & Rear)',
        lights: 'LED headlights and taillights',
        speed: '0-60 km/h in 5.2 seconds',
        comfort: 'Adjustable suspension, ergonomic design',
        compatibility: 'Suitable for city commuting and short tours'
      }
    },
    {
      id: 2,
      name: 'Honda CB Hornet 2.0',
      price: '₹89,000',
      originalPrice: '₹1.00 Lakh',
      image: 'https://im.rediff.com/getahead/2015/dec/15honda-cb-hornet-160r-2.jpg',
      rating: 4.0,
      condition: 'Excellent',
      usedKms: '12,300 km',
      fuelType: 'Petrol',
      status: 'Like New',
      yearsUsed: '1.8 years',
      registration: 'Approved',
      numberPlate: 'TS 15 CD 5678',
      complaints: 'No issues',
      toolKit: 'Available',
      damages: 'No visible damages',
      images: [
        'https://im.rediff.com/getahead/2015/dec/15honda-cb-hornet-160r-2.jpg',
        'https://imgd.aeplcdn.com/370x208/bw/models/honda-cb-hornet-2-0-front-three-quarter-2.png',
        'https://imgd.aeplcdn.com/370x208/bw/models/honda-cb-hornet-2-0-left-side-view.png'
      ],
      specs: {
        mileage: '38 km/l',
        fuelType: 'Petrol',
        tankCapacity: '12 liters',
        seating: 'Dual seat with passenger pillion',
        brakes: 'Disc brakes (Front), Drum brake (Rear)',
        lights: 'LED headlights with DRLs',
        speed: '0-60 km/h in 5.8 seconds',
        comfort: 'Comfortable riding position, wide seat',
        compatibility: 'Ideal for daily commuting and weekend rides'
      }
    },
    {
      id: 3,
      name: 'TVS Apache RTR 160',
      price: '₹78,000',
      originalPrice: '₹92,000',
      image: 'https://motoroctane.com/wp-content/uploads/2018/03/2018-TVS-Apache-RTR-160-front-three-quarter.jpg?x16736',
      rating: 4.1,
      condition: 'Good',
      usedKms: '22,100 km',
      fuelType: 'Petrol',
      status: 'Well Maintained',
      yearsUsed: '3.2 years',
      registration: 'Approved',
      numberPlate: 'TS 07 EF 9012',
      complaints: 'Minor engine noise',
      toolKit: 'Available',
      damages: 'Scratch on right side panel',
      images: [
        'https://motoroctane.com/wp-content/uploads/2018/03/2018-TVS-Apache-RTR-160-front-three-quarter.jpg?x16736',
        'https://imgd.aeplcdn.com/370x208/bw/models/tvs-apache-rtr-160-4v-front-three-quarter-2.png',
        'https://imgd.aeplcdn.com/370x208/bw/models/tvs-apache-rtr-160-4v-left-side-view.png'
      ],
      specs: {
        mileage: '45 km/l',
        fuelType: 'Petrol',
        tankCapacity: '12 liters',
        seating: 'Dual seat with grab rail',
        brakes: 'Disc brakes (Front & Rear)',
        lights: 'Halogen headlight, LED taillight',
        speed: '0-60 km/h in 4.8 seconds',
        comfort: 'Upright riding position, plush seating',
        compatibility: 'Perfect for long rides and touring'
      }
    },
    {
      id: 4,
      name: 'Bajaj Pulsar 150',
      price: '₹65,000',
      originalPrice: '₹78,000',
      image: 'https://ic1.maxabout.us/autos/tw_india/B/2020/5/bajaj-pulsar-150-twin-disc-side-view.jpg',
      rating: 3.9,
      condition: 'Fair',
      usedKms: '35,400 km',
      fuelType: 'Petrol',
      status: 'Regular Maintenance',
      yearsUsed: '4.5 years',
      registration: 'Approved',
      numberPlate: 'TS 12 GH 3456',
      complaints: 'Clutch plate needs replacement',
      toolKit: 'Available',
      damages: 'Scratches on tank and side panels',
      images: [
        'https://ic1.maxabout.us/autos/tw_india/B/2020/5/bajaj-pulsar-150-twin-disc-side-view.jpg',
        'https://imgd.aeplcdn.com/370x208/bw/models/bajaj-pulsar-150-front-three-quarter-2.png',
        'https://imgd.aeplcdn.com/370x208/bw/models/bajaj-pulsar-150-left-side-view.png'
      ],
      specs: {
        mileage: '50 km/l',
        fuelType: 'Petrol',
        tankCapacity: '15 liters',
        seating: 'Dual seat with sculpted design',
        brakes: 'Disc brake (Front), Drum brake (Rear)',
        lights: 'Full LED lighting system',
        speed: '0-60 km/h in 6.2 seconds',
        comfort: 'Sporty riding position, adjustable suspension',
        compatibility: 'Best for performance enthusiasts and track riding'
      }
    },
    {
      id: 5,
      name: 'Royal Enfield Classic 350',
      price: '₹1.25 Lakh',
      originalPrice: '₹1.50 Lakh',
      image: 'https://wallpapers.com/images/hd/royal-enfield-pictures-zsf4c07w6aug8qrl.jpg',
      rating: 4.5,
      condition: 'Excellent',
      usedKms: '8,700 km',
      fuelType: 'Petrol',
      status: 'Like New',
      yearsUsed: '1.2 years',
      registration: 'Approved',
      numberPlate: 'TS 05 IJ 7890',
      complaints: 'No issues',
      toolKit: 'Available',
      damages: 'No visible damages',
      images: [
        'https://wallpapers.com/images/hd/royal-enfield-pictures-zsf4c07w6aug8qrl.jpg',
        'https://imgd.aeplcdn.com/370x208/bw/models/royal-enfield-classic-350-front-three-quarter-2.png',
        'https://imgd.aeplcdn.com/370x208/bw/models/royal-enfield-classic-350-left-side-view.png'
      ],
      specs: {
        mileage: '32 km/l',
        fuelType: 'Petrol',
        tankCapacity: '13.5 liters',
        seating: 'Dual seat with grab rail',
        brakes: 'Disc brakes (Front & Rear)',
        lights: 'Halogen headlight, LED taillight',
        speed: '0-60 km/h in 7.0 seconds',
        comfort: 'Upright riding position, plush seating',
        compatibility: 'Perfect for long rides and touring'
      }
    },
    {
      id: 6,
      name: 'KTM Duke 200',
      price: '₹1.10 Lakh',
      originalPrice: '₹1.40 Lakh',
      image: 'https://wallpaperaccess.com/full/5714029.jpg',
      rating: 4.3,
      condition: 'Good',
      usedKms: '15,200 km',
      fuelType: 'Petrol',
      status: 'Well Maintained',
      yearsUsed: '2.0 years',
      registration: 'Approved',
      numberPlate: 'TS 18 KL 2468',
      complaints: 'Minor chain adjustment needed',
      toolKit: 'Available',
      damages: 'Scratch on left side panel',
      images: [
        'https://wallpaperaccess.com/full/5714029.jpg',
        'https://imgd.aeplcdn.com/370x208/bw/models/ktm-duke-200-front-three-quarter-2.png',
        'https://imgd.aeplcdn.com/370x208/bw/models/ktm-duke-200-left-side-view.png'
      ],
      specs: {
        mileage: '30 km/l',
        fuelType: 'Petrol',
        tankCapacity: '13.5 liters',
        seating: 'Single seat with sporty design',
        brakes: 'Disc brakes (Front & Rear) with ABS',
        lights: 'Full LED lighting system',
        speed: '0-100 km/h in 9.5 seconds',
        comfort: 'Aggressive riding position, performance-focused',
        compatibility: 'Best for sport riding enthusiasts and track days'
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
                VAHAAN BAZAAR - SECOND HAND BIKES
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Premium Second Hand Bikes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our carefully inspected collection of second hand bikes with detailed condition reports, 
            maintenance history, and transparent pricing.
          </p>
        </div>

        {/* Second Hand Bikes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {secondHandBikes.map((bike) => (
            <div 
              key={bike.id} 
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200"
            >
              {/* Bike Image */}
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={bike.image} 
                  alt={bike.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  {bike.condition}
                </div>
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 text-gray-800 px-2 py-1 rounded-full flex items-center shadow-lg">
                  <Star className="w-4 h-4 fill-current text-amber-400 mr-1" />
                  <span className="text-sm font-bold">{bike.rating}</span>
                </div>
              </div>
              
              {/* Bike Details */}
              <div className="p-6">
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">{bike.name}</h3>
                
                <div className="flex items-center mb-3">
                  <span className="text-2xl font-bold text-blue-700">{bike.price}</span>
                  {bike.originalPrice && (
                    <span className="text-base text-gray-500 line-through ml-3">{bike.originalPrice}</span>
                  )}
                </div>
                
                {/* Key Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600">
                    <Gauge className="w-4 h-4 mr-2 text-blue-500" />
                    <span className="text-sm">{bike.specs.mileage}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Fuel className="w-4 h-4 mr-2 text-green-500" />
                    <span className="text-sm">{bike.fuelType}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="w-4 h-4 mr-2 text-purple-500" />
                    <span className="text-sm">{bike.usedKms} • {bike.yearsUsed}</span>
                  </div>
                </div>
                
                {/* Status Badge */}
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    bike.status === 'Like New' ? 'bg-green-100 text-green-800' :
                    bike.status === 'Excellent' ? 'bg-blue-100 text-blue-800' :
                    bike.status === 'Good' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {bike.status}
                  </span>
                </div>
                
                {/* Action Button */}
                <button
                  onClick={() => navigate('/vehicle-details', { state: { vehicle: bike } })}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
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

export default SecondHandBikesPage;