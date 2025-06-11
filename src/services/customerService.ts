
import { apiClient } from './api';
import { Customer, ServiceRequest, DashboardStats } from '../types';

export const customerService = {
  async getDashboard() {
    return apiClient.get<DashboardStats>('/customer/dashboard');
  },

  async getProfile() {
    return apiClient.get<Customer>('/customer/profile');
  },

  async updateProfile(data: Partial<Customer>) {
    return apiClient.put<Customer>('/customer/profile', data);
  },

  async getRequests() {
    return apiClient.get<ServiceRequest[]>('/customer/requests');
  },

  async getRequestDetail(requestId: string) {
    return apiClient.get<ServiceRequest>(`/customer/requests/${requestId}`);
  },

  async updateRequest(requestId: string, data: Partial<ServiceRequest>) {
    return apiClient.put<ServiceRequest>(`/customer/requests/${requestId}`, data);
  },

  async deleteRequest(requestId: string) {
    return apiClient.delete(`/customer/requests/${requestId}`);
  }
};
