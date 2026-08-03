import axiosClient from "./axiosClient";
import { API_ENDPOINTS } from "./endPoint";

export const productApi = {
  async searchProducts(params = {}) {
    const res = await axiosClient.get(API_ENDPOINTS.PRODUCT.SEARCH, {
      params,
    });

    return res.data?.data ?? res.data;
  },

  async getProductDetail(productId) {
    const res = await axiosClient.get(API_ENDPOINTS.PRODUCT.DETAIL(productId));
    return res.data.data;
  },
};

export const getProductDetail = productApi.getProductDetail;

export default productApi;
