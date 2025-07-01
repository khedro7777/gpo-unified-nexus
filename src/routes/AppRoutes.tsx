
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Pages
import Index from '@/pages/Index';
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
import DocumentManagement from '@/pages/documents/DocumentManagement';
import Freelance from '@/pages/freelance/Freelance';
import Governance from '@/pages/governance/Governance';
import Contracts from '@/pages/contracts/Contracts';
import Notifications from '@/pages/notifications/Notifications';
import Offers from '@/pages/offers/Offers';
import Wallet from '@/pages/Wallet';
import Investment from '@/pages/investment/Investment';

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
      <Route path="/" element={<Index />} />
      <Route path="/how-it-works" element={<HowItWorks />} />
      
      {/* Protected Routes - Require user authentication */}
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

      <Route path="/groups" element={
        <ProtectedRoute>
          <Groups />
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
      
      <Route path="/create-group/:type?" element={
        <ProtectedRoute>
          <CreateGroup />
        </ProtectedRoute>
      } />
      
      <Route path="/groups/:id" element={
        <ProtectedRoute>
          <GroupDetails />
        </ProtectedRoute>
      } />
      
      <Route path="/suppliers" element={
        <ProtectedRoute>
          <Suppliers />
        </ProtectedRoute>
      } />
      
      <Route path="/services" element={
        <ProtectedRoute>
          <Services />
        </ProtectedRoute>
      } />

      <Route path="/arbitration" element={
        <ProtectedRoute>
          <Arbitration />
        </ProtectedRoute>
      } />

      <Route path="/company-incorporation" element={
        <ProtectedRoute>
          <CompanyIncorporation />
        </ProtectedRoute>
      } />

      <Route path="/documents" element={
        <ProtectedRoute>
          <DocumentManagement />
        </ProtectedRoute>
      } />

      <Route path="/freelance" element={
        <ProtectedRoute>
          <Freelance />
        </ProtectedRoute>
      } />

      <Route path="/governance" element={
        <ProtectedRoute>
          <Governance />
        </ProtectedRoute>
      } />

      <Route path="/contracts" element={
        <ProtectedRoute>
          <Contracts />
        </ProtectedRoute>
      } />

      <Route path="/notifications" element={
        <ProtectedRoute>
          <Notifications />
        </ProtectedRoute>
      } />

      {/* New Investment Route */}
      <Route path="/investment" element={
        <ProtectedRoute>
          <Investment />
        </ProtectedRoute>
      } />

      {/* Service Routes - Extended functionality */}
      {ServiceRoutes()}
    </Routes>
  );
};

export default AppRoutes;
