
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, Users, Settings, Bot, Activity, FileText, Vote } from 'lucide-react';
import { useGroupLifecycle } from '@/hooks/useGroupLifecycle';
import ZulipChat from '../integrations/ZulipChat';
import BotpressAssistant from '../integrations/BotpressAssistant';
import GroupVotingPanel from './GroupVotingPanel';
import GroupMembersManager from './GroupMembersManager';
import GroupDocuments from './GroupDocuments';

interface GroupManagementRoomProps {
  groupId: string;
  isAdmin: boolean;
  currentUserId: string;
}

const GroupManagementRoom: React.FC<GroupManagementRoomProps> = ({
  groupId,
  isAdmin,
  currentUserId
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const { lifecycle, roles, activeVotes, loading } = useGroupLifecycle(groupId);
  const [groupStats, setGroupStats] = useState({
    totalMembers: 0,
    activeVotes: 0,
    completedTasks: 0,
    pendingActions: 0
  });

  useEffect(() => {
    // Update group statistics
    setGroupStats({
      totalMembers: roles.length,
      activeVotes: activeVotes.length,
      completedTasks: 12, // Mock data
      pendingActions: 3   // Mock data
    });
  }, [roles, activeVotes]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6" dir="rtl">
      {/* Header with Group Status */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl">غرفة إدارة المجموعة</CardTitle>
              <CardDescription>
                المرحلة الحالية: {lifecycle?.current_phase} - الجولة {lifecycle?.current_round}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant={lifecycle?.status === 'active' ? 'default' : 'secondary'}>
                {lifecycle?.status === 'active' ? 'نشط' : 'غير نشط'}
              </Badge>
              {isAdmin && <Badge variant="outline">مدير</Badge>}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{groupStats.totalMembers}</div>
              <div className="text-sm text-muted-foreground">إجمالي الأعضاء</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{groupStats.activeVotes}</div>
              <div className="text-sm text-muted-foreground">تصويتات نشطة</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{groupStats.completedTasks}</div>
              <div className="text-sm text-muted-foreground">مهام مكتملة</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{groupStats.pendingActions}</div>
              <div className="text-sm text-muted-foreground">إجراءات معلقة</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Management Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="members">الأعضاء</TabsTrigger>
          <TabsTrigger value="chat">المحادثات</TabsTrigger>
          <TabsTrigger value="voting">التصويت</TabsTrigger>
          <TabsTrigger value="documents">الوثائق</TabsTrigger>
          <TabsTrigger value="assistant">المساعد الذكي</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  النشاط الأخير
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-2 border rounded">
                    <span className="text-sm">انضم عضو جديد</span>
                    <span className="text-xs text-muted-foreground">منذ ساعتين</span>
                  </div>
                  <div className="flex justify-between items-center p-2 border rounded">
                    <span className="text-sm">بدء تصويت جديد</span>
                    <span className="text-xs text-muted-foreground">منذ 4 ساعات</span>
                  </div>
                  <div className="flex justify-between items-center p-2 border rounded">
                    <span className="text-sm">تحديث إعدادات المجموعة</span>
                    <span className="text-xs text-muted-foreground">أمس</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  الإعدادات السريعة
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {isAdmin && (
                  <>
                    <Button variant="outline" className="w-full">
                      تحديث إعدادات المجموعة
                    </Button>
                    <Button variant="outline" className="w-full">
                      إدارة أذونات الأعضاء
                    </Button>
                    <Button variant="outline" className="w-full">
                      تصدير تقرير المجموعة
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="members">
          <GroupMembersManager 
            groupId={groupId} 
            isAdmin={isAdmin} 
            roles={roles}
          />
        </TabsContent>

        <TabsContent value="chat">
          <ZulipChat 
            groupId={groupId} 
            userId={currentUserId}
            isAdmin={isAdmin}
          />
        </TabsContent>

        <TabsContent value="voting">
          <GroupVotingPanel 
            groupId={groupId} 
            activeVotes={activeVotes}
            isAdmin={isAdmin}
            currentUserId={currentUserId}
          />
        </TabsContent>

        <TabsContent value="documents">
          <GroupDocuments 
            groupId={groupId} 
            isAdmin={isAdmin}
          />
        </TabsContent>

        <TabsContent value="assistant">
          <BotpressAssistant 
            groupId={groupId} 
            userId={currentUserId}
            context="group_management"
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GroupManagementRoom;
