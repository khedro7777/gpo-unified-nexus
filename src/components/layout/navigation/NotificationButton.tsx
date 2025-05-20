
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';
import { Button } from "@/components/ui/button";

export const NotificationButton: React.FC = () => {
  return (
    <Button variant="ghost" size="sm" className="relative" asChild>
      <Link to="/notifications">
        <Bell className="h-5 w-5" />
        <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
      </Link>
    </Button>
  );
};
