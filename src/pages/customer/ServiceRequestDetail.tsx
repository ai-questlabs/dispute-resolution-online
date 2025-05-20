
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';

const ServiceRequestDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  // In a real app, we would fetch the request details from an API
  // For now, just show a placeholder
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/customer/dashboard')}
        className="mb-6 pl-0 flex items-center text-gray-600 hover:text-brand-blue"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Button>

      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Service Request #{id}</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Request Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <p className="text-gray-500">
              This is a placeholder for the service request details page. In a production environment, 
              this would show all details about the request, allow document uploads, and display 
              communication with consultants.
            </p>
            <div className="flex items-center">
              <span className="font-medium text-gray-700 mr-2">Status:</span>
              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
                Pending
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceRequestDetail;
