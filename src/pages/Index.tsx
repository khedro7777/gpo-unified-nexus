
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, BarChart3, Users, Building, Store, Search, 
  Filter, ArrowRight, MapPin, Clock, Building2, Gavel,
  MessageSquare
} from 'lucide-react';
import TopBar from '@/components/common/TopBar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/hooks/use-auth';

// Main Services Portals
const mainPortals = [
  {
    id: 'cooperative-buying',
    title: 'الشراء التعاوني',
    description: 'انضم إلى مجموعة لشراء منتجات أو خدمات بكميات وخصومات أفضل',
    icon: <ShoppingCart className="h-8 w-8 text-white" />,
    route: '/create-group/purchasing',
    color: 'from-blue-500 to-blue-600',
    features: ['خصومات جماعية', 'تفاوض ذكي', 'شراء آمن']
  },
  {
    id: 'cooperative-marketing',
    title: 'التسويق التعاوني',
    description: 'تعاون مع آخرين لإنشاء حملات تسويقية ذكية ومشتركة',
    icon: <BarChart3 className="h-8 w-8 text-white" />,
    route: '/create-group/marketing',
    color: 'from-green-500 to-green-600',
    features: ['حملات مشتركة', 'تحليل البيانات', 'استهداف ذكي']
  },
  {
    id: 'freelancers',
    title: 'المستقلون',
    description: 'اعرض مهاراتك أو شارك في مهام تعاونية مع فرق العمل',
    icon: <Users className="h-8 w-8 text-white" />,
    route: '/freelance',
    color: 'from-purple-500 to-purple-600',
    features: ['مهارات معتمدة', 'مشاريع متنوعة', 'دفع آمن']
  },
  {
    id: 'suppliers',
    title: 'الموردون',
    description: 'قدم عروضك للمجموعات الجاهزة للتفاوض والشراء',
    icon: <Store className="h-8 w-8 text-white" />,
    route: '/suppliers',
    color: 'from-orange-500 to-orange-600',
    features: ['عروض موثقة', 'تقييمات شفافة', 'تعاقد مباشر']
  },
  {
    id: 'company-formation',
    title: 'تأسيس الشركات',
    description: 'خدمات تأسيس شركات احترافية في أفضل الولايات القضائية',
    icon: <Building className="h-8 w-8 text-white" />,
    route: '/company-incorporation',
    color: 'from-indigo-500 to-indigo-600',
    features: ['استشارة قانونية', 'توثيق كامل', 'دعم مستمر']
  },
  {
    id: 'investment',
    title: 'بوابة الاستثمار',
    description: 'إنشاء وإدارة الشركات الاستثمارية بين المساهمين',
    icon: <Building2 className="h-8 w-8 text-white" />,
    route: '/investment',
    color: 'from-pink-500 to-pink-600',
    features: ['استثمار جماعي', 'حوكمة متقدمة', 'شفافية كاملة']
  },
  {
    id: 'arbitration',
    title: 'التحكيم والتوثيق',
    description: 'نظام ORDA لحل النزاعات والتحكيم الرقمي المتقدم',
    icon: <Gavel className="h-8 w-8 text-white" />,
    route: '/arbitration',
    color: 'from-red-500 to-red-600',
    features: ['تحكيم سريع', 'توثيق IPFS', 'قرارات ملزمة']
  }
];

// Sample active groups
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
    activity: 'نشط منذ 3 أيام'
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
    needsFreelancers: true,
    activity: 'نشط منذ يوم واحد'
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
    needsFreelancers: true,
    activity: 'نشط منذ 5 ساعات'
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sectorFilter, setSectorFilter] = useState('all');
  const [countryFilter, setCountryFilter] = useState('all');
  const { isAuthenticated } = useAuth();

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
      <TopBar />
      
      {/* Header Navigation */}
      <header className="bg-white dark:bg-gray-900 shadow-sm border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <Building className="h-8 w-8 text-primary" />
                <div>
                  <div className="text-xl font-bold text-foreground">GPO WORLD</div>
                  <div className="text-xs text-muted-foreground">Smart Cooperation Platform</div>
                </div>
              </Link>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                من نحن
              </Link>
              <Link to="/how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">
                كيف تعمل
              </Link>
              <Link to="/support" className="text-muted-foreground hover:text-foreground transition-colors">
                الدعم
              </Link>
            </nav>
            
            <div className="flex items-center space-x-2">
              {isAuthenticated ? (
                <Button asChild>
                  <Link to="/dashboard">لوحة التحكم</Link>
                </Button>
              ) : (
                <>
                  <Button variant="outline" asChild>
                    <Link to="/login">تسجيل الدخول</Link>
                  </Button>
                  <Button asChild>
                    <Link to="/register">إنشاء حساب</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-blue-500/5 to-purple-500/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                منصة التعاقد الذكي
              </span>
              <br />
              <span className="text-foreground">بين المشترين والموردين والمستقلين</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              منصة شاملة للشراء التعاوني، التسويق المشترك، إدارة المستقلين، 
              تأسيس الشركات، والتحكيم الرقمي مع دعم الذكاء الاصطناعي
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="px-8 py-6 text-lg font-medium shadow-xl hover:shadow-2xl transition-all"
                asChild
              >
                <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                  ابدأ الآن
                  <ArrowRight className="mr-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-8 py-6 text-lg"
                asChild
              >
                <Link to="/how-it-works">
                  كيف تعمل المنصة
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">البوابات الرئيسية</h2>
            <p className="text-xl text-muted-foreground">اختر الخدمة التي تحتاجها</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {mainPortals.map((portal) => (
              <Link to={portal.route} key={portal.id} className="group block">
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-md group-hover:scale-105 group-hover:-translate-y-1">
                  <div className={`h-2 bg-gradient-to-r ${portal.color}`}></div>
                  
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${portal.color} group-hover:scale-110 transition-transform shadow-lg`}>
                        {portal.icon}
                      </div>
                    </div>
                    
                    <CardTitle className="text-lg mb-3 group-hover:text-primary transition-colors">
                      {portal.title}
                    </CardTitle>
                    <CardDescription className="text-sm leading-relaxed mb-4">
                      {portal.description}
                    </CardDescription>
                    
                    <div className="flex flex-wrap gap-1">
                      {portal.features.map((feature) => (
                        <Badge key={feature} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <Button className="w-full justify-between group-hover:bg-primary group-hover:text-white transition-all">
                      ابدأ
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="bg-background shadow-lg">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute right-4 top-4 h-5 w-5 text-muted-foreground" />
                  <Input
                    placeholder="ابحث في المجموعات والعروض..."
                    className="pr-12 h-12 text-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    dir="rtl"
                  />
                </div>
                
                <div className="flex gap-3 flex-wrap">
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-40 h-12">
                      <Filter className="ml-2 h-4 w-4" />
                      <SelectValue placeholder="النوع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">الكل</SelectItem>
                      <SelectItem value="buying">شراء</SelectItem>
                      <SelectItem value="marketing">تسويق</SelectItem>
                      <SelectItem value="freelancer">مستقلين</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sectorFilter} onValueChange={setSectorFilter}>
                    <SelectTrigger className="w-40 h-12">
                      <SelectValue placeholder="القطاع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">كل القطاعات</SelectItem>
                      <SelectItem value="tech">تكنولوجيا</SelectItem>
                      <SelectItem value="health">صحة</SelectItem>
                      <SelectItem value="edu">تعليم</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={countryFilter} onValueChange={setCountryFilter}>
                    <SelectTrigger className="w-40 h-12">
                      <SelectValue placeholder="الدولة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">كل الدول</SelectItem>
                      <SelectItem value="sa">السعودية</SelectItem>
                      <SelectItem value="ae">الإمارات</SelectItem>
                      <SelectItem value="eg">مصر</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Active Groups Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">العروض المفتوحة</h2>
            <p className="text-xl text-muted-foreground">المجموعات النشطة التي تبحث عن أعضاء</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeGroups.map((group) => (
              <Card key={group.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(group.type)}
                      <Badge variant="outline" className="text-xs">
                        {group.sector}
                      </Badge>
                    </div>
                    <Badge className={`text-xs ${getStatusColor(group.status)}`}>
                      {group.status}
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-lg leading-tight">
                    {group.title}
                  </CardTitle>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {group.country}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {group.members}/{group.maxMembers}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {group.activity}
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex gap-2 flex-wrap">
                      {group.needsSuppliers && (
                        <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800">
                          يحتاج موردين
                        </Badge>
                      )}
                      {group.needsFreelancers && (
                        <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-800">
                          يحتاج مستقلين
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button className="flex-1" asChild>
                        <Link to={`/groups/${group.id}`}>
                          عرض التفاصيل
                        </Link>
                      </Button>
                      <Button variant="outline" size="icon" asChild>
                        <Link to={`/groups/${group.id}/contact`}>
                          <MessageSquare className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center mt-8">
            <Button variant="outline" size="lg" asChild>
              <Link to="/groups">
                عرض المزيد من المجموعات
                <ArrowRight className="mr-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* MCP Assistant */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          className="h-14 w-14 rounded-full shadow-2xl bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
          size="icon"
          title="مساعد MCP الذكي"
          asChild
        >
          <Link to="/mcp">
            <MessageSquare className="h-6 w-6" />
          </Link>
        </Button>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
