
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Users, UserPlus, FileText, CheckCircle, ShoppingCart, BarChart3, Globe, CheckCheck } from 'lucide-react';

// Group Types
export type GroupType = 'solo' | 'dao';
export type GroupCategory = 'purchasing' | 'marketing' | 'freelancers' | 'suppliers';
export type GroupStatus = 'active' | 'pending' | 'completed';

// Group Interface
export interface Group {
  id: string;
  title: string;
  type: GroupCategory;
  groupType: GroupType;
  category: 'individual' | 'collective';
  members: number;
  country: string;
  votesRequired: number;
  votesReceived: number;
  daysLeft: number;
  icon: React.ReactNode;
  description: string;
}

// Mock groups data
const groups: Group[] = [
  {
    id: 'group-purchase-electronics',
    title: 'مجموعة شراء الإلكترونيات',
    type: 'purchasing',
    groupType: 'dao',
    category: 'collective',
    members: 28,
    country: 'السعودية',
    votesRequired: 15,
    votesReceived: 12,
    daysLeft: 5,
    icon: <ShoppingCart className="h-6 w-6 text-primary" />,
    description: 'مجموعة تعاونية لشراء أجهزة إلكترونية بكميات كبيرة للحصول على أسعار تفضيلية'
  },
  {
    id: 'group-marketing-campaign',
    title: 'حملة تسويقية مشتركة',
    type: 'marketing',
    groupType: 'dao',
    category: 'collective',
    members: 12,
    country: 'مصر',
    votesRequired: 8,
    votesReceived: 8,
    daysLeft: 0,
    icon: <BarChart3 className="h-6 w-6 text-primary" />,
    description: 'حملة تسويقية مشتركة بين عدة شركات في قطاع التجزئة'
  },
  {
    id: 'solo-freelancer-web',
    title: 'خدمات تطوير الويب',
    type: 'freelancers',
    groupType: 'solo',
    category: 'individual',
    members: 1,
    country: 'الإمارات',
    votesRequired: 0,
    votesReceived: 0,
    daysLeft: 0,
    icon: <Users className="h-6 w-6 text-primary" />,
    description: 'خدمات تطوير مواقع الويب والتطبيقات للشركات الصغيرة والمتوسطة'
  },
  {
    id: 'group-regional-suppliers',
    title: 'موردي المنطقة الشرقية',
    type: 'suppliers',
    groupType: 'dao',
    category: 'collective',
    members: 32,
    country: 'السعودية',
    votesRequired: 20,
    votesReceived: 15,
    daysLeft: 7,
    icon: <Globe className="h-6 w-6 text-primary" />,
    description: 'مجموعة من الموردين في المنطقة الشرقية للتعاون في توريد المواد الأولية'
  }
];

interface GroupSystemProps {
  initialFilter?: GroupCategory | 'all';
  portalType?: string;
}

const GroupSystem: React.FC<GroupSystemProps> = ({ initialFilter = 'all', portalType }) => {
  const [activeTab, setActiveTab] = useState<GroupCategory | 'all'>(initialFilter);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [groupTypeFilter, setGroupTypeFilter] = useState<GroupType | 'all'>('all');
  const { toast } = useToast();
  
  // Filter groups based on active tab and group type
  const filteredGroups = groups.filter(group => {
    const matchesTab = activeTab === 'all' || group.type === activeTab;
    const matchesGroupType = groupTypeFilter === 'all' || group.groupType === groupTypeFilter;
    const matchesPortal = !portalType || group.type === portalType;
    
    return matchesTab && matchesGroupType && matchesPortal;
  });

  const handleCreateGroup = () => {
    toast({
      title: "تم إنشاء المجموعة",
      description: "سيتم توجيهك إلى صفحة المجموعة الجديدة",
    });
    setDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-semibold">المجموعات النشطة</h2>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full sm:w-auto">
            <TabsList className="grid grid-cols-3 sm:grid-cols-5 w-full sm:w-auto">
              <TabsTrigger value="all">الكل</TabsTrigger>
              <TabsTrigger value="purchasing">الشراء</TabsTrigger>
              <TabsTrigger value="marketing">التسويق</TabsTrigger>
              <TabsTrigger value="freelancers">المستقلون</TabsTrigger>
              <TabsTrigger value="suppliers">الموردون</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex gap-2 mt-2 sm:mt-0">
            <Select value={groupTypeFilter} onValueChange={value => setGroupTypeFilter(value as any)}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="نوع المجموعة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">الكل</SelectItem>
                <SelectItem value="solo">فردي</SelectItem>
                <SelectItem value="dao">جماعي</SelectItem>
              </SelectContent>
            </Select>
            
            <Button onClick={() => setDialogOpen(true)}>إنشاء مجموعة</Button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredGroups.map((group) => (
          <Card key={group.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                {group.icon}
                <div className="flex gap-2">
                  <Badge variant={group.category === 'collective' ? 'default' : 'secondary'}>
                    {group.category === 'collective' ? 'جماعي' : 'فردي'}
                  </Badge>
                  {group.groupType === 'solo' && (
                    <Badge variant="outline">فردي</Badge>
                  )}
                  {group.groupType === 'dao' && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-50">DAO</Badge>
                  )}
                </div>
              </div>
              <CardTitle className="mt-4 text-xl">{group.title}</CardTitle>
              <CardDescription className="flex justify-between">
                <span>{group.country}</span>
                <span>{group.members} عضو</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{group.description}</p>
              {group.groupType === 'dao' ? (
                <div className="bg-muted p-2 rounded flex justify-between text-sm">
                  <span>التصويت: {group.votesReceived}/{group.votesRequired}</span>
                  {group.daysLeft > 0 ? (
                    <span>متبقي {group.daysLeft} أيام</span>
                  ) : (
                    <span className="text-green-500">مكتمل</span>
                  )}
                </div>
              ) : (
                <div className="bg-muted p-2 rounded flex justify-between text-sm">
                  <span>حالة المجموعة</span>
                  <span className="text-green-500">نشط</span>
                </div>
              )}
            </CardContent>
            <CardFooter className="pt-0 pb-4 flex justify-center">
              <Button asChild>
                <Link to={`/groups/${group.id}`}>عرض المجموعة</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}

        {filteredGroups.length === 0 && (
          <div className="col-span-full text-center py-10">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">لا توجد مجموعات</h3>
            <p className="text-sm text-muted-foreground mb-6">لم يتم العثور على مجموعات تطابق معايير البحث</p>
            <Button onClick={() => {
              setActiveTab('all');
              setGroupTypeFilter('all');
            }} variant="outline" className="mr-2">إعادة ضبط المعايير</Button>
            <Button onClick={() => setDialogOpen(true)}>إنشاء مجموعة جديدة</Button>
          </div>
        )}
      </div>

      {/* Create Group Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>إنشاء مجموعة جديدة</DialogTitle>
            <DialogDescription>
              أدخل تفاصيل المجموعة الجديدة. يمكنك إنشاء مجموعة فردية أو جماعية.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="title">اسم المجموعة</label>
              <Input id="title" placeholder="أدخل اسم المجموعة" />
            </div>
            <div className="grid gap-2">
              <label htmlFor="description">وصف المجموعة</label>
              <Textarea id="description" placeholder="أدخل وصف المجموعة" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="type">نوع المجموعة</label>
                <Select defaultValue="dao">
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع المجموعة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solo">فردي</SelectItem>
                    <SelectItem value="dao">جماعي (DAO)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="category">التصنيف</label>
                <Select defaultValue="purchasing">
                  <SelectTrigger>
                    <SelectValue placeholder="اختر تصنيف" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="purchasing">الشراء</SelectItem>
                    <SelectItem value="marketing">التسويق</SelectItem>
                    <SelectItem value="freelancers">المستقلون</SelectItem>
                    <SelectItem value="suppliers">الموردون</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label htmlFor="country">الدولة</label>
                <Select defaultValue="sa">
                  <SelectTrigger>
                    <SelectValue placeholder="اختر الدولة" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sa">السعودية</SelectItem>
                    <SelectItem value="ae">الإمارات</SelectItem>
                    <SelectItem value="eg">مصر</SelectItem>
                    <SelectItem value="kw">الكويت</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="members">الحد الأقصى للأعضاء</label>
                <Input id="members" type="number" placeholder="عدد الأعضاء" defaultValue="10" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>إلغاء</Button>
            <Button onClick={handleCreateGroup}>إنشاء المجموعة</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GroupSystem;
