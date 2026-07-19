import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endPoint";
import { getReviews } from "../redux/slice/productSlice";

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

  async getReviewsPropductDetail(productId, dispatch) {
    try {
      const result = await axiosClient.get(`/products/${productId}/reviews`);

      if (result.data.success) {
        dispatch(getReviews(result.data.data));
      }
    } catch (e) {
      throw new Error(e?.response?.data?.message || "Create review failed");
    }
  },
};
