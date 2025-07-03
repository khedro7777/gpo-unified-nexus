
import React, { useState } from 'react';
import EnhancedTopBar from '@/components/layout/EnhancedTopBar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { MessageCircle, Phone, Mail, HelpCircle, BookOpen, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Support = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'medium'
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "تم إرسال رسالتك بنجاح",
      description: "سنقوم بالرد عليك خلال 24 ساعة"
    });
    setFormData({ name: '', email: '', subject: '', message: '', priority: 'medium' });
  };

  const faqs = [
    {
      question: "كيف يمكنني إنشاء مجموعة شراء تعاوني؟",
      answer: "يمكنك إنشاء مجموعة شراء من خلال الذهاب إلى البوابة الرئيسية واختيار 'الشراء التعاوني'، ثم ملء النموذج المطلوب وتحديد الأهداف والمتطلبات."
    },
    {
      question: "ما هي رسوم استخدام المنصة؟",
      answer: "المنصة مجانية للاستخدام الأساسي. هناك خطط مدفوعة للميزات المتقدمة مثل المجموعات الكبيرة والتحليلات المتقدمة."
    },
    {
      question: "كيف يعمل نظام التصويت؟",
      answer: "نستخدم نظام تصويت ديمقراطي حيث يمكن لأعضاء المجموعة التصويت على القرارات المهمة. النتائج شفافة ومحفوظة على البلوك تشين."
    },
    {
      question: "ما هو نظام ORDA للتحكيم؟",
      answer: "ORDA هو نظام التحكيم الرقمي الخاص بنا لحل النزاعات بين الأعضاء بطريقة عادلة وسريعة مع توثيق كامل للعملية."
    },
    {
      question: "كيف يمكنني أن أصبح مورد معتمد؟",
      answer: "يمكنك التقديم للحصول على حساب مورد من خلال ملء نموذج التسجيل واختيار دور 'مورد'. سيتم مراجعة طلبك خلال 48 ساعة."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <EnhancedTopBar />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              مركز الدعم
            </h1>
            <p className="text-xl text-muted-foreground">
              نحن هنا لمساعدتك في كل خطوة
            </p>
          </div>

          <Tabs defaultValue="contact" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 bg-muted">
              <TabsTrigger value="contact" className="data-[state=active]:bg-background">اتصل بنا</TabsTrigger>
              <TabsTrigger value="faq" className="data-[state=active]:bg-background">الأسئلة الشائعة</TabsTrigger>
              <TabsTrigger value="guides" className="data-[state=active]:bg-background">أدلة المساعدة</TabsTrigger>
              <TabsTrigger value="community" className="data-[state=active]:bg-background">المجتمع</TabsTrigger>
            </TabsList>

            <TabsContent value="contact">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-foreground">
                      <MessageCircle className="h-5 w-5" />
                      إرسال رسالة
                    </CardTitle>
                    <CardDescription>
                      أرسل لنا رسالة وسنقوم بالرد خلال 24 ساعة
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <Input
                        placeholder="الاسم الكامل"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        className="bg-background border-border"
                      />
                      <Input
                        type="email"
                        placeholder="البريد الإلكتروني"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        className="bg-background border-border"
                      />
                      <Input
                        placeholder="موضوع الرسالة"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                        className="bg-background border-border"
                      />
                      <Textarea
                        placeholder="تفاصيل الرسالة"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={5}
                        className="bg-background border-border"
                      />
                      <Button type="submit" className="w-full">
                        إرسال الرسالة
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-foreground">
                        <Phone className="h-5 w-5" />
                        الهاتف
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">+966 11 123 4567</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        الأحد - الخميس: 9:00 ص - 6:00 م
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-foreground">
                        <Mail className="h-5 w-5" />
                        البريد الإلكتروني
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">support@gpo.platform</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        نرد خلال 24 ساعة
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-foreground">
                        <MessageCircle className="h-5 w-5" />
                        الدردشة المباشرة
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button className="w-full">
                        بدء محادثة
                      </Button>
                      <p className="text-sm text-muted-foreground mt-2">
                        متاح 24/7
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="faq">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <HelpCircle className="h-5 w-5" />
                    الأسئلة الشائعة
                  </CardTitle>
                  <CardDescription>
                    إجابات على أكثر الأسئلة شيوعاً
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="space-y-2">
                    {faqs.map((faq, index) => (
                      <AccordionItem 
                        key={index} 
                        value={`item-${index}`}
                        className="border border-border rounded-lg px-4"
                      >
                        <AccordionTrigger className="text-right hover:no-underline text-foreground">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="guides">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-card border-border hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <BookOpen className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-foreground">دليل البداية السريعة</CardTitle>
                    <CardDescription>
                      تعلم كيفية استخدام المنصة في 5 دقائق
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      قراءة الدليل
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <Users className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-foreground">إدارة المجموعات</CardTitle>
                    <CardDescription>
                      كيفية إنشاء وإدارة المجموعات بفعالية
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      قراءة الدليل
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-card border-border hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <MessageCircle className="h-8 w-8 text-primary mb-2" />
                    <CardTitle className="text-foreground">نظام التصويت</CardTitle>
                    <CardDescription>
                      فهم كيفية عمل التصويت والمشاركة
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">
                      قراءة الدليل
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="community">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Users className="h-5 w-5" />
                    انضم إلى المجتمع
                  </CardTitle>
                  <CardDescription>
                    تواصل مع المستخدمين الآخرين وشارك تجاربك
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground">منتدى المناقشات</h4>
                      <p className="text-muted-foreground text-sm">
                        شارك في النقاشات واطرح أسئلتك على المجتمع
                      </p>
                      <Button variant="outline">
                        زيارة المنتدى
                      </Button>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-semibold text-foreground">قناة التليجرام</h4>
                      <p className="text-muted-foreground text-sm">
                        انضم إلى قناتنا للحصول على آخر الأخبار والتحديثات
                      </p>
                      <Button variant="outline">
                        انضمام للقناة
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Support;
