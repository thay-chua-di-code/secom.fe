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

export const fetchAdminPayouts = createAsyncThunk(
  "finance/fetchAdminPayouts",
  async (params, thunkAPI) => {
    try {
      const response = await adminService.getAdminPayouts(params);

      return response?.data ?? response;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err?.response?.data?.message || err.message || "Unable to load withdrawal requests.",
      );
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
