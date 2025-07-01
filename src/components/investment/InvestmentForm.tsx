
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, Building, Users } from 'lucide-react';

interface InvestmentFormProps {
  investmentType: 'individual' | 'group';
}

const InvestmentForm: React.FC<InvestmentFormProps> = ({ investmentType }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    sector: '',
    amount: '',
    expectedReturn: '',
    duration: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Investment form submitted:', formData);
  };

  const mockOpportunities = [
    {
      id: 1,
      title: 'شركة التقنية المتقدمة',
      description: 'استثمار في شركة تقنية ناشئة متخصصة في الذكاء الاصطناعي',
      sector: 'تقنية',
      targetAmount: 500000,
      currentAmount: 320000,
      minInvestment: 5000,
      expectedReturn: '25%',
      duration: '3 سنوات',
      investors: 45
    },
    {
      id: 2,
      title: 'المشروع الصناعي الأخضر',
      description: 'مصنع للطاقة المتجددة وإنتاج الألواح الشمسية',
      sector: 'طاقة',
      targetAmount: 1200000,
      currentAmount: 800000,
      minInvestment: 10000,
      expectedReturn: '18%',
      duration: '5 سنوات',
      investors: 67
    },
    {
      id: 3,
      title: 'سلسلة مطاعم صحية',
      description: 'توسيع سلسلة مطاعم تقدم أكلات صحية ومتوازنة',
      sector: 'غذاء',
      targetAmount: 300000,
      currentAmount: 180000,
      minInvestment: 2000,
      expectedReturn: '22%',
      duration: '2 سنة',
      investors: 89
    }
  ];

  return (
    <div className="space-y-6">
      {/* Investment Opportunities */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockOpportunities.map((opportunity) => (
          <Card key={opportunity.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                <Badge variant="outline">{opportunity.sector}</Badge>
              </div>
              <CardDescription className="text-sm">
                {opportunity.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">الهدف المالي</p>
                  <p className="font-semibold">${opportunity.targetAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">تم جمع</p>
                  <p className="font-semibold text-green-600">${opportunity.currentAmount.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">العائد المتوقع</p>
                  <p className="font-semibold text-blue-600">{opportunity.expectedReturn}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">المدة</p>
                  <p className="font-semibold">{opportunity.duration}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{opportunity.investors} مستثمر</span>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(opportunity.currentAmount / opportunity.targetAmount) * 100}%` }}
                ></div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="flex-1">
                  <DollarSign className="h-4 w-4 mr-1" />
                  استثمر الآن
                </Button>
                <Button size="sm" variant="outline">تفاصيل</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Investment Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            إنشاء فرصة استثمار جديدة
          </CardTitle>
          <CardDescription>
            {investmentType === 'group' ? 'إنشاء فرصة استثمار جماعية' : 'إنشاء فرصة استثمار فردية'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">عنوان المشروع</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="اسم المشروع الاستثماري"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sector">القطاع</Label>
                <Select onValueChange={(value) => setFormData({...formData, sector: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر القطاع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tech">تقنية</SelectItem>
                    <SelectItem value="energy">طاقة</SelectItem>
                    <SelectItem value="food">غذاء</SelectItem>
                    <SelectItem value="real-estate">عقارات</SelectItem>
                    <SelectItem value="healthcare">صحة</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">وصف المشروع</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="وصف تفصيلي للمشروع الاستثماري"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="amount">المبلغ المطلوب ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  value={formData.amount}
                  onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  placeholder="100000"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expectedReturn">العائد المتوقع (%)</Label>
                <Input
                  id="expectedReturn"
                  type="number"
                  value={formData.expectedReturn}
                  onChange={(e) => setFormData({...formData, expectedReturn: e.target.value})}
                  placeholder="15"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">مدة الاستثمار</Label>
                <Select onValueChange={(value) => setFormData({...formData, duration: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر المدة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-year">سنة واحدة</SelectItem>
                    <SelectItem value="2-years">سنتان</SelectItem>
                    <SelectItem value="3-years">3 سنوات</SelectItem>
                    <SelectItem value="5-years">5 سنوات</SelectItem>
                    <SelectItem value="10-years">10 سنوات</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="w-full">
              <Building className="h-4 w-4 mr-2" />
              إنشاء فرصة الاستثمار
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentForm;
