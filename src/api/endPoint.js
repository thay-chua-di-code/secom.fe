export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGIN_GG: "/auth/google-login",
    REGISTER: "/auth/register",
    FORGOT_PWD: "/auth/forgot-password",
    RESET_PWD: "/auth/password",
    VERIFY_EMAIL: "/auth/verify-email",
    RESEND_VERTIFICATION: "/auth/resend-vertification",
  },

  USER: {
    PROFILE: "/profile",
  },

  CATEGORY: {
    GET_CG: "/categories",
  },

  PRODUCT: {
    LIST: "/products",
    DETAIL: (id) => `/products/${id}`,
  },

  SELLER: {},

  REVIEW: {},

  PAYMENT: {},

  ORDER: {},

  NOTIFICATION: {},

  DISCOVERY: {},

  CHECKOUT: {
    CALCULATE: "/api/checkout/calculate",
  },

  CHATS: {},

  CART: {
    GET_CG: "/api/cart",
    ADD_ITEM: "/api/cart/items",
    UPDATE_ITEM: (id) => `/api/cart/items/${id}`,
    APPLY_VOUCHER: "/api/cart/voucher",
  },
};
