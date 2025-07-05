
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, UserPlus, Search, Crown, Shield, User, MoreHorizontal } from 'lucide-react';
import { GroupRole } from '@/types/group-lifecycle';

interface GroupMembersManagerProps {
  groupId: string;
  isAdmin: boolean;
  roles: GroupRole[];
}

const GroupMembersManager: React.FC<GroupMembersManagerProps> = ({
  groupId,
  isAdmin,
  roles
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<'member' | 'admin'>('member');

  const filteredRoles = roles.filter(role =>
    role.profiles?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.profiles?.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'creator': return <Crown className="h-4 w-4 text-yellow-500" />;
      case 'admin': return <Shield className="h-4 w-4 text-blue-500" />;
      case 'member': return <User className="h-4 w-4 text-gray-500" />;
      default: return <User className="h-4 w-4 text-gray-500" />;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'creator': return 'مؤسس';
      case 'admin': return 'مدير';
      case 'member': return 'عضو';
      default: return role;
    }
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'creator': return 'default';
      case 'admin': return 'secondary';
      case 'member': return 'outline';
      default: return 'outline';
    }
  };

  const handleInviteMember = () => {
    // Here you would typically call an API to invite the member
    console.log('Inviting member:', { email: inviteEmail, role: inviteRole });
    setInviteDialogOpen(false);
    setInviteEmail('');
    setInviteRole('member');
  };

  const isExpired = (expiresAt?: string) => {
    if (!expiresAt) return false;
    return new Date(expiresAt) < new Date();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-lg font-semibold">إدارة الأعضاء</h3>
          <p className="text-sm text-muted-foreground">
            إجمالي الأعضاء: {roles.length}
          </p>
        </div>
        
        {isAdmin && (
          <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                دعوة عضو جديد
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>دعوة عضو جديد</DialogTitle>
                <DialogDescription>
                  أرسل دعوة للانضمام إلى المجموعة
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">البريد الإلكتروني</label>
                  <Input
                    type="email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="user@example.com"
                    dir="ltr"
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium">الدور</label>
                  <Select value={inviteRole} onValueChange={(value: any) => setInviteRole(value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="member">عضو</SelectItem>
                      <SelectItem value="admin">مدير</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <DialogFooter>
                <Button onClick={handleInviteMember}>إرسال الدعوة</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="البحث عن الأعضاء..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
          dir="rtl"
        />
      </div>

      {/* Members List */}
      <div className="space-y-3">
        {filteredRoles.map((role) => (
          <Card key={role.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${role.profiles?.full_name}`} />
                    <AvatarFallback>
                      {role.profiles?.full_name?.charAt(0) || 'ع'}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{role.profiles?.full_name || 'عضو'}</h4>
                      {getRoleIcon(role.role)}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {role.profiles?.email}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        انضم في: {new Date(role.assigned_at).toLocaleDateString('ar-SA')}
                      </span>
                      {role.expires_at && (
                        <span className={`text-xs ${isExpired(role.expires_at) ? 'text-red-500' : 'text-muted-foreground'}`}>
                          {isExpired(role.expires_at) ? 'منتهي الصلاحية' : `ينتهي في: ${new Date(role.expires_at).toLocaleDateString('ar-SA')}`}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge variant={getRoleBadgeVariant(role.role)}>
                    {getRoleLabel(role.role)}
                  </Badge>
                  
                  {role.round_bound && (
                    <Badge variant="outline" className="text-xs">
                      جولة {role.round_number}
                    </Badge>
                  )}
                  
                  {isExpired(role.expires_at) && (
                    <Badge variant="destructive" className="text-xs">
                      منتهي
                    </Badge>
                  )}
                  
                  {isAdmin && role.role !== 'creator' && (
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRoles.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">لا توجد نتائج</h3>
            <p className="text-muted-foreground">
              {searchQuery ? 'لم يتم العثور على أعضاء يطابقون البحث' : 'لا يوجد أعضاء في المجموعة'}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">إحصائيات الأعضاء</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {roles.filter(r => r.role === 'creator').length}
              </div>
              <div className="text-sm text-muted-foreground">مؤسس</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {roles.filter(r => r.role === 'admin').length}
              </div>
              <div className="text-sm text-muted-foreground">مدير</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">
                {roles.filter(r => r.role === 'member').length}
              </div>
              <div className="text-sm text-muted-foreground">عضو</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GroupMembersManager;
