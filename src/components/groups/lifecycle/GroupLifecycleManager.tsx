
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useGroupLifecycle } from '@/hooks/useGroupLifecycle';
import { Users, Vote, FileText, Gavel, CheckCircle, Clock, Shield } from 'lucide-react';

interface GroupLifecycleManagerProps {
  groupId: string;
  isUserMember: boolean;
  currentUserId?: string;
}

const GroupLifecycleManager: React.FC<GroupLifecycleManagerProps> = ({
  groupId,
  isUserMember,
  currentUserId
}) => {
  const { lifecycle, roles, activeVotes, loading, transitionPhase, startNewRound } = useGroupLifecycle(groupId);

  if (loading) {
    return <div className="flex justify-center p-4"><Clock className="animate-spin h-6 w-6" /></div>;
  }

  if (!lifecycle) {
    return null;
  }

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'pending_members': return <Users className="h-5 w-5" />;
      case 'negotiation': return <Vote className="h-5 w-5" />;
      case 'contracting': return <FileText className="h-5 w-5" />;
      case 'under_arbitration': return <Gavel className="h-5 w-5" />;
      case 'completed': return <CheckCircle className="h-5 w-5" />;
      default: return <Clock className="h-5 w-5" />;
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'pending_members': return 'bg-yellow-500';
      case 'negotiation': return 'bg-blue-500';
      case 'contracting': return 'bg-purple-500';
      case 'under_arbitration': return 'bg-red-500';
      case 'completed': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const getPhaseText = (phase: string) => {
    switch (phase) {
      case 'pending_members': return 'انتظار الأعضاء';
      case 'negotiation': return 'التفاوض';
      case 'contracting': return 'العقود';
      case 'under_arbitration': return 'التحكيم';
      case 'completed': return 'مكتمل';
      default: return phase;
    }
  };

  const currentAdmins = roles.filter(role => 
    role.role === 'admin' && 
    (!role.expires_at || new Date(role.expires_at) > new Date())
  );

  const phaseProgress = {
    'pending_members': 20,
    'negotiation': 40,
    'contracting': 70,
    'under_arbitration': 85,
    'completed': 100
  }[lifecycle.current_phase] || 0;

  return (
    <div className="space-y-6">
      {/* Phase Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getPhaseIcon(lifecycle.current_phase)}
            حالة المجموعة
          </CardTitle>
          <CardDescription>
            الجولة {lifecycle.current_round} - {getPhaseText(lifecycle.current_phase)}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge variant={lifecycle.status === 'active' ? 'default' : 'secondary'}>
              {lifecycle.status === 'active' ? 'نشط' : 'في الانتظار'}
            </Badge>
            <Badge variant={lifecycle.visibility === 'public' ? 'outline' : 'secondary'}>
              {lifecycle.visibility === 'public' ? 'عام' : 'خاص'}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>تقدم المرحلة</span>
              <span>{phaseProgress}%</span>
            </div>
            <Progress value={phaseProgress} className="h-2" />
          </div>

          {lifecycle.round_ends_at && (
            <div className="text-sm text-muted-foreground">
              تنتهي الجولة في: {new Date(lifecycle.round_ends_at).toLocaleDateString('ar-SA')}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Current Admins */}
      {currentAdmins.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              مديرو الجولة الحالية
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {currentAdmins.map((admin) => (
                <div key={admin.id} className="flex items-center justify-between p-2 border rounded">
                  <span>{admin.profiles?.full_name || 'مدير'}</span>
                  <Badge variant="outline">مدير</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Active Votes */}
      {activeVotes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Vote className="h-5 w-5" />
              التصويتات النشطة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeVotes.map((vote) => (
                <div key={vote.id} className="p-3 border rounded-lg">
                  <h4 className="font-medium">{vote.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{vote.description}</p>
                  <div className="flex justify-between items-center">
                    <Badge variant={vote.vote_type === 'admin_election' ? 'default' : 'secondary'}>
                      {vote.vote_type === 'admin_election' ? 'انتخاب مديرين' : 'تصويت عام'}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      ينتهي في: {new Date(vote.expires_at).toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                  {isUserMember && (
                    <Button variant="outline" size="sm" className="mt-2 w-full">
                      شارك في التصويت
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Admin Controls */}
      {isUserMember && currentAdmins.some(admin => admin.user_id === currentUserId) && (
        <Card>
          <CardHeader>
            <CardTitle>أدوات الإدارة</CardTitle>
            <CardDescription>إدارة دورة حياة المجموعة</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {lifecycle.current_phase === 'negotiation' && (
              <Button 
                onClick={() => transitionPhase('contracting', 'Admin decision to move to contracting')}
                className="w-full"
              >
                الانتقال إلى مرحلة العقود
              </Button>
            )}
            
            {lifecycle.current_phase === 'contracting' && (
              <Button 
                onClick={() => transitionPhase('completed', 'Contracts completed')}
                variant="outline"
                className="w-full"
              >
                إكمال المجموعة
              </Button>
            )}
            
            <Button 
              onClick={startNewRound}
              variant="outline"
              className="w-full"
            >
              بدء جولة جديدة
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Conditional UI Elements based on phase */}
      {lifecycle.current_phase === 'under_arbitration' && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-700 flex items-center gap-2">
              <Gavel className="h-5 w-5" />
              المجموعة تحت التحكيم
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600">
              جميع الأنشطة معطلة مؤقتاً حتى انتهاء عملية التحكيم
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GroupLifecycleManager;
