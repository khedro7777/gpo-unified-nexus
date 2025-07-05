import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import { useSpendPoints } from '@/hooks/useUserPoints';
import { useToast } from '@/hooks/use-toast';
import { Shield, Coins, AlertCircle, CheckCircle, Store } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface SupplierRegistrationData {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  category: string;
  country: string;
  city: string;
  description: string;
  specialties: string;
  experienceYears: string;
  certifications: string;
}

const SupplierRegistration = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const { toast } = useToast();
  const spendPoints = useSpendPoints();

  const form = useForm<SupplierRegistrationData>({
    defaultValues: {
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      category: '',
      country: '',
      city: '',
      description: '',
      specialties: '',
      experienceYears: '',
      certifications: '',
    },
  });

  const onSubmit = async (data: SupplierRegistrationData) => {
    setShowPayment(true);
  };

  const handleVerificationPayment = async () => {
    setIsSubmitting(true);
    try {
      await spendPoints.mutateAsync({
        points: 100,
        description: 'رسوم توثيق حساب المورد',
        referenceType: 'supplier_verification',
      });

      // Simulate API call to register supplier
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "تم التسجيل بنجاح!",
        description: "تم تسجيلك كمورد معتمد وخصم 100 نقطة من محفظتك",
      });
      
      form.reset();
      setShowPayment(false);
    } catch (error) {
      toast({
        title: "خطأ في التسجيل",
        description: "فشل في معالجة الطلب، تأكد من وجود نقاط كافية في محفظتك",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showPayment) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
              <Shield className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">توثيق حساب المورد</CardTitle>
            <CardDescription>
              لضمان جودة الخدمة وثقة العملاء، يتطلب التسجيل كمورد معتمد دفع رسوم التوثيق
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Alert>
              <Coins className="h-4 w-4" />
              <AlertDescription>
                <strong>رسوم التوثيق: 100 نقطة</strong>
                <br />
                سيتم خصم 100 نقطة من محفظتك لتوثيق حسابك كمورد معتمد
              </AlertDescription>
            </Alert>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2 text-blue-900 dark:text-blue-100">مزايا التوثيق:</h3>
              <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  شارة "مورد معتمد" على ملفك التجاري
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  أولوية في عرض منتجاتك وخدماتك
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  زيادة ثقة العملاء والمجموعات
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  إمكانية الوصول لطلبات الشراء الحصرية
                </li>
              </ul>
            </div>

            <div className="flex gap-3">
              <Button 
                onClick={handleVerificationPayment} 
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  "جاري المعالجة..."
                ) : (
                  <>
                    <Coins className="h-4 w-4 ml-2" />
                    دفع 100 نقطة والتسجيل
                  </>
                )}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowPayment(false)}
                disabled={isSubmitting}
              >
                إلغاء
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-blue-500 rounded-full flex items-center justify-center mb-4">
            <Store className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">تسجيل كمورد معتمد</CardTitle>
          <CardDescription>
            انضم إلى شبكة الموردين الذكية وابدأ في تلقي طلبات الشراء من المجموعات
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="companyName"
                  rules={{ required: "اسم الشركة مطلوب" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اسم الشركة *</FormLabel>
                      <FormControl>
                        <Input placeholder="أدخل اسم شركتك" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactPerson"
                  rules={{ required: "اسم الشخص المسؤول مطلوب" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الشخص المسؤول *</FormLabel>
                      <FormControl>
                        <Input placeholder="اسم الشخص المسؤول" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  rules={{ 
                    required: "البريد الإلكتروني مطلوب",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "صيغة البريد الإلكتروني غير صحيحة"
                    }
                  }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>البريد الإلكتروني *</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="company@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  rules={{ required: "رقم الهاتف مطلوب" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>رقم الهاتف *</FormLabel>
                      <FormControl>
                        <Input placeholder="+966 xxx xxx xxx" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  rules={{ required: "القطاع مطلوب" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>القطاع التجاري *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر القطاع" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="تكنولوجيا">تكنولوجيا</SelectItem>
                          <SelectItem value="إلكترونيات">إلكترونيات</SelectItem>
                          <SelectItem value="أغذية">أغذية</SelectItem>
                          <SelectItem value="مكاتب">مكاتب</SelectItem>
                          <SelectItem value="طبية">طبية</SelectItem>
                          <SelectItem value="نسيج">نسيج</SelectItem>
                          <SelectItem value="بناء">بناء</SelectItem>
                          <SelectItem value="خدمات">خدمات</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  rules={{ required: "الدولة مطلوبة" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الدولة *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر الدولة" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="السعودية">السعودية</SelectItem>
                          <SelectItem value="الإمارات">الإمارات</SelectItem>
                          <SelectItem value="مصر">مصر</SelectItem>
                          <SelectItem value="الكويت">الكويت</SelectItem>
                          <SelectItem value="قطر">قطر</SelectItem>
                          <SelectItem value="البحرين">البحرين</SelectItem>
                          <SelectItem value="عُمان">عُمان</SelectItem>
                          <SelectItem value="الأردن">الأردن</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  rules={{ required: "المدينة مطلوبة" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>المدينة *</FormLabel>
                      <FormControl>
                        <Input placeholder="أدخل اسم المدينة" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="experienceYears"
                  rules={{ required: "سنوات الخبرة مطلوبة" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>سنوات الخبرة *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="اختر سنوات الخبرة" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="1-2">1-2 سنة</SelectItem>
                          <SelectItem value="3-5">3-5 سنوات</SelectItem>
                          <SelectItem value="6-10">6-10 سنوات</SelectItem>
                          <SelectItem value="10+">أكثر من 10 سنوات</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                rules={{ required: "وصف الشركة مطلوب" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>وصف الشركة والخدمات *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="اكتب وصفاً شاملاً عن شركتك والخدمات التي تقدمها..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="specialties"
                rules={{ required: "التخصصات مطلوبة" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>التخصصات والمنتجات *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="اذكر أهم التخصصات والمنتجات التي تقدمها (مفصولة بفاصلة)"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      مثال: هواتف ذكية, أجهزة لوحية, إكسسوارات إلكترونية
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="certifications"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الشهادات والتراخيص (اختياري)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="اذكر أي شهادات أو تراخيص تمتلكها..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>ملاحظة:</strong> سيتم مراجعة طلبك خلال 24-48 ساعة. 
                  بعد الموافقة، ستحتاج لدفع 100 نقطة كرسوم توثيق للحصول على شارة "مورد معتمد".
                </AlertDescription>
              </Alert>

              <Button type="submit" size="lg" className="w-full">
                إرسال طلب التسجيل
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplierRegistration;