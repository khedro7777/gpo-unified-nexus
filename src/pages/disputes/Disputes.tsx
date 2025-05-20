
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Disputes = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">نزاعات ORDA</h1>
          <Button asChild>
            <Link to="/disputes/create">إنشاء نزاع جديد</Link>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>النزاعات الحالية</CardTitle>
            <CardDescription>إدارة النزاعات والمطالبات</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">قائمة النزاعات سيتم تنفيذها هنا</p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Disputes;
