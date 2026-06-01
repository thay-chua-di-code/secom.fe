import {
  deleteAddress,
  getAddress,
  setAddresses,
} from "../redux/slice/userSlice";
import { API_ENDPOINTS } from "../api/endPoint";
import axiosClient from "../api/axiosClient";

export const addressService = {
  getAddress: async (dispatch) => {
    try {
      const result = await axiosClient.get(API_ENDPOINTS.ADDRESS.GET);
      dispatch(getAddress(result.data.data));
      return result.data.data;
    } catch (e) {
      throw e;
    }
  },

  createAddress: async (payload, dispatch) => {
    try {
      console.log(payload);
      const result = await axiosClient.post(
        API_ENDPOINTS.ADDRESS.POST,
        payload,
      );
      console.log(result);
      dispatch(setAddresses(result.data.data));
      return result.data;
    } catch (e) {
      throw e;
    }
  },

  deleteAdress: async (id, dispatch) => {
    try {
      const result = await axiosClient.delete(API_ENDPOINTS.ADDRESS.DELETE(id));
      if (result.data.success) {
        dispatch(deleteAddress(id));
      }

      return result.data;
    } catch (e) {
      throw e;
    }
  },
};
