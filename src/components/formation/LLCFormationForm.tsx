
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

const llcFormationSchema = z.object({
  companyName: z.string().min(2, 'اسم الشركة مطلوب'),
  businessPurpose: z.string().min(10, 'وصف نشاط الشركة مطلوب'),
  registeredAddress: z.string().min(5, 'عنوان الشركة المسجل مطلوب'),
  registeredAgent: z.string().min(2, 'الوكيل المسجل مطلوب'),
  managementStructure: z.enum(['member-managed', 'manager-managed']),
  initialCapital: z.string().min(1, 'رأس المال الأولي مطلوب'),
  members: z.array(z.object({
    name: z.string().min(2, 'اسم العضو مطلوب'),
    ownershipPercentage: z.number().min(0).max(100),
    investmentAmount: z.string(),
    role: z.string()
  })).min(1, 'عضو واحد على الأقل مطلوب'),
  operatingAgreement: z.boolean().default(false)
});

type LLCFormationData = z.infer<typeof llcFormationSchema>;

interface LLCFormationFormProps {
  formationType: 'individual' | 'group';
}

const LLCFormationForm: React.FC<LLCFormationFormProps> = ({ formationType }) => {
  const form = useForm<LLCFormationData>({
    resolver: zodResolver(llcFormationSchema),
    defaultValues: {
      companyName: '',
      businessPurpose: '',
      registeredAddress: '',
      registeredAgent: '',
      managementStructure: 'member-managed',
      initialCapital: '',
      members: [{ name: '', ownershipPercentage: 100, investmentAmount: '', role: 'Owner' }],
      operatingAgreement: false
    }
  });

  const onSubmit = (data: LLCFormationData) => {
    console.log('LLC Formation Data:', data);
    // Handle form submission
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>اسم الشركة</FormLabel>
                <FormControl>
                  <Input placeholder="اسم شركتك المحدودة" {...field} />
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

        <FormField
          control={form.control}
          name="registeredAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>العنوان المسجل للشركة</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="العنوان الكامل للمقر المسجل للشركة"
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
            name="managementStructure"
            render={({ field }) => (
              <FormItem>
                <FormLabel>هيكل الإدارة</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر هيكل الإدارة" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="member-managed">إدارة الأعضاء</SelectItem>
                    <SelectItem value="manager-managed">إدارة المديرين</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="initialCapital"
            render={({ field }) => (
              <FormItem>
                <FormLabel>رأس المال الأولي</FormLabel>
                <FormControl>
                  <Input placeholder="المبلغ بالدولار" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Separator />

        <Card>
          <CardHeader>
            <CardTitle>معلومات الأعضاء والشركاء</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {form.watch('members').map((_, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded">
                <FormField
                  control={form.control}
                  name={`members.${index}.name`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>اسم العضو</FormLabel>
                      <FormControl>
                        <Input placeholder="الاسم الكامل" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`members.${index}.ownershipPercentage`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>نسبة الملكية (%)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0" 
                          max="100" 
                          placeholder="50"
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
                  name={`members.${index}.investmentAmount`}
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

                <FormField
                  control={form.control}
                  name={`members.${index}.role`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الدور</FormLabel>
                      <FormControl>
                        <Input placeholder="المدير التنفيذي" {...field} />
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
                const currentMembers = form.getValues('members');
                form.setValue('members', [...currentMembers, { 
                  name: '', 
                  ownershipPercentage: 0, 
                  investmentAmount: '', 
                  role: '' 
                }]);
              }}
            >
              إضافة عضو جديد
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

export default LLCFormationForm;
