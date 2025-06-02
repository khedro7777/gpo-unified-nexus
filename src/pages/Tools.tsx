
import React from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import TabSystem from '@/components/tabs/TabSystem';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ToolsContent = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">Tools & Integrations</h1>
    <p className="text-muted-foreground">
      Access productivity tools and manage integrations with external services.
    </p>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-2">Project Management</h3>
        <p className="text-sm text-muted-foreground mb-4">Integrated project tracking</p>
        <Badge variant="default" className="mb-4">Connected</Badge>
        <Button variant="outline" className="w-full">Configure</Button>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-2">Communication</h3>
        <p className="text-sm text-muted-foreground mb-4">Team chat and video calls</p>
        <Badge variant="secondary" className="mb-4">Not Connected</Badge>
        <Button className="w-full">Connect</Button>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-2">Financial Tools</h3>
        <p className="text-sm text-muted-foreground mb-4">Accounting and invoicing</p>
        <Badge variant="default" className="mb-4">Connected</Badge>
        <Button variant="outline" className="w-full">Configure</Button>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-2">Analytics</h3>
        <p className="text-sm text-muted-foreground mb-4">Business intelligence</p>
        <Badge variant="secondary" className="mb-4">Not Connected</Badge>
        <Button className="w-full">Connect</Button>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-2">Storage</h3>
        <p className="text-sm text-muted-foreground mb-4">Cloud file storage</p>
        <Badge variant="default" className="mb-4">Connected</Badge>
        <Button variant="outline" className="w-full">Configure</Button>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-2">Custom Tools</h3>
        <p className="text-sm text-muted-foreground mb-4">Build your own integrations</p>
        <Badge variant="outline" className="mb-4">Available</Badge>
        <Button className="w-full">Create</Button>
      </Card>
    </div>
  </div>
);

const Tools = () => {
  const tabs = [
    {
      id: 'tools',
      title: 'Tools Overview',
      content: <ToolsContent />
    }
  ];

  return (
    <NewMainLayout>
      <TabSystem tabs={tabs} />
    </NewMainLayout>
  );
};

export default Tools;
