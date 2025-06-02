
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, Users, Vote } from 'lucide-react';

const FormationProgress = () => {
  const votingData = [
    { name: 'أحمد محمد', vote: 'approved', timestamp: '2025-05-20 14:30' },
    { name: 'سارة علي', vote: 'approved', timestamp: '2025-05-20 15:45' },
    { name: 'محمد حسن', vote: 'pending', timestamp: null },
    { name: 'فاطمة أحمد', vote: 'pending', timestamp: null },
  ];

  const approvedVotes = votingData.filter(v => v.vote === 'approved').length;
  const totalVotes = votingData.length;
  const progressPercentage = (approvedVotes / totalVotes) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">حالة التصويت على التأسيس</h3>
        <Badge variant={progressPercentage >= 75 ? "default" : "secondary"}>
          {approvedVotes}/{totalVotes} موافقة
        </Badge>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>نسبة الموافقة</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
        <p className="text-xs text-muted-foreground">
          يتطلب 75% من الأصوات للموافقة على التأسيس
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Vote className="h-4 w-4" />
            تفاصيل التصويت
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {votingData.map((voter, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center gap-3">
                  {voter.vote === 'approved' ? (
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  ) : (
                    <Clock className="h-5 w-5 text-yellow-600" />
                  )}
                  <div>
                    <p className="font-medium text-sm">{voter.name}</p>
                    {voter.timestamp && (
                      <p className="text-xs text-muted-foreground">
                        صوت في: {voter.timestamp}
                      </p>
                    )}
                  </div>
                </div>
                <Badge 
                  variant={voter.vote === 'approved' ? "default" : "secondary"}
                  className="text-xs"
                >
                  {voter.vote === 'approved' ? 'موافق' : 'في الانتظار'}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Users className="h-4 w-4" />
            دعوة مساهمين جدد
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            يمكنك دعوة مستثمرين أو شركاء إضافيين للانضمام إلى عملية التأسيس
          </p>
          <div className="flex gap-2">
            <Button size="sm" className="text-xs">
              دعوة مساهم جديد
            </Button>
            <Button size="sm" variant="outline" className="text-xs">
              مشاركة رابط الانضمام
            </Button>
          </div>
        </CardContent>
      </Card>

      {progressPercentage >= 75 && (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <div>
                <p className="font-medium text-green-800">تم الحصول على الموافقة المطلوبة!</p>
                <p className="text-sm text-green-700">
                  يمكنك الآن المتابعة إلى الخطوة التالية لتقديم الأوراق الرسمية
                </p>
              </div>
            </div>
            <Button className="mt-4 w-full">
              تقديم أوراق التأسيس الرسمية
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FormationProgress;
