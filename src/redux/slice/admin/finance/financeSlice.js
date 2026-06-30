import { createSlice } from "@reduxjs/toolkit";
import {
  fetchFinanceSummary,
  approvePayout,
  rejectPayout,
} from "./financeThunk";

const initialState = {
  summary: {
    totalGMV: 0,
    totalPlatformRevenue: 0,
    totalPlatformFee: 0,
    totalRefundAmount: 0,
    totalSellerPayoutAmount: 0,
    totalPendingWithdrawalAmount: 0,
    totalCompletedWithdrawalAmount: 0,
    totalFailedWithdrawalAmount: 0,
    netRevenue: 0,
  },
  loading: false,
  payoutLoading: false,
  error: null,
};

const financeSlice = createSlice({
  name: "financeAdmin",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // ================= Summary =================

      .addCase(fetchFinanceSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchFinanceSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload;
      })

      .addCase(fetchFinanceSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= Approve =================

      .addCase(approvePayout.pending, (state) => {
        state.payoutLoading = true;
        state.error = null;
      })

      .addCase(approvePayout.fulfilled, (state) => {
        state.payoutLoading = false;
      })

      .addCase(approvePayout.rejected, (state, action) => {
        state.payoutLoading = false;
        state.error = action.payload;
      })

      // ================= Reject =================

      .addCase(rejectPayout.pending, (state) => {
        state.payoutLoading = true;
        state.error = null;
      })

      .addCase(rejectPayout.fulfilled, (state) => {
        state.payoutLoading = false;
      })

      .addCase(rejectPayout.rejected, (state, action) => {
        state.payoutLoading = false;
        state.error = action.payload;
      });
  },
});

export default financeSlice.reducer;
