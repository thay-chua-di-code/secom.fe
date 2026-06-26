import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endPoint";
import {
  getCategories,
  setLoading,
  setError,
} from "../redux/slice/categoriesSlice";
export const categoriesService = {
  getCategories: async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const result = await axiosClient.get(API_ENDPOINTS.CATEGORY.GET_CG);

      dispatch(getCategories(result.data.data));

      return result.data.data;
    } catch (e) {
      dispatch(setError(e?.response?.data));
    } finally {
      dispatch(setLoading(false));
    }
  },
};
