import React, { useState, useRef } from 'react';
import { X, Image, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

const LoginModal = ({ isOpen, onClose, onLogin, setProduct }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const searchByImageRef = useRef(null);



  const { user, updateUser } = useAuth();



  const imageSearchClick = () => {
    if (!user) {
      onClose();
      onLogin();
    } else if(user?.subscription === 'free' && (user?.subscriptionDetails?.searchByImageCount || 0) >= 2){
      setError('Please upgrade your plan!');
    }
    else{
      searchByImageRef && searchByImageRef.current && searchByImageRef.current.click();
    }
  };


  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file || !user) return;

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('image', file); 
      formData.append('email', user?.email);
      const response = await axios.post('/api/user/searchbyimage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', 
        },
      });
      if(response?.data?.subscriptionDetails){
        updateUser({subscriptionDetails:response.data.subscriptionDetails});
      }
      setProduct(response?.data?.products);
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
      console.error('Error:', err);
    } finally {
      setLoading(false);
      searchByImageRef.current.value = '';
    }
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
          className="relative flex w-full max-w-6xl overflow-hidden bg-gray-900 shadow-2xl rounded-2xl"
        >
          <div className="w-full p-8">
            <div className="flex items-start justify-between mb-8 w-full">
              <div className='w-full'>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center h-12 mb-4 w-full"
                >
                  {/* <img
                    src={logo}
                    alt="Logo"
                    className="h-8 mr-3"
                  /> */}
                  <span className="text-3xl font-bold bg-gradient-to-r from-[#a017c9] to-[#2ab6e4] text-transparent bg-clip-text">
                    PLUGSPACE
                  </span>
                </motion.div>
                <div className='w-full flex justify-between'>
                
                {user?.subscription === 'free' &&
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-2 text-red-500 rounded-lg"
                >
                 <AlertCircle className="inline-block  w-4 h-4 mr-1" /> Five free image searches are included; subscribe for unlimited use!
                </motion.p>}
                {user?.subscription === 'free' &&
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl font-bold text-gray-400"
                >
                  Search left : <span className="bg-gradient-to-r from-[#a017c9] to-[#2ab6e4] text-transparent bg-clip-text">{5 - (user?.subscriptionDetails?.searchByImageCount || 0)}</span>
                </motion.p>}
                </div>
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
            <div className='w-full flex justify-center'>
                  {
                    error && <p className='mt-2 text-red-500 rounded-lg'>
                      <AlertCircle className="inline-block  w-4 h-4 mr-1" /> {error}
                      </p>
                  }
                </div>

            <motion.form
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              onSubmit={(e) => e.preventDefault()}
              className="space-y-6"
            >
            </motion.form>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-sm text-center text-gray-400 flex flex-col items-center gap-5" 
            >
              <input
                type="file"
                alt="search by image input"
                className="hidden"
                ref={searchByImageRef}
                accept="image/*" 
                multiple={false} 
                onChange={(e) => handleImageChange(e)}
              />
              Choose Image from this device.
              {loading ? 
              <div className="flex items-center justify-center h-16"><div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#2ab6e4]"></div></div>
              :<button
                onClick={(e)=> imageSearchClick()}
                className="text-[#2ab6e4] hover:text-[#a017c9] transition-colors"
              >
                <Image size={50} className='mb-8'/>
              </button>}
            </motion.p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginModal;