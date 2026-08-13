import axios from "axios";
import { API_BASE_URL } from "../config/api";

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token) => {
  if (token) {
    axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axiosClient.defaults.headers.common["Authorization"];
  }
};

let logoutHandler = null;

export const setLogoutHandler = (fn) => {
  logoutHandler = fn;
};

axiosClient.interceptors.request.use((config) => {
  if (config?.skipAuth) {
    if (config.headers) {
      delete config.headers.Authorization;
      delete config.headers.authorization;
    }
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !error.config?.skipAuth) {
      logoutHandler?.();
      localStorage.clear();
    }

    return Promise.reject(error);
  },
);

export default axiosClient;
