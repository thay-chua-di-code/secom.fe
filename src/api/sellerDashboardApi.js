import axiosClient from "./axiosClient";
import { API_ENDPOINTS } from "./endPoint";

export const getSellerDashboard = async () => {
  const response = await axiosClient.get(API_ENDPOINTS.SELLER.DASHBOARD);

  return response.data?.data ?? response.data;
};
