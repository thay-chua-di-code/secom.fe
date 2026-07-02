import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endPoint";

export const dicoveryService = {
  getHomePg: async () => {
    try {
      const result = await axiosClient.get(API_ENDPOINTS.DISCOVERY.HOMEPAGE);

      return result;
    } catch (e) {
      throw new Error(e?.response?.data?.message || "Get homepage failed", {
        cause: e,
      });
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
