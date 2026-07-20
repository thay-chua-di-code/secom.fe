import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endPoint";
import { getReviews } from "../redux/slice/productSlice";

/**
 * @typedef {Object} ProductReview
 * @property {string} id
 * @property {string} productId
 * @property {string} buyerId
 * @property {string} reviewerName
 * @property {string | null} reviewerAvatarUrl
 * @property {number} rating
 * @property {string | null} content
 * @property {string} createdAtUtc
 * @property {string} updatedAtUtc
 * @property {boolean} isVerifiedPurchase
 */

/**
 * @typedef {Object} ProductReviewsData
 * @property {string} productId
 * @property {number} averageRating
 * @property {number} totalReviews
 * @property {number} pageNumber
 * @property {number} pageSize
 * @property {number} totalPages
 * @property {ProductReview[]} items
 */

const unwrapReviewsData = (response) =>
  response?.data?.data ?? response?.data ?? response;

export const reviewService = {
  async createReview(productId, data) {
    try {
      const res = await axiosClient.post(
        API_ENDPOINTS.PRODUCT.CREATE_RV(productId),
        data,
      );

      return res.data?.data ?? res.data;
    } catch (e) {
      throw new Error(e?.response?.data?.message || "Create review failed", {
        cause: e,
      });
    }
  },

  async getReviewsPropductDetail(productId, dispatch, params = {}) {
    try {
      const result = await axiosClient.get(`/products/${productId}/reviews`, {
        params: {
          pageNumber: params.pageNumber ?? 1,
          pageSize: params.pageSize ?? 10,
        },
      });

      const reviewsData = unwrapReviewsData(result);

      if (dispatch) {
        dispatch(getReviews(reviewsData));
      }

      return reviewsData;
    } catch (e) {
      throw new Error(e?.response?.data?.message || "Get reviews failed", {
        cause: e,
      });
    }
  },
};
