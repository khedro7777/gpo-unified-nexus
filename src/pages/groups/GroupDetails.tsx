
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import NewMainLayout from '@/components/layout/NewMainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Eye, Users, Briefcase, FileText, Vote, MessageSquare, Bell } from 'lucide-react';

// Import refactored components
import GroupHeader from '@/components/groups/details/GroupHeader';
import GroupProgress from '@/components/groups/details/GroupProgress';
import GroupOverview from '@/components/groups/details/GroupOverview';
import GroupMembers from '@/components/groups/details/GroupMembers';
import GroupOffers from '@/components/groups/details/GroupOffers';
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

  return (
    <NewMainLayout>
      <div className="space-y-8" dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Enhanced Header */}
        <GroupHeader groupData={groupData} />

        {/* Enhanced Progress Card */}
        <GroupProgress 
          targetAmount={groupData.targetAmount}
          currentAmount={groupData.currentAmount}
          memberCount={groupData.memberCount}
          offersCount={offers.length}
        />

        {/* Enhanced Tabs with better styling */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-6 lg:grid-cols-6 h-12 bg-muted/30 rounded-xl">
            <TabsTrigger value="overview" className="text-xs lg:text-sm rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Eye className="h-4 w-4 mr-1" />
              {t('overview')}
            </TabsTrigger>
            <TabsTrigger value="members" className="text-xs lg:text-sm rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Users className="h-4 w-4 mr-1" />
              {t('members')}
            </TabsTrigger>
            <TabsTrigger value="offers" className="text-xs lg:text-sm rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Briefcase className="h-4 w-4 mr-1" />
              {t('offers')}
            </TabsTrigger>
            <TabsTrigger value="contract" className="text-xs lg:text-sm rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <FileText className="h-4 w-4 mr-1" />
              {t('contract')}
            </TabsTrigger>
            <TabsTrigger value="voting" className="text-xs lg:text-sm rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <Vote className="h-4 w-4 mr-1" />
              {t('voting')}
            </TabsTrigger>
            <TabsTrigger value="chat" className="text-xs lg:text-sm rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
              <MessageSquare className="h-4 w-4 mr-1" />
              {t('chat')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8 animate-fade-in">
            <GroupOverview 
              organizer={groupData.organizer}
              type={groupData.type}
              category={groupData.category}
              tags={groupData.tags}
            />
          </TabsContent>

          <TabsContent value="members" className="space-y-8 animate-fade-in">
            <GroupMembers members={members} memberCount={groupData.memberCount} />
          </TabsContent>

          <TabsContent value="offers" className="space-y-8 animate-fade-in">
            <GroupOffers offers={offers} />
          </TabsContent>

          <TabsContent value="contract" className="space-y-8 animate-fade-in">
            <ContractManagement groupId={groupData.id} />
          </TabsContent>

          <TabsContent value="voting" className="space-y-8 animate-fade-in">
            <div className="space-y-8">
              <SnapshotVoting 
                proposalId={groupData.id}
                title={isRTL ? 'اختيار أفضل عرض للمجموعة' : 'Choose Best Offer for Group'}
                description={isRTL ? 'تصويت لاختيار أفضل عرض من الموردين للمجموعة' : 'Vote to select the best supplier offer for the group'}
                endTime="2024-01-20T23:59:59Z"
              />
              <LoomioDiscussion topicId={groupData.id} />
            </div>
          </TabsContent>

          <TabsContent value="chat" className="space-y-8 animate-fade-in">
            <Card className="shadow-lg border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  {isRTL ? 'نقاش المجموعة المتقدم' : 'Advanced Group Discussion'}
                </CardTitle>
                <CardDescription>
                  {isRTL 
                    ? 'تواصل مع أعضاء المجموعة ومناقشة التفاصيل باستخدام ميزات الذكاء الاصطناعي' 
                    : 'Communicate with group members and discuss details using AI-powered features'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                    <MessageSquare className="h-12 w-12 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {isRTL ? 'مناقشات ذكية قادمة' : 'Smart Discussions Coming Soon'}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {isRTL 
                      ? 'ستتوفر ميزة المناقشات المدعومة بالذكاء الاصطناعي قريباً مع دعم الترجمة الفورية والتلخيص التلقائي' 
                      : 'AI-powered discussions with real-time translation and automatic summarization coming soon'
                    }
                  </p>
                  <Button variant="outline" className="gap-2">
                    <Bell className="h-4 w-4" />
                    {isRTL ? 'تنبيهي عند التوفر' : 'Notify When Available'}
                  </Button>
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
