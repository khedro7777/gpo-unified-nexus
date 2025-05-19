
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, Users, BarChart3, Store, Building, FileCheck, Gavel, CodeSquare, Search, Filter } from 'lucide-react';
import ActiveGroups from '@/components/groups/ActiveGroups';
import ServiceRequests from '@/components/services/ServiceRequests';

const portals = [
  {
    id: 'cooperative-purchasing',
    title: 'الشراء التعاوني',
    description: 'تجميع المشتريات للحصول على أفضل الأسعار والشروط',
    icon: <ShoppingCart className="h-10 w-10 text-primary" />,
    link: '/services',
    hasCollective: true,
    type: 'web2'
  },
  {
    id: 'group-marketing',
    title: 'التسويق الجماعي',
    description: 'حملات تسويقية موحدة مع مشاركة التكلفة والفوائد',
    icon: <BarChart3 className="h-10 w-10 text-primary" />,
    link: '/services',
    hasCollective: false,
    type: 'web2'
  },
  {
    id: 'freelancers',
    title: 'بوابة المستقلين',
    description: 'فرص عمل للمستقلين مع إدارة العقود والمدفوعات',
    icon: <Users className="h-10 w-10 text-primary" />,
    link: '/dao',
    hasCollective: true,
    type: 'web3'
  },
  {
    id: 'suppliers',
    title: 'بوابة الموردين',
    description: 'تقديم المنتجات والخدمات للشركات والتعاونيات',
    icon: <Store className="h-10 w-10 text-primary" />,
    link: '/services',
    hasCollective: false,
    type: 'web2'
  },
  {
    id: 'company-formation',
    title: 'تأسيس الشركات والجمعيات',
    description: 'إنشاء الكيانات القانونية والتعاونية بسهولة',
    icon: <Building className="h-10 w-10 text-primary" />,
    link: '/legal',
    hasCollective: false,
    type: 'web3'
  },
  {
    id: 'verification',
    title: 'الاستعلام والتوثيق',
    description: 'خدمات التحقق من المعلومات وتوثيق المستندات',
    icon: <FileCheck className="h-10 w-10 text-primary" />,
    link: '/services',
    hasCollective: false,
    type: 'web2'
  },
  {
    id: 'arbitration',
    title: 'التحكيم وفض المنازعات',
    description: 'حل النزاعات بطرق عادلة وفعالة',
    icon: <Gavel className="h-10 w-10 text-primary" />,
    link: '/legal',
    hasCollective: false,
    type: 'web3'
  },
  {
    id: 'smart-contracts',
    title: 'مكتبة العقود الذكية',
    description: 'نماذج عقود ذكية جاهزة للاستخدام',
    icon: <CodeSquare className="h-10 w-10 text-primary" />,
    link: '/legal',
    hasCollective: false,
    type: 'web3'
  }
];

const Index = () => {
  const [filterType, setFilterType] = useState<'all' | 'web2' | 'web3'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [serviceType, setServiceType] = useState('all');

  const filteredPortals = portals.filter(portal => {
    const matchesType = filterType === 'all' || portal.type === filterType;
    const matchesSearch = portal.title.includes(searchTerm) || portal.description.includes(searchTerm);
    return matchesType && matchesSearch;
  });

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">منصة GPO MCP الذكية</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            البوابة الموحدة للخدمات التعاونية والإدارة الجماعية
          </p>
        </div>

        <div className="bg-muted/30 p-6 rounded-lg">
          <div className="flex flex-col md:flex-row gap-4 items-start justify-between mb-6">
            <div className="w-full md:w-1/2 relative">
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="ابحث عن الخدمات..."
                className="pr-10"
                dir="rtl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div>
                <h3 className="text-sm font-medium mb-1">نوع الخدمة</h3>
                <Select value={serviceType} onValueChange={setServiceType}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="جميع الخدمات" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الخدمات</SelectItem>
                    <SelectItem value="purchasing">خدمات الشراء</SelectItem>
                    <SelectItem value="marketing">خدمات التسويق</SelectItem>
                    <SelectItem value="legal">خدمات قانونية</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">فلترة الخدمات</h3>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant={filterType === 'web2' ? "default" : "outline"} 
                    className="h-10 px-3" 
                    onClick={() => setFilterType('web2')}
                  >
                    WEB2
                  </Button>
                  <Button 
                    size="sm" 
                    variant={filterType === 'web3' ? "default" : "outline"} 
                    className="h-10 px-3" 
                    onClick={() => setFilterType('web3')}
                  >
                    WEB3
                  </Button>
                  <Button 
                    size="sm" 
                    variant={filterType === 'all' ? "default" : "outline"} 
                    className="h-10 px-3" 
                    onClick={() => setFilterType('all')}
                  >
                    جميع الخدمات
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
            {filteredPortals.length > 0 ? (
              filteredPortals.map((portal) => (
                <Card key={portal.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      {portal.icon}
                      {portal.hasCollective && (
                        <Tabs defaultValue="individual" className="w-auto">
                          <TabsList className="h-7">
                            <TabsTrigger className="text-xs h-6 px-2" value="individual">فردي</TabsTrigger>
                            <TabsTrigger className="text-xs h-6 px-2" value="collective">جماعي</TabsTrigger>
                          </TabsList>
                        </Tabs>
                      )}
                    </div>
                    <CardTitle className="mt-4 text-right">{portal.title}</CardTitle>
                    <CardDescription className="text-right">{portal.description}</CardDescription>
                  </CardHeader>
                  <CardContent></CardContent>
                  <CardFooter className="flex justify-center pt-0 pb-4">
                    <Button asChild>
                      <Link to={`${portal.link}/details/${portal.id}`}>عرض التفاصيل</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-10">
                <p className="text-muted-foreground">لا توجد خدمات تطابق معايير البحث</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm('');
                    setFilterType('all');
                    setServiceType('all');
                  }}
                >
                  إعادة ضبط البحث
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* إضافة مكون المجموعات النشطة */}
        <div className="bg-muted/30 p-6 rounded-lg">
          <ActiveGroups />
        </div>

        {/* إضافة مكون طلبات الخدمات */}
        <div className="bg-muted/30 p-6 rounded-lg">
          <ServiceRequests />
        </div>

        <div className="flex flex-col md:flex-row gap-6 mt-8">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="text-lg">من نحن</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                منصة GPO MCP هي منصة متكاملة للعقود التعاونية الذكية، تجمع بين تقنيات WEB2 و WEB3 لتوفير حلول متكاملة للمشتريات الجماعية والتعاون المؤسسي.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/about">
                <Button variant="outline">المزيد عنا</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="text-lg">كيف تعمل المنصة</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                اكتشف كيفية استخدام المنصة والاستفادة من الخدمات المتاحة. يمكنك البدء بإنشاء حساب والانضمام إلى مجموعات الشراء التعاوني أو استكشاف الخدمات الأخرى.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/how-it-works">
                <Button variant="outline">عرض الدليل التفاعلي</Button>
              </Link>
            </CardFooter>
          </Card>

          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="text-lg">رسالتنا</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                نهدف إلى تمكين المؤسسات والشركات من العمل معًا بطريقة أكثر كفاءة وشفافية، وتعزيز التعاون الاقتصادي من خلال تقنيات ذكية وعقود شفافة.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/mission">
                <Button variant="outline">رسالتنا الكاملة</Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
