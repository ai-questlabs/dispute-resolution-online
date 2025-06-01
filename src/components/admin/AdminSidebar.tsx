
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
} from '@/components/ui/sidebar';
import { 
  BarChart, 
  DollarSign, 
  FileText, 
  Users, 
  Settings,
  User
} from 'lucide-react';

const navigationItems = [
  {
    title: "Overview",
    icon: BarChart,
    isActive: true,
  },
  {
    title: "Revenue",
    icon: DollarSign,
    isActive: false,
  },
  {
    title: "Requests",
    icon: FileText,
    isActive: false,
  },
  {
    title: "Consultants",
    icon: Users,
    isActive: false,
  },
  {
    title: "Packages",
    icon: Settings,
    isActive: false,
  },
];

export function AdminSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="border-b p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue text-white">
            <User className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold">Super Admin</span>
            <span className="text-xs text-gray-500">Tax Litigation Services</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    isActive={item.isActive}
                    className="w-full justify-start"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t p-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
