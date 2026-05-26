import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endPoint";

export const userService = {
  getMyInfo: async () => {
    try {
      const response = await axiosClient.get(API_ENDPOINTS.USER.PROFILE);

      return response.data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw error;
    }
  },
};
