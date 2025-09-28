import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

const FollowUsPage = () => {
  const navigate = useNavigate();

  const socialMediaLinks = [
    {
      name: 'WhatsApp',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg',
      color: 'bg-green-500 hover:bg-green-600',
      url: 'https://wa.me/yourphonenumber',
      description: 'Connect with us on WhatsApp for instant support',
      followers: '1,200+ followers'
    },
    {
      name: 'Instagram',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600',
      url: 'https://instagram.com/yourhandle',
      description: 'Follow us on Instagram for latest updates and offers',
      followers: '2,500+ followers'
    },
    {
      name: 'Facebook',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
      color: 'bg-blue-600 hover:bg-blue-700',
      url: 'https://facebook.com/yourpage',
      description: 'Like our Facebook page for community updates',
      followers: '3,800+ followers'
    },
    {
      name: 'Twitter',
      icon: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg',
      color: 'bg-sky-500 hover:bg-sky-600',
      url: 'https://twitter.com/yourhandle',
      description: 'Follow us on Twitter for quick updates',
      followers: '1,900+ followers'
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
                FOLLOW US
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Connect With Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with our latest offers, new arrivals, and exciting promotions by following us on social media.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {socialMediaLinks.map((platform, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200"
            >
              <div className={`h-32 ${platform.color} flex items-center justify-center`}>
                <img src={platform.icon} alt={platform.name} className="w-16 h-16" />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{platform.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{platform.description}</p>
                <p className="text-gray-500 text-xs mb-4">{platform.followers}</p>
                
                <a
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full ${platform.color} text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 text-center block`}
                >
                  Follow Us
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-md p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Why Follow Us?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="p-4">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">Exclusive Offers</h4>
              <p className="text-gray-600">Get access to special discounts and promotions available only to our followers.</p>
            </div>
            
            <div className="p-4">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e7/Instagram_logo_2016.svg" alt="Instagram" className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">Latest Updates</h4>
              <p className="text-gray-600">Be the first to know about new bike models, services, and events.</p>
            </div>
            
            <div className="p-4">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-gray-800 mb-2">Community</h4>
              <p className="text-gray-600">Join our community of bike enthusiasts and share your experiences.</p>
            </div>
          </div>
        </div>

        {/* Vahan Bazar Website Link */}
        <div className="mt-12 text-center">
          <p className="text-gray-700 mb-2">For more information, visit our official website:</p>
          <a 
            href="https://www.vahaanbazar.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 font-medium underline text-lg"
          >
            www.vahaanbazar.com
          </a>
        </div>
      </main>
    </div>
  );
};

export default FollowUsPage;