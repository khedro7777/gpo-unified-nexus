
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { MessageSquare, ThumbsUp, Reply, Flag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Discussion {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: Discussion[];
}

interface LoomioDiscussionProps {
  topicId: string;
}

const LoomioDiscussion: React.FC<LoomioDiscussionProps> = ({ topicId }) => {
  const { toast } = useToast();
  const [newComment, setNewComment] = useState('');
  const [discussions, setDiscussions] = useState<Discussion[]>([
    {
      id: '1',
      author: 'أحمد محمد',
      content: 'أعتقد أن هذا القرار سيكون مفيداً للمجموعة، لكن نحتاج لمناقشة التفاصيل المالية أكثر.',
      timestamp: 'منذ ساعتين',
      likes: 5,
      replies: [
        {
          id: '1-1',
          author: 'فاطمة علي',
          content: 'أتفق معك، يجب أن نحدد الميزانية بشكل واضح.',
          timestamp: 'منذ ساعة',
          likes: 2,
          replies: []
        }
      ]
    },
    {
      id: '2',
      author: 'خالد أحمد',
      content: 'أقترح تأجيل هذا القرار حتى نحصل على مزيد من المعلومات.',
      timestamp: 'منذ 3 ساعات',
      likes: 3,
      replies: []
    }
  ]);

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    const newDiscussion: Discussion = {
      id: Date.now().toString(),
      author: 'المستخدم الحالي',
      content: newComment,
      timestamp: 'الآن',
      likes: 0,
      replies: []
    };

    setDiscussions(prev => [newDiscussion, ...prev]);
    setNewComment('');
    
    toast({
      title: "تم إضافة التعليق",
      description: "تم نشر تعليقك في النقاش",
    });
  };

  const renderDiscussion = (discussion: Discussion, isReply = false) => (
    <div key={discussion.id} className={`${isReply ? 'mr-8 mt-3' : 'mb-4'}`}>
      <div className="flex gap-3">
        <Avatar>
          <AvatarFallback>{discussion.author.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex justify-between items-start mb-2">
              <span className="font-medium text-sm">{discussion.author}</span>
              <span className="text-xs text-muted-foreground">{discussion.timestamp}</span>
            </div>
            <p className="text-sm">{discussion.content}</p>
          </div>
          
          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
            <Button variant="ghost" size="sm" className="h-6 px-2 gap-1">
              <ThumbsUp size={12} />
              {discussion.likes}
            </Button>
            <Button variant="ghost" size="sm" className="h-6 px-2 gap-1">
              <Reply size={12} />
              رد
            </Button>
            <Button variant="ghost" size="sm" className="h-6 px-2 gap-1">
              <Flag size={12} />
              إبلاغ
            </Button>
          </div>
          
          {discussion.replies.map(reply => renderDiscussion(reply, true))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            نقاش القرار
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* إضافة تعليق جديد */}
          <div className="space-y-3">
            <Textarea
              placeholder="شارك رأيك في هذا القرار..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
            />
            <div className="flex justify-end">
              <Button onClick={handleSubmitComment}>
                نشر التعليق
              </Button>
            </div>
          </div>

          {/* التعليقات */}
          <div className="space-y-4">
            {discussions.map(discussion => renderDiscussion(discussion))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoomioDiscussion;
