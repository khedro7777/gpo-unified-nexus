
import React, { useState } from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ShoppingCart, BarChart3, Users, Building, Store, FileText, 
  Gavel, Shield, TrendingUp, DollarSign, Clock, Star,
  Plus, Eye, MessageSquare, Vote, Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

const Dashboard = () => {
  const { user } = useAuth();
  const [selectedService, setSelectedService] = useState('overview');

  // Mock data - في التطبيق الحقيقي سيتم جلبها من API
  const userStats = {
    activeGroups: 3,
    completedProjects: 12,
    totalSavings: 45000,
    reputation: 4.8
  };

  const recentActivity = [
    {
      id: 1,
      type: 'group_joined',
      title: 'انضممت إلى مجموعة شراء الأجهزة الذكية',
      time: '2 ساعات',
      status: 'active'
    },
    {
      id: 2,
      type: 'offer_received',
      title: 'تم استلام عرض جديد من شركة التقنية المتقدمة',
      time: '5 ساعات',
      status: 'pending'
    },
    {
      id: 3,
      type: 'voting_started',
      title: 'بدء التصويت على أفضل عرض للمجموعة',
      time: '1 يوم',
      status: 'active'
    }
  ];

  const myGroups = [
    {
      id: 1,
      name: 'مجموعة شراء الأجهزة الذكية',
      type: 'purchasing',
      members: 25,
      progress: 75,
      status: 'active',
      nextAction: 'التصويت على العروض'
    },
    {
      id: 2,
      name: 'حملة تسويق المنتجات الصحية',
      type: 'marketing',
      members: 18,
      progress: 60,
      status: 'planning',
      nextAction: 'مراجعة الاستراتيجية'
    },
    {
      id: 3,
      name: 'تطوير تطبيق موبايل',
      type: 'freelance',
      members: 8,
      progress: 90,
      status: 'execution',
      nextAction: 'مراجعة النتائج النهائية'
    }
  ];

  const quickActions = [
    {
      title: 'إنشاء مجموعة جديدة',
      description: 'ابدأ مشروع تعاوني جديد',
      icon: <Plus className="h-5 w-5" />,
      link: '/create-group',
      color: 'bg-blue-500'
    },
    {
      title: 'تصفح المجموعات',
      description: 'انضم إلى مجموعات موجودة',
      icon: <Eye className="h-5 w-5" />,
      link: '/groups',
      color: 'bg-green-500'
    },
    {
      title: 'إدارة المحفظة',
      description: 'تتبع أموالك ومعاملاتك',
      icon: <DollarSign className="h-5 w-5" />,
      link: '/wallet',
      color: 'bg-purple-500'
    },
    {
      title: 'التحكيم ORDA',
      description: 'حل النزاعات بذكاء',
      icon: <Gavel className="h-5 w-5" />,
      link: '/arbitration',
      color: 'bg-orange-500'
    }
  ];

  return (
    <NewMainLayout>
      <div className="space-y-8" dir="rtl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              مرحباً، {user?.user_metadata?.full_name || 'المستخدم'}
            </h1>
            <p className="text-gray-600 mt-1">
              إليك نظرة عامة على نشاطك في منصة GPO الذكية
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link to="/create-group">
                <Plus className="h-4 w-4 ml-2" />
                إنشاء مجموعة جديدة
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/profile">
                <Settings className="h-4 w-4 ml-2" />
                إعدادات الحساب
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المجموعات النشطة</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.activeGroups}</div>
              <p className="text-xs text-muted-foreground">
                +2 من الشهر الماضي
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">المشاريع المكتملة</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.completedProjects}</div>
              <p className="text-xs text-muted-foreground">
                معدل نجاح 92%
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الوفورات</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.totalSavings.toLocaleString()} ريال</div>
              <p className="text-xs text-muted-foreground">
                وفورات متراكمة
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">تقييم السمعة</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.reputation}</div>
              <p className="text-xs text-muted-foreground">
                من 5 نجوم
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>إجراءات سريعة</CardTitle>
            <CardDescription>
              الوصول السريع للخدمات الأكثر استخداماً
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <Link key={index} to={action.link}>
                  <div className="p-4 rounded-lg border hover:shadow-md transition-all duration-200 hover:scale-105">
                    <div className={`${action.color} w-10 h-10 rounded-lg flex items-center justify-center text-white mb-3`}>
                      {action.icon}
                    </div>
                    <h3 className="font-semibold text-sm mb-1">{action.title}</h3>
                    <p className="text-xs text-gray-600">{action.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Groups */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  مجموعاتي النشطة
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/groups">عرض الكل</Link>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {myGroups.map((group) => (
                  <div key={group.id} className="p-4 border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          group.type === 'purchasing' ? 'bg-blue-100 text-blue-600' :
                          group.type === 'marketing' ? 'bg-green-100 text-green-600' :
                          'bg-purple-100 text-purple-600'
                        }`}>
                          {group.type === 'purchasing' ? <ShoppingCart className="h-5 w-5" /> :
                           group.type === 'marketing' ? <BarChart3 className="h-5 w-5" /> :
                           <Users className="h-5 w-5" />}
                        </div>
                        <div>
                          <h3 className="font-semibold">{group.name}</h3>
                          <p className="text-sm text-gray-600">{group.members} أعضاء</p>
                        </div>
                      </div>
                      <Badge variant={group.status === 'active' ? 'default' : 'secondary'}>
                        {group.status === 'active' ? 'نشط' : 
                         group.status === 'planning' ? 'تخطيط' : 'تنفيذ'}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>التقدم</span>
                        <span>{group.progress}%</span>
                      </div>
                      <Progress value={group.progress} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{group.nextAction}</span>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" asChild>
                          <Link to={`/groups/${group.id}`}>
                            <Eye className="h-4 w-4 ml-1" />
                            عرض
                          </Link>
                        </Button>
                        <Button size="sm" asChild>
                          <Link to={`/groups/${group.id}?tab=chat`}>
                            <MessageSquare className="h-4 w-4 ml-1" />
                            مناقشة
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>النشاط الأخير</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs ${
                      activity.status === 'active' ? 'bg-green-500' : 'bg-orange-500'
                    }`}>
                      {activity.type === 'group_joined' ? <Users className="h-4 w-4" /> :
                       activity.type === 'offer_received' ? <FileText className="h-4 w-4" /> :
                       <Vote className="h-4 w-4" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        منذ {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
                
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/notifications">
                    عرض جميع الإشعارات
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </NewMainLayout>
  );
};

export default Dashboard;
