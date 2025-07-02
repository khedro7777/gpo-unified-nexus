
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Wallet, 
  Plus, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Star,
  Gift,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PointsTransaction {
  id: string;
  type: 'earn' | 'spend' | 'purchase' | 'bonus';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  service?: string;
}

interface PointsWalletProps {
  userId?: string;
}

const PointsWallet: React.FC<PointsWalletProps> = ({ userId }) => {
  const { toast } = useToast();
  const [pointsBalance, setPointsBalance] = useState(2500);
  const [pendingPoints, setPendingPoints] = useState(150);
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  const transactions: PointsTransaction[] = [
    {
      id: '1',
      type: 'earn',
      amount: 500,
      description: 'مكافأة إكمال مجموعة الشراء الجماعي',
      date: '2024-01-15',
      status: 'completed',
      service: 'شراء جماعي'
    },
    {
      id: '2',
      type: 'spend',
      amount: 200,
      description: 'اشتراك الخطة الاحترافية',
      date: '2024-01-12',
      status: 'completed',
      service: 'اشتراك'
    },
    {
      id: '3',
      type: 'purchase',
      amount: 100,
      description: 'خدمة التحكيم المتقدمة',
      date: '2024-01-10',
      status: 'completed',
      service: 'تحكيم'
    },
    {
      id: '4',
      type: 'bonus',
      amount: 150,
      description: 'مكافأة الولاء الشهرية',
      date: '2024-01-08',
      status: 'pending'
    }
  ];

  const servicePackages = [
    {
      id: 'basic-plan',
      name: 'الخطة الأساسية',
      description: 'وصول للمميزات الأساسية',
      points: 300,
      features: ['حتى 5 مجموعات', 'دعم أساسي', 'تصويت بسيط']
    },
    {
      id: 'pro-plan',
      name: 'الخطة الاحترافية',
      description: 'مميزات متقدمة للمحترفين',
      points: 800,
      features: ['مجموعات غير محدودة', 'دعم الأولوية', 'تصويت متقدم', 'تحليلات']
    },
    {
      id: 'arbitration-service',
      name: 'خدمة التحكيم',
      description: 'حل النزاعات المتقدم',
      points: 150,
      features: ['تحكيم سريع', 'خبراء متخصصون', 'حلول مخصصة']
    },
    {
      id: 'governance-tools',
      name: 'أدوات الحوكمة',
      description: 'أدوات التصويت والإدارة',
      points: 250,
      features: ['تصويت متقدم', 'إدارة القرارات', 'تقارير مفصلة']
    }
  ];

  const handlePurchasePoints = () => {
    const amount = parseInt(purchaseAmount);
    if (!amount || amount <= 0) {
      toast({
        title: "خطأ في المبلغ",
        description: "يرجى إدخال عدد نقاط صحيح",
        variant: "destructive"
      });
      return;
    }

    // Simulate points purchase (1 SAR = 10 points)
    const cost = amount / 10;
    toast({
      title: "تم بدء عملية الشراء",
      description: `سيتم إضافة ${amount} نقطة بتكلفة ${cost} ريال`,
    });
    setPurchaseAmount('');
  };

  const handlePurchaseService = (service: any) => {
    if (pointsBalance >= service.points) {
      setPointsBalance(prev => prev - service.points);
      toast({
        title: "تم الشراء بنجاح",
        description: `تم شراء ${service.name} بـ ${service.points} نقطة`,
      });
    } else {
      toast({
        title: "نقاط غير كافية",
        description: `تحتاج إلى ${service.points - pointsBalance} نقطة إضافية`,
        variant: "destructive"
      });
    }
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'earn':
        return <ArrowDownLeft className="h-4 w-4 text-green-600" />;
      case 'spend':
        return <ArrowUpRight className="h-4 w-4 text-red-600" />;
      case 'purchase':
        return <ArrowUpRight className="h-4 w-4 text-blue-600" />;
      case 'bonus':
        return <Gift className="h-4 w-4 text-purple-600" />;
      default:
        return <Wallet className="h-4 w-4" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-orange-500" />;
      case 'failed':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      {/* Points Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-100">رصيد النقاط</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold mb-1 flex items-center gap-2">
              <Star className="h-8 w-8" />
              {pointsBalance.toLocaleString()}
            </div>
            <p className="text-xs text-blue-100">نقطة متاحة للاستخدام</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">نقاط في الانتظار</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600 mb-1 flex items-center gap-2">
              <Clock className="h-6 w-6" />
              {pendingPoints}
            </div>
            <p className="text-xs text-gray-600">ستضاف خلال 24 ساعة</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">القيمة النقدية</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600 mb-1">
              {(pointsBalance / 10).toLocaleString()} ريال
            </div>
            <p className="text-xs text-gray-600">10 نقاط = 1 ريال</p>
          </CardContent>
        </Card>
      </div>

      {/* Purchase Points */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            شراء نقاط
          </CardTitle>
          <CardDescription>
            اشتر نقاط إضافية لاستخدامها في الخدمات والاشتراكات
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">عدد النقاط</label>
              <Input
                type="number"
                placeholder="مثال: 1000"
                value={purchaseAmount}
                onChange={(e) => setPurchaseAmount(e.target.value)}
              />
            </div>
            <div className="text-sm text-gray-600">
              التكلفة: {purchaseAmount ? (parseInt(purchaseAmount) / 10).toFixed(2) : '0'} ريال
            </div>
            <Button onClick={handlePurchasePoints}>
              شراء النقاط
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
          <TabsTrigger value="services">الخدمات</TabsTrigger>
          <TabsTrigger value="transactions">المعاملات</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>احصائيات الاستخدام</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>النقاط المكتسبة هذا الشهر</span>
                  <Badge variant="secondary">+850</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>النقاط المستخدمة</span>
                  <Badge variant="outline">-320</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span>الخدمات المشتراة</span>
                  <Badge>5</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>مكافآت الولاء</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Gift className="h-8 w-8 text-purple-500" />
                  <div>
                    <p className="font-medium">مكافأة شهرية</p>
                    <p className="text-sm text-gray-600">150 نقطة كل شهر</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="h-8 w-8 text-yellow-500" />
                  <div>
                    <p className="font-medium">مكافأة الإنجاز</p>
                    <p className="text-sm text-gray-600">نقاط إضافية عند إتمام المهام</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicePackages.map((service) => (
              <Card key={service.id} className="relative">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{service.name}</CardTitle>
                      <CardDescription>{service.description}</CardDescription>
                    </div>
                    <Badge variant={pointsBalance >= service.points ? "default" : "secondary"}>
                      {service.points} نقطة
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    onClick={() => handlePurchaseService(service)}
                    disabled={pointsBalance < service.points}
                  >
                    {pointsBalance >= service.points ? 'شراء بالنقاط' : 'نقاط غير كافية'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>سجل المعاملات</CardTitle>
              <CardDescription>جميع معاملات النقاط الخاصة بك</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      {getTransactionIcon(transaction.type)}
                      <div>
                        <h4 className="font-medium">{transaction.description}</h4>
                        <p className="text-sm text-gray-600">
                          {transaction.date} {transaction.service && `• ${transaction.service}`}
                        </p>
                      </div>
                    </div>
                    <div className="text-left flex items-center gap-3">
                      <div className={`font-semibold ${
                        transaction.type === 'earn' || transaction.type === 'bonus' 
                          ? 'text-green-600' 
                          : 'text-red-600'
                      }`}>
                        {transaction.type === 'spend' || transaction.type === 'purchase' ? '-' : '+'}
                        {transaction.amount} نقطة
                      </div>
                      {getStatusIcon(transaction.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PointsWallet;
