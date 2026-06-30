import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAdminVouchers,
  createAdminVoucher,
  updateAdminVoucher,
} from "./voucherThunk";

const initialState = {
  vouchers: [],

  pagination: {
    pageNumber: 1,
    pageSize: 10,
    totalPages: 0,
    totalCount: 0,
  },

  loading: false,
  creating: false,
  updating: false,
  success: false,
  error: null,
};

const voucherAdminSlice = createSlice({
  name: "vouchersAdmin",
  initialState,

  reducers: {
    clearVoucherState(state) {
      state.success = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ================= GET =================
      .addCase(fetchAdminVouchers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAdminVouchers.fulfilled, (state, action) => {
        state.loading = false;

        state.vouchers = action.payload.data || [];

        state.pagination = {
          pageNumber: action.payload.pageNumber ?? 1,
          pageSize: action.payload.pageSize ?? 10,
          totalPages: action.payload.totalPages ?? 0,
          totalCount: action.payload.totalCount ?? 0,
        };
      })

      .addCase(fetchAdminVouchers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= POST =================
      .addCase(createAdminVoucher.pending, (state) => {
        state.creating = true;
        state.success = false;
      })

      .addCase(createAdminVoucher.fulfilled, (state, action) => {
        state.creating = false;
        state.success = true;

        state.vouchers.unshift(action.payload.data);
      })

      .addCase(createAdminVoucher.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload;
      })

      // ================= PUT =================
      .addCase(updateAdminVoucher.pending, (state) => {
        state.updating = true;
        state.success = false;
      })

      .addCase(updateAdminVoucher.fulfilled, (state, action) => {
        state.updating = false;
        state.success = true;

        const updatedVoucher = action.payload.data;

        const index = state.vouchers.findIndex(
          (item) => item.id === updatedVoucher.id,
        );

        if (index !== -1) {
          state.vouchers[index] = updatedVoucher;
        }
      })

      .addCase(updateAdminVoucher.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      });
  },
});

export const { clearVoucherState } = voucherAdminSlice.actions;

export default voucherAdminSlice.reducer;
