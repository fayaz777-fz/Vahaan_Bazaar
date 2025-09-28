import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Wrench, Shield, Clock, Award, Phone, Mail, Loader2, CheckCircle } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import apiService from '../services/api';
import { ServiceRequest, ApiError } from '../types';

const ServicePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();
  const [serviceTypes, setServiceTypes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Form data state
  const [formData, setFormData] = useState({
    serviceType: '',
    contactInfo: {
      name: '',
      phone: '',
      email: ''
    },
    vehicleDetails: {
      type: '' as 'bike' | 'scooter' | 'car' | '',
      brand: '',
      model: '',
      year: new Date().getFullYear(),
      registrationNumber: ''
    },
    serviceDetails: {
      description: '',
      preferredDate: '',
      preferredTime: '',
      urgency: 'medium' as 'low' | 'medium' | 'high'
    }
  });

  // Load service types on component mount
  useEffect(() => {
    const loadServiceTypes = async () => {
      setIsLoading(true);
      try {
        const response = await apiService.getServiceTypes();
        setServiceTypes(response.data.serviceTypes);
      } catch (error) {
        console.error('Failed to load service types:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadServiceTypes();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // Reset errors
    setErrors({});
    setSuccessMessage('');
    setIsSubmitting(true);
    
    // Validation
    const validationErrors: Record<string, string> = {};
    if (!formData.serviceType) validationErrors.serviceType = 'Please select a service type';
    if (!formData.contactInfo.name.trim()) validationErrors.name = 'Name is required';
    if (!formData.contactInfo.phone.trim()) validationErrors.phone = 'Phone number is required';
    if (!formData.contactInfo.email.trim()) validationErrors.email = 'Email is required';
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }
    
    try {
      const serviceRequestData = {
        serviceType: formData.serviceType as any,
        contactInfo: formData.contactInfo,
        vehicleDetails: {
          type: formData.vehicleDetails.type || undefined,
          brand: formData.vehicleDetails.brand || undefined,
          model: formData.vehicleDetails.model || undefined,
          year: formData.vehicleDetails.year || undefined,
          registrationNumber: formData.vehicleDetails.registrationNumber || undefined
        },
        serviceDetails: formData.serviceDetails
      };
      
      await apiService.createServiceRequest(serviceRequestData);
      
      setSuccessMessage('Service request submitted successfully! We will contact you soon.');
      
      // Reset form
      setFormData({
        serviceType: '',
        contactInfo: {
          name: '',
          phone: '',
          email: ''
        },
        vehicleDetails: {
          type: '',
          brand: '',
          model: '',
          year: new Date().getFullYear(),
          registrationNumber: ''
        },
        serviceDetails: {
          description: '',
          preferredDate: '',
          preferredTime: '',
          urgency: 'medium'
        }
      });
      
    } catch (error) {
      console.error('Failed to submit service request:', error);
      const apiError = error as ApiError;
      setErrors({ general: apiError.message || 'Failed to submit service request. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (field: string, value: any, section?: string) => {
    if (section === 'contactInfo') {
      setFormData(prev => ({
        ...prev,
        contactInfo: {
          ...prev.contactInfo,
          [field]: value
        }
      }));
    } else if (section === 'vehicleDetails') {
      setFormData(prev => ({
        ...prev,
        vehicleDetails: {
          ...prev.vehicleDetails,
          [field]: value
        }
      }));
    } else if (section === 'serviceDetails') {
      setFormData(prev => ({
        ...prev,
        serviceDetails: {
          ...prev.serviceDetails,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const services = [
    {
      icon: <Wrench className="w-8 h-8 text-blue-500" />,
      title: 'Maintenance & Repair',
      description: 'Professional maintenance and repair services for all bike brands.',
      features: ['Engine Servicing', 'Oil Change', 'Brake Repair', 'Tire Replacement']
    },
    {
      icon: <Shield className="w-8 h-8 text-green-500" />,
      title: 'Extended Warranty',
      description: 'Comprehensive warranty coverage for your peace of mind.',
      features: ['Engine Protection', 'Electrical Coverage', 'Parts Replacement', '24/7 Support']
    },
    {
      icon: <Clock className="w-8 h-8 text-orange-500" />,
      title: 'Quick Service',
      description: 'Fast and efficient service to get you back on the road quickly.',
      features: ['Express Service', 'Same Day Delivery', 'Mobile Service', 'Emergency Support']
    },
    {
      icon: <Award className="w-8 h-8 text-purple-500" />,
      title: 'Premium Care',
      description: 'Premium service package with exclusive benefits.',
      features: ['VIP Treatment', 'Priority Booking', 'Free Pick & Drop', 'Annual Health Check']
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
              Our Services
            </h1>
            <div className="w-24" /> {/* Spacer */}
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
            Professional Vehicle Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We provide comprehensive vehicle services to keep your bike or scooter running smoothly. 
            Our certified technicians use genuine parts and advanced equipment.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                {service.icon}
                <h3 className="text-xl font-semibold text-gray-800 ml-3">{service.title}</h3>
              </div>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              Book a Service Appointment
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.general && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {errors.general}
                </div>
              )}
              
              {successMessage && (
                <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  {successMessage}
                </div>
              )}
              
              {!isAuthenticated && (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-600 px-4 py-3 rounded-lg text-sm">
                  Please <button 
                    type="button" 
                    onClick={() => navigate('/login')} 
                    className="underline font-medium hover:text-yellow-700"
                  >
                    sign in
                  </button> to book a service appointment.
                </div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Information */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.contactInfo.name}
                      onChange={(e) => handleInputChange('name', e.target.value, 'contactInfo')}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      disabled={!isAuthenticated || isSubmitting}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.contactInfo.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value, 'contactInfo')}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.phone ? 'border-red-500' : 'border-gray-300'
                      }`}
                      disabled={!isAuthenticated || isSubmitting}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={formData.contactInfo.email}
                      onChange={(e) => handleInputChange('email', e.target.value, 'contactInfo')}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      disabled={!isAuthenticated || isSubmitting}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>
                
                {/* Service Details */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">Service Details</h4>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Type *</label>
                    <select 
                      value={formData.serviceType}
                      onChange={(e) => handleInputChange('serviceType', e.target.value)}
                      className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.serviceType ? 'border-red-500' : 'border-gray-300'
                      }`}
                      disabled={!isAuthenticated || isSubmitting || isLoading}
                    >
                      <option value="">Select Service Type</option>
                      {serviceTypes.map((type, index) => (
                        <option key={index} value={type.id}>{type.name}</option>
                      ))}
                    </select>
                    {errors.serviceType && (
                      <p className="text-red-500 text-sm mt-1">{errors.serviceType}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vehicle Type</label>
                    <select 
                      value={formData.vehicleDetails.type}
                      onChange={(e) => handleInputChange('type', e.target.value, 'vehicleDetails')}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={!isAuthenticated || isSubmitting}
                    >
                      <option value="">Select Vehicle Type</option>
                      <option value="bike">Bike</option>
                      <option value="scooter">Scooter</option>
                      <option value="car">Car</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                    <input
                      type="date"
                      value={formData.serviceDetails.preferredDate}
                      onChange={(e) => handleInputChange('preferredDate', e.target.value, 'serviceDetails')}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={!isAuthenticated || isSubmitting}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Additional Details</label>
                    <textarea
                      placeholder="Describe your service requirements..."
                      rows={3}
                      value={formData.serviceDetails.description}
                      onChange={(e) => handleInputChange('description', e.target.value, 'serviceDetails')}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={!isAuthenticated || isSubmitting}
                    />
                  </div>
                </div>
              </div>
              
              <motion.button
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                type="submit"
                disabled={!isAuthenticated || isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Booking Appointment...
                  </>
                ) : (
                  'Book Appointment'
                )}
              </motion.button>
            </form>
            
            {/* Contact Information Display */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h4>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="w-5 h-5 text-blue-500 mr-3" />
                  <span className="text-gray-700">+91 9876543210</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-blue-500 mr-3" />
                  <span className="text-gray-700">service@vahaanbazaar.com</span>
                </div>
              </div>
              <div className="mt-6">
                <h5 className="font-semibold text-gray-800 mb-2">Service Hours</h5>
                <p className="text-gray-600">Monday - Saturday: 9:00 AM - 7:00 PM</p>
                <p className="text-gray-600">Sunday: 10:00 AM - 5:00 PM</p>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default ServicePage;