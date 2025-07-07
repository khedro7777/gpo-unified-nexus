
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, BarChart3, Users, Building, Store, Search, 
  Filter, ArrowRight, Star, Clock, MapPin, Eye, Gavel,
  MessageSquare, FileText, Shield, Building2, Zap, Globe,
  DollarSign, Package, Briefcase, Scale, UserCheck, List,
  TrendingUp, Mail, Play, CheckCircle
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPortal, setSelectedPortal] = useState('all');
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Main 12 Portals as specified
  const mainPortals = [
    {
      id: 'cooperative-purchasing',
      title: 'الشراء التعاوني',
      description: 'تجميع طلبات الشراء للحصول على أفضل الأسعار والخصومات',
      icon: ShoppingCart,
      route: '/groups?type=purchasing',
      color: 'from-blue-500 to-blue-600',
      gradient: 'bg-gradient-to-br from-blue-50 to-blue-100',
      activeGroups: 45,
      requiresKYC: true,
      requiresPoints: true
    },
    {
      id: 'cooperative-marketing',
      title: 'التسويق التعاوني',
      description: 'حملات تسويقية مشتركة لتقليل التكاليف وزيادة الوصول',
      icon: BarChart3,
      route: '/groups?type=marketing',
      color: 'from-green-500 to-green-600',
      gradient: 'bg-gradient-to-br from-green-50 to-green-100',
      activeGroups: 32,
      requiresKYC: true,
      requiresPoints: true
    },
    {
      id: 'company-formation',
      title: 'تأسيس الشركات',
      description: 'خدمات تأسيس شركات احترافية في أفضل الولايات القضائية',
      icon: Building,
      route: '/company-formation',
      color: 'from-purple-500 to-purple-600',
      gradient: 'bg-gradient-to-br from-purple-50 to-purple-100',
      activeGroups: 18,
      requiresKYC: false,
      requiresPoints: false
    },
    {
      id: 'investment-groups',
      title: 'مجموعات الاستثمار',
      description: 'تجميع المستثمرين للفرص الاستثمارية المتميزة',
      icon: TrendingUp,
      route: '/investment',
      color: 'from-yellow-500 to-yellow-600',
      gradient: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
      activeGroups: 12,
      requiresKYC: true,
      requiresPoints: true
    },
    {
      id: 'suppliers',
      title: 'الموردون',
      description: 'شبكة موردين موثوقة مع تقييمات ومقارنات شاملة',
      icon: Store,
      route: '/suppliers',
      color: 'from-orange-500 to-orange-600',
      gradient: 'bg-gradient-to-br from-orange-50 to-orange-100',
      activeGroups: 67,
      requiresKYC: true,
      requiresPoints: true
    },
    {
      id: 'freelancers',
      title: 'المستقلون',
      description: 'منصة متقدمة للمستقلين مع اختبارات مهارات وتقييمات',
      icon: Users,
      route: '/freelance',
      color: 'from-indigo-500 to-indigo-600',
      gradient: 'bg-gradient-to-br from-indigo-50 to-indigo-100',
      activeGroups: 89,
      requiresKYC: false,
      requiresMCP: true
    },
    {
      id: 'freelancer-groups',
      title: 'مجموعات المستقلين',
      description: 'تجميع المستقلين لمشاريع كبيرة ومعقدة',
      icon: UserCheck,
      route: '/groups?type=freelancer-groups',
      color: 'from-teal-500 to-teal-600',
      gradient: 'bg-gradient-to-br from-teal-50 to-teal-100',
      activeGroups: 24,
      requiresKYC: false,
      requiresMCP: true
    },
    {
      id: 'service-providers',
      title: 'مقدمو الخدمات',
      description: 'شبكة شاملة من مقدمي الخدمات المتخصصة',
      icon: Briefcase,
      route: '/services',
      color: 'from-pink-500 to-pink-600',
      gradient: 'bg-gradient-to-br from-pink-50 to-pink-100',
      activeGroups: 156,
      requiresKYC: false,
      requiresPoints: false
    },
    {
      id: 'product-listings',
      title: 'قوائم المنتجات',
      description: 'عرض وتسويق المنتجات للمجموعات المختلفة',
      icon: Package,
      route: '/products',
      color: 'from-cyan-500 to-cyan-600',
      gradient: 'bg-gradient-to-br from-cyan-50 to-cyan-100',
      activeGroups: 234,
      requiresKYC: false,
      requiresPoints: false
    },
    {
      id: 'arbitration-documentation',
      title: 'التحكيم والتوثيق',
      description: 'نظام ORDA لحل النزاعات والتحكيم الرقمي المتقدم',
      icon: Scale,
      route: '/arbitration',
      color: 'from-red-500 to-red-600',
      gradient: 'bg-gradient-to-br from-red-50 to-red-100',
      activeGroups: 8,
      requiresKYC: false,
      requiresPoints: false
    },
    {
      id: 'arbitration-requests',
      title: 'طلبات التحكيم',
      description: 'تقديم طلبات التحكيم وحل النزاعات',
      icon: Gavel,
      route: '/disputes',
      color: 'from-violet-500 to-violet-600',
      gradient: 'bg-gradient-to-br from-violet-50 to-violet-100',
      activeGroups: 15,
      requiresKYC: false,
      requiresPoints: false
    },
    {
      id: 'smart-negotiation',
      title: 'حلول التفاوض الذكية',
      description: 'أدوات ذكية لتسهيل التفاوض والتوصل لاتفاقات',
      icon: Zap,
      route: '/negotiation',
      color: 'from-emerald-500 to-emerald-600',  
      gradient: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
      activeGroups: 28,
      requiresKYC: false,
      requiresPoints: false
    }
  ];

  // Sample active groups for demo
  const sampleGroups = [
    {
      id: '1',
      name: 'مجموعة شراء أجهزة لابتوب للشركات',
      description: 'شراء جماعي لأجهزة لابتوب عالية الأداء بخصم 40%',
      phase: 'بحث عن أعضاء',
      memberCount: 24,
      maxMembers: 50,
      status: 'seeking_members',
      portal: 'cooperative-purchasing',
      country: 'السعودية',
      budget: '150,000 ر.س'
    },
    {
      id: '2', 
      name: 'حملة تسويقية للمنتجات الصحية',
      description: 'حملة تسويق رقمي مشتركة للمنتجات الصحية والعضوية',
      phase: 'في انتظار الموردين',
      memberCount: 18,
      maxMembers: 30,
      status: 'awaiting_supply',
      portal: 'cooperative-marketing',
      country: 'الإمارات',
      budget: '75,000 د.إ'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusMap = {
      'seeking_members': { text: 'بحث عن أعضاء', color: 'bg-blue-100 text-blue-800' },
      'awaiting_supply': { text: 'في انتظار الموردين', color: 'bg-orange-100 text-orange-800' },
      'active': { text: 'نشط', color: 'bg-green-100 text-green-800' },
      'negotiation': { text: 'مرحلة التفاوض', color: 'bg-purple-100 text-purple-800' }
    };
    
    const statusInfo = statusMap[status as keyof typeof statusMap] || statusMap.active;
    return <Badge className={statusInfo.color}>{statusInfo.text}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Enhanced Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-primary to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-sm">GPO</span>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                  GPO WORLD
                </span>
                <span className="text-xs text-muted-foreground -mt-1">Smart Cooperation Platform</span>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              <Link to="/about" className="text-gray-600 hover:text-primary transition-colors font-medium">
                من نحن
              </Link>
              <Link to="/how-it-works" className="text-gray-600 hover:text-primary transition-colors font-medium">
                كيف يعمل
              </Link>
              <Link to="/support" className="text-gray-600 hover:text-primary transition-colors font-medium">
                الدعم
              </Link>
            </nav>

            {/* Language, Country, Currency, Time */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-sm">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <Select defaultValue="ar">
                  <SelectTrigger className="w-20 h-8 text-xs border-0 bg-transparent">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ar">العربية</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="cn">中文</SelectItem>
                    <SelectItem value="es">Español</SelectItem>
                    <SelectItem value="hi">हिन्दी</SelectItem>
                    <SelectItem value="jp">日本語</SelectItem>
                    <SelectItem value="kr">한국어</SelectItem>
                  </SelectContent>
                </Select>
                
                <span className="text-gray-300">|</span>
                
                <Select defaultValue="SA">
                  <SelectTrigger className="w-16 h-8 text-xs border-0 bg-transparent">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SA">🇸🇦 SA</SelectItem>
                    <SelectItem value="AE">🇦🇪 AE</SelectItem>
                    <SelectItem value="EG">🇪🇬 EG</SelectItem>
                    <SelectItem value="US">🇺🇸 US</SelectItem>
                  </SelectContent>
                </Select>

                <span className="text-gray-300">|</span>

                <Select defaultValue="SAR">
                  <SelectTrigger className="w-16 h-8 text-xs border-0 bg-transparent">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SAR">ر.س</SelectItem>
                    <SelectItem value="AED">د.إ</SelectItem>
                    <SelectItem value="USD">$</SelectItem>
                    <SelectItem value="EUR">€</SelectItem>
                  </SelectContent>
                </Select>

                <span className="text-gray-300">|</span>

                <div className="text-xs text-muted-foreground">
                  {currentTime.toLocaleTimeString('ar-SA', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: true 
                  })}
                </div>
              </div>
              
              {!isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/login">تسجيل دخول</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link to="/register">إنشاء حساب</Link>
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/dashboard">لوحة التحكم</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-blue-50 to-purple-50 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full text-sm font-medium text-primary mb-8 shadow-lg">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              منصة ذكية متكاملة • 12 بوابة تعاونية • نظام MCP متقدم
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 bg-clip-text text-transparent">
                مستقبل
              </span>
              <br />
              <span className="text-foreground">التعاون الذكي</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              منصة عالمية متطورة تجمع 12 بوابة تعاونية ذكية للشراء الجماعي، التسويق المشترك، 
              تأسيس الشركات، إدارة الاستثمارات، والتحكيم الرقمي مع دعم الذكاء الاصطناعي
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Button 
                size="lg" 
                className="px-10 py-6 text-lg font-bold shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105"
                asChild
              >
                <Link to="/register">
                  <Zap className="mr-3 h-6 w-6" />
                  ابدأ رحلتك الآن
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="px-10 py-6 text-lg border-2 bg-white/50 backdrop-blur-sm hover:bg-white/80"
                asChild
              >
                <Link to="/how-it-works">
                  <Play className="mr-3 h-6 w-6" />
                  جولة تفاعلية
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-black text-primary mb-2">12</div>
                <div className="text-sm text-muted-foreground">بوابة تعاونية</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-black text-green-600 mb-2">50K+</div>
                <div className="text-sm text-muted-foreground">عضو نشط</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-black text-blue-600 mb-2">95%</div>
                <div className="text-sm text-muted-foreground">معدل النجاح</div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-black text-purple-600 mb-2">22</div>
                <div className="text-sm text-muted-foreground">دولة</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0">
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 relative">
                  <Search className="absolute right-4 top-4 h-6 w-6 text-muted-foreground" />
                  <Input
                    placeholder="ابحث في البوابات والمجموعات النشطة..."
                    className="pr-14 h-14 text-lg bg-white border-2 shadow-sm rounded-xl"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    dir="rtl"
                  />
                </div>
                
                <div className="flex gap-4">
                  <Select value={selectedPortal} onValueChange={setSelectedPortal}>
                    <SelectTrigger className="w-48 h-14 bg-white border-2 rounded-xl">
                      <Filter className="ml-2 h-5 w-5" />
                      <SelectValue placeholder="اختر البوابة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">جميع البوابات</SelectItem>
                      {mainPortals.map(portal => (
                        <SelectItem key={portal.id} value={portal.id}>
                          {portal.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Button size="lg" className="h-14 px-8 rounded-xl">
                    <Search className="mr-2 h-5 w-5" />
                    بحث
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Main 12 Portals */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              البوابات التعاونية الذكية
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              12 بوابة متخصصة تغطي جميع احتياجات التعاون الذكي من الشراء إلى الاستثمار والتحكيم
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {mainPortals.map((portal) => (
              <Card key={portal.id} className="group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg hover:scale-105 hover:-translate-y-3 overflow-hidden bg-white">
                <div className={`h-2 bg-gradient-to-r ${portal.color}`}></div>
                
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-4 rounded-2xl ${portal.gradient} group-hover:scale-110 transition-transform shadow-lg`}>
                      <portal.icon className={`h-8 w-8 bg-gradient-to-r ${portal.color} bg-clip-text text-transparent`} />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-primary">{portal.activeGroups}</div>
                      <div className="text-xs text-muted-foreground">مجموعة نشطة</div>
                    </div>
                  </div>
                  
                  <CardTitle className="text-lg mb-3 group-hover:text-primary transition-colors leading-tight">
                    {portal.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed mb-4">
                    {portal.description}
                  </CardDescription>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {portal.requiresKYC && (
                      <Badge variant="outline" className="text-xs">
                        <Shield className="mr-1 h-3 w-3" />
                        KYC مطلوب
                      </Badge>
                    )}
                    {portal.requiresPoints && (
                      <Badge variant="outline" className="text-xs">
                        <Star className="mr-1 h-3 w-3" />
                        نقاط مطلوبة
                      </Badge>
                    )}
                    {portal.requiresMCP && (
                      <Badge variant="outline" className="text-xs">
                        <Zap className="mr-1 h-3 w-3" />
                        اختبار MCP
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <Button className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground transition-all rounded-xl" asChild>
                    <Link to={portal.route}>
                      دخول البوابة
                      <ArrowRight className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Active Groups Sample */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6">المجموعات النشطة</h2>
            <p className="text-lg text-muted-foreground">
              انضم إلى المجموعات المفتوحة أو قدم عروضك كمورد أو مستقل
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {sampleGroups.map((group) => (
              <Card key={group.id} className="hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    {getStatusBadge(group.status)}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      {group.country}
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl mb-2">{group.name}</CardTitle>
                  <CardDescription className="mb-4">{group.description}</CardDescription>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">الأعضاء: </span>
                      <span className="font-semibold">{group.memberCount}/{group.maxMembers}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">الميزانية: </span>
                      <span className="font-semibold">{group.budget}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">المرحلة: </span>
                      <span className="font-semibold">{group.phase}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="flex gap-3">
                    <Button className="flex-1" asChild>
                      <Link to={`/groups/${group.id}`}>انضمام</Link>
                    </Button>
                    <Button variant="outline">تقديم عرض</Button>
                    <Button variant="outline">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center">
            <Button size="lg" variant="outline" asChild>
              <Link to="/groups">
                عرض جميع المجموعات النشطة
                <ArrowRight className="mr-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-black text-sm">GPO</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-xl">GPO WORLD</span>
                  <span className="text-xs text-gray-400">Smart Cooperation Platform</span>
                </div>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                منصة التعاون الذكي الأولى عالمياً مع 12 بوابة متخصصة وأنظمة ذكية متقدمة
              </p>
            </div>

            {/* Policies */}
            <div>
              <h4 className="font-bold text-lg mb-6">السياسات</h4>
              <ul className="space-y-3">
                <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">سياسة الخصوصية</Link></li>
                <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">شروط الاستخدام</Link></li>
                <li><Link to="/refund" className="text-gray-400 hover:text-white transition-colors">سياسة الاسترداد</Link></li>
                <li><Link to="/kyc" className="text-gray-400 hover:text-white transition-colors">سياسة KYC</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-bold text-lg mb-6">الدعم</h4>
              <ul className="space-y-3">
                <li><Link to="/support" className="text-gray-400 hover:text-white transition-colors">مركز المساعدة</Link></li>
                <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors">الأسئلة الشائعة</Link></li>
                <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">تواصل معنا</Link></li>
                <li><Link to="/training" className="text-gray-400 hover:text-white transition-colors">التدريب</Link></li>
              </ul>
            </div>

            {/* Contact & Sitemap */}
            <div>
              <h4 className="font-bold text-lg mb-6">تواصل معنا</h4>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-400">support@gpoworld.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-400">الدعم المباشر 24/7</span>
                </div>
              </div>
              <Link to="/sitemap" className="text-primary hover:underline font-medium">
                خريطة الموقع
              </Link>
            </div>
          </div>

          <hr className="border-gray-800 my-12" />
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 GPO World. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <CheckCircle className="h-4 w-4" />
                نظام آمن ومُرخص
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
