
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart, BarChart3, Users, Store, Building, FileCheck, Gavel, CodeSquare, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import ActiveGroups from '@/components/groups/ActiveGroups';
import ServiceRequests from '@/components/services/ServiceRequests';

const portals = [
  {
    id: 'purchasing',
    title: 'الشراء التعاوني',
    description: 'نظام شراء جماعي للحصول على أفضل الأسعار والشروط',
    icon: <ShoppingCart className="h-8 w-8" />,
    type: 'web2',
    collectiveOption: true,
    link: '/services/details/cooperative-purchasing'
  },
  {
    id: 'marketing',
    title: 'التسويق الجماعي',
    description: 'حملات تسويقية مشتركة لتقليل التكاليف وزيادة الوصول',
    icon: <BarChart3 className="h-8 w-8" />,
    type: 'web2',
    collectiveOption: true,
    link: '/services/details/group-marketing'
  },
  {
    id: 'freelancers',
    title: 'بوابة المستقلين',
    description: 'منصة للمستقلين للعمل فرديًا أو ضمن مجموعات DAO',
    icon: <Users className="h-8 w-8" />,
    type: 'web3',
    collectiveOption: true,
    link: '/services/details/freelancers-portal'
  },
  {
    id: 'suppliers',
    title: 'بوابة الموردين',
    description: 'نظام متكامل للموردين لتقديم العروض والخدمات',
    icon: <Store className="h-8 w-8" />,
    type: 'web2',
    collectiveOption: false,
    link: '/services/details/suppliers-portal'
  },
  {
    id: 'company-establishment',
    title: 'تأسيس الشركات والجمعيات',
    description: 'خدمات تأسيس الشركات والجمعيات بشكل سريع وفعال',
    icon: <Building className="h-8 w-8" />,
    type: 'web2',
    collectiveOption: false,
    link: '/services/details/company-establishment'
  },
  {
    id: 'verification',
    title: 'الاستعلام والتوثيق',
    description: 'خدمات التحقق من المعلومات وتوثيق المستندات',
    icon: <FileCheck className="h-8 w-8" />,
    type: 'web3',
    collectiveOption: false,
    link: '/services/details/verification'
  },
  {
    id: 'dispute-resolution',
    title: 'التحكيم وفض المنازعات',
    description: 'نظام ORDA لفض المنازعات والتحكيم الإلكتروني',
    icon: <Gavel className="h-8 w-8" />,
    type: 'web3',
    collectiveOption: false,
    link: '/services/details/dispute-resolution'
  },
  {
    id: 'smart-contracts',
    title: 'مكتبة العقود الذكية',
    description: 'مجموعة من العقود الذكية القابلة للتخصيص',
    icon: <CodeSquare className="h-8 w-8" />,
    type: 'web3',
    collectiveOption: false,
    link: '/services/details/smart-contracts'
  }
];

const Index = () => {
  const [portalType, setPortalType] = useState<'all' | 'web2' | 'web3'>('all');
  const [searchText, setSearchText] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('portals');
  
  // Filter portals based on search and filters
  const filteredPortals = portals.filter(portal => {
    const matchesType = portalType === 'all' || portal.type === portalType;
    const matchesSearch = portal.title.toLowerCase().includes(searchText.toLowerCase()) ||
                          portal.description.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || portal.id === categoryFilter;
    
    return matchesType && matchesSearch && matchesCategory;
  });
  
  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="text-center py-12 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg">
          <h1 className="text-4xl font-bold">منصة GPO للعقود التعاونية الذكية</h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
            نظام متكامل للتعاون والتنظيم بين مختلف الأطراف، بدعم من تقنيات الذكاء الاصطناعي والعقود الذكية.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/services">استكشاف الخدمات</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/how-it-works">كيف تعمل المنصة</Link>
            </Button>
          </div>
        </div>
        
        <div className="bg-muted/30 p-4 rounded-lg">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="ابحث عن البوابات والخدمات..." 
                className="pl-10" 
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={portalType} onValueChange={(value) => setPortalType(value as any)}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="نوع البوابة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">الكل</SelectItem>
                  <SelectItem value="web2">WEB2</SelectItem>
                  <SelectItem value="web3">WEB3</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="التصنيف" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">جميع التصنيفات</SelectItem>
                  <SelectItem value="purchasing">الشراء التعاوني</SelectItem>
                  <SelectItem value="marketing">التسويق الجماعي</SelectItem>
                  <SelectItem value="freelancers">المستقلين</SelectItem>
                  <SelectItem value="suppliers">الموردين</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="portals" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="portals">البوابات الرئيسية</TabsTrigger>
            <TabsTrigger value="groups">المجموعات النشطة</TabsTrigger>
            <TabsTrigger value="requests">طلبات الخدمات</TabsTrigger>
          </TabsList>
          
          <TabsContent value="portals">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPortals.map(portal => (
                <Link to={portal.link} key={portal.id} className="block">
                  <Card className="h-full hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="bg-primary/10 p-3 rounded-lg">
                          {portal.icon}
                        </div>
                        <Badge variant={portal.type === 'web2' ? 'outline' : 'default'}>
                          {portal.type.toUpperCase()}
                        </Badge>
                      </div>
                      <CardTitle className="mt-4">{portal.title}</CardTitle>
                      <CardDescription>{portal.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {portal.collectiveOption && (
                        <div className="mt-2">
                          <Badge variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-50 ml-2">فردي</Badge>
                          <Badge variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-50">جماعي</Badge>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="groups">
            <ActiveGroups />
          </TabsContent>
          
          <TabsContent value="requests">
            <ServiceRequests />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Index;
