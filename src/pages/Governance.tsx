
import React from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Governance = () => {
  return (
    <NewMainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold">Governance & Voting</h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Participate in decision-making and vote on important proposals.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <Card className="p-4 md:p-6">
            <h3 className="text-base md:text-lg font-medium mb-4">Active Proposals</h3>
            <div className="space-y-3">
              <div className="p-3 border rounded">
                <p className="font-medium text-sm md:text-base">Proposal #12: Budget Allocation</p>
                <p className="text-xs md:text-sm text-muted-foreground">Voting ends in 2 days</p>
                <Button size="sm" className="mt-2 text-xs">Vote Now</Button>
              </div>
              <div className="p-3 border rounded">
                <p className="font-medium text-sm md:text-base">Proposal #11: New Partnership</p>
                <p className="text-xs md:text-sm text-muted-foreground">Voting ends in 5 days</p>
                <Button size="sm" className="mt-2 text-xs">Vote Now</Button>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 md:p-6">
            <h3 className="text-base md:text-lg font-medium mb-4">Voting Power</h3>
            <div className="text-2xl md:text-3xl font-bold mb-2">1,250 votes</div>
            <p className="text-xs md:text-sm text-muted-foreground mb-4">Based on your GPO token holdings</p>
            <Button variant="outline" className="text-xs md:text-sm">View Details</Button>
          </Card>
        </div>
      </div>
    </NewMainLayout>
  );
};

export default Governance;
