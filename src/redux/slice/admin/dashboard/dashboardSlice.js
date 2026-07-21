import { createSlice } from "@reduxjs/toolkit";
import { fetchDashboardStatistics } from "./dashboardThunk";

const initialState = {
  statistics: {},
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: "adminDashboard",

  initialState,

  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
    },

    setDashboardData(state, action) {
      state.statistics = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStatistics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchDashboardStatistics.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload)
        state.statistics = action.payload;
      })

      .addCase(fetchDashboardStatistics.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload || "Failed to fetch dashboard statistics";
      });
  },
});

export const { setLoading, setError, setDashboardData } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
