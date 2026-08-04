/* eslint-disable preserve-caught-error */
import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endPoint";

const unwrapApiData = (response) => {
  const body = response.data;

  if (body?.data !== undefined) return body.data;
  return body;
};

const normalizeAiResponse = (data) => {
  const message = data?.message ?? data?.reply ?? data?.content ?? "";
  const productReferences = data?.productReferences ?? data?.products ?? [];

  return {
    ...data,
    message,
    productReferences: Array.isArray(productReferences) ? productReferences : [],
  };
};

const getApiErrorMessage = (error, fallback) => {
  if (error?.code === "ERR_CANCELED" || error?.name === "CanceledError") {
    return "Request canceled";
  }

  const status = error?.response?.status;

  if (status === 400) return error?.response?.data?.message || "Invalid content.";
  if (status === 401) return "Your session has expired.";
  if (status === 403) return "You do not have permission to use AI chat.";
  if (status === 429) return "You sent too many requests. Please try again later.";
  if (status === 502 || status === 503) return "The AI service is temporarily unavailable.";
  if (!error?.response) return "Unable to connect to the server.";

  return error?.response?.data?.message || error?.message || fallback;
};

export const aiService = {
  chatAi: async (payload, signal) => {
    try {
      const response = await axiosClient.post(API_ENDPOINTS.AI.CHAT, payload, {
        signal,
      });
      const data = unwrapApiData(response);

      const normalizedData = normalizeAiResponse(data);

      if (!normalizedData.message) {
        throw new Error("AI response does not contain a message.");
      }

      return normalizedData;
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Unable to send AI message."));
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
