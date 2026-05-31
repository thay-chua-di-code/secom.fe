import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dicoveryService } from "../../service/dicoveryService";
const initialState = {
  banners: [],
  featuredCategories: [],
  featuredProducts: [],
  latestProducts: [],
  loading: false,
  error: null,
};

export const fetchHomepage = createAsyncThunk(
  "home/fetchHomepage",
  async (_, thunkAPI) => {
    try {
      const response = await dicoveryService.getHomePg();
      return response?.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong",
      );
    }
  },
);

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchHomepage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchHomepage.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload.banners;
        state.featuredCategories = action.payload.featuredCategories;
        state.featuredProducts = action.payload.featuredProducts;
        state.latestProducts = action.payload.latestProducts;
      })

      .addCase(fetchHomepage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default homeSlice.reducer;
