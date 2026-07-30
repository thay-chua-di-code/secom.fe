import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminService } from "../../../../service/adminService";

const initialState = {
  products: [],
  pagination: {
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
  },
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "adminProduct/fetchProducts",
  async (params, thunkAPI) => {
    try {
      const response = await adminService.getProducts(params);

      return response?.data ?? response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Load products failed",
      );
    }
  },
);

const productAdminSlice = createSlice({
  name: "productsAdmin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload?.data ?? action.payload ?? {};

        state.products = Array.isArray(payload.items) ? payload.items : [];

        state.pagination = {
          pageNumber: payload.pageNumber ?? initialState.pagination.pageNumber,
          pageSize: payload.pageSize ?? initialState.pagination.pageSize,
          totalCount: payload.totalCount ?? initialState.pagination.totalCount,
          totalPages: payload.totalPages ?? initialState.pagination.totalPages,
        };
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productAdminSlice.reducer;
