import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  DollarSign, 
  FileText, 
  TrendingUp, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Calendar,
  CheckCircle,
  Clock,
  UserCheck,
  AlertCircle
} from 'lucide-react';
import { incomeSlabs, entityTypes, serviceTypes, getPackagePrice, EntityType, ServiceType } from '@/utils/packagePricing';
import { AdminLayout } from '@/components/admin/AdminLayout';

const data = [
  { name: 'Jan', Users: 4000, Revenue: 2400 },
  { name: 'Feb', Users: 3000, Revenue: 1398 },
  { name: 'Mar', Users: 2000, Revenue: 9800 },
  { name: 'Apr', Users: 2780, Revenue: 3908 },
  { name: 'May', Users: 1890, Revenue: 4800 },
  { name: 'Jun', Users: 2390, Revenue: 3800 },
  { name: 'Jul', Users: 3490, Revenue: 4300 },
  { name: 'Aug', Users: 4000, Revenue: 2400 },
  { name: 'Sep', Users: 3000, Revenue: 1398 },
  { name: 'Oct', Users: 2000, Revenue: 9800 },
  { name: 'Nov', Users: 2780, Revenue: 3908 },
  { name: 'Dec', Users: 1890, Revenue: 4800 },
];

const pieChartData = [
  { name: 'Income Tax', value: 400 },
  { name: 'GST', value: 300 },
  { name: 'Corporate Tax', value: 300 },
  { name: 'Transfer Pricing', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const initialConsultants = [
  {
    id: 1,
    name: 'CA. Rajesh Kumar',
    email: 'rajesh@example.com',
    phone: '+91 9876543210',
    expertise: 'Income Tax, GST',
    totalEarnings: 180000,
    pendingPayment: 45000,
    completedCases: 15,
    activeStatus: 'Active',
  },
  {
    id: 2,
    name: 'CA. Priya Sharma',
    email: 'priya@example.com',
    phone: '+91 9876543211',
    expertise: 'Corporate Tax, Transfer Pricing',
    totalEarnings: 240000,
    pendingPayment: 60000,
    completedCases: 20,
    activeStatus: 'Active',
  },
];

const initialRequests = [
  {
    id: 1,
    title: 'Income Tax Assessment Query',
    customer: 'John Doe',
    customerEmail: 'john@example.com',
    category: 'Income Tax',
    status: 'pending',
    createdAt: '2024-01-15',
    priority: 'High',
    description: 'Need help with income tax assessment notice',
    assignedTo: null,
  },
  {
    id: 2,
    title: 'GST Return Filing',
    customer: 'Jane Smith',
    customerEmail: 'jane@example.com',
    category: 'GST',
    status: 'assigned',
    createdAt: '2024-01-14',
    priority: 'Medium',
    description: 'Assistance required for GST return filing',
    assignedTo: 'CA. Rajesh Kumar',
  },
  {
    id: 3,
    title: 'Corporate Tax Planning',
    customer: 'ABC Corp',
    customerEmail: 'admin@abccorp.com',
    category: 'Corporate Tax',
    status: 'in-progress',
    createdAt: '2024-01-13',
    priority: 'High',
    description: 'Strategic tax planning for the upcoming financial year',
    assignedTo: 'CA. Priya Sharma',
  },
];

const AdminDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDateRange, setSelectedDateRange] = useState('week');
  const [newPackage, setNewPackage] = useState({
    name: '',
    description: '',
    slabId: 1,
    entityType: 'individual' as EntityType,
    serviceType: 'communications' as ServiceType,
    price: 0,
  });
  const [editingPackage, setEditingPackage] = useState<any>(null);
  const [newConsultant, setNewConsultant] = useState({
    name: '',
    email: '',
    phone: '',
    expertise: '',
    username: '',
    password: '',
  });

  const [packages, setPackages] = useState([
    {
      id: 1,
      name: 'Basic Income Tax Package',
      description: 'Standard income tax dispute resolution',
      slabId: 1,
      entityType: 'individual' as EntityType,
      serviceType: 'communications' as ServiceType,
      price: 3000,
      isActive: true,
    },
    {
      id: 2,
      name: 'GST Assessment Package',
      description: 'GST assessment and scrutiny services',
      slabId: 2,
      entityType: 'company' as EntityType,
      serviceType: 'assessment' as ServiceType,
      price: 15000,
      isActive: true,
    },
  ]);

  const [consultants, setConsultants] = useState(initialConsultants);
  const [requests, setRequests] = useState(initialRequests);
  const [isConsultantDialogOpen, setIsConsultantDialogOpen] = useState(false);
  const [isEditingConsultant, setIsEditingConsultant] = useState(false);
  const [selectedConsultant, setSelectedConsultant] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);

  const handleDateRangeChange = (range: string) => {
    setSelectedDateRange(range);
    console.log(`Fetching data for: ${range}`);
  };

  const handleCreateConsultant = () => {
    const newId = consultants.length > 0 ? Math.max(...consultants.map(c => c.id)) + 1 : 1;
    const consultantToAdd = {
      id: newId,
      name: newConsultant.name,
      email: newConsultant.email,
      phone: newConsultant.phone,
      expertise: newConsultant.expertise,
      totalEarnings: 0,
      pendingPayment: 0,
      completedCases: 0,
      activeStatus: 'Active',
    };

    setConsultants([...consultants, consultantToAdd]);
    setNewConsultant({
      name: '',
      email: '',
      phone: '',
      expertise: '',
      username: '',
      password: '',
    });
    setIsConsultantDialogOpen(false);

    toast({
      title: "Consultant Created",
      description: "New consultant has been created successfully.",
    });
  };

  const handleEditConsultant = (consultant) => {
    setSelectedConsultant(consultant);
    setIsEditingConsultant(true);
    setIsConsultantDialogOpen(true);
  };

  const handleUpdateConsultant = () => {
    if (!selectedConsultant) return;

    setConsultants(consultants.map(c =>
      c.id === selectedConsultant.id ? selectedConsultant : c
    ));
    setIsConsultantDialogOpen(false);
    setIsEditingConsultant(false);
    setSelectedConsultant(null);

    toast({
      title: "Consultant Updated",
      description: "Consultant details have been updated successfully.",
    });
  };

  const handleDeleteConsultant = (id: number) => {
    setConsultants(consultants.filter(c => c.id !== id));
    toast({
      title: "Consultant Deleted",
      description: "Consultant has been deleted successfully.",
    });
  };

  const handleConsultantInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    setNewConsultant({ ...newConsultant, [field]: e.target.value });
  };

  const handleSelectedConsultantInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    setSelectedConsultant({ ...selectedConsultant, [field]: e.target.value });
  };

  const handleCreatePackage = () => {
    const selectedSlab = incomeSlabs.find(s => s.slabId === newPackage.slabId);
    const calculatedPrice = getPackagePrice(newPackage.slabId, newPackage.entityType, newPackage.serviceType);
    
    const packageToAdd = {
      id: packages.length + 1,
      name: newPackage.name,
      description: newPackage.description,
      slabId: newPackage.slabId,
      entityType: newPackage.entityType,
      serviceType: newPackage.serviceType,
      price: calculatedPrice,
      isActive: true,
    };

    setPackages([...packages, packageToAdd]);
    setNewPackage({
      name: '',
      description: '',
      slabId: 1,
      entityType: 'individual',
      serviceType: 'communications',
      price: 0,
    });
    
    toast({
      title: "Package Created",
      description: "New service package has been created successfully.",
    });
  };

  const handleUpdatePackage = () => {
    if (!editingPackage) return;
    
    const calculatedPrice = getPackagePrice(editingPackage.slabId, editingPackage.entityType, editingPackage.serviceType);
    
    setPackages(packages.map(pkg => 
      pkg.id === editingPackage.id 
        ? { ...editingPackage, price: calculatedPrice }
        : pkg
    ));
    setEditingPackage(null);
    
    toast({
      title: "Package Updated",
      description: "Service package has been updated successfully.",
    });
  };

  const calculatePackagePrice = (slabId: number, entityType: EntityType, serviceType: ServiceType) => {
    return getPackagePrice(slabId, entityType, serviceType);
  };

  const handleAssignRequest = (request) => {
    setSelectedRequest(request);
    setIsAssignDialogOpen(true);
  };

  const handleConfirmAssignment = (consultantName: string) => {
    if (!selectedRequest) return;

    setRequests(requests.map(req =>
      req.id === selectedRequest.id
        ? { ...req, assignedTo: consultantName, status: 'assigned' }
        : req
    ));

    setIsAssignDialogOpen(false);
    setSelectedRequest(null);

    toast({
      title: "Request Assigned",
      description: `Request has been assigned to ${consultantName} successfully.`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'assigned': return 'bg-blue-100 text-blue-800';
      case 'in-progress': return 'bg-purple-100 text-purple-800';
      case 'completed': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-orange-100 text-orange-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Calculate request statistics
  const totalRequests = requests.length;
  const pendingRequests = requests.filter(r => r.status === 'pending').length;
  const assignedRequests = requests.filter(r => r.status === 'assigned').length;
  const inProgressRequests = requests.filter(r => r.status === 'in-progress').length;
  const completedRequests = requests.filter(r => r.status === 'completed').length;
  const highPriorityRequests = requests.filter(r => r.priority === 'High').length;

  // Get current month's requests (mock data - in real app, filter by actual date)
  const currentMonthRequests = requests.length; // Assuming all are from current month for demo

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Super Admin Dashboard</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="consultants">Consultants</TabsTrigger>
            <TabsTrigger value="packages">Packages</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Main Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="flex flex-row items-center justify-between p-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">4,524</p>
                  </div>
                  <Users className="h-6 w-6 text-gray-500" />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex flex-row items-center justify-between p-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">₹23,456</p>
                  </div>
                  <DollarSign className="h-6 w-6 text-green-500" />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex flex-row items-center justify-between p-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Cases</p>
                    <p className="text-2xl font-bold text-gray-900">{totalRequests}</p>
                  </div>
                  <FileText className="h-6 w-6 text-blue-500" />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex flex-row items-center justify-between p-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Revenue Growth</p>
                    <p className="text-2xl font-bold text-gray-900">+12%</p>
                  </div>
                  <TrendingUp className="h-6 w-6 text-green-500" />
                </CardContent>
              </Card>
            </div>

            {/* Request Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="flex flex-row items-center justify-between p-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Cases This Month</p>
                    <p className="text-2xl font-bold text-blue-600">{currentMonthRequests}</p>
                  </div>
                  <Calendar className="h-6 w-6 text-blue-500" />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex flex-row items-center justify-between p-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Pending Cases</p>
                    <p className="text-2xl font-bold text-yellow-600">{pendingRequests}</p>
                  </div>
                  <Clock className="h-6 w-6 text-yellow-500" />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex flex-row items-center justify-between p-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500">In Progress</p>
                    <p className="text-2xl font-bold text-purple-600">{inProgressRequests}</p>
                  </div>
                  <UserCheck className="h-6 w-6 text-purple-500" />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex flex-row items-center justify-between p-6">
                  <div>
                    <p className="text-sm font-medium text-gray-500">High Priority</p>
                    <p className="text-2xl font-bold text-red-600">{highPriorityRequests}</p>
                  </div>
                  <AlertCircle className="h-6 w-6 text-red-500" />
                </CardContent>
              </Card>
            </div>

            {/* Request Status Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Request Status Breakdown</CardTitle>
                  <CardDescription>Current status of all service requests</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">Pending</span>
                      </div>
                      <span className="font-semibold">{pendingRequests}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Assigned</span>
                      </div>
                      <span className="font-semibold">{assignedRequests}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-sm">In Progress</span>
                      </div>
                      <span className="font-semibold">{inProgressRequests}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Completed</span>
                      </div>
                      <span className="font-semibold">{completedRequests}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Category</CardTitle>
                  <CardDescription>A breakdown of revenue by service category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {pieChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Revenue Statistics</h2>
              <div className="space-x-2">
                <Button 
                  variant={selectedDateRange === 'week' ? "default" : "outline"} 
                  onClick={() => handleDateRangeChange('week')}
                >
                  This Week
                </Button>
                <Button 
                  variant={selectedDateRange === 'month' ? "default" : "outline"} 
                  onClick={() => handleDateRangeChange('month')}
                >
                  This Month
                </Button>
                <Button 
                  variant={selectedDateRange === 'year' ? "default" : "outline"} 
                  onClick={() => handleDateRangeChange('year')}
                >
                  This Year
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>A visual representation of revenue over time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="Revenue" stroke="#8884d8" name="Revenue" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
              <CardFooter className="text-sm text-gray-500">
                Data from the last 12 months
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Request Management</h2>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>All Service Requests</CardTitle>
                <CardDescription>View and manage all customer service requests</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Request ID</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Created Date</TableHead>
                      <TableHead>Assigned To</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">#{request.id}</TableCell>
                        <TableCell>{request.title}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{request.customer}</div>
                            <div className="text-sm text-gray-500">{request.customerEmail}</div>
                          </div>
                        </TableCell>
                        <TableCell>{request.category}</TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(request.status)} border-0`}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={`${getPriorityColor(request.priority)} border-0`}>
                            {request.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>{request.createdAt}</TableCell>
                        <TableCell>
                          {request.assignedTo ? (
                            <span className="text-sm font-medium">{request.assignedTo}</span>
                          ) : (
                            <span className="text-sm text-gray-500">Unassigned</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleAssignRequest(request)}
                              disabled={request.status === 'completed'}
                            >
                              <UserCheck className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Assignment Dialog */}
            <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Assign Request to Consultant</DialogTitle>
                  <DialogDescription>
                    Select a consultant to assign this request to.
                  </DialogDescription>
                </DialogHeader>
                {selectedRequest && (
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium">{selectedRequest.title}</h4>
                      <p className="text-sm text-gray-600">{selectedRequest.description}</p>
                      <p className="text-sm text-gray-500 mt-2">Customer: {selectedRequest.customer}</p>
                    </div>
                    <div>
                      <Label htmlFor="consultantSelect">Select Consultant</Label>
                      <Select onValueChange={(value) => handleConfirmAssignment(value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a consultant" />
                        </SelectTrigger>
                        <SelectContent>
                          {consultants.filter(c => c.activeStatus === 'Active').map((consultant) => (
                            <SelectItem key={consultant.id} value={consultant.name}>
                              <div className="flex flex-col">
                                <span>{consultant.name}</span>
                                <span className="text-xs text-gray-500">{consultant.expertise}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </TabsContent>

          <TabsContent value="consultants" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Consultant Management</h2>
              <Dialog open={isConsultantDialogOpen} onOpenChange={setIsConsultantDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-brand-blue hover:bg-brand-lightblue">
                    <Plus className="mr-2 h-4 w-4" />
                    {isEditingConsultant ? 'Edit Consultant' : 'Add Consultant'}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{isEditingConsultant ? 'Edit Consultant' : 'Add New Consultant'}</DialogTitle>
                    <DialogDescription>
                      {isEditingConsultant ? 'Edit consultant details' : 'Add a new consultant to the system'}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="consultantName">Name</Label>
                        <Input
                          id="consultantName"
                          value={isEditingConsultant ? selectedConsultant?.name || '' : newConsultant.name}
                          onChange={(e) => isEditingConsultant ? handleSelectedConsultantInputChange(e, 'name') : handleConsultantInputChange(e, 'name')}
                          placeholder="Enter consultant name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="consultantEmail">Email</Label>
                        <Input
                          id="consultantEmail"
                          type="email"
                          value={isEditingConsultant ? selectedConsultant?.email || '' : newConsultant.email}
                          onChange={(e) => isEditingConsultant ? handleSelectedConsultantInputChange(e, 'email') : handleConsultantInputChange(e, 'email')}
                          placeholder="Enter consultant email"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="consultantPhone">Phone</Label>
                        <Input
                          id="consultantPhone"
                          type="tel"
                          value={isEditingConsultant ? selectedConsultant?.phone || '' : newConsultant.phone}
                          onChange={(e) => isEditingConsultant ? handleSelectedConsultantInputChange(e, 'phone') : handleConsultantInputChange(e, 'phone')}
                          placeholder="Enter consultant phone"
                        />
                      </div>
                      <div>
                        <Label htmlFor="consultantExpertise">Expertise</Label>
                        <Input
                          id="consultantExpertise"
                          value={isEditingConsultant ? selectedConsultant?.expertise || '' : newConsultant.expertise}
                          onChange={(e) => isEditingConsultant ? handleSelectedConsultantInputChange(e, 'expertise') : handleConsultantInputChange(e, 'expertise')}
                          placeholder="Enter consultant expertise"
                        />
                      </div>
                    </div>
                    {!isEditingConsultant && (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="consultantUsername">Username</Label>
                            <Input
                              id="consultantUsername"
                              value={newConsultant.username}
                              onChange={(e) => handleConsultantInputChange(e, 'username')}
                              placeholder="Enter consultant username"
                            />
                          </div>
                          <div>
                            <Label htmlFor="consultantPassword">Password</Label>
                            <Input
                              id="consultantPassword"
                              type="password"
                              value={newConsultant.password}
                              onChange={(e) => handleConsultantInputChange(e, 'password')}
                              placeholder="Enter consultant password"
                            />
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <DialogFooter>
                    <Button onClick={isEditingConsultant ? handleUpdateConsultant : handleCreateConsultant} className="bg-brand-blue hover:bg-brand-lightblue">
                      {isEditingConsultant ? 'Update Consultant' : 'Create Consultant'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Current Consultants</CardTitle>
                <CardDescription>Manage your consultants and their details</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Expertise</TableHead>
                      <TableHead>Total Earnings</TableHead>
                      <TableHead>Pending Payment</TableHead>
                      <TableHead>Completed Cases</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {consultants.map((consultant) => (
                      <TableRow key={consultant.id}>
                        <TableCell className="font-medium">{consultant.name}</TableCell>
                        <TableCell>{consultant.email}</TableCell>
                        <TableCell>{consultant.phone}</TableCell>
                        <TableCell>{consultant.expertise}</TableCell>
                        <TableCell>₹{consultant.totalEarnings.toLocaleString()}</TableCell>
                        <TableCell>₹{consultant.pendingPayment.toLocaleString()}</TableCell>
                        <TableCell>{consultant.completedCases}</TableCell>
                        <TableCell>
                          <Badge variant={consultant.activeStatus === 'Active' ? "default" : "secondary"}>
                            {consultant.activeStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditConsultant(consultant)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteConsultant(consultant.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="packages" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Service Packages</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-brand-blue hover:bg-brand-lightblue">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Package
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Create New Service Package</DialogTitle>
                    <DialogDescription>
                      Create a new service package based on income slab and entity type.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="packageName">Package Name</Label>
                        <Input
                          id="packageName"
                          value={newPackage.name}
                          onChange={(e) => setNewPackage({...newPackage, name: e.target.value})}
                          placeholder="Enter package name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="slabSelect">Income Slab</Label>
                        <Select 
                          value={newPackage.slabId.toString()} 
                          onValueChange={(value) => setNewPackage({...newPackage, slabId: parseInt(value)})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select income slab" />
                          </SelectTrigger>
                          <SelectContent>
                            {incomeSlabs.map((slab) => (
                              <SelectItem key={slab.slabId} value={slab.slabId.toString()}>
                                {slab.slabName} - {slab.description}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="entityType">Entity Type</Label>
                        <Select 
                          value={newPackage.entityType} 
                          onValueChange={(value: EntityType) => setNewPackage({...newPackage, entityType: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select entity type" />
                          </SelectTrigger>
                          <SelectContent>
                            {entityTypes.map((entity) => (
                              <SelectItem key={entity.id} value={entity.id}>
                                {entity.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="serviceType">Service Type</Label>
                        <Select 
                          value={newPackage.serviceType} 
                          onValueChange={(value: ServiceType) => setNewPackage({...newPackage, serviceType: value})}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select service type" />
                          </SelectTrigger>
                          <SelectContent>
                            {serviceTypes.map((service) => (
                              <SelectItem key={service.id} value={service.id}>
                                {service.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="packageDescription">Description</Label>
                      <Textarea
                        id="packageDescription"
                        value={newPackage.description}
                        onChange={(e) => setNewPackage({...newPackage, description: e.target.value})}
                        placeholder="Enter package description"
                      />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <Label className="text-sm font-medium">Calculated Price (Based on Rate Card)</Label>
                      <div className="text-2xl font-bold text-brand-blue">
                        ₹{calculatePackagePrice(newPackage.slabId, newPackage.entityType, newPackage.serviceType).toLocaleString()}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        This price is automatically calculated based on the selected income slab, entity type, and service type.
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={handleCreatePackage} className="bg-brand-blue hover:bg-brand-lightblue">
                      Create Package
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Current Service Packages</CardTitle>
                <CardDescription>Manage your service packages and pricing</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Package Name</TableHead>
                      <TableHead>Income Slab</TableHead>
                      <TableHead>Entity Type</TableHead>
                      <TableHead>Service Type</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {packages.map((pkg) => {
                      const slab = incomeSlabs.find(s => s.slabId === pkg.slabId);
                      const entity = entityTypes.find(e => e.id === pkg.entityType);
                      const service = serviceTypes.find(s => s.id === pkg.serviceType);
                      
                      return (
                        <TableRow key={pkg.id}>
                          <TableCell className="font-medium">{pkg.name}</TableCell>
                          <TableCell>
                            <div className="text-sm">
                              <div className="font-medium">{slab?.slabName}</div>
                              <div className="text-gray-500 text-xs">{slab?.description}</div>
                            </div>
                          </TableCell>
                          <TableCell>{entity?.name}</TableCell>
                          <TableCell>{service?.name}</TableCell>
                          <TableCell className="font-semibold text-brand-blue">₹{pkg.price.toLocaleString()}</TableCell>
                          <TableCell>
                            <Badge variant={pkg.isActive ? "default" : "secondary"}>
                              {pkg.isActive ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setEditingPackage(pkg)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Edit Service Package</DialogTitle>
                                    <DialogDescription>
                                      Update the service package details.
                                    </DialogDescription>
                                  </DialogHeader>
                                  {editingPackage && (
                                    <div className="grid gap-4 py-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <Label htmlFor="editPackageName">Package Name</Label>
                                          <Input
                                            id="editPackageName"
                                            value={editingPackage.name}
                                            onChange={(e) => setEditingPackage({...editingPackage, name: e.target.value})}
                                          />
                                        </div>
                                        <div>
                                          <Label htmlFor="editSlabSelect">Income Slab</Label>
                                          <Select 
                                            value={editingPackage.slabId.toString()} 
                                            onValueChange={(value) => setEditingPackage({...editingPackage, slabId: parseInt(value)})}
                                          >
                                            <SelectTrigger>
                                              <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                              {incomeSlabs.map((slab) => (
                                                <SelectItem key={slab.slabId} value={slab.slabId.toString()}>
                                                  {slab.slabName} - {slab.description}
                                                </SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                                        </div>
                                      </div>
                                      
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <Label htmlFor="editEntityType">Entity Type</Label>
                                          <Select 
                                            value={editingPackage.entityType} 
                                            onValueChange={(value: EntityType) => setEditingPackage({...editingPackage, entityType: value})}
                                          >
                                            <SelectTrigger>
                                              <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                              {entityTypes.map((entity) => (
                                                <SelectItem key={entity.id} value={entity.id}>
                                                  {entity.name}
                                                </SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                                        </div>
                                        <div>
                                          <Label htmlFor="editServiceType">Service Type</Label>
                                          <Select 
                                            value={editingPackage.serviceType} 
                                            onValueChange={(value: ServiceType) => setEditingPackage({...editingPackage, serviceType: value})}
                                          >
                                            <SelectTrigger>
                                              <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                              {serviceTypes.map((service) => (
                                                <SelectItem key={service.id} value={service.id}>
                                                  {service.name}
                                                </SelectItem>
                                              ))}
                                            </SelectContent>
                                          </Select>
                                        </div>
                                      </div>

                                      <div>
                                        <Label htmlFor="editPackageDescription">Description</Label>
                                        <Textarea
                                          id="editPackageDescription"
                                          value={editingPackage.description}
                                          onChange={(e) => setEditingPackage({...editingPackage, description: e.target.value})}
                                        />
                                      </div>

                                      <div className="bg-gray-50 p-4 rounded-lg">
                                        <Label className="text-sm font-medium">Updated Price (Based on Rate Card)</Label>
                                        <div className="text-2xl font-bold text-brand-blue">
                                          ₹{calculatePackagePrice(editingPackage.slabId, editingPackage.entityType, editingPackage.serviceType).toLocaleString()}
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                  <DialogFooter>
                                    <Button onClick={handleUpdatePackage} className="bg-brand-blue hover:bg-brand-lightblue">
                                      Update Package
                                    </Button>
                                  </DialogFooter>
                                </DialogContent>
                              </Dialog>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  setPackages(packages.filter(p => p.id !== pkg.id));
                                  toast({
                                    title: "Package Deleted",
                                    description: "Service package has been deleted successfully.",
                                  });
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
