
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '../../context/AuthContext';
import { ServiceRequest, RequestStatus } from '../../types';
import { useToast } from '@/hooks/use-toast';
import { Loader2, PlusCircle, FileText, Clock, CheckCircle, Calendar } from 'lucide-react';

// Mock data for service requests
const MOCK_SERVICE_REQUESTS: ServiceRequest[] = [
  {
    id: '1',
    customerId: '1',
    title: 'Income Tax Assessment Dispute',
    description: 'I need help with a discrepancy in my income tax assessment for FY 2022-23.',
    category: 'Income Tax',
    documents: [
      {
        id: '1',
        name: 'Assessment_Notice.pdf',
        url: '#',
        uploadedBy: '1',
        uploadedAt: '2023-05-10T10:30:00Z',
      },
      {
        id: '2',
        name: 'Income_Proof.pdf',
        url: '#',
        uploadedBy: '1',
        uploadedAt: '2023-05-10T10:35:00Z',
      },
    ],
    status: 'in-progress',
    createdAt: '2023-05-10T10:30:00Z',
    updatedAt: '2023-05-12T14:20:00Z',
    assignedTo: '2',
  },
  {
    id: '2',
    customerId: '1',
    title: 'GST Input Credit Issue',
    description: 'Facing issues with claiming input tax credit for Q2 2023.',
    category: 'GST',
    documents: [
      {
        id: '3',
        name: 'GST_Returns.pdf',
        url: '#',
        uploadedBy: '1',
        uploadedAt: '2023-06-05T09:45:00Z',
      },
    ],
    status: 'needs-clarification',
    createdAt: '2023-06-05T09:45:00Z',
    updatedAt: '2023-06-07T16:30:00Z',
    assignedTo: '2',
    messages: [
      {
        id: '1',
        sender: '2',
        content: 'Could you please provide the purchase invoices for which input credit is being claimed?',
        timestamp: '2023-06-07T16:30:00Z',
        read: false,
      },
    ],
  },
  {
    id: '3',
    customerId: '1',
    title: 'Corporate Tax Penalty Appeal',
    description: 'Need assistance with appealing against a penalty imposed under section 271(1)(c).',
    category: 'Corporate Tax',
    documents: [
      {
        id: '4',
        name: 'Penalty_Order.pdf',
        url: '#',
        uploadedBy: '1',
        uploadedAt: '2023-04-20T11:15:00Z',
      },
      {
        id: '5',
        name: 'Financial_Statements.pdf',
        url: '#',
        uploadedBy: '1',
        uploadedAt: '2023-04-20T11:20:00Z',
      },
    ],
    status: 'completed',
    createdAt: '2023-04-20T11:15:00Z',
    updatedAt: '2023-05-15T17:45:00Z',
    assignedTo: '2',
  },
];

const CustomerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // In a real app, we would fetch the user's service requests from an API
    // For now, we'll use mock data
    setTimeout(() => {
      setRequests(MOCK_SERVICE_REQUESTS);
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 border-gray-300">Pending</Badge>;
      case 'assigned':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">Assigned</Badge>;
      case 'in-progress':
        return <Badge variant="outline" className="bg-indigo-100 text-indigo-800 border-indigo-300">In Progress</Badge>;
      case 'needs-clarification':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">Needs Clarification</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Completed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getUnreadMessagesCount = (request: ServiceRequest) => {
    if (!request.messages) return 0;
    return request.messages.filter(msg => msg.sender !== user?.id && !msg.read).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Welcome, {user?.name}</h1>
          <p className="text-gray-600 mt-1">Manage your tax litigation services</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            className="bg-brand-blue hover:bg-brand-lightblue flex items-center"
            onClick={() => navigate('/customer/new-request')}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            New Service Request
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="flex flex-row items-center p-6">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <FileText className="h-6 w-6 text-brand-blue" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900">{loading ? '-' : requests.length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-row items-center p-6">
            <div className="rounded-full bg-yellow-100 p-3 mr-4">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {loading ? '-' : requests.filter(req => ['assigned', 'in-progress', 'needs-clarification'].includes(req.status)).length}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-row items-center p-6">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-gray-900">
                {loading ? '-' : requests.filter(req => req.status === 'completed').length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Service Requests</CardTitle>
          <CardDescription>View and manage your tax litigation service requests</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-brand-blue" />
            </div>
          ) : requests.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">You don't have any service requests yet</p>
              <Button 
                onClick={() => navigate('/customer/new-request')}
                className="bg-brand-blue hover:bg-brand-lightblue"
              >
                Create Your First Request
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Request ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Title</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Category</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Date Created</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm">#{request.id}</td>
                      <td className="py-3 px-4">
                        <div className="font-medium text-gray-900">{request.title}</div>
                        <div className="text-sm text-gray-500">
                          {request.description.length > 50 
                            ? `${request.description.substring(0, 50)}...` 
                            : request.description}
                        </div>
                        {getUnreadMessagesCount(request) > 0 && (
                          <Badge className="bg-red-500 text-white mt-1">
                            {getUnreadMessagesCount(request)} new message{getUnreadMessagesCount(request) > 1 ? 's' : ''}
                          </Badge>
                        )}
                      </td>
                      <td className="py-3 px-4 text-sm">{request.category}</td>
                      <td className="py-3 px-4 text-sm">{formatDate(request.createdAt)}</td>
                      <td className="py-3 px-4">{getStatusBadge(request.status)}</td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="text-brand-blue border-brand-blue hover:bg-brand-blue hover:text-white"
                          onClick={() => navigate(`/customer/request/${request.id}`)}
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Important dates and deadlines</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <div className="h-12 w-12 bg-brand-blue/10 rounded-lg flex flex-col items-center justify-center text-brand-blue">
                  <Calendar className="h-5 w-5 mb-1" />
                  <span className="text-xs font-semibold">15</span>
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-900">Response Due for GST Input Credit Issue</p>
                <p className="text-sm text-gray-500">Jun 15, 2023 • ID: #2</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <div className="h-12 w-12 bg-brand-blue/10 rounded-lg flex flex-col items-center justify-center text-brand-blue">
                  <Calendar className="h-5 w-5 mb-1" />
                  <span className="text-xs font-semibold">22</span>
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-900">Expected Completion: Income Tax Assessment Dispute</p>
                <p className="text-sm text-gray-500">Jun 22, 2023 • ID: #1</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerDashboard;
