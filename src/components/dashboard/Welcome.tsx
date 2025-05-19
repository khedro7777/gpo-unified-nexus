
import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronRight, Settings, Users, FileText, Wallet, Gavel, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  to: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, to }) => {
  return (
    <Card className="p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col h-full">
        <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center text-primary mb-4">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm flex-grow mb-4">{description}</p>
        <Link to={to} className="text-primary hover:text-primary/80 font-medium text-sm inline-flex items-center">
          Explore <ChevronRight size={16} className="ml-1" />
        </Link>
      </div>
    </Card>
  );
};

const Welcome = () => {
  const features = [
    {
      icon: <FileText size={20} />,
      title: "Services",
      description: "Explore integrated services and applications within the GPO ecosystem",
      to: "/services"
    },
    {
      icon: <Users size={20} />,
      title: "Governance",
      description: "Manage proposals, voting, and collaborative decision-making",
      to: "/governance"
    },
    {
      icon: <Wallet size={20} />,
      title: "Wallet & Payments",
      description: "Handle finances, subscriptions, and payment processing",
      to: "/wallet"
    },
    {
      icon: <Gavel size={20} />,
      title: "Legal & Arbitration",
      description: "Access dispute resolution and legal tools for your organization",
      to: "/legal"
    },
    {
      icon: <Building2 size={20} />,
      title: "DAO Operations",
      description: "Manage your decentralized autonomous organization effectively",
      to: "/dao"
    },
    {
      icon: <Settings size={20} />,
      title: "Tools",
      description: "Utilize manual tools and AI agents for enhanced productivity",
      to: "/tools"
    }
  ];

  return (
    <div className="space-y-8">
      <section className="py-12 bg-gradient-to-r from-gpo-blue to-gpo-purple rounded-lg text-white mb-8">
        <div className="gpo-container text-center px-6">
          <h1 className="text-4xl font-bold mb-4">GPO MCP Intelligent Platform</h1>
          <p className="text-lg max-w-2xl mx-auto mb-8 opacity-90">
            The unified platform for decentralized autonomous organizations, cooperative management, and intelligent governance
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Button className="bg-white text-gpo-purple hover:bg-white/90">
              Get Started
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10">
              Learn More <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Platform Features</h2>
          <Button variant="outline">View All</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </section>

      <section className="bg-muted/30 rounded-lg p-6 border border-border">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-card rounded-md">
            <div>
              <p className="font-medium">New Proposal Created</p>
              <p className="text-sm text-muted-foreground">Treasury allocation for Q2 projects</p>
            </div>
            <span className="text-xs text-muted-foreground">5 min ago</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-card rounded-md">
            <div>
              <p className="font-medium">Voting Closed</p>
              <p className="text-sm text-muted-foreground">Community guidelines update</p>
            </div>
            <span className="text-xs text-muted-foreground">2 hours ago</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-card rounded-md">
            <div>
              <p className="font-medium">New Member Joined</p>
              <p className="text-sm text-muted-foreground">Welcome Alice to the DAO</p>
            </div>
            <span className="text-xs text-muted-foreground">1 day ago</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Welcome;
