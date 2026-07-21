import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminService } from "../../../../service/adminService";

export const fetchDashboardStatistics = createAsyncThunk(
  "admin/fetchDashboardStatistics",
  async (_, thunkAPI) => {
    try {
      const response = await adminService.getDashBoard();
      console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed",
      );
    }
  },
);
