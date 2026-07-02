import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dicoveryService } from "../../service/dicoveryService";
const initialState = {
  products: [],

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
      state.productsCategory = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, resetFilters, clearProductDetail, clearProducts } =
  productSlice.actions;

export default productSlice.reducer;
