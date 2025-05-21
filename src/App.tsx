
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/use-auth";

// Pages
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RoleSelection from "./pages/auth/RoleSelection";
import Profile from "./pages/profile/Profile";
import MyGroups from "./pages/groups/MyGroups";
import GroupDetails from "./pages/groups/GroupDetails";
import CreateGroup from "./pages/groups/CreateGroup";
import Wallet from "./pages/wallet/Wallet";
import Invoices from "./pages/invoices/Invoices";
import Notifications from "./pages/notifications/Notifications";
import Disputes from "./pages/disputes/Disputes";
import DisputeDetails from "./pages/disputes/DisputeDetails";
import CreateDispute from "./pages/disputes/CreateDispute";
import Support from "./pages/support/Support";
import Settings from "./pages/settings/Settings";
import MyJobs from "./pages/jobs/MyJobs";
import ReceivedOffers from "./pages/offers/ReceivedOffers";
import SentOffers from "./pages/offers/SentOffers";
import FormationRequests from "./pages/formation/FormationRequests";
import AdminMonitor from "./pages/admin/AdminMonitor";
import AdminAccess from "./pages/admin/AdminAccess";
import StrapiContent from "./pages/admin/StrapiContent"; // New Strapi content page
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

// Admin route component
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, role } = useAuth();
  return isAuthenticated && role === 'admin' ? <>{children}</> : <Navigate to="/" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/role-selection" element={<RoleSelection />} />
          
          {/* Protected routes */}
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/my-groups" element={<ProtectedRoute><MyGroups /></ProtectedRoute>} />
          <Route path="/groups/:groupId" element={<ProtectedRoute><GroupDetails /></ProtectedRoute>} />
          <Route path="/create-group/:type" element={<ProtectedRoute><CreateGroup /></ProtectedRoute>} />
          <Route path="/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
          <Route path="/invoices" element={<ProtectedRoute><Invoices /></ProtectedRoute>} />
          <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
          <Route path="/disputes" element={<ProtectedRoute><Disputes /></ProtectedRoute>} />
          <Route path="/disputes/:disputeId" element={<ProtectedRoute><DisputeDetails /></ProtectedRoute>} />
          <Route path="/disputes/create" element={<ProtectedRoute><CreateDispute /></ProtectedRoute>} />
          <Route path="/support" element={<ProtectedRoute><Support /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          
          {/* Role-specific routes */}
          <Route path="/my-jobs" element={<ProtectedRoute><MyJobs /></ProtectedRoute>} />
          <Route path="/received-offers" element={<ProtectedRoute><ReceivedOffers /></ProtectedRoute>} />
          <Route path="/sent-offers" element={<ProtectedRoute><SentOffers /></ProtectedRoute>} />
          <Route path="/formation-requests" element={<ProtectedRoute><FormationRequests /></ProtectedRoute>} />
          
          {/* Admin routes */}
          <Route path="/admin-monitor-access" element={<AdminRoute><AdminMonitor /></AdminRoute>} />
          <Route path="/admin-access" element={<AdminAccess />} />
          <Route path="/admin/strapi-content" element={<AdminRoute><StrapiContent /></AdminRoute>} /> {/* New Strapi content route */}
          
          {/* 404 route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
