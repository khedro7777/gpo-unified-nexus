
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Users, Clock, CheckCircle, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Discussion {
  id: string;
  title: string;
  description: string;
  author: string;
  createdAt: string;
  status: 'active' | 'closed' | 'proposal';
  participants: number;
  comments: number;
  votes?: {
    yes: number;
    no: number;
    abstain: number;
    total: number;
  };
}

const LoomioIntegration = () => {
  const [discussions, setDiscussions] = useState<Discussion[]>([
    {
      id: 'disc-001',
      title: 'اختيار مورد أجهزة الحاسب',
      description: 'مناقشة حول اختيار أفضل مورد لأجهزة الحاسب المحمول بناءً على العروض المقدمة',
      author: 'أحمد محمد',
      createdAt: '2025-05-28',
      status: 'proposal',
      participants: 12,
      comments: 8,
      votes: { yes: 9, no: 2, abstain: 1, total: 12 }
    },
    {
      id: 'disc-002',
      title: 'خطة التسويق المشترك',
      description: 'مناقشة استراتيجية التسويق المشترك للربع القادم وتحديد الميزانية المطلوبة',
      author: 'فاطمة أحمد',
      createdAt: '2025-05-27',
      status: 'active',
      participants: 8,
      comments: 15
    },
    {
      id: 'disc-003',
      title: 'تطوير منصة تجارة إلكترونية',
      description: 'مناقشة إمكانية تطوير منصة تجارة إلكترونية موحدة للأعضاء',
      author: 'سارة علي',
      createdAt: '2025-05-26',
      status: 'closed',
      participants: 15,
      comments: 22
    }
  ]);

  const [newDiscussion, setNewDiscussion] = useState({
    title: '',
    description: '',
    type: 'discussion'
  });

  const { toast } = useToast();

  const getStatusBadge = (status: Discussion['status']) => {
    const variants = {
      active: { label: 'نشط', variant: 'default' as const, icon: MessageSquare },
      closed: { label: 'مغلق', variant: 'secondary' as const, icon: CheckCircle },
      proposal: { label: 'اقتراح للتصويت', variant: 'default' as const, icon: Users }
    };
    
    const config = variants[status];
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const handleCreateDiscussion = () => {
    if (!newDiscussion.title || !newDiscussion.description) {
      toast({
        title: "خطأ",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    const discussion: Discussion = {
      id: `disc-${Date.now()}`,
      title: newDiscussion.title,
      description: newDiscussion.description,
      author: 'المستخدم الحالي',
      createdAt: new Date().toISOString().split('T')[0],
      status: newDiscussion.type === 'proposal' ? 'proposal' : 'active',
      participants: 1,
      comments: 0,
      ...(newDiscussion.type === 'proposal' && {
        votes: { yes: 0, no: 0, abstain: 0, total: 0 }
      })
    };

    setDiscussions([discussion, ...discussions]);
    setNewDiscussion({ title: '', description: '', type: 'discussion' });
    
    toast({
      title: "تم إنشاء المناقشة",
      description: "تم إنشاء المناقشة بنجاح"
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">منصة Loomio للنقاش</h2>
        <p className="text-muted-foreground">
          منصة تفاعلية للنقاش الجماعي واتخاذ القرارات التشاركية
        </p>
      </div>

      {/* إنشاء مناقشة جديدة */}
      <Card>
        <CardHeader>
          <CardTitle>إنشاء مناقشة جديدة</CardTitle>
          <CardDescription>ابدأ مناقشة جديدة أو اقتراح للتصويت</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">عنوان المناقشة</Label>
            <Input
              id="title"
              value={newDiscussion.title}
              onChange={(e) => setNewDiscussion({...newDiscussion, title: e.target.value})}
              placeholder="أدخل عنوان المناقشة"
            />
          </div>
          
          <div>
            <Label htmlFor="description">وصف المناقشة</Label>
            <Textarea
              id="description"
              value={newDiscussion.description}
              onChange={(e) => setNewDiscussion({...newDiscussion, description: e.target.value})}
              placeholder="اكتب وصفاً تفصيلياً للمناقشة"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="type">نوع المناقشة</Label>
            <Select value={newDiscussion.type} onValueChange={(value) => setNewDiscussion({...newDiscussion, type: value})}>
              <SelectTrigger>
                <SelectValue placeholder="اختر نوع المناقشة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="discussion">مناقشة عامة</SelectItem>
                <SelectItem value="proposal">اقتراح للتصويت</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleCreateDiscussion} className="w-full">
            إنشاء المناقشة
          </Button>
        </CardContent>
      </Card>

      {/* قائمة المناقشات */}
      <div className="space-y-4">
        {discussions.map((discussion) => (
          <Card key={discussion.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{discussion.title}</CardTitle>
                  <CardDescription>{discussion.description}</CardDescription>
                </div>
                {getStatusBadge(discussion.status)}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {discussion.participants} مشارك
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  {discussion.comments} تعليق
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {discussion.createdAt}
                </div>
                <span>بواسطة: {discussion.author}</span>
              </div>

              {discussion.votes && (
                <div className="border rounded-lg p-4 bg-muted/30">
                  <h4 className="font-medium mb-3">نتائج التصويت</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
                        <ThumbsUp className="h-4 w-4" />
                        <span className="font-bold">{discussion.votes.yes}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">موافق</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-red-600 mb-1">
                        <ThumbsDown className="h-4 w-4" />
                        <span className="font-bold">{discussion.votes.no}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">معارض</p>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                        <Minus className="h-4 w-4" />
                        <span className="font-bold">{discussion.votes.abstain}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">ممتنع</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center">
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-1" />
                  عرض المناقشة
                </Button>
                {discussion.status === 'proposal' && (
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-green-600 hover:bg-green-50">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      موافق
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-600 hover:bg-red-50">
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      معارض
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LoomioIntegration;
