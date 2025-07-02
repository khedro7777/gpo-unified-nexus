
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  Target, 
  Users, 
  CheckCircle, 
  Gift,
  TrendingUp,
  Award
} from 'lucide-react';

interface EarningOpportunity {
  id: string;
  title: string;
  description: string;
  points: number;
  progress?: number;
  maxProgress?: number;
  type: 'daily' | 'weekly' | 'achievement' | 'referral';
  completed?: boolean;
}

const PointsEarning: React.FC = () => {
  const opportunities: EarningOpportunity[] = [
    {
      id: '1',
      title: 'إكمال الملف الشخصي',
      description: 'أضف معلوماتك الشخصية والمهنية',
      points: 100,
      type: 'achievement',
      completed: true
    },
    {
      id: '2',
      title: 'انضمام لمجموعة جديدة',
      description: 'انضم إلى مجموعة شراء جماعي',
      points: 50,
      type: 'daily'
    },
    {
      id: '3',
      title: 'دعوة الأصدقاء',
      description: 'ادع 5 أصدقاء للمنصة',
      points: 250,
      progress: 2,
      maxProgress: 5,
      type: 'referral'
    },
    {
      id: '4',
      title: 'إتمام 10 معاملات',
      description: 'أكمل 10 معاملات ناجحة',
      points: 500,
      progress: 7,
      maxProgress: 10,
      type: 'achievement'
    },
    {
      id: '5',
      title: 'التصويت الأسبوعي',
      description: 'شارك في التصويت الأسبوعي',
      points: 75,
      type: 'weekly'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'daily':
        return <Target className="h-4 w-4" />;
      case 'weekly':
        return <TrendingUp className="h-4 w-4" />;
      case 'achievement':
        return <Award className="h-4 w-4" />;
      case 'referral':
        return <Users className="h-4 w-4" />;
      default:
        return <Star className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'daily':
        return 'bg-blue-100 text-blue-800';
      case 'weekly':
        return 'bg-green-100 text-green-800';
      case 'achievement':
        return 'bg-purple-100 text-purple-800';
      case 'referral':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'daily':
        return 'يومي';
      case 'weekly':
        return 'أسبوعي';
      case 'achievement':
        return 'إنجاز';
      case 'referral':
        return 'إحالة';
      default:
        return 'عام';
    }
  };

  return (
    <div className="space-y-6" dir="rtl">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">اكسب نقاط إضافية</h2>
        <p className="text-gray-600">أكمل المهام واكسب نقاط لاستخدامها في الخدمات</p>
      </div>

      {/* Weekly Progress */}
      <Card className="bg-gradient-to-r from-purple-500 to-blue-600 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="h-6 w-6" />
            التقدم الأسبوعي
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>7 من 10 مهام مكتملة</span>
              <span className="font-bold">350 نقطة</span>
            </div>
            <Progress value={70} className="h-3 bg-white/20" />
            <p className="text-sm text-purple-100">
              أكمل 3 مهام أخرى لتحصل على مكافأة 200 نقطة إضافية!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Earning Opportunities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {opportunities.map((opportunity) => (
          <Card key={opportunity.id} className={opportunity.completed ? 'bg-green-50 border-green-200' : ''}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${getTypeColor(opportunity.type)}`}>
                    {getTypeIcon(opportunity.type)}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{opportunity.title}</CardTitle>
                    <CardDescription>{opportunity.description}</CardDescription>
                  </div>
                </div>
                {opportunity.completed && (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge className={getTypeColor(opportunity.type)}>
                  {getTypeLabel(opportunity.type)}
                </Badge>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-semibold">{opportunity.points} نقطة</span>
                </div>
              </div>

              {opportunity.progress !== undefined && opportunity.maxProgress && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>التقدم</span>
                    <span>{opportunity.progress}/{opportunity.maxProgress}</span>
                  </div>
                  <Progress 
                    value={(opportunity.progress / opportunity.maxProgress) * 100} 
                    className="h-2"
                  />
                </div>
              )}

              <Button 
                className="w-full" 
                variant={opportunity.completed ? "secondary" : "default"}
                disabled={opportunity.completed}
              >
                {opportunity.completed ? 'مكتمل' : 'ابدأ المهمة'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bonus Section */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-800">
            <Gift className="h-5 w-5" />
            مكافآت خاصة
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white rounded-lg">
              <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h4 className="font-semibold">مكافأة الإحالة</h4>
              <p className="text-sm text-gray-600">100 نقطة لكل صديق</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h4 className="font-semibold">النشاط اليومي</h4>
              <p className="text-sm text-gray-600">25 نقطة يومياً</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg">
              <Award className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <h4 className="font-semibold">الإنجازات</h4>
              <p className="text-sm text-gray-600">مكافآت خاصة</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PointsEarning;
