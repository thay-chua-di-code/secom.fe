import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endPoint";
export const authService = {
  login: async (payload) => {
    try {
      console.log(payload);
      const result = await axiosClient.post(API_ENDPOINTS.AUTH.LOGIN, payload);
      console.log("return: ", result);
      return result;
    } catch (e) {
      console.error(e?.response?.data);
    }
  },
  loginGoogle: async (payload) => {
    try {
      console.log("Payload:", payload.idToken);
      const result = await axiosClient.post(API_ENDPOINTS.AUTH.LOGIN_GG, {
        idToken: payload.idToken.credential,
      });
      console.log(result);
      return result;
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
};
