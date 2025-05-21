
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldCheck } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Navigate } from 'react-router-dom';

const AdminAccess = () => {
  const { isAuthenticated, role } = useAuth();
  
  // Block non-admin users from accessing this page
  if (isAuthenticated && role !== 'admin') {
    return <Navigate to="/" />;
  }
  
  const handleEnterDashboard = () => {
    window.open('https://cms.gpo.example.com/admin', '_blank');
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background/95 p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 p-4 rounded-full mb-4">
              <ShieldCheck className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-2xl">Welcome to GPO Admin Access Portal</CardTitle>
            <CardDescription className="text-center">
              This area is reserved for internal governance, observation, and content control.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Button 
              size="lg" 
              className="w-full mt-4"
              onClick={handleEnterDashboard}
            >
              Enter Admin Dashboard
            </Button>
          </CardContent>
          <CardFooter className="text-center text-sm text-muted-foreground flex-col gap-1">
            <p>Secured access only. All activities are logged.</p>
            <p>GPO Smart Cooperation Platform © {new Date().getFullYear()}</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminAccess;
