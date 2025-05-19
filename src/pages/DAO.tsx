
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import TabSystem from '@/components/tabs/TabSystem';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const DAOContent = () => (
  <div className="space-y-6">
    <h1 className="text-3xl font-bold">DAO Operations</h1>
    <p className="text-muted-foreground">
      Manage your decentralized autonomous organization operations and members.
    </p>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-2">Members</h3>
        <div className="text-3xl font-bold mb-1">42</div>
        <p className="text-sm text-green-600">+3 this month</p>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-2">Active Projects</h3>
        <div className="text-3xl font-bold mb-1">7</div>
        <p className="text-sm text-muted-foreground">2 nearing completion</p>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-medium mb-2">Governance Participation</h3>
        <div className="text-3xl font-bold mb-1">78%</div>
        <p className="text-sm text-green-600">+5% from last month</p>
      </Card>
    </div>
    
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Active Projects</h2>
      <Card>
        <div className="divide-y divide-border">
          <div className="p-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Website Redesign</h3>
              <Badge>Development</Badge>
            </div>
            <p className="text-sm text-muted-foreground my-2">
              Redesigning the public-facing website with new branding.
            </p>
            <div className="mt-2">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>75%</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Token Economics Model</h3>
              <Badge variant="outline">Planning</Badge>
            </div>
            <p className="text-sm text-muted-foreground my-2">
              Defining token utility and economic model for the DAO.
            </p>
            <div className="mt-2">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>30%</span>
              </div>
              <Progress value={30} className="h-2" />
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Community Onboarding</h3>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>
            </div>
            <p className="text-sm text-muted-foreground my-2">
              Improving member onboarding and engagement processes.
            </p>
            <div className="mt-2">
              <div className="flex justify-between text-sm mb-1">
                <span>Progress</span>
                <span>60%</span>
              </div>
              <Progress value={60} className="h-2" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

const DAO = () => {
  const tabs = [
    {
      id: 'dao',
      title: 'DAO Operations',
      content: <DAOContent />
    }
  ];

  return (
    <MainLayout>
      <TabSystem tabs={tabs} />
    </MainLayout>
  );
};

export default DAO;
