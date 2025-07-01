
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface InvestmentFormProps {
  investmentType: 'individual' | 'group';
}

/**
 * Investment Form Component
 * Handles creation of new investment opportunities
 * Supports both individual and group investment types
 */
const InvestmentForm: React.FC<InvestmentFormProps> = ({ investmentType }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    sector: '',
    targetAmount: '',
    minimumInvestment: '',
    expectedReturn: '',
    duration: '',
    riskLevel: '',
    country: '',
    documents: null as File[] | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Investment form submitted:', formData);
    // Handle form submission logic here
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, documents: Array.from(e.target.files) });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Investment type indicator */}
      <div className="flex items-center gap-2 mb-4">
        <Badge variant={investmentType === 'group' ? 'default' : 'secondary'}>
          {investmentType === 'group' ? 'استثمار جماعي' : 'استثمار فردي'}
        </Badge>
      </div>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">المعلومات الأساسية</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">عنوان الاستثمار *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="مثال: صندوق التكنولوجيا المالية"
                required
              />
            </div>
            <div>
              <Label htmlFor="sector">القطاع *</Label>
              <Select value={formData.sector} onValueChange={(value) => setFormData({...formData, sector: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر القطاع" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tech">تكنولوجيا</SelectItem>
                  <SelectItem value="fintech">تكنولوجيا مالية</SelectItem>
                  <SelectItem value="healthcare">رعاية صحية</SelectItem>
                  <SelectItem value="education">تعليم</SelectItem>
                  <SelectItem value="retail">تجارة تجزئة</SelectItem>
                  <SelectItem value="manufacturing">تصنيع</SelectItem>
                  <SelectItem value="realestate">عقارات</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="description">وصف الاستثمار *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="وصف مفصل عن فرصة الاستثمار والأهداف المتوقعة..."
              rows={4}
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Financial Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">المعلومات المالية</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="targetAmount">المبلغ المستهدف (دولار) *</Label>
              <Input
                id="targetAmount"
                type="number"
                value={formData.targetAmount}
                onChange={(e) => setFormData({...formData, targetAmount: e.target.value})}
                placeholder="500000"
                required
              />
            </div>
            <div>
              <Label htmlFor="minimumInvestment">الحد الأدنى للاستثمار (دولار) *</Label>
              <Input
                id="minimumInvestment"
                type="number"
                value={formData.minimumInvestment}
                onChange={(e) => setFormData({...formData, minimumInvestment: e.target.value})}
                placeholder="5000"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="expectedReturn">العائد المتوقع (%)</Label>
              <Input
                id="expectedReturn"
                value={formData.expectedReturn}
                onChange={(e) => setFormData({...formData, expectedReturn: e.target.value})}
                placeholder="15-25"
              />
            </div>
            <div>
              <Label htmlFor="duration">مدة الاستثمار</Label>
              <Select value={formData.duration} onValueChange={(value) => setFormData({...formData, duration: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر المدة" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6months">6 أشهر</SelectItem>
                  <SelectItem value="1year">سنة واحدة</SelectItem>
                  <SelectItem value="2years">سنتان</SelectItem>
                  <SelectItem value="3years">3 سنوات</SelectItem>
                  <SelectItem value="5years">5 سنوات</SelectItem>
                  <SelectItem value="longterm">أكثر من 5 سنوات</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="riskLevel">مستوى المخاطر</Label>
              <Select value={formData.riskLevel} onValueChange={(value) => setFormData({...formData, riskLevel: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر مستوى المخاطر" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">منخفض</SelectItem>
                  <SelectItem value="medium">متوسط</SelectItem>
                  <SelectItem value="high">عالي</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location and Documents */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">معلومات إضافية</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="country">الدولة/المنطقة *</Label>
            <Select value={formData.country} onValueChange={(value) => setFormData({...formData, country: value})}>
              <SelectTrigger>
                <SelectValue placeholder="اختر الدولة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sa">السعودية</SelectItem>
                <SelectItem value="ae">الإمارات</SelectItem>
                <SelectItem value="kw">الكويت</SelectItem>
                <SelectItem value="qa">قطر</SelectItem>
                <SelectItem value="bh">البحرين</SelectItem>
                <SelectItem value="om">عمان</SelectItem>
                <SelectItem value="eg">مصر</SelectItem>
                <SelectItem value="jo">الأردن</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="documents">المستندات والمرفقات</Label>
            <Input
              id="documents"
              type="file"
              multiple
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx,.jpg,.png"
              className="cursor-pointer"
            />
            <p className="text-sm text-muted-foreground mt-1">
              يمكنك رفع دراسة الجدوى، خطة العمل، أو أي مستندات داعمة
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Group-specific options */}
      {investmentType === 'group' && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">إعدادات الاستثمار الجماعي</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground">
              سيتم تفعيل نظام التصويت الجماعي والحوكمة التلقائية عند إنشاء الاستثمار
            </div>
          </CardContent>
        </Card>
      )}

      {/* Submit buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button type="submit" className="flex-1">
          إنشاء فرصة الاستثمار
        </Button>
        <Button type="button" variant="outline" className="flex-1">
          حفظ كمسودة
        </Button>
      </div>
    </form>
  );
};

export default InvestmentForm;
