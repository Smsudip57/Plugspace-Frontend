// src/App.js
import './App.css';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/HomePage/ScrollToTop';

import UserDashboard from './pages/UserBased/UserDashboard';
import ProfileSettings from './pages/UserBased/ProfileSettings';
import ResetPassword from './pages/UserBased/ResetPassword';
import SubscriptionSuccess from './pages/UserBased/SubscriptionSuccess';
import SubscriptionCancel from './pages/UserBased/SubscriptionCancel';

import TermsConditions from './pages/Information/TermsConditions';
import PrivacyPolicy from './pages/Information/PrivacyPolicy';
import AboutUs from './pages/Information/AboutUs';

import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/product/:productId"
            element={<ProductPage />}
          />
          <Route
            path="/admin/dashboard"
            element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute><ProfileSettings /></ProtectedRoute>}
          />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute><UserDashboard /></ProtectedRoute>}
          />
          <Route
            path="/dashboard/subscription/success"
            element={<SubscriptionSuccess />}
          />
          <Route
            path="/dashboard/subscription/cancel"
            element={<SubscriptionCancel />}
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-conditions" element={<TermsConditions />} />
          <Route path="/about-us" element={<AboutUs />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;