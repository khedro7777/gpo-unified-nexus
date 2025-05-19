
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ShoppingCart, Users, BarChart3, Store, Building, FileCheck, Gavel, CodeSquare, ArrowLeft, CheckCircle, Clock, FileQuestion } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Simulated services data
const servicesData = [
  {
    id: 'cooperative-purchasing',
    title: 'الشراء التعاوني',
    description: 'تجميع المشتريات للحصول على أفضل الأسعار والشروط',
    longDescription: 'خدمة الشراء التعاوني تمكن المؤسسات والشركات من تجميع طلبات الشراء الخاصة بها للحصول على أسعار أفضل وشروط تعاقدية مميزة من الموردين. يمكن للعملاء الاختيار بين الشراء الفردي أو الشراء الجماعي من خلال الانضمام إلى مجموعات الشراء القائمة أو إنشاء مجموعات جديدة.',
    icon: <ShoppingCart className="h-10 w-10 text-primary" />,
    benefits: [
      'توفير يصل إلى 25% من تكاليف الشراء',
      'شروط تعاقدية أفضل للكميات الكبيرة',
      'تبسيط عملية التفاوض والشراء',
      'تقليل المخاطر من خلال توزيعها بين أعضاء المجموعة'
    ],
    steps: [
      'إنشاء طلب شراء أو الانضمام إلى مجموعة قائمة',
      'الموافقة على الشروط والكميات المطلوبة',
      'التصويت على العروض المقدمة من الموردين',
      'إتمام عملية الشراء وتوزيع المنتجات'
    ],
    hasCollective: true,
    type: 'web2',
    requirements: 'يتطلب التحقق من هوية الشركة أو المؤسسة',
    pricing: 'رسوم 2% من قيمة الطلبية'
  },
  {
    id: 'group-marketing',
    title: 'التسويق الجماعي',
    description: 'حملات تسويقية موحدة مع مشاركة التكلفة والفوائد',
    longDescription: 'خدمة التسويق الجماعي تتيح للشركات والمؤسسات التعاون في تنفيذ حملات تسويقية مشتركة، مما يؤدي إلى خفض التكاليف وزيادة التأثير. يمكن للمشاركين الاستفادة من الخبرات المشتركة وتوسيع نطاق الوصول إلى جمهور أوسع.',
    icon: <BarChart3 className="h-10 w-10 text-primary" />,
    benefits: [
      'توفير في تكاليف الحملات التسويقية',
      'الوصول إلى جمهور أوسع',
      'الاستفادة من خبرات متنوعة في مجال التسويق',
      'بناء شراكات استراتيجية مع شركات مكملة'
    ],
    steps: [
      'اقتراح فكرة الحملة التسويقية',
      'البحث عن شركاء مهتمين',
      'تحديد الميزانية والأهداف المشتركة',
      'تنفيذ الحملة ومشاركة النتائج'
    ],
    hasCollective: false,
    type: 'web2',
    requirements: 'يتطلب وجود جهة مخولة باتخاذ القرارات التسويقية',
    pricing: 'نموذج مشاركة التكلفة بين المشاركين'
  },
  // Add other services similar to the above format
];

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data from API
    setLoading(true);
    setTimeout(() => {
      const foundService = servicesData.find(s => s.id === serviceId);
      if (foundService) {
        setService(foundService);
      }
      setLoading(false);
    }, 500);
  }, [serviceId]);

  const handleJoinService = () => {
    toast({
      title: "تم تقديم الطلب",
      description: "سيتم مراجعة طلبك والرد عليك قريبًا",
    });
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-pulse space-y-4 w-full max-w-4xl">
            <div className="h-12 bg-muted rounded-md w-3/4"></div>
            <div className="h-64 bg-muted rounded-md"></div>
            <div className="h-32 bg-muted rounded-md"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!service) {
    return (
      <MainLayout>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold mb-4">الخدمة غير موجودة</h2>
          <p className="text-muted-foreground mb-6">لم نتمكن من العثور على الخدمة المطلوبة</p>
          <Button onClick={() => navigate('/')}>العودة للرئيسية</Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-start justify-between">
          <div>
            <Button 
              variant="ghost" 
              className="mb-2 p-0 hover:bg-transparent"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span className="text-muted-foreground">العودة</span>
            </Button>
            <h1 className="text-3xl font-bold">{service.title}</h1>
          </div>
          
          <div className="flex items-center space-x-4 space-x-reverse">
            <Button onClick={handleJoinService}>طلب الخدمة</Button>
            {service.hasCollective && (
              <Tabs defaultValue="individual" className="w-auto">
                <TabsList>
                  <TabsTrigger value="individual">فردي</TabsTrigger>
                  <TabsTrigger value="collective">جماعي</TabsTrigger>
                </TabsList>
              </Tabs>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {service.icon}
                <span>عن الخدمة</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6 text-lg">
                {service.longDescription}
              </p>
              
              <Tabs defaultValue="benefits">
                <TabsList className="mb-4">
                  <TabsTrigger value="benefits">المزايا</TabsTrigger>
                  <TabsTrigger value="steps">خطوات الخدمة</TabsTrigger>
                  <TabsTrigger value="requirements">المتطلبات</TabsTrigger>
                </TabsList>
                
                <TabsContent value="benefits" className="space-y-4">
                  <h3 className="font-medium">مزايا الخدمة</h3>
                  <ul className="space-y-2">
                    {service.benefits.map((benefit: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="steps" className="space-y-4">
                  <h3 className="font-medium">خطوات الاستفادة من الخدمة</h3>
                  <ol className="space-y-4">
                    {service.steps.map((step: string, index: number) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                          {index + 1}
                        </div>
                        <span className="pt-1">{step}</span>
                      </li>
                    ))}
                  </ol>
                </TabsContent>
                
                <TabsContent value="requirements">
                  <h3 className="font-medium mb-3">متطلبات الخدمة</h3>
                  <Alert>
                    <FileQuestion className="h-4 w-4" />
                    <AlertTitle>المستندات والمتطلبات</AlertTitle>
                    <AlertDescription className="mt-2">
                      {service.requirements}
                    </AlertDescription>
                  </Alert>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>معلومات الخدمة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">نوع الخدمة</p>
                  <p className="font-medium">{service.type === 'web2' ? 'خدمة WEB2' : 'خدمة WEB3'}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">نموذج التسعير</p>
                  <p className="font-medium">{service.pricing}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">متوسط وقت الإنجاز</p>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>7-14 يومًا</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={handleJoinService}>
                  طلب الخدمة الآن
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>مجموعات نشطة</CardTitle>
                <CardDescription>
                  مجموعات يمكنك الانضمام إليها
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-md border p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">مجموعة المستوردين</h4>
                      <p className="text-xs text-muted-foreground">12 عضو • ينتهي في 7 أيام</p>
                    </div>
                    <Button size="sm" variant="outline">انضمام</Button>
                  </div>
                </div>
                
                <div className="rounded-md border p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">تجار التجزئة</h4>
                      <p className="text-xs text-muted-foreground">24 عضو • ينتهي في 3 أيام</p>
                    </div>
                    <Button size="sm" variant="outline">انضمام</Button>
                  </div>
                </div>
                
                <div className="text-center mt-2">
                  <Button variant="link" className="text-xs">عرض المزيد من المجموعات</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>الأسئلة الشائعة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">كيف يمكنني الانضمام إلى مجموعة؟</h4>
              <p className="text-sm text-muted-foreground">
                يمكنك الانضمام إلى مجموعة موجودة من خلال النقر على زر "انضمام" بجانب اسم المجموعة، أو إنشاء مجموعة جديدة من خلال النقر على زر "إنشاء مجموعة جديدة".
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">ما هي الشروط اللازمة للاستفادة من الخدمة؟</h4>
              <p className="text-sm text-muted-foreground">
                يتطلب استخدام الخدمة التحقق من هوية الشركة أو المؤسسة، وتوقيع العقد الإلكتروني، والالتزام بشروط وأحكام المنصة.
              </p>
            </div>
            
            <div>
              <h4 className="font-medium mb-1">كيف يتم تسوية النزاعات؟</h4>
              <p className="text-sm text-muted-foreground">
                تتم تسوية النزاعات من خلال نظام ORDA لفض النزاعات، والذي يعتمد على التحكيم الإلكتروني وتحليل البيانات باستخدام تقنيات الذكاء الاصطناعي.
              </p>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">عرض جميع الأسئلة الشائعة</Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ServiceDetails;
