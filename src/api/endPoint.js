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
    ORDER_PURCHASE_PAGED: "/orders/purchased/paged",
    ORDER_DETAIL: (id) => `/orders/${id}`,
    CREATE: "/orders",
    DELETE: (id) => `/orders/${id}`,
  },

  CATEGORY: {
    GET_CG: "/categories",
  },

  DICOVERY: {
    HOME_PG: "/discovery/homepage",
  },

  DISCOVERY: {
    HOMEPAGE: "/discovery/homepage",
  },

  PRODUCT: {
    LIST: "/products",
    DETAIL: (id) => `/products/${id}`,
    CREATE_RV: (id) => `/products/${id}/reviews`,
    IMAGES: {
      LIST: (productId) => `/products/${productId}/images`,
      UPLOAD: (productId) => `/products/${productId}/images`,
      PRIMARY: (productId, imageId) =>
        `/products/${productId}/images/${imageId}/primary`,
      UPDATE: (productId, imageId) =>
        `/products/${productId}/images/${imageId}`,
      DELETE: (productId, imageId) =>
        `/products/${productId}/images/${imageId}`,
      ORDER: (productId) => `/products/${productId}/images/order`,
    },
  },

  SELLER: {
    REGISTER: "/seller/shop/register",
    DASHBOARD: "/seller/dashboard",
    STATISTICS: (id) => `/sellers/${id}/statistics`,
    FOLLOW: (id) => `/sellers/${id}/follow`,
    FOLLOW_STATUS: (id) => `/sellers/${id}/follow-status`,
    FOLLOWED: "/followed",
    MY_FOLLOWED: "/users/me/followed-sellers",
    PRODUCT: (id) =>
      id || id === 0 ? `/seller/products/${id}` : "/seller/products",
    BANK: {
      GP: "/seller/bank-accounts",
      DELETE: (id) => `/seller/bank-accounts/${id}`,
    },
  },

  REVIEW: {},

  PAYMENT: {
    TRANSACTIONS: "/payments/transactions",
    ORDER_TRANSACTION: (orderId) => `/payments/orders/${orderId}/transaction`,
    PAYOS_VERIFY: "/payments/payos/verify",
  },

  VOUCHER: {
    PUBLIC: "/vouchers",
  },

  NOTIFICATION: {
    GET: "/notifications",
    MARK_READ: (id) => `notifications/${id}/read`,
    DELETE: (id) => `/notifications/${id}`,
  },

  CHECKOUT: {
    CALCULATE: "/checkout/calculate",
  },

  CHATS: {
    GET_CHATS: "/chats",
    CREATE_THREAD: "/chats/threads",
    GET_CHAT_DETAIL: (id) => `/chats/${id}`,
    SEND_MESSAGE: (id) => `/chats/${id}/messages`,
    MARK_READ: (id) => `/chats/${id}/messages/read`,
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
      BANK: {},
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
    ORDERS: {
      GET: "/admin/orders",
      DETAIL: (id) => `/admin/orders/${id}`,
    },
    VOUCHER: {
      GP: "/admin/vouchers",
      PUT: (id) => `/admin/vouchers/${id}`,
    },
    FINANCE: {
      SUMMARY: "/admin/finance/money-flow",
      APR: (id) => `/admin/finance/${id}/approve`,
      REJ: (id) => `/admin/finance/${id}/reject`,
    },
  },
};
