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

  ADDRESS: {
    GET: "addresses",
    POST: "addresses",
    DELETE: (id) => `addresses/${id}`,
    PATCH: (id) => `addresses/${id}/default`,
    PUT: (id) => `addresses/${id}`,
  },

  ORDER: {
    ORDER_PURCHASE: "/orders/purchased",
    ORDER_DETAIL: (id) => `/orders/${id}`,
  },

  CATEGORY: {
    GET_CG: "/categories",
  },

  DICOVERY: {
    HOME_PG: "/discovery/homepage",
  },

  PRODUCT: {
    LIST: "/products",
    DETAIL: (id) => `/products/${id}`,
  },

  SELLER: {},

  REVIEW: {},

  PAYMENT: {},

  ORDER: {},

  NOTIFICATION: {
    GET: "/notifications",
    MARK_READ: (id) => `notifications/${id}/read`,
    DELETE: (id) => `/notifications/${id}`,
  },

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

  ADMIN: {
    DASHBOARD: "/admin/dashboard",
  },
};
