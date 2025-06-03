
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Upload, Gavel, Users, Clock, FileText, AlertTriangle, CheckCircle, Scale } from 'lucide-react';
import IPFSUpload from '../ipfs/IPFSUpload';

interface ArbitrationCase {
  id: string;
  title: string;
  type: 'contract' | 'payment' | 'delivery' | 'quality' | 'other';
  status: 'submitted' | 'reviewing' | 'mediation' | 'arbitration' | 'resolved' | 'closed';
  parties: string[];
  submitDate: Date;
  priority: 'low' | 'medium' | 'high' | 'urgent';
}

interface NewCaseForm {
  title: string;
  type: string;
  description: string;
  amount: string;
  opposingParty: string;
  urgency: string;
  evidence: string[];
}

const ORDAArbitration = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [existingCases] = useState<ArbitrationCase[]>([
    {
      id: 'ARB-2025-001',
      title: 'نزاع حول جودة المنتجات المورّدة',
      type: 'quality',
      status: 'mediation',
      parties: ['شركة ABC للتجارة', 'مؤسسة XYZ للتوريد'],
      submitDate: new Date('2025-01-15'),
      priority: 'high'
    },
    {
      id: 'ARB-2025-002', 
      title: 'تأخير في تسليم الطلبية',
      type: 'delivery',
      status: 'reviewing',
      parties: ['مجموعة الشراء التعاوني', 'شركة النقل السريع'],
      submitDate: new Date('2025-01-20'),
      priority: 'medium'
    }
  ]);

  const [newCase, setNewCase] = useState<NewCaseForm>({
    title: '',
    type: '',
    description: '',
    amount: '',
    opposingParty: '',
    urgency: '',
    evidence: []
  });

  const caseTypes = [
    { value: 'contract', label: 'انتهاك عقد', icon: '📋' },
    { value: 'payment', label: 'نزاع دفع', icon: '💰' },
    { value: 'delivery', label: 'مشاكل التسليم', icon: '🚚' },
    { value: 'quality', label: 'جودة المنتج', icon: '⭐' },
    { value: 'other', label: 'أخرى', icon: '❓' }
  ];

  const getStatusBadge = (status: ArbitrationCase['status']) => {
    const statusConfig = {
      submitted: { label: 'مُرسل', color: 'bg-blue-500' },
      reviewing: { label: 'قيد المراجعة', color: 'bg-yellow-500' },
      mediation: { label: 'وساطة', color: 'bg-orange-500' },
      arbitration: { label: 'تحكيم', color: 'bg-purple-500' },
      resolved: { label: 'محلول', color: 'bg-green-500' },
      closed: { label: 'مغلق', color: 'bg-gray-500' }
    };

    const config = statusConfig[status];
    return (
      <Badge className={`${config.color} text-white`}>
        {config.label}
      </Badge>
    );
  };

  const getPriorityBadge = (priority: ArbitrationCase['priority']) => {
    const priorityConfig = {
      low: { label: 'منخفض', color: 'bg-gray-100 text-gray-700' },
      medium: { label: 'متوسط', color: 'bg-blue-100 text-blue-700' },
      high: { label: 'عالي', color: 'bg-orange-100 text-orange-700' },
      urgent: { label: 'عاجل', color: 'bg-red-100 text-red-700' }
    };

    const config = priorityConfig[priority];
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const handleSubmitCase = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting new arbitration case:', newCase);
    // Handle case submission logic here
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Scale className="h-6 w-6 text-primary" />
            نظام التحكيم التجاري ORDA
          </CardTitle>
          <CardDescription>
            حل النزاعات التجارية بطريقة عادلة وسريعة مع ضمان الشفافية والحياد
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 text-center">
          <Gavel className="h-8 w-8 text-blue-500 mx-auto mb-2" />
          <h3 className="font-semibold">95%</h3>
          <p className="text-sm text-muted-foreground">معدل النجاح</p>
        </Card>
        <Card className="p-4 text-center">
          <Clock className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <h3 className="font-semibold">15 يوم</h3>
          <p className="text-sm text-muted-foreground">متوسط الحل</p>
        </Card>
        <Card className="p-4 text-center">
          <Users className="h-8 w-8 text-purple-500 mx-auto mb-2" />
          <h3 className="font-semibold">120+</h3>
          <p className="text-sm text-muted-foreground">محكم معتمد</p>
        </Card>
        <Card className="p-4 text-center">
          <CheckCircle className="h-8 w-8 text-orange-500 mx-auto mb-2" />
          <h3 className="font-semibold">500+</h3>
          <p className="text-sm text-muted-foreground">قضية محلولة</p>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="cases">قضاياي</TabsTrigger>
          <TabsTrigger value="new-case">قضية جديدة</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>كيف يعمل نظام ORDA؟</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">تقديم القضية</h3>
                  <p className="text-sm text-muted-foreground">رفع تفاصيل النزاع والأدلة</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-green-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <span className="text-green-600 font-bold">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">المراجعة الأولية</h3>
                  <p className="text-sm text-muted-foreground">فحص القضية وتحديد الإجراء</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-orange-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <span className="text-orange-600 font-bold">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">الوساطة/التحكيم</h3>
                  <p className="text-sm text-muted-foreground">محاولة الحل الودي أو التحكيم</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-purple-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                    <span className="text-purple-600 font-bold">4</span>
                  </div>
                  <h3 className="font-semibold mb-2">القرار النهائي</h3>
                  <p className="text-sm text-muted-foreground">إصدار القرار الملزم</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>أنواع النزاعات المدعومة</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {caseTypes.map((type) => (
                  <div key={type.value} className="flex items-center gap-3 p-3 border rounded-lg">
                    <span className="text-xl">{type.icon}</span>
                    <span className="font-medium">{type.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cases" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>قضاياي النشطة</CardTitle>
              <CardDescription>متابعة حالة القضايا الحالية</CardDescription>
            </CardHeader>
            <CardContent>
              {existingCases.length > 0 ? (
                <div className="space-y-4">
                  {existingCases.map((case_) => (
                    <div key={case_.id} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h3 className="font-semibold">{case_.title}</h3>
                          <p className="text-sm text-muted-foreground">رقم القضية: {case_.id}</p>
                        </div>
                        <div className="flex gap-2">
                          {getStatusBadge(case_.status)}
                          {getPriorityBadge(case_.priority)}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">الأطراف:</span>
                          <p className="text-muted-foreground">{case_.parties.join(' ضد ')}</p>
                        </div>
                        <div>
                          <span className="font-medium">نوع النزاع:</span>
                          <p className="text-muted-foreground">
                            {caseTypes.find(t => t.value === case_.type)?.label}
                          </p>
                        </div>
                        <div>
                          <span className="font-medium">تاريخ التقديم:</span>
                          <p className="text-muted-foreground">
                            {case_.submitDate.toLocaleDateString('ar-SA')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" variant="outline">عرض التفاصيل</Button>
                        <Button size="sm" variant="outline">رفع مستند</Button>
                        {case_.status === 'mediation' && (
                          <Button size="sm">الرد على الوساطة</Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">لا توجد قضايا نشطة</h3>
                  <p className="text-muted-foreground mb-4">ليس لديك قضايا تحكيم نشطة حالياً</p>
                  <Button onClick={() => setActiveTab('new-case')}>
                    تقديم قضية جديدة
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="new-case" className="space-y-6">
          <form onSubmit={handleSubmitCase} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>تقديم قضية تحكيم جديدة</CardTitle>
                <CardDescription>
                  يرجى ملء جميع المعلومات المطلوبة بدقة
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="case-title">عنوان القضية *</Label>
                  <Input
                    id="case-title"
                    value={newCase.title}
                    onChange={(e) => setNewCase(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="وصف موجز للنزاع"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="case-type">نوع النزاع *</Label>
                    <Select 
                      value={newCase.type} 
                      onValueChange={(value) => setNewCase(prev => ({ ...prev, type: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر نوع النزاع" />
                      </SelectTrigger>
                      <SelectContent>
                        {caseTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.icon} {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="urgency">مستوى الأولوية *</Label>
                    <Select 
                      value={newCase.urgency} 
                      onValueChange={(value) => setNewCase(prev => ({ ...prev, urgency: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="اختر مستوى الأولوية" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">منخفض</SelectItem>
                        <SelectItem value="medium">متوسط</SelectItem>
                        <SelectItem value="high">عالي</SelectItem>
                        <SelectItem value="urgent">عاجل</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="opposing-party">الطرف الآخر *</Label>
                    <Input
                      id="opposing-party"
                      value={newCase.opposingParty}
                      onChange={(e) => setNewCase(prev => ({ ...prev, opposingParty: e.target.value }))}
                      placeholder="اسم الشركة أو الفرد"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="amount">المبلغ المتنازع عليه</Label>
                    <Input
                      id="amount"
                      value={newCase.amount}
                      onChange={(e) => setNewCase(prev => ({ ...prev, amount: e.target.value }))}
                      placeholder="مثال: 50,000 ريال"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">تفاصيل النزاع *</Label>
                  <Textarea
                    id="description"
                    value={newCase.description}
                    onChange={(e) => setNewCase(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="شرح مفصل للنزاع والأحداث المؤدية إليه..."
                    required
                    rows={5}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>رفع الأدلة والمستندات</CardTitle>
                <CardDescription>
                  العقود، الفواتير، المراسلات، وأي مستندات داعمة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <IPFSUpload
                  acceptedTypes={['.pdf', '.doc', '.docx', '.jpg', '.png', '.txt']}
                  maxSize={25}
                  onFileUploaded={(file) => {
                    setNewCase(prev => ({ 
                      ...prev, 
                      evidence: [...prev.evidence, file.hash] 
                    }));
                  }}
                />
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button 
                type="submit" 
                size="lg" 
                disabled={!newCase.title || !newCase.type || !newCase.description}
                className="w-full md:w-auto px-8"
              >
                <Gavel className="h-4 w-4 mr-2" />
                تقديم القضية للتحكيم
              </Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ORDAArbitration;
