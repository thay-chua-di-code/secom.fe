import axiosClient from "../api/axiosClient";
import { setUserInfo } from "../redux/slice/userSlice";
export const userService = {
  getUserDetail: async (userId, dispatch) => {
    try {
      const response = await axiosClient.get(`/api/users/${userId}`);
      if (response) {
        dispatch(setUserInfo(response.data));
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw error;
    }
  },
};
