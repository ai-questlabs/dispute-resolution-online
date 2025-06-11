
import { apiClient } from './api';
import { Document } from '../types';

export const documentService = {
  async uploadDocument(requestId: string, file: File) {
    return apiClient.uploadFile<Document>(`/requests/${requestId}/documents`, file);
  },

  async getDocuments(requestId: string) {
    return apiClient.get<Document[]>(`/requests/${requestId}/documents`);
  },

  async downloadDocument(documentId: string) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${apiClient.baseUrl}/documents/${documentId}/download`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
    
    if (!response.ok) {
      throw new Error('Download failed');
    }
    
    return response.blob();
  },

  async deleteDocument(documentId: string) {
    return apiClient.delete(`/documents/${documentId}`);
  },

  async getDocument(documentId: string) {
    return apiClient.get<Document>(`/documents/${documentId}`);
  }
};
