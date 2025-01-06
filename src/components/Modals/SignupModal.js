import React, { useState } from 'react';
import { X, AlertCircle, User, Mail, Lock, Building2, Phone, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import logo from "../../assets/img/logo.png";

const SignupModal = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    companyName: '',
    phoneNumber: '',
    website: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Invalid email format';

    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.fullName) newErrors.fullName = 'Full name is required';

    if (formData.phoneNumber && !/^\+?[\d\s-]{10,}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone number format';
    }

    if (formData.website && !/^https?:\/\/.*/.test(formData.website)) {
      newErrors.website = 'Website must start with http:// or https://';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        setLoading(true);
        await signup(formData);
        onClose();
      } catch (error) {
        setErrors({ submit: error.message });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl p-8 bg-gray-900 shadow-2xl rounded-2xl"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center w-12 h-12 mb-4 rounded-xl"
              >
                  <img
                    src={logo}
                    alt="Logo"
                    className="h-8 mr-3"
                  />
                  <span className="text-3xl font-bold bg-gradient-to-r from-[#a017c9] to-[#2ab6e4] text-transparent bg-clip-text">
                    PLUGSPACE
                  </span>
              </motion.div>
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold text-white"
              >
                Create Your Account
              </motion.h2>
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-2 text-gray-400"
              >
                Join our community and start your journey
              </motion.p>
            </div>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={onClose}
              className="p-2 text-gray-400 transition-colors rounded-full hover:bg-gray-800 hover:text-white"
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-700"
          >
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              {errors.submit && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center col-span-2 p-4 text-sm text-red-500 rounded-lg bg-red-500/10"
                >
                  <AlertCircle className="w-5 h-5 mr-2" />
                  {errors.submit}
                </motion.div>
              )}

              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2ab6e4] text-white placeholder-gray-500 ${
                      errors.fullName ? 'border-red-500' : ''
                    }`}
                    placeholder="John Doe"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                  )}
                </div>
              </div>

              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2ab6e4] text-white placeholder-gray-500 ${
                      errors.email ? 'border-red-500' : ''
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2ab6e4] text-white placeholder-gray-500 ${
                      errors.password ? 'border-red-500' : ''
                    }`}
                    placeholder="Enter password"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                  )}
                </div>
              </div>

              <div className="col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2ab6e4] text-white placeholder-gray-500 ${
                      errors.confirmPassword ? 'border-red-500' : ''
                    }`}
                    placeholder="Confirm password"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
                  )}
                </div>
              </div>

              <div className="col-span-2">
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Company Name <span className="text-gray-500">(Optional)</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2ab6e4] text-white placeholder-gray-500"
                    placeholder="Your company name"
                  />
                </div>
              </div>

              <div className="col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Phone <span className="text-gray-500">(Optional)</span>
                </label>
                <div className="relative">
                  <Phone className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2ab6e4] text-white placeholder-gray-500 ${
                      errors.phoneNumber ? 'border-red-500' : ''
                    }`}
                    placeholder="+1 (555) 000-0000"
                  />
                  {errors.phoneNumber && (
                    <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>
                  )}
                </div>
              </div>

              <div className="col-span-1">
                <label className="block mb-2 text-sm font-medium text-gray-300">
                  Website <span className="text-gray-500">(Optional)</span>
                </label>
                <div className="relative">
                  <Globe className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2ab6e4] text-white placeholder-gray-500 ${
                      errors.website ? 'border-red-500' : ''
                    }`}
                    placeholder="https://example.com"
                  />
                  {errors.website && (
                    <p className="mt-1 text-sm text-red-500">{errors.website}</p>
                  )}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="col-span-2 py-3 mt-4 font-semibold text-white rounded-lg bg-gradient-to-r from-[#a017c9] to-[#2ab6e4] hover:opacity-90 disabled:opacity-50 transition-all duration-200"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </motion.button>
            </form>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 text-sm text-center text-gray-400"
          >
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-[#2ab6e4] hover:text-[#a017c9] transition-colors"
            >
              Log In
            </button>
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SignupModal;