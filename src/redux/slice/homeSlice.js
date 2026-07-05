import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { dicoveryService } from "../../service/dicoveryService";

const getHomepageData = (response) =>
  response.data?.data ?? response.data?.Data;

const mapProduct = (product) => ({
  ...product,
  id: product.id,
  name: product.name,
  title: product.name,
  price: product.price || 0,
  images: product.primaryImageUrl ? [product.primaryImageUrl] : [],
  primaryImageUrl: product.primaryImageUrl,
  condition: product.condition,
  location: product.location,
  categoryName: product.categoryName,
  viewCount: product.viewCount,
  createdAtUtc: product.createdAtUtc,
});

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
      console.log(response);
      return getHomepageData(response);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || "Something went wrong");
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
        const homepageData = action.payload || {};

        state.loading = false;
        state.banners = homepageData.banners || [];
        state.featuredCategories = homepageData.featuredCategories || [];
        state.featuredProducts = (homepageData.featuredProducts || []).map(
          mapProduct,
        );
        state.latestProducts = (homepageData.latestProducts || []).map(
          mapProduct,
        );
      })

      .addCase(fetchHomepage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default homeSlice.reducer;
