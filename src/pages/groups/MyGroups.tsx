
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NewMainLayout from '@/components/layout/NewMainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  ShoppingCart, 
  BarChart3, 
  Users, 
  Building, 
  Plus, 
  Crown, 
  User, 
  Calendar,
  Eye,
  Settings,
  Bell,
  Shield,
  CheckCircle,
  Clock,
  AlertCircle,
  Star
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

interface Group {
  id: string;
  title: string;
  type: 'buying' | 'marketing' | 'freelancers' | 'company_formation';
  status: 'founding' | 'active' | 'negotiation' | 'contracting' | 'completed';
  phase: 'pending_members' | 'admin_election' | 'negotiation' | 'contracting' | 'completed';
  members: number;
  maxMembers: number;
  progress: number;
  userRole: 'founder' | 'admin' | 'member';
  isCurrentAdmin: boolean;
  description: string;
  createdAt: string;
  lastActivity: string;
  needsAction: boolean;
  notifications: number;
  country: string;
  roundNumber: number;
  adminTerm: 'current' | 'expired' | 'none';
}

const MyGroups = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  
  // Sample data - in real app this would come from API
  const myGroups: Group[] = [
    {
      id: 'group-1',
      title: 'مجموعة شراء أجهزة اللابتوب للشركات',
      type: 'buying',
      status: 'active',
      phase: 'negotiation',
      members: 24,
      maxMembers: 50,
      progress: 75,
      userRole: 'admin',
      isCurrentAdmin: true,
      description: 'مجموعة لشراء أجهزة لابتوب عالية الجودة للشركات الناشئة بخصومات تصل إلى 40%',
      createdAt: '2024-01-15',
      lastActivity: '2 ساعات',
      needsAction: true,
      notifications: 3,
      country: 'السعودية',
      roundNumber: 2,
      adminTerm: 'current'
    },
    {
      id: 'group-2',
      title: 'حملة تسويقية للمنتجات الصحية',
      type: 'marketing',
      status: 'negotiation',
      phase: 'admin_election',
      members: 18,
      maxMembers: 30,
      progress: 60,
      userRole: 'member',
      isCurrentAdmin: false,
      description: 'حملة تسويق رقمي مشتركة للمنتجات الصحية والعضوية في دول الخليج',
      createdAt: '2024-01-10',
      lastActivity: '5 ساعات',
      needsAction: true,
      notifications: 1,
      country: 'الإمارات',
      roundNumber: 1,
      adminTerm: 'none'
    },
    {
      id: 'group-3',
      title: 'تأسيس شركة تقنية في دبي',
      type: 'company_formation',
      status: 'contracting',
      phase: 'contracting',
      members: 8,
      maxMembers: 12,
      progress: 90,
      userRole: 'founder',
      isCurrentAdmin: false,
      description: 'تأسيس شركة تقنية في مدينة دبي للإنترنت مع المساهمين',
      createdAt: '2024-01-05',
      lastActivity: '1 يوم',
      needsAction: false,
      notifications: 0,
      country: 'الإمارات',
      roundNumber: 3,
      adminTerm: 'expired'
    }
  ];
  
  const getGroupIcon = (type: string) => {
    switch (type) {
      case 'buying':
        return <ShoppingCart className="h-6 w-6 text-blue-600" />;
      case 'marketing':
        return <BarChart3 className="h-6 w-6 text-green-600" />;
      case 'company_formation':
        return <Building className="h-6 w-6 text-purple-600" />;
      case 'freelancers':
        return <Users className="h-6 w-6 text-orange-600" />;
      default:
        return <ShoppingCart className="h-6 w-6 text-gray-600" />;
    }
  };
  
  const getStatusBadge = (status: string, phase: string) => {
    switch (phase) {
      case 'pending_members':
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">جمع الأعضاء</Badge>;
      case 'admin_election':
        return <Badge variant="secondary" className="bg-blue-100 text-blue-800">انتخاب المديرين</Badge>;
      case 'negotiation':
        return <Badge variant="default" className="bg-orange-100 text-orange-800">مرحلة التفاوض</Badge>;
      case 'contracting':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">إعداد العقد</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800">مكتملة</Badge>;
      default:
        return <Badge variant="outline">غير معروف</Badge>;
    }
  };

  const getUserRoleBadge = (role: string, isCurrentAdmin: boolean, adminTerm: string) => {
    if (role === 'founder') {
      return <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">
        <Crown className="mr-1 h-3 w-3" />
        المؤسس
      </Badge>;
    }
    
    if (role === 'admin') {
      if (isCurrentAdmin && adminTerm === 'current') {
        return <Badge variant="default" className="bg-blue-500">
          <Shield className="mr-1 h-3 w-3" />
          مدير حالي
        </Badge>;
      } else if (adminTerm === 'expired') {
        return <Badge variant="outline" className="bg-gray-50 text-gray-600">
          <Shield className="mr-1 h-3 w-3" />
          مدير سابق
        </Badge>;
      }
    }
    
    return <Badge variant="outline" className="bg-gray-50 text-gray-600">
      <User className="mr-1 h-3 w-3" />
      عضو
    </Badge>;
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'buying': return 'شراء تعاوني';
      case 'marketing': return 'تسويق تعاوني';
      case 'company_formation': return 'تأسيس شركة';
      case 'freelancers': return 'عمل حر';
      default: return 'غير محدد';
    }
  };
  
  // Filter groups based on active tab
  const filteredGroups = activeTab === 'all' 
    ? myGroups 
    : myGroups.filter(group => group.type === activeTab);

  // Groups that need action
  const groupsNeedingAction = myGroups.filter(group => group.needsAction);
  const totalNotifications = myGroups.reduce((sum, group) => sum + group.notifications, 0);

  return (
    <NewMainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">مجموعاتي</h1>
            <p className="text-gray-600 mt-2">
              إدارة المجموعات الخاصة بك ومتابعة تقدمها ({myGroups.length} مجموعة)
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {totalNotifications > 0 && (
              <Button variant="outline" className="relative">
                <Bell className="mr-2 h-4 w-4" />
                الإشعارات
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                  {totalNotifications}
                </Badge>
              </Button>
            )}
            
            <Button asChild>
              <Link to="/create-group">
                <Plus className="mr-2 h-4 w-4" />
                إنشاء مجموعة جديدة
              </Link>
            </Button>
          </div>
        </div>

        {/* Action Required Alert */}
        {groupsNeedingAction.length > 0 && (
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <CardTitle className="text-orange-800">مطلوب اتخاذ إجراء</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-orange-700 mb-3">
                لديك {groupsNeedingAction.length} مجموعة تحتاج إلى اتخاذ إجراء:
              </p>
              <div className="space-y-2">
                {groupsNeedingAction.map(group => (
                  <div key={group.id} className="flex items-center justify-between bg-white rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      {getGroupIcon(group.type)}
                      <div>
                        <p className="font-medium text-gray-900">{group.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {getUserRoleBadge(group.userRole, group.isCurrentAdmin, group.adminTerm)}
                          {getStatusBadge(group.status, group.phase)}
                        </div>
                      </div>
                    </div>
                    <Button size="sm" asChild>
                      <Link to={`/groups/${group.id}`}>عرض</Link>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
        
        {/* Tabs for filtering */}
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 w-full lg:w-auto">
            <TabsTrigger value="all">الكل ({myGroups.length})</TabsTrigger>
            <TabsTrigger value="buying">الشراء</TabsTrigger>
            <TabsTrigger value="marketing">التسويق</TabsTrigger>
            <TabsTrigger value="company_formation">التأسيس</TabsTrigger>
            <TabsTrigger value="freelancers">المستقلون</TabsTrigger>
          </TabsList>
          
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredGroups.map(group => (
              <Card key={group.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                {/* Card Header */}
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      {getGroupIcon(group.type)}
                      <div>
                        <p className="text-sm text-gray-500">{getTypeText(group.type)}</p>
                        <p className="text-xs text-gray-400">{group.country}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      {group.notifications > 0 && (
                        <Badge variant="secondary" className="bg-red-100 text-red-800">
                          {group.notifications} جديد
                        </Badge>
                      )}
                      {getStatusBadge(group.status, group.phase)}
                    </div>
                  </div>
                  
                  <CardTitle className="text-lg leading-tight line-clamp-2">
                    {group.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed line-clamp-2">
                    {group.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  {/* User Role */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">دورك في المجموعة:</span>
                    {getUserRoleBadge(group.userRole, group.isCurrentAdmin, group.adminTerm)}
                  </div>

                  {/* Progress */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-600">الأعضاء: {group.members}/{group.maxMembers}</span>
                      <span className="text-primary font-medium">{group.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-blue-500 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${group.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Admin Features - Only show if user is current admin */}
                  {group.isCurrentAdmin && group.userRole === 'admin' && (
                    <div className="bg-blue-50 rounded-lg p-3 space-y-2">
                      <div className="flex items-center gap-2 text-blue-800 font-medium text-sm">
                        <Shield className="h-4 w-4" />
                        مزايا المدير المفعلة
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-1 text-blue-600">
                          <CheckCircle className="h-3 w-3" />
                          موافقة الأعضاء
                        </div>
                        <div className="flex items-center gap-1 text-blue-600">
                          <CheckCircle className="h-3 w-3" />
                          إدارة العروض
                        </div>
                        <div className="flex items-center gap-1 text-blue-600">
                          <CheckCircle className="h-3 w-3" />
                          فتح الجولات
                        </div>
                        <div className="flex items-center gap-1 text-blue-600">
                          <CheckCircle className="h-3 w-3" />
                          إرسال إشعارات
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Round Information */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      <span>الجولة {group.roundNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>آخر نشاط: {group.lastActivity}</span>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="flex gap-2 pt-2">
                    <Button className="flex-1" asChild>
                      <Link to={`/groups/${group.id}`}>
                        <Eye className="mr-2 h-4 w-4" />
                        دخول المجموعة
                      </Link>
                    </Button>
                    
                    {group.isCurrentAdmin && (
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredGroups.length === 0 && (
              <div className="col-span-full text-center py-16">
                <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">لا توجد مجموعات</h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  {activeTab === 'all' 
                    ? 'لم تقم بإنشاء أو الانضمام إلى أي مجموعات بعد' 
                    : `لم تقم بإنشاء أو الانضمام إلى أي مجموعات من نوع "${getTypeText(activeTab)}" بعد`
                  }
                </p>
                <Button asChild>
                  <Link to="/create-group">
                    <Plus className="mr-2 h-4 w-4" />
                    إنشاء مجموعة جديدة
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </Tabs>
      </div>
    </NewMainLayout>
  );
};

export default MyGroups;
