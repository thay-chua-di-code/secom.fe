import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endPoint";
import {
  setDashboardData,
  setError,
  setLoading,
} from "../redux/slice/admin/dashboard/dashboardSlice";

export const adminService = {
  getDashBoard: async () => {
    try {
      const result = await axiosClient.get(API_ENDPOINTS.ADMIN.DASHBOARD_STATISTICS);
      console.log(result);
      return result.data;
    } catch (e) {
      const errorMessage =
        e?.response?.data?.message ||
        e?.response?.data ||
        "Failed to fetch dashboard statistics";

      throw new Error(errorMessage);
    } finally {
      console.log("Done");
    }
  },
  getDashboardTrends: async (params) => {
    try {
      const result = await axiosClient.get(API_ENDPOINTS.ADMIN.DASHBOARD_TRENDS, {
        params,
      });

      return result.data.data;
    } catch (e) {
      throw new Error(
        e?.response?.data?.message || e.message || "Unable to load dashboard trend",
      );
    }
  },
  // [USER]
  getUsers: (pageNumber, pageSize) => {
    return axiosClient.get(API_ENDPOINTS.ADMIN.USER.GET, {
      params: { pageNumber, pageSize },
    });
  },
  banUser: async (id) => {
    try {
      const result = await axiosClient.patch(API_ENDPOINTS.ADMIN.USER.LOCK(id));
      console.log(result);
      return result;
    } catch (e) {
      throw new Error(e?.response?.data);
    }
  },
  unBanUser: async (id) => {
    try {
      const result = await axiosClient.patch(
        API_ENDPOINTS.ADMIN.USER.UNLOCK(id),
      );
    } catch (e) {
      throw new Error(e?.response?.data);
    }
  },

  // [SELLER]
  getSeller: async (params) => {
    try {
      const result = await axiosClient.get("/admin/seller-shops/pending", {
        params,
      });

      return result.data.data;
    } catch (e) {
      throw new Error(e.message || "Something went wrong when get sellers");
    }
  },

  getSellerDetail: async (id) => {
    try {
      const result = await axiosClient.get(`/admin/seller-shops/${id}`);

      return result.data.data;
    } catch (e) {
      throw new Error(e?.response.message || e.message);
    }
  },
  approveSeller: async (id) => {
    try {
      const result = await axiosClient.post(
        `/admin/seller-shops/${id}/approve`,
      );
      console.log(result);
      return result.data.data;
    } catch (e) {
      throw new Error(e?.response.message || e.message);
    }
  },
  rejectSeller: async (id, reason) => {
    try {
      const result = await axiosClient.post(
        `/admin/seller-shops/${id}/reject`,
        {
          reason,
        },
      );

      return result.data.data;
    } catch (e) {
      throw new Error(
        e?.response?.data?.message || e.message || "Reject seller failed",
      );
    }
  },
  // [PRODUCT]
  getProducts: async (params) => {
    const result = await axiosClient.get(API_ENDPOINTS.ADMIN.PRODUCT.GET, {
      params,
    });

    return result.data;
  },

  approveProduct: async (productId) => {
    const result = await axiosClient.patch(
      API_ENDPOINTS.ADMIN.PRODUCT.APPROVE(productId),
    );

    return result.data;
  },

  rejectProduct: async (productId, reason) => {
    const result = await axiosClient.patch(
      API_ENDPOINTS.ADMIN.PRODUCT.REJECT(productId),
      { reason },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return result.data;
  },

  getProductModerationHistory: async (productId) => {
    const result = await axiosClient.get(
      API_ENDPOINTS.ADMIN.PRODUCT.MODERATION_HISTORY(productId),
    );

    return result.data;
  },

  // [CATEGORIES]
  getCategories: async (params) => {
    const response = await axiosClient.get(
      API_ENDPOINTS.ADMIN.ADMIN_CATEGORIES.GET,
      {
        params,
      },
    );

    return response.data;
  },

  createCategory: async (payload) => {
    const response = await axiosClient.post(
      API_ENDPOINTS.ADMIN.ADMIN_CATEGORIES.POST,
      payload,
    );

    console.log(response);
    return response.data;
  },

  updateCategory: async ({ id, payload }) => {
    const response = await axiosClient.put(
      API_ENDPOINTS.ADMIN.ADMIN_CATEGORIES.PUT(id),
      payload,
    );

    return response.data;
  },

  deleteCategory: async (id) => {
    const response = await axiosClient.delete(
      API_ENDPOINTS.ADMIN.ADMIN_CATEGORIES.DELETE(id),
    );

    return response.data;
  },

  updateCategoryStatus: async (id, payload) => {
    const response = await axiosClient.patch(
      API_ENDPOINTS.ADMIN.ADMIN_CATEGORIES.STATUS(id),
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  },

  // [ORDERS]
  getOrdersByAdmin: async (params) => {
    try {
      const res = await axiosClient.get(API_ENDPOINTS.ADMIN.ORDERS.GET, {
        params,
      });

      return res.data.data;
    } catch (e) {
      throw new Error(
        e.response?.data?.message || e.message || "Something went wrong",
      );
    }
  },

  async getOrderDetail(id) {
    const response = await axiosClient.get(API_ENDPOINTS.ADMIN.ORDERS.DETAIL(id));
    return response.data.data;
  },

  // [VOUCHER]
  async getVouchers(params) {
    try {
      const res = await axiosClient.get(API_ENDPOINTS.ADMIN.VOUCHER.GP, {
        params,
      });

      console.log("res: ", res);
      return res;
    } catch (error) {
      throw error;
    }
  },

  async createVoucher(data) {
    try {
      const res = await axiosClient.post(API_ENDPOINTS.ADMIN.VOUCHER.GP, data);

      console.log("Res create Serivce: ", res);
      return res;
    } catch (error) {
      throw error;
    }
  },

  async updateVoucher(id, data) {
    try {
      const res = await axiosClient.put(
        API_ENDPOINTS.ADMIN.VOUCHER.PUT(id),
        data,
      );

      return res;
    } catch (error) {
      throw error;
    }
  },

  // [FINANCE]

  getFinanceSummary: async () => {
    try {
      const res = await axiosClient.get(API_ENDPOINTS.ADMIN.FINANCE.SUMMARY);

      return res.data.data;
    } catch (e) {
      throw new Error(
        e.response?.data?.message || e.message || "Something went wrong",
      );
    }
  },

  getFinanceTrends: async (params) => {
    try {
      const res = await axiosClient.get(API_ENDPOINTS.ADMIN.FINANCE.TRENDS, {
        params,
      });

      return res.data.data;
    } catch (e) {
      throw new Error(
        e?.response?.data?.message || e.message || "Unable to load finance trend",
      );
    }
  },

  getAdminPayouts: async (params) => {
    const cleanParams = Object.fromEntries(
      Object.entries(params || {}).filter(
        ([, value]) => value !== undefined && value !== null && value !== "",
      ),
    );

    const res = await axiosClient.get(API_ENDPOINTS.ADMIN.FINANCE.PAYOUTS, {
      params: cleanParams,
    });

    return res.data;
  },

  // Approve
  approvePayout: async (id) => {
    try {
      const res = await axiosClient.post(
        API_ENDPOINTS.ADMIN.FINANCE.APPROVE(id),
      );

      return res.data.data;
    } catch (e) {
      throw new Error(
        e.response?.data?.message || e.message || "Something went wrong",
      );
    }
  },

  // Reject
  rejectPayout: async (id) => {
    try {
      const res = await axiosClient.post(
        API_ENDPOINTS.ADMIN.FINANCE.REJECT(id),
      );

      return res.data.data;
    } catch (e) {
      throw new Error(
        e.response?.data?.message || e.message || "Something went wrong",
      );
    }
  },
};
