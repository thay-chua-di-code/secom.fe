import { API_ENDPOINTS } from "../api/endPoint";
import axiosClient from "../api/axiosClient";
export const productService = {
  getProductDetail: async (id) => {
    try {
    } catch (e) {
      console.error(e?.response?.data);
    }
  },
};
