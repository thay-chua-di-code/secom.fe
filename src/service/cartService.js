import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endPoint";

export const cartService = {
  getCart: async () => {
    const response = await axiosClient.get(API_ENDPOINTS.CART.GET_CG);
    return response.data;
  },

  addCartItem: async ({ productId, quantity = 1 }) => {
    const response = await axiosClient.post(API_ENDPOINTS.CART.ADD_ITEM, {
      productId,
      quantity,
    });

    return response.data;
  },

  updateCartItemQuantity: async (cartItemId, quantity) => {
    const response = await axiosClient.put(API_ENDPOINTS.CART.UPDATE_ITEM(cartItemId), {
      quantity,
    });

    return response.data;
  },

  applyVoucher: async (code) => {
    const normalizedCode = String(code?.code ?? code ?? "").trim();

    if (!normalizedCode) {
      throw new Error("Voucher code is required.");
    }

    const response = await axiosClient.put(API_ENDPOINTS.CART.APPLY_VOUCHER, {
      code: normalizedCode,
    });

    return response.data;
  },

  removeVoucher: async () => {
    const response = await axiosClient.delete(API_ENDPOINTS.CART.APPLY_VOUCHER);

    return response.data;
  },

  deleteCartItem: async (cartItemId) => {
    const response = await axiosClient.delete(API_ENDPOINTS.CART.UPDATE_ITEM(cartItemId));
    return response.data;
  },

  calculateCheckout: async () => {
    const response = await axiosClient.get(API_ENDPOINTS.CHECKOUT.CALCULATE);
    return response.data;
  },
};
