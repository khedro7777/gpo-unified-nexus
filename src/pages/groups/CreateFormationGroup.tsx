
import React, { useState } from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Building, Users, ArrowRight, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const formationGroupSchema = z.object({
  groupName: z.string().min(3, 'اسم المجموعة يجب أن يكون على الأقل 3 أحرف'),
  companyType: z.enum(['llc', 'corporation']),
  businessSector: z.string().min(1, 'اختر قطاع العمل'),
  description: z.string().min(20, 'الوصف يجب أن يكون على الأقل 20 حرف'),
  targetCapital: z.string().min(1, 'رأس المال المستهدف مطلوب'),
  maxMembers: z.string().min(1, 'عدد الأعضاء الأقصى مطلوب'),
  jurisdiction: z.string().min(1, 'اختر الولاية القضائية'),
  timeline: z.string().min(1, 'اختر الجدول الزمني')
});

type FormationGroupData = z.infer<typeof formationGroupSchema>;

const CreateFormationGroup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  const form = useForm<FormationGroupData>({
    resolver: zodResolver(formationGroupSchema),
    defaultValues: {
      groupName: '',
      companyType: 'llc',
      businessSector: '',
      description: '',
      targetCapital: '',
      maxMembers: '',
      jurisdiction: '',
      timeline: ''
    }
  });

  const onSubmit = (data: FormationGroupData) => {
    console.log('Formation Group Data:', data);
    // Here we would typically create the group in the backend
    navigate('/groups');
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold mb-2">معلومات المجموعة الأساسية</h2>
              <p className="text-sm text-muted-foreground">قم بتعبئة المعلومات الأساسية لمجموعة تأسيس الشركة</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="groupName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم المجموعة</FormLabel>
                    <FormControl>
                      <Input placeholder="مجموعة تأسيس شركة التقنية" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="companyType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>نوع الشركة</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر نوع الشركة" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="llc">شركة ذات مسؤولية محدودة (LLC)</SelectItem>
                        <SelectItem value="corporation">شركة مساهمة (Corporation)</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="businessSector"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>قطاع العمل</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر قطاع العمل" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="technology">التكنولوجيا</SelectItem>
                        <SelectItem value="healthcare">الرعاية الصحية</SelectItem>
                        <SelectItem value="finance">المالية</SelectItem>
                        <SelectItem value="education">التعليم</SelectItem>
                        <SelectItem value="retail">التجارة</SelectItem>
                        <SelectItem value="manufacturing">التصنيع</SelectItem>
                        <SelectItem value="consulting">الاستشارات</SelectItem>
                        <SelectItem value="other">أخرى</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="jurisdiction"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الولاية القضائية</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الولاية" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="delaware">ديلاوير</SelectItem>
                        <SelectItem value="california">كاليفورنيا</SelectItem>
                        <SelectItem value="new-york">نيويورك</SelectItem>
                        <SelectItem value="texas">تكساس</SelectItem>
                        <SelectItem value="florida">فلوريدا</SelectItem>
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>وصف المشروع</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="اكتب وصفاً مفصلاً للمشروع وأهدافه..."
                      className="min-h-24"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold mb-2">التفاصيل المالية والأعضاء</h2>
              <p className="text-sm text-muted-foreground">حدد رأس المال المستهدف وعدد الأعضاء</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="targetCapital"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رأس المال المستهدف ($)</FormLabel>
                    <FormControl>
                      <Input placeholder="100000" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="maxMembers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>عدد الأعضاء الأقصى</FormLabel>
                    <FormControl>
                      <Input placeholder="10" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="timeline"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الجدول الزمني للتأسيس</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الجدول الزمني" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1-month">شهر واحد</SelectItem>
                      <SelectItem value="2-months">شهرين</SelectItem>
                      <SelectItem value="3-months">3 أشهر</SelectItem>
                      <SelectItem value="6-months">6 أشهر</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">معاينة التكاليف المتوقعة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>رسوم التأسيس الحكومية:</span>
                    <span>$300 - $500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>رسوم الوكيل المسجل:</span>
                    <span>$100 - $300/سنة</span>
                  </div>
                  <div className="flex justify-between">
                    <span>الرسوم القانونية:</span>
                    <span>$500 - $2000</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-medium">
                    <span>المجموع المتوقع:</span>
                    <span>$900 - $2800</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">مراجعة نهائية</h2>
              <p className="text-sm text-muted-foreground">تأكد من صحة المعلومات قبل إنشاء المجموعة</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>ملخص المجموعة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong>اسم المجموعة:</strong>
                    <p>{form.getValues('groupName')}</p>
                  </div>
                  <div>
                    <strong>نوع الشركة:</strong>
                    <p>{form.getValues('companyType') === 'llc' ? 'LLC' : 'Corporation'}</p>
                  </div>
                  <div>
                    <strong>قطاع العمل:</strong>
                    <p>{form.getValues('businessSector')}</p>
                  </div>
                  <div>
                    <strong>رأس المال المستهدف:</strong>
                    <p>${form.getValues('targetCapital')}</p>
                  </div>
                  <div>
                    <strong>عدد الأعضاء الأقصى:</strong>
                    <p>{form.getValues('maxMembers')}</p>
                  </div>
                  <div>
                    <strong>الجدول الزمني:</strong>
                    <p>{form.getValues('timeline')}</p>
                  </div>
                </div>
                <div>
                  <strong>وصف المشروع:</strong>
                  <p className="text-sm text-muted-foreground mt-1">{form.getValues('description')}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <NewMainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">إنشاء مجموعة تأسيس شركة</h1>
            <p className="text-muted-foreground text-sm md:text-base">
              قم بإنشاء مجموعة لتأسيس شركة بالتعاون مع مستثمرين آخرين
            </p>
          </div>
          <Badge variant="outline" className="text-xs">
            الخطوة {step} من 3
          </Badge>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center space-x-8 mb-8">
          {[1, 2, 3].map((stepNum) => (
            <div key={stepNum} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                stepNum <= step ? 'bg-primary text-primary-foreground' : 'bg-gray-200 text-gray-600'
              }`}>
                {stepNum < step ? <CheckCircle className="h-4 w-4" /> : stepNum}
              </div>
              {stepNum < 3 && (
                <div className={`w-16 h-1 mx-2 ${
                  stepNum < step ? 'bg-primary' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        <Card>
          <CardContent className="p-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {renderStep()}

                <div className="flex justify-between pt-6">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={prevStep}
                    disabled={step === 1}
                  >
                    السابق
                  </Button>
                  
                  {step < 3 ? (
                    <Button type="button" onClick={nextStep}>
                      التالي <ArrowRight className="mr-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="submit">
                      إنشاء المجموعة <Building className="mr-2 h-4 w-4" />
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </NewMainLayout>
  );
};

export default CreateFormationGroup;
