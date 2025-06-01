
import React, { useState } from 'react';
import SimplifiedLayout from '@/components/layout/SimplifiedLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  HelpCircle,
  MessageSquare,
  BookOpen,
  FileText,
  Mail,
  Send,
  Search
} from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const Support = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [contactForm, setContactForm] = useState({
    subject: '',
    message: '',
    email: '',
    name: ''
  });

  // Mock FAQ data
  const faqs: FAQ[] = [
    {
      question: 'كيف يمكنني الانضمام إلى مجموعة شراء؟',
      answer: 'يمكنك الانضمام إلى مجموعة شراء من خلال تصفح المجموعات المتاحة في صفحة المجموعات، ثم النقر على زر "انضمام" واتباع الخطوات المطلوبة.',
      category: 'groups'
    },
    {
      question: 'كيف يتم توزيع الأرباح في مجموعات الشراء؟',
      answer: 'يتم توزيع الأرباح في مجموعات الشراء بناءً على نسبة مساهمة كل عضو في المجموعة وفقًا للشروط المتفق عليها عند إنشاء المجموعة.',
      category: 'payments'
    },
    {
      question: 'ما هي آلية فض النزاعات في المنصة؟',
      answer: 'تستخدم المنصة نظام ORDA لفض النزاعات، حيث يمكن لأي طرف تقديم شكوى رسمية وتقديم الأدلة، ويتم مراجعتها من قبل لجنة مختصة.',
      category: 'disputes'
    },
    {
      question: 'كيف يمكنني سحب الأموال من محفظتي؟',
      answer: 'يمكنك سحب الأموال من محفظتك من خلال صفحة المحفظة، ثم النقر على زر "سحب" واختيار طريقة السحب المفضلة لديك.',
      category: 'payments'
    },
    {
      question: 'ما هي المستندات المطلوبة لإنشاء مجموعة شراء؟',
      answer: 'المستندات المطلوبة تشمل: وثيقة الهوية الشخصية، وصف المنتج أو الخدمة المراد شراؤها، وتفاصيل الميزانية المقترحة.',
      category: 'groups'
    }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "تم إرسال رسالتك",
      description: "سنقوم بالرد عليك في أقرب وقت ممكن",
    });
    setContactForm({
      subject: '',
      message: '',
      email: '',
      name: ''
    });
  };

  return (
    <SimplifiedLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">الدعم</h1>
        
        <Tabs defaultValue="faq">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="faq">الأسئلة الشائعة</TabsTrigger>
            <TabsTrigger value="help">مركز المساعدة</TabsTrigger>
            <TabsTrigger value="contact">اتصل بنا</TabsTrigger>
          </TabsList>
          
          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle>الأسئلة الشائعة</CardTitle>
                <CardDescription>إجابات للاستفسارات الشائعة حول منصة GPO</CardDescription>
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="ابحث في الأسئلة الشائعة..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 h-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {filteredFaqs.length > 0 ? (
                  <div className="space-y-6">
                    {filteredFaqs.map((faq, index) => (
                      <div key={index} className="space-y-2 pb-4 border-b last:border-0">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <HelpCircle className="h-5 w-5 text-primary" />
                          {faq.question}
                        </h3>
                        <p className="text-muted-foreground pl-7">{faq.answer}</p>
                        <div className="flex justify-end">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                            {faq.category === 'groups' ? 'المجموعات' : 
                             faq.category === 'payments' ? 'المدفوعات' : 
                             faq.category === 'disputes' ? 'النزاعات' : 'عام'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold">لا توجد نتائج</h3>
                    <p className="text-muted-foreground">لم نتمكن من العثور على إجابات تطابق بحثك</p>
                  </div>
                )}
                
                <div className="bg-muted/40 rounded-lg p-4 mt-8">
                  <h3 className="text-lg font-semibold mb-2">لم تجد إجابتك؟</h3>
                  <p className="text-muted-foreground mb-4">يمكنك الاتصال بفريق الدعم الخاص بنا للحصول على المساعدة</p>
                  <Button className="w-full sm:w-auto">
                    <Mail className="mr-2 h-4 w-4" />
                    اتصل بفريق الدعم
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="help">
            <Card>
              <CardHeader>
                <CardTitle>مركز المساعدة</CardTitle>
                <CardDescription>استكشف الأدلة والموارد للمساعدة في استخدام منصة GPO</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-2 hover:border-primary/50 transition-colors cursor-pointer">
                    <CardHeader className="pb-2">
                      <div className="p-2 rounded-lg bg-primary/10 w-fit">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg mt-2">دليل المستخدم</CardTitle>
                      <CardDescription>شرح مفصل لكيفية استخدام منصة GPO</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">عرض الدليل</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 hover:border-primary/50 transition-colors cursor-pointer">
                    <CardHeader className="pb-2">
                      <div className="p-2 rounded-lg bg-primary/10 w-fit">
                        <FileText className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg mt-2">الشروط والأحكام</CardTitle>
                      <CardDescription>الإرشادات والقواعد لاستخدام المنصة</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">قراءة الشروط</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 hover:border-primary/50 transition-colors cursor-pointer">
                    <CardHeader className="pb-2">
                      <div className="p-2 rounded-lg bg-primary/10 w-fit">
                        <MessageSquare className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg mt-2">دردشة مباشرة</CardTitle>
                      <CardDescription>تحدث مع فريق الدعم في الوقت الفعلي</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">بدء الدردشة</Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="border-2 hover:border-primary/50 transition-colors cursor-pointer">
                    <CardHeader className="pb-2">
                      <div className="p-2 rounded-lg bg-primary/10 w-fit">
                        <Mail className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg mt-2">تذكرة دعم</CardTitle>
                      <CardDescription>إرسال تذكرة للحصول على المساعدة</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">إنشاء تذكرة</Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>اتصل بنا</CardTitle>
                <CardDescription>أرسل رسالة إلى فريق الدعم وسنرد عليك في أقرب وقت ممكن</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">الاسم</Label>
                      <Input 
                        id="name" 
                        value={contactForm.name} 
                        onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                        className="h-12"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">البريد الإلكتروني</Label>
                      <Input 
                        id="email" 
                        type="email"
                        value={contactForm.email} 
                        onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                        className="h-12"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">الموضوع</Label>
                    <Input 
                      id="subject" 
                      value={contactForm.subject} 
                      onChange={(e) => setContactForm({...contactForm, subject: e.target.value})}
                      className="h-12"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">الرسالة</Label>
                    <Textarea
                      id="message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      rows={6}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="flex items-center">
                    <Send className="mr-2 h-4 w-4" />
                    إرسال
                  </Button>
                </form>
                
                <div className="border-t mt-8 pt-8">
                  <h3 className="text-lg font-semibold mb-4">معلومات الاتصال</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">البريد الإلكتروني</p>
                        <p className="text-muted-foreground">support@gpo-platform.com</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <MessageSquare className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">الدردشة المباشرة</p>
                        <p className="text-muted-foreground">متوفرة من الأحد إلى الخميس، 9 ص - 5 م</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SimplifiedLayout>
  );
};

export default Support;
