import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  error: null,
  loading: false,
};

const dashboardSlice = createSlice({
  name: "sellerDashboard",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setDashboardData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { setLoading, setError, setDashboardData } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;
