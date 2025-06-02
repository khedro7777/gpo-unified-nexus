
import React from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Tools = () => {
  return (
    <NewMainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold">Tools & Integrations</h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Access productivity tools and manage integrations with external services.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          <Card className="p-4 md:p-6">
            <h3 className="text-base md:text-lg font-medium mb-2">Project Management</h3>
            <p className="text-xs md:text-sm text-muted-foreground mb-4">Integrated project tracking</p>
            <Badge variant="default" className="mb-4">Connected</Badge>
            <Button variant="outline" className="w-full text-xs md:text-sm">Configure</Button>
          </Card>
          
          <Card className="p-4 md:p-6">
            <h3 className="text-base md:text-lg font-medium mb-2">Communication</h3>
            <p className="text-xs md:text-sm text-muted-foreground mb-4">Team chat and video calls</p>
            <Badge variant="secondary" className="mb-4">Not Connected</Badge>
            <Button className="w-full text-xs md:text-sm">Connect</Button>
          </Card>
          
          <Card className="p-4 md:p-6">
            <h3 className="text-base md:text-lg font-medium mb-2">Financial Tools</h3>
            <p className="text-xs md:text-sm text-muted-foreground mb-4">Accounting and invoicing</p>
            <Badge variant="default" className="mb-4">Connected</Badge>
            <Button variant="outline" className="w-full text-xs md:text-sm">Configure</Button>
          </Card>
          
          <Card className="p-4 md:p-6">
            <h3 className="text-base md:text-lg font-medium mb-2">Analytics</h3>
            <p className="text-xs md:text-sm text-muted-foreground mb-4">Business intelligence</p>
            <Badge variant="secondary" className="mb-4">Not Connected</Badge>
            <Button className="w-full text-xs md:text-sm">Connect</Button>
          </Card>
          
          <Card className="p-4 md:p-6">
            <h3 className="text-base md:text-lg font-medium mb-2">Storage</h3>
            <p className="text-xs md:text-sm text-muted-foreground mb-4">Cloud file storage</p>
            <Badge variant="default" className="mb-4">Connected</Badge>
            <Button variant="outline" className="w-full text-xs md:text-sm">Configure</Button>
          </Card>
          
          <Card className="p-4 md:p-6">
            <h3 className="text-base md:text-lg font-medium mb-2">Custom Tools</h3>
            <p className="text-xs md:text-sm text-muted-foreground mb-4">Build your own integrations</p>
            <Badge variant="outline" className="mb-4">Available</Badge>
            <Button className="w-full text-xs md:text-sm">Create</Button>
          </Card>
        </div>
      </div>
    </NewMainLayout>
  );
};

export default Tools;
