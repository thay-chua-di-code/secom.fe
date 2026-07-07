import axiosClient from "../api/axiosClient";

export const aiService = {
  chatAi: async (message) => {
    try {
      const res = await axiosClient.post("/ai/chatbot/message", {
        message,
      });

      console.log(res);
      return res.data.data;
    } catch (e) {
      throw new Error(e?.response?.data?.message || e.message);
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
    // CategoriHint, ProductNameHint, BrandHint, OriginalPrice, Currency
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
