
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ContractNegotiation from '../contracts/ContractNegotiation';
import IPFSUpload from '../ipfs/IPFSUpload';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText, Users, Clock } from 'lucide-react';

interface GroupContractProps {
  groupId: string;
  groupType: 'buying' | 'marketing' | 'freelancers' | 'formation';
}

const GroupContract: React.FC<GroupContractProps> = ({ groupId, groupType }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            عقد المجموعة
          </CardTitle>
          <CardDescription>
            إدارة العقود والاتفاقيات الخاصة بالمجموعة
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-500" />
              <span>5 أعضاء موافقين</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-orange-500" />
              <span>آخر تحديث: منذ يومين</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-green-500" />
              <span>3 بنود معتمدة</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="negotiation">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="negotiation">التفاوض على البنود</TabsTrigger>
          <TabsTrigger value="documents">المستندات</TabsTrigger>
        </TabsList>

        <TabsContent value="negotiation">
          <ContractNegotiation groupId={groupId} groupType={groupType} />
        </TabsContent>

        <TabsContent value="documents">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>رفع مستندات العقد</CardTitle>
                <CardDescription>
                  رفع العقود النهائية والوثائق الداعمة
                </CardDescription>
              </CardHeader>
              <CardContent>
                <IPFSUpload
                  acceptedTypes={['.pdf', '.doc', '.docx']}
                  maxSize={20}
                  onFileUploaded={(file) => {
                    console.log('Contract document uploaded:', file);
                  }}
                />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GroupContract;
