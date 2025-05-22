
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Users, ThumbsUp, ThumbsDown } from 'lucide-react';

export interface PastVotingItem {
  id: number;
  title: string;
  description: string;
  status: string;
  result: string;
  votes: {
    yes: number;
    no: number;
    abstain: number;
  };
  date: string;
}

interface PastVotingsListProps {
  pastVotings: PastVotingItem[];
}

const PastVotingsList: React.FC<PastVotingsListProps> = ({ pastVotings }) => {
  return (
    <div className="space-y-4">
      {pastVotings.map(voting => (
        <Card key={voting.id} className={`border-l-4 ${
          voting.result === 'approved' ? 'border-l-green-500' : 'border-l-red-500'}`}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg">{voting.title}</CardTitle>
              <Badge variant={voting.result === 'approved' ? 'outline' : 'secondary'}>
                {voting.result === 'approved' ? 'تمت الموافقة' : 'مرفوض'}
              </Badge>
            </div>
            <CardDescription className="flex items-center gap-2 text-sm">
              <FileText size={14} /> تم التصويت بتاريخ {voting.date}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-2">{voting.description}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Users size={14} />
              <span>{voting.votes.yes + voting.votes.no + voting.votes.abstain} مشارك</span>
              <span className="flex items-center gap-1"><ThumbsUp size={14} /> {voting.votes.yes}</span>
              <span className="flex items-center gap-1"><ThumbsDown size={14} /> {voting.votes.no}</span>
            </div>
          </CardContent>
          <CardFooter className="pt-0 flex justify-end">
            <Button size="sm" variant="outline">عرض التفاصيل</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default PastVotingsList;
