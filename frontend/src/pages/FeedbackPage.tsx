import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, MessageSquare, ThumbsUp, Award, Send, Loader2 } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import apiService from '../services/api';
import { Feedback, ApiError } from '../types';

const FeedbackPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useUser();
  const [rating, setRating] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [myFeedback, setMyFeedback] = useState<Feedback[]>([]);
  const [feedbackTypes, setFeedbackTypes] = useState<any[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState('');
  
  // Form data state
  const [formData, setFormData] = useState({
    type: '',
    subject: '',
    message: '',
    rating: 0,
    isAnonymous: false
  });

  // Load feedback types and user's feedback on component mount
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        console.log('Loading feedback data...');
        
        // Load feedback types
        const typesResponse = await apiService.getFeedbackTypes();
        console.log('Feedback types response:', typesResponse);
        setFeedbackTypes(typesResponse.data.feedbackTypes);
        
        // Load user's feedback if authenticated
        if (isAuthenticated) {
          console.log('User is authenticated, loading user feedback...');
          const feedbackResponse = await apiService.getMyFeedback({ page: 1, limit: 10 });
          console.log('User feedback response:', feedbackResponse);
          setMyFeedback(feedbackResponse.data.feedback);
        } else {
          console.log('User not authenticated, skipping user feedback load');
        }
      } catch (error) {
        console.error('Failed to load feedback data:', error);
        const apiError = error as ApiError;
        setErrors({ general: apiError.message || 'Failed to load feedback data' });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, [isAuthenticated]);

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
    if (!formData.type) validationErrors.type = 'Please select a feedback type';
    if (!formData.subject.trim()) validationErrors.subject = 'Subject is required';
    if (!formData.message.trim()) validationErrors.message = 'Message is required';
    if (formData.rating === 0) validationErrors.rating = 'Please provide a rating';
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }
    
    try {
      await apiService.createFeedback({
        type: formData.type,
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        rating: formData.rating,
        isAnonymous: formData.isAnonymous
      });
      
      setSuccessMessage('Thank you for your feedback! We appreciate your input.');
      
      // Reset form
      setFormData({
        type: '',
        subject: '',
        message: '',
        rating: 0,
        isAnonymous: false
      });
      setRating(0);
      
      // Reload user's feedback
      const feedbackResponse = await apiService.getMyFeedback({ page: 1, limit: 10 });
      setMyFeedback(feedbackResponse.data.feedback);
      
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      const apiError = error as ApiError;
      setErrors({ general: apiError.message || 'Failed to submit feedback. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  // Handle rating change
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    setFormData(prev => ({ ...prev, rating: newRating }));
    if (errors.rating) {
      const newErrors = { ...errors };
      delete newErrors.rating;
      setErrors(newErrors);
    }
  };

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
              Feedback & Reviews
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
            Your Voice Matters
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Help us improve VAHAAN BAZAAR by sharing your experience. Your feedback drives our commitment 
            to excellence and helps other customers make informed decisions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Feedback Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Share Your Feedback</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.general && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {errors.general}
                </div>
              )}
              
              {successMessage && (
                <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-lg text-sm">
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
                  </button> to submit feedback.
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  placeholder="Enter feedback subject"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.subject ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={!isAuthenticated || isSubmitting}
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-1">{errors.subject}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Feedback Type *
                </label>
                <select 
                  value={formData.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.type ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={!isAuthenticated || isSubmitting || isLoading}
                >
                  <option value="">Select a feedback type</option>
                  {feedbackTypes.map((type, index) => (
                    <option key={index} value={type.id}>{type.name}</option>
                  ))}
                </select>
                {errors.type && (
                  <p className="text-red-500 text-sm mt-1">{errors.type}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Overall Rating *
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleRatingChange(star)}
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      className="p-1"
                      disabled={!isAuthenticated || isSubmitting}
                    >
                      <Star
                        className={`w-8 h-8 ${
                          star <= (hoveredStar || rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        } transition-colors duration-200`}
                      />
                    </motion.button>
                  ))}
                </div>
                {errors.rating && (
                  <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Feedback *
                </label>
                <textarea
                  placeholder="Share your experience, suggestions, or any other feedback..."
                  rows={4}
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  disabled={!isAuthenticated || isSubmitting}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                )}
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="anonymous"
                  checked={formData.isAnonymous}
                  onChange={(e) => handleInputChange('isAnonymous', e.target.checked)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  disabled={!isAuthenticated || isSubmitting}
                />
                <label htmlFor="anonymous" className="ml-2 text-sm text-gray-700">
                  Submit anonymously
                </label>
              </div>

              <motion.button
                whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                type="submit"
                disabled={!isAuthenticated || isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Submit Feedback
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Recent Reviews */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="space-y-6"
          >
            {/* Feedback Categories */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Feedback Categories</h3>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                </div>
              ) : (
                <div className="space-y-4">
                  {feedbackTypes.length > 0 ? (
                    feedbackTypes.map((type, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="p-2 bg-blue-50 rounded-lg">
                          <MessageSquare className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{type.name}</h4>
                          <p className="text-sm text-gray-600">{type.description}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No feedback categories available.</p>
                  )}
                </div>
              )}
            </div>

            {/* My Feedback History */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                {isAuthenticated ? 'My Feedback History' : 'Recent Reviews'}
              </h3>
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
                </div>
              ) : (
                <div className="space-y-4">
                  {isAuthenticated ? (
                    myFeedback.length > 0 ? (
                      myFeedback.map((feedback, index) => (
                        <motion.div
                          key={feedback._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * index, duration: 0.5 }}
                          className="border-b border-gray-200 pb-4 last:border-b-0"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                feedback.status === 'open' ? 'bg-blue-100 text-blue-800' :
                                feedback.status === 'in-review' ? 'bg-yellow-100 text-yellow-800' :
                                feedback.status === 'resolved' ? 'bg-green-100 text-green-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {feedback.status}
                              </span>
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                feedback.priority === 'high' ? 'bg-red-100 text-red-800' :
                                feedback.priority === 'medium' ? 'bg-orange-100 text-orange-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {feedback.priority} priority
                              </span>
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(feedback.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          <h4 className="font-medium text-gray-800 mb-1">{feedback.subject}</h4>
                          {feedback.rating && (
                            <div className="flex items-center mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < feedback.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                          )}
                          <p className="text-gray-600 text-sm line-clamp-2">{feedback.message}</p>
                          {feedback.response && (
                            <div className="mt-2 p-2 bg-green-50 rounded-lg">
                              <p className="text-sm text-green-800 font-medium">Response:</p>
                              <p className="text-sm text-green-700">{feedback.response.message}</p>
                            </div>
                          )}
                        </motion.div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">You haven't submitted any feedback yet.</p>
                    )
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-500 text-sm mb-2">Sign in to view your feedback history</p>
                      <button
                        onClick={() => navigate('/login')}
                        className="text-blue-600 hover:text-blue-700 text-sm font-medium underline"
                      >
                        Sign In
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl shadow-lg p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Customer Satisfaction</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">4.8</div>
                  <div className="text-sm text-green-100">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">1,247</div>
                  <div className="text-sm text-green-100">Happy Customers</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;