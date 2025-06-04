
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageCircle, Send, ThumbsUp, ThumbsDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface LoomioDiscussionProps {
  topicId: string;
}

const LoomioDiscussion: React.FC<LoomioDiscussionProps> = ({ topicId }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [newComment, setNewComment] = useState('');

  // Mock discussion data
  const comments = [
    {
      id: '1',
      author: isRTL ? 'أحمد محمد' : 'Ahmed Mohamed',
      avatar: '/placeholder.svg',
      content: isRTL 
        ? 'أعتقد أن هذا العرض مناسب جداً لمتطلباتنا، خاصة من ناحية السعر والجودة'
        : 'I think this offer is very suitable for our requirements, especially in terms of price and quality',
      timestamp: '2024-01-15 14:30',
      likes: 5,
      dislikes: 0
    },
    {
      id: '2',
      author: isRTL ? 'فاطمة علي' : 'Fatima Ali',
      avatar: '/placeholder.svg',
      content: isRTL 
        ? 'هل يمكننا التفاوض على مدة التسليم؟ أعتقد أن 14 يوم قد تكون طويلة نسبياً'
        : 'Can we negotiate on delivery time? I think 14 days might be relatively long',
      timestamp: '2024-01-15 15:45',
      likes: 3,
      dislikes: 1
    }
  ];

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      // Here you would integrate with actual Loomio API
      console.log(`New comment on topic ${topicId}:`, newComment);
      setNewComment('');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          {isRTL ? 'مناقشة المجموعة' : 'Group Discussion'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Comments List */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 p-3 bg-muted/30 rounded-lg">
              <Avatar className="h-8 w-8">
                <AvatarImage src={comment.avatar} />
                <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{comment.author}</span>
                  <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                </div>
                <p className="text-sm">{comment.content}</p>
                <div className="flex items-center gap-4">
                  <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                    <ThumbsUp className="h-3 w-3 mr-1" />
                    {comment.likes}
                  </Button>
                  <Button size="sm" variant="ghost" className="h-6 px-2 text-xs">
                    <ThumbsDown className="h-3 w-3 mr-1" />
                    {comment.dislikes}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* New Comment Form */}
        <div className="space-y-3 border-t pt-4">
          <Textarea
            placeholder={isRTL ? 'اكتب تعليقك هنا...' : 'Write your comment here...'}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
            dir={isRTL ? 'rtl' : 'ltr'}
          />
          <div className="flex justify-end">
            <Button onClick={handleSubmitComment} disabled={!newComment.trim()}>
              <Send className="h-4 w-4 mr-2" />
              {isRTL ? 'إرسال' : 'Send'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoomioDiscussion;
