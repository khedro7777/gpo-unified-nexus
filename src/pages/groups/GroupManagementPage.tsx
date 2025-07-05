
import React from 'react';
import { useParams } from 'react-router-dom';
import NewMainLayout from '@/components/layout/NewMainLayout';
import GroupManagementRoom from '@/components/groups/management/GroupManagementRoom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const GroupManagementPage = () => {
  const { id } = useParams();
  const currentUserId = 'user-123'; // Mock - في التطبيق الحقيقي سيتم الحصول عليه من المصادقة
  const isAdmin = true; // Mock - سيتم تحديده بناءً على دور المستخدم الفعلي

  if (!id) {
    return (
      <NewMainLayout>
        <Card>
          <CardContent className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">معرف المجموعة مفقود</h2>
            <p className="text-muted-foreground mb-4">
              لم يتم العثور على معرف المجموعة في الرابط
            </p>
            <Link to="/groups">
              <Button>العودة إلى المجموعات</Button>
            </Link>
          </CardContent>
        </Card>
      </NewMainLayout>
    );
  }

  return (
    <NewMainLayout>
      <div className="space-y-6">
        {/* Breadcrumb */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/groups" className="hover:text-foreground">
              المجموعات
            </Link>
            <span>/</span>
            <Link to={`/groups/${id}`} className="hover:text-foreground">
              تفاصيل المجموعة
            </Link>
            <span>/</span>
            <span className="text-foreground">غرفة الإدارة</span>
          </div>
          
          <div className="flex gap-2">
            <Link to={`/groups/${id}`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-1" />
                العودة للمجموعة
              </Button>
            </Link>
            {isAdmin && (
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-1" />
                إعدادات المتقدمة
              </Button>
            )}
          </div>
        </div>

        {/* Main Management Room */}
        <GroupManagementRoom 
          groupId={id}
          isAdmin={isAdmin}
          currentUserId={currentUserId}
        />
      </div>
    </NewMainLayout>
  );
};

export default GroupManagementPage;
