import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endPoint";

export const reviewService = {
  async createReview(productId, data) {
    try {
      console.log(data);

      const res = await axiosClient.post(
        API_ENDPOINTS.PRODUCT.CREATE_RV(productId),
        data,
      );

      console.log("Rv:", res);

      return res;
    } catch (e) {
      throw new Error(e?.response?.data?.message || "Create review failed");
    }
  },
};
