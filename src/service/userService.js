import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endPoint";
import { updateUserInfo, getOrderHistory } from "../redux/slice/userSlice";
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

      dispatch(updateUserInfo(result.data.data));

      return result.data.data;
    } catch (e) {
      console.error("Error updating user profile:", e?.response?.data);
      throw e;
    }
  },
  getOrderPurchase: async (dispatch) => {
    try {
      const result = await axiosClient.get(API_ENDPOINTS.ORDER.ORDER_PURCHASE);
      console.log("Order: ", result);
      dispatch(getOrderHistory(result.data.data));
    } catch (e) {
      console.error("Error fetching order purchase:", e?.response?.data);
    }
  },
};
