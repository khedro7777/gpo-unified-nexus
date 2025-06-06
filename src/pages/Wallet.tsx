
import React, { useState } from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Wallet, CreditCard, ArrowUpRight, ArrowDownLeft, 
  DollarSign, TrendingUp, PieChart, Clock,
  Plus, Download, Upload, Eye, Shield,
  AlertCircle, CheckCircle, XCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const WalletPage = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [amount, setAmount] = useState('');

  // Mock wallet data
  const walletData = {
    balance: 12450.75,
    pendingAmount: 2300.00,
    totalEarnings: 45600.00,
    totalSpent: 33149.25,
    currency: 'SAR'
  };

  const transactions = [
    {
      id: 1,
      type: 'received',
      amount: 1500.00,
      description: 'مكافأة من مجموعة شراء الأجهزة الذكية',
      date: '2024-01-10',
      status: 'completed',
      reference: 'TXN-001234'
    },
    {
      id: 2,
      type: 'sent',
      amount: 750.00,
      description: 'دفع رسوم العضوية السنوية',
      date: '2024-01-08',
      status: 'completed',
      reference: 'TXN-001233'
    },
    {
      id: 3,
      type: 'pending',
      amount: 2300.00,
      description: 'وفورات مجموعة التسويق الجماعي',
      date: '2024-01-05',
      status: 'pending',
      reference: 'TXN-001232'
    },
    {
      id: 4,
      type: 'received',
      amount: 3200.00,
      description: 'أرباح من مشروع تطوير التطبيق',
      date: '2024-01-03',
      status: 'completed',
      reference: 'TXN-001231'
    }
  ];

  const subscriptions = [
    {
      id: 1,
      name: 'عضوية GPO بريميوم',
      price: 99.00,
      period: 'شهرياً',
      nextBilling: '2024-02-01',
      status: 'active',
      features: ['وصول لجميع المجموعات', 'دعم أولوية', 'تحليلات متقدمة']
    },
    {
      id: 2,
      name: 'خدمة التحكيم المتقدمة',
      price: 49.00,
      period: 'شهرياً',
      nextBilling: '2024-02-05',
      status: 'active',
      features: ['حل نزاعات سريع', 'تحكيم بالذكاء الاصطناعي']
    }
  ];

  const handleDeposit = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "خطأ في المبلغ",
        description: "يرجى إدخال مبلغ صحيح",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "تم بدء عملية الإيداع",
      description: `سيتم إيداع ${amount} ريال في محفظتك قريباً`,
    });
    setAmount('');
  };

  const handleWithdraw = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "خطأ في المبلغ",
        description: "يرجى إدخال مبلغ صحيح",
        variant: "destructive"
      });
      return;
    }

    if (parseFloat(amount) > walletData.balance) {
      toast({
        title: "رصيد غير كافٍ",
        description: "المبلغ المطلوب أكبر من رصيدك المتاح",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "تم بدء عملية السحب",
      description: `سيتم تحويل ${amount} ريال إلى حسابك البنكي`,
    });
    setAmount('');
  };

  return (
    <NewMainLayout>
      <div className="space-y-8" dir="rtl">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Wallet className="h-8 w-8 text-primary" />
              المحفظة الذكية
            </h1>
            <p className="text-gray-600 mt-1">
              إدارة أموالك ومعاملاتك المالية بأمان وسهولة
            </p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-green-600 hover:bg-green-700">
              <Download className="h-4 w-4 ml-2" />
              تحميل كشف حساب
            </Button>
            <Button variant="outline">
              <Shield className="h-4 w-4 ml-2" />
              الأمان
            </Button>
          </div>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-primary to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-blue-100">الرصيد المتاح</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-1">
                {walletData.balance.toLocaleString()} {walletData.currency}
              </div>
              <p className="text-xs text-blue-100">
                +12% من الشهر الماضي
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">في الانتظار</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {walletData.pendingAmount.toLocaleString()} {walletData.currency}
              </div>
              <p className="text-xs text-gray-600">
                سيتم الإضافة خلال 3 أيام
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">إجمالي الأرباح</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 mb-1">
                {walletData.totalEarnings.toLocaleString()} {walletData.currency}
              </div>
              <p className="text-xs text-gray-600">
                منذ انضمامك للمنصة
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">إجمالي المصروفات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600 mb-1">
                {walletData.totalSpent.toLocaleString()} {walletData.currency}
              </div>
              <p className="text-xs text-gray-600">
                رسوم ومشتريات
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>إجراءات سريعة</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-green-600">إيداع</h3>
                <Input
                  type="number"
                  placeholder="المبلغ بالريال السعودي"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <Button onClick={handleDeposit} className="w-full bg-green-600 hover:bg-green-700">
                  <Upload className="h-4 w-4 ml-2" />
                  إيداع
                </Button>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-blue-600">سحب</h3>
                <Input
                  type="number"
                  placeholder="المبلغ بالريال السعودي"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <Button onClick={handleWithdraw} variant="outline" className="w-full">
                  <Download className="h-4 w-4 ml-2" />
                  سحب
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">نظرة عامة</TabsTrigger>
            <TabsTrigger value="transactions">المعاملات</TabsTrigger>
            <TabsTrigger value="subscriptions">الاشتراكات</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    تحليل الأرباح
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>وفورات جماعية</span>
                        <span className="font-medium">75%</span>
                      </div>
                      <Progress value={75} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>أرباح المستقلين</span>
                        <span className="font-medium">20%</span>
                      </div>
                      <Progress value={20} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>عمولات أخرى</span>
                        <span className="font-medium">5%</span>
                      </div>
                      <Progress value={5} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-blue-500" />
                    توزيع المصروفات
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>رسوم العضوية</span>
                        <span className="font-medium">1,188 {walletData.currency}</span>
                      </div>
                      <Progress value={60} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>خدمات إضافية</span>
                        <span className="font-medium">588 {walletData.currency}</span>
                      </div>
                      <Progress value={30} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>رسوم معاملات</span>
                        <span className="font-medium">196 {walletData.currency}</span>
                      </div>
                      <Progress value={10} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>سجل المعاملات</CardTitle>
                <CardDescription>
                  جميع المعاملات المالية الخاصة بك
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${
                          transaction.type === 'received' ? 'bg-green-100 text-green-600' :
                          transaction.type === 'sent' ? 'bg-red-100 text-red-600' :
                          'bg-orange-100 text-orange-600'
                        }`}>
                          {transaction.type === 'received' ? <ArrowDownLeft className="h-5 w-5" /> :
                           transaction.type === 'sent' ? <ArrowUpRight className="h-5 w-5" /> :
                           <Clock className="h-5 w-5" />}
                        </div>
                        <div>
                          <h4 className="font-medium">{transaction.description}</h4>
                          <p className="text-sm text-gray-600">{transaction.date} • {transaction.reference}</p>
                        </div>
                      </div>
                      <div className="text-left">
                        <div className={`font-semibold ${
                          transaction.type === 'received' ? 'text-green-600' :
                          transaction.type === 'sent' ? 'text-red-600' :
                          'text-orange-600'
                        }`}>
                          {transaction.type === 'sent' ? '-' : '+'}{transaction.amount.toLocaleString()} {walletData.currency}
                        </div>
                        <Badge variant={transaction.status === 'completed' ? 'default' : 'secondary'}>
                          {transaction.status === 'completed' ? (
                            <>
                              <CheckCircle className="h-3 w-3 ml-1" />
                              مكتمل
                            </>
                          ) : (
                            <>
                              <Clock className="h-3 w-3 ml-1" />
                              في الانتظار
                            </>
                          )}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscriptions" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {subscriptions.map((subscription) => (
                <Card key={subscription.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{subscription.name}</CardTitle>
                      <Badge className="bg-green-100 text-green-800">
                        نشط
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold">{subscription.price} {walletData.currency}</span>
                      <span className="text-gray-600">{subscription.period}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">المميزات المشمولة:</h4>
                      <ul className="space-y-1">
                        {subscription.features.map((feature, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <p className="text-sm text-gray-600 mb-3">
                        التجديد التالي: {subscription.nextBilling}
                      </p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          إدارة
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600 hover:bg-red-50">
                          إلغاء
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </NewMainLayout>
  );
};

export default WalletPage;
