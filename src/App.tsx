
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Services from "./pages/Services";
import ServiceDetails from "./pages/services/ServiceDetails";
import GovernanceProposals from "./pages/governance/GovernanceProposals";
import GovernanceVoting from "./pages/governance/GovernanceVoting";
import GovernanceDeliberation from "./pages/governance/GovernanceDeliberation";
import Governance from "./pages/Governance";
import Wallet from "./pages/Wallet";
import WalletPayments from "./pages/wallet/WalletPayments";
import WalletSubscriptions from "./pages/wallet/WalletSubscriptions";
import Legal from "./pages/Legal";
import LegalContracts from "./pages/legal/LegalContracts";
import DAO from "./pages/DAO";
import DAOMembers from "./pages/dao/DAOMembers";
import DAOProjects from "./pages/dao/DAOProjects";
import Tools from "./pages/Tools";
import ToolsAIAgent from "./pages/tools/ToolsAIAgent";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Mission from "./pages/Mission";
import HowItWorks from "./pages/HowItWorks";
import GroupDetails from "./pages/groups/GroupDetails";
import Groups from "./pages/Groups";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/details/:serviceId" element={<ServiceDetails />} />
          <Route path="/services/integrations" element={<Services />} />
          <Route path="/governance" element={<Governance />} />
          <Route path="/governance/proposals" element={<GovernanceProposals />} />
          <Route path="/governance/voting" element={<GovernanceVoting />} />
          <Route path="/governance/deliberation" element={<GovernanceDeliberation />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/wallet/payments" element={<WalletPayments />} />
          <Route path="/wallet/subscriptions" element={<WalletSubscriptions />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/legal/contracts" element={<LegalContracts />} />
          <Route path="/dao" element={<DAO />} />
          <Route path="/dao/members" element={<DAOMembers />} />
          <Route path="/dao/projects" element={<DAOProjects />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/ai-agent" element={<ToolsAIAgent />} />
          <Route path="/about" element={<About />} />
          <Route path="/mission" element={<Mission />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/groups/:groupId" element={<GroupDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
