import axiosClient from "./axiosClient";
import { API_ENDPOINTS } from "../api/endPoint";
export const notificationService = {
  getNotifications: async (payload) => {
    const response = await axiosClient.get(
      API_ENDPOINTS.NOTIFICATION.GET,
      payload,
    );

    return response.data;
  },

  markAsRead: async (id) => {
    const response = await axiosClient.patch(`/notifications/${id}/read`);

    return response.data;
  },

  deleteNotification: async (id) => {
    try {
      const response = await axiosClient.delete(`/notifications/${id}`);
      return response.data;
    } catch (e) {
      throw new Error(e?.response?.data);
    }
  },
};
