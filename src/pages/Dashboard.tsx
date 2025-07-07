
import React, { useState } from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, Wallet, Bell, Shield, CheckCircle, Clock, AlertCircle,
  Star, TrendingUp, Users, FileText, Settings, Plus, Eye,
  MessageSquare, Vote, Building, Scale, Zap, Crown
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock user data - in real app this would come from API
  const userData = {
    name: user?.user_metadata?.full_name || 'المستخدم',
    email: user?.email || 'user@example.com',
    verificationStatus: 'verified', // restricted, pending, verified
    pointsBalance: 2500,
    memberGroups: 5,
    activeNegotiations: 3,
    pendingRequests: 2,
    notifications: 7,
    userRole: 'buyer', // buyer, supplier, freelancer, founder
    accountLevel: 'premium' // basic, premium, enterprise
  };

  const quickStats = [
    {
      title: 'رصيد النقاط',
      value: userData.pointsBalance.toLocaleString(),
      icon: Star,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'المجموعات النشطة',
      value: userData.memberGroups,
      icon: Users,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'التفاوضات الجارية',
      value: userData.activeNegotiations,
      icon: MessageSquare,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'الطلبات المعلقة',
      value: userData.pendingRequests,
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'group_join',
      title: 'انضممت إلى مجموعة شراء أجهزة اللابتوب',
      description: 'تم قبولك كعضو في المجموعة',
      timestamp: 'منذ ساعتين',
      status: 'success'
    },
    {
      id: 2,
      type: 'vote_pending',
      title: 'تصويت مطلوب في مجموعة التسويق',
      description: 'يرجى التصويت على اقتراح الحملة التسويقية',
      timestamp: 'منذ 4 ساعات',
      status: 'pending'
    },
    {
      id: 3,
      type: 'offer_received',
      title: 'عرض جديد من مورد معتمد',
      description: 'تم استلام عرض بخصم 35% على الأجهزة',
      timestamp: 'منذ يوم',
      status: 'info'
    }
  ];

  const getVerificationBadge = (status: string) => {
    const statusMap = {
      'restricted': { text: 'محدود', color: 'bg-red-100 text-red-800', icon: AlertCircle },
      'pending': { text: 'قيد المراجعة', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
      'verified': { text: 'موثق', color: 'bg-green-100 text-green-800', icon: CheckCircle }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.restricted;
    const IconComponent = statusInfo.icon;
    
    return (
      <Badge className={`${statusInfo.color} flex items-center gap-1`}>
        <IconComponent className="h-3 w-3" />
        {statusInfo.text}
      </Badge>
    );
  };

  const getActivityIcon = (type: string) => {
    const iconMap = {
      'group_join': Users,
      'vote_pending': Vote,
      'offer_received': FileText,
      'negotiation': MessageSquare
    };
    
    return iconMap[type as keyof typeof iconMap] || Bell;
  };

  const getActivityColor = (status: string) => {
    const colorMap = {
      'success': 'text-green-600 bg-green-50',
      'pending': 'text-orange-600 bg-orange-50',
      'info': 'text-blue-600 bg-blue-50',
      'warning': 'text-red-600 bg-red-50'
    };
    
    return colorMap[status as keyof typeof colorMap] || 'text-gray-600 bg-gray-50';
  };

  return (
    <NewMainLayout>
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              مرحباً، {userData.name}
            </h1>
            <p className="text-gray-600 flex items-center gap-2">
              لوحة التحكم الشخصية • 
              {getVerificationBadge(userData.verificationStatus)}
              {userData.accountLevel === 'premium' && (
                <Badge className="bg-purple-100 text-purple-800 flex items-center gap-1">
                  <Crown className="h-3 w-3" />
                  حساب مميز
                </Badge>
              )}
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link to="/notifications" className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                الإشعارات
                {userData.notifications > 0 && (
                  <Badge className="bg-red-500 text-white rounded-full px-2 py-0.5 text-xs">
                    {userData.notifications}
                  </Badge>
                )}
              </Link>
            </Button>
            <Button asChild>
              <Link to="/create-group">
                <Plus className="mr-2 h-4 w-4" />
                إنشاء مجموعة
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-gray-600">{stat.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="groups">مجموعاتي</TabsTrigger>
            <TabsTrigger value="activities">الأنشطة</TabsTrigger>
            <TabsTrigger value="settings">الإعدادات</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Verification Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    حالة التحقق
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>التحقق من الهوية</span>
                    {userData.verificationStatus === 'verified' ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <Clock className="h-5 w-5 text-orange-600" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span>التحقق من البريد الإلكتروني</span>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span>التحقق من رقم الهاتف</span>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  
                  {userData.verificationStatus !== 'verified' && (
                    <Button className="w-full" asChild>
                      <Link to="/verification">
                        إكمال التحقق
                        <ArrowRight className="mr-2 h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Points & Subscription */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="h-5 w-5" />
                    المحفظة والاشتراك
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>رصيد النقاط الحالي</span>
                    <span className="font-bold text-2xl text-primary">{userData.pointsBalance.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>نوع الاشتراك</span>
                    <Badge className="bg-purple-100 text-purple-800">
                      {userData.accountLevel === 'premium' ? 'مميز' : 'أساسي'}
                    </Badge>
                  </div>
                  <Progress value={75} className="w-full" />
                  <p className="text-sm text-gray-600">75% من الحد الشهري المستخدم</p>
                  
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1" asChild>
                      <Link to="/wallet">المحفظة</Link>
                    </Button>
                    <Button className="flex-1" asChild>
                      <Link to="/wallet?tab=subscriptions">ترقية الاشتراك</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle>الأنشطة الأخيرة</CardTitle>
                <CardDescription>آخر الأنشطة والإشعارات المهمة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => {
                    const IconComponent = getActivityIcon(activity.type);
                    return (
                      <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className={`p-2 rounded-lg ${getActivityColor(activity.status)}`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{activity.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                          <p className="text-xs text-gray-400 mt-2">{activity.timestamp}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-6 text-center">
                  <Button variant="outline" asChild>
                    <Link to="/activities">
                      عرض جميع الأنشطة
                      <ArrowRight className="mr-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Groups Tab */}
          <TabsContent value="groups">
            <Card>
              <CardHeader>
                <CardTitle>مجموعاتي</CardTitle>
                <CardDescription>جميع المجموعات التي انضممت إليها أو أسستها</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">مجموعاتك</h3>
                  <p className="text-gray-600 mb-6">اعرض وادر مجموعاتك من الصفحة المخصصة</p>
                  <Button asChild>
                    <Link to="/my-groups">
                      عرض مجموعاتي
                      <ArrowRight className="mr-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activities Tab */}
          <TabsContent value="activities">
            <Card>
              <CardHeader>
                <CardTitle>سجل الأنشطة</CardTitle>
                <CardDescription>جميع أنشطتك وتفاعلاتك على المنصة</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.concat([
                    {
                      id: 4,
                      type: 'negotiation',
                      title: 'بدء مفاوضات جديدة',
                      description: 'تم بدء مفاوضات مع مورد في مجموعة الأجهزة',
                      timestamp: 'منذ يومين',
                      status: 'info'
                    }
                  ]).map((activity) => {
                    const IconComponent = getActivityIcon(activity.type);
                    return (
                      <div key={activity.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className={`p-2 rounded-lg ${getActivityColor(activity.status)}`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{activity.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                          <p className="text-xs text-gray-400 mt-2">{activity.timestamp}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    معلومات الحساب
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" variant="outline" asChild>
                    <Link to="/profile">
                      <Settings className="mr-2 h-4 w-4" />
                      تعديل الملف الشخصي
                    </Link>
                  </Button>
                  <Button className="w-full" variant="outline" asChild>
                    <Link to="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      إعدادات الحساب
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    أدوات متقدمة
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full" variant="outline" asChild>
                    <Link to="/mcp">
                      <Zap className="mr-2 h-4 w-4" />
                      صندوق MCP الذكي
                    </Link>
                  </Button>
                  <Button className="w-full" variant="outline" asChild>
                    <Link to="/disputes">
                      <Scale className="mr-2 h-4 w-4" />
                      التحكيم والنزاعات
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </NewMainLayout>
  );
};

export default Dashboard;
