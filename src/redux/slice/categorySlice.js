import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_ENDPOINTS } from "../../api/endPoint";
import axios from "axios";
import { categoriesService } from "../../service/categoriesService";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",

  async (_, thunkAPI) => {
    try {
      const response = await categoriesService.getCategories();
      console.log("Response: ", response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  },
);

const initialState = {
  categories: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;

        state.categories = action.payload;
      })

      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

export default categoriesSlice.reducer;
