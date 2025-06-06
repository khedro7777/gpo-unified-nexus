
import React, { useState } from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { 
  User, Mail, Phone, MapPin, Star, Shield, 
  Settings, Bell, Lock, CreditCard, Download,
  Edit, Save, Camera, Award, TrendingUp
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

const Profile = () => {
  const { user, name, email } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: user?.user_metadata?.full_name || name || '',
    email: user?.email || email || '',
    phone: '+966501234567',
    city: 'الرياض',
    country: 'السعودية'
  });

  // Mock user stats
  const userStats = {
    reputation: 4.8,
    totalGroups: 15,
    completedProjects: 12,
    totalSavings: 45000,
    memberSince: '2023',
    verificationStatus: 'verified'
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to backend
    console.log('Saving profile data:', formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <NewMainLayout>
      <div className="space-y-8" dir="rtl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">ملفي الشخصي</h1>
            <p className="text-gray-600 mt-1">
              إدارة معلوماتك الشخصية وإعدادات الحساب
            </p>
          </div>
          <div className="flex gap-3">
            {isEditing ? (
              <>
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 ml-2" />
                  حفظ التغييرات
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  إلغاء
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 ml-2" />
                تحرير الملف
              </Button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <Card>
            <CardHeader className="text-center">
              <div className="relative mx-auto w-24 h-24 mb-4">
                <div className="w-24 h-24 bg-gradient-to-br from-primary to-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  {formData.fullName.charAt(0) || 'م'}
                </div>
                <Button size="sm" className="absolute bottom-0 right-0 rounded-full p-2">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <CardTitle>{formData.fullName}</CardTitle>
              <CardDescription>{formData.email}</CardDescription>
              <div className="flex items-center justify-center gap-2 mt-2">
                <Badge className="bg-green-100 text-green-800">
                  <Shield className="h-3 w-3 ml-1" />
                  حساب موثق
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{userStats.reputation}</div>
                  <div className="text-sm text-gray-600">تقييم السمعة</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{userStats.totalGroups}</div>
                  <div className="text-sm text-gray-600">إجمالي المجموعات</div>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">المشاريع المكتملة</span>
                  <span className="font-semibold">{userStats.completedProjects}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">إجمالي الوفورات</span>
                  <span className="font-semibold text-green-600">{userStats.totalSavings.toLocaleString()} ريال</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">عضو منذ</span>
                  <span className="font-semibold">{userStats.memberSince}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">المعلومات الشخصية</TabsTrigger>
                <TabsTrigger value="security">الأمان</TabsTrigger>
                <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
                <TabsTrigger value="billing">الفواتير</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>المعلومات الأساسية</CardTitle>
                    <CardDescription>
                      إدارة معلوماتك الشخصية والتواصل
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">الاسم الكامل</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">البريد الإلكتروني</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">رقم الهاتف</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                      <div>
                        <Label htmlFor="city">المدينة</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>الأمان وكلمة المرور</CardTitle>
                    <CardDescription>
                      إدارة إعدادات الأمان والخصوصية
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>كلمة المرور الحالية</Label>
                      <Input type="password" placeholder="أدخل كلمة المرور الحالية" />
                    </div>
                    <div>
                      <Label>كلمة المرور الجديدة</Label>
                      <Input type="password" placeholder="أدخل كلمة المرور الجديدة" />
                    </div>
                    <div>
                      <Label>تأكيد كلمة المرور</Label>
                      <Input type="password" placeholder="أعد إدخال كلمة المرور" />
                    </div>
                    <Button>تحديث كلمة المرور</Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>إعدادات الإشعارات</CardTitle>
                    <CardDescription>
                      اختر نوع الإشعارات التي تريد استلامها
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>إشعارات المجموعات</Label>
                        <p className="text-sm text-gray-600">تلقي إشعارات عن نشاط المجموعات</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>إشعارات العروض</Label>
                        <p className="text-sm text-gray-600">تلقي إشعارات عن العروض الجديدة</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>إشعارات التصويت</Label>
                        <p className="text-sm text-gray-600">تلقي إشعارات عن جلسات التصويت</p>
                      </div>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="billing" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>الفواتير والدفع</CardTitle>
                    <CardDescription>
                      إدارة طرق الدفع وتاريخ الفواتير
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center py-12">
                      <CreditCard className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold mb-2">لا توجد فواتير بعد</h3>
                      <p className="text-gray-600 mb-6">
                        ستظهر فواتيرك ومعاملاتك هنا
                      </p>
                      <Button>
                        <Download className="h-4 w-4 ml-2" />
                        تحميل كشف الحساب
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </NewMainLayout>
  );
};

export default Profile;
