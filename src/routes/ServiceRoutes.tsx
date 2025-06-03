
import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Arbitration from '@/pages/arbitration/Arbitration';
import DocumentManagement from '@/pages/documents/DocumentManagement';
import Governance from '@/pages/Governance';
import DAO from '@/pages/DAO';
import Legal from '@/pages/Legal';
import Tools from '@/pages/Tools';

export const ServiceRoutes = () => (
  <>
    <Route path="/arbitration" element={
      <ProtectedRoute>
        <Arbitration />
      </ProtectedRoute>
    } />
    <Route path="/documents" element={
      <ProtectedRoute>
        <DocumentManagement />
      </ProtectedRoute>
    } />
    <Route path="/governance" element={
      <ProtectedRoute>
        <Governance />
      </ProtectedRoute>
    } />
    <Route path="/dao" element={
      <ProtectedRoute>
        <DAO />
      </ProtectedRoute>
    } />
    <Route path="/legal" element={
      <ProtectedRoute>
        <Legal />
      </ProtectedRoute>
    } />
    <Route path="/tools" element={
      <ProtectedRoute>
        <Tools />
      </ProtectedRoute>
    } />
  </>
);
