import React, { useState, useRef, useEffect} from 'react';
import { User, UserPen, LogOut, ChevronDown, Crown, UsersRound } from 'lucide-react';

const UserDropdown = ({ user, logout, navigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
    {/* Dropdown Button */}
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="flex items-center px-3 py-2 space-x-2 text-white bg-[#3a2e7f] rounded-lg hover:bg-[#4d37cc]"
    >
      <div className="flex items-center">
        <User className="w-5 h-5" />
        <ChevronDown 
          className={`w-4 h-4 ml-2 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </div>
    </button>

    {/* Dropdown Menu - Same for both mobile and desktop */}
    {isOpen && (
      <div className="absolute right-0 z-50 w-64 mt-2 bg-[#3a2e7f] shadow-lg rounded-xl">
        <div className="p-4">
          <div className="mb-4">
            <p className="text-sm text-gray-400">Signed in as</p>
            <p className="font-medium text-white">{user.fullName || user.email}</p>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => {
                navigate('/profile');
                setIsOpen(false);
              }}
              className="flex items-center w-full px-4 py-2 text-gray-300 rounded-lg hover:text-white hover:bg-[#4d37cc]"
            >
              <UserPen className="w-4 h-4 mr-2" />
              Profile Settings
            </button>

            {['premium', 'standard', 'basic'].includes(user?.subscription) && (
              <button
                onClick={() => {
                  navigate('/dashboard');
                  setIsOpen(false);
                }}
                className="flex items-center w-full px-4 py-2 text-gray-300 rounded-lg hover:text-white hover:bg-[#4d37cc]"
              >
                <UsersRound className="w-4 h-4 mr-2" />
                User Dashboard
              </button>
            )}

            {user.email === process.env.REACT_APP_ADMIN_EMAIL && (
              <button
                onClick={() => {
                  navigate('/admin/dashboard');
                  setIsOpen(false);
                }}
                className="flex items-center w-full px-4 py-2 text-gray-300 rounded-lg hover:text-white hover:bg-[#4d37cc]"
              >
                <Crown className="w-4 h-4 mr-2" />
                Admin Dashboard
              </button>
            )}

            <div className="my-2 border-t border-gray-700" />

            <button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              className="flex items-center w-full px-4 py-2 text-red-400 rounded-lg hover:text-red-300 hover:bg-[#4d37cc]"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Log out
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
);
};

export default UserDropdown;