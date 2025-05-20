
export type UserRole = 'customer' | 'consultant' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  avatar?: string;
}

export interface Customer extends User {
  role: 'customer';
}

export interface Consultant extends User {
  role: 'consultant';
  specialization: string[];
  assignedCases: string[];
  caseCompleted: number;
}

export interface Admin extends User {
  role: 'admin';
}

export type ServiceCategory = 
  | 'Income Tax'
  | 'GST'
  | 'Corporate Tax'
  | 'International Tax'
  | 'Tax Appeals'
  | 'Other';

export type RequestStatus = 
  | 'pending'
  | 'assigned'
  | 'in-progress'
  | 'needs-clarification'
  | 'completed';

export interface ServiceRequest {
  id: string;
  customerId: string;
  title: string;
  description: string;
  category: ServiceCategory;
  documents: Document[];
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  price?: number;
  messages?: Message[];
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Document {
  id: string;
  name: string;
  url: string;
  uploadedBy: string;
  uploadedAt: string;
}

export interface DashboardStats {
  totalRequests: number;
  pendingRequests: number;
  completedRequests: number;
  activeConsultants: number;
}
