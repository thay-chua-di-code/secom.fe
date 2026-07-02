import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endPoint";

export const dicoveryService = {
  getHomePg: async () => {
    try {
      const result = await axiosClient.get(API_ENDPOINTS.DICOVERY.HOME_PG);

      return result?.data;
    } catch (e) {
      console.log(e?.response?.data);
    }
  },

  getProductByCategory: async (categoryId, params) => {
    try {
      const result = await axiosClient.get(
        `/categories/${categoryId}/products`,
        { params },
      );

      console.log("Result product by cate:", result);

      return result?.data;
    } catch (e) {
      console.log(e?.response?.data || e?.message);
    }
  },
};
