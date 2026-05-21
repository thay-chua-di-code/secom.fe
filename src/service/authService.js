import axiosClient from "../api/axiosClient";

export const authService = {
  login: async (payload) => {
    return await axiosClient.post("/auth/login", payload);
  },
};
