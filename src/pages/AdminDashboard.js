import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Crown, User, ChevronLeft, Package, Archive, Settings, Trash2,MessageSquareText  } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import ProductManagement from '../components/AdminDashboard/ProductManagement';
import SavedProducts from '../components/AdminDashboard/SavedProducts';
import CategoryManagement from '../components/AdminDashboard/CategoryManagement';
import SupportChatting from '../components/AdminDashboard/SupportChatting';
import logo from "../assets/img/logo.png";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin, fetchAdminData, deleteUser } = useAuth();
  const [activeTab, setActiveTab] = useState('stats');
  const [stats, setStats] = useState({
    totalUsers: 0,
    premiumUsers: 0,
    recentLogins: []
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) {
      navigate('/');
      return;
    }

    const fetchDashboardData = async () => {
      try {
        const data = await fetchAdminData();
        setUsers(data.users);
        setStats(data.stats);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [isAdmin, navigate, fetchAdminData]);

  const handleDeleteUser = async (userId, userName) => {
    if (window.confirm(`Are you sure you want to delete ${userName}'s account? This action cannot be undone.`)) {
      try {
        await deleteUser(userId);
        
        // Refresh the data
        const data = await fetchAdminData();
        setUsers(data.users);
        setStats(data.stats);
        
        alert(`${userName} has been successfully deleted.`);
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user. Please try again.');
      }
    }
  };


  const StatisticsTab = () => (
    <div className="container px-4 mx-auto">
   {/* Stats Cards */}
   <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
        <div className="p-6 bg-gray-800 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-300">Total Users</h3>
            <Users className="w-6 h-6 text-[#2ab6e4]" />
          </div>
          <p className="text-3xl font-bold text-white">{stats.totalUsers}</p>
        </div>

        <div className="p-6 bg-gray-800 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-300">Premium Users</h3>
            <Crown className="w-6 h-6 text-[#a017c9]" />
          </div>
          <p className="text-3xl font-bold text-white">{stats.premiumUsers}</p>
        </div>

        <div className="p-6 bg-gray-800 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-300">Recent Logins</h3>
            <User className="w-6 h-6 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-white">{stats.recentLogins.length}</p>
        </div>
      </div>
      
      {/* Users Table */}
      <div className="overflow-hidden bg-gray-800 rounded-xl">
        <div className="p-6">
          <h3 className="mb-6 text-xl font-bold text-white">User List</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-700">
                <th className="px-6 py-3 text-sm font-medium text-gray-400">Name</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-400">Email</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-400">Subscription</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-400">Last Login</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-400">Visit Count</th>
                <th className="px-6 py-3 text-sm font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {users.map((userData) => (
                <tr key={userData._id} className="hover:bg-gray-750">
                  <td className="px-6 py-4 text-white">{userData.fullName}</td>
                  <td className="px-6 py-4 text-gray-300">{userData.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      userData.subscription === 'premium'
                        ? 'bg-[#a017c9]/20 text-[#a017c9]'
                        : userData.subscription === 'standard'
                          ? 'bg-[#2ab6e4]/20 text-[#2ab6e4]'
                          : userData.subscription === 'basic'
                            ? 'bg-green-500/20 text-green-500'
                            : 'bg-gray-700 text-gray-300'
                    }`}>
                      {userData.subscription || 'Free'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-300">
                    {new Date(userData.lastLogin).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-gray-300">{userData.visitCount}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleDeleteUser(userData._id, userData.fullName)}
                      className="inline-flex items-center px-3 py-1 space-x-1 text-sm font-medium text-red-500 transition-colors rounded-md bg-red-500/10 hover:bg-red-500/20"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#2ab6e4]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="container px-4 mx-auto">
          <div className="flex flex-col py-4 sm:flex-row sm:items-center sm:justify-between sm:h-16">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate('/')}
                className="flex items-center mr-4 text-sm text-gray-300 sm:text-base hover:text-white"
              >
                <ChevronLeft className="w-4 h-4 mr-1 sm:w-5 sm:h-5 sm:mr-2" />
                Back to Home
              </button>
              <div className="flex items-center">
                <img src={logo} alt="Logo" className="h-6 mr-2 sm:h-8 sm:mr-3" />
                <span className="text-xl font-bold sm:text-2xl bg-gradient-to-r from-[#a017c9] to-[#2ab6e4] text-transparent bg-clip-text">
                  Admin Dashboard
                </span>
              </div>
            </div>

            {user && (
              <div className="mt-4 sm:mt-0">
                <span className="text-sm text-gray-300 sm:text-base">Welcome, {user.fullName}</span>
              </div>
            )}
          </div>

          {/* Tab Navigation */}
          {/* <div className="flex mt-4 space-x-8"> */}
          <div className="flex space-x-4 overflow-x-auto sm:space-x-8 hide-scrollbar">
            <button
              onClick={() => setActiveTab('stats')}
              className={`py-2 px-3 sm:px-4 whitespace-nowrap relative ${activeTab === 'stats' ? 'text-[#2ab6e4]' : 'text-gray-400 hover:text-white'
                }`}
            >
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-sm sm:text-base">User Statistics</span>
              </div>
              {activeTab === 'stats' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2ab6e4]"></div>
              )}
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`py-2 px-3 sm:px-4 whitespace-nowrap relative ${activeTab === 'products'
                ? 'text-[#2ab6e4]'
                : 'text-gray-400 hover:text-white'
                }`}
            >
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Package className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Product Management</span>
              </div>
              {activeTab === 'products' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2ab6e4]"></div>
              )}
            </button>

            <button
              onClick={() => setActiveTab('saved')}
              className={`py-2 px-3 sm:px-4 whitespace-nowrap relative ${activeTab === 'saved'
                ? 'text-[#2ab6e4]'
                : 'text-gray-400 hover:text-white'
                }`}
            >
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Archive className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Saved Products</span>
              </div>
              {activeTab === 'saved' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2ab6e4]"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('categories')}
              className={`py-2 px-3 sm:px-4 whitespace-nowrap relative ${activeTab === 'categories'
                ? 'text-[#2ab6e4]'
                : 'text-gray-400 hover:text-white'
                }`}
            >
              <div className="flex items-center space-x-1 sm:space-x-2">
                <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Category Management</span>
              </div>
              {activeTab === 'categories' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2ab6e4]"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('supportchat')}
              className={`py-2 px-3 sm:px-4 whitespace-nowrap relative ${activeTab === 'supportchat'
                ? 'text-[#2ab6e4]'
                : 'text-gray-400 hover:text-white'
                }`}
            >
              <div className="flex items-center space-x-1 sm:space-x-2">
                <MessageSquareText  className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Support Chat</span>
              </div>
              {activeTab === 'supportchat' && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2ab6e4]"></div>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-6">
        {activeTab === 'stats' ? (
          <StatisticsTab />
        ) : activeTab === 'products' ? (
          <ProductManagement />
        ) : activeTab === 'categories' ? (
          <CategoryManagement />
        ) : activeTab === 'supportchat' ? (
          <SupportChatting />
        ):(
          <SavedProducts />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;

