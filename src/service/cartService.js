import axiosClient from "../api/axiosClient";

const BASE_URL = "http://localhost:3001/cart";

export const cartService = {
  getCart: async () => {
    try {
      const response = await axiosClient.get(BASE_URL);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  addCartItem: async (product) => {
    const res = await axiosClient.get(BASE_URL);
    const cart = res.data;

    const existing = cart.items.find((i) => i.productId === product.id);

    let items;

    if (existing) {
      items = cart.items.map((i) =>
        i.productId === product.id
          ? {
              ...i,
              quantity: i.quantity + 1,
              subtotal: (i.quantity + 1) * i.unitPrice,
            }
          : i,
      );
    } else {
      items = [
        ...cart.items,
        {
          cartItemId: `ci-${Date.now()}`,
          productId: product.id,
          productName: product.name,
          sellerId: product.sellerId || null,
          unitPrice: product.price,
          quantity: 1,
          subtotal: product.price,
        },
      ];
    }

    const updatedCart = {
      ...cart,
      items,
      subtotal: items.reduce((s, i) => s + i.subtotal, 0),
      finalTotal: items.reduce((s, i) => s + i.subtotal, 0),
    };

    const result = await axiosClient.put(BASE_URL, updatedCart);
    return result.data;
  },

  updateCartItemQuantity: async (cartItemId, quantity) => {
    console.log("Service call~!");
    const res = await axiosClient.get(BASE_URL);
    const cart = res.data;

    const items = cart.items.map((i) =>
      i.cartItemId === cartItemId
        ? {
            ...i,
            quantity,
            subtotal: i.unitPrice * quantity,
          }
        : i,
    );

    const updatedCart = {
      ...cart,
      items,
      subtotal: items.reduce((s, i) => s + i.subtotal, 0),
      finalTotal: items.reduce((s, i) => s + i.subtotal, 0),
    };

    const result = await axiosClient.put(BASE_URL, updatedCart);
    return result.data;
  },

  applyVoucher: async (code) => {
    try {
      // Fake API tạm thời
      return {
        success: true,
        voucherCode: code,
      };
    } catch (error) {
      throw error;
    }
  },

  deleteCartItem: async (cartItemId) => {
    const res = await axiosClient.get(BASE_URL);
    const cart = res.data;

    const updatedItems = cart.items.filter(
      (item) => item.cartItemId !== cartItemId,
    );

    const updatedCart = {
      ...cart,
      items: updatedItems,
      subtotal: updatedItems.reduce((s, i) => s + i.subtotal, 0),
      finalTotal: updatedItems.reduce((s, i) => s + i.subtotal, 0),
    };

    const result = await axiosClient.put(BASE_URL, updatedCart);
    return result.data;
  },

  calculateCheckout: async () => {
    try {
      const response = await axiosClient.get(BASE_URL);

      const cart = response.data;
      const items = cart.items || [];

      const subtotal = items.reduce(
        (sum, item) => sum + item.unitPrice * item.quantity,
        0,
      );

      return {
        subtotal,
        shippingFee: 30000,
        total: subtotal + 30000,
      };
    } catch (error) {
      throw error;
    }
  },
};
