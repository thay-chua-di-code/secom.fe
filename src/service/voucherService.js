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
    const normalizedCode = String(code?.code ?? code ?? "").trim();

    if (!normalizedCode) {
      throw new Error("Voucher code is required.");
    }

    const response = await axiosClient.put(API_ENDPOINTS.CART.APPLY_VOUCHER, {
      code: normalizedCode,
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
