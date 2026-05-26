import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endPoint";
export const authService = {
  login: async (payload, dispatch) => {
    try {
      const result = await axiosClient.post(API_ENDPOINTS.AUTH.LOGIN, payload);
      if (result.data) {
        localStorage.setItem("accessToken", response.data.accessToken);
        await dispatch(getMyInfo());
      }
    } catch (e) {
      console.error(e?.response?.data);
    }
  },
  loginGoogle: async (idToken) => {
    try {
      const result = await axiosClient.post(API_ENDPOINTS.AUTH.LOGIN_GG, {
        idToken,
      });
      console.log(result);
      return result.data;
    } catch (e) {
      console.log(e?.response?.data);
    }
  },
  register: async (payload) => {
    try {
      const result = await axiosClient.post(
        API_ENDPOINTS.AUTH.REGISTER,
        payload,
      );
      console.log("result: ", result);
      return result;
    } catch (e) {
      console.error(e?.response?.data);
    }
  },
  forgot_pwd: async (payload) => {
    try {
      const result = await axiosClient.post(
        API_ENDPOINTS.AUTH.FORGOT_PWD,
        payload,
      );
      return result;
    } catch (e) {
      console.error(e?.response?.data);
    }
  },
};
