import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endPoint";

export const adminService = {
  getDashBoard: async () => {
    try {
      const result = await axiosClient.get(API_ENDPOINTS.ADMIN.DASHBOARD);
      return result.data.data;
    } catch (e) {
      throw new Error(e?.response?.data);
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
      const result = await axiosClient.get(API_ENDPOINTS.ADMIN.SELLER.GET, {
        params,
      });
    } catch (e) {
      throw new Error(e.message || "Something went wrong when get sellers");
    }
  },
  // [PRODUCT]
  getProducts: async (params) => {
    try {
      const result = await axiosClient.get(API_ENDPOINTS.ADMIN.PRODUCT.GET, {
        params,
      });
      return result.data;
    } catch (e) {
      throw new Error(e?.response.message);
    }
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

  // [ORDERS]
  getOrdersByAdmin: async (params) => {
    try {
      const res = await axiosClient.get(API_ENDPOINTS.ADMIN.ORDERS.GET, {
        params,
      });

      console.log("Res:", res);
      return res.data.data;
    } catch (e) {
      throw new Error(
        e.response?.data?.message || e.message || "Something went wrong",
      );
    }
  },

  getOrderDetail(id) {
    return axiosClient.get(`/admin/orders/${id}`);
  },

  // [VOUCHER]
  async getVouchers(params) {
    try {
      const res = await axiosClient.get(API_ENDPOINTS.ADMIN.VOUCHER.GP, {
        params,
      });

      console.log('res: ', res)
      return res;
    } catch (error) {
      throw error;
    }
  },

  async createVoucher(data) {
    try {
      const res = await axiosClient.post(API_ENDPOINTS.ADMIN.VOUCHER.GP, data);

      console.log('Res create Serivce: ', res)
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
};
