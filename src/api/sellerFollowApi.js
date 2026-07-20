import axiosClient from "./axiosClient";
import { API_ENDPOINTS } from "./endPoint";

const unwrapApiData = (response) => response?.data?.data ?? response?.data ?? response;

const getApiErrorMessage = (error, fallback) =>
  error?.response?.data?.message ||
  error?.response?.data?.error ||
  error?.message ||
  fallback;

/**
 * @typedef {Object} SellerFollowStatusResponse
 * @property {string} sellerId
 * @property {boolean} isFollowing
 * @property {string | null} followedAtUtc
 */

/**
 * @typedef {Object} FollowedSellerResponse
 * @property {string} sellerId
 * @property {string | null} shopName
 * @property {string | null} logoUrl
 * @property {number | null} rating
 * @property {string} followedAtUtc
 */

export const sellerFollowApi = {
  async getFollowedSellers({ page = 1, pageSize = 20 } = {}) {
    try {
      const response = await axiosClient.get(API_ENDPOINTS.SELLER.FOLLOWED, {
        params: { page, pageSize },
      });

      return unwrapApiData(response);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Get followed sellers failed"), {
        cause: error,
      });
    }
  },

  async getSellerFollowStatus(sellerId) {
    try {
      const response = await axiosClient.get(
        API_ENDPOINTS.SELLER.FOLLOW_STATUS(sellerId),
      );

      return unwrapApiData(response);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Get follow status failed"), {
        cause: error,
      });
    }
  },

  async followSeller(sellerId) {
    try {
      const response = await axiosClient.post(API_ENDPOINTS.SELLER.FOLLOW(sellerId));

      return unwrapApiData(response);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Follow seller failed"), {
        cause: error,
      });
    }
  },

  async updateSellerFollowStatus(sellerId, isFollowing) {
    try {
      const response = await axiosClient.put(API_ENDPOINTS.SELLER.FOLLOW(sellerId), {
        isFollowing,
      });

      return unwrapApiData(response);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Update follow status failed"), {
        cause: error,
      });
    }
  },

  async unfollowSeller(sellerId) {
    try {
      const response = await axiosClient.delete(API_ENDPOINTS.SELLER.FOLLOW(sellerId));

      return unwrapApiData(response);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Unfollow seller failed"), {
        cause: error,
      });
    }
  },
};

export default sellerFollowApi;
