import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endPoint";
export const notificationService = {
  getNotifications: async (payload) => {
    const result = await axiosClient.get(
      API_ENDPOINTS.NOTIFICATION.GET,
      payload,
    );

    return result.data;
  },

  markAsRead: async (id) => {
    try {
      const result = await axiosClient.patch(`/notifications/${id}/read`);

      return result.data;
    } catch (e) {
      throw new Error(e?.response?.data);
    }
  },

  deleteNotification: async (id) => {
    try {
      const result = await axiosClient.delete(`/notifications/${id}`);
      return result.data;
    } catch (e) {
      throw new Error(e?.response?.data);
    }
  },
};
