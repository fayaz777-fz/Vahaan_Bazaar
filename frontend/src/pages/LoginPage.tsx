import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useUser } from '../contexts/UserContext';
import apiService from '../services/api';
import { ApiError } from '../types';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showGoogleForm, setShowGoogleForm] = useState(false);
  const [showFacebookForm, setShowFacebookForm] = useState(false);
  const [socialFormData, setSocialFormData] = useState({
    email: '',
    password: ''
  });
  const [socialErrors, setSocialErrors] = useState<Record<string, string>>({});

  const navigate = useNavigate();
  const { setUser } = useUser();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    // Password must be 6 or more characters with at least one special character
    const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset errors
    setErrors({});
    setIsLoading(true);
    
    let validationErrors: Record<string, string> = {};
    
    // Validate email
    if (!validateEmail(formData.email)) {
      validationErrors.email = 'Enter a valid email';
    }
    
    // Validate password
    if (!validatePassword(formData.password)) {
      validationErrors.password = 'Password must be 6+ characters with at least one special character';
    }
    
    // Validate name for signup
    if (!isLogin && (!formData.name || formData.name.trim().length < 2)) {
      validationErrors.name = 'Name must be at least 2 characters long';
    }
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }
    
    try {
      let response;
      
      if (isLogin) {
        // Login
        response = await apiService.login({
          email: formData.email,
          password: formData.password
        });
      } else {
        // Signup
        response = await apiService.signup({
          name: formData.name.trim(),
          email: formData.email,
          password: formData.password,
          phone: '+91 98765 43210',
          gender: 'male'
        });
      }
      
      // Set user in context
      setUser(response.data.user);
      
      // Navigate to main page
      navigate('/main');
      
    } catch (error) {
      console.error('Authentication error:', error);
      
      const apiError = error as ApiError & { status?: number };
      
      if (apiError.errors) {
        // Handle field-specific errors
        setErrors(apiError.errors);
      } else {
        // Handle general errors
        setErrors({ general: apiError.message || 'Authentication failed' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialFormSubmit = async (provider: string) => {
    // Reset errors
    setSocialErrors({});
    setIsLoading(true);
    
    let validationErrors: Record<string, string> = {};
    
    // Validate email
    if (!validateEmail(socialFormData.email)) {
      validationErrors.email = 'Enter a valid email';
    }
    
    // Validate password
    if (!validatePassword(socialFormData.password)) {
      validationErrors.password = 'Password must be 6+ characters with at least one special character';
    }
    
    if (Object.keys(validationErrors).length > 0) {
      setSocialErrors(validationErrors);
      setIsLoading(false);
      return;
    }
    
    try {
      // Use login endpoint for social authentication
      const response = await apiService.login({
        email: socialFormData.email,
        password: socialFormData.password
      });
      
      // Set user in context
      setUser(response.data.user);
      
      // Close forms and navigate
      setShowGoogleForm(false);
      setShowFacebookForm(false);
      navigate('/main');
      
    } catch (error) {
      console.error('Social authentication error:', error);
      
      const apiError = error as ApiError & { status?: number };
      
      if (apiError.errors) {
        // Handle field-specific errors
        setSocialErrors(apiError.errors);
      } else {
        // Handle general errors
        setSocialErrors({ general: apiError.message || 'Authentication failed' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLoginClick = (provider: string) => {
    if (provider === 'google') {
      setShowGoogleForm(true);
      setShowFacebookForm(false);
    } else if (provider === 'facebook') {
      setShowFacebookForm(true);
      setShowGoogleForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-800">
      {/* Header with VAHAAN BAZAAR */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center py-8"
      >
        <h1 className="text-6xl font-bold text-white mb-2">VAHAAN BAZAAR</h1>
        <p className="text-xl text-blue-100">Your Ultimate Vehicle Showroom Platform</p>
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Section - Bike Image */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center"
          >
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              src="https://i.pinimg.com/originals/a2/0e/3b/a20e3b17e48af56f0c1c550ca9f7b4df.jpg"
              alt="Bike"
              className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
            />
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mt-6 text-white"
            >
              <p className="text-lg mb-2">Discover, Compare & Buy Your Dream Vehicle</p>
              <p className="text-blue-200">Join thousands of satisfied customers</p>
            </motion.div>
          </motion.div>

          {/* Right Section - Login Form */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="bg-white rounded-2xl shadow-2xl p-8"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {isLogin ? 'Welcome Back!' : 'Join VAHAAN BAZAAR'}
              </h2>
              <p className="text-gray-600">
                {isLogin ? 'Sign in to your account' : 'Create your account to get started'}
              </p>
            </motion.div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.general && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                  {errors.general}
                </div>
              )}

              {!isLogin && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({...formData, name: e.target.value});
                        if (errors.name) {
                          const newErrors = { ...errors };
                          delete newErrors.name;
                          setErrors(newErrors);
                        }
                      }}
                      className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                        errors.name ? 'border-red-500' : 'border-gray-300'
                      }`}
                      required={!isLogin}
                      disabled={isLoading}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>
                </motion.div>
              )}

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData({...formData, email: e.target.value});
                    if (errors.email) {
                      const newErrors = { ...errors };
                      delete newErrors.email;
                      setErrors(newErrors);
                    }
                  }}
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => {
                    setFormData({...formData, password: e.target.value});
                    if (errors.password) {
                      const newErrors = { ...errors };
                      delete newErrors.password;
                      setErrors(newErrors);
                    }
                  }}
                  className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                    errors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                  disabled={isLoading}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              <motion.button
                whileHover={!isLoading ? { scale: 1.02 } : {}}
                whileTap={!isLoading ? { scale: 0.98 } : {}}
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-800 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    {isLogin ? 'Signing In...' : 'Signing Up...'}
                  </>
                ) : (
                  isLogin ? 'Sign In' : 'Sign Up'
                )}
              </motion.button>
            </form>

            {/* Social Login Forms */}
            <div className="mt-6">
              {/* Google Form */}
              {showGoogleForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Google Login</h3>
                  {socialErrors.general && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-md text-sm mb-4">
                      {socialErrors.general}
                    </div>
                  )}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={socialFormData.email}
                        onChange={(e) => {
                          setSocialFormData({...socialFormData, email: e.target.value});
                          if (socialErrors.email) {
                            const newErrors = { ...socialErrors };
                            delete newErrors.email;
                            setSocialErrors(newErrors);
                          }
                        }}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          socialErrors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your email"
                        disabled={isLoading}
                      />
                      {socialErrors.email && (
                        <p className="text-red-500 text-sm mt-1">{socialErrors.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                      <input
                        type="password"
                        value={socialFormData.password}
                        onChange={(e) => {
                          setSocialFormData({...socialFormData, password: e.target.value});
                          if (socialErrors.password) {
                            const newErrors = { ...socialErrors };
                            delete newErrors.password;
                            setSocialErrors(newErrors);
                          }
                        }}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          socialErrors.password ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your password"
                        disabled={isLoading}
                      />
                      {socialErrors.password && (
                        <p className="text-red-500 text-sm mt-1">{socialErrors.password}</p>
                      )}
                    </div>
                    <div className="flex space-x-3">
                      <motion.button
                        whileHover={!isLoading ? { scale: 1.02 } : {}}
                        whileTap={!isLoading ? { scale: 0.98 } : {}}
                        onClick={() => handleSocialFormSubmit('google')}
                        disabled={isLoading}
                        className="flex-1 bg-green-500 text-white py-2 rounded-md font-medium hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            Connecting...
                          </>
                        ) : (
                          'Continue'
                        )}
                      </motion.button>
                      <motion.button
                        whileHover={!isLoading ? { scale: 1.02 } : {}}
                        whileTap={!isLoading ? { scale: 0.98 } : {}}
                        onClick={() => setShowGoogleForm(false)}
                        disabled={isLoading}
                        className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md font-medium hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Facebook Form */}
              {showFacebookForm && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50"
                >
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Facebook Login</h3>
                  {socialErrors.general && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-md text-sm mb-4">
                      {socialErrors.general}
                    </div>
                  )}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={socialFormData.email}
                        onChange={(e) => {
                          setSocialFormData({...socialFormData, email: e.target.value});
                          if (socialErrors.email) {
                            const newErrors = { ...socialErrors };
                            delete newErrors.email;
                            setSocialErrors(newErrors);
                          }
                        }}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          socialErrors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your email"
                        disabled={isLoading}
                      />
                      {socialErrors.email && (
                        <p className="text-red-500 text-sm mt-1">{socialErrors.email}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                      <input
                        type="password"
                        value={socialFormData.password}
                        onChange={(e) => {
                          setSocialFormData({...socialFormData, password: e.target.value});
                          if (socialErrors.password) {
                            const newErrors = { ...socialErrors };
                            delete newErrors.password;
                            setSocialErrors(newErrors);
                          }
                        }}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          socialErrors.password ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter your password"
                        disabled={isLoading}
                      />
                      {socialErrors.password && (
                        <p className="text-red-500 text-sm mt-1">{socialErrors.password}</p>
                      )}
                    </div>
                    <div className="flex space-x-3">
                      <motion.button
                        whileHover={!isLoading ? { scale: 1.02 } : {}}
                        whileTap={!isLoading ? { scale: 0.98 } : {}}
                        onClick={() => handleSocialFormSubmit('facebook')}
                        disabled={isLoading}
                        className="flex-1 bg-green-500 text-white py-2 rounded-md font-medium hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            Connecting...
                          </>
                        ) : (
                          'Continue'
                        )}
                      </motion.button>
                      <motion.button
                        whileHover={!isLoading ? { scale: 1.02 } : {}}
                        whileTap={!isLoading ? { scale: 0.98 } : {}}
                        onClick={() => setShowFacebookForm(false)}
                        disabled={isLoading}
                        className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md font-medium hover:bg-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Cancel
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Social Login Buttons */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={!isLoading ? { scale: 1.05 } : {}}
                  whileTap={!isLoading ? { scale: 0.95 } : {}}
                  onClick={() => handleSocialLoginClick('google')}
                  disabled={isLoading}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xs mr-2">
                    G
                  </div>
                  <span>Google</span>
                </motion.button>

                <motion.button
                  whileHover={!isLoading ? { scale: 1.05 } : {}}
                  whileTap={!isLoading ? { scale: 0.95 } : {}}
                  onClick={() => handleSocialLoginClick('facebook')}
                  disabled={isLoading}
                  className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </motion.button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-300"
                >
                  {isLogin ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;