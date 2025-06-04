
import React from 'react';
import NewMainLayout from '@/components/layout/NewMainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import GovernanceVoting from '@/components/governance/GovernanceVoting';
import GovernanceDeliberation from '@/components/governance/GovernanceDeliberation';
import { Shield, Vote, MessageSquare, FileText } from 'lucide-react';

const Governance = () => {
  return (
    <NewMainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">حوكمة DAO</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            إدارة المنظمات اللامركزية والتصويت الذكي مع Snapshot.js و Loomio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <Shield className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <h3 className="font-semibold">حوكمة شفافة</h3>
            <p className="text-sm text-muted-foreground">تصويت مفتوح</p>
          </Card>
          <Card className="p-4 text-center">
            <Vote className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <h3 className="font-semibold">بدون رسوم</h3>
            <p className="text-sm text-muted-foreground">Snapshot.js</p>
          </Card>
          <Card className="p-4 text-center">
            <MessageSquare className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <h3 className="font-semibold">نقاش تفاعلي</h3>
            <p className="text-sm text-muted-foreground">Loomio</p>
          </Card>
          <Card className="p-4 text-center">
            <FileText className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <h3 className="font-semibold">توثيق IPFS</h3>
            <p className="text-sm text-muted-foreground">حفظ دائم</p>
          </Card>
        </div>

        <Tabs defaultValue="voting" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="voting">التصويت والمقترحات</TabsTrigger>
            <TabsTrigger value="discussion">النقاش والتداول</TabsTrigger>
          </TabsList>

          <TabsContent value="voting">
            <GovernanceVoting />
          </TabsContent>

          <TabsContent value="discussion">
            <GovernanceDeliberation />
          </TabsContent>
        </Tabs>
      </div>
    </NewMainLayout>
  );
};

export default Governance;
