
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, ThumbsUp, Flag } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const comments = [
  {
    id: 1,
    author: 'member1.eth',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=John',
    content: 'I think this proposal has merit, but we need more details about how the funds will be allocated. What are the specific community projects being considered?',
    likes: 5,
    timestamp: '2 hours ago'
  },
  {
    id: 2,
    author: 'member2.eth',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Jane',
    content: 'Agreed with member1. Additionally, I suggest we establish a committee to oversee the distribution of these funds to ensure transparency.',
    likes: 3,
    timestamp: '1 hour ago'
  },
  {
    id: 3,
    author: 'member3.eth',
    avatar: 'https://api.dicebear.com/7.x/personas/svg?seed=Robert',
    content: 'I oppose this proposal. Our treasury should be focused on operational expenses right now, not community development.',
    likes: 1,
    timestamp: '45 minutes ago'
  }
];

const GovernanceDeliberation = () => {
  const { toast } = useToast();
  const [commentText, setCommentText] = useState('');
  
  const handleAddComment = () => {
    if (!commentText.trim()) {
      toast({
        title: "Error",
        description: "Comment cannot be empty",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Comment added",
      description: "Your comment has been posted to the deliberation",
    });
    
    setCommentText('');
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Community Fund Allocation - Deliberation</CardTitle>
          <CardDescription className="flex items-center gap-2">
            <MessageCircle size={16} />
            <span>3 comments • Deliberation ends in 2 days</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="pb-4">
              <div className="flex items-start gap-3">
                <Avatar>
                  <AvatarImage src={comment.avatar} alt={comment.author} />
                  <AvatarFallback>{comment.author.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between">
                    <span className="font-medium text-sm">{comment.author}</span>
                    <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                  </div>
                  <p className="text-sm">{comment.content}</p>
                  <div className="flex items-center gap-4 pt-1">
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-xs gap-1">
                      <ThumbsUp size={14} /> {comment.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-xs gap-1">
                      <MessageCircle size={14} /> Reply
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-xs gap-1">
                      <Flag size={14} /> Report
                    </Button>
                  </div>
                </div>
              </div>
              <Separator className="mt-4" />
            </div>
          ))}
          
          <div className="pt-2">
            <h4 className="text-sm font-medium mb-2">Add your comment:</h4>
            <Textarea 
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Share your thoughts on this proposal..."
              className="min-h-[100px]"
            />
            <div className="flex justify-end mt-2">
              <Button onClick={handleAddComment}>Post Comment</Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between text-sm text-muted-foreground">
          <span>Public Observer Mode: Viewing Only</span>
          <span>Powered by Loomio Deliberation</span>
        </CardFooter>
      </Card>
    </div>
  );
};

export default GovernanceDeliberation;
