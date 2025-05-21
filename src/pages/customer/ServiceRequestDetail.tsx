
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, FileText, Calendar, MessageSquare, Upload, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ServiceRequest, Document, Message, RequestStatus } from '@/types';

// Mock data for a specific service request (in a real app, this would come from an API)
const MOCK_SERVICE_REQUEST: ServiceRequest = {
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
  messages: [
    {
      id: '1',
      sender: '2',
      content: 'Hello, I\'ve reviewed your case. Could you please provide your ITR acknowledgment for the last financial year?',
      timestamp: '2023-05-11T09:15:00Z',
      read: true,
    },
    {
      id: '2',
      sender: '1',
      content: 'I\'ve uploaded the ITR acknowledgment document. Please let me know if you need anything else.',
      timestamp: '2023-05-11T11:30:00Z',
      read: true,
    },
    {
      id: '3',
      sender: '2',
      content: 'Thank you for the document. I\'m working on your case and will update you soon.',
      timestamp: '2023-05-12T14:20:00Z',
      read: true,
    },
  ],
  price: 7500,
};

const ServiceRequestDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [request, setRequest] = useState<ServiceRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // In a real app, we would fetch the request details from an API
    // For now, just use mock data
    setTimeout(() => {
      setRequest(MOCK_SERVICE_REQUEST);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    // In a real app, this would send the message to an API
    const newMsg: Message = {
      id: String(Date.now()),
      sender: '1', // Current user ID
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false,
    };

    setRequest(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        messages: [...(prev.messages || []), newMsg],
        updatedAt: new Date().toISOString(),
      };
    });

    setNewMessage('');
    toast({
      title: "Message sent",
      description: "Your message has been sent to the consultant.",
    });
  };

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
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDocumentDownload = (doc: Document) => {
    // In a real app, this would download the document
    toast({
      title: "Download initiated",
      description: `Downloading ${doc.name}...`,
    });
  };

  const handleDocumentUpload = () => {
    // In a real app, this would open a file picker
    toast({
      title: "Upload feature",
      description: "Document upload functionality would be implemented here.",
    });
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue"></div>
        </div>
      </div>
    );
  }

  if (!request) {
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

        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">Service request not found</p>
              <Button 
                onClick={() => navigate('/customer/dashboard')}
                className="bg-brand-blue hover:bg-brand-lightblue"
              >
                Return to Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Service Request #{id}</h1>
          <div className="flex flex-col md:flex-row md:items-center text-gray-500 gap-2 md:gap-4">
            <span className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Created: {formatDate(request.createdAt)}
            </span>
            <span className="hidden md:inline">•</span>
            <span className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              Last updated: {formatDate(request.updatedAt)}
            </span>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          {getStatusBadge(request.status)}
        </div>
      </div>
      
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Request Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Title</h3>
                  <p>{request.title}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700">{request.description}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Category</h3>
                  <p>{request.category}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Service Fee</h3>
                  <p className="text-lg font-semibold text-brand-blue">₹{request.price?.toLocaleString()}</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Timeline</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                        <span className="h-2 w-2 rounded-full bg-green-500"></span>
                      </div>
                      <div>
                        <p className="font-medium">Request Submitted</p>
                        <p className="text-sm text-gray-500">{formatDate(request.createdAt)}</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-0.5">
                        <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                      </div>
                      <div>
                        <p className="font-medium">Assigned to Consultant</p>
                        <p className="text-sm text-gray-500">{formatDate(request.updatedAt)}</p>
                      </div>
                    </li>
                    
                    <li className="flex items-start">
                      <div className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center mr-3 mt-0.5">
                        <span className="h-2 w-2 rounded-full bg-gray-300"></span>
                      </div>
                      <div>
                        <p className="font-medium">Completion</p>
                        <p className="text-sm text-gray-500">Pending</p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Documents</CardTitle>
              <Button 
                className="bg-brand-blue hover:bg-brand-lightblue flex items-center" 
                onClick={handleDocumentUpload}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
            </CardHeader>
            <CardContent>
              {request.documents.length === 0 ? (
                <div className="text-center py-6">
                  <p className="text-gray-500">No documents have been uploaded yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {request.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50">
                      <div className="flex items-center">
                        <div className="rounded-md bg-gray-100 p-2 mr-3">
                          <FileText className="h-5 w-5 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-500">Uploaded on {formatDate(doc.uploadedAt)}</p>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-brand-blue border-brand-blue hover:bg-brand-blue hover:text-white"
                        onClick={() => handleDocumentDownload(doc)}
                      >
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>Communication</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
                {request.messages && request.messages.length > 0 ? (
                  request.messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`p-3 rounded-lg ${
                        msg.sender === '1' 
                          ? 'bg-brand-blue text-white ml-8' 
                          : 'bg-gray-100 text-gray-800 mr-8'
                      }`}
                    >
                      <p>{msg.content}</p>
                      <p className={`text-xs mt-1 ${
                        msg.sender === '1' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {formatDate(msg.timestamp)}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6">
                    <p className="text-gray-500">No messages yet</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <div className="w-full">
                <Label htmlFor="message">Send a message to the consultant</Label>
                <Textarea 
                  id="message" 
                  placeholder="Type your message here..." 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="min-h-24 mt-2"
                />
              </div>
              <Button 
                className="bg-brand-blue hover:bg-brand-lightblue w-full sm:w-auto sm:self-end mt-2 flex items-center" 
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ServiceRequestDetail;
