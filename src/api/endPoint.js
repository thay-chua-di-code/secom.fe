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
    WISH_LIST: {
      GET: "/wishlist",
      POST: (id) => `/wishlist/${id}`,
      DELETE: (id) => `/wishlist/${id}`,
    },
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

  SELLER: {
    REGISTER: "/seller/shop/register",
    PRODUCT: (id) =>
      id || id === 0 ? `/seller/products/${id}` : "/seller/products",
  },

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

  CHATS: {
    GET_CHATS: "/chats",
    GET_CAHT_DETAIL: (id) => `/chats/${id}`,
    CREATE_CHAT: (id) => `/chats/${id}/message`,
  },

  CART: {
    GET_CG: "/cart",
    ADD_ITEM: "/cart/items",
    UPDATE_ITEM: (id) => `/cart/items/${id}`,
    APPLY_VOUCHER: "/cart/voucher",
  },

  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    USER: {
      GET: "/admin/users",
      LOCK: (id) => `/admin/users/${id}/lock`,
      UNLOCK: (id) => `/admin/users/${id}/unlock`,
    },
    SELLER: {
      GET: "/admin/seller-shops/pending",
      GET_ID: (id) => `/admin/seller-shop/${id}`,
      APPROVE: (id) => `/admin/seller-shops/${id}/approve`,
      REJECT: (id) => `/admin/seller-shops/${id}/reject`,
    },
    PRODUCT: {
      GET: "/admin/products",
      APPROVE: (id) => `/admin/products/${id}/approve`,
      REJECT: (id) => `/admin/products/${id}/reject`,
    },
    ADMIN_CATEGORIES: {
      GET: "/admin/categories",
      POST: "/admin/categories",
      PUT: (id) => `/admin/categories/${id}`,
      DELETE: (id) => `/admin/categories/${id}`,
    },
  },
};
