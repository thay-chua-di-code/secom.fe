import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endPoint";

export const orderService = {
 createOrder: async (payload) => {
    try {
      const response = await axiosClient.post("/orders", payload);
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message || "Create order failed");
    }
  },

  getOrders: async () => {
    try {
      const response = await axiosClient.get("/orders");
      return response.data;
    } catch (error) {
      throw new Error(error?.response?.data?.message || "Get orders failed");
    }
  },

  getOrderDetail: async (orderId) => {
    try {
      const response = await axiosClient.get(`/orders/${orderId}`);
      return response.data;
    } catch (error) {
      throw new Error(
        error?.response?.data?.message || "Get order detail failed",
      );
    }
  },
};

