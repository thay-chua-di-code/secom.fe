import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endPoint";

export const adminService = {
  getDashBoard: async () => {
    try {
      const result = await axiosClient.get(API_ENDPOINTS.ADMIN.DASHBOARD);
      return result.data.data;
    } catch (e) {
      throw new Error(e?.response?.data);
    }
  },
  // [USER]
  
};
