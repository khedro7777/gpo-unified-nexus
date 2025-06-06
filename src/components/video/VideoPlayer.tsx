
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Volume2 } from 'lucide-react';

interface VideoPlayerProps {
  title?: string;
  description?: string;
  videoUrl?: string;
  thumbnailUrl?: string;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ 
  title = "شرح كيفية عمل المنصة",
  description = "فيديو تفصيلي يوضح كيفية استخدام منصة GPO والاستفادة من جميع الخدمات المتاحة",
  videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ", // placeholder
  thumbnailUrl,
  className = ""
}) => {
  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Play className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
          <iframe
            src={videoUrl}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
          <Volume2 className="h-4 w-4" />
          <span>يمكنك تشغيل الصوت وعرض الفيديو بملء الشاشة</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPlayer;
