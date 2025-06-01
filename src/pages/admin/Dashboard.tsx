import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
  Cell,
  LineChart,
  Line
} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { CalendarIcon, Plus, Edit, Trash2, DollarSign } from 'lucide-react';

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
  { 
    id: '1', 
    name: 'Jane Consultant', 
    email: 'jane@example.com', 
    specialization: 'Income Tax, GST', 
    casesCompleted: 15, 
    activeRequests: 2,
    totalEarnings: 450000,
    pendingPayment: 67500
  },
  { 
    id: '2', 
    name: 'Mike Expert', 
    email: 'mike@example.com', 
    specialization: 'Corporate Tax, International Tax', 
    casesCompleted: 23, 
    activeRequests: 3,
    totalEarnings: 690000,
    pendingPayment: 103500
  },
  { 
    id: '3', 
    name: 'Sarah Specialist', 
    email: 'sarah@example.com', 
    specialization: 'Tax Appeals, GST', 
    casesCompleted: 8, 
    activeRequests: 1,
    totalEarnings: 240000,
    pendingPayment: 36000
  },
  { 
    id: '4', 
    name: 'Tom Advisor', 
    email: 'tom@example.com', 
    specialization: 'Income Tax, Corporate Tax', 
    casesCompleted: 19, 
    activeRequests: 0,
    totalEarnings: 570000,
    pendingPayment: 0
  },
];

const mockCustomers = [
  { id: '1', name: 'John Smith', email: 'john@example.com', requests: 3, joinDate: '2023-01-15' },
  { id: '2', name: 'Alice Johnson', email: 'alice@example.com', requests: 1, joinDate: '2023-03-22' },
  { id: '3', name: 'Robert Brown', email: 'robert@example.com', requests: 2, joinDate: '2023-04-10' },
  { id: '4', name: 'Sarah Wilson', email: 'sarah.w@example.com', requests: 1, joinDate: '2023-05-05' },
  { id: '5', name: 'David Miller', email: 'david@example.com', requests: 1, joinDate: '2023-06-01' },
];

// New mock data for service packages
const mockServicePackages = [
  { id: '1', name: 'Responses to Communications/Showcause Notices', basePrice: 3000 },
  { id: '2', name: 'Rectification Applications', basePrice: 3000 },
  { id: '3', name: 'Responses for handling Grievances', basePrice: 2500 },
  { id: '4', name: 'Responses to Assessment/Scrutiny/Demand Proceedings', basePrice: 5000 },
  { id: '5', name: 'Responses to Penalty Proceedings', basePrice: 7500 },
  { id: '6', name: 'Transfer Pricing Disputes', basePrice: 10000 },
];

// Revenue data for charts
const revenueData = [
  { name: 'Week 1', revenue: 125000, cases: 5 },
  { name: 'Week 2', revenue: 180000, cases: 8 },
  { name: 'Week 3', revenue: 95000, cases: 4 },
  { name: 'Week 4', revenue: 220000, cases: 9 },
];

const monthlyRevenueData = [
  { name: 'Jan', revenue: 450000, cases: 18 },
  { name: 'Feb', revenue: 520000, cases: 22 },
  { name: 'Mar', revenue: 380000, cases: 16 },
  { name: 'Apr', revenue: 680000, cases: 28 },
  { name: 'May', revenue: 590000, cases: 24 },
  { name: 'Jun', revenue: 720000, cases: 30 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const AdminDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');
  const [isAddConsultantOpen, setIsAddConsultantOpen] = useState(false);
  const [isEditPackageOpen, setIsEditPackageOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [newConsultant, setNewConsultant] = useState({
    name: '',
    email: '',
    password: '',
    specialization: ''
  });

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

  const handlePaymentUpdate = (consultantId: string, amount: number) => {
    toast({
      title: "Payment Updated",
      description: `Payment of ₹${amount.toLocaleString('en-IN')} processed for consultant.`,
    });
  };

  const handleAddConsultant = () => {
    console.log('Adding consultant:', newConsultant);
    toast({
      title: "Consultant Added",
      description: `${newConsultant.name} has been added successfully.`,
    });
    setIsAddConsultantOpen(false);
    setNewConsultant({ name: '', email: '', password: '', specialization: '' });
  };

  const handleUpdatePackage = () => {
    toast({
      title: "Package Updated",
      description: `${selectedPackage?.name} has been updated successfully.`,
    });
    setIsEditPackageOpen(false);
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

  const getCurrentRevenueData = () => {
    return selectedTimeRange === 'week' ? revenueData : monthlyRevenueData;
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
        <TabsList className="grid grid-cols-6 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="requests">Service Requests</TabsTrigger>
          <TabsTrigger value="consultants">Consultants</TabsTrigger>
          <TabsTrigger value="packages">Packages</TabsTrigger>
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
                <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">₹12.5L</div>
                <p className="text-xs text-green-500 flex items-center mt-1">
                  <span>↑ 18%</span>
                  <span className="text-gray-400 ml-1">from last month</span>
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">Pending Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">₹2.07L</div>
                <p className="text-xs text-red-500 flex items-center mt-1">
                  <span>↑ 5%</span>
                  <span className="text-gray-400 ml-1">from last week</span>
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

        <TabsContent value="revenue">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Revenue Analytics</CardTitle>
                  <CardDescription>Case-wise revenue for different time periods</CardDescription>
                </div>
                <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="week">Weekly</SelectItem>
                    <SelectItem value="month">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={getCurrentRevenueData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value, name) => [
                      name === 'revenue' ? `₹${(value as number).toLocaleString('en-IN')}` : value,
                      name === 'revenue' ? 'Revenue' : 'Cases'
                    ]} />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={3} />
                    <Line type="monotone" dataKey="cases" stroke="#10B981" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
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
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Consultants</CardTitle>
                  <CardDescription>Manage tax litigation consultants and their earnings</CardDescription>
                </div>
                <Dialog open={isAddConsultantOpen} onOpenChange={setIsAddConsultantOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-brand-blue hover:bg-brand-lightblue">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Consultant
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Consultant</DialogTitle>
                      <DialogDescription>
                        Create a new consultant account with login credentials
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={newConsultant.name}
                          onChange={(e) => setNewConsultant({...newConsultant, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={newConsultant.email}
                          onChange={(e) => setNewConsultant({...newConsultant, email: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          value={newConsultant.password}
                          onChange={(e) => setNewConsultant({...newConsultant, password: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="specialization">Specialization</Label>
                        <Textarea
                          id="specialization"
                          value={newConsultant.specialization}
                          onChange={(e) => setNewConsultant({...newConsultant, specialization: e.target.value})}
                          placeholder="e.g., Income Tax, GST, Corporate Tax"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddConsultantOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddConsultant}>Add Consultant</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Specialization</TableHead>
                    <TableHead>Cases Completed</TableHead>
                    <TableHead>Total Earnings</TableHead>
                    <TableHead>Pending Payment</TableHead>
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
                      <TableCell>₹{consultant.totalEarnings.toLocaleString('en-IN')}</TableCell>
                      <TableCell>
                        <span className={consultant.pendingPayment > 0 ? "text-red-600 font-medium" : "text-green-600"}>
                          ₹{consultant.pendingPayment.toLocaleString('en-IN')}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewDetails(consultant.id, 'consultant')}
                          >
                            View
                          </Button>
                          {consultant.pendingPayment > 0 && (
                            <Button 
                              size="sm"
                              variant="default"
                              onClick={() => handlePaymentUpdate(consultant.id, consultant.pendingPayment)}
                            >
                              <DollarSign className="mr-1 h-3 w-3" />
                              Pay
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

        <TabsContent value="packages">
          <Card>
            <CardHeader>
              <CardTitle>Service Packages</CardTitle>
              <CardDescription>Manage different service packages and their pricing</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Package Name</TableHead>
                    <TableHead>Base Price</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockServicePackages.map((pkg) => (
                    <TableRow key={pkg.id}>
                      <TableCell className="font-medium">{pkg.name}</TableCell>
                      <TableCell>₹{pkg.basePrice.toLocaleString('en-IN')}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Dialog open={isEditPackageOpen && selectedPackage?.id === pkg.id} onOpenChange={setIsEditPackageOpen}>
                            <DialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedPackage(pkg)}
                              >
                                <Edit className="mr-1 h-3 w-3" />
                                Edit
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Service Package</DialogTitle>
                                <DialogDescription>
                                  Update the package details and pricing
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <Label htmlFor="packageName">Package Name</Label>
                                  <Input
                                    id="packageName"
                                    value={selectedPackage?.name || ''}
                                    onChange={(e) => setSelectedPackage({...selectedPackage, name: e.target.value})}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="basePrice">Base Price (₹)</Label>
                                  <Input
                                    id="basePrice"
                                    type="number"
                                    value={selectedPackage?.basePrice || ''}
                                    onChange={(e) => setSelectedPackage({...selectedPackage, basePrice: parseInt(e.target.value)})}
                                  />
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setIsEditPackageOpen(false)}>
                                  Cancel
                                </Button>
                                <Button onClick={handleUpdatePackage}>Update Package</Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
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
