
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NewMainLayout from '@/components/layout/NewMainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ShoppingCart, BarChart3, ArrowLeft, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const createGroupSchema = z.object({
  name: z.string().min(3, 'اسم المجموعة يجب أن يكون على الأقل 3 أحرف'),
  country: z.string().min(1, 'اختر الدولة'),
  sector: z.string().min(1, 'اختر القطاع'),
  description: z.string().min(20, 'الوصف يجب أن يكون على الأقل 20 حرف'),
  maxMembers: z.string().min(1, 'عدد الأعضاء المستهدف مطلوب'),
  contractType: z.enum(['individual', 'group']),
  requiresSuppliers: z.boolean().default(false),
  negotiationRounds: z.string().min(1, 'عدد جولات التفاوض مطلوب'),
  minEntryAmount: z.string().optional()
});

type CreateGroupData = z.infer<typeof createGroupSchema>;

const CreateGroup = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CreateGroupData>({
    resolver: zodResolver(createGroupSchema),
    defaultValues: {
      name: '',
      country: '',
      sector: '',
      description: '',
      maxMembers: '',
      contractType: 'group',
      requiresSuppliers: false,
      negotiationRounds: '1',
      minEntryAmount: ''
    }
  });

  const getGroupTypeInfo = () => {
    switch (type) {
      case 'purchasing':
        return {
          title: 'إنشاء مجموعة شراء تعاوني',
          description: 'قم بإنشاء مجموعة للشراء التعاوني والحصول على أفضل الأسعار',
          icon: <ShoppingCart className="h-8 w-8 text-blue-600" />,
          color: 'from-blue-500 to-blue-600'
        };
      case 'marketing':
        return {
          title: 'إنشاء مجموعة التسويق التعاوني',
          description: 'قم بإنشاء مجموعة للتسويق المشترك وتقليل تكاليف الحملات',
          icon: <BarChart3 className="h-8 w-8 text-green-600" />,
          color: 'from-green-500 to-green-600'
        };
      default:
        return {
          title: 'إنشاء مجموعة جديدة',
          description: 'قم بإنشاء مجموعة للتعاون',
          icon: <ShoppingCart className="h-8 w-8 text-primary" />,
          color: 'from-primary to-primary'
        };
    }
  };

  const groupInfo = getGroupTypeInfo();

  const onSubmit = async (data: CreateGroupData) => {
    setIsSubmitting(true);
    
    try {
      // Here you would typically make an API call to create the group
      console.log('Creating group:', { ...data, groupType: type });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "تم إنشاء المجموعة بنجاح",
        description: "سيتم مراجعة طلبك من قبل الإدارة خلال 24 ساعة",
      });
      
      navigate('/groups');
    } catch (error) {
      toast({
        title: "خطأ في إنشاء المجموعة",
        description: "حدث خطأ أثناء إنشاء المجموعة، يرجى المحاولة مرة أخرى",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const countries = [
    { code: 'SA', name: 'السعودية' },
    { code: 'AE', name: 'الإمارات' },
    { code: 'EG', name: 'مصر' },
    { code: 'JO', name: 'الأردن' },
    { code: 'KW', name: 'الكويت' },
    { code: 'QA', name: 'قطر' },
    { code: 'BH', name: 'البحرين' },
    { code: 'OM', name: 'عمان' }
  ];

  const sectors = [
    'تكنولوجيا',
    'صحة وطب',
    'تعليم',
    'زراعة وأغذية',
    'نقل ولوجستيات',
    'عقارات وإنشاءات',
    'مالية ومصرفية',
    'طاقة ومياه',
    'تجارة وتسوق',
    'سياحة وضيافة',
    'أخرى'
  ];

  return (
    <NewMainLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            رجوع
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{groupInfo.title}</h1>
            <p className="text-muted-foreground">{groupInfo.description}</p>
          </div>
        </div>

        {/* Form Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${groupInfo.color} bg-opacity-10`}>
                {groupInfo.icon}
              </div>
              <div>
                <CardTitle>معلومات المجموعة</CardTitle>
                <CardDescription>
                  قم بتعبئة جميع المعلومات المطلوبة لإنشاء المجموعة
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>اسم المجموعة</FormLabel>
                        <FormControl>
                          <Input placeholder="مجموعة شراء المعدات الطبية" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الدولة</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر الدولة" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {countries.map((country) => (
                              <SelectItem key={country.code} value={country.code}>
                                {country.name}
                              </SelectItem>
                            ))}
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
                    name="sector"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>القطاع</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر القطاع" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {sectors.map((sector) => (
                              <SelectItem key={sector} value={sector}>
                                {sector}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="maxMembers"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>عدد الأعضاء المستهدف</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="10" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Description */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>وصف المجموعة والهدف</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="اكتب وصفاً مفصلاً للمجموعة وأهدافها..."
                          className="min-h-24"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Advanced Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="negotiationRounds"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>عدد جولات التفاوض</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر عدد الجولات" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">جولة واحدة</SelectItem>
                            <SelectItem value="2">جولتان</SelectItem>
                            <SelectItem value="3">ثلاث جولات</SelectItem>
                            <SelectItem value="4">أربع جولات أو أكثر</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="minEntryAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الحد الأدنى للدخول (اختياري)</FormLabel>
                        <FormControl>
                          <Input placeholder="1000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Contract Type */}
                <FormField
                  control={form.control}
                  name="contractType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نوع العقد</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="group">عقد جماعي</SelectItem>
                          <SelectItem value="individual">عقد فردي</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <div className="flex justify-end gap-4 pt-6">
                  <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                    إلغاء
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="min-w-32">
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        جاري الإنشاء...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        إنشاء المجموعة
                      </div>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </NewMainLayout>
  );
};

export default CreateGroup;
