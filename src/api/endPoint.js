export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
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
