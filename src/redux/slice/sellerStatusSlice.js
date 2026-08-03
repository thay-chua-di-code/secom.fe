import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  statusText: "",
  sellerId: "",
  rejectReason: "",
  loading: false,
  error: "",
};

const sellerStatusSlice = createSlice({
  name: "sellerStatus",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    resetSellerStatus: () => initialState,

    setStatus: (state, action) => {
      state.status = action.payload.status || false;
      state.statusText = action.payload.statusText || "";
      state.sellerId = action.payload.sellerId || "";
      state.rejectReason =
        action.payload.rejectReason || action.payload.rejectionReason || "";
      state.loading = false;
      state.error = "";
    },
  },
});

export const { resetSellerStatus, setLoading, setError, setStatus } =
  sellerStatusSlice.actions;

export default sellerStatusSlice.reducer;
