
import React, { useState } from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useParams, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { BarChart3, ShoppingCart, Users, Building } from 'lucide-react';

const CreateGroup = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    country: '',
    sector: '',
    budget: '',
    duration: '',
    members: '10'
  });

  const getGroupInfo = () => {
    switch (type) {
      case 'marketing':
        return {
          title: 'إنشاء مجموعة تسويق جماعي',
          description: 'إنشاء مجموعة للتعاون في الحملات التسويقية وتقليل التكاليف',
          icon: <BarChart3 className="h-8 w-8 text-green-600" />,
          color: 'green'
        };
      case 'purchasing':
        return {
          title: 'إنشاء مجموعة شراء تعاوني',
          description: 'إنشاء مجموعة للشراء بكميات كبيرة والحصول على أسعار أفضل',
          icon: <ShoppingCart className="h-8 w-8 text-blue-600" />,
          color: 'blue'
        };
      default:
        return {
          title: 'إنشاء مجموعة جديدة',
          description: 'إنشاء مجموعة تعاونية جديدة',
          icon: <Users className="h-8 w-8 text-purple-600" />,
          color: 'purple'
        };
    }
  };

  const groupInfo = getGroupInfo();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى ملء جميع الحقول المطلوبة",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "تم إنشاء المجموعة بنجاح",
      description: `تم إنشاء مجموعة "${formData.name}" بنجاح`,
    });

    // Simulate navigation to the new group
    setTimeout(() => {
      navigate('/groups');
    }, 1500);
  };

  return (
    <NewMainLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4">
          {groupInfo.icon}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{groupInfo.title}</h1>
            <p className="text-gray-600 mt-1">{groupInfo.description}</p>
          </div>
          <Badge variant="outline" className={`ml-auto text-${groupInfo.color}-600 border-${groupInfo.color}-200`}>
            {type === 'marketing' ? 'تسويق جماعي' : type === 'purchasing' ? 'شراء تعاوني' : 'مجموعة عامة'}
          </Badge>
        </div>

        {/* Main Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              تفاصيل المجموعة
            </CardTitle>
            <CardDescription>
              أكمل النموذج أدناه لإنشاء مجموعة {type === 'marketing' ? 'التسويق الجماعي' : 'الشراء التعاوني'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium">اسم المجموعة *</label>
                  <Input
                    placeholder={type === 'marketing' ? 'مثال: حملة تسويق المنتجات الرقمية' : 'مثال: شراء معدات المكاتب'}
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">الدولة</label>
                  <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الدولة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sa">السعودية</SelectItem>
                      <SelectItem value="ae">الإمارات</SelectItem>
                      <SelectItem value="eg">مصر</SelectItem>
                      <SelectItem value="kw">الكويت</SelectItem>
                      <SelectItem value="qa">قطر</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">القطاع</label>
                  <Select value={formData.sector} onValueChange={(value) => handleInputChange('sector', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر القطاع" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="technology">التكنولوجيا</SelectItem>
                      <SelectItem value="retail">التجزئة</SelectItem>
                      <SelectItem value="manufacturing">التصنيع</SelectItem>
                      <SelectItem value="services">الخدمات</SelectItem>
                      <SelectItem value="food">الأغذية</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">عدد الأعضاء المطلوب</label>
                  <Select value={formData.members} onValueChange={(value) => handleInputChange('members', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر العدد" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 أعضاء</SelectItem>
                      <SelectItem value="10">10 أعضاء</SelectItem>
                      <SelectItem value="20">20 عضو</SelectItem>
                      <SelectItem value="50">50 عضو</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {type === 'marketing' && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">الميزانية المقترحة</label>
                    <Input
                      placeholder="مثال: 50,000 ريال"
                      value={formData.budget}
                      onChange={(e) => handleInputChange('budget', e.target.value)}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <label className="text-sm font-medium">مدة المشروع</label>
                  <Select value={formData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر المدة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">شهر واحد</SelectItem>
                      <SelectItem value="3">3 أشهر</SelectItem>
                      <SelectItem value="6">6 أشهر</SelectItem>
                      <SelectItem value="12">سنة كاملة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-medium">وصف المجموعة *</label>
                <Textarea
                  placeholder={type === 'marketing' 
                    ? 'اكتب وصفاً مفصلاً للحملة التسويقية المطلوبة، الأهداف، والجمهور المستهدف...'
                    : 'اكتب وصفاً مفصلاً للمنتجات أو الخدمات المطلوب شراؤها، المواصفات، والكميات...'
                  }
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={5}
                  required
                />
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <Button type="submit" className="flex-1">
                  إنشاء المجموعة
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => navigate('/groups')}
                  className="flex-1"
                >
                  إلغاء
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h3 className="font-semibold text-blue-900 mb-2">مزايا التعاون الجماعي</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• تقليل التكاليف بنسبة تصل إلى 40%</li>
                <li>• الوصول لموردين وخدمات أفضل</li>
                <li>• تبادل الخبرات والمعرفة</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <h3 className="font-semibold text-green-900 mb-2">خطوات العمل</h3>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• إنشاء المجموعة وانتظار الأعضاء</li>
                <li>• التصويت على العروض المقدمة</li>
                <li>• تنفيذ المشروع والمتابعة</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </NewMainLayout>
  );
};

export default CreateGroup;
