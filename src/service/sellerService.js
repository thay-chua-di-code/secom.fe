/* eslint-disable preserve-caught-error */
import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endPoint";
import {
  resetSellerStatus,
  setError,
  setLoading,
  setStatus,
} from "../redux/slice/sellerStatusSlice";

const getBlobErrorMessage = async (data) => {
  if (!(data instanceof Blob)) return null;

  const text = await data.text();
  if (!text) return null;

  try {
    const json = JSON.parse(text);
    return json?.message || json?.title || text;
  } catch {
    return text;
  }
};

const getApiErrorMessage = (error, fallbackMessage) => {
  const apiMessage =
    error?.response?.data?.message ||
    error?.response?.data?.detail ||
    error?.response?.data?.error ||
    error?.response?.data?.title ||
    error?.message;

  if (typeof apiMessage === "string" && apiMessage.trim()) {
    return apiMessage;
  }

  return fallbackMessage;
};

export const sellerService = {
  becomeSeller: async (payload) => {
    try {
      const result = await axiosClient.post(
        API_ENDPOINTS.SELLER.REGISTER,
        payload,
      );

      return result;
    } catch (e) {
      throw new Error(
        e?.response?.data?.message ||
          "Something went wrong when registering seller",
      );
    }
  },

  sellerShopStatus: async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const res = await axiosClient.get(API_ENDPOINTS.SELLER.SHOP_STATUS);
      const application = res.data?.data ?? res.data?.Data ?? null;

      if (res.data?.success === true && application) {
        dispatch(
          setStatus({
            status: application.status,
            statusText: application.statusText,
            sellerId: application.userId || application.buyerId,
            rejectReason: application?.rejectReason || application?.rejectionReason,
          }),
        );
      } else {
        dispatch(resetSellerStatus());
      }
    } catch (e) {
      if (e?.response?.status === 404 || e?.response?.status === 204) {
        dispatch(resetSellerStatus());
        return null;
      }

      const message = e?.response?.data?.message || e.message;
      dispatch(setError(message));
      const error = new Error(message);
      error.response = e.response;
      throw error;
    }
  },

  getShopProfile: async () => {
    const res = await axiosClient.get(API_ENDPOINTS.SELLER.SHOP_STATUS);
    return res.data?.data ?? null;
  },

  updateShopProfile: async (payload) => {
    try {
      const res = await axiosClient.put(API_ENDPOINTS.SELLER.SHOP_PROFILE, payload);
      return res.data?.data ?? null;
    } catch (e) {
      const message = e?.response?.data?.message || e?.response?.data?.title || e.message || "Update seller profile failed";
      const error = new Error(message);
      error.response = e.response;
      throw error;
    }
  },

  // [PRODUCT]
  getProducts: async (page = 1, pageSize = 10) => {
    try {
      const result = await axiosClient.get(`/seller/products`, {
        params: {
          page,
          pageSize,
        },
      });

      return result.data.data;
    } catch (e) {
      throw new Error(e?.response?.data?.message || "Get products failed");
    }
  },

  getProductById: async (productId) => {
    try {
      const result = await axiosClient.get(
        API_ENDPOINTS.SELLER.PRODUCT(productId),
      );

      return result.data.data;
    } catch (e) {
      throw new Error(e?.response?.data?.message || "Get product failed");
    }
  },

  createProduct: async (data) => {
    try {
      const result = await axiosClient.post(`/seller/products`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return result.data.data;
    } catch (e) {
      throw new Error(e?.response?.data?.message || "Create product failed");
    }
  },

  updateProduct: async (productId, data) => {
    try {
      const result = await axiosClient.put(
        API_ENDPOINTS.SELLER.PRODUCT(productId),
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      return result.data.data;
    } catch (e) {
      throw new Error(e?.response?.data?.message || "Update product failed");
    }
  },

  deleteProduct: async (productId) => {
    try {
      const result = await axiosClient.delete(
        API_ENDPOINTS.SELLER.PRODUCT(productId),
      );

      return result.data.data;
    } catch (e) {
      const message = getApiErrorMessage(
        e,
        "Unable to delete product. Please try again.",
      );
      const error = new Error(message);
      error.response = e?.response;
      throw error;
    }
  },

  inactiveProduct: async (productId) => {
    try {
      const result = await axiosClient.patch(
        API_ENDPOINTS.SELLER.PRODUCT(productId),
      );

      return result.data.data;
    } catch (e) {
      throw new Error(e?.response?.data?.message || "Inactive product failed");
    }
  },

  updateInventory: async (productId, payload) => {
    try {
      const result = await axiosClient.put(
        API_ENDPOINTS.SELLER.PRODUCT_INVENTORY(productId),
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      return result.data.data;
    } catch (e) {
      throw new Error(e?.response?.data?.message || "Update inventory failed");
    }
  },

  importProducts: async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const result = await axiosClient.post(
        API_ENDPOINTS.SELLER.PRODUCT_IMPORT_EXCEL,
        formData,
      );

      return result.data?.data ?? result.data;
    } catch (e) {
      const message =
        e?.response?.data?.message ||
        e?.response?.data?.title ||
        e?.message ||
        "Import products failed";
      const error = new Error(message);
      error.response = e.response;
      throw error;
    }
  },

  exportProducts: async () => {
    try {
      return await axiosClient.get(API_ENDPOINTS.SELLER.PRODUCT_EXPORT_EXCEL, {
        responseType: "blob",
      });
    } catch (e) {
      const blobMessage = await getBlobErrorMessage(e?.response?.data);
      const message =
        blobMessage ||
        e?.response?.data?.message ||
        e?.response?.data?.title ||
        e?.message ||
        "Export products failed";
      const error = new Error(message);
      error.response = e.response;
      throw error;
    }
  },

  // [Banking]
  getSellerBankAccounts: async () => {
    try {
      const res = await axiosClient.get(API_ENDPOINTS.SELLER.BANK.GP);

      return res.data.data;
    } catch (e) {
      const error = new Error(e?.response?.data?.message || e.message);
      error.response = e?.response;
      throw error;
    }
  },

  getSellerBankAccount: async () => {
    try {
      const res = await axiosClient.get(API_ENDPOINTS.SELLER.BANK.SINGLE);
      return res.data.data ?? null;
    } catch (e) {
      if (e?.response?.status === 404) {
        try {
          const fallback = await axiosClient.get(API_ENDPOINTS.SELLER.BANK.GP);
          const accounts = Array.isArray(fallback?.data?.data)
            ? fallback.data.data
            : [];
          return accounts[0] ?? null;
        } catch (fallbackError) {
          const error = new Error(
            fallbackError?.response?.data?.message || fallbackError.message,
          );
          error.response = fallbackError?.response;
          throw error;
        }
      }

      const error = new Error(e?.response?.data?.message || e.message);
      error.response = e?.response;
      throw error;
    }
  },

  upsertSellerBankAccount: async (data) => {
    try {
      const res = await axiosClient.put(API_ENDPOINTS.SELLER.BANK.SINGLE, data);
      return res.data.data;
    } catch (e) {
      if (e?.response?.status === 404) {
        try {
          const accounts = await sellerService.getSellerBankAccounts();

          if (!Array.isArray(accounts) || accounts.length === 0) {
            const createRes = await axiosClient.post(API_ENDPOINTS.SELLER.BANK.GP, data);
            return createRes.data.data;
          }
        } catch (fallbackError) {
          const error = new Error(
            fallbackError?.response?.data?.message || fallbackError.message,
          );
          error.response = fallbackError?.response;
          throw error;
        }
      }

      const error = new Error(e?.response?.data?.message || e.message);
      error.response = e?.response;
      throw error;
    }
  },

  createSellerBankAccount: async (data) => {
    try {
      const res = await axiosClient.post(API_ENDPOINTS.SELLER.BANK.GP, data);
      return res.data.data;
    } catch (e) {
      throw new Error(e?.response?.data?.message || e.message);
    }
  },

  deleteSellerBankAccount: async (id) => {
    try {
      await axiosClient.delete(API_ENDPOINTS.SELLER.BANK.DELETE(id));

      return id;
    } catch (e) {
      throw new Error(e?.response?.data?.message || e.message);
    }
  },

  // [WALLET]
  getWalletSeller: async () => {
    const response = await axiosClient.get("/seller/wallet");
    return response.data.data ?? response.data;
  },

  createWithDraw: async (payload) => {
    try {
      const result = await axiosClient.post("/seller/withdrawals", payload);

      return result.data;
    } catch (e) {
      throw new Error(e?.response?.data?.message || "Withdraw is failure!");
    }
  },

  getWalletTransactionsSeller: async (params = {}) => {
    const response = await axiosClient.get("/seller/wallet/transactions", {
      params,
    });

    return response.data.data ?? response.data;
  },

  // [VOUCHERS]
  createVoucher: async (data) => {
    try {
      const payload = {
        ...data,
        isActive: data?.isActive ?? true,
      };

      if (typeof payload.isActive !== "boolean") {
        payload.isActive = payload.isActive === "true";
      }

      const res = await axiosClient.post("/seller/vouchers", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (e) {
      throw new Error(e.message);
    }
  },

  getVouchers: async (params = {}) => {
    try {
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(
          ([, value]) =>
            value !== undefined &&
            value !== null &&
            value !== "" &&
            value !== "all" &&
            value !== "default",
        ),
      );

      const res = await axiosClient.get(API_ENDPOINTS.SELLER.VOUCHERS, {
        params: cleanParams,
      });

      return res.data;
    } catch (e) {
      throw new Error(e?.response?.data?.message || "Get seller vouchers failed");
    }
  },

  updateVoucher: async (voucherId, data) => {
    try {
      const res = await axiosClient.put(`/seller/vouchers/${voucherId}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return res.data?.data ?? res.data;
    } catch (e) {
      throw new Error(
        e?.response?.data?.message || "Update seller voucher failed",
        {
          cause: e,
        },
      );
    }
  },

  deleteVoucher: async (voucherId) => {
    try {
      const res = await axiosClient.delete(`/seller/vouchers/${voucherId}`);

      return res.data?.data ?? res.data;
    } catch (e) {
      throw new Error(
        e?.response?.data?.message || "Delete seller voucher failed",
        {
          cause: e,
        },
      );
    }
  },

  // [ORDERS]
  getOrdersSeller: async (params) => {
    try {
      const res = await axiosClient.get("/seller/orders", params);

      return res.data;
    } catch (e) {
      throw new Error(e?.response?.data?.message || e.message);
    }
  },

  confirmOrderShipping: async (orderId) => {
    try {
      const res = await axiosClient.patch(
        API_ENDPOINTS.SELLER.ORDER_SHIPPING(orderId),
      );
      return res.data;
    } catch (e) {
      throw new Error(e?.response?.data?.message || e.message);
    }
  },

  confirmOrderDelivered: async (orderId) => {
    try {
      const res = await axiosClient.patch(
        API_ENDPOINTS.SELLER.ORDER_DELIVERED(orderId),
      );
      return res.data;
    } catch (e) {
      throw new Error(e?.response?.data?.message || e.message);
    }
  },

  updateOrderStatus: async (orderId, status) => {
    try {
      const res = await axiosClient.patch(
        API_ENDPOINTS.SELLER.ORDER_STATUS(orderId),
        { status },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      return res.data;
    } catch (e) {
      throw new Error(e?.response?.data?.message || e.message);
    }
  },

  // [RETURN REQUESTS]
  getReturnRequests: async (params = {}) => {
    try {
      const cleanParams = Object.fromEntries(
        Object.entries(params).filter(
          ([, value]) =>
            value !== undefined &&
            value !== null &&
            value !== "" &&
            value !== "all" &&
            value !== "default",
        ),
      );

      const res = await axiosClient.get(API_ENDPOINTS.SELLER.RETURN_REQUESTS, {
        params: cleanParams,
      });

      return res.data;
    } catch (e) {
      const error = new Error(e?.response?.data?.message || e.message);
      error.response = e.response;
      throw error;
    }
  },

  getReturnRequestDetail: async (requestId) => {
    try {
      const res = await axiosClient.get(
        API_ENDPOINTS.SELLER.RETURN_REQUEST_DETAIL(requestId),
      );

      return res.data;
    } catch (e) {
      const error = new Error(e?.response?.data?.message || e.message);
      error.response = e.response;
      throw error;
    }
  },

  approveReturnRequest: async (requestId, payload = {}) => {
    try {
      const res = await axiosClient.patch(
        API_ENDPOINTS.SELLER.RETURN_REQUEST_APPROVE(requestId),
        payload,
        { headers: { "Content-Type": "application/json" } },
      );

      return res.data;
    } catch (e) {
      const error = new Error(e?.response?.data?.message || e.message);
      error.response = e.response;
      throw error;
    }
  },

  rejectReturnRequest: async (requestId, payload = {}) => {
    try {
      const res = await axiosClient.patch(
        API_ENDPOINTS.SELLER.RETURN_REQUEST_REJECT(requestId),
        payload,
        { headers: { "Content-Type": "application/json" } },
      );

      return res.data;
    } catch (e) {
      const error = new Error(e?.response?.data?.message || e.message);
      error.response = e.response;
      throw error;
    }
  },

  confirmReturnReceived: async (requestId, payload = {}) => {
    try {
      const res = await axiosClient.patch(
        API_ENDPOINTS.SELLER.RETURN_REQUEST_CONFIRM_RECEIVED(requestId),
        payload,
        { headers: { "Content-Type": "application/json" } },
      );

      return res.data;
    } catch (e) {
      const error = new Error(e?.response?.data?.message || e.message);
      error.response = e.response;
      throw error;
    }
  },
};
