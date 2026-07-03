import axiosClient from "./axiosClient";
import { API_ENDPOINTS } from "./endPoint";

export const wishlistApi = {
  addToWishlist(productId) {
    return axiosClient.post(API_ENDPOINTS.USER.WISH_LIST.POST(productId));
  },

  removeFromWishlist(productId) {
    return axiosClient.delete(API_ENDPOINTS.USER.WISH_LIST.DELETE(productId));
  },
};

export const addToWishlist = wishlistApi.addToWishlist;
export const removeFromWishlist = wishlistApi.removeFromWishlist;

export default wishlistApi;
