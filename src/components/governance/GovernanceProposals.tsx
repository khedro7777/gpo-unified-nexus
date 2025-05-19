
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Users, ThumbsUp, ThumbsDown } from 'lucide-react';

const proposals = [
  {
    id: 1,
    title: 'Community Fund Allocation',
    description: 'Proposal to allocate 5% of treasury funds to community development projects',
    status: 'active',
    votes: { yes: 23, no: 7, abstain: 3 },
    deadline: '2025-06-01',
    author: 'member1.eth'
  },
  {
    id: 2,
    title: 'New Supplier Integration',
    description: 'Add XYZ Manufacturing as an approved supplier for cooperative purchases',
    status: 'pending',
    votes: { yes: 0, no: 0, abstain: 0 },
    deadline: '2025-06-05',
    author: 'member2.eth'
  },
  {
    id: 3,
    title: 'Update Membership Rules',
    description: 'Revise membership criteria to include verification of credentials',
    status: 'completed',
    votes: { yes: 42, no: 5, abstain: 1 },
    deadline: '2025-05-15',
    author: 'member3.eth'
  }
];

const GovernanceProposals = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Proposals</h2>
        <Button>Create New Proposal</Button>
      </div>
      
      <div className="grid gap-4">
        {proposals.map((proposal) => (
          <Card key={proposal.id} className={`border-l-4 ${
            proposal.status === 'active' ? 'border-l-blue-500' : 
            proposal.status === 'completed' ? 'border-l-green-500' : 
            'border-l-amber-500'}`}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{proposal.title}</CardTitle>
                <Badge variant={
                  proposal.status === 'active' ? 'default' : 
                  proposal.status === 'completed' ? 'outline' : 
                  'secondary'
                }>
                  {proposal.status}
                </Badge>
              </div>
              <CardDescription className="flex items-center gap-2 text-sm">
                <FileText size={14} /> Proposed by {proposal.author}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">{proposal.description}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Users size={14} />
                <span>{proposal.votes.yes + proposal.votes.no + proposal.votes.abstain} participants</span>
                <span className="flex items-center gap-1"><ThumbsUp size={14} /> {proposal.votes.yes}</span>
                <span className="flex items-center gap-1"><ThumbsDown size={14} /> {proposal.votes.no}</span>
              </div>
            </CardContent>
            <CardFooter className="pt-0 flex justify-between">
              <span className="text-xs text-muted-foreground">Deadline: {proposal.deadline}</span>
              <div className="space-x-2">
                <Button size="sm" variant="outline">Details</Button>
                {proposal.status === 'active' && <Button size="sm">Vote</Button>}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GovernanceProposals;
