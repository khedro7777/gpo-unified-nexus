
import React, { useState } from 'react';
import { Bot, Send, Loader2, Sparkles, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

interface AIPromethazineProps {
  className?: string;
}

const AIPromethazine: React.FC<AIPromethazineProps> = ({ className = "" }) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    // محاكاة استجابة AI
    setTimeout(() => {
      setResponse(`تم تحليل طلبك: "${prompt}". هذه محاكاة لاستجابة نظام AI Promethazine الذكي.`);
      setIsLoading(false);
    }, 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  if (isMinimized) {
    return (
      <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
        <Button
          onClick={() => setIsMinimized(false)}
          className="rounded-full w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg"
        >
          <Bot className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 w-96 ${className}`}>
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-md">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <CardTitle className="text-lg">AI Promethazine</CardTitle>
              <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700">
                <Sparkles className="h-3 w-3 mr-1" />
                ذكي
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(true)}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {response && (
            <div className="p-3 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
              <p className="text-sm text-gray-700">{response}</p>
            </div>
          )}
          
          <div className="space-y-2">
            <Textarea
              placeholder="اكتب استفسارك للذكاء الاصطناعي..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyPress={handleKeyPress}
              className="min-h-[80px] resize-none border-purple-200 focus:border-purple-400"
              dir="rtl"
            />
            <Button
              onClick={handleSubmit}
              disabled={!prompt.trim() || isLoading}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin ml-2" />
              ) : (
                <Send className="h-4 w-4 ml-2" />
              )}
              {isLoading ? 'جاري المعالجة...' : 'إرسال'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIPromethazine;
