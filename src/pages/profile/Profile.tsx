
import React from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, MapPin, Calendar, Star } from 'lucide-react';

const Profile = () => {
  return (
    <NewMainLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">ملفي الشخصي</h1>
        <p className="text-muted-foreground">
          إدارة معلوماتك الشخصية وإعدادات حسابك
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                المعلومات الشخصية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>user@example.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>+966 50 123 4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>الرياض، المملكة العربية السعودية</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>انضم في مايو 2025</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                الإحصائيات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>المجموعات النشطة</span>
                <Badge variant="default">5</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>العروض المرسلة</span>
                <Badge variant="secondary">12</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>التقييم</span>
                <Badge variant="outline">4.8/5</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span>المشاريع المكتملة</span>
                <Badge variant="outline">23</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>إعدادات سريعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button variant="outline" className="justify-start">
                تحديث المعلومات الشخصية
              </Button>
              <Button variant="outline" className="justify-start">
                إدارة كلمة المرور
              </Button>
              <Button variant="outline" className="justify-start">
                إعدادات الإشعارات
              </Button>
              <Button variant="outline" className="justify-start">
                إعدادات الخصوصية
              </Button>
              <Button variant="outline" className="justify-start">
                ربط المحفظة
              </Button>
              <Button variant="outline" className="justify-start">
                سجل النشاطات
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </NewMainLayout>
  );
};

export default Profile;
