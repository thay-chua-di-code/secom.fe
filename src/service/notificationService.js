import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endPoint";

// Temporary
// const BASE = "http://localhost:3001/notifications";
export const notificationService = {
  getNotifications: async () => {
    const result = await axiosClient.get(API_ENDPOINTS.NOTIFICATION.GET);
    return result.data;
  },

  markAsRead: async (id) => {
    try {
      const result = await axiosClient.patch(`/notifications/${id}/read`);

      return result.data;
    } catch (e) {
      throw new Error(e?.response?.data?.message || "Mark notification failed", {
        cause: e,
      });
    }
  },

  deleteNotification: async (id) => {
    try {
      const result = await axiosClient.delete(`/notifications/${id}`);
      return result.data;
    } catch (e) {
      throw new Error(e?.response?.data?.message || "Delete notification failed", {
        cause: e,
      });
    }
  },
};
