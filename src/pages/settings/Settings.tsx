
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { name, email } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: name || '',
    bio: '',
    location: 'الرياض، المملكة العربية السعودية',
    phone: '+966 123456789'
  });

  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    browser: true,
    groupUpdates: true,
    offerUpdates: true,
    paymentUpdates: true,
    marketingUpdates: false
  });

  // Account settings
  const [accountSettings, setAccountSettings] = useState({
    language: 'ar',
    theme: 'light',
    twoFactorAuth: false
  });

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "تم تحديث الملف الشخصي",
      description: "تم حفظ التغييرات بنجاح",
    });
  };

  const handleNotificationUpdate = () => {
    toast({
      title: "تم تحديث إعدادات الإشعارات",
      description: "تم حفظ التغييرات بنجاح",
    });
  };

  const handleAccountUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "تم تحديث إعدادات الحساب",
      description: "تم حفظ التغييرات بنجاح",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">الإعدادات</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="profile">الملف الشخصي</TabsTrigger>
            <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
            <TabsTrigger value="account">الحساب</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات الملف الشخصي</CardTitle>
                <CardDescription>إدارة معلومات ملفك الشخصي</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">الاسم</Label>
                        <Input 
                          id="name" 
                          value={profileForm.name} 
                          onChange={(e) => setProfileForm({...profileForm, name: e.target.value})}
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">البريد الإلكتروني</Label>
                        <Input 
                          id="email" 
                          value={email} 
                          disabled 
                          className="h-12 bg-muted/40"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">نبذة تعريفية</Label>
                      <Textarea
                        id="bio"
                        value={profileForm.bio}
                        onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})}
                        placeholder="اكتب نبذة قصيرة عن نفسك..."
                        rows={4}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">الموقع</Label>
                        <Input 
                          id="location" 
                          value={profileForm.location} 
                          onChange={(e) => setProfileForm({...profileForm, location: e.target.value})}
                          className="h-12"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">رقم الهاتف</Label>
                        <Input 
                          id="phone" 
                          value={profileForm.phone} 
                          onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})}
                          className="h-12"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">حفظ التغييرات</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات الإشعارات</CardTitle>
                <CardDescription>تخصيص كيفية استلام الإشعارات</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">قنوات الإشعارات</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">البريد الإلكتروني</p>
                          <p className="text-sm text-muted-foreground">استلام الإشعارات عبر البريد الإلكتروني</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.email}
                          onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, email: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">إشعارات المتصفح</p>
                          <p className="text-sm text-muted-foreground">استلام إشعارات فورية في المتصفح</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.browser}
                          onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, browser: checked})}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">أنواع الإشعارات</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">تحديثات المجموعات</p>
                          <p className="text-sm text-muted-foreground">إشعارات حول نشاط المجموعات التي تنتمي إليها</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.groupUpdates}
                          onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, groupUpdates: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">تحديثات العروض</p>
                          <p className="text-sm text-muted-foreground">إشعارات حول العروض الجديدة والمقبولة</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.offerUpdates}
                          onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, offerUpdates: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">تحديثات المدفوعات</p>
                          <p className="text-sm text-muted-foreground">إشعارات حول المعاملات المالية</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.paymentUpdates}
                          onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, paymentUpdates: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">تحديثات تسويقية</p>
                          <p className="text-sm text-muted-foreground">نصائح وعروض وإعلانات من منصة GPO</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.marketingUpdates}
                          onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, marketingUpdates: checked})}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleNotificationUpdate}>حفظ التغييرات</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="account">
            <Card>
              <CardHeader>
                <CardTitle>إعدادات الحساب</CardTitle>
                <CardDescription>إدارة إعدادات حسابك وتفضيلاتك</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAccountUpdate} className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="language">اللغة</Label>
                      <select
                        id="language"
                        value={accountSettings.language}
                        onChange={(e) => setAccountSettings({...accountSettings, language: e.target.value})}
                        className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="ar">العربية</option>
                        <option value="en">English</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="theme">المظهر</Label>
                      <select
                        id="theme"
                        value={accountSettings.theme}
                        onChange={(e) => setAccountSettings({...accountSettings, theme: e.target.value})}
                        className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="light">فاتح</option>
                        <option value="dark">داكن</option>
                        <option value="system">حسب النظام</option>
                      </select>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4">
                      <div>
                        <p className="font-medium">المصادقة الثنائية</p>
                        <p className="text-sm text-muted-foreground">تعزيز أمان حسابك باستخدام المصادقة الثنائية</p>
                      </div>
                      <Switch 
                        checked={accountSettings.twoFactorAuth}
                        onCheckedChange={(checked) => setAccountSettings({...accountSettings, twoFactorAuth: checked})}
                      />
                    </div>
                    
                    <div className="pt-6 border-t mt-6">
                      <h3 className="text-lg font-semibold mb-4 text-red-500">خيارات خطيرة</h3>
                      <div className="flex justify-between">
                        <div>
                          <p className="font-medium">حذف الحساب</p>
                          <p className="text-sm text-muted-foreground">سيتم حذف حسابك وجميع بياناتك نهائيًا</p>
                        </div>
                        <Button variant="destructive">حذف الحساب</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">حفظ التغييرات</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Settings;
