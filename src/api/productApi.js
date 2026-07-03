import axiosClient from "./axiosClient";
import { API_ENDPOINTS } from "./endPoint";

export const productApi = {
  getProductDetail(productId) {
    return axiosClient.get(API_ENDPOINTS.PRODUCT.DETAIL(productId));
  },
};

export const getProductDetail = productApi.getProductDetail;

export default productApi;
