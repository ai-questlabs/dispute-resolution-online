
import { apiClient } from './api';
import { ServiceRequest, ServiceCategory } from '../types';

export interface CreateRequestData {
  title: string;
  description: string;
  category: ServiceCategory;
}

export interface UpdateRequestData {
  title?: string;
  description?: string;
  category?: ServiceCategory;
  status?: string;
}

export interface AssignRequestData {
  consultantId: string;
}

export const requestService = {
  async getRequests() {
    return apiClient.get<ServiceRequest[]>('/requests');
  },

  async getRequest(id: string) {
    return apiClient.get<ServiceRequest>(`/requests/${id}`);
  },

  async createRequest(data: CreateRequestData) {
    return apiClient.post<ServiceRequest>('/requests', data);
  },

  async updateRequest(id: string, data: UpdateRequestData) {
    return apiClient.put<ServiceRequest>(`/requests/${id}`, data);
  },

  async deleteRequest(id: string) {
    return apiClient.delete(`/requests/${id}`);
  },

  async assignRequest(id: string, data: AssignRequestData) {
    return apiClient.put<ServiceRequest>(`/requests/${id}/assign`, data);
  },

  async uploadDocument(requestId: string, file: File) {
    return apiClient.uploadFile(`/requests/${requestId}/documents`, file);
  },

  async getMessages(requestId: string) {
    return apiClient.get(`/requests/${requestId}/messages`);
  },

  async sendMessage(requestId: string, content: string) {
    return apiClient.post(`/requests/${requestId}/messages`, { content });
  }
};
