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
    CANCEL: (id) => `/orders/${id}/cancel`,
    CONFIRM_RECEIVED: (id) => `/buyer/orders/${id}/shipping/confirm-received`,
    RETURN_REQUESTS: (id) => `/orders/${id}/return-requests`,
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
    SEARCH: "/products/search",
    LIST: "/products",
    DETAIL: (id) => `/products/${id}`,
    COMPARE_DESCRIPTIONS: "/products/compare-descriptions",
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
    SHOP_STATUS: "/seller/shop/status",
    SHOP_PROFILE: "/seller/shop/profile",
    DASHBOARD: "/seller/dashboard",
    STATISTICS: (id) => `/sellers/${id}/statistics`,
    FOLLOW: (id) => `/sellers/${id}/follow`,
    FOLLOW_STATUS: (id) => `/sellers/${id}/follow-status`,
    FOLLOWED: "/followed",
    MY_FOLLOWED: "/users/me/followed-sellers",
    VOUCHERS: "/seller/vouchers",
    PRODUCT: (id) =>
      id || id === 0 ? `/seller/products/${id}` : "/seller/products",
    PRODUCT_IMPORT_EXCEL: "/seller/products/import-excel",
    PRODUCT_EXPORT_EXCEL: "/seller/products/export-excel",
    PRODUCT_INVENTORY: (id) => `/seller/products/${id}/inventory`,
    ORDER_STATUS: (id) => `/seller/orders/${id}/status`,
    ORDER_SHIPPING: (id) => `/seller/orders/${id}/shipping`,
    ORDER_DELIVERED: (id) => `/seller/orders/${id}/delivered`,
    RETURN_REQUESTS: "/seller/return-requests",
    RETURN_REQUEST_DETAIL: (id) => `/seller/return-requests/${id}`,
    RETURN_REQUEST_APPROVE: (id) => `/seller/return-requests/${id}/approve`,
    RETURN_REQUEST_REJECT: (id) => `/seller/return-requests/${id}/reject`,
    RETURN_REQUEST_CONFIRM_RECEIVED: (id) =>
      `/seller/return-requests/${id}/confirm-received`,
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

  AI: {
    CHAT: "/ai/chat",
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
      MODERATION_HISTORY: (id) => `/admin/products/${id}/moderation-history`,
    },
    ADMIN_CATEGORIES: {
      GET: "/admin/categories",
      POST: "/admin/categories",
      PUT: (id) => `/admin/categories/${id}`,
      DELETE: (id) => `/admin/categories/${id}`,
      STATUS: (id) => `/admin/categories/${id}/status`,
      STATUS_HISTORY: (id) => `/admin/categories/${id}/status-history`,
    },
    ORDERS: {
      GET: "/admin/orders",
      DETAIL: (id) => `/admin/orders/${id}`,
    },
    VOUCHER: {
      GP: "/admin/vouchers",
      PUT: (id) => `/admin/vouchers/${id}`,
      DELETE: (id) => `/admin/vouchers/${id}`,
      APPROVE: (id) => `/admin/vouchers/${id}/approve`,
      REJECT: (id) => `/admin/vouchers/${id}/reject`,
    },
    FINANCE: {
      SUMMARY: "/admin/finance/money-flow",
      PAYOUTS: "/admin/payouts",
      APPROVE: (id) => `/admin/payouts/${id}/approve`,
      REJECT: (id) => `/admin/payouts/${id}/reject`,
    },
  },
};
