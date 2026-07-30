import { createSlice } from "@reduxjs/toolkit";
import {
  fetchFinanceSummary,
  fetchAdminPayouts,
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
  payouts: [],
  payoutsPagination: {
    pageNumber: 1,
    pageSize: 20,
    totalCount: 0,
    totalPages: 0,
  },
  payoutsLoading: false,
  payoutsError: null,
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

      // ================= Payouts =================

      .addCase(fetchAdminPayouts.pending, (state) => {
        state.payoutsLoading = true;
        state.payoutsError = null;
      })

      .addCase(fetchAdminPayouts.fulfilled, (state, action) => {
        state.payoutsLoading = false;
        const payload = action.payload?.data ?? action.payload ?? {};

        state.payouts = Array.isArray(payload.items) ? payload.items : [];
        state.payoutsPagination = {
          pageNumber: payload.pageNumber ?? initialState.payoutsPagination.pageNumber,
          pageSize: payload.pageSize ?? initialState.payoutsPagination.pageSize,
          totalCount: payload.totalCount ?? initialState.payoutsPagination.totalCount,
          totalPages: payload.totalPages ?? initialState.payoutsPagination.totalPages,
        };
      })

      .addCase(fetchAdminPayouts.rejected, (state, action) => {
        state.payoutsLoading = false;
        state.payouts = [];
        state.payoutsError = action.payload;
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
