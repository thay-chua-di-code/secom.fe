import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sellerService } from "../../../../service/sellerService";

export const getSellerOrdersThunk = createAsyncThunk(
  "sellerOrder/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await sellerService.getOrdersSeller();
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const initialState = {
  orders: [],
  loading: false,
  error: "",
  loaded: false,
};

const sellerOrderSlice = createSlice({
  name: "sellerOrder",
  initialState,
  reducers: {
    clearSellerOrders(state) {
      state.orders = [];
      state.loaded = false;
      state.error = "";
    },

    resetSellerOrderCache(state) {
      state.loaded = false;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(getSellerOrdersThunk.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(getSellerOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.loaded = true;
      })

      .addCase(getSellerOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSellerOrders, resetSellerOrderCache } =
  sellerOrderSlice.actions;

export default sellerOrderSlice.reducer;
