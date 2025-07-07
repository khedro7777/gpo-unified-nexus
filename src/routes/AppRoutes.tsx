
import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { Button } from '@/components/ui/button';

// Pages
import Index from '@/pages/Index';
import Dashboard from '@/pages/Dashboard';
import Profile from '@/pages/Profile';
import About from '@/pages/About';
import Support from '@/pages/Support';
import HowItWorks from '@/pages/HowItWorks';
import CreateGroup from '@/pages/groups/CreateGroup';
import GroupDetails from '@/pages/groups/GroupDetails';
import MyGroups from '@/pages/groups/MyGroups';
import Groups from '@/pages/Groups';
import Suppliers from '@/pages/suppliers/Suppliers';
import Services from '@/pages/Services';
import Arbitration from '@/pages/arbitration/Arbitration';
import CompanyIncorporation from '@/pages/gateways/CompanyIncorporation';
import CompanyFormation from '@/pages/formation/CompanyFormation';
import DocumentManagement from '@/pages/documents/DocumentManagement';
import Freelance from '@/pages/freelance/Freelance';
import Governance from '@/pages/governance/Governance';
import Contracts from '@/pages/contracts/Contracts';
import Notifications from '@/pages/notifications/Notifications';
import Offers from '@/pages/offers/Offers';
import Wallet from '@/pages/Wallet';
import Investment from '@/pages/investment/Investment';

// Auth Routes
import Login from '@/pages/auth/Login';
import Register from '@/pages/auth/Register';
import RoleSelection from '@/pages/auth/RoleSelection';

// Service Routes
import { ServiceRoutes } from './ServiceRoutes';

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const AppRoutes = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Public Routes - Accessible without authentication */}
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/support" element={<Support />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        
        {/* Protected Routes - Require authentication */}
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

        {/* MCP Smart Box */}
        <Route path="/mcp" element={
          <ProtectedRoute>
            {React.createElement(React.lazy(() => import('@/pages/mcp/MCPPage')))}
          </ProtectedRoute>
        } />

        {/* Group Management Routes */}
        <Route path="/groups" element={
          <ProtectedRoute>
            <Groups />
          </ProtectedRoute>
        } />
        <Route path="/my-groups" element={
          <ProtectedRoute>
            <MyGroups />
          </ProtectedRoute>
        } />
        <Route path="/groups/:id" element={
          <ProtectedRoute>
            <GroupDetails />
          </ProtectedRoute>
        } />
        <Route path="/create-group" element={
          <ProtectedRoute>
            <CreateGroup />
          </ProtectedRoute>
        } />
        <Route path="/create-group/:type" element={
          <ProtectedRoute>
            <CreateGroup />
          </ProtectedRoute>
        } />

        {/* Business Function Routes */}
        <Route path="/suppliers" element={<Suppliers />} />
        <Route path="/suppliers/register" element={
          <ProtectedRoute>
            <div className="min-h-screen bg-background py-8">
              <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                  <h1 className="text-3xl font-bold text-center mb-8">تسجيل كمورد معتمد</h1>
                  <Suspense fallback={<LoadingSpinner />}>
                    {React.createElement(React.lazy(() => import('@/components/suppliers/SupplierRegistration')))}
                  </Suspense>
                </div>
              </div>
            </div>
          </ProtectedRoute>
        } />
        <Route path="/freelance" element={<Freelance />} />
        <Route path="/governance" element={
          <ProtectedRoute>
            <Governance />
          </ProtectedRoute>
        } />
        <Route path="/investment" element={
          <ProtectedRoute>
            <Investment />
          </ProtectedRoute>
        } />
        
        {/* Company Formation Routes */}
        <Route path="/company-incorporation" element={
          <ProtectedRoute>
            <CompanyIncorporation />
          </ProtectedRoute>
        } />
        <Route path="/company-formation" element={
          <ProtectedRoute>
            <CompanyFormation />
          </ProtectedRoute>
        } />
        
        {/* Service and Management Routes */}
        <Route path="/services" element={<Services />} />
        <Route path="/contracts" element={
          <ProtectedRoute>
            <Contracts />
          </ProtectedRoute>
        } />
        <Route path="/offers" element={
          <ProtectedRoute>
            <Offers />
          </ProtectedRoute>
        } />
        <Route path="/offers/sent" element={
          <ProtectedRoute>
            <div className="min-h-screen bg-background py-8">
              <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8">العروض المرسلة</h1>
                <p className="text-muted-foreground">عرض جميع العروض التي قمت بإرسالها</p>
              </div>
            </div>
          </ProtectedRoute>
        } />
        <Route path="/offers/received" element={
          <ProtectedRoute>
            <div className="min-h-screen bg-background py-8">
              <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8">العروض المستلمة</h1>
                <p className="text-muted-foreground">عرض جميع العروض التي تلقيتها</p>
              </div>
            </div>
          </ProtectedRoute>
        } />
        <Route path="/wallet" element={
          <ProtectedRoute>
            <Wallet />
          </ProtectedRoute>
        } />
        
        {/* Communication and Support Routes */}
        <Route path="/notifications" element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        } />
        <Route path="/arbitration" element={
          <ProtectedRoute>
            <Arbitration />
          </ProtectedRoute>
        } />
        <Route path="/disputes" element={
          <ProtectedRoute>
            <div className="min-h-screen bg-background py-8">
              <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8">إدارة النزاعات - ORDA</h1>
                <p className="text-muted-foreground">نظام حل النزاعات الرقمي المتقدم</p>
              </div>
            </div>
          </ProtectedRoute>
        } />
        <Route path="/documents" element={
          <ProtectedRoute>
            <DocumentManagement />
          </ProtectedRoute>
        } />

        {/* Additional Portal Routes */}
        <Route path="/products" element={
          <ProtectedRoute>
            <div className="min-h-screen bg-background py-8">
              <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8">قوائم المنتجات</h1>
                <p className="text-muted-foreground">عرض وتسويق المنتجات للمجموعات المختلفة</p>
              </div>
            </div>
          </ProtectedRoute>
        } />
        <Route path="/negotiation" element={
          <ProtectedRoute>
            <div className="min-h-screen bg-background py-8">
              <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8">حلول التفاوض الذكية</h1>
                <p className="text-muted-foreground">أدوات ذكية لتسهيل التفاوض والتوصل لاتفاقات</p>
              </div>
            </div>
          </ProtectedRoute>
        } />

        {/* Verification and Settings */}
        <Route path="/verification" element={
          <ProtectedRoute>
            <div className="min-h-screen bg-background py-8">
              <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8">التحقق من الهوية</h1>
                <p className="text-muted-foreground">أكمل عملية التحقق من هويتك لتفعيل جميع المزايا</p>
              </div>
            </div>
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <div className="min-h-screen bg-background py-8">
              <div className="container mx-auto px-4">
                <h1 className="text-3xl font-bold mb-8">إعدادات الحساب</h1>
                <p className="text-muted-foreground">إدارة إعدادات حسابك وتفضيلاتك</p>
              </div>
            </div>
          </ProtectedRoute>
        } />

        {/* Service-specific routes */}
        <Route path="/services/*" element={<ServiceRoutes />} />

        {/* Admin Monitor Access - Hidden route */}
        <Route path="/admin-monitor-access" element={
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="max-w-md mx-auto text-center p-8">
              <h1 className="text-2xl font-bold mb-4">GPO Admin Access Portal</h1>
              <p className="text-muted-foreground mb-6">
                This area is reserved for internal governance, observation, and content control.
              </p>
              <Button 
                onClick={() => window.open('https://cms.gpo.example.com/admin', '_blank')}
                className="w-full"
              >
                Enter Admin Dashboard
              </Button>
            </div>
          </div>
        } />
        
        {/* Catch-all route for 404 */}
        <Route path="*" element={
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-foreground mb-4">404</h1>
              <p className="text-muted-foreground mb-6">الصفحة غير موجودة</p>
              <Button
                onClick={() => window.location.href = '/'}
                className="text-primary hover:underline inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-md hover:bg-primary/20 transition-colors"
              >
                العودة للصفحة الرئيسية
              </Button>
            </div>
          </div>
        } />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
