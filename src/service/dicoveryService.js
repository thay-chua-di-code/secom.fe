import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endPoint";

export const dicoveryService = {
  getHomePg: async () => {
    try {
      const result = await axiosClient.get(API_ENDPOINTS.DICOVERY.HOME_PG);

      console.log("Discovery: ", result);

      return result?.data;
    } catch (e) {
      console.log(e?.response?.data);
    }
  },
};
