import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endPoint";

export const cartService = {
  getCart: async () => {
    try {
      const response = await axiosClient.get(API_ENDPOINTS.CART.GET_CG);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addCartItem: async (payload) => {
    try {
      const response = await axiosClient.post(API_ENDPOINTS.CART.ADD_ITEM, payload);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateCartItemQuantity: async (cartItemId, quantity) => {
    try {
      const response = await axiosClient.put(
        API_ENDPOINTS.CART.UPDATE_ITEM(cartItemId),
        { quantity }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  applyVoucher: async (code) => {
    try {
      const response = await axiosClient.put(
        API_ENDPOINTS.CART.APPLY_VOUCHER,
        { code }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  calculateCheckout: async () => {
    try {
      const response = await axiosClient.get(API_ENDPOINTS.CHECKOUT.CALCULATE);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
