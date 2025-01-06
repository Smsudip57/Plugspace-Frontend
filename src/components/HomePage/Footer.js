import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/img/logo.png";

// Footer.js
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="mt-16 bg-gray-800">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <img src={logo} alt="Logo" className="h-8 mr-3" />
              <span className="text-2xl font-bold bg-gradient-to-r from-[#a017c9] to-[#2ab6e4] text-transparent bg-clip-text">
                PLUGSPACE
              </span>
            </div>
            <p className="text-gray-400">
              Your ultimate destination for digital assets and creative resources.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/dashboard" className="text-gray-400 transition hover:text-white">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-400 transition hover:text-white">
                  Profile Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Legal</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/privacy-policy" className="text-gray-400 transition hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-conditions" className="text-gray-400 transition hover:text-white">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="text-gray-400 transition hover:text-white">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-lg font-semibold text-white">Contact</h3>
            <ul className="space-y-4">
              <li className="text-gray-400">
                Email: support@plugspace.io
              </li>
              <li className="text-gray-400">
                Phone Number: +1-339-399-3778
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright - Added more padding and border */}
        <div className="pt-8 mt-12 text-center border-t border-gray-700">
          <p className="text-sm text-gray-400 sm:text-base">
            © {currentYear} Plugspace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;