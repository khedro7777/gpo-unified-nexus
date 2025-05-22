
import React from 'react';
import { Button } from '@/components/ui/button';

interface EmptyVotingStateProps {
  title: string;
  buttonText: string;
  onButtonClick?: () => void;
}

const EmptyVotingState: React.FC<EmptyVotingStateProps> = ({ 
  title, 
  buttonText, 
  onButtonClick 
}) => {
  return (
    <div className="p-8 text-center">
      <p className="text-muted-foreground">{title}</p>
      <Button className="mt-4" variant="outline" onClick={onButtonClick}>
        {buttonText}
      </Button>
    </div>
  );
};

export default EmptyVotingState;
