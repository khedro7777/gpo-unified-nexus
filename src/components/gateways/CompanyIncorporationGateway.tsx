
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Building, Users, Globe, FileText, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface IncorporationForm {
  companyName: string;
  companyType: string;
  jurisdiction: string;
  numberOfShareholders: number;
  businessActivity: string;
  estimatedCapital: string;
  contactEmail: string;
  contactPhone: string;
  additionalNotes: string;
}

const CompanyIncorporationGateway = () => {
  const [formData, setFormData] = useState<IncorporationForm>({
    companyName: '',
    companyType: '',
    jurisdiction: '',
    numberOfShareholders: 1,
    businessActivity: '',
    estimatedCapital: '',
    contactEmail: '',
    contactPhone: '',
    additionalNotes: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const jurisdictions = [
    { value: 'egypt', label: 'مصر', flag: '🇪🇬', description: 'سهولة التأسيس ورسوم منخفضة' },
    { value: 'uae', label: 'الإمارات العربية المتحدة', flag: '🇦🇪', description: 'مركز تجاري عالمي' },
    { value: 'saudi', label: 'المملكة العربية السعودية', flag: '🇸🇦', description: 'رؤية 2030 وحوافز الاستثمار' },
    { value: 'uk', label: 'المملكة المتحدة', flag: '🇬🇧', description: 'نظام قانوني راسخ' },
    { value: 'delaware', label: 'ولاية ديلاوير - الولايات المتحدة', flag: '🇺🇸', description: 'قوانين شركات مرنة' }
  ];

  const companyTypes = [
    { value: 'llc', label: 'شركة ذات مسؤولية محدودة (LLC)', description: 'مرونة في الإدارة وحماية المسؤولية' },
    { value: 'corporation', label: 'شركة مساهمة (Corporation)', description: 'هيكل شركات كبير مع مساهمين' },
    { value: 'partnership', label: 'شراكة (Partnership)', description: 'شراكة بين طرفين أو أكثر' },
    { value: 'sole', label: 'مؤسسة فردية (Sole Proprietorship)', description: 'ملكية فردية بسيطة' }
  ];

  const handleInputChange = (field: keyof IncorporationForm, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call to Strapi backend
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "تم إرسال الطلب بنجاح",
        description: "سيتم التواصل معكم خلال 24 ساعة لمتابعة إجراءات التأسيس",
      });
      
      // Reset form
      setFormData({
        companyName: '',
        companyType: '',
        jurisdiction: '',
        numberOfShareholders: 1,
        businessActivity: '',
        estimatedCapital: '',
        contactEmail: '',
        contactPhone: '',
        additionalNotes: ''
      });
    } catch (error) {
      toast({
        title: "خطأ في الإرسال",
        description: "يرجى المحاولة مرة أخرى",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedJurisdiction = jurisdictions.find(j => j.value === formData.jurisdiction);
  const selectedCompanyType = companyTypes.find(c => c.value === formData.companyType);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Building className="h-6 w-6 text-primary" />
            بوابة تأسيس الشركات
          </CardTitle>
          <CardDescription>
            تأسيس شركتك في أفضل الولايات القضائية العالمية مع دعم قانوني شامل
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <Globe className="h-8 w-8 text-blue-500 mx-auto mb-2" />
          <h3 className="font-semibold">5 ولايات قضائية</h3>
          <p className="text-sm text-muted-foreground">اختر الأنسب لنشاطك</p>
        </Card>
        <Card className="p-4 text-center">
          <FileText className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <h3 className="font-semibold">إجراءات مبسطة</h3>
          <p className="text-sm text-muted-foreground">خدمة شاملة ومتابعة</p>
        </Card>
        <Card className="p-4 text-center">
          <CheckCircle className="h-8 w-8 text-purple-500 mx-auto mb-2" />
          <h3 className="font-semibold">ضمان الجودة</h3>
          <p className="text-sm text-muted-foreground">دعم قانوني معتمد</p>
        </Card>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>معلومات الشركة الأساسية</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="companyName">اسم الشركة *</Label>
                <Input
                  id="companyName"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  placeholder="أدخل اسم الشركة المقترح"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="numberOfShareholders">عدد المساهمين *</Label>
                <Select 
                  value={formData.numberOfShareholders.toString()} 
                  onValueChange={(value) => handleInputChange('numberOfShareholders', parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="اختر عدد المساهمين" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20].map(num => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'مساهم' : 'مساهمين'}
                      </SelectItem>
                    ))}
                    <SelectItem value="20+">أكثر من 20</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="businessActivity">النشاط التجاري *</Label>
              <Textarea
                id="businessActivity"
                value={formData.businessActivity}
                onChange={(e) => handleInputChange('businessActivity', e.target.value)}
                placeholder="وصف موجز لنشاط الشركة والخدمات المقدمة"
                required
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="estimatedCapital">رأس المال المتوقع</Label>
              <Input
                id="estimatedCapital"
                value={formData.estimatedCapital}
                onChange={(e) => handleInputChange('estimatedCapital', e.target.value)}
                placeholder="مثال: 100,000 USD"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>نوع الشركة</CardTitle>
            <CardDescription>اختر الهيكل القانوني الأنسب لشركتك</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {companyTypes.map((type) => (
                <Card 
                  key={type.value}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    formData.companyType === type.value ? 'ring-2 ring-primary bg-primary/5' : ''
                  }`}
                  onClick={() => handleInputChange('companyType', type.value)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="radio"
                        checked={formData.companyType === type.value}
                        onChange={() => handleInputChange('companyType', type.value)}
                        className="text-primary"
                      />
                      <h3 className="font-semibold text-sm">{type.label}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">{type.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {selectedCompanyType && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm">
                  <strong>اختيارك:</strong> {selectedCompanyType.label}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {selectedCompanyType.description}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>الولاية القضائية</CardTitle>
            <CardDescription>اختر المكان الأنسب لتأسيس شركتك</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-3">
              {jurisdictions.map((jurisdiction) => (
                <Card 
                  key={jurisdiction.value}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    formData.jurisdiction === jurisdiction.value ? 'ring-2 ring-primary bg-primary/5' : ''
                  }`}
                  onClick={() => handleInputChange('jurisdiction', jurisdiction.value)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          checked={formData.jurisdiction === jurisdiction.value}
                          onChange={() => handleInputChange('jurisdiction', jurisdiction.value)}
                          className="text-primary"
                        />
                        <span className="text-2xl">{jurisdiction.flag}</span>
                        <div>
                          <h3 className="font-semibold">{jurisdiction.label}</h3>
                          <p className="text-sm text-muted-foreground">{jurisdiction.description}</p>
                        </div>
                      </div>
                      {formData.jurisdiction === jurisdiction.value && (
                        <Badge>مختار</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>معلومات التواصل</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactEmail">البريد الإلكتروني *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="contactPhone">رقم الهاتف *</Label>
                <Input
                  id="contactPhone"
                  value={formData.contactPhone}
                  onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                  placeholder="+966 50 123 4567"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="additionalNotes">ملاحظات إضافية</Label>
              <Textarea
                id="additionalNotes"
                value={formData.additionalNotes}
                onChange={(e) => handleInputChange('additionalNotes', e.target.value)}
                placeholder="أي متطلبات خاصة أو أسئلة إضافية"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button 
            type="submit" 
            size="lg" 
            disabled={isSubmitting || !formData.companyName || !formData.companyType || !formData.jurisdiction}
            className="w-full md:w-auto px-8"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                جاري الإرسال...
              </>
            ) : (
              <>
                <Building className="h-4 w-4 mr-2" />
                إرسال طلب التأسيس
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CompanyIncorporationGateway;
