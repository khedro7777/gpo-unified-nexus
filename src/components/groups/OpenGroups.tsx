
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Users, 
  MapPin, 
  Calendar, 
  Eye, 
  MessageSquare, 
  Share2, 
  Mail, 
  ExternalLink,
  UserPlus,
  Briefcase,
  Target,
  Clock,
  Star,
  Shield
} from 'lucide-react';

interface OpenGroup {
  id: string;
  name: string;
  type: 'buying' | 'marketing' | 'freelancers' | 'suppliers' | 'formation';
  description: string;
  shortDescription: string;
  country: string;
  sector: string;
  phase: string;
  status: string;
  members: number;
  maxMembers: number;
  createdAt: string;
  lastActivity: string;
  isPrivate: boolean;
  requirements: string[];
  supplierRequirements?: string[];
  freelancerTasks?: Array<{
    title: string;
    description: string;
    budget: string;
    deadline: string;
  }>;
  organizer: {
    name: string;
    rating: number;
    completedGroups: number;
  };
}

interface OpenGroupsProps {
  groups: OpenGroup[];
  searchFilters: any;
}

const OpenGroups: React.FC<OpenGroupsProps> = ({ groups, searchFilters }) => {
  const [selectedGroup, setSelectedGroup] = useState<OpenGroup | null>(null);
  const [emailForInvite, setEmailForInvite] = useState('');
  const [messageToGroup, setMessageToGroup] = useState('');

  // Mock data - في التطبيق الحقيقي سيتم جلبها من API
  const mockGroups: OpenGroup[] = [
    {
      id: '1',
      name: 'مجموعة شراء أجهزة لابتوب للشركات الناشئة',
      type: 'buying',
      description: 'نحن مجموعة من أصحاب الشركات الناشئة نهدف لشراء أجهزة لابتوب عالية الجودة بأسعار الجملة. نبحث عن أجهزة بمواصفات محددة تناسب احتياجات التطوير والتصميم.',
      shortDescription: 'شراء أجهزة لابتوب عالية الجودة بأسعار مخفضة للشركات الناشئة',
      country: 'السعودية',
      sector: 'تكنولوجيا',
      phase: 'negotiation',
      status: 'active',
      members: 18,
      maxMembers: 30,
      createdAt: '2024-01-15',
      lastActivity: '2 ساعات',
      isPrivate: false,
      requirements: [
        'معالج Intel Core i7 الجيل 12 أو أحدث',
        'ذاكرة وصول عشوائي 16GB DDR4 على الأقل',
        'قرص صلب SSD 512GB',
        'كارت جرافيك منفصل للتصميم',
        'ضمان لمدة 3 سنوات كاملة'
      ],
      supplierRequirements: [
        'خبرة في توريد الأجهزة للشركات',
        'إمكانية التسليم خلال 21 يوم',
        'دعم فني بعد البيع',
        'أسعار تنافسية للكميات الكبيرة'
      ],
      organizer: {
        name: 'أحمد محمد الشريف',
        rating: 4.8,
        completedGroups: 12
      }
    },
    {
      id: '2',
      name: 'حملة تسويقية للمنتجات الصحية الطبيعية',
      type: 'marketing',
      description: 'مجموعة من أصحاب العلامات التجارية للمنتجات الصحية الطبيعية نخطط لحملة تسويقية مشتركة في دول الخليج. الهدف هو تقليل تكاليف التسويق وزيادة الوصول.',
      shortDescription: 'حملة تسويق مشتركة للمنتجات الصحية الطبيعية في الخليج',
      country: 'الإمارات',
      sector: 'صحة وعافية',
      phase: 'admin_election',
      status: 'active',
      members: 8,
      maxMembers: 15,
      createdAt: '2024-01-20',
      lastActivity: '6 ساعات',
      isPrivate: false,
      requirements: [
        'منتجات صحية معتمدة',
        'خبرة تسويقية في المنطقة',
        'ميزانية تسويقية 50,000 درهم على الأقل',
        'التزام بالحملة لمدة 6 أشهر'
      ],
      organizer: {
        name: 'سارة أحمد الكندي',
        rating: 4.6,
        completedGroups: 8
      }
    },
    {
      id: '3',
      name: 'مشروع تطوير تطبيق للتجارة الإلكترونية',
      type: 'freelancers',
      description: 'نبحث عن فريق من المطورين والمصممين لتطوير تطبيق تجارة إلكترونية متكامل. المشروع يتطلب خبرات متنوعة في التطوير والتصميم والتسويق الرقمي.',
      shortDescription: 'تطوير تطبيق تجارة إلكترونية متكامل مع فريق من المستقلين',
      country: 'الكويت',
      sector: 'تجارة إلكترونية',
      phase: 'founding',
      status: 'active',
      members: 3,
      maxMembers: 12,
      createdAt: '2024-01-25',
      lastActivity: '1 يوم',
      isPrivate: false,
      requirements: [
        'خبرة في تطوير التطبيقات',
        'معرفة بأنظمة الدفع الإلكتروني',
        'مهارات في تصميم واجهات المستخدم',
        'القدرة على العمل ضمن فريق'
      ],
      freelancerTasks: [
        {
          title: 'مطور Flutter/React Native',
          description: 'تطوير التطبيق للأندرويد والآيفون',
          budget: '15,000 - 25,000 ريال',
          deadline: '3 أشهر'
        },
        {
          title: 'مصمم UI/UX',
          description: 'تصميم واجهات المستخدم وتجربة الاستخدام',
          budget: '8,000 - 12,000 ريال',
          deadline: '6 أسابيع'
        },
        {
          title: 'مطور Backend',
          description: 'تطوير الخادم وقواعد البيانات',
          budget: '12,000 - 18,000 ريال',
          deadline: '10 أسابيع'
        }
      ],
      organizer: {
        name: 'محمد علي البوسعيدي',
        rating: 4.9,
        completedGroups: 15
      }
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'buying': return <Briefcase className="h-5 w-5 text-blue-600" />;
      case 'marketing': return <Target className="h-5 w-5 text-green-600" />;
      case 'freelancers': return <Users className="h-5 w-5 text-purple-600" />;
      case 'suppliers': return <Users className="h-5 w-5 text-orange-600" />;
      case 'formation': return <Users className="h-5 w-5 text-indigo-600" />;
      default: return <Users className="h-5 w-5 text-gray-600" />;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'buying': return 'شراء تعاوني';
      case 'marketing': return 'تسويق تعاوني';
      case 'freelancers': return 'مستقلون';
      case 'suppliers': return 'موردون';
      case 'formation': return 'تأسيس شركات';
      default: return type;
    }
  };

  const getPhaseText = (phase: string) => {
    switch (phase) {
      case 'founding': return 'تأسيس';
      case 'admin_election': return 'انتخاب المديرين';
      case 'negotiation': return 'تفاوض';
      case 'voting': return 'تصويت';
      case 'contracting': return 'عقود';
      default: return phase;
    }
  };

  const handleSendMessage = () => {
    // إرسال رسالة للمجموعة
    console.log('Sending message:', messageToGroup);
    setMessageToGroup('');
  };

  const handleInviteByEmail = () => {
    // دعوة عضو بالإيميل
    console.log('Inviting:', emailForInvite);
    setEmailForInvite('');
  };

  const handleShareGroup = (groupId: string) => {
    // مشاركة رابط المجموعة
    const shareUrl = `${window.location.origin}/groups/${groupId}`;
    navigator.clipboard.writeText(shareUrl);
    // يمكن إضافة toast هنا
  };

  // فلترة المجموعات حسب البحث والفلاتر
  const filteredGroups = mockGroups.filter(group => {
    if (searchFilters.search && !group.name.toLowerCase().includes(searchFilters.search.toLowerCase()) &&
        !group.description.toLowerCase().includes(searchFilters.search.toLowerCase())) {
      return false;
    }
    if (searchFilters.gateway && group.type !== searchFilters.gateway) return false;
    if (searchFilters.country && group.country !== searchFilters.country) return false;
    if (searchFilters.sector && group.sector !== searchFilters.sector) return false;
    if (searchFilters.status && group.phase !== searchFilters.status) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">المجموعات المفتوحة</h2>
        <p className="text-gray-600">{filteredGroups.length} مجموعة متاحة</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredGroups.map((group) => (
          <Card key={group.id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getTypeIcon(group.type)}
                  <Badge variant="outline">{getTypeText(group.type)}</Badge>
                </div>
                <Badge variant="secondary">{getPhaseText(group.phase)}</Badge>
              </div>

              <CardTitle className="text-lg leading-tight line-clamp-2">
                {group.name}
              </CardTitle>
              
              <CardDescription className="line-clamp-3">
                {group.shortDescription}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{group.country}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{group.members}/{group.maxMembers}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span>{group.organizer.rating}</span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-gray-600">{group.organizer.completedGroups} مجموعة مكتملة</span>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>آخر نشاط: {group.lastActivity}</span>
                </div>
                {group.isPrivate && (
                  <div className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    <span>خاص</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex-1" onClick={() => setSelectedGroup(group)}>
                      <Eye className="h-4 w-4 mr-2" />
                      عرض التفاصيل
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                    {selectedGroup && (
                      <>
                        <DialogHeader>
                          <DialogTitle className="text-xl">{selectedGroup.name}</DialogTitle>
                          <DialogDescription className="text-base">
                            {selectedGroup.description}
                          </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6 mt-6">
                          {/* معلومات المجموعة */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">النوع:</span>
                              <p className="font-medium">{getTypeText(selectedGroup.type)}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">الدولة:</span>
                              <p className="font-medium">{selectedGroup.country}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">القطاع:</span>
                              <p className="font-medium">{selectedGroup.sector}</p>
                            </div>
                            <div>
                              <span className="text-gray-500">الأعضاء:</span>
                              <p className="font-medium">{selectedGroup.members}/{selectedGroup.maxMembers}</p>
                            </div>
                          </div>

                          {/* منظم المجموعة */}
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <h4 className="font-medium mb-2">منظم المجموعة</h4>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                                <span className="font-medium">{selectedGroup.organizer.name.charAt(0)}</span>
                              </div>
                              <div>
                                <p className="font-medium">{selectedGroup.organizer.name}</p>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 text-yellow-500" />
                                    <span>{selectedGroup.organizer.rating}</span>
                                  </div>
                                  <span>•</span>
                                  <span>{selectedGroup.organizer.completedGroups} مجموعة مكتملة</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* المتطلبات */}
                          <div>
                            <h4 className="font-medium mb-3">متطلبات المجموعة</h4>
                            <ul className="space-y-2">
                              {selectedGroup.requirements.map((req, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm">
                                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                                  <span>{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* متطلبات الموردين */}
                          {selectedGroup.supplierRequirements && (
                            <div>
                              <h4 className="font-medium mb-3">متطلبات الموردين</h4>
                              <ul className="space-y-2">
                                {selectedGroup.supplierRequirements.map((req, index) => (
                                  <li key={index} className="flex items-start gap-2 text-sm">
                                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span>{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* مهام المستقلين */}
                          {selectedGroup.freelancerTasks && (
                            <div>
                              <h4 className="font-medium mb-3">المهام المطلوبة من المستقلين</h4>
                              <div className="space-y-3">
                                {selectedGroup.freelancerTasks.map((task, index) => (
                                  <div key={index} className="p-3 border rounded-lg">
                                    <h5 className="font-medium mb-1">{task.title}</h5>
                                    <p className="text-sm text-gray-600 mb-2">{task.description}</p>
                                    <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                                      <span>الميزانية: {task.budget}</span>
                                      <span>المدة: {task.deadline}</span>
                                    </div>
                                    <Button size="sm" className="mt-2">
                                      اقدم عرضك
                                    </Button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* أزرار التفاعل */}
                          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                            <Button className="flex-1">
                              <UserPlus className="h-4 w-4 mr-2" />
                              طلب الانضمام
                            </Button>
                            
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline">
                                  <MessageSquare className="h-4 w-4 mr-2" />
                                  رسالة للمجموعة
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>إرسال رسالة للمجموعة</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <Textarea
                                    placeholder="اكتب رسالتك هنا..."
                                    value={messageToGroup}
                                    onChange={(e) => setMessageToGroup(e.target.value)}
                                  />
                                  <Button onClick={handleSendMessage} className="w-full">
                                    إرسال الرسالة
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>

                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline">
                                  <Mail className="h-4 w-4 mr-2" />
                                  دعوة بالإيميل
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>دعوة عضو جديد</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <Input
                                    type="email"
                                    placeholder="البريد الإلكتروني"
                                    value={emailForInvite}
                                    onChange={(e) => setEmailForInvite(e.target.value)}
                                  />
                                  <Button onClick={handleInviteByEmail} className="w-full">
                                    إرسال الدعوة
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>

                            <Button variant="outline" onClick={() => handleShareGroup(selectedGroup.id)}>
                              <Share2 className="h-4 w-4 mr-2" />
                              مشاركة
                            </Button>
                          </div>

                          {selectedGroup.isPrivate && (
                            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                              <p className="text-sm text-yellow-800">
                                <Shield className="h-4 w-4 inline mr-1" />
                                للانضمام لهذه المجموعة تحتاج لموافقة المشرف
                              </p>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </DialogContent>
                </Dialog>

                <Button size="sm">
                  <UserPlus className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredGroups.length === 0 && (
        <div className="text-center py-12">
          <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-900 mb-2">لا توجد مجموعات</h3>
          <p className="text-gray-500 mb-6">
            لم يتم العثور على مجموعات تطابق معايير البحث الخاصة بك
          </p>
          <Button asChild>
            <Link to="/create-group">
              إنشاء مجموعة جديدة
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default OpenGroups;
