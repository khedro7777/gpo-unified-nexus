
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  ArrowLeft,
  Brain,
  CheckCircle,
  Globe,
  Mail,
  MessageSquare,
  Play,
  Rocket,
  TrendingUp,
  Users,
  ShoppingCart,
  Briefcase,
  Building,
  DollarSign,
  Scale
} from 'lucide-react';

import GroupSearch from '@/components/groups/GroupSearch';
import OpenGroups from '@/components/groups/OpenGroups';
import { useAuth } from '@/hooks/use-auth';

const Index = () => {
  const { isAuthenticated } = useAuth();
  const [searchFilters, setSearchFilters] = useState({
    gateway: '',
    country: '',
    sector: '',
    status: '',
    search: ''
  });

  const serviceCards = [
    {
      id: 'buying',
      title: 'الشراء التعاوني',
      description: 'تجميع طلبات الشراء للحصول على أفضل العروض والخصومات من الموردين',
      icon: ShoppingCart,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      features: [
        'توفير المال من خلال الشراء الجماعي',
        'الحصول على جودة عالية بأسعار منافسة',
        'تسهيل عملية الشراء والتفاوض'
      ],
      link: isAuthenticated ? '/groups?type=buying' : '/login',
      buttonText: 'اكتشف المزيد',
      activeGroups: 42
    },
    {
      id: 'marketing',
      title: 'التسويق التعاوني',
      description: 'تنفيذ حملات تسويقية مشتركة لزيادة الوعي بالعلامة التجارية وتوسيع نطاق الوصول',
      icon: TrendingUp,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      features: [
        'زيادة الوعي بالعلامة التجارية',
        'توسيع نطاق الوصول للعملاء الجدد',
        'تقليل تكاليف التسويق والإعلان'
      ],
      link: isAuthenticated ? '/groups?type=marketing' : '/login',
      buttonText: 'اكتشف المزيد',
      activeGroups: 28
    },
    {
      id: 'freelance',
      title: 'المستقلون',
      description: 'تجميع مهارات المستقلين لتنفيذ مشاريع متكاملة بأعلى جودة وكفاءة',
      icon: Briefcase,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
      features: [
        'الحصول على مهارات متنوعة ومتخصصة',
        'تنفيذ مشاريع متكاملة وعالية الجودة',
        'توفير الوقت والجهد في البحث عن المواهب'
      ],
      link: isAuthenticated ? '/groups?type=freelancers' : '/login',
      buttonText: 'اكتشف المزيد',
      activeGroups: 15
    },
    {
      id: 'suppliers',
      title: 'الموردون',
      description: 'منصة للشركات والمؤسسات لعرض منتجاتها وخدماتها على مجموعات الشراء التعاوني',
      icon: Building,
      bgColor: 'bg-orange-100',
      iconColor: 'text-orange-600',
      features: [
        'الوصول إلى عملاء جدد ومجموعات شراء',
        'زيادة المبيعات وتوسيع النطاق التجاري',
        'بناء علاقات تجارية قوية ومستدامة'
      ],
      link: isAuthenticated ? '/suppliers' : '/login',
      buttonText: 'اكتشف المزيد',
      activeGroups: 35
    },
    {
      id: 'formation',
      title: 'تأسيس الشركات',
      description: 'تسهيل عملية تأسيس الشركات الناشئة من خلال تجميع المؤسسين وتقديم الدعم القانوني والإداري',
      icon: Users,
      bgColor: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      features: [
        'تسهيل عملية التأسيس والإجراءات القانونية',
        'توفير الدعم القانوني والإداري المتخصص',
        'تجميع المؤسسين والشركاء المحتملين'
      ],
      link: isAuthenticated ? '/company-formation' : '/login',
      buttonText: 'اكتشف المزيد',
      activeGroups: 12
    },
    {
      id: 'investment',
      title: 'الاستثمار الذكي',
      description: 'تجميع المستثمرين لتمويل المشاريع الواعدة وتقليل المخاطر من خلال الاستثمار الجماعي',
      icon: DollarSign,
      bgColor: 'bg-teal-100',
      iconColor: 'text-teal-600',
      features: [
        'تجميع المستثمرين لفرص استثمارية مميزة',
        'تمويل المشاريع الواعدة والناشئة',
        'تقليل المخاطر من خلال التنويع'
      ],
      link: isAuthenticated ? '/investment' : '/login',
      buttonText: 'اكتشف المزيد',
      activeGroups: 8
    },
    {
      id: 'arbitration',
      title: 'التحكيم والتوثيق',
      description: 'منصة للتحكيم في النزاعات التجارية بطريقة عادلة وشفافة مع توثيق العقود',
      icon: Scale,
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      features: [
        'حل النزاعات بطريقة عادلة وشفافة',
        'توفير الوقت والجهد في الإجراءات القانونية',
        'الحفاظ على العلاقات التجارية والمهنية'
      ],
      link: isAuthenticated ? '/arbitration' : '/login',
      buttonText: 'اكتشف المزيد',
      activeGroups: 5
    }
  ];

  const handleFiltersChange = (filters: any) => {
    setSearchFilters(filters);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">GPO</span>
                </div>
                <span className="font-bold text-xl">GPO WORLD</span>
              </Link>
              
              <nav className="hidden lg:flex items-center gap-6">
                <Link to="/about" className="text-gray-600 hover:text-primary transition-colors">من نحن</Link>
                <Link to="/how-it-works" className="text-gray-600 hover:text-primary transition-colors">كيف تعمل</Link>
                <Link to="/support" className="text-gray-600 hover:text-primary transition-colors">الدعم</Link>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <Globe className="h-4 w-4" />
                <Select defaultValue="ar-SA">
                  <SelectTrigger className="w-24 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ar-SA">العربية</SelectItem>
                    <SelectItem value="en-US">English</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-gray-300">|</span>
                <Select defaultValue="SAR">
                  <SelectTrigger className="w-20 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SAR">ريال</SelectItem>
                    <SelectItem value="USD">دولار</SelectItem>
                    <SelectItem value="EUR">يورو</SelectItem>
                  </SelectContent>
                </Select>
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
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/my-groups">مجموعاتي</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-blue-50 to-purple-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              منصة التعاقد الذكي
              <span className="block text-primary mt-2">للتعاون الجماعي</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              اكتشف قوة التعاون الجماعي. انضم لمجموعات الشراء التعاوني، التسويق المشترك، 
              تأسيس الشركات، والاستثمار الذكي مع منصة GPO العالمية
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              {!isAuthenticated ? (
                <>
                  <Button size="lg" className="text-lg px-8 py-4" asChild>
                    <Link to="/register">
                      <Rocket className="h-5 w-5 mr-2" />
                      ابدأ الآن مجاناً
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg px-8 py-4" asChild>
                    <Link to="/how-it-works">
                      <Play className="h-5 w-5 mr-2" />
                      شاهد كيف تعمل
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button size="lg" className="text-lg px-8 py-4" asChild>
                    <Link to="/dashboard">
                      <Users className="h-5 w-5 mr-2" />
                      لوحة التحكم
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="text-lg px-8 py-4" asChild>
                    <Link to="/my-groups">
                      <ShoppingCart className="h-5 w-5 mr-2" />
                      مجموعاتي
                    </Link>
                  </Button>
                </>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">+50,000 عضو</h3>
                <p className="text-gray-600">من رجال الأعمال والمستقلين</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">95% نجاح</h3>
                <p className="text-gray-600">في إتمام المشاريع التعاونية</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Globe className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">22 دولة</h3>
                <p className="text-gray-600">حول العالم العربي</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              بوابات الخدمات الذكية
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              اختر البوابة المناسبة لك وابدأ رحلتك في التعاون الذكي
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {serviceCards.map((service) => (
              <Card key={service.id} className="group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-8 text-center">
                  <div className={`w-16 h-16 ${service.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform`}>
                    <service.icon className={`h-8 w-8 ${service.iconColor}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  
                  <div className="space-y-3 mb-6">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button className="w-full group-hover:bg-primary/90" asChild>
                    <Link to={service.link}>
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      {service.buttonText}
                    </Link>
                  </Button>
                  
                  <div className="mt-4 text-xs text-gray-500">
                    {service.activeGroups} مجموعة نشطة
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ابحث في المجموعات المفتوحة
            </h2>
            <p className="text-lg text-gray-600">
              اكتشف المجموعات التي تحتاج أعضاء جدد أو موردين أو مستقلين
            </p>
          </div>

          <GroupSearch onFiltersChange={handleFiltersChange} totalGroups={156} />
        </div>
      </section>

      {/* Open Groups Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <OpenGroups groups={[]} searchFilters={searchFilters} />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">GPO</span>
                </div>
                <span className="font-bold text-xl">GPO WORLD</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                منصة التعاقد الذكي للتعاون الجماعي والشراء التعاوني في العالم العربي
              </p>
              <div className="flex gap-4">
                <Button variant="outline" size="icon" className="bg-transparent border-gray-600 hover:bg-gray-800">
                  <MessageSquare className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="bg-transparent border-gray-600 hover:bg-gray-800">
                  <Users className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="bg-transparent border-gray-600 hover:bg-gray-800">
                  <Globe className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-6">الخدمات</h4>
              <ul className="space-y-3">
                <li><Link to="/groups?type=buying" className="text-gray-400 hover:text-white transition-colors">الشراء التعاوني</Link></li>
                <li><Link to="/groups?type=marketing" className="text-gray-400 hover:text-white transition-colors">التسويق التعاوني</Link></li>
                <li><Link to="/freelance" className="text-gray-400 hover:text-white transition-colors">المستقلون</Link></li>
                <li><Link to="/suppliers" className="text-gray-400 hover:text-white transition-colors">الموردون</Link></li>
                <li><Link to="/company-formation" className="text-gray-400 hover:text-white transition-colors">تأسيس الشركات</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-6">المساعدة</h4>
              <ul className="space-y-3">
                <li><Link to="/support" className="text-gray-400 hover:text-white transition-colors">الدعم الفني</Link></li>
                <li><Link to="/how-it-works" className="text-gray-400 hover:text-white transition-colors">كيف تعمل</Link></li>
                <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">من نحن</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-6">تواصل معنا</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-400">support@gpoworld.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-400">الدعم المباشر 24/7</span>
                </div>
                <Button variant="outline" className="bg-transparent border-gray-600 hover:bg-gray-800 w-full">
                  <Brain className="h-4 w-4 mr-2" />
                  MCP Assistant
                </Button>
              </div>
            </div>
          </div>

          <hr className="border-gray-800 my-12" />
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 GPO World. جميع الحقوق محفوظة.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Link to="/admin-monitor-access" className="text-gray-600 hover:text-gray-400 text-xs">
                Monitor
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
