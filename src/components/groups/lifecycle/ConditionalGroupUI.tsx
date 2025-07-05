
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useGroupLifecycle } from '@/hooks/useGroupLifecycle';
import { MessageSquare, FileText, Users, Vote, UserPlus, Eye } from 'lucide-react';

interface ConditionalGroupUIProps {
  groupId: string;
  isUserMember: boolean;
  currentUserId?: string;
}

const ConditionalGroupUI: React.FC<ConditionalGroupUIProps> = ({
  groupId,
  isUserMember,
  currentUserId
}) => {
  const { lifecycle, roles } = useGroupLifecycle(groupId);

  if (!lifecycle) return null;

  const isAdmin = roles.some(role => 
    role.user_id === currentUserId && 
    role.role === 'admin' && 
    (!role.expires_at || new Date(role.expires_at) > new Date())
  );

  // Conditional rendering based on membership and phase
  const renderMemberControls = () => {
    if (!isUserMember) {
      return (
        <Card>
          <CardContent className="pt-6">
            <Button className="w-full" size="lg">
              <UserPlus className="h-4 w-4 mr-2" />
              طلب الانضمام للمجموعة
            </Button>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="space-y-4">
        {/* Always show for members */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button variant="outline" className="h-16">
            <div className="text-center">
              <MessageSquare className="h-6 w-6 mx-auto mb-1" />
              <span className="text-sm">لوحة النقاش</span>
            </div>
          </Button>
          
          <Button variant="outline" className="h-16">
            <div className="text-center">
              <Users className="h-6 w-6 mx-auto mb-1" />
              <span className="text-sm">دعوة أعضاء</span>
            </div>
          </Button>
        </div>

        {/* Phase-specific controls */}
        {lifecycle.current_phase === 'negotiation' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="h-16">
              <div className="text-center">
                <FileText className="h-6 w-6 mx-auto mb-1" />
                <span className="text-sm">تقديم اقتراح</span>
              </div>
            </Button>
            
            <Button variant="outline" className="h-16">
              <div className="text-center">
                <Vote className="h-6 w-6 mx-auto mb-1" />
                <span className="text-sm">لوحة التصويت</span>
              </div>
            </Button>
          </div>
        )}

        {lifecycle.current_phase === 'contracting' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button className="h-16">
              <div className="text-center">
                <Eye className="h-6 w-6 mx-auto mb-1" />
                <span className="text-sm">عرض العقد</span>
              </div>
            </Button>
            
            <Button variant="outline" className="h-16">
              <div className="text-center">
                <FileText className="h-6 w-6 mx-auto mb-1" />
                <span className="text-sm">توقيع العقد</span>
              </div>
            </Button>
          </div>
        )}
      </div>
    );
  };

  const renderPhaseSpecificContent = () => {
    switch (lifecycle.current_phase) {
      case 'pending_members':
        return (
          <Card className="bg-yellow-50 border-yellow-200">
            <CardHeader>
              <CardTitle className="text-yellow-800">في انتظار الأعضاء</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-yellow-700">
                المجموعة تحتاج إلى {lifecycle.settings.min_members_to_activate} أعضاء على الأقل للتفعيل
              </p>
            </CardContent>
          </Card>
        );

      case 'under_arbitration':
        return (
          <Card className="bg-red-50 border-red-200">
            <CardHeader>
              <CardTitle className="text-red-800">تحت التحكيم</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-700">
                جميع الأنشطة معطلة حاليًا حتى انتهاء عملية التحكيم
              </p>
              <Button variant="outline" className="mt-3" disabled>
                <Eye className="h-4 w-4 mr-2" />
                عرض حالة التحكيم
              </Button>
            </CardContent>
          </Card>
        );

      case 'completed':
        return (
          <Card className="bg-green-50 border-green-200">
            <CardHeader>
              <CardTitle className="text-green-800">مجموعة مكتملة</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-green-700">
                تم إكمال جميع أنشطة المجموعة بنجاح
              </p>
            </CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {renderPhaseSpecificContent()}
      {lifecycle.current_phase !== 'under_arbitration' && renderMemberControls()}
      
      {/* Admin-only controls */}
      {isAdmin && lifecycle.current_phase !== 'completed' && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-800">لوحة الإدارة</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-700 mb-3">
              أنت مدير مؤقت لهذه الجولة
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <Button variant="outline" size="sm">
                إدارة الأعضاء
              </Button>
              <Button variant="outline" size="sm">
                إدارة العروض
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ConditionalGroupUI;
