import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Shield, FileText, Clock, CheckCircle, Users, Award, Phone, Mail, MapPin, Bike, Car } from 'lucide-react';

const InsurancePage = () => {
  const navigate = useNavigate();

  // Insurance plans data
  const insurancePlans = [
    {
      id: 1,
      name: 'Basic Protection',
      price: '₹1,200/year',
      features: [
        'Accidental Damage Coverage',
        'Theft Protection',
        'Third-party Liability',
        '24/7 Roadside Assistance',
        'Cashless Claims'
      ],
      popular: false
    },
    {
      id: 2,
      name: 'Comprehensive Cover',
      price: '₹2,500/year',
      features: [
        'Full Accidental Coverage',
        'Theft Protection',
        'Third-party Liability',
        'Natural Calamity Protection',
        'Personal Accident Cover',
        '24/7 Roadside Assistance',
        'Cashless Claims',
        'Engine Protection'
      ],
      popular: true
    },
    {
      id: 3,
      name: 'Premium Protection',
      price: '₹3,800/year',
      features: [
        'Full Accidental Coverage',
        'Theft Protection',
        'Third-party Liability',
        'Natural Calamity Protection',
        'Personal Accident Cover',
        '24/7 Roadside Assistance',
        'Cashless Claims',
        'Engine Protection',
        'Zero Depreciation',
        'NCB Protection',
        'Consumables Cover'
      ],
      popular: false
    }
  ];

  // Why choose us data
  const whyChooseUs = [
    {
      icon: <Shield className="w-8 h-8 text-blue-500" />,
      title: 'Comprehensive Coverage',
      description: 'Protection against all major risks including accidents, theft, and natural calamities.'
    },
    {
      icon: <Clock className="w-8 h-8 text-green-500" />,
      title: 'Quick Claims',
      description: 'Fast and hassle-free claim process with minimal documentation.'
    },
    {
      icon: <CheckCircle className="w-8 h-8 text-purple-500" />,
      title: 'Trusted Partners',
      description: 'Collaboration with top insurance companies for reliable service.'
    },
    {
      icon: <Users className="w-8 h-8 text-yellow-500" />,
      title: 'Expert Support',
      description: 'Dedicated customer service team to assist you at every step.'
    }
  ];

  // Sample vehicles for showcase
  const vehicles = [
    {
      id: 1,
      name: 'Yamaha R15 V4',
      image: 'https://www.revzoneyamaha-motor.com.vn/wp-content/uploads/2022/09/ymh-motor-vn-r15-v4-_3-1-scaled.jpg',
      type: 'Bike'
    },
    {
      id: 2,
      name: 'Honda Activa 6G',
      image: 'https://www.autobics.com/wp-content/uploads/2020/01/Honda-Activa-6G-Matte-Axis-Grey-Metallic-2020.jpg',
      type: 'Scooter'
    },
    {
      id: 3,
      name: 'Royal Enfield Classic 350',
      image: 'https://images.playground.com/29c06c95df424f9dbd752815389b7ebf.jpeg',
      type: 'Bike'
    },
    {
      id: 4,
      name: 'TVS Jupiter',
      image: 'https://i.ytimg.com/vi/j4MeBdtcy1M/maxresdefault.jpg',
      type: 'Scooter'
    },
    {
      id: 5,
      name: 'Kawasaki Ninja ZX-10R',
      image: 'https://www.bossrides.in/wp-content/uploads/2023/03/kawasaki-ninja-zx10r-1-min-scaled-1.jpg',
      type: 'Bike'
    },
    {
      id: 6,
      name: 'Ola S1 Pro',
      image: 'https://www.autobics.com/wp-content/uploads/2023/08/2023-Ola-S1-Pro-Matwhite.jpg',
      type: 'Scooter'
    }
  ];

  // Testimonials with images
  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      rating: 5,
      comment: "The insurance process was so smooth. Got my bike insured in just 10 minutes with excellent coverage.",
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100&q=80'
    },
    {
      id: 2,
      name: 'Priya Sharma',
      rating: 4,
      comment: "Great customer service and comprehensive coverage. My claim was settled within 48 hours.",
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100&q=80'
    },
    {
      id: 3,
      name: 'Amit Patel',
      rating: 5,
      comment: "Affordable premiums with excellent coverage. The roadside assistance saved me twice already!",
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=100&h=100&q=80'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center"
              >
                <ChevronLeft className="w-6 h-6" />
                <span className="ml-1">Back</span>
              </button>
              <h1 className="text-3xl font-bold">VAHAAN BAZAAR - INSURANCE</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-xl shadow-lg p-8 mb-12 text-white">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold mb-4">Protect Your Ride with Confidence</h2>
            <p className="text-xl mb-6">
              Comprehensive insurance solutions tailored for your two-wheeler. Get instant quotes, 
              compare plans, and secure your bike with just a few clicks.
            </p>
            <button 
              onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
            >
              Get Your Quote Now
            </button>
          </div>
        </section>

        {/* Vehicle Showcase */}
        <section className="mb-12">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Popular Vehicles We Insure</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <div key={vehicle.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-48">
                  <img 
                    src={vehicle.image} 
                    alt={vehicle.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    {vehicle.type}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-800">{vehicle.name}</h4>
                  <button 
                    onClick={() => document.getElementById('plans')?.scrollIntoView({ behavior: 'smooth' })}
                    className="mt-2 text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    Get Insurance Quote
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-12">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Why Choose Our Insurance?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="mb-4">
                  {item.icon}
                </div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Insurance Plans */}
        <section id="plans" className="mb-12">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Insurance Plans</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {insurancePlans.map((plan) => (
              <div 
                key={plan.id} 
                className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 ${
                  plan.popular ? 'border-blue-500 transform scale-105' : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="bg-blue-500 text-white text-center py-2 font-bold">
                    MOST POPULAR
                  </div>
                )}
                <div className="p-6">
                  <h4 className="text-2xl font-bold text-gray-800 mb-2">{plan.name}</h4>
                  <div className="text-3xl font-bold text-blue-600 mb-6">{plan.price}</div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 transform hover:scale-105">
                    Select Plan
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-12">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Get Quote</h4>
              <p className="text-gray-600">Enter your bike details and get instant insurance quotes</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Compare Plans</h4>
              <p className="text-gray-600">Compare different insurance plans and choose the best</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Purchase</h4>
              <p className="text-gray-600">Complete the purchase with secure payment options</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">4</span>
              </div>
              <h4 className="text-xl font-semibold text-gray-800 mb-2">Get Covered</h4>
              <p className="text-gray-600">Receive your policy instantly and enjoy protection</p>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-12">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-8">What Our Customers Say</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Award 
                          key={i} 
                          className={`w-5 h-5 ${i < testimonial.rating ? 'fill-current' : 'fill-none'}`} 
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">
                  "{testimonial.comment}"
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl shadow-lg p-8 text-white">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-center mb-8">Get In Touch</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <Phone className="w-10 h-10 mx-auto mb-4 text-blue-400" />
                <h4 className="text-xl font-semibold mb-2">Call Us</h4>
                <p className="text-gray-300">+91 98765 43210</p>
              </div>
              <div className="text-center">
                <Mail className="w-10 h-10 mx-auto mb-4 text-blue-400" />
                <h4 className="text-xl font-semibold mb-2">Email Us</h4>
                <p className="text-gray-300">insurance@vahaanbazaar.com</p>
              </div>
              <div className="text-center">
                <MapPin className="w-10 h-10 mx-auto mb-4 text-blue-400" />
                <h4 className="text-xl font-semibold mb-2">Visit Us</h4>
                <p className="text-gray-300">123 Vehicle Street, Hyderabad, Telangana 500001</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300">
                Request a Callback
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default InsurancePage;