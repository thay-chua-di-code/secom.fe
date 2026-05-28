import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endPoint";

export const userService = {
  getMyInfo: async () => {
    try {
      const response = await axiosClient.get(API_ENDPOINTS.USER.PROFILE);
      console.log("Response API profile: ", response);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw error;
    }
  },
};
