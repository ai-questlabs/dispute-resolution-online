
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from '../../context/AuthContext';
import { ServiceRequest, User, UserRole, Consultant, DashboardStats } from '../../types';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Users, UserPlus, FileText, Clock, CheckCircle } from 'lucide-react';

// Mock data
const MOCK_SERVICE_REQUESTS: ServiceRequest[] = [
  {
    id: '1',
    customerId: '1',
    title: 'Income Tax Assessment Dispute',
    description: 'I need help with a discrepancy in my income tax assessment for FY 2022-23.',
    category: 'Income Tax',
    documents: [
      { id: '1', name: 'Assessment_Notice.pdf', url: '#', uploadedBy: '1', uploadedAt: '2023-05-10T10:30:00Z' },
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
      { id: '3', name: 'GST_Returns.pdf', url: '#', uploadedBy: '1', uploadedAt: '2023-06-05T09:45:00Z' },
    ],
    status: 'needs-clarification',
    createdAt: '2023-06-05T09:45:00Z',
    updatedAt: '2023-06-07T16:30:00Z',
    assignedTo: '2',
  },
  {
    id: '3',
    customerId: '1',
    title: 'Corporate Tax Penalty Appeal',
    description: 'Need assistance with appealing against a penalty imposed under section 271(1)(c).',
    category: 'Corporate Tax',
    documents: [
      { id: '4', name: 'Penalty_Order.pdf', url: '#', uploadedBy: '1', uploadedAt: '2023-04-20T11:15:00Z' },
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
      { id: '6', name: 'Foreign_Income_Details.pdf', url: '#', uploadedBy: '4', uploadedAt: '2023-06-10T09:15:00Z' },
    ],
    status: 'pending',
    createdAt: '2023-06-10T09:15:00Z',
    updatedAt: '2023-06-10T09:15:00Z',
  },
  {
    id: '5',
    customerId: '5',
    title: 'Tax Appeals Tribunal Representation',
    description: 'Need representation for an appeal at the Income Tax Appellate Tribunal.',
    category: 'Tax Appeals',
    documents: [
      { id: '7', name: 'Appeal_Notice.pdf', url: '#', uploadedBy: '5', uploadedAt: '2023-06-08T13:20:00Z' },
    ],
    status: 'pending',
    createdAt: '2023-06-08T13:20:00Z',
    updatedAt: '2023-06-08T13:20:00Z',
  },
];

const MOCK_CONSULTANTS: Consultant[] = [
  {
    id: '2',
    email: 'consultant@example.com',
    role: 'consultant',
    name: 'Jane Consultant',
    specialization: ['Income Tax', 'GST'],
    assignedCases: ['1', '2', '3'],
    caseCompleted: 15,
  },
  {
    id: '6',
    email: 'mark@example.com',
    role: 'consultant',
    name: 'Mark Wilson',
    specialization: ['Corporate Tax', 'International Tax'],
    assignedCases: [],
    caseCompleted: 8,
  },
  {
    id: '7',
    email: 'sarah@example.com',
    role: 'consultant',
    name: 'Sarah Johnson',
    specialization: ['Tax Appeals', 'GST'],
    assignedCases: [],
    caseCompleted: 12,
  },
];

const MOCK_STATS: DashboardStats = {
  totalRequests: 5,
  pendingRequests: 2,
  completedRequests: 1,
  activeConsultants: 3,
};

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [consultants, setConsultants] = useState<Consultant[]>([]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<string>('all');

  useEffect(() => {
    // In a real app, we would fetch data from an API
    // For now, we'll use mock data
    setTimeout(() => {
      setRequests(MOCK_SERVICE_REQUESTS);
      setConsultants(MOCK_CONSULTANTS);
      setStats(MOCK_STATS);
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
      case 'pending':
        return requests.filter(req => req.status === 'pending');
      case 'assigned':
        return requests.filter(req => req.status === 'assigned' || req.status === 'in-progress' || req.status === 'needs-clarification');
      case 'completed':
        return requests.filter(req => req.status === 'completed');
      default:
        return requests;
    }
  };

  const getConsultantName = (consultantId?: string) => {
    if (!consultantId) return 'Unassigned';
    const consultant = consultants.find(c => c.id === consultantId);
    return consultant ? consultant.name : 'Unknown';
  };

  const assignConsultant = (requestId: string, consultantId: string) => {
    // In a real app, this would make an API call
    setRequests(prevRequests => 
      prevRequests.map(req => 
        req.id === requestId 
          ? { ...req, assignedTo: consultantId, status: 'assigned', updatedAt: new Date().toISOString() } 
          : req
      )
    );
    
    toast({
      title: "Case assigned",
      description: `Case #${requestId} has been assigned to ${getConsultantName(consultantId)}`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage service requests, consultants, and platform activity</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button 
            className="bg-brand-blue hover:bg-brand-lightblue flex items-center"
            onClick={() => navigate('/admin/consultants/new')}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add New Consultant
          </Button>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="flex flex-row items-center p-6">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <FileText className="h-6 w-6 text-brand-blue" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900">{loading ? '-' : stats?.totalRequests}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-row items-center p-6">
            <div className="rounded-full bg-gray-100 p-3 mr-4">
              <Clock className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Requests</p>
              <p className="text-2xl font-bold text-gray-900">{loading ? '-' : stats?.pendingRequests}</p>
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
              <p className="text-2xl font-bold text-gray-900">{loading ? '-' : stats?.completedRequests}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex flex-row items-center p-6">
            <div className="rounded-full bg-indigo-100 p-3 mr-4">
              <Users className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Consultants</p>
              <p className="text-2xl font-bold text-gray-900">{loading ? '-' : stats?.activeConsultants}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Service Requests */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Service Requests</CardTitle>
          <CardDescription>Manage all client requests</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-brand-blue" />
            </div>
          ) : (
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <TabsList className="mb-4">
                <TabsTrigger value="all">All Requests</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="assigned">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab}>
                {getFilteredRequests().length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No service requests found in this category</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">ID</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Title</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Category</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Date Created</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Status</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Assigned To</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {getFilteredRequests().map((request) => (
                          <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-3 px-4 text-sm">#{request.id}</td>
                            <td className="py-3 px-4">
                              <div className="font-medium text-gray-900">{request.title}</div>
                              <div className="text-sm text-gray-500">
                                {request.description.length > 40 
                                  ? `${request.description.substring(0, 40)}...` 
                                  : request.description}
                              </div>
                            </td>
                            <td className="py-3 px-4 text-sm">{request.category}</td>
                            <td className="py-3 px-4 text-sm">{formatDate(request.createdAt)}</td>
                            <td className="py-3 px-4">{getStatusBadge(request.status)}</td>
                            <td className="py-3 px-4 text-sm">
                              {request.assignedTo ? getConsultantName(request.assignedTo) : (
                                <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">
                                  Unassigned
                                </Badge>
                              )}
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex space-x-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="text-brand-blue border-brand-blue hover:bg-brand-blue hover:text-white"
                                  onClick={() => navigate(`/admin/request/${request.id}`)}
                                >
                                  View
                                </Button>
                                {request.status === 'pending' && (
                                  <Button 
                                    size="sm"
                                    className="bg-brand-blue hover:bg-brand-lightblue"
                                    onClick={() => navigate(`/admin/request/${request.id}/assign`)}
                                  >
                                    Assign
                                  </Button>
                                )}
                              </div>
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

      {/* Consultants */}
      <Card>
        <CardHeader>
          <CardTitle>Consultant Management</CardTitle>
          <CardDescription>Manage and monitor consultant activity</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-brand-blue" />
            </div>
          ) : consultants.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No consultants registered yet</p>
              <Button 
                onClick={() => navigate('/admin/consultants/new')}
                className="bg-brand-blue hover:bg-brand-lightblue"
              >
                Add Consultant
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">ID</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Email</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Specialization</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Active Cases</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Completed Cases</th>
                    <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {consultants.map((consultant) => (
                    <tr key={consultant.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm">#{consultant.id}</td>
                      <td className="py-3 px-4 font-medium text-gray-900">{consultant.name}</td>
                      <td className="py-3 px-4 text-sm">{consultant.email}</td>
                      <td className="py-3 px-4 text-sm">
                        <div className="flex flex-wrap gap-1">
                          {consultant.specialization.map((spec, index) => (
                            <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center">{consultant.assignedCases.length}</td>
                      <td className="py-3 px-4 text-center">{consultant.caseCompleted}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="text-brand-blue border-brand-blue hover:bg-brand-blue hover:text-white"
                            onClick={() => navigate(`/admin/consultants/${consultant.id}`)}
                          >
                            View
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-gray-200 text-gray-700 hover:bg-gray-100"
                            onClick={() => navigate(`/admin/consultants/${consultant.id}/edit`)}
                          >
                            Edit
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <Button 
              onClick={() => navigate('/admin/consultants')}
              className="bg-brand-blue hover:bg-brand-lightblue"
            >
              View All Consultants
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
