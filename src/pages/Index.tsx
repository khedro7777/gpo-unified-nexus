
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, BarChart3, Users, Building, Store, Search, Globe, Tag } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const portals = [
  {
    id: 'purchasing',
    title: 'الشراء التعاوني',
    description: 'نظام شراء جماعي للحصول على أفضل الأسعار والشروط',
    icon: <ShoppingCart className="h-8 w-8" />,
    type: 'web2',
    collectiveOption: true,
  },
  {
    id: 'marketing',
    title: 'التسويق الجماعي',
    description: 'حملات تسويقية مشتركة لتقليل التكاليف وزيادة الوصول',
    icon: <BarChart3 className="h-8 w-8" />,
    type: 'web2',
    collectiveOption: true,
  },
  {
    id: 'freelancers',
    title: 'بوابة المستقلين',
    description: 'منصة للمستقلين للعمل فرديًا أو ضمن مجموعات DAO',
    icon: <Users className="h-8 w-8" />,
    type: 'web3',
    collectiveOption: true,
  },
  {
    id: 'suppliers',
    title: 'بوابة الموردين',
    description: 'نظام متكامل للموردين لتقديم العروض والخدمات',
    icon: <Store className="h-8 w-8" />,
    type: 'web2',
    collectiveOption: false,
  },
  {
    id: 'company-establishment',
    title: 'تأسيس الشركات والجمعيات',
    description: 'خدمات تأسيس الشركات والجمعيات بشكل سريع وفعال',
    icon: <Building className="h-8 w-8" />,
    type: 'web2',
    collectiveOption: false,
  },
];

// Sample active groups data
const activeGroups = [
  {
    id: 'group-1',
    title: 'مجموعة شراء إلكترونيات',
    type: 'buying',
    members: 12,
    country: 'السعودية',
    status: 'active',
    needsFreelancer: false,
    rqfOpen: true,
  },
  {
    id: 'group-2',
    title: 'حملة تسويقية مشتركة',
    type: 'marketing',
    members: 8,
    country: 'الإمارات',
    status: 'active',
    needsFreelancer: true,
    rqfOpen: false,
  },
  {
    id: 'group-3',
    title: 'تطوير تطبيق موبايل',
    type: 'freelancers',
    members: 5,
    country: 'مصر',
    status: 'active',
    needsFreelancer: false,
    rqfOpen: false,
  }
];

const Index = () => {
  const [searchText, setSearchText] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sectorFilter, setSectorFilter] = useState<string>('all');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [language, setLanguage] = useState<string>('ar');
  const [country, setCountry] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('portals');
  
  // Filter portals based on search and filters
  const filteredPortals = portals.filter(portal => {
    const matchesSearch = portal.title.toLowerCase().includes(searchText.toLowerCase()) ||
                          portal.description.toLowerCase().includes(searchText.toLowerCase());
    const matchesType = typeFilter === 'all' || portal.type === typeFilter;
    
    return matchesSearch && matchesType;
  });
  
  // Filter active groups
  const filteredGroups = activeGroups.filter(group => {
    const matchesSearch = group.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesType = typeFilter === 'all' || group.type === typeFilter;
    const matchesRegion = regionFilter === 'all' || group.country === regionFilter;
    
    return matchesSearch && matchesType && matchesRegion;
  });
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-primary/5 py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
            <div className="w-full md:w-auto">
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="اللغة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ar">العربية</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-auto">
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger className="w-[150px]">
                  <Globe className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="الدولة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل الدول</SelectItem>
                  <SelectItem value="sa">السعودية</SelectItem>
                  <SelectItem value="ae">الإمارات</SelectItem>
                  <SelectItem value="eg">مصر</SelectItem>
                  <SelectItem value="kw">الكويت</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">منصة GPO – منصة التعاون الذكي</h1>
            <p className="text-xl text-muted-foreground mb-8">
              ابتكار نظم جديدة للتعاون والعمل المشترك عبر الخدمات المتكاملة والعقود الذكية
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/register">
                  التسجيل مجاناً
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/login">
                  تسجيل الدخول
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        {/* Search and Filters */}
        <div className="bg-muted/30 p-4 mb-8 rounded-lg">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="ابحث في المنصة..." 
                className="pl-10" 
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                dir="rtl"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="نوع الخدمة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">الكل</SelectItem>
                  <SelectItem value="web2">Web2</SelectItem>
                  <SelectItem value="web3">Web3</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sectorFilter} onValueChange={setSectorFilter}>
                <SelectTrigger className="w-[150px]">
                  <Tag className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="القطاع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل القطاعات</SelectItem>
                  <SelectItem value="tech">تكنولوجيا</SelectItem>
                  <SelectItem value="retail">تجزئة</SelectItem>
                  <SelectItem value="health">صحة</SelectItem>
                  <SelectItem value="edu">تعليم</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={regionFilter} onValueChange={setRegionFilter}>
                <SelectTrigger className="w-[150px]">
                  <Globe className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="المنطقة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">كل المناطق</SelectItem>
                  <SelectItem value="السعودية">السعودية</SelectItem>
                  <SelectItem value="الإمارات">الإمارات</SelectItem>
                  <SelectItem value="مصر">مصر</SelectItem>
                  <SelectItem value="الكويت">الكويت</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <Tabs defaultValue="portals" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-8 w-full md:w-auto">
            <TabsTrigger value="portals">البوابات الرئيسية</TabsTrigger>
            <TabsTrigger value="groups">المجموعات النشطة</TabsTrigger>
          </TabsList>
          
          <TabsContent value="portals">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {filteredPortals.map(portal => (
                <Link to={`/create-group/${portal.id}`} key={portal.id} className="block">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGroups.map(group => (
                <Card key={group.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge>
                        {group.type === 'buying' && 'شراء'}
                        {group.type === 'marketing' && 'تسويق'}
                        {group.type === 'freelancers' && 'مستقلين'}
                      </Badge>
                      <Badge variant="outline">{group.country}</Badge>
                    </div>
                    <CardTitle className="mt-2">{group.title}</CardTitle>
                    <CardDescription>
                      {group.members} أعضاء
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2 flex-wrap">
                      {group.needsFreelancer && (
                        <Badge variant="secondary">بحاجة إلى مستقلين</Badge>
                      )}
                      {group.rqfOpen && (
                        <Badge variant="secondary">RFQ مفتوح</Badge>
                      )}
                    </div>
                    
                    <div className="mt-4">
                      <Button asChild className="w-full">
                        <Link to={`/groups/${group.id}`}>
                          الانضمام للمجموعة
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {filteredGroups.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground">لا توجد مجموعات تطابق معايير البحث</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
