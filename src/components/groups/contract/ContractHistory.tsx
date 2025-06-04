
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { History, FileText, Eye } from 'lucide-react';

interface ContractHistoryProps {
  groupId: string;
}

const ContractHistory: React.FC<ContractHistoryProps> = ({ groupId }) => {
  const history = [
    {
      id: '1',
      action: 'إنشاء العقد',
      user: 'أحمد محمد',
      timestamp: '2024-01-10 14:30',
      version: '1.0',
      status: 'completed'
    },
    {
      id: '2',
      action: 'تعديل البند الثالث',
      user: 'فاطمة علي',
      timestamp: '2024-01-12 09:15',
      version: '1.1',
      status: 'completed'
    },
    {
      id: '3',
      action: 'بدء التصويت',
      user: 'أحمد محمد',
      timestamp: '2024-01-15 11:00',
      version: '1.1',
      status: 'pending'
    },
    {
      id: '4',
      action: 'حفظ على IPFS',
      user: 'النظام',
      timestamp: '2024-01-15 11:05',
      version: '1.1',
      status: 'completed',
      ipfsHash: 'QmXxXxXxXxXxXxXxXxXx'
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500">مكتمل</Badge>;
      case 'pending':
        return <Badge variant="secondary">قيد التنفيذ</Badge>;
      case 'failed':
        return <Badge variant="destructive">فشل</Badge>;
      default:
        return <Badge variant="outline">غير محدد</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            تاريخ العقد
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {history.map((item, index) => (
              <div key={item.id} className="flex items-start gap-4 pb-4 border-b last:border-b-0">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{item.action}</p>
                      <p className="text-sm text-muted-foreground">
                        بواسطة {item.user} • {item.timestamp}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">v{item.version}</Badge>
                      {getStatusBadge(item.status)}
                    </div>
                  </div>
                  
                  {item.ipfsHash && (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">مخزن على IPFS</p>
                          <p className="text-xs text-muted-foreground font-mono">
                            {item.ipfsHash}
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          عرض
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>إحصائيات العقد</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">4</div>
              <div className="text-sm text-muted-foreground">إصدارات</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">2</div>
              <div className="text-sm text-muted-foreground">تعديلات</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">5</div>
              <div className="text-sm text-muted-foreground">مشاركين</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">3</div>
              <div className="text-sm text-muted-foreground">أيام</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractHistory;
