
import { apiClient } from './api';
import { Consultant, ServiceRequest, DashboardStats } from '../types';

export const consultantService = {
  async getDashboard() {
    return apiClient.get<DashboardStats>('/consultant/dashboard');
  },

  async getProfile() {
    return apiClient.get<Consultant>('/consultant/profile');
  },

  async updateProfile(data: Partial<Consultant>) {
    return apiClient.put<Consultant>('/consultant/profile', data);
  },

  async getAssignedRequests() {
    return apiClient.get<ServiceRequest[]>('/consultant/requests');
  },

  async updateRequestStatus(requestId: string, status: string) {
    return apiClient.put(`/consultant/requests/${requestId}/status`, { status });
  },

  async getRequestDetail(requestId: string) {
    return apiClient.get<ServiceRequest>(`/consultant/requests/${requestId}`);
  },

  async acceptRequest(requestId: string) {
    return apiClient.put(`/consultant/requests/${requestId}/accept`);
  },

  async completeRequest(requestId: string) {
    return apiClient.put(`/consultant/requests/${requestId}/complete`);
  }
};
