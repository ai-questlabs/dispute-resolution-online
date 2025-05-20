import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { RequestStatus } from '../../types';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useAuth } from '../../context/AuthContext';

// Mock data for demonstration
const mockRequests = [
  { 
    id: '1', 
    title: 'Income Tax Dispute Resolution', 
    customer: 'John Smith', 
    consultant: 'Jane Consultant', 
    status: 'completed' as RequestStatus, 
    date: '2023-05-15' 
  },
  { 
    id: '2', 
    title: 'GST Audit Support', 
    customer: 'Alice Johnson', 
    consultant: 'Unassigned', 
    status: 'pending' as RequestStatus, 
    date: '2023-06-02' 
  },
  { 
    id: '3', 
    title: 'Corporate Tax Planning', 
    customer: 'Robert Brown', 
    consultant: 'Mike Expert', 
    status: 'in-progress' as RequestStatus, 
    date: '2023-06-10' 
  },
  { 
    id: '4', 
    title: 'International Tax Compliance', 
    customer: 'Sarah Wilson', 
    consultant: 'Jane Consultant', 
    status: 'needs-clarification' as RequestStatus, 
    date: '2023-06-15' 
  },
  { 
    id: '5', 
    title: 'Tax Appeal Representation', 
    customer: 'David Miller', 
    consultant: 'Mike Expert', 
    status: 'assigned' as RequestStatus, 
    date: '2023-06-20' 
  },
];

const mockConsultants = [
  { id: '1', name: 'Jane Consultant', email: 'jane@example.com', specialization: 'Income Tax, GST', casesCompleted: 15, activeRequests: 2 },
  { id: '2', name: 'Mike Expert', email: 'mike@example.com', specialization: 'Corporate Tax, International Tax', casesCompleted: 23, activeRequests: 3 },
  { id: '3', name: 'Sarah Specialist', email: 'sarah@example.com', specialization: 'Tax Appeals, GST', casesCompleted: 8, activeRequests: 1 },
  { id: '4', name: 'Tom Advisor', email: 'tom@example.com', specialization: 'Income Tax, Corporate Tax', casesCompleted: 19, activeRequests: 0 },
];

const mockCustomers = [
  { id: '1', name: 'John Smith', email: 'john@example.com', requests: 3, joinDate: '2023-01-15' },
  { id: '2', name: 'Alice Johnson', email: 'alice@example.com', requests: 1, joinDate: '2023-03-22' },
  { id: '3', name: 'Robert Brown', email: 'robert@example.com', requests: 2, joinDate: '2023-04-10' },
  { id: '4', name: 'Sarah Wilson', email: 'sarah.w@example.com', requests: 1, joinDate: '2023-05-05' },
  { id: '5', name: 'David Miller', email: 'david@example.com', requests: 1, joinDate: '2023-06-01' },
];

// Chart data
const statusData = [
  { name: 'Pending', value: 5 },
  { name: 'Assigned', value: 3 },
  { name: 'In Progress', value: 8 },
  { name: 'Needs Clarification', value: 2 },
  { name: 'Completed', value: 12 },
];

const monthlyData = [
  { name: 'Jan', requests: 4, completed: 3 },
  { name: 'Feb', requests: 6, completed: 4 },
  { name: 'Mar', requests: 8, completed: 5 },
  { name: 'Apr', requests: 10, completed: 7 },
  { name: 'May', requests: 12, completed: 9 },
  { name: 'Jun', requests: 9, completed: 6 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const AdminDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');

  const handleAssignConsultant = (requestId: string) => {
    toast({
      title: "Consultant assigned",
      description: `Request #${requestId} has been assigned to a consultant.`,
    });
  };

  const handleViewDetails = (id: string, type: string) => {
    toast({
      title: `Viewing ${type} details`,
      description: `Details for ${type} ID: ${id}`,
    });
  };

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case 'assigned':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">Assigned</Badge>;
      case 'in-progress':
        return <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">In Progress</Badge>;
      case 'needs-clarification':
        return <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-200">Needs Clarification</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button className="bg-brand-blue hover:bg-brand-lightblue">Generate Reports</Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="requests">Service Requests</TabsTrigger>
          <TabsTrigger value="consultants">Consultants</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Total Requests</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">30</div>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <span>↑ 12%</span>
                  <span className="text-gray-400 ml-1">from last month</span>
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Active Consultants</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">8</div>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <span>↑ 2</span>
                  <span className="text-gray-400 ml-1">from last month</span>
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Registered Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">45</div>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <span>↑ 5</span>
                  <span className="text-gray-400 ml-1">from last month</span>
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">85%</div>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <span>↑ 3%</span>
                  <span className="text-gray-400 ml-1">from last month</span>
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Requests</CardTitle>
                <CardDescription>Number of new and completed requests per month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={monthlyData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="requests" name="New Requests" fill="#3B82F6" />
                      <Bar dataKey="completed" name="Completed" fill="#10B981" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Request Status Distribution</CardTitle>
                <CardDescription>Current status of all service requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>Service Requests</CardTitle>
              <CardDescription>Manage all tax litigation service requests</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Consultant</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>{request.title}</TableCell>
                      <TableCell>{request.customer}</TableCell>
                      <TableCell>{request.consultant}</TableCell>
                      <TableCell>{getStatusBadge(request.status)}</TableCell>
                      <TableCell>{request.date}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewDetails(request.id, 'request')}
                          >
                            View
                          </Button>
                          {request.consultant === 'Unassigned' && (
                            <Button 
                              size="sm"
                              onClick={() => handleAssignConsultant(request.id)}
                            >
                              Assign
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Previous</Button>
              <Button variant="outline">Next</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="consultants">
          <Card>
            <CardHeader>
              <CardTitle>Consultants</CardTitle>
              <CardDescription>Manage tax litigation consultants</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Specialization</TableHead>
                    <TableHead>Cases Completed</TableHead>
                    <TableHead>Active Requests</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockConsultants.map((consultant) => (
                    <TableRow key={consultant.id}>
                      <TableCell className="font-medium">{consultant.name}</TableCell>
                      <TableCell>{consultant.email}</TableCell>
                      <TableCell>{consultant.specialization}</TableCell>
                      <TableCell>{consultant.casesCompleted}</TableCell>
                      <TableCell>{consultant.activeRequests}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewDetails(consultant.id, 'consultant')}
                        >
                          View Profile
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Previous</Button>
              <Button variant="outline">Next</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <CardTitle>Customers</CardTitle>
              <CardDescription>Manage registered customers</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Requests</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.requests}</TableCell>
                      <TableCell>{customer.joinDate}</TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewDetails(customer.id, 'customer')}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Previous</Button>
              <Button variant="outline">Next</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
