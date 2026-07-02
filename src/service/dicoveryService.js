import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endPoint";

export const dicoveryService = {
  getHomePg: async () => {
    try {
      const result = await axiosClient.get(API_ENDPOINTS.DISCOVERY.HOMEPAGE);

      return result;
    } catch (e) {
      throw new Error(e?.response?.data?.message || "Get homepage failed", {
        cause: e,
      });
    }
  },
};
