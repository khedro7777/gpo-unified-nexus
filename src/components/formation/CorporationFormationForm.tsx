
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const corporationFormationSchema = z.object({
  corporationName: z.string().min(2, 'اسم الشركة مطلوب'),
  businessPurpose: z.string().min(10, 'وصف نشاط الشركة مطلوب'),
  incorporationState: z.string().min(2, 'ولاية التأسيس مطلوبة'),
  registeredOffice: z.string().min(5, 'المكتب المسجل مطلوب'),
  registeredAgent: z.string().min(2, 'الوكيل المسجل مطلوب'),
  authorizedShares: z.string().min(1, 'عدد الأسهم المصرح بها مطلوب'),
  parValue: z.string().min(1, 'القيمة الاسمية للسهم مطلوبة'),
  incorporators: z.array(z.object({
    name: z.string().min(2, 'اسم المؤسس مطلوب'),
    address: z.string().min(5, 'عنوان المؤسس مطلوب'),
    sharesOwned: z.number().min(0),
    investmentAmount: z.string()
  })).min(1, 'مؤسس واحد على الأقل مطلوب'),
  directors: z.array(z.object({
    name: z.string().min(2, 'اسم العضو مطلوب'),
    title: z.string().min(2, 'المنصب مطلوب'),
    address: z.string().min(5, 'العنوان مطلوب')
  })).min(1, 'عضو مجلس إدارة واحد على الأقل مطلوب'),
  corporateByLaws: z.boolean().default(false)
});

type CorporationFormationData = z.infer<typeof corporationFormationSchema>;

interface CorporationFormationFormProps {
  formationType: 'individual' | 'group';
}

const CorporationFormationForm: React.FC<CorporationFormationFormProps> = ({ formationType }) => {
  const form = useForm<CorporationFormationData>({
    resolver: zodResolver(corporationFormationSchema),
    defaultValues: {
      corporationName: '',
      businessPurpose: '',
      incorporationState: '',
      registeredOffice: '',
      registeredAgent: '',
      authorizedShares: '',
      parValue: '',
      incorporators: [{ name: '', address: '', sharesOwned: 0, investmentAmount: '' }],
      directors: [{ name: '', title: '', address: '' }],
      corporateByLaws: false
    }
  });

  const onSubmit = (data: CorporationFormationData) => {
    console.log('Corporation Formation Data:', data);
    // Handle form submission
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="corporationName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>اسم الشركة المساهمة</FormLabel>
                <FormControl>
                  <Input placeholder="شركة التقنية المتقدمة المساهمة" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="incorporationState"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ولاية التأسيس</FormLabel>
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
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="businessPurpose"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نشاط الشركة</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="وصف تفصيلي لنشاط الشركة وأهدافها"
                  className="min-h-20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="registeredOffice"
            render={({ field }) => (
              <FormItem>
                <FormLabel>المكتب المسجل</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="العنوان الكامل للمكتب المسجل"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="registeredAgent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الوكيل المسجل</FormLabel>
                <FormControl>
                  <Input placeholder="اسم الوكيل المسجل" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="authorizedShares"
            render={({ field }) => (
              <FormItem>
                <FormLabel>عدد الأسهم المصرح بها</FormLabel>
                <FormControl>
                  <Input placeholder="1000000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="parValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>القيمة الاسمية للسهم ($)</FormLabel>
                <FormControl>
                  <Input placeholder="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>معلومات المؤسسين</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {form.watch('incorporators').map((_, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded">
                <FormField
                  control={form.control}
                  name={`incorporators.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اسم المؤسس</FormLabel>
                      <FormControl>
                        <Input placeholder="الاسم الكامل" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`incorporators.${index}.address`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>العنوان</FormLabel>
                      <FormControl>
                        <Input placeholder="العنوان الكامل" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`incorporators.${index}.sharesOwned`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>عدد الأسهم المملوكة</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0" 
                          placeholder="1000"
                          {...field}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`incorporators.${index}.investmentAmount`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>مبلغ الاستثمار</FormLabel>
                      <FormControl>
                        <Input placeholder="المبلغ بالدولار" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                const currentIncorporators = form.getValues('incorporators');
                form.setValue('incorporators', [...currentIncorporators, { 
                  name: '', 
                  address: '', 
                  sharesOwned: 0, 
                  investmentAmount: '' 
                }]);
              }}
            >
              إضافة مؤسس جديد
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>مجلس الإدارة</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {form.watch('directors').map((_, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded">
                <FormField
                  control={form.control}
                  name={`directors.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اسم عضو مجلس الإدارة</FormLabel>
                      <FormControl>
                        <Input placeholder="الاسم الكامل" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`directors.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>المنصب</FormLabel>
                      <FormControl>
                        <Input placeholder="رئيس مجلس الإدارة" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`directors.${index}.address`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>العنوان</FormLabel>
                      <FormControl>
                        <Input placeholder="العنوان الكامل" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => {
                const currentDirectors = form.getValues('directors');
                form.setValue('directors', [...currentDirectors, { 
                  name: '', 
                  title: '', 
                  address: '' 
                }]);
              }}
            >
              إضافة عضو مجلس إدارة جديد
            </Button>
          </CardContent>
        </Card>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button type="submit" className="flex-1">
            {formationType === 'group' ? 'إرسال للتصويت' : 'تقديم طلب التأسيس'}
          </Button>
          <Button type="button" variant="outline" className="flex-1">
            حفظ كمسودة
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CorporationFormationForm;
