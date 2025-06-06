
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@/components/auth/ProtectedRoute';

// Pages
import Index from '@/pages/Index';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import CreateGroup from '@/pages/groups/CreateGroup';
import GroupDetails from '@/pages/groups/GroupDetails';
import Suppliers from '@/pages/suppliers/Suppliers';
import Services from '@/pages/Services';
import Arbitration from '@/pages/arbitration/Arbitration';
import CompanyIncorporation from '@/pages/gateways/CompanyIncorporation';
import DocumentManagement from '@/pages/documents/DocumentManagement';
import Freelance from '@/pages/freelance/Freelance';
import Governance from '@/pages/governance/Governance';

// Service Routes
import { ServiceRoutes } from './ServiceRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      
      {/* Protected Routes */}
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

      {/* Service Routes */}
      {ServiceRoutes()}
    </Routes>
  );
};

export default AppRoutes;
