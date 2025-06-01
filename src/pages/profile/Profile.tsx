
import React from 'react';
import SimplifiedLayout from '@/components/layout/SimplifiedLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/use-auth';
import { User, Mail, Phone, Globe } from 'lucide-react';

const Profile = () => {
  const { name, email, role } = useAuth();
  
  return (
    <SimplifiedLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">الملف الشخصي</h1>
        <p className="text-muted-foreground">
          إدارة معلوماتك الشخصية وإعدادات الحساب
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>المعلومات الشخصية</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="الاسم الكامل" 
                      className="pl-10" 
                      defaultValue={name || ''}
                      dir="rtl"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="البريد الإلكتروني" 
                      className="pl-10" 
                      defaultValue={email || ''}
                      readOnly
                      dir="rtl"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="رقم الهاتف" 
                      className="pl-10"
                      dir="rtl"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="w-full">
                    <Label htmlFor="country">الدولة</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Select>
                        <SelectTrigger className="pl-10">
                          <SelectValue placeholder="اختر الدولة" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sa">السعودية</SelectItem>
                          <SelectItem value="ae">الإمارات</SelectItem>
                          <SelectItem value="kw">الكويت</SelectItem>
                          <SelectItem value="qa">قطر</SelectItem>
                          <SelectItem value="bh">البحرين</SelectItem>
                          <SelectItem value="om">عُمان</SelectItem>
                          <SelectItem value="eg">مصر</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="w-full">
                    <Label htmlFor="language">اللغة المفضلة</Label>
                    <Select defaultValue="ar">
                      <SelectTrigger>
                        <SelectValue placeholder="اختر اللغة" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ar">العربية</SelectItem>
                        <SelectItem value="en">الإنجليزية</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button className="w-full mt-4">حفظ التغييرات</Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>معلومات الحساب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-medium">دورك الحالي</p>
                  <p className="text-lg">
                    {role === 'freelancer' && 'مستقل'}
                    {role === 'buyer' && 'مشتري'}
                    {role === 'supplier' && 'مورد'}
                    {role === 'founder' && 'مؤسس شركات'}
                    {role === 'admin' && 'مسؤول النظام'}
                  </p>
                </div>
                
                <div>
                  <p className="text-sm font-medium">حالة الحساب</p>
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-green-500 mr-2" />
                    <p>نشط</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-sm font-medium">تاريخ الانضمام</p>
                  <p>20 مايو 2025</p>
                </div>
                
                <div className="pt-4 mt-4 border-t">
                  <Label className="text-sm font-medium">تغيير الدور</Label>
                  <Select>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="اختر دورًا جديدًا" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="freelancer">مستقل</SelectItem>
                      <SelectItem value="buyer">مشتري</SelectItem>
                      <SelectItem value="supplier">مورد</SelectItem>
                      <SelectItem value="founder">مؤسس شركات</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="w-full mt-2">
                    تحديث الدور
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SimplifiedLayout>
  );
};

export default Profile;
