
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { 
  TrendingUp, 
  Building2, 
  Users, 
  BarChart3
} from 'lucide-react';

/**
 * Investment Statistics Cards Component
 * Displays key investment metrics in a grid layout
 */
const InvestmentStats = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: 'إجمالي الاستثمارات',
      value: '$2.5M',
      icon: TrendingUp,
      color: 'blue',
      action: () => navigate('/wallet')
    },
    {
      title: 'الشركات النشطة',
      value: '12',
      icon: Building2,
      color: 'green',
      action: () => navigate('/groups?filter=investment')
    },
    {
      title: 'المستثمرون',
      value: '247',
      icon: Users,
      color: 'purple',
      action: () => navigate('/groups')
    },
    {
      title: 'العائد المتوقع',
      value: '+18.5%',
      icon: BarChart3,
      color: 'orange',
      action: () => navigate('/governance')
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'border-blue-200 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
      green: 'border-green-200 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
      purple: 'border-purple-200 bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
      orange: 'border-orange-200 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={`cursor-pointer transition-all hover:shadow-md ${getColorClasses(stat.color)}`}
          onClick={stat.action}
        >
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <stat.icon className="h-6 w-6" />
              <div>
                <p className="text-sm font-medium">{stat.title}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default InvestmentStats;
