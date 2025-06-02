
import React from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import TabSystem from '@/components/tabs/TabSystem';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Users, Star, Clock } from 'lucide-react';

const AvailableJobs = () => (
  <div className="space-y-6">
    <div className="grid gap-4">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">مطور واجهات أمامية</CardTitle>
                <CardDescription>تطوير واجهة مستخدم لمنصة التجارة الإلكترونية</CardDescription>
              </div>
              <Badge variant={i % 2 === 0 ? "default" : "secondary"}>
                {i % 2 === 0 ? "عاجل" : "عادي"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  {2 + i} أسابيع
                </div>
                <div className="flex items-center gap-1">
                  <Star size={14} />
                  4.{5 + i}/5
                </div>
              </div>
              <div className="font-semibold text-lg">
                ${(1000 + i * 500).toLocaleString()}
              </div>
            </div>
            <Button className="w-full">تقديم عرض</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

const MyProjects = () => (
  <div className="space-y-6">
    <div className="grid gap-4">
      {[1, 2].map((i) => (
        <Card key={i}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">مشروع تطوير موقع الكتروني</CardTitle>
                <CardDescription>تطوير موقع كامل للشركة التجارية</CardDescription>
              </div>
              <Badge variant={i === 1 ? "default" : "secondary"}>
                {i === 1 ? "قيد التنفيذ" : "مكتمل"}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                بدأ في: 2025-0{4 + i}-15
              </div>
              <div className="font-semibold">
                ${(2000 * i).toLocaleString()}
              </div>
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
        <h1 className="text-3xl font-bold">وظائف المستقلين</h1>
        <p className="text-muted-foreground">
          استكشف الفرص المتاحة وإدارة مشاريعك
        </p>
        <TabSystem tabs={tabs} />
      </div>
    </NewMainLayout>
  );
};

export default Freelance;
