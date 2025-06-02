
import React from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import TabSystem from '@/components/tabs/TabSystem';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Users, Star, Clock, DollarSign, Calendar } from 'lucide-react';

const AvailableJobs = () => (
  <div className="space-y-6">
    <div className="grid gap-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">مطور واجهات أمامية - React</CardTitle>
                <CardDescription>
                  تطوير واجهة مستخدم حديثة لمنصة التجارة الإلكترونية باستخدام React و TypeScript
                </CardDescription>
              </div>
              <Badge variant={i % 2 === 0 ? "default" : "secondary"}>
                {i % 2 === 0 ? "عاجل" : "عادي"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock size={14} />
                {2 + i} أسابيع
              </div>
              <div className="flex items-center gap-1">
                <Star size={14} />
                4.{5 + i}/5
              </div>
              <div className="flex items-center gap-1">
                <DollarSign size={14} />
                ${(1000 + i * 500).toLocaleString()}
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                يبدأ خلال أسبوع
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {['React', 'TypeScript', 'Tailwind CSS', 'API Integration'].map((skill) => (
                <Badge key={skill} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Button className="flex-1">تقديم عرض</Button>
              <Button variant="outline">عرض التفاصيل</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

const MyProjects = () => (
  <div className="space-y-6">
    <div className="grid gap-4">
      {[1, 2, 3].map((i) => (
        <Card key={i}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">مشروع تطوير موقع إلكتروني</CardTitle>
                <CardDescription>
                  تطوير موقع كامل للشركة التجارية مع لوحة إدارة
                </CardDescription>
              </div>
              <Badge variant={i === 1 ? "default" : i === 2 ? "secondary" : "outline"}>
                {i === 1 ? "قيد التنفيذ" : i === 2 ? "في المراجعة" : "مكتمل"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <span className="text-muted-foreground">بدأ في: </span>
                2025-0{4 + i}-15
              </div>
              <div>
                <span className="text-muted-foreground">المدة: </span>
                {3 + i} أسابيع
              </div>
              <div>
                <span className="text-muted-foreground">العميل: </span>
                شركة التجارة الرقمية
              </div>
              <div className="font-semibold">
                ${(2000 * i).toLocaleString()}
              </div>
            </div>
            
            {i === 1 && (
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>التقدم</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full w-3/4"></div>
                </div>
              </div>
            )}
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">عرض التفاصيل</Button>
              {i === 1 && <Button size="sm">رفع التحديث</Button>}
              {i === 2 && <Button size="sm">إرسال للمراجعة</Button>}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

const Freelance = () => {
  const tabs = [
    {
      id: 'available',
      title: 'الوظائف المتاحة',
      icon: <Briefcase size={16} />,
      content: <AvailableJobs />
    },
    {
      id: 'my-projects',
      title: 'مشاريعي',
      icon: <Users size={16} />,
      content: <MyProjects />
    }
  ];

  return (
    <NewMainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">وظائف المستقلين</h1>
          <p className="text-muted-foreground">
            استكشف الفرص المتاحة وإدارة مشاريعك مع دعم مساعد Rasa الذكي
          </p>
        </div>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="text-2xl font-bold text-primary">24</div>
            <div className="text-sm text-muted-foreground">وظائف متاحة</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-green-600">3</div>
            <div className="text-sm text-muted-foreground">مشاريع نشطة</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-blue-600">$12,500</div>
            <div className="text-sm text-muted-foreground">الأرباح هذا الشهر</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-purple-600">4.8</div>
            <div className="text-sm text-muted-foreground">تقييم العملاء</div>
          </Card>
        </div>
        
        <TabSystem tabs={tabs} />
      </div>
    </NewMainLayout>
  );
};

export default Freelance;
