export const ROUTES = {
  // [AUTH]
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PWD: "/forgot-password",
  VERIFY: "/verify-email",
  CHANGE_PWD: "/password",
  RS_PWD: "/reset-password",
  // [NORMAL]
  HOME: "/",
  CART: "/cart",
  DASHBOARD: "/dashboard",
  // [Need fix] => /:id
  // [PRODUCT]
  PRODUCT: {
    PRODUCT_DETAIL: "/product-detail/:id",
    PRODUCTS: "/products",
  },

  PROFILE: "/profile",
  SELF: {
    WISH_LIST: "/wish-list",
    ORDER_SELF: "/order-self",
  },

  NOTIFICATIONS: "/notifications",
  // [SELLER]
  SELLER: {
    REGISTER: "/seller-register",
    MAIN_PAGE: "/seller",
    DASHBOARD: "/seller/dashboard",
    PRODUCTS: "/seller/products",
    ORDERS: "/seller/orders",
    CUSTOMERS: "/seller/customers",
    REVENUE: "/seller/revenue",
    SETTINGS: "/seller/settings",
    DETAIL: `/seller/detail/:id`,
  },
};

export const ADMIN_ROUTES = {
  ADMIN_DASHBOARD: "",
  ADMIN_USERS: "users",
  ADMIN_PRODUCTS: "products",
  ADMIN_ORDERS: "orders",
  ADMIN_CATEGORIES: "categories",
  ADMIN_SELLER: "seller",
  ADMIN_VOUCHER: "vouchers",
};
