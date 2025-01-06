import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Copy, RefreshCw, Trash2, ExternalLink } from 'lucide-react';
import axios from 'axios';

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [apiKey, setApiKey] = useState('');
  const [savedProducts, setSavedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copySuccess, setCopySuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('savedProducts');

  const fetchDashboardData = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const [keyResponse, productsResponse] = await Promise.all([
        axios.get('/api/user/api-key', {
          params: { email: user.email }
        }),
        axios.get('/api/user/saved-products', {
          params: { email: user.email }
        })
      ]);
      setApiKey(keyResponse.data.apiKey);
      setSavedProducts(productsResponse.data.products);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (!['premium', 'standard', 'basic'].includes(user.subscription)) {
      navigate('/');
      return;
    }
    fetchDashboardData();
  }, [user, navigate, fetchDashboardData]); // Ensure fetchDashboardData is in the dependency array

  const regenerateApiKey = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/user/api-key', {
        email: user.email
      });
      setApiKey(response.data.apiKey);
    } catch (error) {
      console.error('Error regenerating API key:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const removeSavedProduct = async (productId) => {
    try {
      await axios.delete(`/api/user/saved-products/${productId}`, {
        data: { email: user.email }  // Add email in request body
      });
      setSavedProducts(products => products.filter(p => p.productId !== productId));
    } catch (error) {
      console.error('Error removing saved product:', error);
    }
  };

  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http') || url.startsWith('/uploads/')) {
      return url;
    }
    if (url.startsWith('//')) {
      return `https:${url}`;
    }
    return url;
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#2ab6e4]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container px-4 py-4 mx-auto sm:py-6 md:py-8">
        {/* Header - More compact on mobile */}
        <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between sm:mb-8">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">User Dashboard</h1>
          <Link
            to="/"
            className="inline-flex items-center justify-center w-full px-4 py-2 text-sm text-gray-300 transition-colors border rounded-lg sm:w-auto border-[#2ab6e4] hover:text-white sm:text-base"
          >
            Back to Home
          </Link>
        </div>

        {/* Navigation Tabs - Full width on mobile */}
        <div className="grid grid-cols-2 gap-2 mb-6 sm:flex sm:gap-4 sm:mb-8">
          <button
            onClick={() => setActiveTab('savedProducts')}
            className={`px-4 py-2 text-sm sm:px-6 sm:text-base rounded-lg transition-colors ${activeTab === 'savedProducts'
              ? 'bg-gradient-to-r from-[#a017c9] to-[#2ab6e4] text-white'
              : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
          >
            Saved Products   
          </button>
          <button
            onClick={() => setActiveTab('apiKey')}
            className={`px-4 py-2 text-sm sm:px-6 sm:text-base rounded-lg transition-colors ${activeTab === 'apiKey'
              ? 'bg-gradient-to-r from-[#a017c9] to-[#2ab6e4] text-white'
              : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
          >
           API Key
          </button>
        </div>

        {/* API Key Section */}
        {activeTab === 'apiKey' && (
          <div className="p-4 bg-gray-800 rounded-xl sm:p-6">
            <h2 className="mb-4 text-lg font-semibold text-white sm:text-xl sm:mb-6">Your API Key</h2>

            {/* API Key Display and Actions */}
            <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-center sm:gap-4 sm:mb-6">
              <div className="flex-1 p-3 overflow-x-auto font-mono bg-gray-900 rounded-lg sm:p-4 whitespace-nowrap">
                <code className="text-sm text-[#2ab6e4] sm:text-base">{apiKey}</code>
              </div>
              <div className="flex gap-2 sm:gap-4">
                <button
                  onClick={() => copyToClipboard(apiKey)}
                  className="flex-1 p-3 transition-colors bg-gray-700 rounded-lg sm:flex-none hover:bg-gray-600"
                  title="Copy API Key"
                >
                  <Copy className="w-5 h-5 mx-auto text-white" />
                </button>
                <button
                  onClick={regenerateApiKey}
                  className="flex-1 p-3 transition-colors bg-gray-700 rounded-lg sm:flex-none hover:bg-gray-600"
                  title="Regenerate API Key"
                >
                  <RefreshCw className="w-5 h-5 mx-auto text-white" />
                </button>
              </div>
            </div>
            {copySuccess && (
              <p className="text-sm text-green-500">Copied to clipboard!</p>
            )}

            {/* API Documentation */}
            <div className="mt-6 space-y-4 sm:mt-8">
              <h3 className="text-base font-medium text-white sm:text-lg">API Usage</h3>
              <div className="p-3 space-y-3 font-mono text-xs bg-gray-900 rounded-lg sm:p-4 sm:text-sm">
                <p className="text-gray-400">Base URL:</p>
                <code className="block overflow-x-auto text-[#2ab6e4] whitespace-nowrap">{process.env.REACT_APP_API_BASEURL}</code>

                <p className="mt-4 text-gray-400">Endpoints:</p>
                <code className="block overflow-x-auto text-[#2ab6e4] whitespace-nowrap">GET /saved-products - Get all saved products</code>
                <p className="text-xs text-gray-500 sm:text-sm">Headers required:</p>
                <code className="block ml-4 overflow-x-auto text-green-500 whitespace-nowrap">x-api-key: YOUR_API_KEY</code>
              </div>
            </div>
          </div>
        )}

        {/* Saved Products Section */}
        {activeTab === 'savedProducts' && (
          <div className="p-4 bg-gray-800 rounded-xl sm:p-6">
            <h2 className="mb-4 text-lg font-semibold text-white sm:text-xl sm:mb-6">Saved Products</h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6">
              {savedProducts.map((product) => (
                <div
                  key={product.productId}
                  className="overflow-hidden transition-all bg-gray-900 rounded-xl hover:ring-2 hover:ring-[#2ab6e4]"
                >
                  <div className="relative">
                    <img
                      src={getImageUrl(product.imageUrl)}
                      alt={product.title}
                      className="object-cover w-full aspect-square"
                    />
                    <button
                      onClick={() => removeSavedProduct(product.productId)}
                      className="absolute p-2 transition-colors bg-red-500 rounded-full top-2 right-2 hover:bg-red-600"
                    >
                      <Trash2 className="w-4 h-4 text-white sm:w-5 sm:h-5" />
                    </button>
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="mb-2 text-sm font-semibold text-white sm:text-base line-clamp-2">
                      {product.title}
                    </h3>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold sm:text-base text-[#2ab6e4]">
                      ${((product.price * 1.3).toFixed(2))}
                      </p>
                      <a
                        href={product.detailUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 transition-colors bg-gray-800 rounded-lg hover:bg-gray-700"
                      >
                        <ExternalLink className="w-4 h-4 text-white sm:w-5 sm:h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {savedProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-gray-400 sm:py-12">
                <p className="text-sm sm:text-base">No saved products yet</p>
                <Link
                  to="/"
                  className="mt-3 text-sm sm:text-base sm:mt-4 text-[#2ab6e4] hover:underline"
                >
                  Browse products
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;