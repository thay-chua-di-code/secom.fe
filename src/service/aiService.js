/* eslint-disable preserve-caught-error */
import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endPoint";

const unwrapApiData = (response) => {
  const body = response.data;

  if (body?.data !== undefined) return body.data;
  return body;
};

const getApiErrorMessage = (error, fallback) => {
  if (error?.code === "ERR_CANCELED" || error?.name === "CanceledError") {
    return "Request canceled";
  }

  const status = error?.response?.status;

  if (status === 400) return error?.response?.data?.message || "Nội dung không hợp lệ.";
  if (status === 401) return "Phiên đăng nhập đã hết hạn.";
  if (status === 403) return "Bạn không có quyền sử dụng AI chat.";
  if (status === 429) return "Bạn gửi quá nhiều yêu cầu. Vui lòng thử lại sau.";
  if (status === 502 || status === 503) return "Dịch vụ AI đang tạm thời không khả dụng.";
  if (!error?.response) return "Không thể kết nối tới máy chủ.";

  return error?.response?.data?.message || error?.message || fallback;
};

export const aiService = {
  chatAi: async (payload, signal) => {
    try {
      const response = await axiosClient.post(API_ENDPOINTS.AI.CHAT, payload, {
        signal,
      });
      const data = unwrapApiData(response);

      if (!data?.message) {
        throw new Error("AI response không chứa message.");
      }

      return data;
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Không gửi được tin nhắn AI."));
    }
  },

  similarProduct: async (productId) => {
    try {
      const res = await axiosClient.get("/ai/recommendations/similar", {
        params: {
          productId: productId,
          page: 1,
          pageSize: 5,
        },
      });

      return res.data;
    } catch (e) {
      console.log(e.response?.data);
      throw new Error(e?.response?.data?.message || e.message);
    }
  },

  recommendByCategories: async (categoryId) => {
    try {
      const res = await axiosClient.get("/ai/recommendations/products", {
        params: {
          categoryId: categoryId,
          page: 1,
          pageSize: 5,
        },
      });

      return res.data;
    } catch (e) {
      console.log(e.response?.data);
      throw new Error(e?.response?.data?.message || e.message);
    }
  },

  productPricePredict: async (params) => {
    try {
      const res = await axiosClient.get("/ai/product-price-predict", {
        params: params,
      });

      return res.data;
    } catch (e) {
      console.log(e.response?.data);
      throw new Error(e?.response?.data?.message || e.message);
    }
  },
};
