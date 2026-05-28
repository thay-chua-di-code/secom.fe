import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endPoint";
import { updateUserInfo } from "../redux/slice/userSlice";
export const userService = {
  getMyInfo: async () => {
    try {
      const response = await axiosClient.get(API_ENDPOINTS.USER.PROFILE);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw error;
    }
  },
  updateProfile: async (payload, dispatch) => {
    try {
      const result = await axiosClient.put(API_ENDPOINTS.USER.PROFILE, payload);
      console.log(result);
      dispatch(updateUserInfo(result.data.data));
      return result.data.data;
    } catch (e) {
      console.error("Error updating user profile:", e?.response?.data);
    }
  },
};
