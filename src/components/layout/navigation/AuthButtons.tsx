
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

export const AuthButtons: React.FC = () => {
  return (
    <>
      <Button variant="outline" size="sm" asChild>
        <Link to="/login">تسجيل الدخول</Link>
      </Button>
      <Button size="sm" asChild>
        <Link to="/register">إنشاء حساب</Link>
      </Button>
    </>
  );
};
