import axiosClient from "./axiosClient";

export const unwrapApiData = (res) => res?.data ?? res;

export const orderApi = {
  getCheckoutCalculate: () => axiosClient.get("/checkout/calculate"),

  createOrder: (payload) => axiosClient.post("/orders", payload),

  getPurchasedOrders: () => axiosClient.get("/orders/purchased"),

  getPurchasedOrdersPaged: ({ status, page = 1, pageSize = 20 } = {}) => {
    return axiosClient.get("/orders/purchased/paged", {
      params: {
        ...(status && status !== "all" ? { status } : {}),
        page,
        pageSize,
      },
    });
  },

  getOrderDetail: (orderId) => axiosClient.get(`/orders/${orderId}`),

  cancelOrder: (orderId) => axiosClient.delete(`/orders/${orderId}`),
};
