import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endPoint";
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

  // [PRODUCT]

  getProducts: async (pageNumber = 1, pageSize = 10) => {
    try {
      console.log("Call me service");
      const result = await axiosClient.get(API_ENDPOINTS.SELLER.PRODUCT, {
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
      console.log("Call me");
      const result = await axiosClient.post(API_ENDPOINTS.SELLER.PRODUCT, data);

      console.log("Service: ", result);
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

  updateInventory: async (productId, quantity) => {
    try {
      const result = await axiosClient.put(
        API_ENDPOINTS.SELLER.PRODUCT(productId),
        {
          quantity,
        },
      );

      return result.data.data;
    } catch (e) {
      throw new Error(e?.response?.data?.message || "Update inventory failed");
    }
  },
};
