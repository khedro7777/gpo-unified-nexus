
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Users, Target, Globe, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';

const Landing = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "التعاون الذكي",
      description: "انضم لمجموعات الشراء والتعاون مع آخرين لتحقيق أفضل الأسعار"
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "مقاولة احترافية", 
      description: "اعثر على أفضل الموردين والمستقلين لمشاريعك"
    },
    {
      icon: <Globe className="h-8 w-8 text-primary" />,
      title: "تكوين كيانات",
      description: "ساعد في تأسيس الشركات والكيانات القانونية"
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "أتمتة ذكية",
      description: "نظام MCP المتطور للتحكم والأتمتة"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">GPO</h1>
              <span className="text-sm text-gray-600">Smart Cooperation Platform</span>
            </div>
            
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button>
                    لوحة التحكم
                    <ArrowRight className="mr-2 h-4 w-4" />
                  </Button>
                </Link>
              ) : (
                <div className="flex space-x-2">
                  <Link to="/login">
                    <Button variant="outline">تسجيل الدخول</Button>
                  </Link>
                  <Link to="/register">
                    <Button>
                      إنشاء حساب
                      <ArrowRight className="mr-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            منصة التعاون الذكي
            <span className="block text-primary">GPO Platform</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            منصة شاملة للشراء التعاوني والتسويق المشترك وإدارة المستقلين وتعاقد الموردين وتكوين الكيانات عبر نظام DAO
          </p>
          
          {!isAuthenticated && (
            <div className="flex justify-center space-x-4">
              <Link to="/register">
                <Button size="lg" className="text-lg px-8 py-3">
                  ابدأ الآن مجاناً
                  <ArrowRight className="mr-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                  تسجيل الدخول
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            مزايا المنصة
          </h2>
          <p className="text-lg text-gray-600">
            اكتشف كيف تساعدك منصة GPO في تحقيق أهدافك
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">
            انضم إلى مجتمع التعاون الذكي
          </h2>
          <p className="text-xl mb-8 opacity-90">
            ابدأ رحلتك في التعاون الذكي واستفد من قوة المجموعة
          </p>
          
          {!isAuthenticated && (
            <Link to="/register">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                إنشاء حساب جديد
                <ArrowRight className="mr-2 h-5 w-5" />
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">GPO</h3>
            <p className="text-gray-400 mb-4">
              منصة التعاون الذكي - Smart Cooperation Platform
            </p>
            <p className="text-sm text-gray-500">
              جميع الحقوق محفوظة © 2024
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
