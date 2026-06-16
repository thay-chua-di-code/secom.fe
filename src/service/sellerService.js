import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endPoint";
export const sellerService = {
  becomeSeller: async (payload) => {
    try {
      console.log("payload:", payload);
      const result = await axiosClient.post(
        API_ENDPOINTS.SELLER.REGISTER,
        payload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log(result);

      return result;
    } catch (e) {
      throw new Error(
        e?.response?.data?.message ||
          "Something went wrong when registering seller",
      );
    }
  },
};
