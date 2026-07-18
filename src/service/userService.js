import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endPoint";
import {
  updateUserInfo,
  getOrderHistory,
  getFolloweShop,
  setLoading,
  setError,
  getViewedProduct,
  clearAllViewedProduct,
} from "../redux/slice/userSlice";
import wishlistApi from "../api/wishlistApi";
export const userService = {
  getMyInfo: async () => {
    try {
      const response = await axiosClient.get(API_ENDPOINTS.USER.PROFILE);
      console.log("Profile: ", response);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw error;
    }
  },
  updateProfile: async (payload, dispatch) => {
    try {
      const result = await axiosClient.put(API_ENDPOINTS.USER.PROFILE, payload);

      dispatch(updateUserInfo(result.data.data));

      return result.data.data;
    } catch (e) {
      console.error("Error updating user profile:", e?.response?.data);
      throw e;
    }
  },
  getOrderPurchase: async (dispatch) => {
    try {
      const result = await axiosClient.get(API_ENDPOINTS.ORDER.ORDER_PURCHASE);
      console.log("Order: ", result);
      dispatch(getOrderHistory(result.data.data));
    } catch (e) {
      console.error("Error fetching order purchase:", e?.response?.data);
    }
  },

  // [VIEWED PRODUCT]
  getViewedProductSvc: async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const result = await axiosClient.get("/me/viewed-products");
      if (result) {
        dispatch(getViewedProduct(result.data.data));
      }
    } catch (e) {
      throw new Error(
        e.message || "Something went wrong when get viewed product",
        {
          cause: e,
        },
      );
      dispatch(setError(e.message));
    }
  },

  clearAllViewedProductSvc: async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const result = await axiosClient.delete("/me/viewed-products");
      if (result.data.success) {
        dispatch(clearAllViewedProduct());
      }
    } catch (e) {
      setError(e.message || "Something wrong when you clear");
    }
  },

  // [WISH LIST]
  getWishList: async (params) => {
    try {
      const result = await axiosClient.get(API_ENDPOINTS.USER.WISH_LIST.GET, {
        params,
      });
      return result.data.data;
    } catch (e) {
      throw new Error(e.message || "Something went wrong when get wishlist", {
        cause: e,
      });
    }
  },
  addWishList: async (productId) => {
    const result = await wishlistApi.addToWishlist(productId);
    return result.data.data;
  },
  deleteWishList: async (productId) => {
    const result = await wishlistApi.removeFromWishlist(productId);

    return result.data.data;
  },

  // [FOLLOWED SHOP]
  getFollowedShop:
    ({ pageNumber = 1, pageSize = 10 } = {}) =>
    async (dispatch) => {
      try {
        dispatch(setLoading(true));

        const res = await axiosClient.get("/followed", {
          params: {
            pageNumber,
            pageSize,
          },
        });

        if (res.data.success) {
          dispatch(getFolloweShop(res.data.data));
        }
      } catch (e) {
        dispatch(setError("Get followed shop failed."));
      } finally {
        dispatch(setLoading(false));
      }
    },
};
