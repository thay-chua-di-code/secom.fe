import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminService } from "../../../../service/adminService";

// GET
export const fetchAdminVouchers = createAsyncThunk(
  "adminVoucher/fetchAdminVouchers",
  async (params, { rejectWithValue }) => {
    try {
      const res = await adminService.getVouchers(params);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// POST
export const createAdminVoucher = createAsyncThunk(
  "adminVoucher/createAdminVoucher",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await adminService.createVoucher(payload);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

// PUT
export const updateAdminVoucher = createAsyncThunk(
  "adminVoucher/updateAdminVoucher",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await adminService.updateVoucher(id, data);

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);
