import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endPoint";
import { getOrderHistory } from "../redux/slice/userSlice";

export const orderService = {
  orderPurchase: async (dispatch) => {
    try {
      const result = await axiosClient.get(API_ENDPOINTS.ORDER.ORDER_PURCHASE);
      console.log(result)
      return result;
    } catch (e) {
      throw e;
    }
  },
};
