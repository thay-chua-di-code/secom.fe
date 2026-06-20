import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { voucherService } from "../../service/voucherService";

const initialState = {
  vouchers: [],
  selectedVoucher: null,
  loading: false,
  error: null,
};

// GET list voucher (profile + admin + checkout reuse)
export const fetchVouchers = createAsyncThunk(
  "voucher/fetch",
  async (_, thunkAPI) => {
    try {
      return await voucherService.getAll();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

// APPLY voucher (link cart)
export const applyVoucher = createAsyncThunk(
  "voucher/apply",
  async (code, thunkAPI) => {
    try {
      return await voucherService.apply(code);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
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
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVouchers.fulfilled, (state, action) => {
        state.vouchers = action.payload?.data ?? action.payload ?? [];
      })
      .addCase(applyVoucher.fulfilled, (state, action) => {
        state.appliedVoucher = action.payload;
      });
  },
});

export const { selectVoucher, clearVoucher } = voucherSlice.actions;
export default voucherSlice.reducer;
