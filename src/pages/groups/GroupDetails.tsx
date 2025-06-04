import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NewMainLayout from '@/components/layout/NewMainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  Users,
  MapPin,
  Calendar,
  DollarSign,
  FileText,
  MessageSquare,
  Vote,
  Settings,
  Share2,
  Plus,
  Upload,
  Download,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Heart,
  Star,
  Target,
  Briefcase,
  Globe
} from 'lucide-react';

// Import components
import ContractManagement from '@/components/groups/contract/ContractManagement';
import LoomioDiscussion from '@/components/voting/LoomioDiscussion';
import SnapshotVoting from '@/components/voting/SnapshotVoting';

const GroupDetails = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data - في التطبيق الحقيقي سيتم جلبها من API
  const groupData = {
    id: id || '1',
    name: isRTL ? 'مجموعة شراء الأجهزة الذكية' : 'Smart Devices Buying Group',
    type: isRTL ? 'شراء تعاوني' : 'Cooperative Buying',
    description: isRTL 
      ? 'مجموعة لشراء الأجهزة الذكية بأسعار مميزة من خلال التفاوض الجماعي مع الموردين'
      : 'Group for buying smart devices at special prices through collective negotiation with suppliers',
    location: isRTL ? 'الرياض، السعودية' : 'Riyadh, Saudi Arabia',
    targetAmount: 50000,
    currentAmount: 32500,
    memberCount: 45,
    maxMembers: 100,
    endDate: '2024-01-15',
    status: 'active',
    category: 'electronics',
    tags: isRTL ? ['أجهزة ذكية', 'إلكترونيات', 'خصومات'] : ['Smart Devices', 'Electronics', 'Discounts'],
    organizer: {
      name: isRTL ? 'أحمد محمد' : 'Ahmed Mohamed',
      avatar: '/placeholder.svg',
      rating: 4.8,
      completedGroups: 12
    }
  };

  const members = [
    { id: 1, name: isRTL ? 'سارة أحمد' : 'Sara Ahmed', avatar: '/placeholder.svg', joinDate: '2024-01-01', contribution: 1500 },
    { id: 2, name: isRTL ? 'محمد علي' : 'Mohamed Ali', avatar: '/placeholder.svg', joinDate: '2024-01-02', contribution: 2000 },
    { id: 3, name: isRTL ? 'فاطمة محمد' : 'Fatima Mohamed', avatar: '/placeholder.svg', joinDate: '2024-01-03', contribution: 1800 },
    { id: 4, name: isRTL ? 'خالد أحمد' : 'Khalid Ahmed', avatar: '/placeholder.svg', joinDate: '2024-01-04', contribution: 2200 },
  ];

  const offers = [
    {
      id: 1,
      supplier: isRTL ? 'شركة التقنية المتقدمة' : 'Advanced Tech Co.',
      product: isRTL ? 'هواتف ذكية - باقة 50 جهاز' : 'Smart Phones - 50 Units Package',
      price: 45000,
      discount: '15%',
      delivery: isRTL ? '14 يوم' : '14 days',
      rating: 4.5,
      status: 'pending'
    },
    {
      id: 2,
      supplier: isRTL ? 'مؤسسة الإلكترونيات الحديثة' : 'Modern Electronics Est.',
      product: isRTL ? 'هواتف ذكية - باقة 50 جهاز' : 'Smart Phones - 50 Units Package',
      price: 48000,
      discount: '12%',
      delivery: isRTL ? '10 أيام' : '10 days',
      rating: 4.2,
      status: 'negotiating'
    }
  ];

  const getProgressPercentage = () => {
    return (groupData.currentAmount / groupData.targetAmount) * 100;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'completed': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return isRTL ? 'نشطة' : 'Active';
      case 'pending': return isRTL ? 'قيد المراجعة' : 'Pending';
      case 'completed': return isRTL ? 'مكتملة' : 'Completed';
      default: return status;
    }
  };

  return (
    <NewMainLayout>
      <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-lg p-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl lg:text-3xl font-bold">{groupData.name}</h1>
                <Badge className={`${getStatusColor(groupData.status)} text-white`}>
                  {getStatusText(groupData.status)}
                </Badge>
              </div>
              <p className="text-muted-foreground">{groupData.description}</p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {groupData.location}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {groupData.memberCount}/{groupData.maxMembers} {isRTL ? 'عضو' : 'members'}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {isRTL ? 'ينتهي في' : 'Ends on'} {groupData.endDate}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                {isRTL ? 'مشاركة' : 'Share'}
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                {isRTL ? 'انضمام' : 'Join'}
              </Button>
            </div>
          </div>
        </div>

        {/* Progress Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              {isRTL ? 'تقدم المجموعة' : 'Group Progress'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  {isRTL ? 'المبلغ المحقق' : 'Amount Raised'}
                </span>
                <span className="text-sm font-bold">
                  ${groupData.currentAmount.toLocaleString()} / ${groupData.targetAmount.toLocaleString()}
                </span>
              </div>
              <Progress value={getProgressPercentage()} className="h-3" />
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">{Math.round(getProgressPercentage())}%</div>
                  <div className="text-sm text-muted-foreground">{isRTL ? 'مكتمل' : 'Complete'}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{groupData.memberCount}</div>
                  <div className="text-sm text-muted-foreground">{isRTL ? 'أعضاء' : 'Members'}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-600">7</div>
                  <div className="text-sm text-muted-foreground">{isRTL ? 'أيام متبقية' : 'Days Left'}</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{offers.length}</div>
                  <div className="text-sm text-muted-foreground">{isRTL ? 'عروض' : 'Offers'}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:grid-cols-6">
            <TabsTrigger value="overview" className="text-xs lg:text-sm">
              <Eye className="h-4 w-4 mr-1" />
              {t('overview')}
            </TabsTrigger>
            <TabsTrigger value="members" className="text-xs lg:text-sm">
              <Users className="h-4 w-4 mr-1" />
              {t('members')}
            </TabsTrigger>
            <TabsTrigger value="offers" className="text-xs lg:text-sm">
              <Briefcase className="h-4 w-4 mr-1" />
              {t('offers')}
            </TabsTrigger>
            <TabsTrigger value="contract" className="text-xs lg:text-sm">
              <FileText className="h-4 w-4 mr-1" />
              {t('contract')}
            </TabsTrigger>
            <TabsTrigger value="voting" className="text-xs lg:text-sm">
              <Vote className="h-4 w-4 mr-1" />
              {t('voting')}
            </TabsTrigger>
            <TabsTrigger value="chat" className="text-xs lg:text-sm">
              <MessageSquare className="h-4 w-4 mr-1" />
              {t('chat')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Group Info */}
              <Card>
                <CardHeader>
                  <CardTitle>{isRTL ? 'معلومات المجموعة' : 'Group Information'}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={groupData.organizer.avatar} />
                      <AvatarFallback>{groupData.organizer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{groupData.organizer.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {groupData.organizer.rating} • {groupData.organizer.completedGroups} {isRTL ? 'مجموعة مكتملة' : 'completed groups'}
                      </div>
                    </div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>{isRTL ? 'النوع' : 'Type'}:</span>
                      <span className="font-medium">{groupData.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{isRTL ? 'الفئة' : 'Category'}:</span>
                      <span className="font-medium">{groupData.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{isRTL ? 'تاريخ الإنشاء' : 'Created'}:</span>
                      <span className="font-medium">2024-01-01</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {groupData.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>{isRTL ? 'النشاط الأخير' : 'Recent Activity'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
                      <div className="flex-1">
                        <div className="text-sm">{isRTL ? 'انضم عضو جديد' : 'New member joined'}</div>
                        <div className="text-xs text-muted-foreground">{isRTL ? 'منذ ساعتين' : '2 hours ago'}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                      <div className="flex-1">
                        <div className="text-sm">{isRTL ? 'عرض جديد من مورد' : 'New offer from supplier'}</div>
                        <div className="text-xs text-muted-foreground">{isRTL ? 'منذ 4 ساعات' : '4 hours ago'}</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></div>
                      <div className="flex-1">
                        <div className="text-sm">{isRTL ? 'بدء تصويت جديد' : 'New voting started'}</div>
                        <div className="text-xs text-muted-foreground">{isRTL ? 'منذ يوم' : '1 day ago'}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="members" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{isRTL ? 'أعضاء المجموعة' : 'Group Members'} ({groupData.memberCount})</span>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    {isRTL ? 'دعوة أعضاء' : 'Invite Members'}
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {members.map((member) => (
                    <div key={member.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <Avatar>
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{member.name}</div>
                        <div className="text-xs text-muted-foreground">
                          ${member.contribution} • {isRTL ? 'انضم في' : 'Joined'} {member.joinDate}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="offers" className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">{isRTL ? 'عروض الموردين' : 'Supplier Offers'}</h3>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                {isRTL ? 'طلب عرض' : 'Request Offer'}
              </Button>
            </div>
            
            <div className="grid gap-4">
              {offers.map((offer) => (
                <Card key={offer.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{offer.supplier}</h4>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-xs">{offer.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{offer.product}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <DollarSign className="h-3 w-3" />
                            ${offer.price.toLocaleString()}
                          </span>
                          <span className="text-green-600 font-medium">{offer.discount} {isRTL ? 'خصم' : 'discount'}</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {offer.delivery}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={offer.status === 'pending' ? 'default' : 'secondary'}>
                          {offer.status === 'pending' ? (isRTL ? 'قيد المراجعة' : 'Pending') : (isRTL ? 'تفاوض' : 'Negotiating')}
                        </Badge>
                        <Button size="sm" variant="outline">
                          {isRTL ? 'عرض التفاصيل' : 'View Details'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="contract" className="space-y-6">
            <ContractManagement groupId={groupData.id} />
          </TabsContent>

          <TabsContent value="voting" className="space-y-6">
            <div className="space-y-6">
              <SnapshotVoting 
                proposalId={groupData.id}
                title={isRTL ? 'اختيار أفضل عرض للمجموعة' : 'Choose Best Offer for Group'}
                description={isRTL ? 'تصويت لاختيار أفضل عرض من الموردين للمجموعة' : 'Vote to select the best supplier offer for the group'}
                endTime="2024-01-20T23:59:59Z"
              />
              <LoomioDiscussion topicId={groupData.id} />
            </div>
          </TabsContent>

          <TabsContent value="chat" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  {isRTL ? 'نقاش المجموعة' : 'Group Discussion'}
                </CardTitle>
                <CardDescription>
                  {isRTL 
                    ? 'تواصل مع أعضاء المجموعة ومناقشة التفاصيل' 
                    : 'Communicate with group members and discuss details'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>{isRTL ? 'ستتوفر ميزة الدردشة قريباً' : 'Chat feature coming soon'}</p>
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
