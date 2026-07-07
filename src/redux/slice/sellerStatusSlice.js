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
    },

    setStatus: (state, action) => {
      state.status = action.payload.status;
      state.statusText = action.payload.statusText;
      state.sellerId = action.payload.sellerId;
      state.rejectReason = action.payload.rejectionReason;
    },
  },
});

export const { setLoading, setError, setStatus } = sellerStatusSlice.actions;

export default sellerStatusSlice.reducer;
