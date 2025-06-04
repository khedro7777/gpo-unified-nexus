
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Target } from 'lucide-react';

interface GroupProgressProps {
  targetAmount: number;
  currentAmount: number;
  memberCount: number;
  offersCount: number;
}

const GroupProgress: React.FC<GroupProgressProps> = ({
  targetAmount,
  currentAmount,
  memberCount,
  offersCount
}) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const getProgressPercentage = () => {
    return (currentAmount / targetAmount) * 100;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          {isRTL ? 'تقدم المجموعة' : 'Group Progress'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">
              {isRTL ? 'المبلغ المحقق' : 'Amount Raised'}
            </span>
            <span className="text-sm font-bold">
              ${currentAmount.toLocaleString()} / ${targetAmount.toLocaleString()}
            </span>
          </div>
          <Progress value={getProgressPercentage()} className="h-3" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{Math.round(getProgressPercentage())}%</div>
              <div className="text-sm text-muted-foreground">{isRTL ? 'مكتمل' : 'Complete'}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{memberCount}</div>
              <div className="text-sm text-muted-foreground">{isRTL ? 'أعضاء' : 'Members'}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">7</div>
              <div className="text-sm text-muted-foreground">{isRTL ? 'أيام متبقية' : 'Days Left'}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{offersCount}</div>
              <div className="text-sm text-muted-foreground">{isRTL ? 'عروض' : 'Offers'}</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupProgress;
