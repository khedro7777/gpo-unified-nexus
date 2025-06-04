
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Users, Calendar, Share2, Plus } from 'lucide-react';

interface GroupData {
  id: string;
  name: string;
  type: string;
  description: string;
  location: string;
  memberCount: number;
  maxMembers: number;
  endDate: string;
  status: string;
}

interface GroupHeaderProps {
  groupData: GroupData;
}

const GroupHeader: React.FC<GroupHeaderProps> = ({ groupData }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'completed': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return isRTL ? 'نشطة' : 'Active';
      case 'pending': return isRTL ? 'قيد المراجعة' : 'Pending';
      case 'completed': return isRTL ? 'مكتملة' : 'Completed';
      default: return status;
    }
  };

  return (
    <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-lg p-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl lg:text-3xl font-bold">{groupData.name}</h1>
            <Badge className={`${getStatusColor(groupData.status)} text-white`}>
              {getStatusText(groupData.status)}
            </Badge>
          </div>
          <p className="text-muted-foreground">{groupData.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {groupData.location}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {groupData.memberCount}/{groupData.maxMembers} {isRTL ? 'عضو' : 'members'}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {isRTL ? 'ينتهي في' : 'Ends on'} {groupData.endDate}
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            {isRTL ? 'مشاركة' : 'Share'}
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            {isRTL ? 'انضمام' : 'Join'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GroupHeader;
