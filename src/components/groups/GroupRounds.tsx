
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Clock, FileText, MessageCircle, CheckCircle, XCircle, FileUp, Send } from 'lucide-react';

interface Round {
  id: string;
  title: string;
  type: 'rfq' | 'negotiation' | 'contract';
  status: 'active' | 'completed' | 'pending';
  deadline: string;
  description: string;
  votesRequired?: number;
  votesReceived?: number;
  suppliers?: {
    id: string;
    name: string;
    proposal: string;
    price: string;
    status: 'pending' | 'accepted' | 'rejected' | 'counter_offer';
  }[];
}

// Sample data for rounds
const rounds: Round[] = [
  {
    id: 'round-rfq-1',
    title: 'جولة تقديم العروض',
    type: 'rfq',
    status: 'completed',
    deadline: '2025-05-10',
    description: 'فتح المجال للموردين لتقديم عروضهم لتوريد أجهزة الحاسب الآلي',
    suppliers: [
      {
        id: 'supplier-1',
        name: 'شركة التقنية الحديثة',
        proposal: 'توريد 20 جهاز حاسب آلي من نوع HP بمواصفات عالية',
        price: '45,000 ر.س',
        status: 'accepted'
      },
      {
        id: 'supplier-2',
        name: 'مؤسسة الأفق للتجارة',
        proposal: 'توريد 20 جهاز حاسب آلي من نوع Dell مع ضمان 3 سنوات',
        price: '50,000 ر.س',
        status: 'rejected'
      },
      {
        id: 'supplier-3',
        name: 'شركة المستقبل للتقنية',
        proposal: 'توريد 20 جهاز حاسب آلي من نوع Lenovo مع خدمة الصيانة',
        price: '48,000 ر.س',
        status: 'counter_offer'
      }
    ]
  },
  {
    id: 'round-negotiation-1',
    title: 'جولة التفاوض',
    type: 'negotiation',
    status: 'active',
    deadline: '2025-05-20',
    description: 'التفاوض مع الموردين المختارين لتحسين العروض والأسعار',
    votesRequired: 15,
    votesReceived: 10,
    suppliers: [
      {
        id: 'supplier-1',
        name: 'شركة التقنية الحديثة',
        proposal: 'توريد 20 جهاز حاسب آلي من نوع HP بمواصفات عالية مع زيادة فترة الضمان لـ 4 سنوات',
        price: '43,500 ر.س',
        status: 'pending'
      }
    ]
  },
  {
    id: 'round-contract-1',
    title: 'توقيع العقد النهائي',
    type: 'contract',
    status: 'pending',
    deadline: '2025-05-30',
    description: 'توقيع العقد النهائي مع المورد المختار وتحديد التفاصيل النهائية',
    votesRequired: 15,
    votesReceived: 0
  }
];

interface GroupRoundsProps {
  groupId: string;
}

const GroupRounds: React.FC<GroupRoundsProps> = ({ groupId }) => {
  const [activeTab, setActiveTab] = useState<'rfq' | 'negotiation' | 'contract' | 'all'>('all');
  const [chatDialogOpen, setChatDialogOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);
  const [contractDialogOpen, setContractDialogOpen] = useState(false);
  const [signDialog, setSignDialog] = useState(false);
  const { toast } = useToast();

  // Filter rounds based on active tab
  const filteredRounds = activeTab === 'all' 
    ? rounds 
    : rounds.filter(round => round.type === activeTab);

  const handleVote = (roundId: string, supplierId: string, vote: 'accept' | 'reject' | 'counter') => {
    toast({
      title: "تم تسجيل التصويت",
      description: vote === 'accept' ? "تم قبول العرض" : vote === 'reject' ? "تم رفض العرض" : "تم إرسال عرض مضاد",
    });
  };

  const openChatDialog = (supplierId: string) => {
    setSelectedSupplier(supplierId);
    setChatDialogOpen(true);
  };

  const handleSendMessage = () => {
    toast({
      title: "تم إرسال الرسالة",
      description: "تم إرسال رسالتك إلى المورد وسيتم إشعارك عند الرد",
    });
    setChatDialogOpen(false);
  };

  const handleSignContract = () => {
    toast({
      title: "تم إرسال رمز التحقق",
      description: "تم إرسال رمز التحقق OTP إلى بريدك الإلكتروني",
    });
    setSignDialog(true);
    setContractDialogOpen(false);
  };

  const handleVerifyOTP = () => {
    toast({
      title: "تم التوقيع بنجاح",
      description: "تم توقيع العقد ونشره على IPFS بنجاح",
    });
    setSignDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h2 className="text-2xl font-semibold">جولات المجموعة</h2>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="w-full sm:w-auto mt-2 sm:mt-0">
          <TabsList className="grid grid-cols-4 w-full sm:w-auto">
            <TabsTrigger value="all">الكل</TabsTrigger>
            <TabsTrigger value="rfq">العروض</TabsTrigger>
            <TabsTrigger value="negotiation">التفاوض</TabsTrigger>
            <TabsTrigger value="contract">العقود</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {filteredRounds.length === 0 ? (
        <Card className="text-center py-10">
          <CardContent className="pt-6">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">لا توجد جولات</h3>
            <p className="text-sm text-muted-foreground mb-6">لم تبدأ أي جولات بعد لهذه المجموعة</p>
            <Button>بدء جولة جديدة</Button>
          </CardContent>
        </Card>
      ) : (
        filteredRounds.map((round) => (
          <Card key={round.id} className={`border-l-4 ${
            round.status === 'active' ? 'border-l-blue-500' : 
            round.status === 'completed' ? 'border-l-green-500' : 
            'border-l-amber-500'}`}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <CardTitle>{round.title}</CardTitle>
                  <Badge variant={
                    round.status === 'active' ? 'default' : 
                    round.status === 'completed' ? 'outline' : 
                    'secondary'
                  }>
                    {round.status === 'active' ? 'نشط' : 
                     round.status === 'completed' ? 'مكتمل' : 'معلق'}
                  </Badge>
                </div>
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>الموعد النهائي: {new Date(round.deadline).toLocaleDateString('ar-SA')}</span>
                </div>
              </div>
              <CardDescription>{round.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {round.votesRequired && round.votesReceived !== undefined && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>التصويت: {round.votesReceived}/{round.votesRequired}</span>
                    <span>{Math.round((round.votesReceived / round.votesRequired) * 100)}%</span>
                  </div>
                  <Progress value={(round.votesReceived / round.votesRequired) * 100} className="h-2" />
                </div>
              )}

              {round.type === 'rfq' && round.suppliers && (
                <div className="space-y-4 mt-4">
                  <h4 className="font-medium">العروض المقدمة</h4>
                  {round.suppliers.map(supplier => (
                    <div key={supplier.id} className="bg-muted/30 p-3 rounded-md">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium">{supplier.name}</h5>
                          <p className="text-sm mt-1">{supplier.proposal}</p>
                        </div>
                        <Badge className="ml-2 min-w-20 text-center" variant={
                          supplier.status === 'accepted' ? 'default' : 
                          supplier.status === 'rejected' ? 'destructive' : 
                          supplier.status === 'counter_offer' ? 'outline' :
                          'secondary'
                        }>
                          {supplier.status === 'accepted' ? 'مقبول' : 
                           supplier.status === 'rejected' ? 'مرفوض' : 
                           supplier.status === 'counter_offer' ? 'عرض مضاد' :
                           'معلق'}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span className="font-medium">{supplier.price}</span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => openChatDialog(supplier.id)}>
                            <MessageCircle className="h-4 w-4 ml-1" /> محادثة
                          </Button>
                          {round.status === 'active' && supplier.status === 'pending' && (
                            <>
                              <Button size="sm" variant="default" onClick={() => handleVote(round.id, supplier.id, 'accept')}>
                                <CheckCircle className="h-4 w-4 ml-1" /> قبول
                              </Button>
                              <Button size="sm" variant="destructive" onClick={() => handleVote(round.id, supplier.id, 'reject')}>
                                <XCircle className="h-4 w-4 ml-1" /> رفض
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {round.type === 'negotiation' && round.suppliers && (
                <div className="space-y-4 mt-4">
                  <h4 className="font-medium">التفاوض مع الموردين</h4>
                  {round.suppliers.map(supplier => (
                    <div key={supplier.id} className="bg-muted/30 p-3 rounded-md">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="font-medium">{supplier.name}</h5>
                          <p className="text-sm mt-1">{supplier.proposal}</p>
                        </div>
                        <Badge className="ml-2 min-w-20 text-center" variant={
                          supplier.status === 'accepted' ? 'default' : 
                          supplier.status === 'rejected' ? 'destructive' : 
                          supplier.status === 'counter_offer' ? 'outline' :
                          'secondary'
                        }>
                          {supplier.status === 'accepted' ? 'مقبول' : 
                           supplier.status === 'rejected' ? 'مرفوض' : 
                           supplier.status === 'counter_offer' ? 'عرض مضاد' :
                           'معلق'}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span className="font-medium">{supplier.price}</span>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => openChatDialog(supplier.id)}>
                            <MessageCircle className="h-4 w-4 ml-1" /> محادثة
                          </Button>
                          {round.status === 'active' && (
                            <>
                              <Button size="sm" variant="default" onClick={() => handleVote(round.id, supplier.id, 'accept')}>
                                <CheckCircle className="h-4 w-4 ml-1" /> قبول
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleVote(round.id, supplier.id, 'counter')}>
                                عرض مضاد
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {round.type === 'contract' && (
                <div className="flex flex-col items-center justify-center py-4">
                  <FileText className="h-10 w-10 text-primary mb-3" />
                  <h4 className="font-medium mb-1">العقد النهائي</h4>
                  <p className="text-sm text-muted-foreground mb-4">يتم إنشاء العقد النهائي بعد اكتمال مرحلة التفاوض</p>
                  <Button onClick={() => setContractDialogOpen(true)}>
                    عرض العقد
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))
      )}

      {/* Supplier Chat Dialog */}
      <Dialog open={chatDialogOpen} onOpenChange={setChatDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>محادثة مع المورد</DialogTitle>
            <DialogDescription>
              يمكنك التفاوض مع المورد وتبادل الرسائل
            </DialogDescription>
          </DialogHeader>
          <div className="h-[300px] overflow-y-auto border rounded-md p-4 mb-4 bg-muted/30">
            <div className="flex flex-col gap-3">
              <div className="bg-primary/10 p-2 rounded-md max-w-[80%] self-start">
                <p className="text-sm">مرحباً، نحن مهتمون بعرضكم ولكن لدينا بعض الاستفسارات حول المواصفات.</p>
                <span className="text-xs text-muted-foreground">المورد - 10:30 صباحاً</span>
              </div>
              <div className="bg-primary/10 p-2 rounded-md max-w-[80%] self-end">
                <p className="text-sm">بالتأكيد، يمكنني تقديم تفاصيل أكثر عن المواصفات. ما هي استفساراتكم المحددة؟</p>
                <span className="text-xs text-muted-foreground">أنت - 11:15 صباحاً</span>
              </div>
              <div className="bg-primary/10 p-2 rounded-md max-w-[80%] self-start">
                <p className="text-sm">هل يمكنكم زيادة فترة الضمان إلى 4 سنوات مع الحفاظ على نفس السعر؟</p>
                <span className="text-xs text-muted-foreground">المورد - 11:30 صباحاً</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Textarea placeholder="اكتب رسالتك هنا..." className="flex-1" />
            <Button onClick={handleSendMessage} className="h-full">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setChatDialogOpen(false)}>إغلاق</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Contract Dialog */}
      <Dialog open={contractDialogOpen} onOpenChange={setContractDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>العقد النهائي</DialogTitle>
            <DialogDescription>
              مراجعة وتوقيع العقد النهائي
            </DialogDescription>
          </DialogHeader>
          <div className="border rounded-md p-6 mb-4 bg-muted/30 max-h-[400px] overflow-y-auto">
            <h3 className="text-lg font-bold mb-4 text-center">عقد توريد أجهزة حاسب آلي</h3>
            <p className="mb-4">حرر هذا العقد بين كل من:</p>
            <p className="mb-2"><strong>الطرف الأول:</strong> مجموعة شراء الإلكترونيات (المشتري)</p>
            <p className="mb-4"><strong>الطرف الثاني:</strong> شركة التقنية الحديثة (المورد)</p>
            
            <h4 className="font-bold mt-6 mb-2">المادة 1: موضوع العقد</h4>
            <p className="mb-4">توريد 20 جهاز حاسب آلي من نوع HP بالمواصفات المتفق عليها وفترة ضمان 4 سنوات.</p>
            
            <h4 className="font-bold mt-4 mb-2">المادة 2: قيمة العقد</h4>
            <p className="mb-4">تبلغ قيمة العقد 43,500 ريال سعودي فقط لا غير.</p>
            
            <h4 className="font-bold mt-4 mb-2">المادة 3: مدة التوريد</h4>
            <p className="mb-4">يلتزم المورد بتوريد الأجهزة خلال 15 يومًا من تاريخ توقيع هذا العقد.</p>
            
            <h4 className="font-bold mt-4 mb-2">المادة 4: الضمان</h4>
            <p className="mb-4">يضمن المورد الأجهزة لمدة 4 سنوات من تاريخ التوريد.</p>
            
            <h4 className="font-bold mt-6 mb-4">الأطراف الموقعة</h4>
            <div className="flex justify-between">
              <div className="text-center">
                <p>توقيع الطرف الأول</p>
                <p className="mt-10">--------------------</p>
              </div>
              <div className="text-center">
                <p>توقيع الطرف الثاني</p>
                <p className="mt-10">--------------------</p>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" className="flex-1" onClick={() => setContractDialogOpen(false)}>إغلاق</Button>
            <Button onClick={handleSignContract} className="flex-1">
              <FileUp className="h-4 w-4 ml-2" /> توقيع العقد
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* OTP Verification Dialog */}
      <Dialog open={signDialog} onOpenChange={setSignDialog}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>تأكيد التوقيع</DialogTitle>
            <DialogDescription>
              أدخل رمز التحقق OTP المرسل إلى بريدك الإلكتروني
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Input placeholder="● ● ● ● ● ●" className="text-center text-lg" maxLength={6} />
            </div>
            <p className="text-xs text-muted-foreground text-center">
              سيتم حفظ العقد على شبكة IPFS بعد التوقيع النهائي
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSignDialog(false)}>إلغاء</Button>
            <Button onClick={handleVerifyOTP}>تأكيد التوقيع</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GroupRounds;
