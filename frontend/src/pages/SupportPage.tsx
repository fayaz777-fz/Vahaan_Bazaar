import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, HelpCircle, MessageCircle, Book, Video, Users, HeartHandshake } from 'lucide-react';

const SupportPage = () => {
  const navigate = useNavigate();

  const supportOptions = [
    {
      icon: <HelpCircle className="w-8 h-8 text-blue-500" />,
      title: 'FAQ',
      description: 'Find answers to commonly asked questions about our services.',
      action: 'Browse FAQ'
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-green-500" />,
      title: 'Live Chat',
      description: 'Chat with our support team in real-time for immediate assistance.',
      action: 'Start Chat'
    },
    {
      icon: <Book className="w-8 h-8 text-orange-500" />,
      title: 'User Guide',
      description: 'Comprehensive guides to help you make the most of our platform.',
      action: 'View Guides'
    },
    {
      icon: <Video className="w-8 h-8 text-purple-500" />,
      title: 'Video Tutorials',
      description: 'Step-by-step video tutorials for using our features.',
      action: 'Watch Videos'
    }
  ];

  const donationOptions = [
    {
      amount: '₹100',
      description: 'Support basic platform maintenance',
      popular: false
    },
    {
      amount: '₹500',
      description: 'Help improve user experience',
      popular: true
    },
    {
      amount: '₹1000',
      description: 'Contribute to new feature development',
      popular: false
    },
    {
      amount: 'Custom',
      description: 'Choose your own amount',
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/main')}
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Home
            </motion.button>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Support & Help
            </h1>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            We're Here to Help
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get the support you need, when you need it. Our dedicated team is committed to providing 
            you with the best possible experience on VAHAAN BAZAAR.
          </p>
        </motion.div>

        {/* Support Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {supportOptions.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex justify-center mb-4">
                {option.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{option.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{option.description}</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200"
              >
                {option.action}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Support Us Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl shadow-lg p-8 text-white mb-12"
        >
          <div className="text-center mb-8">
            <HeartHandshake className="w-16 h-16 mx-auto mb-4" />
            <h3 className="text-3xl font-bold mb-4">Support Our Platform</h3>
            <p className="text-lg text-blue-100 max-w-2xl mx-auto">
              Help us maintain and improve VAHAAN BAZAAR. Your support enables us to provide better 
              services and develop new features for the community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {donationOptions.map((option, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className={`relative bg-white/10 backdrop-blur-md rounded-lg p-6 text-center cursor-pointer ${
                  option.popular ? 'ring-2 ring-yellow-300' : ''
                }`}
              >
                {option.popular && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-semibold">
                    Popular
                  </div>
                )}
                <div className="text-2xl font-bold mb-2">{option.amount}</div>
                <p className="text-sm text-blue-100">{option.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
            >
              Support Now
            </motion.button>
          </div>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-white rounded-xl shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <Users className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Still Need Help?</h3>
            <p className="text-gray-600">
              Can't find what you're looking for? Our support team is here to help.
            </p>
          </div>
          
          <form className="max-w-md mx-auto space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option>Select Issue Type</option>
              <option>Technical Problem</option>
              <option>Account Issue</option>
              <option>Feature Request</option>
              <option>General Inquiry</option>
            </select>
            <textarea
              placeholder="Describe your issue or question"
              rows={4}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
            >
              Submit Support Request
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SupportPage;