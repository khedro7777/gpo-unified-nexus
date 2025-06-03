
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trello, Plus, CheckCircle, Clock, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TrelloCard {
  id: string;
  name: string;
  desc: string;
  due: string | null;
  members: { fullName: string }[];
  list: { name: string };
  labels: { name: string; color: string }[];
}

interface TrelloBoard {
  id: string;
  name: string;
  lists: { id: string; name: string }[];
}

interface TrelloIntegrationProps {
  groupId?: string;
  groupName?: string;
}

const TrelloIntegration: React.FC<TrelloIntegrationProps> = ({ 
  groupId, 
  groupName = 'مجموعة GPO' 
}) => {
  const [apiKey, setApiKey] = useState('');
  const [token, setToken] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const [boards, setBoards] = useState<TrelloBoard[]>([]);
  const [selectedBoard, setSelectedBoard] = useState('');
  const [cards, setCards] = useState<TrelloCard[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Mock data for demonstration
  const mockBoards: TrelloBoard[] = [
    {
      id: 'board1',
      name: 'GPO - إدارة المشاريع',
      lists: [
        { id: 'list1', name: 'قائمة المهام' },
        { id: 'list2', name: 'قيد التنفيذ' },
        { id: 'list3', name: 'مكتمل' }
      ]
    },
    {
      id: 'board2',
      name: 'مجموعة الشراء التعاوني',
      lists: [
        { id: 'list4', name: 'RFQ جديدة' },
        { id: 'list5', name: 'مراجعة العروض' },
        { id: 'list6', name: 'تم الاختيار' }
      ]
    }
  ];

  const mockCards: TrelloCard[] = [
    {
      id: 'card1',
      name: 'مراجعة عرض المورد A',
      desc: 'مراجعة العرض المقدم من المورد A للمنتجات الإلكترونية',
      due: '2025-02-15',
      members: [{ fullName: 'أحمد محمد' }, { fullName: 'سارة أحمد' }],
      list: { name: 'قيد التنفيذ' },
      labels: [{ name: 'عاجل', color: 'red' }, { name: 'مراجعة', color: 'yellow' }]
    },
    {
      id: 'card2',
      name: 'تحديث العقد',
      desc: 'تحديث بنود العقد حسب نتائج التصويت',
      due: null,
      members: [{ fullName: 'محمد علي' }],
      list: { name: 'قائمة المهام' },
      labels: [{ name: 'عقود', color: 'blue' }]
    },
    {
      id: 'card3',
      name: 'إعداد تقرير المشتريات',
      desc: 'إعداد تقرير شهري للمشتريات والموردين',
      due: '2025-02-28',
      members: [{ fullName: 'فاطمة خالد' }],
      list: { name: 'مكتمل' },
      labels: [{ name: 'تقارير', color: 'green' }]
    }
  ];

  const handleConnect = async () => {
    if (!apiKey || !token) {
      toast({
        title: "خطأ في البيانات",
        description: "يرجى إدخال API Key و Token",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Simulate API connection
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsConnected(true);
      setBoards(mockBoards);
      
      toast({
        title: "تم الاتصال بنجاح",
        description: "تم ربط حساب Trello بنجاح",
      });
    } catch (error) {
      toast({
        title: "خطأ في الاتصال",
        description: "فشل في الاتصال بـ Trello",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBoardSelect = (boardId: string) => {
    setSelectedBoard(boardId);
    // Load cards for selected board
    setCards(mockCards);
  };

  const createCard = async (title: string, description: string) => {
    try {
      // Simulate card creation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newCard: TrelloCard = {
        id: `card${Date.now()}`,
        name: title,
        desc: description,
        due: null,
        members: [],
        list: { name: 'قائمة المهام' },
        labels: [{ name: 'GPO', color: 'purple' }]
      };
      
      setCards(prev => [newCard, ...prev]);
      
      toast({
        title: "تم إنشاء البطاقة",
        description: `تم إنشاء بطاقة جديدة: ${title}`,
      });
    } catch (error) {
      toast({
        title: "خطأ في الإنشاء",
        description: "فشل في إنشاء البطاقة",
        variant: "destructive",
      });
    }
  };

  const getLabelColor = (color: string) => {
    const colors: Record<string, string> = {
      red: 'bg-red-100 text-red-800',
      yellow: 'bg-yellow-100 text-yellow-800',
      blue: 'bg-blue-100 text-blue-800',
      green: 'bg-green-100 text-green-800',
      purple: 'bg-purple-100 text-purple-800',
    };
    return colors[color] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trello className="h-5 w-5 text-blue-600" />
            Trello Integration
          </CardTitle>
          <CardDescription>
            ربط مشاريع المجموعة مع لوحات Trello لإدارة أفضل للمهام
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isConnected ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="api-key">Trello API Key</Label>
                <Input
                  id="api-key"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Your Trello API Key"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  احصل على API Key من{' '}
                  <a 
                    href="https://trello.com/app-key" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Trello Developer Page
                  </a>
                </p>
              </div>

              <div>
                <Label htmlFor="token">Trello Token</Label>
                <Input
                  id="token"
                  type="password"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="Your Trello Token"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Token للوصول لحسابك في Trello
                </p>
              </div>

              <Button 
                onClick={handleConnect} 
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                    جاري الاتصال...
                  </>
                ) : (
                  'ربط حساب Trello'
                )}
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="font-medium text-green-800">متصل بـ Trello</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsConnected(false)}
                >
                  قطع الاتصال
                </Button>
              </div>

              <div>
                <Label htmlFor="board-select">اختر لوحة Trello</Label>
                <Select value={selectedBoard} onValueChange={handleBoardSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر لوحة للعمل معها" />
                  </SelectTrigger>
                  <SelectContent>
                    {boards.map((board) => (
                      <SelectItem key={board.id} value={board.id}>
                        {board.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedBoard && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">بطاقات المشروع</h4>
                    <Button 
                      size="sm" 
                      onClick={() => createCard(
                        `مهمة جديدة - ${groupName}`,
                        'مهمة تم إنشاؤها من منصة GPO'
                      )}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      إنشاء بطاقة
                    </Button>
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {cards.map((card) => (
                      <div key={card.id} className="border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-medium">{card.name}</h5>
                          <Badge variant="outline" className="text-xs">
                            {card.list.name}
                          </Badge>
                        </div>
                        
                        {card.desc && (
                          <p className="text-sm text-muted-foreground mb-3">
                            {card.desc}
                          </p>
                        )}

                        <div className="flex flex-wrap gap-2 mb-3">
                          {card.labels.map((label, index) => (
                            <Badge 
                              key={index} 
                              className={`text-xs ${getLabelColor(label.color)}`}
                            >
                              {label.name}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <div className="flex items-center gap-4">
                            {card.members.length > 0 && (
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                <span>{card.members.length} أعضاء</span>
                              </div>
                            )}
                            {card.due && (
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{new Date(card.due).toLocaleDateString('ar-SA')}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TrelloIntegration;
