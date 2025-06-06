
import React, { useState } from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  User, Settings, Shield, Bell, CreditCard, Star,
  MapPin, Phone, Mail, Globe, Camera, Edit,
  Award, TrendingUp, Users, CheckCircle
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data - في التطبيق الحقيقي سيتم جلبها من API
  const [userData, setUserData] = useState({
    fullName: user?.user_metadata?.full_name || 'أحمد محمد',
    email: user?.email || 'ahmed@example.com',
    phone: '+966501234567',
    country: 'السعودية',
    city: 'الرياض',
    bio: 'رائد أعمال مهتم بالتجارة الإلكترونية والتقنية',
    website: 'https://example.com',
    company: 'شركة التقنية المتقدمة',
    role: 'مدير المشتريات',
    avatar: '/placeholder.svg'
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showEmail: false,
    showPhone: false,
    showStats: true
  });

  const userStats = {
    totalGroups: 12,
    completedProjects: 8,
    rating: 4.8,
    totalSavings: 45000,
    reputation: 'ممتاز',
    joinDate: '2023-06-15'
  };

  const achievements = [
    {
      id: 1,
      title: 'عضو نشط',
      description: 'شارك في أكثر من 10 مجموعات',
      icon: <Users className="h-5 w-5" />,
      earned: true,
      date: '2024-01-10'
    },
    {
      id: 2,
      title: 'مفاوض محترف',
      description: 'حقق وفورات تزيد عن 40,000 ريال',
      icon: <TrendingUp className="h-5 w-5" />,
      earned: true,
      date: '2024-01-05'
    },
    {
      id: 3,
      title: 'موثق',
      description: 'تم التحقق من جميع المعلومات',
      icon: <CheckCircle className="h-5 w-5" />,
      earned: true,
      date: '2023-12-20'
    },
    {
      id: 4,
      title: 'قائد مجموعة',
      description: 'أنشأ وقاد 5 مجموعات ناجحة',
      icon: <Award className="h-5 w-5" />,
      earned: false,
      progress: 60
    }
  ];

  const handleSaveProfile = () => {
    toast({
      title: "تم حفظ الملف الشخصي",
      description: "تم تحديث معلوماتك بنجاح",
    });
    setIsEditing(false);
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast({
      title: "تم تحديث الإعدادات",
      description: "تم حفظ تفضيلات الإشعارات",
    });
  };

  return (
    <NewMainLayout>
      <div className="space-y-8" dir="rtl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <User className="h-8 w-8 text-primary" />
              الملف الشخصي
            </h1>
            <p className="text-gray-600 mt-1">
              إدارة معلوماتك الشخصية وإعدادات الحساب
            </p>
          </div>
        </div>

        {/* Profile Header Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage src={userData.avatar} alt={userData.fullName} />
                  <AvatarFallback className="text-2xl">
                    {userData.fullName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <Button size="icon" className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex-1 text-center md:text-right">
                <h2 className="text-2xl font-bold">{userData.fullName}</h2>
                <p className="text-gray-600">{userData.role} في {userData.company}</p>
                <div className="flex items-center justify-center md:justify-start gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{userData.city}, {userData.country}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{userStats.rating}</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800">
                    <CheckCircle className="h-3 w-3 ml-1" />
                    موثق
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{userStats.totalGroups}</div>
                  <div className="text-xs text-gray-600">مجموعة</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{userStats.completedProjects}</div>
                  <div className="text-xs text-gray-600">مشروع مكتمل</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{userStats.totalSavings.toLocaleString()}</div>
                  <div className="text-xs text-gray-600">ريال وفورات</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">{userStats.rating}</div>
                  <div className="text-xs text-gray-600">تقييم</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">المعلومات الشخصية</TabsTrigger>
            <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
            <TabsTrigger value="privacy">الخصوصية</TabsTrigger>
            <TabsTrigger value="achievements">الإنجازات</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>المعلومات الأساسية</CardTitle>
                    <CardDescription>
                      قم بتحديث معلوماتك الشخصية ومعلومات الاتصال
                    </CardDescription>
                  </div>
                  <Button 
                    variant={isEditing ? "default" : "outline"}
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit className="h-4 w-4 ml-2" />
                    {isEditing ? 'حفظ' : 'تعديل'}
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">الاسم الكامل</label>
                    <Input
                      value={userData.fullName}
                      onChange={(e) => setUserData(prev => ({ ...prev, fullName: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">البريد الإلكتروني</label>
                    <Input
                      value={userData.email}
                      onChange={(e) => setUserData(prev => ({ ...prev, email: e.target.value }))}
                      disabled={!isEditing}
                      type="email"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">رقم الهاتف</label>
                    <Input
                      value={userData.phone}
                      onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">الدولة</label>
                    <Select 
                      value={userData.country} 
                      onValueChange={(value) => setUserData(prev => ({ ...prev, country: value }))}
                      disabled={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="السعودية">السعودية</SelectItem>
                        <SelectItem value="الإمارات">الإمارات</SelectItem>
                        <SelectItem value="مصر">مصر</SelectItem>
                        <SelectItem value="الكويت">الكويت</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">المدينة</label>
                    <Input
                      value={userData.city}
                      onChange={(e) => setUserData(prev => ({ ...prev, city: e.target.value }))}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">الموقع الإلكتروني</label>
                    <Input
                      value={userData.website}
                      onChange={(e) => setUserData(prev => ({ ...prev, website: e.target.value }))}
                      disabled={!isEditing}
                      type="url"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">نبذة شخصية</label>
                  <Textarea
                    value={userData.bio}
                    onChange={(e) => setUserData(prev => ({ ...prev, bio: e.target.value }))}
                    disabled={!isEditing}
                    rows={4}
                    placeholder="اكتب نبذة مختصرة عنك..."
                  />
                </div>

                {isEditing && (
                  <div className="flex gap-3">
                    <Button onClick={handleSaveProfile}>
                      حفظ التغييرات
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      إلغاء
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات الإشعارات</CardTitle>
                <CardDescription>
                  اختر كيف تريد أن نتواصل معك
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">إشعارات البريد الإلكتروني</h4>
                      <p className="text-sm text-gray-600">تلقي الإشعارات عبر البريد الإلكتروني</p>
                    </div>
                    <Switch
                      checked={notifications.email}
                      onCheckedChange={(checked) => handleNotificationChange('email', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">الإشعارات الفورية</h4>
                      <p className="text-sm text-gray-600">تلقي إشعارات فورية في المتصفح</p>
                    </div>
                    <Switch
                      checked={notifications.push}
                      onCheckedChange={(checked) => handleNotificationChange('push', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">الرسائل النصية</h4>
                      <p className="text-sm text-gray-600">تلقي رسائل نصية للتحديثات المهمة</p>
                    </div>
                    <Switch
                      checked={notifications.sms}
                      onCheckedChange={(checked) => handleNotificationChange('sms', checked)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">النشرات التسويقية</h4>
                      <p className="text-sm text-gray-600">تلقي أخبار المنصة والعروض الخاصة</p>
                    </div>
                    <Switch
                      checked={notifications.marketing}
                      onCheckedChange={(checked) => handleNotificationChange('marketing', checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات الخصوصية</CardTitle>
                <CardDescription>
                  تحكم في من يمكنه رؤية معلوماتك
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">الملف الشخصي مرئي</h4>
                      <p className="text-sm text-gray-600">السماح للآخرين برؤية ملفك الشخصي</p>
                    </div>
                    <Switch
                      checked={privacy.profileVisible}
                      onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, profileVisible: checked }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">إظهار البريد الإلكتروني</h4>
                      <p className="text-sm text-gray-600">عرض بريدك الإلكتروني في الملف العام</p>
                    </div>
                    <Switch
                      checked={privacy.showEmail}
                      onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, showEmail: checked }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">إظهار رقم الهاتف</h4>
                      <p className="text-sm text-gray-600">عرض رقم هاتفك في الملف العام</p>
                    </div>
                    <Switch
                      checked={privacy.showPhone}
                      onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, showPhone: checked }))}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">إظهار الإحصائيات</h4>
                      <p className="text-sm text-gray-600">عرض إحصائياتك وإنجازاتك</p>
                    </div>
                    <Switch
                      checked={privacy.showStats}
                      onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, showStats: checked }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>الإنجازات والشارات</CardTitle>
                <CardDescription>
                  تتبع تقدمك وإنجازاتك في المنصة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {achievements.map((achievement) => (
                    <div 
                      key={achievement.id} 
                      className={`p-4 rounded-lg border ${
                        achievement.earned ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${
                          achievement.earned ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                        }`}>
                          {achievement.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{achievement.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                          {achievement.earned ? (
                            <Badge className="mt-2 bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 ml-1" />
                              تم الحصول عليه في {achievement.date}
                            </Badge>
                          ) : (
                            <div className="mt-2">
                              <div className="flex justify-between text-sm mb-1">
                                <span>التقدم</span>
                                <span>{achievement.progress}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                  style={{ width: `${achievement.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </NewMainLayout>
  );
};

export default Profile;
