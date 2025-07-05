
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Vote, Plus, Clock, CheckCircle, Users, BarChart } from 'lucide-react';
import { GroupVote } from '@/types/group-lifecycle';

interface GroupVotingPanelProps {
  groupId: string;
  activeVotes: GroupVote[];
  isAdmin: boolean;
  currentUserId: string;
}

const GroupVotingPanel: React.FC<GroupVotingPanelProps> = ({
  groupId,
  activeVotes,
  isAdmin,
  currentUserId
}) => {
  const [createVoteDialogOpen, setCreateVoteDialogOpen] = useState(false);
  const [newVote, setNewVote] = useState({
    title: '',
    description: '',
    type: 'proposal' as 'proposal' | 'admin_election' | 'contract_approval',
    options: [''],
    duration: '7'
  });

  const addOption = () => {
    setNewVote(prev => ({
      ...prev,
      options: [...prev.options, '']
    }));
  };

  const updateOption = (index: number, value: string) => {
    setNewVote(prev => ({
      ...prev,
      options: prev.options.map((opt, idx) => idx === index ? value : opt)
    }));
  };

  const removeOption = (index: number) => {
    if (newVote.options.length > 1) {
      setNewVote(prev => ({
        ...prev,
        options: prev.options.filter((_, idx) => idx !== index)
      }));
    }
  };

  const handleCreateVote = () => {
    // Here you would typically call an API to create the vote
    console.log('Creating vote:', newVote);
    setCreateVoteDialogOpen(false);
    setNewVote({
      title: '',
      description: '',
      type: 'proposal',
      options: [''],
      duration: '7'
    });
  };

  const getVoteTypeLabel = (type: string) => {
    switch (type) {
      case 'admin_election': return 'انتخاب مديرين';
      case 'contract_approval': return 'موافقة على عقد';
      case 'proposal': return 'اقتراح عام';
      default: return type;
    }
  };

  const getVoteStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-blue-500';
      case 'completed': return 'bg-green-500';
      case 'expired': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const calculateProgress = (vote: GroupVote) => {
    // Mock calculation - in real app this would be based on actual votes
    return Math.floor(Math.random() * 100);
  };

  return (
    <div className="space-y-6">
      {/* Create Vote Button */}
      {isAdmin && (
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">إدارة التصويتات</h3>
          <Dialog open={createVoteDialogOpen} onOpenChange={setCreateVoteDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                إنشاء تصويت جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>إنشاء تصويت جديد</DialogTitle>
                <DialogDescription>
                  قم بإنشاء تصويت جديد لأعضاء المجموعة
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">عنوان التصويت</label>
                  <Input
                    value={newVote.title}
                    onChange={(e) => setNewVote(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="أدخل عنوان التصويت"
                    dir="rtl"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">الوصف</label>
                  <Textarea
                    value={newVote.description}
                    onChange={(e) => setNewVote(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="اكتب وصفاً للتصويت"
                    dir="rtl"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">نوع التصويت</label>
                  <Select value={newVote.type} onValueChange={(value: any) => setNewVote(prev => ({ ...prev, type: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="proposal">اقتراح عام</SelectItem>
                      <SelectItem value="admin_election">انتخاب مديرين</SelectItem>
                      <SelectItem value="contract_approval">موافقة على عقد</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium">الخيارات</label>
                  <div className="space-y-2">
                    {newVote.options.map((option, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={option}
                          onChange={(e) => updateOption(index, e.target.value)}
                          placeholder={`الخيار ${index + 1}`}
                          dir="rtl"
                        />
                        {newVote.options.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeOption(index)}
                          >
                            حذف
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button type="button" variant="outline" size="sm" onClick={addOption}>
                      إضافة خيار
                    </Button>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">مدة التصويت (أيام)</label>
                  <Select value={newVote.duration} onValueChange={(value) => setNewVote(prev => ({ ...prev, duration: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">يوم واحد</SelectItem>
                      <SelectItem value="3">3 أيام</SelectItem>
                      <SelectItem value="7">أسبوع</SelectItem>
                      <SelectItem value="14">أسبوعين</SelectItem>
                      <SelectItem value="30">شهر</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DialogFooter>
                <Button onClick={handleCreateVote}>إنشاء التصويت</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {/* Active Votes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {activeVotes.map((vote) => (
          <Card key={vote.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{vote.title}</CardTitle>
                  <CardDescription>{vote.description}</CardDescription>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant={vote.status === 'active' ? 'default' : 'secondary'}>
                    {vote.status === 'active' ? 'نشط' : 'مكتمل'}
                  </Badge>
                  <Badge variant="outline">
                    {getVoteTypeLabel(vote.vote_type)}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Vote Options */}
              <div className="space-y-2">
                {vote.options && Array.isArray(vote.options) && vote.options.map((option: any, index: number) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{option.text || `الخيار ${index + 1}`}</span>
                      <span className="text-sm text-muted-foreground">
                        {option.votes_count || 0} صوت
                      </span>
                    </div>
                    <Progress value={calculateProgress(vote)} className="h-2" />
                  </div>
                ))}
              </div>
              
              {/* Vote Info */}
              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>ينتهي في: {new Date(vote.expires_at).toLocaleDateString('ar-SA')}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>12 مشارك</span>
                </div>
              </div>
              
              {/* Vote Actions */}
              {vote.status === 'active' && (
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <Vote className="h-4 w-4 mr-1" />
                    شارك في التصويت
                  </Button>
                  <Button size="sm" variant="outline">
                    <BarChart className="h-4 w-4" />
                  </Button>
                </div>
              )}
              
              {vote.status === 'completed' && (
                <div className="flex items-center gap-2 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-sm">تم إكمال التصويت</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {activeVotes.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Vote className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">لا توجد تصويتات نشطة</h3>
            <p className="text-muted-foreground mb-6">
              لم يتم إنشاء أي تصويتات في هذه المجموعة بعد
            </p>
            {isAdmin && (
              <Button onClick={() => setCreateVoteDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                إنشاء أول تصويت
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GroupVotingPanel;
