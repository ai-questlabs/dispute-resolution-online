
import { apiClient } from './api';
import { User, ServiceRequest, DashboardStats, Consultant } from '../types';

export const adminService = {
  async getDashboard() {
    return apiClient.get<DashboardStats>('/admin/dashboard');
  },

  async getAllUsers() {
    return apiClient.get<User[]>('/admin/users');
  },

  async getAllConsultants() {
    return apiClient.get<Consultant[]>('/admin/consultants');
  },

  async createConsultant(data: Partial<Consultant>) {
    return apiClient.post<Consultant>('/admin/consultants', data);
  },

  async updateConsultant(consultantId: string, data: Partial<Consultant>) {
    return apiClient.put<Consultant>(`/admin/consultants/${consultantId}`, data);
  },

  async deleteConsultant(consultantId: string) {
    return apiClient.delete(`/admin/consultants/${consultantId}`);
  },

  async getAllRequests() {
    return apiClient.get<ServiceRequest[]>('/admin/requests');
  },

  async assignRequest(requestId: string, consultantId: string) {
    return apiClient.put(`/admin/requests/${requestId}/assign`, { consultantId });
  },

  async getRevenue(period?: string) {
    const query = period ? `?period=${period}` : '';
    return apiClient.get(`/admin/revenue${query}`);
  },

  async getSystemStats() {
    return apiClient.get('/admin/stats');
  },

  async updateUserRole(userId: string, role: string) {
    return apiClient.put(`/admin/users/${userId}/role`, { role });
  },

  async deactivateUser(userId: string) {
    return apiClient.put(`/admin/users/${userId}/deactivate`);
  }
};
