
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import TabSystem from '@/components/tabs/TabSystem';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const ToolsContent = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">Tools & Utilities</h1>
    <p className="text-muted-foreground">
      Access manual tools and AI agents for enhanced productivity.
    </p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-2">MCP AI Assistant</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Intelligent assistant to help with DAO operations and governance.
        </p>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">Configure</Button>
          <Button size="sm">Launch Assistant</Button>
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-2">Cooperative Formation Tool</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Guided process for creating a new cooperative entity.
        </p>
        <Button>Start Formation</Button>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-2">Smart Contract Generator</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Create customized smart contracts for your organization needs.
        </p>
        <Button variant="outline">Open Generator</Button>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-2">Proposal Templates</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Standard templates for creating effective governance proposals.
        </p>
        <Button variant="outline">Browse Templates</Button>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-2">Member Directory</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Search and manage organization members and their roles.
        </p>
        <Button variant="outline">Open Directory</Button>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-2">Analytics Dashboard</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Visualize data about your organization's performance and activities.
        </p>
        <Button variant="outline">View Analytics</Button>
      </Card>
    </div>
  </div>
);

const Tools = () => {
  const tabs = [
    {
      id: 'tools',
      title: 'Tools & Utilities',
      content: <ToolsContent />
    }
  ];

  return (
    <MainLayout>
      <TabSystem tabs={tabs} />
    </MainLayout>
  );
};

export default Tools;
