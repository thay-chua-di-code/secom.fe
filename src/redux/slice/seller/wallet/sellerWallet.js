import { createSlice } from "@reduxjs/toolkit";
import { getSellerWalletThunk } from "./thunk";

const initialState = {
  wallet: null,

  loading: false,
  error: null,
};

const sellerWalletSlice = createSlice({
  name: "sellerWallet",
  initialState,
  reducers: {
    clearWallet(state) {
      state.wallet = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSellerWalletThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getSellerWalletThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.wallet = action.payload;
      })

      .addCase(getSellerWalletThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearWallet } = sellerWalletSlice.actions;

export default sellerWalletSlice.reducer;