
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Index from '@/pages/Index';
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import RoleSelection from '@/pages/auth/RoleSelection';
import Profile from '@/pages/profile/Profile';
import Groups from '@/pages/Groups';
import GroupDetails from '@/pages/groups/GroupDetails';
import CreateGroup from '@/pages/groups/CreateGroup';
import Wallet from '@/pages/Wallet';
import Governance from '@/pages/Governance';
import DAO from '@/pages/DAO';
import Legal from '@/pages/Legal';
import Tools from '@/pages/Tools';
import AdminAccess from '@/pages/admin/AdminAccess';
import AdminMonitor from '@/pages/admin/AdminMonitor';
import NotFound from '@/pages/NotFound';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { useAuth } from './hooks/use-auth';

// Import additional pages
import Offers from '@/pages/offers/Offers';
import Freelance from '@/pages/freelance/Freelance';
import Invoices from '@/pages/invoices/Invoices';
import Notifications from '@/pages/notifications/Notifications';
import Disputes from '@/pages/disputes/Disputes';
import Support from '@/pages/support/Support';
import MCP from '@/pages/mcp/MCP';
import Settings from '@/pages/settings/Settings';

function App() {
  const { isAuthenticated } = useAuth();
  
  return (
    <Router>
      <Toaster />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          
          {/* Protected routes - using NewMainLayout for all */}
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
          <Route path="/groups/:id" element={
            <ProtectedRoute>
              <GroupDetails />
            </ProtectedRoute>
          } />
          <Route path="/create-group/:type" element={
            <ProtectedRoute>
              <CreateGroup />
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
          
          {/* Admin routes */}
          <Route path="/admin-access" element={<AdminAccess />} />
          <Route path="/admin-monitor-access" element={
            <ProtectedRoute requiredRole={['admin']}>
              <AdminMonitor />
            </ProtectedRoute>
          } />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
  );
}

export default App;
