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
  PRODUCT_DETAIL: "/product/:id",
  PROFILE: "/profile",
  NOTIFICATIONS: "/notifications",
  // [PRODUCT]
  DETAIL: `/product-detail/:id`,
  // [SELLER]
  SELLER: {
    REGISTER: "/seller-register",
  },
};

export const ADMIN_ROUTES = {
  ADMIN_DASHBOARD: "",
  ADMIN_USERS: "users",
  ADMIN_PRODUCTS: "products",
  ADMIN_ORDERS: "orders",
};
