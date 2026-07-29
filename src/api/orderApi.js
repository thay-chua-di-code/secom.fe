import axiosClient from "./axiosClient";
import { API_ENDPOINTS } from "./endPoint";

export const unwrapApiData = (res) => {
  const payload = res?.data ?? res;
  return payload?.data ?? payload;
};

export const orderApi = {
  getCheckoutCalculate: () => axiosClient.get(API_ENDPOINTS.CHECKOUT.CALCULATE),

  createOrder: (payload) => axiosClient.post(API_ENDPOINTS.ORDER.CREATE, payload),

  getPurchasedOrders: () => axiosClient.get(API_ENDPOINTS.ORDER.ORDER_PURCHASE),

  getPurchasedOrdersPaged: ({ status, page = 1, pageSize = 20 } = {}) => {
    return axiosClient.get(API_ENDPOINTS.ORDER.ORDER_PURCHASE_PAGED, {
      params: {
        ...(status && status !== "all" ? { status } : {}),
        page,
        pageSize,
      },
    });
  },

  getOrderDetail: (orderId) => axiosClient.get(API_ENDPOINTS.ORDER.ORDER_DETAIL(orderId)),

  cancelOrder: (orderId, payload = {}) =>
    axiosClient.patch(API_ENDPOINTS.ORDER.CANCEL(orderId), payload, {
      headers: { "Content-Type": "application/json" },
    }),

  confirmReceived: (orderId) =>
    axiosClient.put(API_ENDPOINTS.ORDER.CONFIRM_RECEIVED(orderId)),

  createReturnRequest: (orderId, payload) =>
    axiosClient.post(API_ENDPOINTS.ORDER.RETURN_REQUESTS(orderId), payload, {
      headers: { "Content-Type": "application/json" },
    }),
};
