
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { FileText, Download, Clock, MessageSquare, FileCheck, ShieldAlert, UserCheck, Award } from 'lucide-react';

interface DisputeEvent {
  id: string;
  type: 'create' | 'comment' | 'evidence' | 'status' | 'resolution';
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  attachments?: {
    name: string;
    type: string;
    url: string;
  }[];
}

interface DisputeDetailsProps {
  dispute: {
    id: string;
    title: string;
    description: string;
    status: 'pending' | 'review' | 'arbitration' | 'resolved' | 'rejected';
    createdAt: string;
    type: string;
    preferredResolution: 'human' | 'auto' | 'dao';
    parties: {
      id: string;
      name: string;
      role: string;
      avatar: string;
    }[];
    ipfsHash?: string;
  };
  events: DisputeEvent[];
  onAddComment?: (comment: string) => void;
  onAddEvidence?: (evidence: File) => void;
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'pending': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
    case 'review': return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
    case 'arbitration': return 'bg-purple-100 text-purple-800 hover:bg-purple-200';
    case 'resolved': return 'bg-green-100 text-green-800 hover:bg-green-200';
    case 'rejected': return 'bg-red-100 text-red-800 hover:bg-red-200';
    default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'pending': return 'قيد الانتظار';
    case 'review': return 'قيد المراجعة';
    case 'arbitration': return 'قيد التحكيم';
    case 'resolved': return 'تم الحل';
    case 'rejected': return 'مرفوض';
    default: return status;
  }
};

const getEventIcon = (type: string) => {
  switch (type) {
    case 'create': return <ShieldAlert className="h-5 w-5" />;
    case 'comment': return <MessageSquare className="h-5 w-5" />;
    case 'evidence': return <FileCheck className="h-5 w-5" />;
    case 'status': return <Clock className="h-5 w-5" />;
    case 'resolution': return <Award className="h-5 w-5" />;
    default: return <Clock className="h-5 w-5" />;
  }
};

const DisputeDetails: React.FC<DisputeDetailsProps> = ({ dispute, events }) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge className={getStatusColor(dispute.status)}>
                  {getStatusLabel(dispute.status)}
                </Badge>
                <Badge variant="outline">
                  رقم النزاع: {dispute.id}
                </Badge>
              </div>
              <CardTitle className="text-xl">{dispute.title}</CardTitle>
              <CardDescription>
                <span className="capitalize">{dispute.type}</span> • تم الإنشاء في {new Date(dispute.createdAt).toLocaleDateString('ar')}
              </CardDescription>
            </div>
            <div>
              {dispute.ipfsHash && (
                <Button variant="outline" size="sm" className="text-xs">
                  <FileText className="h-3 w-3 mr-1" />
                  IPFS: {dispute.ipfsHash.substring(0, 6)}...
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-medium text-sm mb-2">وصف النزاع</h3>
            <p className="text-muted-foreground">{dispute.description}</p>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-2">الأطراف المعنية</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {dispute.parties.map(party => (
                <div key={party.id} className="flex items-center gap-3 p-3 border rounded-md">
                  <Avatar>
                    <AvatarImage src={party.avatar} />
                    <AvatarFallback>{party.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{party.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{party.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="font-medium text-sm mb-4 flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              سجل الأحداث
            </h3>
            <div className="space-y-6">
              {events.map((event, index) => (
                <div key={event.id} className="relative">
                  {index !== events.length - 1 && (
                    <div className="absolute top-10 bottom-0 left-5 w-0.5 bg-border -ml-[2px] z-0"></div>
                  )}
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center z-10">
                      {getEventIcon(event.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={event.user.avatar} />
                            <AvatarFallback>{event.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium text-sm">{event.user.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{new Date(event.timestamp).toLocaleString('ar')}</span>
                      </div>
                      <p className="mt-2 text-sm">{event.content}</p>
                      
                      {event.attachments && event.attachments.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {event.attachments.map((attachment, i) => (
                            <div 
                              key={i} 
                              className="flex items-center justify-between p-2 bg-muted rounded-md"
                            >
                              <div className="flex items-center">
                                <FileText className="h-4 w-4 mr-2 text-primary" />
                                <span className="text-sm">{attachment.name}</span>
                              </div>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <div className="text-xs text-muted-foreground flex items-center">
            <UserCheck className="h-4 w-4 mr-1" />
            نوع التحكيم: {dispute.preferredResolution === 'human' ? 'تحكيم يدوي' : 
              dispute.preferredResolution === 'auto' ? 'تحكيم آلي (MCP)' : 'تحكيم DAO'}
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <MessageSquare className="h-4 w-4 mr-1" />
              إضافة تعليق
            </Button>
            <Button variant="outline" size="sm">
              <FileCheck className="h-4 w-4 mr-1" />
              إضافة أدلة
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default DisputeDetails;
