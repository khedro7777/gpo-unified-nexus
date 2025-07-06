
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ShoppingCart, 
  BarChart3, 
  Users, 
  Building, 
  Store, 
  Search, 
  Globe, 
  Tag, 
  MessageSquare, 
  FileText, 
  Gavel, 
  Shield, 
  Building2,
  Star,
  MapPin,
  Calendar,
  Eye,
  Mail,
  Share2,
  UserPlus,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

// Enhanced header component
const GPOHeader = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">GPO</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl font-bold text-gray-900">GPO WORLD</h1>
              <p className="text-xs text-gray-500">منصة التعاقد الذكي</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">من نحن</Link>
            <Link to="/how-it-works" className="text-gray-600 hover:text-primary transition-colors">كيف تعمل</Link>
            <Link to="/support" className="text-gray-600 hover:text-primary transition-colors">الدعم</Link>
          </nav>

          {/* Language & Auth */}
          <div className="flex items-center gap-3">
            <Select defaultValue="ar">
              <SelectTrigger className="w-20 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ar">العربية</SelectItem>
                <SelectItem value="en">English</SelectItem>
              </SelectContent>
            </Select>
            
            {isAuthenticated ? (
              <Button asChild>
                <Link to="/dashboard">لوحة التحكم</Link>
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login">تسجيل دخول</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/register">إنشاء حساب</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge className="bg-primary/10 text-primary border-primary/20">
                🌟 منصة التعاقد الذكي الأولى عربياً
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                منصة التعاقد الذكي
                <span className="block text-primary">للتعاون الجماعي</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                اكتشف قوة التعاون الجماعي في الشراء، التسويق، العمل الحر، وتأسيس الشركات. 
                انضم لآلاف المستخدمين واحصل على أفضل الصفقات والفرص.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="px-8 py-6 text-lg" asChild>
                <Link to="/register">
                  ابدأ الآن مجاناً
                  <ArrowRight className="mr-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-6 text-lg" asChild>
                <Link to="/how-it-works">
                  شاهد كيف تعمل
                  <Eye className="mr-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1000+</div>
                <div className="text-sm text-gray-600">مجموعة نشطة</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">5000+</div>
                <div className="text-sm text-gray-600">عضو مسجل</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">$2M+</div>
                <div className="text-sm text-gray-600">قيمة الصفقات</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-3xl p-8 backdrop-blur-sm">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Demo Interface */}
                <div className="bg-gray-50 p-4 border-b">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <ShoppingCart className="h-8 w-8 text-primary" />
                    <div>
                      <h3 className="font-semibold">مجموعة شراء اللابتوبات</h3>
                      <p className="text-sm text-gray-500">24 عضو • نشطة</p>
                    </div>
                  </div>
                  <div className="bg-primary/10 rounded-lg p-4">
                    <div className="flex justify-between text-sm">
                      <span>التقدم</span>
                      <span>75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div className="bg-primary h-2 rounded-full" style={{width: '75%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Service Cards Component
const ServiceCards = () => {
  const services = [
    {
      id: 'buying',
      title: 'الشراء التعاوني',
      description: 'انضم لمجموعات الشراء واحصل على أفضل الأسعار من خلال القوة الشرائية الجماعية',
      icon: ShoppingCart,
      route: '/create-group/purchasing',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      features: ['خصومات تصل 40%', 'ضمان الجودة', 'شحن مجمع']
    },
    {
      id: 'marketing',
      title: 'التسويق التعاوني',
      description: 'حملات تسويقية مشتركة لتقليل التكاليف وزيادة الوصول للجمهور المستهدف',
      icon: BarChart3,
      route: '/create-group/marketing',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      features: ['تكلفة أقل 60%', 'وصول أوسع', 'نتائج مضمونة']
    },
    {
      id: 'freelancers',
      title: 'المستقلون',
      description: 'اعثر على أفضل المواهب أو اعرض خدماتك في بيئة تعاونية آمنة',
      icon: Users,
      route: '/freelance',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      features: ['مواهب متخصصة', 'أسعار تنافسية', 'ضمان التسليم']
    },
    {
      id: 'suppliers',
      title: 'الموردون',
      description: 'شبكة موثوقة من الموردين المعتمدين مع تقييمات وضمانات',
      icon: Store,
      route: '/suppliers',
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      features: ['موردين معتمدين', 'أسعار مدروسة', 'دعم مستمر']
    },
    {
      id: 'incorporation',
      title: 'تأسيس الشركات',
      description: 'خدمات تأسيس الشركات في أفضل الولايات القضائية مع الدعم القانوني',
      icon: Building,
      route: '/company-incorporation',
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50',
      features: ['إجراءات مبسطة', 'استشارة قانونية', 'متابعة كاملة']
    },
    {
      id: 'investment',
      title: 'الاستثمار',
      description: 'فرص استثمارية جماعية مع إدارة مخاطر ذكية وعوائد مجزية',
      icon: Building2,
      route: '/investment',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      features: ['استثمار آمن', 'عوائد مجزية', 'تنويع المخاطر']
    },
    {
      id: 'arbitration',
      title: 'التوثيق والتحكيم',
      description: 'نظام ORDA للتحكيم الإلكتروني وحل النزاعات بطريقة عادلة وسريعة',
      icon: Gavel,
      route: '/arbitration',
      color: 'from-gray-600 to-gray-700',
      bgColor: 'bg-gray-50',
      features: ['حل سريع', 'عدالة مضمونة', 'تكلفة منخفضة']
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">خدماتنا المتكاملة</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            اكتشف مجموعة شاملة من الخدمات التعاونية المصممة لتلبية احتياجاتك في الأعمال والاستثمار
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg overflow-hidden">
              <div className={`h-2 bg-gradient-to-r ${service.color}`}></div>
              <CardHeader className="pb-4">
                <div className={`w-16 h-16 ${service.bgColor} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className={`h-8 w-8 bg-gradient-to-r ${service.color} bg-clip-text text-transparent`} />
                </div>
                <CardTitle className="text-lg leading-tight">{service.title}</CardTitle>
                <CardDescription className="text-sm leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button asChild className="w-full group-hover:shadow-md transition-shadow">
                  <Link to={service.route}>
                    ابدأ الآن
                    <ArrowRight className="mr-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// Search and Filter Component
const SearchAndFilter = ({ onSearch, onFilter }: any) => {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">ابحث عن الفرص المناسبة</h3>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="md:col-span-2 relative">
                <Search className="absolute right-4 top-4 h-5 w-5 text-gray-400" />
                <Input 
                  placeholder="ابحث في المجموعات والخدمات..." 
                  className="pr-12 h-12 text-lg border-0 bg-gray-50 focus:bg-white transition-colors"
                  dir="rtl"
                />
              </div>
              <Select>
                <SelectTrigger className="h-12">
                  <Globe className="ml-2 h-4 w-4 text-gray-400" />
                  <SelectValue placeholder="البوابة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buying">الشراء التعاوني</SelectItem>
                  <SelectItem value="marketing">التسويق التعاوني</SelectItem>
                  <SelectItem value="freelancers">المستقلون</SelectItem>
                  <SelectItem value="suppliers">الموردون</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="h-12">
                  <MapPin className="ml-2 h-4 w-4 text-gray-400" />
                  <SelectValue placeholder="الدولة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sa">السعودية</SelectItem>
                  <SelectItem value="ae">الإمارات</SelectItem>
                  <SelectItem value="eg">مصر</SelectItem>
                  <SelectItem value="kw">الكويت</SelectItem>
                </SelectContent>
              </Select>
              <Button className="h-12 px-8">
                بحث
                <Search className="mr-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Active Groups Component
const ActiveGroups = () => {
  const groups = [
    {
      id: '1',
      title: 'مجموعة شراء أجهزة اللابتوب المكتبية',
      type: 'buying',
      description: 'مجموعة لشراء أجهزة لابتوب للشركات الناشئة بخصم 35%',
      members: 24,
      targetMembers: 50,
      location: 'السعودية',
      status: 'active',
      needsSuppliers: true,
      needsFreelancers: false,
      isPrivate: false,
      lastActivity: '2 ساعات',
      progress: 75,
      tags: ['تكنولوجيا', 'مكاتب', 'شركات ناشئة']
    },
    {
      id: '2',
      title: 'حملة تسويقية للمنتجات الصحية',
      type: 'marketing',
      description: 'حملة تسويق رقمي مشتركة للمنتجات الصحية والعضوية',
      members: 18,
      targetMembers: 30,
      location: 'الإمارات',
      status: 'active',
      needsSuppliers: false,
      needsFreelancers: true,
      isPrivate: false,
      lastActivity: '4 ساعات',
      progress: 60,
      tags: ['تسويق', 'صحة', 'منتجات عضوية']
    },
    {
      id: '3',
      title: 'تطوير منصة تعليمية تفاعلية',
      type: 'freelancers',
      description: 'مشروع تطوير منصة تعليمية بتقنيات حديثة',
      members: 12,
      targetMembers: 20,
      location: 'مصر',
      status: 'negotiation',
      needsSuppliers: false,
      needsFreelancers: true,
      isPrivate: true,
      lastActivity: '1 يوم',
      progress: 45,
      tags: ['تطوير', 'تعليم', 'تكنولوجيا']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'negotiation': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'نشطة';
      case 'negotiation': return 'تفاوض';
      case 'completed': return 'مكتملة';
      default: return 'غير معروف';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'buying': return <ShoppingCart className="h-5 w-5" />;
      case 'marketing': return <BarChart3 className="h-5 w-5" />;
      case 'freelancers': return <Users className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">العروض المفتوحة</h2>
          <p className="text-lg text-gray-600">انضم للمجموعات النشطة أو قدم خدماتك</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {groups.map((group) => (
            <Card key={group.id} className="hover:shadow-xl transition-all duration-300 overflow-hidden border-0 shadow-lg">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 p-4 border-b">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {getTypeIcon(group.type)}
                    <Badge className={getStatusColor(group.status)}>
                      {getStatusText(group.status)}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <MapPin className="h-4 w-4" />
                    {group.location}
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {group.title}
                </h3>
              </div>

              <CardContent className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {group.description}
                </p>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">الأعضاء: {group.members}/{group.targetMembers}</span>
                    <span className="text-primary font-medium">{group.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-blue-500 h-2 rounded-full transition-all duration-300" 
                      style={{width: `${group.progress}%`}}
                    ></div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {group.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Needs */}
                <div className="space-y-2 mb-6">
                  {group.needsSuppliers && (
                    <div className="flex items-center gap-2 text-sm text-orange-600">
                      <Store className="h-4 w-4" />
                      <span>تبحث عن موردين</span>
                    </div>
                  )}
                  {group.needsFreelancers && (
                    <div className="flex items-center gap-2 text-sm text-purple-600">
                      <Users className="h-4 w-4" />
                      <span>تبحث عن مستقلين</span>
                    </div>
                  )}
                  {group.isPrivate && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Shield className="h-4 w-4" />
                      <span>مجموعة خاصة - تتطلب موافقة</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <Button className="w-full" asChild>
                    <Link to={`/groups/${group.id}`}>
                      عرض التفاصيل
                      <Eye className="mr-2 h-4 w-4" />
                    </Link>
                  </Button>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="text-xs">
                      <Mail className="mr-1 h-3 w-3" />
                      راسل المجموعة
                    </Button>
                    <Button variant="outline" size="sm" className="text-xs">
                      <Share2 className="mr-1 h-3 w-3" />
                      مشاركة
                    </Button>
                  </div>
                </div>

                {/* Last Activity */}
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-4 pt-4 border-t">
                  <Clock className="h-3 w-3" />
                  <span>آخر نشاط: {group.lastActivity}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link to="/groups">
              عرض جميع المجموعات
              <ArrowRight className="mr-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

// Footer Component
const GPOFooter = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">GPO</span>
              </div>
              <div>
                <h3 className="font-bold text-lg">GPO WORLD</h3>
                <p className="text-sm text-gray-400">منصة التعاقد الذكي</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              منصة عربية رائدة للتعاون الجماعي في الأعمال والاستثمار
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">من نحن</Link></li>
              <li><Link to="/how-it-works" className="text-gray-400 hover:text-white transition-colors">كيف تعمل</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-white transition-colors">الخدمات</Link></li>
              <li><Link to="/support" className="text-gray-400 hover:text-white transition-colors">الدعم</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">السياسات</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">سياسة الخصوصية</Link></li>
              <li><Link to="/terms" className="text-gray-400 hover:text-white transition-colors">شروط الاستخدام</Link></li>
              <li><Link to="/legal" className="text-gray-400 hover:text-white transition-colors">الشروط القانونية</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">تواصل معنا</h4>
            <div className="space-y-3 text-sm">
              <div className="text-gray-400">
                <p>البريد الإلكتروني:</p>
                <p className="text-white">info@gpoworld.com</p>
              </div>
              <div className="text-gray-400">
                <p>الدعم الفني:</p>
                <p className="text-white">support@gpoworld.com</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 GPO WORLD. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-4">
              <Select defaultValue="ar">
                <SelectTrigger className="w-24 h-8 bg-gray-800 border-gray-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ar">العربية</SelectItem>
                  <SelectItem value="en">English</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" variant="outline" className="border-gray-700 text-gray-300 hover:text-white">
                MCP Assistant
                <MessageSquare className="mr-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Index Component
const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    gateway: 'all',
    country: 'all',
    sector: 'all',
    status: 'all'
  });

  return (
    <div className="min-h-screen bg-white">
      <GPOHeader />
      <HeroSection />
      <ServiceCards />
      <SearchAndFilter 
        onSearch={setSearchQuery}
        onFilter={setFilters}
      />
      <ActiveGroups />
      <GPOFooter />
      
      {/* MCP Assistant Float Button */}
      <div className="fixed bottom-8 left-8 z-50">
        <Button 
          size="lg"
          className="rounded-full h-16 w-16 shadow-2xl bg-gradient-to-r from-primary to-blue-600 hover:shadow-3xl transition-all duration-300"
          title="مساعد MCP الذكي"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default Index;
