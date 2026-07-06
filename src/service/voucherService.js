import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endPoint";

export const voucherService = {
  getPublicVouchers: async (params = {}) => {
    const response = await axiosClient.get(API_ENDPOINTS.VOUCHER.PUBLIC, {
      params,
    });

    return response.data;
  },

  applyVoucherToCart: async (code) => {
    const response = await axiosClient.put(API_ENDPOINTS.CART.APPLY_VOUCHER, {
      code,
    });

    return response.data;
  },

  getCheckoutCalculate: async () => {
    const response = await axiosClient.get(API_ENDPOINTS.CHECKOUT.CALCULATE);

    return response.data;
  },

  getAll: async (params = {}) => {
    return voucherService.getPublicVouchers(params);
  },
};
