export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    LOGIN_GG: "/auth/google-login",
    REGISTER: "/auth/register",
  },

  USER: {
    PROFILE: "/users/profile",
  },

  PRODUCT: {
    LIST: "/products",
    DETAIL: (id) => `/products/${id}`,
  },
};
