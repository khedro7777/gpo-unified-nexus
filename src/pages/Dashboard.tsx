
import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import NewMainLayout from '@/components/layout/NewMainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  ShoppingCart, 
  FileText, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Plus
} from 'lucide-react';

const Dashboard = () => {
  const { user, name, email, role } = useAuth();
  
  const stats = [
    { 
      title: 'المجموعات النشطة',
      value: '5',
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    { 
      title: 'العروض المرسلة',
      value: '12',
      icon: ShoppingCart,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    { 
      title: 'المشاريع قيد التنفيذ',
      value: '3',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    },
    { 
      title: 'المهام المكتملة',
      value: '28',
      icon: CheckCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const recentActivities = [
    { 
      title: 'انضمام إلى مجموعة شراء اللابتوبات',
      time: 'منذ ساعتين',
      status: 'جديد',
      type: 'group'
    },
    { 
      title: 'عرض جديد من مورد الكتب',
      time: 'منذ 4 ساعات',
      status: 'قيد المراجعة',
      type: 'offer'
    },
    { 
      title: 'تصويت على عقد مجموعة التسويق',
      time: 'أمس',
      status: 'مكتمل',
      type: 'vote'
    },
    { 
      title: 'دفع فاتورة خدمات التصميم',
      time: 'منذ يومين',
      status: 'مكتمل',
      type: 'payment'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'جديد': return 'bg-blue-100 text-blue-800';
      case 'قيد المراجعة': return 'bg-yellow-100 text-yellow-800';
      case 'مكتمل': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <NewMainLayout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            مرحبًا، {name || user?.user_metadata?.full_name || 'المستخدم'}
          </h1>
          <p className="text-blue-100 mb-4">
            {email || user?.email || 'user@example.com'} | {role || 'عضو'}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" size="sm">
              <Plus className="h-4 w-4 mr-2" />
              إنشاء مجموعة جديدة
            </Button>
            <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-blue-600">
              عرض جميع المجموعات
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions and Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>إجراءات سريعة</CardTitle>
              <CardDescription>الأنشطة الأكثر استخدامًا</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                إنشاء مجموعة شراء جديدة
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <ShoppingCart className="h-4 w-4 mr-2" />
                تصفح العروض المتاحة
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                إدارة العقود والاتفاقيات
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <TrendingUp className="h-4 w-4 mr-2" />
                عرض الإحصائيات التفصيلية
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>النشاطات الأخيرة</CardTitle>
              <CardDescription>آخر التحديثات والأنشطة</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <Badge variant="secondary" className={getStatusColor(activity.status)}>
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts and Notifications */}
        <Card className="border-l-4 border-l-orange-500">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              تنبيهات مهمة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm">• لديك 3 تصويتات قيد الانتظار في مجموعاتك النشطة</p>
              <p className="text-sm">• عرض جديد من مورد الكتب يحتاج مراجعة</p>
              <p className="text-sm">• تذكير: موعد انتهاء عقد مجموعة التسويق خلال 5 أيام</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </NewMainLayout>
  );
};

export default Dashboard;
