import axiosClient from "./axiosClient";
import { API_ENDPOINTS } from "./endPoint";

export const voucherApi = {
  getPublicVouchers({ keyword = "", discountType, status, sortBy, page = 1, pageSize = 20 } = {}) {
    const params = { keyword, page, pageSize };

    if (discountType) {
      params.discountType = discountType;
    }

    if (status) {
      params.status = status;
    }

    if (sortBy) {
      params.sortBy = sortBy;
    }

    return axiosClient.get(API_ENDPOINTS.VOUCHER.PUBLIC, { params });
  },

  applyVoucherToCart(code) {
    return axiosClient.put(API_ENDPOINTS.CART.APPLY_VOUCHER, { code });
  },

  getCheckoutCalculate() {
    return axiosClient.get(API_ENDPOINTS.CHECKOUT.CALCULATE);
  },

  getAdminVouchers({ searchTerm = "", isActive, page = 1, pageSize = 20 } = {}) {
    const params = {
      searchTerm,
      page,
      pageSize,
    };

    if (isActive !== undefined && isActive !== "") {
      params.isActive = isActive;
    }

    return axiosClient.get(API_ENDPOINTS.ADMIN.VOUCHER.GP, { params });
  },

  createVoucher(payload) {
    return axiosClient.post(API_ENDPOINTS.ADMIN.VOUCHER.GP, payload);
  },

  updateVoucher(voucherId, payload) {
    return axiosClient.put(API_ENDPOINTS.ADMIN.VOUCHER.PUT(voucherId), payload);
  },
};

export const getPublicVouchers = voucherApi.getPublicVouchers;
export const applyVoucherToCart = voucherApi.applyVoucherToCart;
export const getCheckoutCalculate = voucherApi.getCheckoutCalculate;
export const getAdminVouchers = voucherApi.getAdminVouchers;
export const createVoucher = voucherApi.createVoucher;
export const updateVoucher = voucherApi.updateVoucher;

export default voucherApi;
