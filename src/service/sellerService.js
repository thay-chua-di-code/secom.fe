/* eslint-disable preserve-caught-error */
import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endPoint";
import {
  setError,
  setLoading,
  setStatus,
} from "../redux/slice/sellerStatusSlice";
export const sellerService = {
  becomeSeller: async (payload) => {
    try {
      const result = await axiosClient.post(
        API_ENDPOINTS.SELLER.REGISTER,
        payload,
      );

      console.log(result);

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
      setLoading(true);
      const res = await axiosClient.get("/seller/shop/status");
      console.log(res);
      if (res.data.success === true) {
        dispatch(
          setStatus({
            status: res.data.data.status,
            statusText: res.data.data.statusText,
            sellerId: res.data.data.userId,
            rejectReason: res.data.data?.rejectReason,
          }),
        );
      }
    } catch (e) {
      dispatch(setError(e?.response?.data?.message || e.message));
      throw new Error(e?.response?.data?.message || e.message);
    }
  },

  // [PRODUCT]
  getProducts: async (pageNumber = 1, pageSize = 10) => {
    try {
      console.log("Call me service");
      const result = await axiosClient.get(`/seller/products`, {
        params: {
          pageNumber,
          pageSize,
        },
      });

      console.log("result: ", result);
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

      console.log(result);
      return result.data.data;
    } catch (e) {
      throw new Error(e?.response?.data?.message || "Delete product failed");
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

  // [Banking]
  getSellerBankAccounts: async () => {
    try {
      const res = await axiosClient.get(API_ENDPOINTS.SELLER.BANK.GP);

      return res.data.data;
    } catch (e) {
      throw new Error(e?.response?.data?.message || e.message);
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
    console.log("re:", response);
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
      throw new Error(e?.response?.data?.message || e.message);
    }
  },

  getReturnRequestDetail: async (requestId) => {
    try {
      const res = await axiosClient.get(
        API_ENDPOINTS.SELLER.RETURN_REQUEST_DETAIL(requestId),
      );

      return res.data;
    } catch (e) {
      throw new Error(e?.response?.data?.message || e.message);
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
      throw new Error(e?.response?.data?.message || e.message);
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
      throw new Error(e?.response?.data?.message || e.message);
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
      throw new Error(e?.response?.data?.message || e.message);
    }
  },
};
