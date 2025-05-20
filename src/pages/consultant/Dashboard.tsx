
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '../../context/AuthContext';
import { ServiceRequest, RequestStatus } from '../../types';
import { useToast } from '@/hooks/use-toast';
import { Loader2, FileText, Clock, CheckCircle, Calendar, MessageCircle } from 'lucide-react';

// Mock data for service requests assigned to the consultant
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
  {
    id: '4',
    customerId: '4',
    title: 'International Tax Double Taxation Issue',
    description: 'Need help with double taxation relief for income earned abroad.',
    category: 'International Tax',
    documents: [
      {
        id: '6',
        name: 'Foreign_Income_Details.pdf',
        url: '#',
        uploadedBy: '4',
        uploadedAt: '2023-06-10T09:15:00Z',
      },
    ],
    status: 'assigned',
    createdAt: '2023-06-10T09:15:00Z',
    updatedAt: '2023-06-10T14:30:00Z',
    assignedTo: '2',
  },
];

const ConsultantDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('all');

  useEffect(() => {
    // In a real app, we would fetch the consultant's assigned service requests from an API
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

  const getFilteredRequests = () => {
    switch (activeTab) {
      case 'assigned':
        return requests.filter(req => req.status === 'assigned');
      case 'in-progress':
        return requests.filter(req => req.status === 'in-progress');
      case 'needs-clarification':
        return requests.filter(req => req.status === 'needs-clarification');
      case 'completed':
        return requests.filter(req => req.status === 'completed');
      default:
        return requests;
    }
  };

  const hasUnreadMessages = (request: ServiceRequest) => {
    if (!request.messages) return false;
    return request.messages.some(msg => msg.sender !== user?.id && !msg.read);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Welcome, {user?.name}</h1>
          <p className="text-gray-600 mt-1">Manage your assigned cases and tasks</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="flex flex-row items-center p-6">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <FileText className="h-6 w-6 text-brand-blue" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Cases</p>
              <p className="text-2xl font-bold text-gray-900">{loading ? '-' : requests.length}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-row items-center p-6">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">New / Assigned</p>
              <p className="text-2xl font-bold text-gray-900">
                {loading ? '-' : requests.filter(req => req.status === 'assigned').length}
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-row items-center p-6">
            <div className="rounded-full bg-yellow-100 p-3 mr-4">
              <MessageCircle className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Needs Clarification</p>
              <p className="text-2xl font-bold text-gray-900">
                {loading ? '-' : requests.filter(req => req.status === 'needs-clarification').length}
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

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Assigned Cases</CardTitle>
          <CardDescription>View and manage cases assigned to you</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-brand-blue" />
            </div>
          ) : (
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Cases</TabsTrigger>
                <TabsTrigger value="assigned">New / Assigned</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="needs-clarification">Needs Clarification</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab}>
                {getFilteredRequests().length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No cases found in this category</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Case ID</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Title</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Category</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Date Assigned</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Status</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getFilteredRequests().map((request) => (
                          <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4 text-sm">#{request.id}</td>
                            <td className="py-3 px-4">
                              <div className="font-medium text-gray-900 flex items-center">
                                {request.title}
                                {hasUnreadMessages(request) && (
                                  <span className="ml-2 w-2 h-2 bg-red-500 rounded-full"></span>
                                )}
                              </div>
                              <div className="text-sm text-gray-500">
                                {request.description.length > 50 
                                  ? `${request.description.substring(0, 50)}...` 
                                  : request.description}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-sm">{request.category}</td>
                            <td className="py-3 px-4 text-sm">{formatDate(request.updatedAt)}</td>
                            <td className="py-3 px-4">{getStatusBadge(request.status)}</td>
                            <td className="py-3 px-4">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="text-brand-blue border-brand-blue hover:bg-brand-blue hover:text-white"
                                onClick={() => navigate(`/consultant/case/${request.id}`)}
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
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Cases requiring your attention soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 bg-red-100 rounded-lg flex flex-col items-center justify-center text-red-600">
                    <Calendar className="h-5 w-5 mb-1" />
                    <span className="text-xs font-semibold">15</span>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Response Required: GST Input Credit Issue</p>
                  <p className="text-sm text-gray-500">Case ID: #2 • Due: Jun 15, 2023</p>
                </div>
              </div>
  
              <div className="flex items-start">
                <div className="flex-shrink-0 mr-4">
                  <div className="h-12 w-12 bg-orange-100 rounded-lg flex flex-col items-center justify-center text-orange-600">
                    <Calendar className="h-5 w-5 mb-1" />
                    <span className="text-xs font-semibold">20</span>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-gray-900">Initial Assessment: International Tax Issue</p>
                  <p className="text-sm text-gray-500">Case ID: #4 • Due: Jun 20, 2023</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
  
        <Card>
          <CardHeader>
            <CardTitle>Performance Stats</CardTitle>
            <CardDescription>Your work statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Cases Completed</span>
                <span className="font-medium">15</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-brand-blue h-2.5 rounded-full" style={{ width: '75%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Average Resolution Time</span>
                <span className="font-medium">4.2 days</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Client Satisfaction</span>
                <span className="font-medium">4.8/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-brand-gold h-2.5 rounded-full" style={{ width: '95%' }}></div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Response Time</span>
                <span className="font-medium">6.4 hours</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-indigo-500 h-2.5 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConsultantDashboard;
