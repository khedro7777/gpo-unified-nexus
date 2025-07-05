
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

// Auth pages
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import RoleSelection from '@/pages/auth/RoleSelection';

// Main pages - using Index as the main homepage
import Index from '@/pages/Index';
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
      {/* Public routes - Main homepage */}
      <Route path="/" element={<Index />} />
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

      <Route
        path="/mcp"
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

      {/* Static content pages */}
      <Route path="/about" element={<div className="container mx-auto px-4 py-16"><h1 className="text-3xl font-bold mb-8">من نحن</h1><p className="text-lg text-muted-foreground">منصة GPO WORLD هي منصة التعاون الذكي الشاملة للشراء التعاوني والتسويق المشترك وإدارة المستقلين وتأسيس الشركات والتحكيم الرقمي.</p></div>} />
      <Route path="/how-it-works" element={<div className="container mx-auto px-4 py-16"><h1 className="text-3xl font-bold mb-8">كيف تعمل المنصة</h1><p className="text-lg text-muted-foreground">ستجد هنا دليلاً شاملاً حول كيفية استخدام المنصة والاستفادة من جميع خدماتها.</p></div>} />
      <Route path="/support" element={<div className="container mx-auto px-4 py-16"><h1 className="text-3xl font-bold mb-8">الدعم والمساعدة</h1><p className="text-lg text-muted-foreground">فريق الدعم متاح لمساعدتك في أي استفسار. تواصل معنا عبر البريد الإلكتروني أو الدردشة المباشرة.</p></div>} />
      <Route path="/suppliers" element={<div className="container mx-auto px-4 py-16"><h1 className="text-3xl font-bold mb-8">الموردون</h1><p className="text-lg text-muted-foreground">اكتشف شبكة الموردين الموثوقة وقدم عروضك للمجموعات النشطة.</p></div>} />
      <Route path="/investment" element={<div className="container mx-auto px-4 py-16"><h1 className="text-3xl font-bold mb-8">بوابة الاستثمار</h1><p className="text-lg text-muted-foreground">منصة الاستثمار الجماعي وإدارة الشركات الاستثمارية.</p></div>} />
      <Route path="/arbitration" element={<div className="container mx-auto px-4 py-16"><h1 className="text-3xl font-bold mb-8">التحكيم والتوثيق</h1><p className="text-lg text-muted-foreground">نظام ORDA لحل النزاعات والتحكيم الرقمي المتقدم.</p></div>} />

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
