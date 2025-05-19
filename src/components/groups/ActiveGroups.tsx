
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, ShoppingCart, BarChart3, Globe } from 'lucide-react';

// نموذج بيانات للمجموعات النشطة
const activeGroups = [
  {
    id: 'group-purchase-electronics',
    title: 'مجموعة شراء الإلكترونيات',
    type: 'purchasing',
    category: 'collective',
    members: 28,
    country: 'السعودية',
    votesRequired: 15,
    votesReceived: 12,
    daysLeft: 5,
    icon: <ShoppingCart className="h-6 w-6 text-primary" />,
    description: 'مجموعة تعاونية لشراء أجهزة إلكترونية بكميات كبيرة للحصول على أسعار تفضيلية'
  },
  {
    id: 'group-marketing-campaign',
    title: 'حملة تسويقية مشتركة',
    type: 'marketing',
    category: 'collective',
    members: 12,
    country: 'مصر',
    votesRequired: 8,
    votesReceived: 8,
    daysLeft: 0,
    icon: <BarChart3 className="h-6 w-6 text-primary" />,
    description: 'حملة تسويقية مشتركة بين عدة شركات في قطاع التجزئة'
  },
  {
    id: 'group-freelancers-web',
    title: 'مجموعة مطوري الويب',
    type: 'freelancers',
    category: 'individual',
    members: 45,
    country: 'الإمارات',
    votesRequired: 30,
    votesReceived: 22,
    daysLeft: 3,
    icon: <Users className="h-6 w-6 text-primary" />,
    description: 'مجموعة من المطورين المستقلين للتعاون في مشاريع تطوير الويب'
  },
  {
    id: 'group-regional-suppliers',
    title: 'موردي المنطقة الشرقية',
    type: 'suppliers',
    category: 'collective',
    members: 32,
    country: 'السعودية',
    votesRequired: 20,
    votesReceived: 15,
    daysLeft: 7,
    icon: <Globe className="h-6 w-6 text-primary" />,
    description: 'مجموعة من الموردين في المنطقة الشرقية للتعاون في توريد المواد الأولية'
  }
];

const ActiveGroups: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'purchasing' | 'marketing' | 'freelancers' | 'suppliers'>('all');
  
  const filteredGroups = activeTab === 'all' 
    ? activeGroups 
    : activeGroups.filter(group => group.type === activeTab);

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-semibold">المجموعات النشطة</h2>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full sm:w-auto mt-2 sm:mt-0">
          <TabsList className="grid grid-cols-3 sm:grid-cols-5 w-full sm:w-auto">
            <TabsTrigger value="all">الكل</TabsTrigger>
            <TabsTrigger value="purchasing">الشراء</TabsTrigger>
            <TabsTrigger value="marketing">التسويق</TabsTrigger>
            <TabsTrigger value="freelancers">المستقلون</TabsTrigger>
            <TabsTrigger value="suppliers">الموردون</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredGroups.map((group) => (
          <Card key={group.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                {group.icon}
                <Badge variant={group.category === 'collective' ? 'default' : 'secondary'}>
                  {group.category === 'collective' ? 'جماعي' : 'فردي'}
                </Badge>
              </div>
              <CardTitle className="mt-4 text-xl">{group.title}</CardTitle>
              <CardDescription className="flex justify-between">
                <span>{group.country}</span>
                <span>{group.members} عضو</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{group.description}</p>
              <div className="bg-muted p-2 rounded flex justify-between text-sm">
                <span>التصويت: {group.votesReceived}/{group.votesRequired}</span>
                {group.daysLeft > 0 ? (
                  <span>متبقي {group.daysLeft} أيام</span>
                ) : (
                  <span className="text-green-500">مكتمل</span>
                )}
              </div>
            </CardContent>
            <CardFooter className="pt-0 pb-4 flex justify-center">
              <Button asChild>
                <Link to={`/groups/${group.id}`}>عرض المجموعة</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ActiveGroups;
