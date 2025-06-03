
import React from 'react';
import { Route } from 'react-router-dom';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Profile from '@/pages/profile/Profile';
import Offers from '@/pages/offers/Offers';
import Freelance from '@/pages/freelance/Freelance';
import Invoices from '@/pages/invoices/Invoices';
import Notifications from '@/pages/notifications/Notifications';
import Disputes from '@/pages/disputes/Disputes';
import Support from '@/pages/support/Support';
import MCP from '@/pages/mcp/MCP';
import Settings from '@/pages/settings/Settings';
import Wallet from '@/pages/Wallet';

export const DashboardRoutes = () => (
  <>
    <Route path="/profile" element={
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    } />
    <Route path="/wallet" element={
      <ProtectedRoute>
        <Wallet />
      </ProtectedRoute>
    } />
    <Route path="/offers" element={
      <ProtectedRoute>
        <Offers />
      </ProtectedRoute>
    } />
    <Route path="/freelance" element={
      <ProtectedRoute>
        <Freelance />
      </ProtectedRoute>
    } />
    <Route path="/invoices" element={
      <ProtectedRoute>
        <Invoices />
      </ProtectedRoute>
    } />
    <Route path="/notifications" element={
      <ProtectedRoute>
        <Notifications />
      </ProtectedRoute>
    } />
    <Route path="/disputes" element={
      <ProtectedRoute>
        <Disputes />
      </ProtectedRoute>
    } />
    <Route path="/support" element={
      <ProtectedRoute>
        <Support />
      </ProtectedRoute>
    } />
    <Route path="/mcp" element={
      <ProtectedRoute>
        <MCP />
      </ProtectedRoute>
    } />
    <Route path="/settings" element={
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    } />
  </>
);
