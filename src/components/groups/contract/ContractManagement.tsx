
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Edit, Vote, Download, Upload } from 'lucide-react';
import ContractEditor from './ContractEditor';
import ContractVoting from './ContractVoting';
import ContractHistory from './ContractHistory';

interface ContractManagementProps {
  groupId: string;
}

const ContractManagement: React.FC<ContractManagementProps> = ({ groupId }) => {
  const [contractStatus, setContractStatus] = useState<'draft' | 'voting' | 'approved' | 'signed'>('draft');
  const [activeTab, setActiveTab] = useState('editor');

  const getStatusBadge = () => {
    switch (contractStatus) {
      case 'draft':
        return <Badge variant="outline">مسودة</Badge>;
      case 'voting':
        return <Badge variant="secondary">بانتظار التصويت</Badge>;
      case 'approved':
        return <Badge variant="default">موافق عليه</Badge>;
      case 'signed':
        return <Badge className="bg-green-500">تم التوثيق</Badge>;
      default:
        return <Badge variant="outline">مسودة</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                إدارة العقد
              </CardTitle>
              <CardDescription>
                إنشاء وتحرير وإدارة عقد المجموعة
              </CardDescription>
            </div>
            {getStatusBadge()}
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="editor">
            <Edit className="h-4 w-4 mr-2" />
            محرر العقد
          </TabsTrigger>
          <TabsTrigger value="voting">
            <Vote className="h-4 w-4 mr-2" />
            التصويت
          </TabsTrigger>
          <TabsTrigger value="history">
            <FileText className="h-4 w-4 mr-2" />
            السجل
          </TabsTrigger>
          <TabsTrigger value="download" disabled={contractStatus !== 'approved' && contractStatus !== 'signed'}>
            <Download className="h-4 w-4 mr-2" />
            التحميل
          </TabsTrigger>
        </TabsList>

        <TabsContent value="editor">
          <ContractEditor 
            groupId={groupId} 
            onStatusChange={setContractStatus}
            currentStatus={contractStatus}
          />
        </TabsContent>

        <TabsContent value="voting">
          <ContractVoting 
            groupId={groupId} 
            onVotingComplete={() => setContractStatus('approved')}
          />
        </TabsContent>

        <TabsContent value="history">
          <ContractHistory groupId={groupId} />
        </TabsContent>

        <TabsContent value="download">
          <Card>
            <CardHeader>
              <CardTitle>تحميل العقد</CardTitle>
              <CardDescription>
                العقد جاهز للتحميل والتوقيع النهائي
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Button className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  تحميل PDF
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" />
                  رفع العقد موقع
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p>• العقد محفوظ على IPFS: QmXxXxXxXx...</p>
                <p>• تاريخ الإنشاء: {new Date().toLocaleDateString('ar-SA')}</p>
                <p>• حالة التوقيع: {contractStatus === 'signed' ? 'تم التوقيع' : 'بانتظار التوقيع'}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContractManagement;
