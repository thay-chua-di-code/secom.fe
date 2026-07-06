import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { voucherService } from "../../service/voucherService";

const initialState = {
  vouchers: [],
  pagination: {
    pageNumber: 1,
    pageSize: 20,
    totalCount: 0,
    totalPages: 0,
  },
  selectedVoucher: null,
  appliedVoucher: null,
  loading: false,
  applying: false,
  error: null,
};

const getApiErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.response?.data?.error ||
  error?.message ||
  "Cannot apply voucher. Please try again.";

const unwrapApiData = (payload) => payload?.data ?? payload ?? null;

const normalizeVoucherList = (payload) => {
  const data = unwrapApiData(payload);
  const items = data?.items ?? data;

  return {
    items: Array.isArray(items) ? items : [],
    pagination: {
      pageNumber: data?.pageNumber ?? 1,
      pageSize: data?.pageSize ?? 20,
      totalCount: data?.totalCount ?? 0,
      totalPages: data?.totalPages ?? 0,
    },
  };
};

export const fetchVouchers = createAsyncThunk(
  "voucher/fetch",
  async (params = {}, thunkAPI) => {
    try {
      return await voucherService.getPublicVouchers({
        page: 1,
        pageSize: 20,
        status: "active",
        ...params,
      });
    } catch (error) {
      return thunkAPI.rejectWithValue(getApiErrorMessage(error));
    }
  },
);

export const applyVoucher = createAsyncThunk(
  "voucher/apply",
  async (code, thunkAPI) => {
    try {
      return await voucherService.applyVoucherToCart(code);
    } catch (error) {
      return thunkAPI.rejectWithValue(getApiErrorMessage(error));
    }
  },
);

const voucherSlice = createSlice({
  name: "voucher",
  initialState,
  reducers: {
    selectVoucher: (state, action) => {
      state.selectedVoucher = action.payload;
    },
    clearVoucher: (state) => {
      state.selectedVoucher = null;
      state.appliedVoucher = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVouchers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVouchers.fulfilled, (state, action) => {
        const { items, pagination } = normalizeVoucherList(action.payload);

        state.loading = false;
        state.vouchers = items;
        state.pagination = pagination;
      })
      .addCase(fetchVouchers.rejected, (state, action) => {
        state.loading = false;
        state.vouchers = [];
        state.error = action.payload;
      })
      .addCase(applyVoucher.pending, (state) => {
        state.applying = true;
        state.error = null;
      })
      .addCase(applyVoucher.fulfilled, (state, action) => {
        state.applying = false;
        state.appliedVoucher = unwrapApiData(action.payload);
      })
      .addCase(applyVoucher.rejected, (state, action) => {
        state.applying = false;
        state.error = action.payload;
      });
  },
});

export const { selectVoucher, clearVoucher } = voucherSlice.actions;
export default voucherSlice.reducer;
