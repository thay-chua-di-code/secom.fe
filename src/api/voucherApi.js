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
    const normalizedPayload = {
      ...payload,
      isActive: payload?.isActive ?? true,
    };

    if (typeof normalizedPayload.isActive !== "boolean") {
      normalizedPayload.isActive = normalizedPayload.isActive === "true";
    }

    console.debug("[CreateVoucher] API payload", normalizedPayload);

    return axiosClient.post(API_ENDPOINTS.ADMIN.VOUCHER.GP, normalizedPayload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  updateVoucher(voucherId, payload) {
    const normalizedPayload = {
      ...payload,
      isActive: payload?.isActive ?? true,
    };

    if (typeof normalizedPayload.isActive !== "boolean") {
      normalizedPayload.isActive = normalizedPayload.isActive === "true";
    }

    return axiosClient.put(API_ENDPOINTS.ADMIN.VOUCHER.PUT(voucherId), normalizedPayload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },

  deleteVoucher(voucherId) {
    return axiosClient.delete(API_ENDPOINTS.ADMIN.VOUCHER.DELETE(voucherId));
  },

  approveVoucher(voucherId) {
    return axiosClient.patch(API_ENDPOINTS.ADMIN.VOUCHER.APPROVE(voucherId));
  },

  rejectVoucher(voucherId, reason) {
    return axiosClient.patch(
      API_ENDPOINTS.ADMIN.VOUCHER.REJECT(voucherId),
      { reason },
      { headers: { "Content-Type": "application/json" } },
    );
  },
};

export const getPublicVouchers = voucherApi.getPublicVouchers;
export const applyVoucherToCart = voucherApi.applyVoucherToCart;
export const getCheckoutCalculate = voucherApi.getCheckoutCalculate;
export const getAdminVouchers = voucherApi.getAdminVouchers;
export const createVoucher = voucherApi.createVoucher;
export const updateVoucher = voucherApi.updateVoucher;
export const deleteVoucher = voucherApi.deleteVoucher;

export default voucherApi;
