import React, { useState, useContext } from 'react';
import { X, Check, Star, Crown, Diamond } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { AuthContext } from '../../contexts/AuthContext'; // Add your auth context

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const SubscriptionModal = ({ isOpen, onClose}) => {
  const { user} = useContext(AuthContext);
  const [selectedPlan, setSelectedPlan] = useState('basic');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      icon: Star,
      price: 20,
      features: [
        'Add up to 200 products per month',
        'Access to profitable products (50% profit return)',
        'Basic search and filtering',
        'Direct contact with suppliers',
      ],
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'standard',
      name: 'Standard',
      icon: Crown,
      price: 50,
      features: [
        'Unlimited product search',
        'Priority listing visibility',
        'Exclusive high-profit products',
        'Premium support with account manager',
        'Analytics and insights',
      ],
      gradient: 'from-purple-500 to-pink-500',
      popular: true
    },
    {
      id: 'premium',
      name: 'Premium',
      icon: Diamond,
      price: 80,
      duration: '6 months',
      totalPrice: 480,
      features: [
        'Unlimited top ranking search',
        'All Standard features included',
        'Highest priority listing',
        'VIP support and account manager',
        'Advanced analytics dashboard',
      ],
      gradient: 'from-amber-500 to-red-500'
    }
  ];

  const handleSubscribe = async (plan) => {
    try {
      setLoading(true);
      setError(null);
  
      const response = await fetch(`${process.env.REACT_APP_API_BASEURL}/api/create-checkout-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planName: plan.name.toLowerCase(), // Convert to lowercase
          price: plan.totalPrice || plan.price,
          userEmail: user.email
        }),
      });
  
      const { sessionId } = await response.json();
      if (!sessionId) throw new Error('Failed to create checkout session');
  
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId });
      
      if (error) throw new Error(error.message);
    } catch (err) {
      setError(err.message);
      console.error('Payment error:', err);
    } finally {
      setLoading(false);
    }
  };
  
  if (!isOpen) return null;

  return (
    <Elements stripe={stripePromise}>
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="relative w-full max-w-6xl p-8 bg-gray-900 shadow-2xl rounded-2xl"
        >
          {error && (
            <div className="p-4 mb-4 text-red-500 border border-red-500 rounded-lg bg-red-500/10">
              {error}
            </div>
          )}
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white">Choose Your Plan</h2>
              <p className="mt-2 text-gray-400">Select the perfect plan for your business needs</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 transition-colors rounded-full hover:bg-gray-800 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  key={plan.id}
                  className={`relative p-6 rounded-xl transition-all ${
                    selectedPlan === plan.id
                      ? 'bg-gray-800 ring-2 ring-blue-500'
                      : 'bg-gray-800 hover:bg-gray-800/80'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 px-4 py-1 text-sm font-medium text-white -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className={`w-12 h-12 mb-4 rounded-xl flex items-center justify-center bg-gradient-to-r ${plan.gradient}`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-white">
                        ${plan.price}
                      </div>
                      <div className="text-sm text-gray-400">
                        per month
                        {plan.duration && ` (${plan.totalPrice}/6mo)`}
                      </div>
                    </div>
                  </div>

                  <ul className="mb-6 space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Check className="flex-shrink-0 w-5 h-5 text-blue-500" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full py-3 rounded-lg transition-all duration-200 ${
                      selectedPlan === plan.id
                        ? `bg-gradient-to-r ${plan.gradient} text-white`
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                  </motion.button>
                </motion.div>
              );
            })}
          </div>

            {/* Update Action Buttons */}
            <div className="flex justify-end space-x-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              disabled={loading}
              className="px-6 py-3 text-gray-300 transition-colors bg-gray-800 rounded-lg hover:bg-gray-700 disabled:opacity-50"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleSubscribe(plans.find(p => p.id === selectedPlan))}
              disabled={loading}
              className={`px-6 py-3 text-white rounded-lg bg-gradient-to-r ${
                plans.find(p => p.id === selectedPlan).gradient
              } hover:opacity-90 transition-opacity disabled:opacity-50`}
            >
              {loading ? 'Processing...' : `Continue with ${plans.find(p => p.id === selectedPlan).name} Plan`}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
    </Elements>
  );
};

export default SubscriptionModal;