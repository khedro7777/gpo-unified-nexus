
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus } from 'lucide-react';

interface Member {
  id: number;
  name: string;
  avatar: string;
  joinDate: string;
  contribution: number;
}

interface GroupMembersProps {
  members: Member[];
  memberCount: number;
}

const GroupMembers: React.FC<GroupMembersProps> = ({ members, memberCount }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{isRTL ? 'أعضاء المجموعة' : 'Group Members'} ({memberCount})</span>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-1" />
            {isRTL ? 'دعوة أعضاء' : 'Invite Members'}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((member) => (
            <div key={member.id} className="flex items-center gap-3 p-3 border rounded-lg">
              <Avatar>
                <AvatarImage src={member.avatar} />
                <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="font-medium text-sm">{member.name}</div>
                <div className="text-xs text-muted-foreground">
                  ${member.contribution} • {isRTL ? 'انضم في' : 'Joined'} {member.joinDate}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupMembers;
