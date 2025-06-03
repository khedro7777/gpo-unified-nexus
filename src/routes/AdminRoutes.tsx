
import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import AdminAccess from '@/pages/admin/AdminAccess';
import AdminMonitor from '@/pages/admin/AdminMonitor';
import SystemTestingPage from '@/pages/testing/SystemTesting';

export const AdminRoutes = () => (
  <>
    <Route path="/admin-access" element={<AdminAccess />} />
    <Route path="/admin-monitor-access" element={
      <ProtectedRoute requiredRole={['admin']}>
        <AdminMonitor />
      </ProtectedRoute>
    } />
    <Route path="/system-testing" element={
      <ProtectedRoute>
        <SystemTestingPage />
      </ProtectedRoute>
    } />
  </>
);
