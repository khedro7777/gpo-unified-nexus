
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingCart, BarChart3, Users, Building, Store, Search, 
  Filter, ArrowRight, Star, Clock, MapPin, Eye, Gavel,
  MessageSquare, FileText, Shield, Building2, Zap
} from 'lucide-react';
import EnhancedTopBar from '@/components/layout/EnhancedTopBar';
import MCPAssistantBox from '@/components/mcp/MCPAssistantBox';
import Footer from '@/components/layout/Footer';
import { useToast } from '@/hooks/use-toast';

// البوابات الرئيسية الست
const mainPortals = [
  {
    id: 'cooperative-buying',
    title: 'الشراء التعاوني',
    description: 'نظام شراء جماعي ذكي للحصول على أفضل الأسعار والخصومات',
    icon: <ShoppingCart className="h-8 w-8 text-white" />,
    route: '/create-group/purchasing',
    color: 'from-blue-500 to-blue-600',
    features: ['خصومات جماعية', 'تفاوض ذكي', 'مقارنة أسعار'],
    status: 'نشط',
    integrations: ['Paddle', 'MCP', 'Loomio']
  },
  {
    id: 'cooperative-marketing',
    title: 'التسويق التعاوني',
    description: 'حملات تسويقية مشتركة لتقليل التكاليف وزيادة الوصول',
    icon: <BarChart3 className="h-8 w-8 text-white" />,
    route: '/create-group/marketing',
    color: 'from-green-500 to-green-600',
    features: ['حملات مشتركة', 'تحليل البيانات', 'استهداف ذكي'],
    status: 'نشط',
    integrations: ['Analytics', 'MCP', 'Social APIs']
  },
  {
    id: 'suppliers',
    title: 'الموردون',
    description: 'شبكة موردين موثوقة مع تقييمات ومقارنات شاملة',
    icon: <Store className="h-8 w-8 text-white" />,
    route: '/suppliers',
    color: 'from-orange-500 to-orange-600',
    features: ['تقييمات موثوقة', 'مقارنة عروض', 'ضمانات'],
    status: 'نشط',
    integrations: ['Rating System', 'Verification', 'ODR']
  },
  {
    id: 'freelancers',
    title: 'المستقلون',
    description: 'منصة متقدمة للمستقلين مع اختبارات مهارات وتقييمات',
    icon: <Users className="h-8 w-8 text-white" />,
    route: '/freelance',
    color: 'from-purple-500 to-purple-600',
    features: ['اختبارات مهارات', 'تقييمات العملاء', 'حماية المدفوعات'],
    status: 'نشط',
    integrations: ['Skills Test', 'MCP', 'Payment Protection']
  },
  {
    id: 'company-formation',
    title: 'تأسيس الشركات',
    description: 'خدمات تأسيس شركات احترافية في أفضل الولايات القضائية',
    icon: <Building className="h-8 w-8 text-white" />,
    route: '/company-incorporation',
    color: 'from-indigo-500 to-indigo-600',
    features: ['استشارة قانونية', 'توثيق كامل', 'دعم مستمر'],
    status: 'جديد',
    integrations: ['Legal Docs', 'Notarization', 'Gov APIs']
  },
  {
    id: 'arbitration',
    title: 'التحكيم والتوثيق',
    description: 'نظام ORDA لحل النزاعات والتحكيم الرقمي المتقدم',
    icon: <Gavel className="h-8 w-8 text-white" />,
    route: '/arbitration',
    color: 'from-red-500 to-red-600',
    features: ['تحكيم سريع', 'توثيق IPFS', 'قرارات ملزمة'],
    status: 'نشط',
    integrations: ['ODR', 'IPFS', 'Legal Framework']
  }
];

// المجموعات النشطة
const activeGroups = [
  {
    id: '1',
    title: 'مجموعة شراء أجهزة إلكترونية',
    type: 'buying',
    status: 'بحث عن أعضاء',
    members: 24,
    maxMembers: 50,
    country: 'السعودية',
    sector: 'تكنولوجيا',
    needsSuppliers: true,
    needsFreelancers: false,
    budget: '50,000 ر.س',
    deadline: '2025-01-15'
  },
  {
    id: '2',
    title: 'حملة تسويقية للمنتجات الصحية',
    type: 'marketing',
    status: 'بحث عن موردين',
    members: 18,
    maxMembers: 30,
    country: 'الإمارات',
    sector: 'صحة',
    needsSuppliers: true,
    needsFreelancers: true,
    budget: '75,000 د.إ',
    deadline: '2025-02-01'
  },
  {
    id: '3',
    title: 'تطوير منصة تعليمية',
    type: 'freelancer',
    status: 'بحث عن مستقلين',
    members: 12,
    maxMembers: 20,
    country: 'مصر',
    sector: 'تعليم',
    needsSuppliers: false,
    needsFreelancers: true,
    budget: '25,000 ج.م',
    deadline: '2025-03-01'
  }
];

const EnhancedHomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('portals');
  const { toast } = useToast();

  const handleGetStarted = () => {
    toast({
      title: "مرحباً بك في GPO",
      description: "سنوجهك لإنشاء حسابك أو تسجيل الدخول"
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'بحث عن أعضاء': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'بحث عن موردين': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'بحث عن مستقلين': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'buying': return <ShoppingCart className="h-4 w-4" />;
      case 'marketing': return <BarChart3 className="h-4 w-4" />;
      case 'freelancer': return <Users className="h-4 w-4" />;
      default: return <Building className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <EnhancedTopBar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-blue-500/5 to-purple-500/10 dark:from-primary/20 dark:via-blue-500/10 dark:to-purple-500/20 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-primary/10 dark:bg-primary/20 px-4 py-2 rounded-full text-sm font-medium text-primary mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              منصة ذكية متكاملة مع أنظمة متقدمة
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                العمل الجماعي
              </span>
              <br />
              <span className="text-foreground">الذكي</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              منصة متطورة للشراء التعاوني، التسويق المشترك، إدارة المستقلين، 
              تأسيس الشركات، والتحكيم الرقمي مع دعم الذكاء الاصطناعي
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                size="lg" 
                className="px-8 py-6 text-lg font-medium shadow-xl hover:shadow-2xl transition-all"
                onClick={handleGetStarted}
                asChild
              >
                <Link to="/register">
                  ابدأ الآن
                  <ArrowRight className="mr-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-6 text-lg border-border bg-background/50 backdrop-blur-sm hover:bg-background/80"
                asChild
              >
                <Link to="/how-it-works">
                  جولة تفاعلية
                  <Eye className="mr-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Integration Badges */}
            <div className="flex flex-wrap justify-center gap-3">
              {['Paddle', 'Loomio', 'Snapshot.js', 'ORDA', 'OpenZeppelin', 'Strapi', 'MCP'].map((tech) => (
                <Badge key={tech} className="bg-white/20 dark:bg-black/20 backdrop-blur-sm text-foreground border-border px-3 py-1">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Card className="bg-background/80 backdrop-blur-sm shadow-xl border-border">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute right-4 top-4 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="ابحث في البوابات والمجموعات..."
                    className="pr-12 h-12 text-lg bg-background border-border shadow-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    dir="rtl"
                  />
                </div>
                
                <div className="flex gap-3">
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-40 h-12 bg-background border-border">
                      <Filter className="ml-2 h-4 w-4" />
                      <SelectValue placeholder="النوع" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      <SelectItem value="all">الكل</SelectItem>
                      <SelectItem value="buying">شراء</SelectItem>
                      <SelectItem value="marketing">تسويق</SelectItem>
                      <SelectItem value="freelancer">مستقلين</SelectItem>
                      <SelectItem value="company">شركات</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sectorFilter} onValueChange={setSectorFilter}>
                    <SelectTrigger className="w-40 h-12 bg-background border-border">
                      <SelectValue placeholder="القطاع" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border-border">
                      <SelectItem value="all">كل القطاعات</SelectItem>
                      <SelectItem value="tech">تكنولوجيا</SelectItem>
                      <SelectItem value="health">صحة</SelectItem>
                      <SelectItem value="edu">تعليم</SelectItem>
                      <SelectItem value="finance">مالية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-12 bg-muted">
              <TabsTrigger value="portals" className="text-lg data-[state=active]:bg-background">البوابات الرئيسية</TabsTrigger>
              <TabsTrigger value="groups" className="text-lg data-[state=active]:bg-background">المجموعات النشطة</TabsTrigger>
            </TabsList>

            {/* البوابات الرئيسية */}
            <TabsContent value="portals">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 text-foreground">البوابات الذكية المتكاملة</h2>
                <p className="text-xl text-muted-foreground">كل بوابة مدمجة مع أنظمة متقدمة لتجربة متكاملة</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mainPortals.map((portal) => (
                  <Link to={portal.route} key={portal.id} className="group block">
                    <Card className="h-full hover:shadow-2xl transition-all duration-500 border-border shadow-lg group-hover:scale-105 group-hover:-translate-y-2 overflow-hidden bg-card">
                      <div className={`h-2 bg-gradient-to-r ${portal.color}`}></div>
                      
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className={`p-4 rounded-xl bg-gradient-to-r ${portal.color} group-hover:scale-110 transition-transform shadow-lg`}>
                            {portal.icon}
                          </div>
                          <div className="flex flex-col gap-2">
                            <Badge variant={portal.status === 'جديد' ? 'default' : 'secondary'} className="text-xs">
                              {portal.status}
                            </Badge>
                          </div>
                        </div>
                        
                        <CardTitle className="text-xl mb-3 group-hover:text-primary transition-colors text-card-foreground">
                          {portal.title}
                        </CardTitle>
                        <CardDescription className="text-sm leading-relaxed mb-4 text-muted-foreground">
                          {portal.description}
                        </CardDescription>
                        
                        <div className="space-y-3">
                          <div className="flex flex-wrap gap-1">
                            {portal.features.map((feature) => (
                              <Badge key={feature} variant="outline" className="text-xs border-border">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                          
                          <div className="flex flex-wrap gap-1">
                            {portal.integrations.map((integration) => (
                              <Badge key={integration} variant="secondary" className="text-xs bg-secondary text-secondary-foreground">
                                <Zap className="h-3 w-3 ml-1" />
                                {integration}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pt-0">
                        <Button className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                          ادخل إلى {portal.title}
                          <ArrowRight className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>

            {/* المجموعات النشطة */}
            <TabsContent value="groups">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4 text-foreground">المجموعات النشطة</h2>
                <p className="text-xl text-muted-foreground">انضم إلى المجموعات أو قدم خدماتك</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeGroups.map((group) => (
                  <Card key={group.id} className="hover:shadow-xl transition-all duration-300 border-border shadow-lg overflow-hidden bg-card">
                    <div className={`h-1 ${getStatusColor(group.status).replace('text-', 'bg-').replace('100', '500')}`}></div>
                    
                    <CardHeader>
                      <div className="flex items-center justify-between mb-3">
                        <Badge className={getStatusColor(group.status)}>
                          {group.status}
                        </Badge>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {group.country}
                        </div>
                      </div>
                      
                      <CardTitle className="text-lg flex items-center gap-2 text-card-foreground">
                        {getTypeIcon(group.type)}
                        {group.title}
                      </CardTitle>
                      
                      <CardDescription>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{group.members}/{group.maxMembers} أعضاء</span>
                          <span>{group.budget}</span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs border-border">
                          {group.sector}
                        </Badge>
                        {group.needsSuppliers && (
                          <Badge variant="secondary" className="text-xs bg-green-50 text-green-600 dark:bg-green-900 dark:text-green-200">
                            يحتاج موردين
                          </Badge>
                        )}
                        {group.needsFreelancers && (
                          <Badge variant="secondary" className="text-xs bg-purple-50 text-purple-600 dark:bg-purple-900 dark:text-purple-200">
                            يحتاج مستقلين
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>ينتهي في {group.deadline}</span>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button asChild className="flex-1">
                          <Link to={`/groups/${group.id}`}>
                            عرض التفاصيل
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" className="border-border">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="text-center mt-12">
                <Button variant="outline" size="lg" asChild className="border-border">
                  <Link to="/groups">
                    عرض جميع المجموعات
                    <ArrowRight className="mr-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* MCP Assistant */}
      <MCPAssistantBox />
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default EnhancedHomePage;
