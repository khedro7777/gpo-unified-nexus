
import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import CompanyFormation from '@/pages/formation/CompanyFormation';
import CompanyManagement from '@/pages/companies/CompanyManagement';
import CompanyIncorporation from '@/pages/gateways/CompanyIncorporation';

export const CompanyRoutes = () => (
  <>
    <Route path="/company-formation" element={
      <ProtectedRoute>
        <CompanyFormation />
      </ProtectedRoute>
    } />
    <Route path="/company-management" element={
      <ProtectedRoute>
        <CompanyManagement />
      </ProtectedRoute>
    } />
    <Route path="/company-incorporation" element={
      <ProtectedRoute>
        <CompanyIncorporation />
      </ProtectedRoute>
    } />
  </>
);
