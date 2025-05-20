
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NewMainLayout from '@/components/layout/NewMainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ShoppingCart, BarChart3, Users, Building, Plus, Loader2 } from 'lucide-react';
import { GroupType } from '@/types';

// Sample group data
const myGroups = [
  {
    id: 'group-1',
    title: 'مجموعة شراء إلكترونيات',
    type: 'buying',
    status: 'active',
    members: 12,
    progress: 60,
    isAdmin: true,
    description: 'مجموعة لشراء أجهزة إلكترونية بكميات كبيرة للحصول على خصومات',
    createdAt: '2025-05-01'
  },
  {
    id: 'group-2',
    title: 'حملة تسويقية مشتركة',
    type: 'marketing',
    status: 'pending',
    members: 8,
    progress: 30,
    isAdmin: false,
    description: 'حملة تسويقية مشتركة لمجموعة من المتاجر الإلكترونية',
    createdAt: '2025-05-10'
  }
];

const MyGroups = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [groupType, setGroupType] = useState<GroupType>('buying');
  
  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsCreating(false);
      setCreateDialogOpen(false);
      window.location.href = `/create-group/${groupType}`;
    }, 1000);
  };
  
  const getGroupIcon = (type: string) => {
    switch (type) {
      case 'buying':
        return <ShoppingCart className="h-6 w-6 text-primary" />;
      case 'marketing':
        return <BarChart3 className="h-6 w-6 text-primary" />;
      case 'company_formation':
        return <Building className="h-6 w-6 text-primary" />;
      case 'freelancers':
        return <Users className="h-6 w-6 text-primary" />;
      default:
        return <ShoppingCart className="h-6 w-6 text-primary" />;
    }
  };
  
  const getGroupStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default">نشطة</Badge>;
      case 'pending':
        return <Badge variant="secondary">قيد الإنتظار</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-600 hover:bg-green-50">مكتملة</Badge>;
      default:
        return <Badge variant="outline">غير معروفة</Badge>;
    }
  };
  
  // Filter groups based on active tab
  const filteredGroups = activeTab === 'all' 
    ? myGroups 
    : myGroups.filter(group => group.type === activeTab);

  return (
    <NewMainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold">مجموعاتي</h1>
          <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> إنشاء مجموعة جديدة
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>إنشاء مجموعة جديدة</DialogTitle>
                <DialogDescription>
                  اختر نوع المجموعة التي تريد إنشائها
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateGroup} className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Select 
                    value={groupType} 
                    onValueChange={(value) => setGroupType(value as GroupType)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر نوع المجموعة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="buying">مجموعة شراء</SelectItem>
                      <SelectItem value="marketing">مجموعة تسويق</SelectItem>
                      <SelectItem value="company_formation">تأسيس شركة</SelectItem>
                      <SelectItem value="freelancers">مجموعة مستقلين</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <DialogFooter>
                  <Button type="submit" disabled={isCreating}>
                    {isCreating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> جاري الإنشاء...
                      </>
                    ) : (
                      'متابعة الإنشاء'
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <p className="text-muted-foreground">
          إدارة المجموعات الخاصة بك ومتابعة تقدمها
        </p>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-5 w-full md:w-auto">
            <TabsTrigger value="all">الكل</TabsTrigger>
            <TabsTrigger value="buying">الشراء</TabsTrigger>
            <TabsTrigger value="marketing">التسويق</TabsTrigger>
            <TabsTrigger value="company_formation">التأسيس</TabsTrigger>
            <TabsTrigger value="freelancers">المستقلون</TabsTrigger>
          </TabsList>
          
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredGroups.map(group => (
              <Card key={group.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    {getGroupIcon(group.type)}
                    {getGroupStatusBadge(group.status)}
                  </div>
                  <CardTitle className="mt-4 text-xl">{group.title}</CardTitle>
                  <CardDescription className="flex justify-between">
                    <span>{group.members} عضو</span>
                    <span>أُنشئت في {group.createdAt}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{group.description}</p>
                  {/* Progress bar */}
                  <div className="w-full bg-muted h-2 rounded-full mb-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${group.progress}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mb-4">
                    <span>التقدم</span>
                    <span>{group.progress}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    {group.isAdmin && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-600 hover:bg-blue-50">
                        أنت المسؤول
                      </Badge>
                    )}
                    <Button asChild className="ml-auto">
                      <Link to={`/groups/${group.id}`}>عرض المجموعة</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredGroups.length === 0 && (
              <div className="col-span-full text-center py-10">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">لم يتم العثور على مجموعات</h3>
                <p className="text-sm text-muted-foreground mb-6">لم تقم بإنشاء أو الانضمام إلى أي مجموعات من هذا النوع بعد</p>
                <Button onClick={() => setCreateDialogOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" /> إنشاء مجموعة جديدة
                </Button>
              </div>
            )}
          </div>
        </Tabs>
      </div>
    </NewMainLayout>
  );
};

export default MyGroups;
