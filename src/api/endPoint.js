export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGIN_GG: "/auth/google-login",
    REGISTER: "/auth/register",
    CHANGE_PWD: "/auth/password",
    FORGOT_PWD: "/auth/forgot-password",
    SET_PWD: "/auth/reset-password",
    VERIFY_EMAIL: "/auth/verify-email",
    RESEND_VERTIFICATION: "/auth/resend-vertification",
    LOG_OUT: "/auth/logout",
  },

  USER: {
    PROFILE: "/profile",
  },

  ORDER: {
    ORDER_PURCHASE: "/orders/purchased",
    ORDER_DETAIL: (id) => `/orders/${id}`,
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
