
import { apiClient } from './api';

export interface PaymentIntent {
  id: string;
  clientSecret: string;
  amount: number;
  currency: string;
  status: string;
}

export interface Payment {
  id: string;
  requestId: string;
  amount: number;
  currency: string;
  status: string;
  createdAt: string;
  paymentMethod?: string;
}

export const paymentService = {
  async createPaymentIntent(requestId: string, amount: number) {
    return apiClient.post<PaymentIntent>(`/payments/create-intent`, {
      requestId,
      amount
    });
  },

  async confirmPayment(paymentIntentId: string) {
    return apiClient.post(`/payments/${paymentIntentId}/confirm`);
  },

  async getPayments(requestId?: string) {
    const query = requestId ? `?requestId=${requestId}` : '';
    return apiClient.get<Payment[]>(`/payments${query}`);
  },

  async getPayment(paymentId: string) {
    return apiClient.get<Payment>(`/payments/${paymentId}`);
  },

  async processRefund(paymentId: string, amount?: number) {
    return apiClient.post(`/payments/${paymentId}/refund`, { amount });
  },

  async getPaymentMethods() {
    return apiClient.get('/payments/methods');
  },

  async updateRequestPrice(requestId: string, price: number) {
    return apiClient.put(`/requests/${requestId}/price`, { price });
  }
};
