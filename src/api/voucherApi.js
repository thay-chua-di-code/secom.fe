import axiosClient from "./axiosClient";
import { API_ENDPOINTS } from "./endPoint";

export const voucherApi = {
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

export const getAdminVouchers = voucherApi.getAdminVouchers;
export const createVoucher = voucherApi.createVoucher;
export const updateVoucher = voucherApi.updateVoucher;

export default voucherApi;
