import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { auth } from '../firebase/config';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export const AuthContext = createContext({}); // Add export here

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      // const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      // if (token) {
        try {
          const response = await axios.get('/api/verify-token',{
            withCredentials: true
          });
          setUser(response.data.user);
          // console.log(response.data.user);
        } catch (error) {
          localStorage.removeItem('token');
          sessionStorage.removeItem('token');
        }
      // }
      setLoading(false);
    };

    initAuth();
  }, []);

  // Add axios interceptor for auth headers
  useEffect(() => {
    axios.interceptors.request.use((config) => {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }, []);

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { user: firebaseUser } = result;
      
      // Register/login with your backend
      const response = await axios.post('/api/register', {
        email: firebaseUser.email,
        firebaseUid: firebaseUser.uid,
        fullName: firebaseUser.displayName,
        authProvider: 'google'
      },{
        withCredentials: true
      });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      
      setUser(response.data.user);
      return response.data.user;
    } catch (error) {
      console.error('Google login error:', error);
      throw new Error(error.message || 'Failed to login with Google');
    }
  };

  const login = async (email, password, rememberMe) => {
    try {
      const response = await axios.post('/api/login', { email, password, rememberMe },{
        withCredentials: true
      });
      if (response.data.user) {
        const { token, user } = response.data;
        
        // Store token based on rememberMe preference
        if (rememberMe) {
          localStorage.setItem('token', token);
        } else {
          sessionStorage.setItem('token', token);
        }
        
        setUser({...user, email});
        return user;
      }
      throw new Error(response.data.message || 'Login failed');
    } catch (error) {
      // console.log(error.response?.data);
      throw new Error(error.response?.data?.message || 'Invalid credentials');
    }
  };

  const logout = () => {
    const logoutUser = async () => {
      try {
        const response = await axios.get('/api/logout',{
          withCredentials: true
        });
        if(response.status === 200) 
        {setUser(null);}
      } catch (error) {
        throw new Error(error.response?.data?.message || 'Something went wrong' );
      }
    }
    logoutUser();
  };

  const signup = async (userData) => {
    try {
      const response = await axios.post('/api/register', {
        ...userData,
        authProvider: 'email'
      },{
        withCredentials: true
      });
      setUser({...response.data, email: userData.email}); // Include email
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Signup failed' };
    }
  };

  const updateUser = (userData) => {
    setUser(prev => ({
      ...prev,
      ...userData
    }));
  };

  const updateSubscription = async (planName) => {
    try {
      const response = await axios.put('/api/update-subscription', {
        email: user.email,
        subscription: planName
      });
      
      setUser(prev => ({
        ...prev, 
        subscription: response.data.user.subscription,
        subscriptionDetails: response.data.user.subscriptionDetails
      }));
      
      return response.data.user;
    } catch (error) {
      console.error('Subscription error:', error);
      throw error.response?.data || { message: 'Failed to update subscription' };
    }
  };

  const getSubscriptionStatus = async () => {
    if (!user?.email) {
      console.log("Current user:", user); // Debug log
      return;
    }
  
    try {
      const response = await axios.get(`/api/subscription/${user.email}`);
      setUser(prev => ({
        ...prev,
        subscription: response.data.subscription,
        subscriptionDetails: response.data.details
      }));
      return response.data;
    } catch (error) {
      console.error('Subscription error:', error);
      throw error;
    }
  };

  
  const cancelSubscription = async () => {
    try {
      await axios.post('/api/subscription/cancel', { email: user.email });
      setUser(prev => ({
        ...prev,
        subscriptionDetails: {
          ...prev.subscriptionDetails,
          status: 'cancelled'
        }
      }));
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      throw error;
    }
  };

  const fetchAdminData = async () => {
    try {
      const [usersResponse, statsResponse] = await Promise.all([
        axios.get('/api/admin/users', { params: { email: user.email } }),
        axios.get('/api/admin/stats', { params: { email: user.email } })
      ]);
      return {
        users: usersResponse.data,
        stats: statsResponse.data
      };
    } catch (error) {
      console.error('Error fetching admin data:', error);
      throw error;
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`/api/admin/users/${userId}`, {
        params: { email: user.email } // For admin verification
      });
      
      if (response.data.success) {
        // Optionally handle success case
        return response.data;
      } else {
        throw new Error(response.data.message || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  };


  const isAdmin = user?.email === process.env.REACT_APP_ADMIN_EMAIL;

  return (
    <AuthContext.Provider value={{
      user,
      signup,
      login,
      loginWithGoogle,
      logout,
      updateSubscription,
      getSubscriptionStatus,
      cancelSubscription,
      updateUser,
      fetchAdminData,
      deleteUser,
      isAdmin,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};