import React, { useEffect, useContext, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { CheckCircle, Loader, AlertCircle } from 'lucide-react';
import { AuthContext } from '../../contexts/AuthContext';
import axios from 'axios';

export const SubscriptionSuccess = () => {
  const { getSubscriptionStatus, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyAndUpdateSubscription = async () => {
      const sessionId = searchParams.get('session_id');
      if (!sessionId) {
        setStatus('error');
        setError('No session ID found');
        return;
      }

      try {
        // Make sure to use the correct API URL
        const verifyResponse = await axios.get(`${process.env.REACT_APP_API_BASEURL}/api/verify-success`, {
          params: { session_id: sessionId }
        });
        
        console.log('Verification response:', verifyResponse.data);

        if (!verifyResponse.data.success) {
          throw new Error('Session verification failed');
        }

        // Update subscription status in context
        await getSubscriptionStatus();
        
        setStatus('success');
      } catch (error) {
        console.error('Subscription verification error:', error);
        setStatus('error');
        setError(error.response?.data?.error || error.message || 'Failed to verify subscription');
      }
    };

    verifyAndUpdateSubscription();
  }, [getSubscriptionStatus, searchParams]);

  const renderContent = () => {
    switch (status) {
      case 'loading':
        return (
          <>
            <Loader className="w-20 h-20 mx-auto mb-6 text-blue-500 animate-spin" />
            <h1 className="mb-4 text-2xl font-bold text-white">Verifying Your Subscription</h1>
            <p className="mb-6 text-gray-300">Please wait while we confirm your payment...</p>
          </>
        );

      case 'error':
        return (
          <>
            <AlertCircle className="w-20 h-20 mx-auto mb-6 text-red-500" />
            <h1 className="mb-4 text-2xl font-bold text-white">Something Went Wrong</h1>
            <p className="mb-6 text-red-400">{error}</p>
            <button
              onClick={() => navigate('/dashboard/subscription')}
              className="w-full py-3 text-white rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:opacity-90"
            >
              Return to Subscription Page
            </button>
          </>
        );

      case 'success':
      default:
        return (
          <>
            <CheckCircle className="w-20 h-20 mx-auto mb-6 text-green-500" />
            <h1 className="mb-4 text-2xl font-bold text-white">Subscription Successful!</h1>
            <p className="mb-6 text-gray-300">
              Thank you for subscribing. Your account has been upgraded to {user?.subscription}.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full py-3 text-white rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:opacity-90"
              >
                Go to Dashboard
              </button>
            </div>
          </>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-900">
      <div className="w-full max-w-md p-8 text-center bg-gray-800 rounded-2xl">
        {renderContent()}
      </div>
    </div>
  );
};

export default SubscriptionSuccess;