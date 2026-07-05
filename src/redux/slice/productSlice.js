import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dicoveryService } from "../../service/dicoveryService";
import productApi from "../../api/productApi";

const initialState = {
  products: [],
  productSearch: [],
  productFilter: [],
  productDetail: null,

  pagination: {
    page: 1,
    limit: 12,
    totalPages: 1,
    totalItems: 0,
  },

  filters: {
    keyword: "",
    categoryId: null,
    minPrice: null,
    maxPrice: null,
    sort: "newest",
  },

  loading: false,
  error: null,
};

export const fetchProductDetailThunk = createAsyncThunk(
  "product/fetchProductDetail",
  async (productId, thunkAPI) => {
    try {
      const response = await productApi.getProductDetail(productId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch product detail",
      );
    }
  },
);

export const fetchProductsByCategory = createAsyncThunk(
  "product/fetchProductsByCategory",
  async (categoryId, thunkAPI) => {
    try {
      const response = await dicoveryService.getProductByCategory(categoryId, {
        page: 1,
        pageSize: 20,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Failed to fetch products",
      );
    }
  },
);

export const searchProductsThunk = createAsyncThunk(
  "product/searchProducts",
  async (params, thunkAPI) => {
    try {
      const response = await dicoveryService.getProductByKeyWord(params);
      const data = response.data.data;

      return {
        items: data.items,
        pagination: {
          page: data.pageNumber,
          limit: data.pageSize,
          totalPages: data.totalPages,
          totalItems: data.totalCount,
        },
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to search products",
      );
    }
  },
);

const productSlice = createSlice({
  name: "products",
  initialState,

  reducers: {
    setFilters(state, action) {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },

    resetFilters(state) {
      state.filters = initialState.filters;
    },

    clearProductDetail(state) {
      state.productDetail = null;
    },

    clearProducts(state) {
      state.products = [];
      state.productSearch = [];
    },

    getProduct(state, action) {
      const data = action.payload || {};

      const products = [
        ...(data.featuredProducts || []),
        ...(data.latestProducts || []),
      ];

      state.products = Array.from(
        new Map(products.map((item) => [item.id, item])).values(),
      );
    },
  },

  extraReducers: (builder) => {
    builder
      // =========================
      // Fetch products by category
      // =========================
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.productFilter = action.payload;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =========================
      // Product Detail
      // =========================
      .addCase(fetchProductDetailThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetailThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetail = action.payload;
      })
      .addCase(fetchProductDetailThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // =========================
      // Search Products
      // =========================
      .addCase(searchProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.productSearch = action.payload.items;
        state.pagination = action.payload.pagination;
      })
      .addCase(searchProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, resetFilters, clearProductDetail, clearProducts, getProduct } =
  productSlice.actions;

export default productSlice.reducer;
