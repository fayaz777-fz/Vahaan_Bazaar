import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Shield, Wrench, Settings, CheckCircle, Star } from 'lucide-react';

const AccessoriesPage = () => {
  const navigate = useNavigate();

  // Helmet data with specific images as requested
  const helmets = [
    {
      id: 1,
      name: 'AGV K1 Helmet',
      price: '₹18,500',
      image: 'https://www.motostorm.it/images/products/large/caschi_integrali/agv_k1_s_neromatt.jpg',
      rating: 4.8,
      safetyRating: 'DOT & ECE 22.05 Certified',
      features: ['Carbon Fiber', 'Anti-fog Visor', 'Bluetooth Ready']
    },
    {
      id: 2,
      name: 'Shoei X-14 Helmet',
      price: '₹22,000',
      image: 'https://images-na.ssl-images-amazon.com/images/I/41GmlB-X%2BdL.jpg',
      rating: 4.9,
      safetyRating: 'SNELL & ECE 22.05 Certified',
      features: ['Aero Tuned Shell', '3D Max Dry Interior', 'Quick Release Shield']
    },
    {
      id: 3,
      name: 'Arai RX-Q Helmet',
      price: '₹25,500',
      image: 'https://content.motosport.com/images/items/large/AAI/AAI000J/X002.jpg',
      rating: 4.7,
      safetyRating: 'SNELL & DOT Certified',
      features: ['Super Fiber Composite', 'Ventilation System', 'Removable Liner']
    },
    {
      id: 4,
      name: 'HJC C70 Helmet',
      price: '₹15,800',
      image: 'https://www.motostorm.it/images/products/large/caschi_integrali/hjc_c70_nian_grigio.jpg',
      rating: 4.6,
      safetyRating: 'ECE 22.05 Certified',
      features: ['Advanced Polycarbonate', 'Pinlock Ready', 'Adjustable Ventilation']
    },
    {
      id: 5,
      name: 'LS2 FF326 Helmet',
      price: '₹8,900',
      image: 'https://www.customelements.in/wp-content/uploads/2018/04/LS2-FF-386-Solid-Matt-Black-Full-Face-Helmet.jpg',
      rating: 4.4,
      safetyRating: 'DOT Certified',
      features: ['Fiberglass Shell', 'Anti-scratch Shield', 'Quick Click System']
    },
    {
      id: 6,
      name: 'Bell Qualifier DLX',
      price: '₹19,500',
      image: 'https://images.esellerpro.com/2189/I/358/916/13802-Bell-Qualifier-DLX-Motorcycle-Helmet-Rally-Matt-Titanium-1245-2.jpg',
      rating: 4.5,
      safetyRating: 'DOT & ECE 22.05 Certified',
      features: ['Fusion+ Carbon Fiber', 'Double D-Ring', 'Aero Advantage']
    },
    {
      id: 7,
      name: 'Helmets RK X-50',
      price: '₹12,000',
      image: 'https://m.media-amazon.com/images/I/71XaH7sy9eL._AC_SL1500_.jpg',
      rating: 4.3,
      safetyRating: 'ECE 22.05 Certified',
      features: ['Fiberglass Shell', 'Sun Visor', 'Removable Liner']
    },
    {
      id: 8,
      name: 'Steelbird SBH-39 Terminator',
      price: '₹7,500',
      image: 'https://m.media-amazon.com/images/I/71QWxhAjy-L._SL1500_.jpg',
      rating: 4.2,
      safetyRating: 'DOT Certified',
      features: ['ABS Shell', 'Anti-scratch Coating', 'Breathable Lining']
    },
    {
      id: 9,
      name: 'Vega Off Road Helmets',
      price: '₹5,800',
      image: 'https://images-na.ssl-images-amazon.com/images/I/715l508QneL._AC_SL1500_.jpg',
      rating: 4.1,
      safetyRating: 'ECE 22.05 Certified',
      features: ['Polycarbonate Shell', 'Peak Guard', 'Quick Release Mechanism']
    },
    {
      id: 10,
      name: 'Studds Alpha DLX',
      price: '₹4,200',
      image: 'https://shop.studds.com/wp-content/uploads/2023/04/VOGUE-DAPPER-BLUE_RIGHT-VIEW.jpg',
      rating: 4.0,
      safetyRating: 'DOT Certified',
      features: ['ABS Shell', 'Anti-fog Visor', 'Comfort Fit']
    }
  ];

  // Tool kits data
  const toolKits = [
    {
      id: 1,
      name: 'Premium Bike Tool Kit',
      price: '₹2,500',
      image: 'https://m.media-amazon.com/images/I/71CXGkOsaaL._AC_SX425_.jpg',
      features: ['15+ Tools', 'Compact Design', 'Durable Case']
    },
    {
      id: 2,
      name: 'Scooter Maintenance Kit',
      price: '₹1,800',
      image: 'https://www.stopngo.com/cdn/shop/files/Tire-Repair-Kit-Pieces-Stop-Go-6000-detailed-image-1.png?v=1726768346&width=533',
      features: ['10+ Tools', 'Scooter Specific', 'Portable Bag']
    },
    {
      id: 3,
      name: 'Emergency Repair Kit',
      price: '₹1,200',
      image: 'https://vader-prod.s3.amazonaws.com/1729870477-haiphaik-car-emergency-roadside-kit-671bba8335bad.jpg',
      features: ['Tire Repair Kit', 'Chain Tool', 'Emergency Patch']
    }
  ];

  // Other accessories data
  const otherAccessories = [
    {
      id: 1,
      name: 'Premium Riding Gloves',
      price: '₹2,800',
      image: 'https://images-na.ssl-images-amazon.com/images/I/51rJUIo7UPL._SL500_._AC_SL500_.jpg',
      category: 'Protection'
    },
    {
      id: 2,
      name: 'Motorcycle Jacket',
      price: '₹8,500',
      image: 'https://mahetri.in/cdn/shop/products/1.1_1200x1200.jpg?v=1755320308',
      category: 'Apparel'
    },
    {
      id: 3,
      name: 'Riding Boots',
      price: '₹5,200',
      image: 'https://www.helmetwala.com/cdn/shop/files/Ryo-T-REX-Riding-Boots-1_b1d4a8ed-88ea-45d8-8e98-c80046cb3df2.webp?v=1701757562&width=1400',
      category: 'Footwear'
    },
    {
      id: 4,
      name: 'Phone Mount',
      price: '₹800',
      image: 'https://www.portronics.com/cdn/shop/files/ClampM31500x15001.jpg?v=1693033368',
      category: 'Electronics'
    },
    {
      id: 5,
      name: 'Tank Bag',
      price: '₹3,200',
      image: 'https://s3.amazonaws.com/images.gearjunkie.com/uploads/2022/12/IMG_5550.jpg',
      category: 'Storage'
    },
    {
      id: 6,
      name: 'Seat Cushion',
      price: '₹1,500',
      image: 'https://m.media-amazon.com/images/I/81R1mlgPOJL._UF1000,1000_QL80_.jpg',
      category: 'Comfort'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Fixed Background */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: "url('https://i.pinimg.com/originals/e9/db/2e/e9db2e4ee2b01005b0046ca6f311d46e.jpg')" }}
      ></div>
      
      {/* Content Container */}
      <div className="relative z-10">
        {/* Header */}
        <header className="bg-black bg-opacity-50 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 flex items-center bg-white bg-opacity-20 backdrop-blur-sm"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                  <span className="ml-1 text-white">Back</span>
                </button>
                <h1 className="text-3xl font-bold text-white">
                  VAHAAN BAZAAR - ACCESSORIES
                </h1>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content - Reduced padding to show more background */}
        <main className="max-w-7xl mx-auto px-4 py-4">
          {/* Helmets Section - Bright tag-like appearance */}
          <section className="mb-6">
            <div className="flex items-center mb-3">
              <Shield className="w-5 h-5 text-blue-500 mr-2" />
              <h2 className="text-lg font-bold text-white bg-blue-600 rounded-full px-4 py-2 inline-block shadow-lg">Helmets</h2>
            </div>
            
            {/* Horizontal scrollable container */}
            <div className="overflow-x-auto pb-3">
              <div className="flex space-x-3 min-w-max">
                {helmets.map((helmet) => (
                  <div key={helmet.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 w-44 flex-shrink-0 border border-blue-100">
                    <div className="relative h-28 overflow-hidden">
                      <img 
                        src={helmet.image} 
                        alt={helmet.name} 
                        className="w-full h-full object-contain p-1"
                      />
                      <div className="absolute top-1 right-1 bg-yellow-400 rounded-full px-1 py-0.5 flex items-center shadow text-xs">
                        <Star className="w-3 h-3 text-yellow-700 fill-current" />
                        <span className="font-bold ml-0.5 text-yellow-900">{helmet.rating}</span>
                      </div>
                    </div>
                    <div className="p-2">
                      <h3 className="text-xs font-bold text-gray-800 mb-0.5 truncate">{helmet.name}</h3>
                      <p className="text-xs text-gray-600 mb-1 truncate">{helmet.safetyRating}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-blue-600">{helmet.price}</span>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-0.5 rounded text-xs transition-colors duration-200 shadow">
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Tool Kits Section - Bright tag-like appearance */}
          <section className="mb-6">
            <div className="flex items-center mb-3">
              <Settings className="w-5 h-5 text-green-500 mr-2" />
              <h2 className="text-lg font-bold text-white bg-green-600 rounded-full px-4 py-2 inline-block shadow-lg">Tool Kits & Repair Kits</h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {toolKits.map((kit) => (
                <div key={kit.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-green-100">
                  <div className="relative h-28 overflow-hidden">
                    <img 
                      src={kit.image} 
                      alt={kit.name} 
                      className="w-full h-full object-contain p-2"
                    />
                  </div>
                  <div className="p-2">
                    <h3 className="text-xs font-bold text-gray-800 mb-1 truncate">{kit.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-green-600">{kit.price}</span>
                      <button className="bg-green-500 hover:bg-green-600 text-white px-2 py-0.5 rounded text-xs transition-colors duration-200 shadow">
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Other Accessories Section - Bright tag-like appearance */}
          <section className="mb-6">
            <div className="flex items-center mb-3">
              <Wrench className="w-5 h-5 text-purple-500 mr-2" />
              <h2 className="text-lg font-bold text-white bg-purple-600 rounded-full px-4 py-2 inline-block shadow-lg">Other Accessories</h2>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {otherAccessories.map((accessory) => (
                <div key={accessory.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-purple-100">
                  <div className="relative h-28 overflow-hidden">
                    <img 
                      src={accessory.image} 
                      alt={accessory.name} 
                      className="w-full h-full object-contain p-2"
                    />
                    <div className="absolute top-1 right-1 bg-purple-500 text-white px-1 py-0.5 rounded-full text-xs font-bold truncate shadow">
                      {accessory.category}
                    </div>
                  </div>
                  <div className="p-2">
                    <h3 className="text-xs font-bold text-gray-800 mb-1 truncate">{accessory.name}</h3>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-bold text-purple-600">{accessory.price}</span>
                      <button className="bg-purple-500 hover:bg-purple-600 text-white px-2 py-0.5 rounded text-xs transition-colors duration-200 shadow">
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AccessoriesPage;