import axiosClient from "./axiosClient";

const unwrapApiData = (response) => response?.data?.data ?? response?.data ?? response;

export const sellerRatingApi = {
  getSummary(sellerId) {
    return axiosClient.get(`/sellers/${sellerId}/rating-summary`);
  },

  getRatings(sellerId, { pageNumber = 1, pageSize = 10 } = {}) {
    return axiosClient.get(`/sellers/${sellerId}/ratings`, {
      params: { pageNumber, pageSize },
    });
  },

  createRating(sellerId, payload) {
    return axiosClient.post(`/sellers/${sellerId}/ratings`, payload, {
      headers: { "Content-Type": "application/json" },
    });
  },
};

export const normalizeSellerRatingSummary = unwrapApiData;

export const normalizeSellerRatings = (response) => {
  const data = unwrapApiData(response);

  return {
    items: Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : [],
    averageRating: data?.averageRating ?? 0,
    totalRatings: data?.totalRatings ?? 0,
    pageNumber: data?.pageNumber ?? 1,
    totalPages: data?.totalPages ?? 1,
  };
};

export default sellerRatingApi;
