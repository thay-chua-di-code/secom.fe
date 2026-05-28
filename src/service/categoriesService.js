import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endPoint";
export const categoriesService = {
  getCategories: async () => {
    try {
      const result = await axiosClient.get(API_ENDPOINTS.CATEGORY.GET_CG);


      return result.data.data;
    } catch (e) {
      console.error(e?.response?.data);
    }
  },
};
