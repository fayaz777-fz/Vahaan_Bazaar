import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, ChevronLeft, Bike, Car } from 'lucide-react';
import Footer from '../components/Footer';

const ShowroomPage = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Ad images
  const adImages = [
    'https://i.pinimg.com/originals/4a/ca/a1/4acaa18135ac3362a864cc7e3bb46772.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/66716d83112735.5d32a8efebe15.jpg',
    'https://d1csarkz8obe9u.cloudfront.net/posterpreviews/big-bike-ads-design-template-662046a6dd70d6e7a95db850aad98254_screen.jpg?ts=1670378335',
    'https://www.gingermediagroup.com/wp-content/uploads/2024/02/electric-bike-advertisement-4.jpg',
    'https://i.pinimg.com/originals/f8/69/78/f86978ee3e3965ef91de29a365aeb387.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/fs/854987170849383.65d1076834018.png',
    'https://i.pinimg.com/originals/44/af/c4/44afc464cfaf4b68cbaf72fe21c01dfd.jpg'
  ];

  // Auto slide change - faster rotation (every 2 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === adImages.length - 1 ? 0 : prevSlide + 1));
    }, 2000); // Change slide every 2 seconds

    return () => clearInterval(interval);
  }, [adImages.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide(currentSlide === adImages.length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? adImages.length - 1 : currentSlide - 1);
  };

  // Sample bike data with model tags
  const bikes = [
    {
      id: 1,
      name: 'Yamaha R15 V4',
      price: '₹1.77 Lakh',
      image: 'https://www.revzoneyamaha-motor.com.vn/wp-content/uploads/2022/09/ymh-motor-vn-r15-v4-_3-1-scaled.jpg',
      rating: 4.5,
      category: 'Sport',
      tag: 'New Launch'
    },
    {
      id: 2,
      name: 'Honda CB350RS',
      price: '₹2.05 Lakh',
      image: 'https://wallpapercave.com/wp/wp11852700.jpg',
      rating: 4.3,
      category: 'Cruiser',
      tag: 'Popular'
    },
    {
      id: 3,
      name: 'Royal Enfield Classic 350',
      price: '₹1.84 Lakh',
      image: 'https://images.playground.com/29c06c95df424f9dbd752815389b7ebf.jpeg',
      rating: 4.6,
      category: 'Heritage',
      tag: 'Best Seller'
    },
    {
      id: 4,
      name: 'Kawasaki Ninja ZX-10R',
      price: '₹14.99 Lakh',
      image: 'https://www.bossrides.in/wp-content/uploads/2023/03/kawasaki-ninja-zx10r-1-min-scaled-1.jpg',
      rating: 4.8,
      category: 'Super Sport',
      tag: 'Premium'
    },
    {
      id: 5,
      name: 'TVS Apache RR 310',
      price: '₹2.65 Lakh',
      image: 'https://stat.overdrive.in/wp-content/odgallery/2020/01/55304_2020_TVS-Apache-RR310_1_468x263.jpg',
      rating: 4.4,
      category: 'Sport',
      tag: 'Performance'
    },
    {
      id: 6,
      name: 'Bajaj Dominar 400',
      price: '₹2.27 Lakh',
      image: 'https://ic1.maxabout.us/autos/tw_india/B/2020/5/bajaj-dominar-400-rear-3-quarter-view.jpg',
      rating: 4.2,
      category: 'Tourer',
      tag: 'Adventure'
    },
    {
      id: 7,
      name: 'Suzuki Hayabusa',
      price: '₹17.99 Lakh',
      image: 'https://images.carandbike.com/car-images/motorcycles/suzuki/hayabusa/suzuki-hayabusa-right-side-view.webp',
      rating: 4.7,
      category: 'Hyper Sport',
      tag: 'Legend'
    },
    {
      id: 8,
      name: 'KTM Duke 390',
      price: '₹3.10 Lakh',
      image: 'https://bd.gaadicdn.com/processedimages/ktm/ktm-duke-390/640X309/ktm-duke-390-65e0b1037305d.jpg',
      rating: 4.5,
      category: 'Street',
      tag: 'Aggressive'
    }
  ];

  // Sample scooter data with model tags
  const scooters = [
    {
      id: 1,
      name: 'Honda Activa 6G',
      price: '₹74,536',
      image: 'https://www.autobics.com/wp-content/uploads/2020/01/Honda-Activa-6G-Matte-Axis-Grey-Metallic-2020.jpg',
      rating: 4.4,
      category: 'Commuter',
      tag: 'Best Mileage'
    },
    {
      id: 2,
      name: 'TVS Jupiter',
      price: '₹73,400',
      image: 'https://i.ytimg.com/vi/j4MeBdtcy1M/maxresdefault.jpg',
      rating: 4.3,
      category: 'Commuter',
      tag: 'Stylish'
    },
    {
      id: 3,
      name: 'Suzuki Access 125',
      price: '₹81,700',
      image: 'https://www.bajajmall.in/emistore/media/catalog/product/a/c/access125drum47_base_2.jpeg',
      rating: 4.2,
      category: 'Commuter',
      tag: 'Value'
    },
    {
      id: 4,
      name: 'Hero Pleasure+',
      price: '₹69,000',
      image: 'https://imgd.aeplcdn.com/310x174/bw/models/hero-pleasure-plus-standard--bs-vi-.jpg',
      rating: 4.1,
      category: 'Commuter',
      tag: 'Compact'
    },
    {
      id: 5,
      name: 'Yamaha Fascino 125',
      price: '₹87,000',
      image: 'https://imgd.aeplcdn.com/310x174/bw/models/yamaha-fascino-125-fi-deluxe--bs-vi-.jpg',
      rating: 4.3,
      category: 'Commuter',
      tag: 'Feature Rich'
    },
    {
      id: 6,
      name: 'Oktober 350',
      price: '₹1.95 Lakh',
      image: 'https://imgd.aeplcdn.com/310x174/bw/models/okaya-oktober-350.jpg',
      rating: 4.0,
      category: 'Electric',
      tag: 'Eco Friendly'
    },
    {
      id: 7,
      name: 'Ola S1',
      price: '₹99,000',
      image: 'https://autonexa.com/wp-content/uploads/2021/08/Ola-S1-electric-scooter-launched-in-India-at-Rs-99999.jpg',
      rating: 4.2,
      category: 'Electric',
      tag: 'Smart'
    },
    {
      id: 8,
      name: 'Okinawa iPraise+',
      price: '₹92,000',
      image: 'https://imgd.aeplcdn.com/310x174/bw/models/okinawa-ipraise-plus.jpg',
      rating: 4.1,
      category: 'Electric',
      tag: 'Affordable'
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
                VAHAAN BAZAAR SHOWROOM
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Showroom Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Ads Swiper */}
        <div className="relative mb-8 rounded-xl overflow-hidden shadow-lg h-96">
          {/* Slides */}
          {adImages.map((image, index) => (
            <div 
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={image} 
                alt={`Ad ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Bikes Section */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <Bike className="w-8 h-8 text-blue-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">Bikes</h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {bikes.map((bike) => (
              <div 
                key={bike.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => navigate('/vehicle-details', { state: { vehicle: bike } })}
              >
                <div className="relative">
                  <img
                    src={bike.image}
                    alt={bike.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-1 right-1 bg-blue-500 text-white text-xs font-bold px-1 py-0.5 rounded">
                    {bike.tag}
                  </div>
                </div>
                <div className="p-2">
                  <h3 className="text-sm font-semibold text-gray-800 mb-0.5">{bike.name}</h3>
                  <p className="text-xs text-gray-500 mb-1">{bike.category}</p>
                  <div className="flex items-center mb-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="ml-1 text-xs text-gray-600">{bike.rating}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-base font-bold text-blue-600">{bike.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Scooters Section */}
        <section>
          <div className="flex items-center mb-6">
            <Car className="w-8 h-8 text-purple-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-800">Scooters</h2>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {scooters.map((scooter) => (
              <div 
                key={scooter.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => navigate('/vehicle-details', { state: { vehicle: scooter } })}
              >
                <div className="relative">
                  <img
                    src={scooter.image}
                    alt={scooter.name}
                    className="w-full h-32 object-cover"
                  />
                  <div className="absolute top-1 right-1 bg-purple-500 text-white text-xs font-bold px-1 py-0.5 rounded">
                    {scooter.tag}
                  </div>
                </div>
                <div className="p-2">
                  <h3 className="text-sm font-semibold text-gray-800 mb-0.5">{scooter.name}</h3>
                  <p className="text-xs text-gray-500 mb-1">{scooter.category}</p>
                  <div className="flex items-center mb-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="ml-1 text-xs text-gray-600">{scooter.rating}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-base font-bold text-purple-600">{scooter.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Sections - Single Row */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">FEATURED BY</h2>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {/* Under Budget */}
            <div 
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-blue-200"
              onClick={() => console.log('Under Budget clicked')}
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-blue-600 text-white rounded-full p-3 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-gray-800">Under Budget</h3>
                <p className="text-xs text-gray-600 mt-1">Affordable options</p>
              </div>
            </div>

            {/* Replacement */}
            <div 
              className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-green-200"
              onClick={() => console.log('Replacement clicked')}
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-green-600 text-white rounded-full p-3 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-gray-800">Replacement</h3>
                <p className="text-xs text-gray-600 mt-1">Upgrade your ride</p>
              </div>
            </div>

            {/* Two Wheeler */}
            <div 
              className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-purple-200"
              onClick={() => console.log('Two Wheeler clicked')}
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-purple-600 text-white rounded-full p-3 mb-2">
                  <Car className="h-6 w-6" />
                </div>
                <h3 className="text-sm font-semibold text-gray-800">Two Wheeler</h3>
                <p className="text-xs text-gray-600 mt-1">All categories</p>
              </div>
            </div>

            {/* Best Mileage */}
            <div 
              className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-yellow-200"
              onClick={() => console.log('Best Mileage clicked')}
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-yellow-600 text-white rounded-full p-3 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-gray-800">Best Mileage</h3>
                <p className="text-xs text-gray-600 mt-1">Fuel efficient</p>
              </div>
            </div>

            {/* Electric */}
            <div 
              className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-teal-200"
              onClick={() => console.log('Electric clicked')}
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-teal-600 text-white rounded-full p-3 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10l7-7m0 0l-7 7m7-7v7m0-7H8a2 2 0 00-2 2v9a2 2 0 002 2h10a2 2 0 002-2V8a2 2 0 00-2-2h-3" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-gray-800">Electric</h3>
                <p className="text-xs text-gray-600 mt-1">Eco-friendly rides</p>
              </div>
            </div>

            {/* Sports */}
            <div 
              className="bg-gradient-to-br from-red-50 to-red-100 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer border border-red-200"
              onClick={() => console.log('Sports clicked')}
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-red-600 text-white rounded-full p-3 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10l7-7m0 0l-7 7m7-7v7m0-7H8a2 2 0 00-2 2v9a2 2 0 002 2h10a2 2 0 002-2V8a2 2 0 00-2-2h-3" />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-gray-800">Sports</h3>
                <p className="text-xs text-gray-600 mt-1">High performance</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ShowroomPage;