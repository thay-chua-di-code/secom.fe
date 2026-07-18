import axiosClient from "./axiosClient";
import { API_ENDPOINTS } from "./endPoint";

export const paymentApi = {
  createPaymentTransaction: (payload) => {
    return axiosClient.post(API_ENDPOINTS.PAYMENT.TRANSACTIONS, payload);
  },

  getPaymentTransactionByOrderId: (orderId) => {
    return axiosClient.get(API_ENDPOINTS.PAYMENT.ORDER_TRANSACTION(orderId));
  },

  verifyPayOSPayment: (orderCode) => {
    return axiosClient.get(API_ENDPOINTS.PAYMENT.PAYOS_VERIFY, {
      params: { orderCode },
    });
  },
};
