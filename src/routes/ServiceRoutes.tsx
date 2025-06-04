
import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Arbitration from '@/pages/arbitration/Arbitration';
import CompanyIncorporation from '@/pages/gateways/CompanyIncorporation';
import DocumentManagement from '@/pages/documents/DocumentManagement';
import Freelance from '@/pages/freelance/Freelance';
import Governance from '@/pages/governance/Governance';

export const ServiceRoutes = () => (
  <>
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
  </>
);
