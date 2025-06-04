
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

interface ContractEditorProps {
  groupId: string;
  onStatusChange: (status: 'draft' | 'voting' | 'approved' | 'signed') => void;
  currentStatus: string;
}

const ContractEditor: React.FC<ContractEditorProps> = ({ groupId, onStatusChange, currentStatus }) => {
  const { toast } = useToast();
  const [contractData, setContractData] = useState({
    title: 'عقد تعاون جماعي - ' + groupId,
    parties: '',
    terms: `1. الأطراف المتعاقدة
2. محل العقد وطبيعة التعاون
3. الالتزامات المالية
4. مدة العقد
5. شروط الإنهاء
6. فض النزاعات
7. القانون واجب التطبيق`,
    conditions: '',
    penalties: '',
    duration: '',
  });

  const handleSave = () => {
    // محاكاة حفظ العقد
    localStorage.setItem(`contract-${groupId}`, JSON.stringify(contractData));
    toast({
      title: "تم حفظ العقد",
      description: "تم حفظ التعديلات بنجاح",
    });
  };

  const handleSubmitForVoting = () => {
    handleSave();
    onStatusChange('voting');
    toast({
      title: "تم إرسال العقد للتصويت",
      description: "العقد الآن متاح للتصويت من قبل أعضاء المجموعة",
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>تحرير العقد</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="title">عنوان العقد</Label>
            <Input
              id="title"
              value={contractData.title}
              onChange={(e) => setContractData(prev => ({ ...prev, title: e.target.value }))}
            />
          </div>

          <div>
            <Label htmlFor="parties">الأطراف المتعاقدة</Label>
            <Textarea
              id="parties"
              placeholder="اذكر جميع الأطراف المشاركة في العقد..."
              value={contractData.parties}
              onChange={(e) => setContractData(prev => ({ ...prev, parties: e.target.value }))}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="terms">بنود العقد الرئيسية</Label>
            <Textarea
              id="terms"
              value={contractData.terms}
              onChange={(e) => setContractData(prev => ({ ...prev, terms: e.target.value }))}
              rows={8}
              className="font-mono text-sm"
            />
          </div>

          <div>
            <Label htmlFor="conditions">الشروط والأحكام</Label>
            <Textarea
              id="conditions"
              placeholder="الشروط الخاصة والاستثناءات..."
              value={contractData.conditions}
              onChange={(e) => setContractData(prev => ({ ...prev, conditions: e.target.value }))}
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="duration">مدة العقد</Label>
              <Input
                id="duration"
                placeholder="مثال: 6 أشهر"
                value={contractData.duration}
                onChange={(e) => setContractData(prev => ({ ...prev, duration: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="penalties">الغرامات والجزاءات</Label>
              <Input
                id="penalties"
                placeholder="مثال: 1000 ريال عند الإخلال"
                value={contractData.penalties}
                onChange={(e) => setContractData(prev => ({ ...prev, penalties: e.target.value }))}
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button onClick={handleSave} variant="outline">
              حفظ كمسودة
            </Button>
            <Button 
              onClick={handleSubmitForVoting}
              disabled={currentStatus !== 'draft'}
            >
              إرسال للتصويت
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractEditor;
