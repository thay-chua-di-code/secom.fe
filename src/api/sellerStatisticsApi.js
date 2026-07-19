import axiosClient from "./axiosClient";
import { API_ENDPOINTS } from "./endPoint";

export const getSellerStatistics = async (sellerId, signal) => {
  const response = await axiosClient.get(
    API_ENDPOINTS.SELLER.STATISTICS(sellerId),
    { signal },
  );

  return response.data?.data ?? response.data;
};
