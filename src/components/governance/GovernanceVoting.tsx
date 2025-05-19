
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const GovernanceVoting = () => {
  const { toast } = useToast();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  
  const handleVote = () => {
    if (!selectedOption) {
      toast({
        title: "Error",
        description: "Please select an option to vote",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Vote submitted",
      description: "Your vote has been recorded",
    });
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Community Fund Allocation</CardTitle>
          <CardDescription>
            Proposal to allocate 5% of treasury funds to community development projects
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Yes (23 votes)</span>
              <span>70%</span>
            </div>
            <Progress value={70} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>No (7 votes)</span>
              <span>21%</span>
            </div>
            <Progress value={21} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Abstain (3 votes)</span>
              <span>9%</span>
            </div>
            <Progress value={9} className="h-2" />
          </div>
          
          <div className="pt-4">
            <h4 className="text-sm font-medium mb-2">Cast your vote:</h4>
            <RadioGroup value={selectedOption || ""} onValueChange={setSelectedOption}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes">Approve</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no">Reject</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="abstain" id="abstain" />
                <Label htmlFor="abstain">Abstain</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleVote} disabled={!selectedOption}>Submit Vote</Button>
        </CardFooter>
      </Card>
      
      <div className="bg-muted p-4 rounded-md">
        <h3 className="font-medium mb-2">Voting Information</h3>
        <ul className="text-sm space-y-2 text-muted-foreground">
          <li>• Voting period ends on June 1st, 2025</li>
          <li>• You need at least 100 GPO tokens to vote</li>
          <li>• Your voting power: 1.5x (based on participation history)</li>
          <li>• This vote requires a 66% majority to pass</li>
        </ul>
      </div>
    </div>
  );
};

export default GovernanceVoting;
