
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Settings, 
  FileText, 
  Users, 
  Wallet, 
  Gavel, 
  Building2, 
  Wrench,
  ChevronRight,
  ChevronDown 
} from 'lucide-react';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label, to }) => {
  return (
    <NavLink 
      to={to}
      className={({ isActive }) => 
        `gpo-sidebar-item ${isActive ? 'active' : ''}`
      }
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
};

interface SidebarGroupProps {
  title: string;
  children: React.ReactNode;
}

const SidebarGroup: React.FC<SidebarGroupProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-2">
      <button 
        className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{title}</span>
        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
      </button>
      {isOpen && (
        <div className="mt-1 pl-2 space-y-1">
          {children}
        </div>
      )}
    </div>
  );
};

const Sidebar = () => {
  return (
    <aside className="w-64 border-r border-border h-[calc(100vh-4rem)] overflow-y-auto pt-4 pb-10 hidden md:block">
      <nav className="px-2 space-y-1">
        <SidebarItem icon={<Home size={18} />} label="Dashboard" to="/" />
        
        <SidebarGroup title="DAO Services">
          <SidebarItem icon={<FileText size={18} />} label="Services Catalog" to="/services" />
          <SidebarItem icon={<Settings size={18} />} label="Integration Hub" to="/services/integrations" />
        </SidebarGroup>
        
        <SidebarGroup title="Governance">
          <SidebarItem icon={<Users size={18} />} label="Proposals" to="/governance/proposals" />
          <SidebarItem icon={<Users size={18} />} label="Voting" to="/governance/voting" />
          <SidebarItem icon={<Users size={18} />} label="Deliberation" to="/governance/deliberation" />
        </SidebarGroup>

        <SidebarGroup title="Financial">
          <SidebarItem icon={<Wallet size={18} />} label="Wallet" to="/wallet" />
          <SidebarItem icon={<Wallet size={18} />} label="Payments" to="/wallet/payments" />
          <SidebarItem icon={<Wallet size={18} />} label="Subscriptions" to="/wallet/subscriptions" />
        </SidebarGroup>

        <SidebarGroup title="Legal">
          <SidebarItem icon={<Gavel size={18} />} label="Arbitration" to="/legal" />
          <SidebarItem icon={<Gavel size={18} />} label="Contracts" to="/legal/contracts" />
        </SidebarGroup>

        <SidebarGroup title="Organization">
          <SidebarItem icon={<Building2 size={18} />} label="DAO Operations" to="/dao" />
          <SidebarItem icon={<Building2 size={18} />} label="Members" to="/dao/members" />
          <SidebarItem icon={<Building2 size={18} />} label="Projects" to="/dao/projects" />
        </SidebarGroup>

        <SidebarGroup title="Tools">
          <SidebarItem icon={<Wrench size={18} />} label="Manual Tools" to="/tools" />
          <SidebarItem icon={<Wrench size={18} />} label="AI Agent" to="/tools/ai-agent" />
        </SidebarGroup>
      </nav>
    </aside>
  );
};

export default Sidebar;
