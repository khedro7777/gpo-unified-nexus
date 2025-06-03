
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { FileText, Edit, Check, X, Users, Clock, Download, Upload } from 'lucide-react';

interface Clause {
  id: string;
  title: string;
  content: string;
  status: 'draft' | 'negotiating' | 'approved' | 'rejected';
  votes: { member: string; vote: 'approve' | 'reject' | 'abstain'; comment?: string }[];
  proposedEdits: { member: string; edit: string; timestamp: Date }[];
}

interface ContractNegotiationProps {
  groupId: string;
  groupType: 'buying' | 'marketing' | 'freelancers' | 'formation';
}

const ContractNegotiation: React.FC<ContractNegotiationProps> = ({ groupId, groupType }) => {
  const [clauses, setClauses] = useState<Clause[]>([
    {
      id: '1',
      title: 'شروط الدفع والتسليم',
      content: 'يتعين على الطرف الأول تسليم البضائع خلال 30 يوماً من تاريخ الطلب مع الدفع خلال 15 يوماً من التسليم.',
      status: 'negotiating',
      votes: [],
      proposedEdits: []
    },
    {
      id: '2', 
      title: 'شروط الجودة والمطابقة',
      content: 'يجب أن تتطابق جميع المنتجات مع المواصفات المحددة في RFQ مع ضمان لمدة 12 شهراً.',
      status: 'draft',
      votes: [],
      proposedEdits: []
    }
  ]);

  const [activeClause, setActiveClause] = useState<string>('1');
  const [editText, setEditText] = useState('');
  const [contractProgress, setContractProgress] = useState(35);

  const handleVote = (clauseId: string, vote: 'approve' | 'reject' | 'abstain') => {
    setClauses(prev => prev.map(clause => 
      clause.id === clauseId 
        ? { ...clause, votes: [...clause.votes, { member: 'المستخدم الحالي', vote }] }
        : clause
    ));
  };

  const handleProposeEdit = (clauseId: string) => {
    if (!editText.trim()) return;
    
    setClauses(prev => prev.map(clause => 
      clause.id === clauseId 
        ? { 
            ...clause, 
            proposedEdits: [...clause.proposedEdits, { 
              member: 'المستخدم الحالي', 
              edit: editText, 
              timestamp: new Date() 
            }]
          }
        : clause
    ));
    setEditText('');
  };

  const getStatusBadge = (status: Clause['status']) => {
    switch (status) {
      case 'draft':
        return <Badge variant="secondary">مسودة</Badge>;
      case 'negotiating':
        return <Badge variant="default" className="bg-blue-500">قيد التفاوض</Badge>;
      case 'approved':
        return <Badge variant="default" className="bg-green-500">موافق عليه</Badge>;
      case 'rejected':
        return <Badge variant="destructive">مرفوض</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">تفاوض العقد</h3>
          <p className="text-muted-foreground">مراجعة والموافقة على بنود العقد</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            رفع وثيقة
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            تحميل PDF
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              تقدم العقد
            </CardTitle>
            <span className="text-sm text-muted-foreground">{contractProgress}% مكتمل</span>
          </div>
          <Progress value={contractProgress} className="w-full" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="font-semibold text-green-600">2</div>
              <div className="text-muted-foreground">بنود موافق عليها</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-blue-600">1</div>
              <div className="text-muted-foreground">بنود قيد التفاوض</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-600">3</div>
              <div className="text-muted-foreground">إجمالي البنود</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeClause} onValueChange={setActiveClause}>
        <TabsList className="grid w-full grid-cols-2">
          {clauses.map((clause) => (
            <TabsTrigger key={clause.id} value={clause.id} className="text-sm">
              البند {clause.id}: {clause.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {clauses.map((clause) => (
          <TabsContent key={clause.id} value={clause.id} className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{clause.title}</CardTitle>
                  {getStatusBadge(clause.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm leading-relaxed">{clause.content}</p>
                </div>

                {clause.proposedEdits.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">التعديلات المقترحة:</h4>
                    {clause.proposedEdits.map((edit, index) => (
                      <div key={index} className="p-3 border rounded-lg bg-yellow-50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">{edit.member}</span>
                          <span className="text-xs text-muted-foreground">
                            {edit.timestamp.toLocaleDateString('ar-SA')}
                          </span>
                        </div>
                        <p className="text-sm">{edit.edit}</p>
                      </div>
                    ))}
                  </div>
                )}

                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium">اقتراح تعديل:</label>
                    <Textarea
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      placeholder="اكتب اقتراحك للتعديل هنا..."
                      className="mt-1"
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleProposeEdit(clause.id)}
                      disabled={!editText.trim()}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      اقتراح تعديل
                    </Button>
                    <Button 
                      size="sm" 
                      variant="default" 
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() => handleVote(clause.id, 'approve')}
                    >
                      <Check className="h-4 w-4 mr-2" />
                      موافق
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => handleVote(clause.id, 'reject')}
                    >
                      <X className="h-4 w-4 mr-2" />
                      رفض
                    </Button>
                  </div>
                </div>

                {clause.votes.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      الأصوات ({clause.votes.length}):
                    </h4>
                    <div className="space-y-1">
                      {clause.votes.map((vote, index) => (
                        <div key={index} className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
                          <span>{vote.member}</span>
                          <Badge 
                            variant={vote.vote === 'approve' ? 'default' : vote.vote === 'reject' ? 'destructive' : 'secondary'}
                            className={vote.vote === 'approve' ? 'bg-green-500' : ''}
                          >
                            {vote.vote === 'approve' ? 'موافق' : vote.vote === 'reject' ? 'رافض' : 'ممتنع'}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default ContractNegotiation;
