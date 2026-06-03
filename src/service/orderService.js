import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endPoint";

export const orderService = {
  orderPurchased: () => axiosClient.get(API_ENDPOINTS.ORDER.ORDER_PURCHASE),
};
