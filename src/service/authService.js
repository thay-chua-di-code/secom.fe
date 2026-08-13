import axiosClient, { setAuthToken } from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endPoint";
import { logout } from "../redux/slice/authSlice";
import { resetSellerStatus } from "../redux/slice/sellerStatusSlice";
import { clearUserInfo } from "../redux/slice/userSlice";

const persistAuthTokens = (data) => {
  if (data?.accessToken) {
    localStorage.setItem("token", data.accessToken);
    setAuthToken(data.accessToken);
  }

  if (data?.refreshToken) {
    localStorage.setItem("refreshToken", data.refreshToken);
  }
};

export const authService = {
  login: async (payload) => {
    const result = await axiosClient.post(API_ENDPOINTS.AUTH.LOGIN, payload);
    const data = result.data.data;

    persistAuthTokens(data);
    return data;
  },
  loginGoogle: async (idToken) => {
    const result = await axiosClient.post(API_ENDPOINTS.AUTH.LOGIN_GG, {
      idToken,
    });
    const data = result.data.data;

    persistAuthTokens(data);
    return data;
  },
  logout: async (dispatch) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      const result = await axiosClient.post(
        API_ENDPOINTS.AUTH.LOG_OUT,
        { refreshToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      return result.data;
    } catch (e) {
      if (import.meta.env.DEV) {
        console.error(
          "[Auth] Logout API failed",
          e?.response?.data || e.message,
        );
      }
      return null;
    } finally {
      dispatch(clearUserInfo());
      dispatch(resetSellerStatus());
      dispatch(logout());
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    }
  },
  register: async (payload) => {
    try {
      const result = await axiosClient.post(
        API_ENDPOINTS.AUTH.REGISTER,
        payload,
      );

      return result;
    } catch (e) {
      throw new Error(e?.response?.data?.message || e.message, { cause: e });
    }
  },
  reset_pwd: async (payload) => {
    try {
      const result = await axiosClient.post(
        API_ENDPOINTS.AUTH.SET_PWD,
        payload,
      );
      return result.data;
    } catch (e) {
      throw new Error(
        e?.response?.data?.message || e?.response?.data?.title || e.message,
        { cause: e },
      );
    }
  },
  forgot_pwd: async (payload) => {
    try {
      const result = await axiosClient.post(
        API_ENDPOINTS.AUTH.FORGOT_PWD,
        payload,
      );
      return result.data;
    } catch (e) {
      throw new Error(
        e?.response?.data?.message || e?.response?.data?.title || e.message,
        { cause: e },
      );
    }
  },
  verify_account: async (payload) => {
    try {
      const result = await axiosClient.post(
        API_ENDPOINTS.AUTH.VERIFY_EMAIL,
        payload,
      );

      return result;
    } catch (e) {
      console.error(e?.response?.data);
    }
  },
  change_password: async (payload) => {
    try {
      const result = await axiosClient.put(
        API_ENDPOINTS.AUTH.CHANGE_PWD,
        payload,
      );

      console.log(result);
      return result;
    } catch (e) {
      console.error(e?.response?.data);
    }
  },
};
