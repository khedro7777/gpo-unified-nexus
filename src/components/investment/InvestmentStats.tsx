
import React from 'react';
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
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm text-blue-600">إجمالي الاستثمارات</p>
              <p className="text-lg font-bold text-blue-800">$2.5M</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-green-600">الشركات النشطة</p>
              <p className="text-lg font-bold text-green-800">12</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-purple-200 bg-purple-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-600" />
            <div>
              <p className="text-sm text-purple-600">المستثمرون</p>
              <p className="text-lg font-bold text-purple-800">247</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-orange-600" />
            <div>
              <p className="text-sm text-orange-600">العائد المتوقع</p>
              <p className="text-lg font-bold text-orange-800">+18.5%</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestmentStats;
