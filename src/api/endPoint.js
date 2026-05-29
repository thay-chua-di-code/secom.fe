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
    GET_CG: "/cart",
    ADD_ITEM: "/cart/items",
    UPDATE_ITEM: (id) => `/cart/items/${id}`,
    APPLY_VOUCHER: "/cart/voucher",
  },
};
