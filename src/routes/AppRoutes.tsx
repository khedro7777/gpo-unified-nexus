
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

// Auth pages
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import RoleSelection from '@/pages/auth/RoleSelection';

// Main pages
import EnhancedHomePage from '@/pages/EnhancedHomePage';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import Wallet from '@/pages/Wallet';

// Group pages
import GroupDetails from '@/pages/groups/GroupDetails';
import MyGroups from '@/pages/groups/MyGroups';
import GroupManagementPage from '@/pages/groups/GroupManagementPage';
import CreateGroup from '@/pages/groups/CreateGroup';
import CreateFormationGroup from '@/pages/groups/CreateFormationGroup';

// Service pages
import Freelance from '@/pages/freelance/Freelance';
import CompanyFormation from '@/pages/formation/CompanyFormation';

// Company pages
import CompanyManagement from '@/pages/companies/CompanyManagement';

// Tool pages
import ToolsAIAgent from '@/pages/tools/ToolsAIAgent';

// Protected route wrapper
import ProtectedRoute from '@/components/auth/ProtectedRoute';

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<EnhancedHomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/role-selection" element={<RoleSelection />} />

      {/* Protected routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/wallet"
        element={
          <ProtectedRoute>
            <Wallet />
          </ProtectedRoute>
        }
      />

      {/* Group routes */}
      <Route
        path="/groups"
        element={
          <ProtectedRoute>
            <MyGroups />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/groups/:id"
        element={
          <ProtectedRoute>
            <GroupDetails />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/groups/:id/management"
        element={
          <ProtectedRoute>
            <GroupManagementPage />
          </ProtectedRoute>
        }
      />

      {/* Service routes */}
      <Route
        path="/freelance"
        element={
          <ProtectedRoute>
            <Freelance />
          </ProtectedRoute>
        }
      />

      <Route
        path="/company-incorporation"
        element={
          <ProtectedRoute>
            <CompanyFormation />
          </ProtectedRoute>
        }
      />

      {/* Company routes */}
      <Route
        path="/company-management"
        element={
          <ProtectedRoute>
            <CompanyManagement />
          </ProtectedRoute>
        }
      />

      {/* Tools routes */}
      <Route
        path="/tools/ai-agent"
        element={
          <ProtectedRoute>
            <ToolsAIAgent />
          </ProtectedRoute>
        }
      />

      {/* New service routes */}
      <Route
        path="/create-group/:type"
        element={
          <ProtectedRoute>
            <CreateGroup />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create-group/formation"
        element={
          <ProtectedRoute>
            <CreateFormationGroup />
          </ProtectedRoute>
        }
      />

      {/* Additional routes */}
      <Route path="/about" element={<div>من نحن - قيد التطوير</div>} />
      <Route path="/how-it-works" element={<div>كيف تعمل المنصة - قيد التطوير</div>} />
      <Route path="/support" element={<div>الدعم والمساعدة - قيد التطوير</div>} />

      {/* Catch-all redirect */}
      <Route 
        path="*" 
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/" replace />
          )
        } 
      />
    </Routes>
  );
};

export default AppRoutes;
