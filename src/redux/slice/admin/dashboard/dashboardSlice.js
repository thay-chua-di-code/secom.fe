import { createSlice } from "@reduxjs/toolkit";
import { fetchDashboardStatistics } from "./dashboardThunk";

const initialState = {
  statistics: null,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "adminDashboard",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStatistics.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchDashboardStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.statistics = action.payload;
      })

      .addCase(fetchDashboardStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;
