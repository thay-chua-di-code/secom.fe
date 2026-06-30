import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminService } from "../../../../service/adminService";

// Summary
export const fetchFinanceSummary = createAsyncThunk(
  "finance/fetchFinanceSummary",
  async (_, thunkAPI) => {
    try {
      const response = await adminService.getFinanceSummary();

      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

// Approve
export const approvePayout = createAsyncThunk(
  "finance/approvePayout",
  async (id, thunkAPI) => {
    try {
      const response = await adminService.approvePayout(id);

      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);

// Reject
export const rejectPayout = createAsyncThunk(
  "finance/rejectPayout",
  async (id, thunkAPI) => {
    try {
      const response = await adminService.rejectPayout(id);

      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  },
);
