
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Vote, 
  MessageCircle, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Plus,
  Edit3
} from 'lucide-react';

interface ContractClause {
  id: string;
  title: string;
  content: string;
  status: 'draft' | 'voting' | 'approved' | 'rejected';
  votes: {
    approve: number;
    reject: number;
    total: number;
  };
  proposedChanges?: string;
  lastModified: string;
}

interface ContractNegotiationPanelProps {
  groupId: string;
  contractData?: any;
}

const ContractNegotiationPanel: React.FC<ContractNegotiationPanelProps> = ({ 
  groupId, 
  contractData 
}) => {
  const [selectedClause, setSelectedClause] = useState<ContractClause | null>(null);
  const [proposedEdit, setProposedEdit] = useState('');
  const [activeTab, setActiveTab] = useState('clauses');

  const sampleClauses: ContractClause[] = [
    {
      id: '1',
      title: 'شروط التسليم',
      content: 'يتم التسليم خلال 30 يوم من تاريخ الطلب إلى العنوان المحدد من قبل المشتري.',
      status: 'approved',
      votes: { approve: 8, reject: 1, total: 9 },
      lastModified: '2024-01-15'
    },
    {
      id: '2',
      title: 'شروط الدفع',
      content: 'يتم الدفع 50% مقدماً و 50% عند التسليم عبر الحساب البنكي المحدد.',
      status: 'voting',
      votes: { approve: 5, reject: 2, total: 7 },
      proposedChanges: 'تعديل النسبة إلى 30% مقدماً و 70% عند التسليم',
      lastModified: '2024-01-20'
    },
    {
      id: '3',
      title: 'ضمان الجودة',
      content: 'ضمان الجودة لمدة سنة واحدة من تاريخ التسليم.',
      status: 'draft',
      votes: { approve: 0, reject: 0, total: 0 },
      lastModified: '2024-01-22'
    }
  ];

  const getStatusColor = (status: ContractClause['status']) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'voting': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: ContractClause['status']) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'voting': return <Vote className="h-4 w-4" />;
      case 'rejected': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const handleProposeEdit = (clause: ContractClause) => {
    setSelectedClause(clause);
    setProposedEdit(clause.proposedChanges || '');
  };

  const handleSubmitEdit = () => {
    if (selectedClause && proposedEdit.trim()) {
      // Logic to submit proposed edit
      console.log('Submitting edit for clause:', selectedClause.id, proposedEdit);
      setSelectedClause(null);
      setProposedEdit('');
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            تفاوض العقد - المجموعة {groupId}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="clauses">البنود</TabsTrigger>
              <TabsTrigger value="voting">التصويت</TabsTrigger>
              <TabsTrigger value="final">العقد النهائي</TabsTrigger>
            </TabsList>

            <TabsContent value="clauses" className="space-y-4 mt-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">بنود العقد</h3>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  إضافة بند جديد
                </Button>
              </div>

              <div className="space-y-4">
                {sampleClauses.map((clause) => (
                  <Card key={clause.id} className="relative">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-medium">{clause.title}</h4>
                        <Badge 
                          className={`${getStatusColor(clause.status)} flex items-center gap-1`}
                        >
                          {getStatusIcon(clause.status)}
                          {clause.status === 'approved' && 'مُوافق عليه'}
                          {clause.status === 'voting' && 'قيد التصويت'}
                          {clause.status === 'rejected' && 'مرفوض'}
                          {clause.status === 'draft' && 'مسودة'}
                        </Badge>
                      </div>

                      <p className="text-gray-700 mb-3">{clause.content}</p>

                      {clause.proposedChanges && (
                        <div className="bg-blue-50 p-3 rounded-lg mb-3">
                          <p className="text-sm font-medium text-blue-800 mb-1">تعديل مقترح:</p>
                          <p className="text-sm text-blue-700">{clause.proposedChanges}</p>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>آخر تحديث: {clause.lastModified}</span>
                          {clause.status === 'voting' && (
                            <span>
                              الأصوات: {clause.votes.approve} موافق، {clause.votes.reject} معارض
                            </span>
                          )}
                        </div>

                        <div className="flex gap-2">
                          {clause.status !== 'approved' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleProposeEdit(clause)}
                            >
                              <Edit3 className="h-4 w-4 mr-1" />
                              اقتراح تعديل
                            </Button>
                          )}
                          {clause.status === 'voting' && (
                            <>
                              <Button size="sm" variant="outline">
                                موافق
                              </Button>
                              <Button size="sm" variant="outline">
                                معارض
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="voting" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">البنود قيد التصويت</h3>
                {sampleClauses
                  .filter(clause => clause.status === 'voting')
                  .map((clause) => (
                    <Card key={clause.id}>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">{clause.title}</h4>
                        <p className="text-gray-700 mb-3">{clause.content}</p>
                        
                        <div className="bg-gray-50 p-3 rounded-lg mb-4">
                          <div className="flex justify-between text-sm">
                            <span>موافق: {clause.votes.approve}</span>
                            <span>معارض: {clause.votes.reject}</span>
                            <span>المجموع: {clause.votes.total}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full" 
                              style={{ 
                                width: `${(clause.votes.approve / clause.votes.total) * 100}%` 
                              }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button size="sm" className="flex-1">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            أوافق
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            أعارض
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>

            <TabsContent value="final" className="mt-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">العقد النهائي</h3>
                  <Button>
                    <FileText className="h-4 w-4 mr-2" />
                    تحميل PDF
                  </Button>
                </div>

                <Card>
                  <CardContent className="p-6">
                    <div className="prose max-w-none">
                      <h2 className="text-xl font-bold mb-4">عقد الشراء التعاوني</h2>
                      
                      {sampleClauses
                        .filter(clause => clause.status === 'approved')
                        .map((clause, index) => (
                          <div key={clause.id} className="mb-4">
                            <h3 className="font-semibold mb-2">
                              البند {index + 1}: {clause.title}
                            </h3>
                            <p className="text-gray-700">{clause.content}</p>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Edit Proposal Modal */}
      {selectedClause && (
        <Card className="fixed inset-4 z-50 bg-white shadow-xl">
          <CardHeader>
            <CardTitle>اقتراح تعديل: {selectedClause.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">النص الحالي:</label>
              <p className="text-gray-700 bg-gray-50 p-3 rounded-lg mt-1">
                {selectedClause.content}
              </p>
            </div>

            <div>
              <label className="text-sm font-medium">التعديل المقترح:</label>
              <Textarea
                value={proposedEdit}
                onChange={(e) => setProposedEdit(e.target.value)}
                placeholder="اكتب التعديل المقترح هنا..."
                className="mt-1"
                rows={4}
              />
            </div>

            <div className="flex gap-2 justify-end">
              <Button 
                variant="outline" 
                onClick={() => setSelectedClause(null)}
              >
                إلغاء
              </Button>
              <Button onClick={handleSubmitEdit}>
                إرسال التعديل للتصويت
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContractNegotiationPanel;
