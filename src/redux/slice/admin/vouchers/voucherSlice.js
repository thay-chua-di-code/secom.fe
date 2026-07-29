import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAdminVouchers,
  createAdminVoucher,
  updateAdminVoucher,
  deleteAdminVoucher,
} from "./voucherThunk";

const initialState = {
  vouchers: [],
  pagination: {
    pageNumber: 1,
    pageSize: 20,
    totalCount: 0,
    totalPages: 0,
  },
  loading: false,
  creating: false,
  updating: false,
  deleting: false,
  success: false,
  error: null,
};

const normalizePagedData = (payload) => {
  const items = payload?.items ?? payload?.data?.items ?? payload;

  return {
    items: Array.isArray(items) ? items : [],
    pagination: {
      pageNumber: payload?.pageNumber ?? payload?.data?.pageNumber ?? 1,
      pageSize: payload?.pageSize ?? payload?.data?.pageSize ?? 20,
      totalCount: payload?.totalCount ?? payload?.data?.totalCount ?? 0,
      totalPages: payload?.totalPages ?? payload?.data?.totalPages ?? 0,
    },
  };
};

const normalizeVoucher = (payload) => payload?.voucher ?? payload?.data ?? payload;

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
      .addCase(fetchAdminVouchers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminVouchers.fulfilled, (state, action) => {
        const { items, pagination } = normalizePagedData(action.payload);

        state.loading = false;
        state.vouchers = items;
        state.pagination = pagination;
      })
      .addCase(fetchAdminVouchers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.vouchers = [];
      })
      .addCase(createAdminVoucher.pending, (state) => {
        state.creating = true;
        state.success = false;
        state.error = null;
      })
      .addCase(createAdminVoucher.fulfilled, (state) => {
        state.creating = false;
        state.success = true;
      })
      .addCase(createAdminVoucher.rejected, (state, action) => {
        state.creating = false;
        state.error = action.payload;
      })
      .addCase(updateAdminVoucher.pending, (state) => {
        state.updating = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateAdminVoucher.fulfilled, (state, action) => {
        const updatedVoucher = normalizeVoucher(action.payload);
        const vouchers = Array.isArray(state.vouchers) ? state.vouchers : [];
        const voucherId = updatedVoucher?.id ?? updatedVoucher?.voucherId;
        const index = vouchers.findIndex(
          (item) => String(item.id ?? item.voucherId) === String(voucherId),
        );

        state.updating = false;
        state.success = true;

        if (index !== -1) {
          vouchers[index] = updatedVoucher;
          state.vouchers = vouchers;
        }
      })
      .addCase(updateAdminVoucher.rejected, (state, action) => {
        state.updating = false;
        state.error = action.payload;
      })
      .addCase(deleteAdminVoucher.pending, (state) => {
        state.deleting = true;
        state.success = false;
        state.error = null;
      })
      .addCase(deleteAdminVoucher.fulfilled, (state, action) => {
        const voucherId = action.payload;
        const vouchers = Array.isArray(state.vouchers) ? state.vouchers : [];

        state.deleting = false;
        state.success = true;
        state.vouchers = vouchers.filter(
          (item) => String(item.id ?? item.voucherId) !== String(voucherId),
        );
      })
      .addCase(deleteAdminVoucher.rejected, (state, action) => {
        state.deleting = false;
        state.error = action.payload;
      });
  },
});

export const { clearVoucherState } = voucherAdminSlice.actions;

export default voucherAdminSlice.reducer;
