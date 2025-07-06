
import React from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, MapPin, Calendar, Star } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

const Profile = () => {
  const { user, email, name } = useAuth();
  
  return (
    <NewMainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl md:text-3xl font-bold">ملفي الشخصي</h1>
        <p className="text-muted-foreground text-sm md:text-base">
          إدارة معلوماتك الشخصية وإعدادات حسابك
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <User className="h-4 w-4 md:h-5 md:w-5" />
                المعلومات الشخصية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-sm md:text-base">{email || user?.email || 'user@example.com'}</span>
              </div>
              <div className="flex items-center gap-3">
                <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-sm md:text-base">{name || user?.user_metadata?.full_name || 'مستخدم'}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-sm md:text-base">+966 50 123 4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-sm md:text-base">الرياض، المملكة العربية السعودية</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <span className="text-sm md:text-base">انضم في مايو 2025</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base md:text-lg">
                <Star className="h-4 w-4 md:h-5 md:w-5" />
                الإحصائيات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm md:text-base">المجموعات النشطة</span>
                <Badge variant="default">5</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm md:text-base">العروض المرسلة</span>
                <Badge variant="secondary">12</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm md:text-base">التقييم</span>
                <Badge variant="outline">4.8/5</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm md:text-base">المشاريع المكتملة</span>
                <Badge variant="outline">23</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base md:text-lg">إعدادات سريعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              <Button variant="outline" className="justify-start text-xs md:text-sm">
                تحديث المعلومات الشخصية
              </Button>
              <Button variant="outline" className="justify-start text-xs md:text-sm">
                إدارة كلمة المرور
              </Button>
              <Button variant="outline" className="justify-start text-xs md:text-sm">
                إعدادات الإشعارات
              </Button>
              <Button variant="outline" className="justify-start text-xs md:text-sm">
                إعدادات الخصوصية
              </Button>
              <Button variant="outline" className="justify-start text-xs md:text-sm">
                ربط المحفظة
              </Button>
              <Button variant="outline" className="justify-start text-xs md:text-sm">
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
