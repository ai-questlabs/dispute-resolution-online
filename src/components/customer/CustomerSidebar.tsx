
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { 
  Home, 
  FileText, 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  PlusCircle,
  Calendar,
  User
} from 'lucide-react';

// Mock data for requests
const MOCK_REQUESTS = [
  {
    id: '1',
    title: 'Income Tax Assessment Dispute',
    status: 'in-progress',
    unreadMessages: 2,
    dueDate: '2023-06-22',
  },
  {
    id: '2',
    title: 'GST Input Credit Issue',
    status: 'needs-clarification',
    unreadMessages: 1,
    dueDate: '2023-06-15',
  },
  {
    id: '3',
    title: 'Corporate Tax Penalty Appeal',
    status: 'completed',
    unreadMessages: 0,
    dueDate: null,
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'pending':
      return <Clock className="h-4 w-4 text-gray-500" />;
    case 'assigned':
      return <Clock className="h-4 w-4 text-blue-500" />;
    case 'in-progress':
      return <Clock className="h-4 w-4 text-indigo-500" />;
    case 'needs-clarification':
      return <AlertCircle className="h-4 w-4 text-yellow-500" />;
    case 'completed':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    default:
      return <Clock className="h-4 w-4 text-gray-500" />;
  }
};

export function CustomerSidebar() {
  const { user } = useAuth();
  const location = useLocation();

  const mainMenuItems = [
    {
      title: "Dashboard",
      url: "/customer/dashboard",
      icon: Home,
    },
    {
      title: "New Request",
      url: "/customer/new-request",
      icon: PlusCircle,
    },
    {
      title: "All Communications",
      url: "/customer/communications",
      icon: MessageSquare,
      badge: MOCK_REQUESTS.reduce((total, req) => total + req.unreadMessages, 0),
    },
    {
      title: "Documents",
      url: "/customer/documents",
      icon: FileText,
    },
    {
      title: "Calendar",
      url: "/customer/calendar",
      icon: Calendar,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="border-b">
        <div className="flex items-center gap-2 px-2 py-1">
          <User className="h-6 w-6 text-brand-blue" />
          <div>
            <p className="font-semibold text-sm">{user?.name}</p>
            <p className="text-xs text-gray-500">Customer Portal</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                  >
                    <Link to={item.url} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </div>
                      {item.badge && item.badge > 0 && (
                        <Badge className="bg-red-500 text-white text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel>My Cases</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MOCK_REQUESTS.map((request) => (
                <SidebarMenuItem key={request.id}>
                  <SidebarMenuButton asChild>
                    <Link 
                      to={`/customer/request/${request.id}`}
                      className="flex flex-col items-start gap-1 p-2"
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="text-xs font-medium truncate">
                          #{request.id} {request.title.length > 20 
                            ? `${request.title.substring(0, 20)}...` 
                            : request.title}
                        </span>
                        {getStatusIcon(request.status)}
                      </div>
                      <div className="flex items-center justify-between w-full">
                        {request.unreadMessages > 0 && (
                          <Badge className="bg-red-500 text-white text-xs">
                            {request.unreadMessages} new
                          </Badge>
                        )}
                        {request.dueDate && (
                          <span className="text-xs text-gray-500">
                            Due: {new Date(request.dueDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <div className="p-2 text-xs text-gray-500">
          <p>Need help?</p>
          <Link 
            to="/customer/support" 
            className="text-brand-blue hover:underline"
          >
            Contact Support
          </Link>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
