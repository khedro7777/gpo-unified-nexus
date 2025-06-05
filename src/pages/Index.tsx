import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, BarChart3, Users, Building, Store, Search, Globe, Tag, MessageSquare, FileText, Gavel, Shield } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { NavigationLinks } from '@/components/layout/navigation/NavigationLinks';
import { useAuth } from '@/hooks/use-auth';
import TopBar from '@/components/common/TopBar';

const portals = [
  {
    id: 'purchasing',
    title: 'الشراء التعاوني',
    description: 'نظام شراء جماعي ذكي مدعوم بالذكاء الاصطناعي للحصول على أفضل الأسعار والشروط',
    icon: <ShoppingCart className="h-6 w-6 text-white" />,
    type: 'web2',
    collectiveOption: true,
    route: '/create-group/purchasing',
    integrations: ['Paddle', 'Loomio', 'Snapshot']
  },
  {
    id: 'marketing',
    title: 'التسويق الجماعي',
    description: 'حملات تسويقية مشتركة ذكية لتقليل التكاليف وزيادة الوصول للجمهور المستهدف',
    icon: <BarChart3 className="h-6 w-6 text-white" />,
    type: 'web2',
    collectiveOption: true,
    route: '/create-group/marketing',
    integrations: ['Paddle', 'Loomio']
  },
  {
    id: 'freelancers',
    title: 'المستقلون',
    description: 'منصة متقدمة للمستقلين مع دعم العقود الذكية وإدارة المشاريع بالذكاء الاصطناعي',
    icon: <Users className="h-6 w-6 text-white" />,
    type: 'web3',
    collectiveOption: true,
    route: '/freelance',
    integrations: ['OpenZeppelin', 'IPFS']
  },
  {
    id: 'suppliers',
    title: 'الموردون',
    description: 'نظام متكامل للموردين مع تقييم ذكي وإدارة العقود الرقمية',
    icon: <Store className="h-6 w-6 text-white" />,
    type: 'web2',
    collectiveOption: false,
    route: '/suppliers',
    integrations: ['Paddle', 'ODR']
  },
  {
    id: 'company-incorporation',
    title: 'تأسيس الشركات',
    description: 'خدمات تأسيس الشركات الذكية في أفضل الولايات القضائية العالمية مع دعم DAO',
    icon: <Building className="h-6 w-6 text-white" />,
    type: 'web3',
    collectiveOption: false,
    route: '/company-incorporation',
    integrations: ['OpenZeppelin', 'Snapshot', 'Strapi']
  },
  {
    id: 'arbitration',
    title: 'التحكيم التجاري الذكي',
    description: 'نظام ORDA المدعوم بالذكاء الاصطناعي لحل النزاعات التجارية بطريقة عادلة وسريعة',
    icon: <Gavel className="h-6 w-6 text-white" />,
    type: 'web2',
    collectiveOption: false,
    route: '/arbitration',
    integrations: ['ODR', 'IPFS']
  },
  {
    id: 'document-management',
    title: 'إدارة الوثائق اللامركزية',
    description: 'رفع وتوثيق وحفظ الملفات بتقنية IPFS اللامركزية مع ضمان الأمان والتوثيق',
    icon: <FileText className="h-6 w-6 text-white" />,
    type: 'web3',
    collectiveOption: false,
    route: '/documents',
    integrations: ['IPFS', 'OpenZeppelin']
  },
  {
    id: 'dao-governance',
    title: 'حوكمة DAO الذكية',
    description: 'إدارة المنظمات اللامركزية والتصويت الذكي باستخدام Snapshot.js وLoomio',
    icon: <Shield className="h-6 w-6 text-white" />,
    type: 'web3',
    collectiveOption: true,
    route: '/governance',
    integrations: ['Snapshot', 'Loomio', 'OpenZeppelin']
  }
];

// Sample active groups data
const activeGroups = [
  {
    id: 'group-1',
    title: 'مجموعة شراء أجهزة إلكترونية',
    type: 'buying',
    members: 24,
    country: 'السعودية',
    status: 'active',
    needsFreelancer: false,
    rqfOpen: true,
  },
  {
    id: 'group-2',
    title: 'حملة تسويقية لمنتجات صحية',
    type: 'marketing',
    members: 18,
    country: 'الإمارات',
    status: 'active',
    needsFreelancer: true,
    rqfOpen: false,
  },
  {
    id: 'group-3',
    title: 'تطوير منصة تعليمية',
    type: 'freelancers',
    members: 15,
    country: 'مصر',
    status: 'active',
    needsFreelancer: false,
    rqfOpen: false,
  }
];

const YouTubeEmbed: React.FC<{videoId: string}> = ({ videoId }) => {
  return (
    <div className="relative w-full max-w-md aspect-video rounded-lg overflow-hidden">
      <iframe 
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        className="absolute top-0 left-0 w-full h-full"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen>
      </iframe>
    </div>
  );
};

const Index = () => {
  const [searchText, setSearchText] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sectorFilter, setSectorFilter] = useState<string>('all');
  const [regionFilter, setRegionFilter] = useState<string>('all');
  const [language, setLanguage] = useState<string>('ar');
  const [country, setCountry] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('portals');
  const { isAuthenticated } = useAuth();
  
  // Filter groups
  const filteredGroups = activeGroups.filter(group => {
    const matchesSearch = group.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesType = typeFilter === 'all' || group.type === typeFilter;
    const matchesRegion = regionFilter === 'all' || group.country === regionFilter;
    
    return matchesSearch && matchesType && matchesRegion;
  });
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <TopBar />
      <Navbar />
      
      {/* Enhanced Hero Section with integrated systems branding */}
      <div className="bg-gradient-to-br from-primary/10 via-blue-500/5 to-purple-500/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-sm font-medium text-primary mb-6">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                AI-Powered Platform with Integrated Open Source Systems
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground leading-tight">
                GPO Smart
                <span className="block text-primary">Cooperation Platform</span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                منصة التعاون الذكي المدمجة مع أنظمة مفتوحة المصدر متقدمة: Paddle، Loomio، Snapshot.js، ODR، OpenZeppelin مع دعم Strapi CMS
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                <Badge className="bg-blue-500 hover:bg-blue-600 px-3 py-1">Paddle Billing</Badge>
                <Badge className="bg-green-500 hover:bg-green-600 px-3 py-1">Loomio Voting</Badge>
                <Badge className="bg-purple-500 hover:bg-purple-600 px-3 py-1">Snapshot.js DAO</Badge>
                <Badge className="bg-orange-500 hover:bg-orange-600 px-3 py-1">ORDA Arbitration</Badge>
                <Badge className="bg-indigo-500 hover:bg-indigo-600 px-3 py-1">OpenZeppelin Governor</Badge>
                <Badge className="bg-pink-500 hover:bg-pink-600 px-3 py-1">Strapi CMS</Badge>
                <Badge className="bg-red-500 hover:bg-red-600 px-3 py-1">IPFS Storage</Badge>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all">
                  ابدأ رحلتك الذكية
                  <span className="mr-2">→</span>
                </Button>
                <Button size="lg" variant="outline" className="px-8 py-6 text-lg">
                  جولة تفاعلية في الأنظمة المدمجة
                </Button>
              </div>
            </div>
            
            <div className="w-full lg:w-auto">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl blur-3xl"></div>
                <YouTubeEmbed videoId="dQw4w9WgXcQ" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        {/* Enhanced Search and Filters */}
        <div className="bg-card rounded-2xl p-6 shadow-lg border mb-12">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="ابحث في المنصة الذكية..." 
                className="pl-12 h-12 text-lg bg-background border-0 focus:ring-2 focus:ring-primary/20" 
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                dir="rtl"
              />
            </div>
            <div className="flex gap-3 flex-wrap">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px] h-12">
                  <SelectValue placeholder="نوع الخدمة" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-900 border shadow-lg">
                  <SelectItem value="all">الكل</SelectItem>
                  <SelectItem value="buying">الشراء التعاوني</SelectItem>
                  <SelectItem value="marketing">التسويق الجماعي</SelectItem>
                  <SelectItem value="freelancers">المستقلون</SelectItem>
                  <SelectItem value="incorporation">تأسيس الشركات</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sectorFilter} onValueChange={setSectorFilter}>
                <SelectTrigger className="w-[180px] h-12">
                  <Tag className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="القطاع" />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-900 border shadow-lg">
                  <SelectItem value="all">كل القطاعات</SelectItem>
                  <SelectItem value="tech">تكنولوجيا</SelectItem>
                  <SelectItem value="retail">تجزئة</SelectItem>
                  <SelectItem value="health">صحة</SelectItem>
                  <SelectItem value="edu">تعليم</SelectItem>
                  <SelectItem value="finance">مالية</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* Enhanced Portal Cards with integration badges */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">البوابات الذكية المدمجة مع الأنظمة مفتوحة المصدر</h2>
          <p className="text-xl text-muted-foreground">كل بوابة مدمجة مع أنظمة متقدمة لتجربة متكاملة وموثوقة</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {portals.map((portal) => (
            <Link 
              to={portal.route} 
              key={portal.id} 
              className="block group"
            >
              <Card className="h-full hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 shadow-lg group-hover:scale-105 group-hover:-translate-y-2 bg-gradient-to-br from-card to-card/80">
                <div className="h-2 bg-gradient-to-r from-primary via-blue-500 to-purple-500"></div>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-6">
                    <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-3 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      {portal.icon}
                    </div>
                    <div className="flex flex-col gap-2">
                      {portal.collectiveOption && (
                        <Badge variant="outline" className="text-xs border-primary/20 bg-primary/5">
                          فردي / جماعي
                        </Badge>
                      )}
                      <Badge 
                        variant={portal.type === 'web3' ? 'default' : 'secondary'} 
                        className={`text-xs ${portal.type === 'web3' 
                          ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white' 
                          : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {portal.type === 'web3' ? 'Web3' : 'Web2'}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight mb-3 group-hover:text-primary transition-colors">
                    {portal.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3 text-sm leading-relaxed mb-4">
                    {portal.description}
                  </CardDescription>
                  
                  {/* Integration badges */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {portal.integrations.map((integration) => (
                      <Badge key={integration} variant="outline" className="text-xs">
                        {integration}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    variant="secondary" 
                    className="w-full mt-4 justify-between group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                  >
                    ابدأ مع الأنظمة المدمجة
                    <span className="mr-2 group-hover:translate-x-1 transition-transform">←</span>
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        
        {/* Active Groups Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center md:text-right">المجموعات النشطة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeGroups.slice(0, 3).map(group => (
              <Card key={group.id} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-blue-500 to-blue-300"></div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="default" className="bg-blue-500 hover:bg-blue-600">
                      {group.type === 'buying' && 'شراء'}
                      {group.type === 'marketing' && 'تسويق'}
                      {group.type === 'freelancers' && 'مستقلين'}
                    </Badge>
                    <Badge variant="outline">{group.country}</Badge>
                  </div>
                  <CardTitle className="mt-3 text-lg">{group.title}</CardTitle>
                  <CardDescription>
                    {group.members} أعضاء
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 flex-wrap mb-4">
                    {group.needsFreelancer && (
                      <Badge variant="secondary" className="bg-blue-50 text-blue-600 hover:bg-blue-50">بحاجة إلى مستقلين</Badge>
                    )}
                    {group.rqfOpen && (
                      <Badge variant="secondary" className="bg-green-50 text-green-600 hover:bg-green-50">RFQ مفتوح</Badge>
                    )}
                  </div>
                  
                  <div className="mt-4">
                    <Button asChild className="w-full justify-between">
                      <Link to={`/groups/${group.id}`}>
                        الانضمام للمجموعة
                        <span className="mr-2">←</span>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center mt-6">
            <Button variant="outline" asChild>
              <Link to="/groups">
                عرض المزيد من المجموعات
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Suppliers Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center md:text-right">المجموعات التي تبحث عن موردين</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeGroups.slice(0, 2).map(group => (
              <Card key={group.id} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-teal-500 to-teal-300"></div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="default" className="bg-teal-500 hover:bg-teal-600">
                      بحاجة لموردين
                    </Badge>
                    <Badge variant="outline">{group.country}</Badge>
                  </div>
                  <CardTitle className="mt-3 text-lg">{group.title}</CardTitle>
                  <CardDescription>
                    نوع العرض: {group.type === 'buying' ? 'شراء' : 'خدمات'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mt-4">
                    <Button asChild variant="secondary" className="w-full justify-between">
                      <Link to={`/groups/${group.id}`}>
                        تقديم عرض
                        <span className="mr-2">←</span>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* Enhanced Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t shadow-2xl">
        <NavigationLinks />
      </div>
      
      {/* Enhanced MCP Assistant with AI styling */}
      <div className="fixed bottom-24 md:bottom-8 right-6 z-40">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
          <Button 
            className="relative h-14 w-14 rounded-full shadow-2xl bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 border-2 border-white/20"
            size="icon"
          >
            <MessageSquare className="h-6 w-6" />
          </Button>
        </div>
      </div>
      
      <Footer className="hidden md:block" />
    </div>
  );
};

export default Index;
