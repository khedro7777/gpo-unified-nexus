
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NewMainLayout from '@/components/layout/NewMainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  ShoppingCart, 
  FileText, 
  Vote, 
  Upload,
  Calendar,
  DollarSign,
  Target,
  MessageSquare,
  Share2,
  Eye
} from 'lucide-react';
import ContractManagement from '@/components/groups/contract/ContractManagement';
import SnapDAOIntegration from '@/components/dao/SnapDAOIntegration';
import LoomioDiscussion from '@/components/voting/LoomioDiscussion';

const GroupDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('overview');
  const isRTL = i18n.language === 'ar';

  // Mock data
  const groupData = {
    id: id,
    name: isRTL ? 'مجموعة شراء الإلكترونيات' : 'Electronics Buying Group',
    type: 'buying',
    status: 'active',
    description: isRTL 
      ? 'مجموعة لشراء الأجهزة الإلكترونية بأسعار مخفضة من خلال الشراء الجماعي'
      : 'Group for buying electronics at discounted prices through bulk purchasing',
    targetAmount: 50000,
    currentAmount: 35000,
    membersCount: 23,
    deadline: '2024-02-15',
    category: isRTL ? 'الإلكترونيات' : 'Electronics',
    createdDate: '2024-01-01'
  };

  const members = [
    { 
      id: 1, 
      name: isRTL ? 'أحمد محمد' : 'Ahmed Mohamed', 
      role: isRTL ? 'منشئ المجموعة' : 'Group Creator', 
      joinDate: '2024-01-01', 
      contribution: 5000 
    },
    { 
      id: 2, 
      name: isRTL ? 'فاطمة علي' : 'Fatima Ali', 
      role: isRTL ? 'عضو' : 'Member', 
      joinDate: '2024-01-05', 
      contribution: 3000 
    },
    { 
      id: 3, 
      name: isRTL ? 'خالد أحمد' : 'Khaled Ahmed', 
      role: isRTL ? 'عضو' : 'Member', 
      joinDate: '2024-01-08', 
      contribution: 2500 
    },
  ];

  const offers = [
    {
      id: 1,
      supplier: isRTL ? 'شركة التقنية المتقدمة' : 'Advanced Technology Co.',
      product: isRTL ? 'أجهزة لابتوب HP - 10 قطع' : 'HP Laptops - 10 units',
      price: 25000,
      status: 'pending',
      deliveryTime: isRTL ? '14 يوم' : '14 days',
      warranty: isRTL ? 'سنتان' : '2 years'
    },
    {
      id: 2,
      supplier: isRTL ? 'مؤسسة الإلكترونيات الحديثة' : 'Modern Electronics Corp.',
      product: isRTL ? 'أجهزة لابتوب Dell - 10 قطع' : 'Dell Laptops - 10 units',
      price: 28000,
      status: 'approved',
      deliveryTime: isRTL ? '10 أيام' : '10 days',
      warranty: isRTL ? 'سنة واحدة' : '1 year'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return t('active');
      case 'pending': return t('pending');
      case 'approved': return t('approved');
      case 'completed': return t('completed');
      default: return status;
    }
  };

  const progress = (groupData.currentAmount / groupData.targetAmount) * 100;

  return (
    <NewMainLayout>
      <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Enhanced Group Header */}
        <Card className="overflow-hidden">
          <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 p-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-primary/20 rounded-xl flex items-center justify-center">
                    <ShoppingCart className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{groupData.name}</h1>
                      <Badge className={getStatusColor(groupData.status)}>
                        {getStatusText(groupData.status)}
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed">{groupData.description}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {t('join')}
                </Button>
                <Button size="lg" variant="outline" className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  {t('share')}
                </Button>
                <Button size="lg" variant="outline" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  {isRTL ? 'مراقبة' : 'Watch'}
                </Button>
              </div>
            </div>
          </div>
          
          <CardContent className="p-6">
            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-xl">
                <div className="flex items-center justify-center gap-2 text-blue-600 mb-2">
                  <Users className="h-5 w-5" />
                  <span className="text-3xl font-bold">{groupData.membersCount}</span>
                </div>
                <p className="text-sm text-gray-600 font-medium">{isRTL ? 'عضو' : 'Members'}</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
                  <DollarSign className="h-5 w-5" />
                  <span className="text-3xl font-bold">{groupData.currentAmount.toLocaleString()}</span>
                </div>
                <p className="text-sm text-gray-600 font-medium">{isRTL ? 'ر.س مجمع' : 'SAR Collected'}</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-xl">
                <div className="flex items-center justify-center gap-2 text-purple-600 mb-2">
                  <Target className="h-5 w-5" />
                  <span className="text-3xl font-bold">{Math.round(progress)}%</span>
                </div>
                <p className="text-sm text-gray-600 font-medium">{isRTL ? 'مكتمل' : 'Complete'}</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-xl">
                <div className="flex items-center justify-center gap-2 text-orange-600 mb-2">
                  <Calendar className="h-5 w-5" />
                  <span className="text-3xl font-bold">12</span>
                </div>
                <p className="text-sm text-gray-600 font-medium">{isRTL ? 'يوم متبقي' : 'Days Left'}</p>
              </div>
            </div>
            
            {/* Enhanced Progress Bar */}
            <div className="space-y-3">
              <div className="flex justify-between items-center text-sm font-medium">
                <span className="text-gray-700">
                  {isRTL ? 'التقدم' : 'Progress'}: {groupData.currentAmount.toLocaleString()} / {groupData.targetAmount.toLocaleString()} {isRTL ? 'ر.س' : 'SAR'}
                </span>
                <span className="text-primary font-bold">{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-primary to-blue-500 h-4 rounded-full transition-all duration-500 ease-out relative overflow-hidden" 
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 h-auto p-1 bg-gray-100">
            <TabsTrigger value="overview" className="flex items-center gap-2 py-3">
              <Eye className="h-4 w-4" />
              <span className="hidden sm:block">{t('overview')}</span>
            </TabsTrigger>
            <TabsTrigger value="members" className="flex items-center gap-2 py-3">
              <Users className="h-4 w-4" />
              <span className="hidden sm:block">{t('members')}</span>
            </TabsTrigger>
            <TabsTrigger value="offers" className="flex items-center gap-2 py-3">
              <ShoppingCart className="h-4 w-4" />
              <span className="hidden sm:block">{t('offers')}</span>
            </TabsTrigger>
            <TabsTrigger value="contract" className="flex items-center gap-2 py-3">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:block">{t('contract')}</span>
            </TabsTrigger>
            <TabsTrigger value="voting" className="flex items-center gap-2 py-3">
              <Vote className="h-4 w-4" />
              <span className="hidden sm:block">{t('voting')}</span>
            </TabsTrigger>
            <TabsTrigger value="chat" className="flex items-center gap-2 py-3">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:block">{t('chat')}</span>
            </TabsTrigger>
            <TabsTrigger value="files" className="flex items-center gap-2 py-3">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:block">{t('files')}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    {isRTL ? 'تفاصيل المجموعة' : 'Group Details'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium text-gray-500">{isRTL ? 'النوع:' : 'Type:'}</span>
                      <p className="font-medium">{t('buying')}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">{isRTL ? 'الفئة:' : 'Category:'}</span>
                      <p className="font-medium">{groupData.category}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">{isRTL ? 'تاريخ الإنشاء:' : 'Created:'}</span>
                      <p className="font-medium">{groupData.createdDate}</p>
                    </div>
                    <div>
                      <span className="font-medium text-gray-500">{isRTL ? 'الموعد النهائي:' : 'Deadline:'}</span>
                      <p className="font-medium">{groupData.deadline}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    {isRTL ? 'آخر التحديثات' : 'Recent Updates'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{isRTL ? 'انضمام عضو جديد' : 'New member joined'}</p>
                        <p className="text-xs text-gray-500">{isRTL ? 'منذ ساعتين' : '2 hours ago'}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{isRTL ? 'وصول عرض جديد من مورد' : 'New supplier offer received'}</p>
                        <p className="text-xs text-gray-500">{isRTL ? 'منذ 5 ساعات' : '5 hours ago'}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-500">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{isRTL ? 'بدء التصويت على العرض' : 'Voting started on offer'}</p>
                        <p className="text-xs text-gray-500">{isRTL ? 'منذ يوم واحد' : '1 day ago'}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="members" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  {t('members')} ({members.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-4 border rounded-xl hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                          {member.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{member.name}</p>
                          <p className="text-sm text-gray-500">{member.role}</p>
                          <p className="text-xs text-gray-400">{isRTL ? 'انضم في' : 'Joined'} {member.joinDate}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-green-600">{member.contribution.toLocaleString()} {isRTL ? 'ر.س' : 'SAR'}</p>
                        <Button size="sm" variant="outline" className="mt-2">
                          {isRTL ? 'تواصل' : 'Contact'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="offers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5 text-primary" />
                  {isRTL ? 'عروض الموردين' : 'Supplier Offers'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {offers.map((offer) => (
                    <div key={offer.id} className="border rounded-xl p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h4 className="font-bold text-lg text-gray-900">{offer.product}</h4>
                          <p className="text-gray-600 font-medium">{offer.supplier}</p>
                        </div>
                        <Badge className={getStatusColor(offer.status)}>
                          {getStatusText(offer.status)}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <span className="text-xs text-gray-500 uppercase tracking-wide">{isRTL ? 'السعر' : 'Price'}</span>
                          <p className="font-bold text-xl text-green-600">{offer.price.toLocaleString()} {isRTL ? 'ر.س' : 'SAR'}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <span className="text-xs text-gray-500 uppercase tracking-wide">{isRTL ? 'التسليم' : 'Delivery'}</span>
                          <p className="font-semibold">{offer.deliveryTime}</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <span className="text-xs text-gray-500 uppercase tracking-wide">{isRTL ? 'الضمان' : 'Warranty'}</span>
                          <p className="font-semibold">{offer.warranty}</p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button className="flex-1">
                          {t('accept')}
                        </Button>
                        <Button variant="outline" className="flex-1">
                          {t('negotiate')}
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contract" className="space-y-4">
            <ContractManagement groupId={id!} />
          </TabsContent>

          <TabsContent value="voting" className="space-y-4">
            <SnapDAOIntegration />
          </TabsContent>

          <TabsContent value="chat" className="space-y-4">
            <LoomioDiscussion groupId={id!} />
          </TabsContent>

          <TabsContent value="files" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  {t('files')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-primary/50 transition-colors">
                  <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4 text-lg">{isRTL ? 'اسحب الملفات هنا أو اضغط للتحميل' : 'Drag files here or click to upload'}</p>
                  <Button size="lg" className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    {t('upload')}
                  </Button>
                </div>
                
                <div className="mt-8 space-y-3">
                  <h4 className="font-semibold text-lg">{isRTL ? 'الملفات المحملة:' : 'Uploaded Files:'}</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{isRTL ? 'مواصفات المنتج.pdf' : 'product-specs.pdf'}</p>
                          <p className="text-sm text-gray-500">2.5 MB</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        {t('download')}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <FileText className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">{isRTL ? 'شروط التسليم.docx' : 'delivery-terms.docx'}</p>
                          <p className="text-sm text-gray-500">1.8 MB</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        {t('download')}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </NewMainLayout>
  );
};

export default GroupDetails;
