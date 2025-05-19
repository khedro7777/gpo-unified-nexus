
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Users, ThumbsUp, ThumbsDown, Search, Filter, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const proposals = [
  {
    id: 1,
    title: 'تخصيص صندوق المجتمع',
    description: 'اقتراح لتخصيص 5% من أموال الخزينة لمشاريع تطوير المجتمع',
    status: 'active',
    votes: { yes: 23, no: 7, abstain: 3 },
    deadline: '2025-06-01',
    author: 'member1.eth',
    category: 'finance'
  },
  {
    id: 2,
    title: 'تكامل مورد جديد',
    description: 'إضافة XYZ Manufacturing كمورد معتمد للمشتريات التعاونية',
    status: 'pending',
    votes: { yes: 0, no: 0, abstain: 0 },
    deadline: '2025-06-05',
    author: 'member2.eth',
    category: 'supplier'
  },
  {
    id: 3,
    title: 'تحديث قواعد العضوية',
    description: 'مراجعة معايير العضوية لتشمل التحقق من بيانات الاعتماد',
    status: 'completed',
    votes: { yes: 42, no: 5, abstain: 1 },
    deadline: '2025-05-15',
    author: 'member3.eth',
    category: 'membership'
  },
  {
    id: 4,
    title: 'تطوير واجهة المستخدم للمنصة',
    description: 'تحسينات على واجهة المستخدم لزيادة سهولة الاستخدام',
    status: 'active',
    votes: { yes: 18, no: 2, abstain: 1 },
    deadline: '2025-06-10',
    author: 'member4.eth',
    category: 'development'
  },
  {
    id: 5,
    title: 'إضافة طرق دفع جديدة',
    description: 'إضافة خيارات دفع جديدة تشمل PayPal وVodafone Cash',
    status: 'pending',
    votes: { yes: 0, no: 0, abstain: 0 },
    deadline: '2025-06-12',
    author: 'member5.eth',
    category: 'finance'
  }
];

const GovernanceProposals = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Filter proposals based on active tab
  const filteredProposals = proposals.filter(proposal => {
    const matchesTab = activeTab === 'all' || proposal.status === activeTab;
    const matchesSearch = proposal.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          proposal.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || proposal.category === categoryFilter;
    
    return matchesTab && matchesSearch && matchesCategory;
  });
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">المقترحات</h2>
        <Link to="/governance/proposals/create">
          <Button>إنشاء مقترح جديد</Button>
        </Link>
      </div>
      
      <div className="bg-muted/30 p-4 rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="البحث في المقترحات..." 
              className="pl-10 pr-4" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">التصنيف:</span>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-auto flex-1">
                <SelectValue placeholder="جميع التصنيفات" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع التصنيفات</SelectItem>
                <SelectItem value="finance">التمويل</SelectItem>
                <SelectItem value="supplier">الموردين</SelectItem>
                <SelectItem value="membership">العضوية</SelectItem>
                <SelectItem value="development">التطوير</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="all">الكل</TabsTrigger>
            <TabsTrigger value="active">نشط</TabsTrigger>
            <TabsTrigger value="pending">قيد الانتظار</TabsTrigger>
            <TabsTrigger value="completed">مكتمل</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="grid gap-4">
        {filteredProposals.length > 0 ? (
          filteredProposals.map((proposal) => (
            <Card key={proposal.id} className={`border-l-4 ${
              proposal.status === 'active' ? 'border-l-blue-500' : 
              proposal.status === 'completed' ? 'border-l-green-500' : 
              'border-l-amber-500'}`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{proposal.title}</CardTitle>
                  <Badge variant={
                    proposal.status === 'active' ? 'default' : 
                    proposal.status === 'completed' ? 'outline' : 
                    'secondary'
                  }>
                    {proposal.status === 'active' ? 'نشط' : 
                     proposal.status === 'completed' ? 'مكتمل' : 'قيد الانتظار'}
                  </Badge>
                </div>
                <CardDescription className="flex items-center gap-2 text-sm">
                  <FileText size={14} /> اقترحه {proposal.author}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">{proposal.description}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Users size={14} />
                  <span>{proposal.votes.yes + proposal.votes.no + proposal.votes.abstain} مشارك</span>
                  {proposal.votes.yes > 0 && (
                    <span className="flex items-center gap-1"><ThumbsUp size={14} /> {proposal.votes.yes}</span>
                  )}
                  {proposal.votes.no > 0 && (
                    <span className="flex items-center gap-1"><ThumbsDown size={14} /> {proposal.votes.no}</span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="pt-0 flex justify-between">
                <span className="text-xs text-muted-foreground">الموعد النهائي: {proposal.deadline}</span>
                <div className="space-x-2 space-x-reverse">
                  <Link to={`/governance/proposals/${proposal.id}`}>
                    <Button size="sm" variant="outline" className="flex items-center gap-1">
                      التفاصيل <ChevronRight size={14} />
                    </Button>
                  </Link>
                  {proposal.status === 'active' && (
                    <Link to={`/governance/voting?proposal=${proposal.id}`}>
                      <Button size="sm">تصويت</Button>
                    </Link>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">لا توجد مقترحات تطابق معايير البحث</p>
            <Button variant="outline" className="mt-4" onClick={() => {
              setSearchTerm('');
              setCategoryFilter('all');
              setActiveTab('all');
            }}>إعادة ضبط البحث</Button>
          </div>
        )}
      </div>
      
      <div className="bg-muted/30 p-4 rounded-lg">
        <h3 className="font-medium mb-2">دليل سريع للمقترحات</h3>
        <ul className="text-sm space-y-1 text-muted-foreground">
          <li>• لإنشاء مقترح جديد، يجب امتلاك ما لا يقل عن 500 رمز GPO</li>
          <li>• المقترحات النشطة تتطلب 30% نصاب للتصويت قبل الموعد النهائي</li>
          <li>• يتم تنفيذ المقترحات المعتمدة تلقائيًا بعد انتهاء فترة التصويت</li>
          <li>• يمكن مناقشة المقترحات في قسم المداولات قبل طرحها للتصويت</li>
        </ul>
      </div>
    </div>
  );
};

export default GovernanceProposals;
