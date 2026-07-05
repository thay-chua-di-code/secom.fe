import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endPoint";

export const dicoveryService = {
  getHomePg: async (dispatch) => {
    try {
      const result = await axiosClient.get(API_ENDPOINTS.DISCOVERY.HOMEPAGE);
      console.log(result)
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
      return result?.data;
    } catch (e) {
      console.log(e?.response?.data || e?.message);
    }
  },

  getProductByKeyWord: async (params) => {
    const res = axiosClient.get("/products/search", { params });
    console.log(res);
    return res;
  },
};
