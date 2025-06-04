
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Star } from 'lucide-react';

interface Organizer {
  name: string;
  avatar: string;
  rating: number;
  completedGroups: number;
}

interface GroupOverviewProps {
  organizer: Organizer;
  type: string;
  category: string;
  tags: string[];
}

const GroupOverview: React.FC<GroupOverviewProps> = ({
  organizer,
  type,
  category,
  tags
}) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Group Info */}
      <Card>
        <CardHeader>
          <CardTitle>{isRTL ? 'معلومات المجموعة' : 'Group Information'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={organizer.avatar} />
              <AvatarFallback>{organizer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{organizer.name}</div>
              <div className="text-sm text-muted-foreground flex items-center gap-1">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                {organizer.rating} • {organizer.completedGroups} {isRTL ? 'مجموعة مكتملة' : 'completed groups'}
              </div>
            </div>
          </div>
          <Separator />
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>{isRTL ? 'النوع' : 'Type'}:</span>
              <span className="font-medium">{type}</span>
            </div>
            <div className="flex justify-between">
              <span>{isRTL ? 'الفئة' : 'Category'}:</span>
              <span className="font-medium">{category}</span>
            </div>
            <div className="flex justify-between">
              <span>{isRTL ? 'تاريخ الإنشاء' : 'Created'}:</span>
              <span className="font-medium">2024-01-01</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            {tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>{isRTL ? 'النشاط الأخير' : 'Recent Activity'}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500 mt-2"></div>
              <div className="flex-1">
                <div className="text-sm">{isRTL ? 'انضم عضو جديد' : 'New member joined'}</div>
                <div className="text-xs text-muted-foreground">{isRTL ? 'منذ ساعتين' : '2 hours ago'}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
              <div className="flex-1">
                <div className="text-sm">{isRTL ? 'عرض جديد من مورد' : 'New offer from supplier'}</div>
                <div className="text-xs text-muted-foreground">{isRTL ? 'منذ 4 ساعات' : '4 hours ago'}</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 rounded-full bg-yellow-500 mt-2"></div>
              <div className="flex-1">
                <div className="text-sm">{isRTL ? 'بدء تصويت جديد' : 'New voting started'}</div>
                <div className="text-xs text-muted-foreground">{isRTL ? 'منذ يوم' : '1 day ago'}</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GroupOverview;
