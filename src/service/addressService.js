import { getAddress } from "../redux/slice/userSlice";
import { API_ENDPOINTS } from "../api/endPoint";
import axiosClient from "../api/axiosClient";
export const addressService = {
  getAddress: async (dispatch) => {
    try {
      const result = await axiosClient.get(API_ENDPOINTS.ADDRESS.GET);
      console.log(result);
      dispatch(getAddress(result.data.data));

      return result.data.data;
    } catch (e) {
      throw e;
    }
  },
};
