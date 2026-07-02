import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSellerBankAccounts,
  createSellerBankAccount,
  deleteSellerBankAccount,
} from "./bankingThunk";

const initialState = {
  bankAccounts: [],
  loading: false,
  actionLoading: false,
  error: null,
};

const sellerBankingSlice = createSlice({
  name: "sellerBanking",
  initialState,
  reducers: {
    clearSellerBankingError(state) {
      state.error = null;
    },

    resetSellerBankingState() {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    // GET ALL
    builder
      .addCase(fetchSellerBankAccounts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerBankAccounts.fulfilled, (state, action) => {
        state.loading = false;
        state.bankAccounts = action.payload;
      })
      .addCase(fetchSellerBankAccounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // CREATE
    builder
      .addCase(createSellerBankAccount.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(createSellerBankAccount.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.bankAccounts.unshift(action.payload);
      })
      .addCase(createSellerBankAccount.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });

    // DELETE
    builder
      .addCase(deleteSellerBankAccount.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(deleteSellerBankAccount.fulfilled, (state, action) => {
        state.actionLoading = false;

        state.bankAccounts = state.bankAccounts.filter(
          (item) => item.id !== action.payload,
        );
      })
      .addCase(deleteSellerBankAccount.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSellerBankingError, resetSellerBankingState } =
  sellerBankingSlice.actions;

export default sellerBankingSlice.reducer;
