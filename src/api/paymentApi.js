import axiosClient from "./axiosClient";
import { API_ENDPOINTS } from "./endPoint";

export const paymentApi = {
  createPaymentTransaction: (payload) => {
    return axiosClient.post(API_ENDPOINTS.PAYMENT.TRANSACTIONS, payload);
  },

  getPaymentTransactionByOrderId: (orderId) => {
    return axiosClient.get(`/payments/orders/${orderId}/transaction`);
  },

  createTransaction: (payload) => {
    return axiosClient.post(API_ENDPOINTS.PAYMENT.TRANSACTIONS, payload);
  },
};
