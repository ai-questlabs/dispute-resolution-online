
import { apiClient } from './api';
import { Message } from '../types';

export const messageService = {
  async getMessages(requestId: string) {
    return apiClient.get<Message[]>(`/requests/${requestId}/messages`);
  },

  async sendMessage(requestId: string, content: string) {
    return apiClient.post<Message>(`/requests/${requestId}/messages`, { content });
  },

  async markAsRead(messageId: string) {
    return apiClient.put(`/messages/${messageId}/read`);
  },

  async markAllAsRead(requestId: string) {
    return apiClient.put(`/requests/${requestId}/messages/read-all`);
  },

  async deleteMessage(messageId: string) {
    return apiClient.delete(`/messages/${messageId}`);
  },

  async getUnreadCount() {
    return apiClient.get<{ count: number }>('/messages/unread-count');
  }
};
