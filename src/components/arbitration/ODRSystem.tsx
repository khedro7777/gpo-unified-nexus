
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Gavel, FileText, Upload, Clock, User, AlertTriangle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface DisputeCase {
  id: string;
  ticketNumber: string;
  title: string;
  description: string;
  status: 'submitted' | 'under_review' | 'mediation' | 'arbitration' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  amount: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
  evidence: { id: string; name: string; type: string }[];
  timeline: { date: Date; action: string; actor: string }[];
}

interface ODRSystemProps {
  userId: string;
}

const ODRSystem: React.FC<ODRSystemProps> = ({ userId }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [disputes, setDisputes] = useState<DisputeCase[]>([]);
  const [showNewDispute, setShowNewDispute] = useState(false);
  const [newDispute, setNewDispute] = useState({
    title: '',
    description: '',
    amount: '',
    currency: 'USD'
  });

  // Sample data
  useEffect(() => {
    setDisputes([
      {
        id: '1',
        ticketNumber: 'ORD-2024-001',
        title: isRTL ? 'نزاع حول جودة المنتج' : 'Product Quality Dispute',
        description: isRTL ? 'المنتج المستلم لا يطابق المواصفات المتفق عليها' : 'Received product does not match agreed specifications',
        status: 'under_review',
        priority: 'high',
        amount: 5000,
        currency: 'USD',
        createdAt: new Date(Date.now() - 86400000 * 3),
        updatedAt: new Date(Date.now() - 86400000 * 1),
        evidence: [
          { id: '1', name: 'product_photos.zip', type: 'images' },
          { id: '2', name: 'contract.pdf', type: 'document' }
        ],
        timeline: [
          { date: new Date(Date.now() - 86400000 * 3), action: isRTL ? 'تم إنشاء النزاع' : 'Dispute created', actor: 'Client' },
          { date: new Date(Date.now() - 86400000 * 2), action: isRTL ? 'تم تقديم الأدلة' : 'Evidence submitted', actor: 'Client' },
          { date: new Date(Date.now() - 86400000 * 1), action: isRTL ? 'بدأت المراجعة' : 'Review started', actor: 'ORDA System' }
        ]
      },
      {
        id: '2',
        ticketNumber: 'ORD-2024-002',
        title: isRTL ? 'تأخير في التسليم' : 'Delivery Delay',
        description: isRTL ? 'تأخر المورد في تسليم البضاعة أسبوعين' : 'Supplier delayed delivery by two weeks',
        status: 'mediation',
        priority: 'medium',
        amount: 2500,
        currency: 'USD',
        createdAt: new Date(Date.now() - 86400000 * 7),
        updatedAt: new Date(Date.now() - 86400000 * 2),
        evidence: [
          { id: '3', name: 'email_chain.pdf', type: 'document' },
          { id: '4', name: 'delivery_schedule.xlsx', type: 'document' }
        ],
        timeline: [
          { date: new Date(Date.now() - 86400000 * 7), action: isRTL ? 'تم إنشاء النزاع' : 'Dispute created', actor: 'Client' },
          { date: new Date(Date.now() - 86400000 * 5), action: isRTL ? 'بدأت الوساطة' : 'Mediation started', actor: 'Mediator' },
          { date: new Date(Date.now() - 86400000 * 2), action: isRTL ? 'اجتماع وساطة' : 'Mediation session', actor: 'All parties' }
        ]
      }
    ]);
  }, [isRTL]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'bg-blue-500';
      case 'under_review': return 'bg-yellow-500';
      case 'mediation': return 'bg-orange-500';
      case 'arbitration': return 'bg-red-500';
      case 'resolved': return 'bg-green-500';
      case 'closed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    if (isRTL) {
      switch (status) {
        case 'submitted': return 'مقدم';
        case 'under_review': return 'قيد المراجعة';
        case 'mediation': return 'وساطة';
        case 'arbitration': return 'تحكيم';
        case 'resolved': return 'محلول';
        case 'closed': return 'مغلق';
        default: return status;
      }
    } else {
      return status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const handleSubmitDispute = async () => {
    try {
      const ticketNumber = `ORD-${new Date().getFullYear()}-${String(disputes.length + 1).padStart(3, '0')}`;
      
      const dispute: DisputeCase = {
        id: String(disputes.length + 1),
        ticketNumber,
        title: newDispute.title,
        description: newDispute.description,
        status: 'submitted',
        priority: 'medium',
        amount: parseFloat(newDispute.amount),
        currency: newDispute.currency,
        createdAt: new Date(),
        updatedAt: new Date(),
        evidence: [],
        timeline: [
          { date: new Date(), action: isRTL ? 'تم إنشاء النزاع' : 'Dispute created', actor: 'Client' }
        ]
      };

      setDisputes(prev => [dispute, ...prev]);
      setNewDispute({ title: '', description: '', amount: '', currency: 'USD' });
      setShowNewDispute(false);
    } catch (error) {
      console.error('Error submitting dispute:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold flex items-center gap-2">
          <Gavel className="h-5 w-5" />
          {isRTL ? 'نظام حل النزاعات - ORDA' : 'Online Dispute Resolution - ORDA'}
        </h3>
        <Button onClick={() => setShowNewDispute(true)}>
          {isRTL ? 'إنشاء نزاع جديد' : 'Create New Dispute'}
        </Button>
      </div>

      {showNewDispute && (
        <Card>
          <CardHeader>
            <CardTitle>{isRTL ? 'إنشاء نزاع جديد' : 'Create New Dispute'}</CardTitle>
            <CardDescription>
              {isRTL ? 'قدم تفاصيل النزاع لبدء عملية الحل' : 'Submit dispute details to start resolution process'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">{isRTL ? 'عنوان النزاع' : 'Dispute Title'}</label>
              <Input
                value={newDispute.title}
                onChange={(e) => setNewDispute(prev => ({ ...prev, title: e.target.value }))}
                placeholder={isRTL ? 'وصف مختصر للنزاع' : 'Brief description of the dispute'}
              />
            </div>
            <div>
              <label className="text-sm font-medium">{isRTL ? 'تفاصيل النزاع' : 'Dispute Details'}</label>
              <Textarea
                value={newDispute.description}
                onChange={(e) => setNewDispute(prev => ({ ...prev, description: e.target.value }))}
                placeholder={isRTL ? 'شرح مفصل للنزاع والظروف المحيطة' : 'Detailed explanation of the dispute and circumstances'}
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">{isRTL ? 'المبلغ المتنازع عليه' : 'Disputed Amount'}</label>
                <Input
                  type="number"
                  value={newDispute.amount}
                  onChange={(e) => setNewDispute(prev => ({ ...prev, amount: e.target.value }))}
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="text-sm font-medium">{isRTL ? 'العملة' : 'Currency'}</label>
                <Input
                  value={newDispute.currency}
                  onChange={(e) => setNewDispute(prev => ({ ...prev, currency: e.target.value }))}
                  placeholder="USD"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSubmitDispute}>
                {isRTL ? 'تقديم النزاع' : 'Submit Dispute'}
              </Button>
              <Button variant="outline" onClick={() => setShowNewDispute(false)}>
                {isRTL ? 'إلغاء' : 'Cancel'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {disputes.map((dispute) => (
        <Card key={dispute.id} className="overflow-hidden">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg flex items-center gap-2">
                  {dispute.title}
                  <Badge variant="outline" className="text-xs">
                    {dispute.ticketNumber}
                  </Badge>
                </CardTitle>
                <CardDescription className="mt-2">{dispute.description}</CardDescription>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge className={getStatusColor(dispute.status)}>
                  {getStatusText(dispute.status)}
                </Badge>
                <Badge variant="outline" className={getPriorityColor(dispute.priority)}>
                  {dispute.priority.toUpperCase()}
                </Badge>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">{isRTL ? 'المبلغ:' : 'Amount:'}</span>
                <p className="font-medium">{dispute.amount} {dispute.currency}</p>
              </div>
              <div>
                <span className="text-muted-foreground">{isRTL ? 'تاريخ الإنشاء:' : 'Created:'}</span>
                <p className="font-medium">{dispute.createdAt.toLocaleDateString()}</p>
              </div>
              <div>
                <span className="text-muted-foreground">{isRTL ? 'آخر تحديث:' : 'Updated:'}</span>
                <p className="font-medium">{dispute.updatedAt.toLocaleDateString()}</p>
              </div>
              <div>
                <span className="text-muted-foreground">{isRTL ? 'الأدلة:' : 'Evidence:'}</span>
                <p className="font-medium">{dispute.evidence.length} {isRTL ? 'ملف' : 'files'}</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {isRTL ? 'الجدول الزمني' : 'Timeline'}
              </h4>
              <div className="space-y-2">
                {dispute.timeline.map((event, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">{event.date.toLocaleDateString()}</span>
                    <span>{event.action}</span>
                    <Badge variant="outline" className="text-xs">{event.actor}</Badge>
                  </div>
                ))}
              </div>
            </div>

            {dispute.evidence.length > 0 && (
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  {isRTL ? 'الأدلة المرفقة' : 'Evidence Files'}
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {dispute.evidence.map((file) => (
                    <div key={file.id} className="flex items-center gap-2 p-2 border rounded">
                      <FileText className="h-4 w-4" />
                      <span className="text-sm">{file.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button size="sm" variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                {isRTL ? 'رفع أدلة' : 'Upload Evidence'}
              </Button>
              <Button size="sm" variant="outline">
                <User className="h-4 w-4 mr-2" />
                {isRTL ? 'عرض التفاصيل' : 'View Details'}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ODRSystem;
