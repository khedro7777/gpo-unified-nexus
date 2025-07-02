
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Pages
import Index from '@/pages/Index';
import EnhancedHomePage from '@/pages/EnhancedHomePage';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import HowItWorks from '@/pages/HowItWorks';
import CreateGroup from '@/pages/groups/CreateGroup';
import GroupDetails from '@/pages/groups/GroupDetails';
import Groups from '@/pages/Groups';
import Suppliers from '@/pages/suppliers/Suppliers';
import Services from '@/pages/Services';
import Arbitration from '@/pages/arbitration/Arbitration';
import CompanyIncorporation from '@/pages/gateways/CompanyIncorporation';
import CompanyFormation from '@/pages/formation/CompanyFormation';
import DocumentManagement from '@/pages/documents/DocumentManagement';
import Freelance from '@/pages/freelance/Freelance';
import Governance from '@/pages/governance/Governance';
import Contracts from '@/pages/contracts/Contracts';
import Notifications from '@/pages/notifications/Notifications';
import Offers from '@/pages/offers/Offers';
import Wallet from '@/pages/Wallet';
import Investment from '@/pages/investment/Investment';

// Auth Routes
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import RoleSelection from '@/pages/auth/RoleSelection';

// Service Routes
import { ServiceRoutes } from './ServiceRoutes';

/**
 * Main Application Routes Configuration
 * Organized by access level: Public, Protected, and Service routes
 * Each route includes proper authentication and navigation handling
 */
const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes - Accessible without authentication */}
      <Route path="/" element={<EnhancedHomePage />} />
      <Route path="/old-home" element={<Index />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      
      {/* Auth Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/role-selection" element={<RoleSelection />} />
      
      {/* Protected Routes - Require authentication */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      
      <Route path="/profile" element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      } />

      {/* Group Management Routes */}
      <Route path="/groups" element={<Groups />} />
      <Route path="/groups/:id" element={<GroupDetails />} />
      <Route path="/create-group" element={
        <ProtectedRoute>
          <CreateGroup />
        </ProtectedRoute>
      } />
      <Route path="/create-group/:type" element={
        <ProtectedRoute>
          <CreateGroup />
        </ProtectedRoute>
      } />

      {/* Business Function Routes */}
      <Route path="/suppliers" element={<Suppliers />} />
      <Route path="/freelance" element={<Freelance />} />
      <Route path="/governance" element={<Governance />} />
      <Route path="/investment" element={<Investment />} />
      
      {/* Company Formation Routes */}
      <Route path="/company-incorporation" element={<CompanyIncorporation />} />
      <Route path="/company-formation" element={<CompanyFormation />} />
      
      {/* Service and Management Routes */}
      <Route path="/services" element={<Services />} />
      <Route path="/contracts" element={
        <ProtectedRoute>
          <Contracts />
        </ProtectedRoute>
      } />
      <Route path="/offers" element={
        <ProtectedRoute>
          <Offers />
        </ProtectedRoute>
      } />
      <Route path="/wallet" element={
        <ProtectedRoute>
          <Wallet />
        </ProtectedRoute>
      } />
      
      {/* Communication and Support Routes */}
      <Route path="/notifications" element={
        <ProtectedRoute>
          <Notifications />
        </ProtectedRoute>
      } />
      <Route path="/arbitration" element={<Arbitration />} />
      <Route path="/documents" element={
        <ProtectedRoute>
          <DocumentManagement />
        </ProtectedRoute>
      } />

      {/* Service-specific routes */}
      <Route path="/services/*" element={<ServiceRoutes />} />
      
      {/* Catch-all route for 404 */}
      <Route path="*" element={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-gray-600 mb-6">الصفحة غير موجودة</p>
            <a href="/" className="text-primary hover:underline">العودة للصفحة الرئيسية</a>
          </div>
        </div>
      } />
    </Routes>
  );
};

export default AppRoutes;
