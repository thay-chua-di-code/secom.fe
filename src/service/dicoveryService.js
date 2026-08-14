import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endPoint";

const unwrapData = (response) => response?.data?.data ?? response?.data?.Data ?? response?.data ?? response;

const normalizePagedResult = (payload) => {
  const data = unwrapData(payload) || {};

  return {
    items: Array.isArray(data.items) ? data.items : [],
    pageNumber: Number(data.pageNumber ?? data.PageNumber ?? 1),
    pageSize: Number(data.pageSize ?? data.PageSize ?? 20),
    totalCount: Number(data.totalCount ?? data.TotalCount ?? 0),
    totalPages: Number(data.totalPages ?? data.TotalPages ?? 0),
  };
};

export const dicoveryService = {
  getHomePg: async () => {
    try {
      const result = await axiosClient.get(API_ENDPOINTS.DISCOVERY.HOMEPAGE, {
        skipAuth: true,
      });
      return result;
    } catch (e) {
      throw new Error(e?.response?.data?.message || "Get homepage failed", {
        cause: e,
      });
    }
  },

  getProductByCategory: async (categoryId, params) => {
    const result = await axiosClient.get(`/categories/${categoryId}/products`, {
      params,
      skipAuth: true,
    });
    return normalizePagedResult(result);
  },

  getProductByKeyWord: async (params) => {
    const res = await axiosClient.get(API_ENDPOINTS.PRODUCT.SEARCH, {
      params,
      skipAuth: true,
    });

    return normalizePagedResult(res);
  },

  getSellerShopProducts: async (sellerShopId, params = {}) => {
    const res = await axiosClient.get(`/seller-shops/${sellerShopId}/products`, {
      params,
      skipAuth: true,
    });

    return normalizePagedResult(res);
  },
};
