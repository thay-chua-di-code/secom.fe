import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminService } from "../../../../service/adminService";
export const fetchAdminSellers = createAsyncThunk(
  "adminSeller/fetchAll",
  async ({ pageNumber, pageSize }, { rejectWithValue }) => {
    try {
      console.log("Call me");
      const data = await adminService.getSeller(
        (pageNumber = 1),
        (pageSize = 10),
      );

      console.log("Data im received: ", data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const fetchSellerDetail = createAsyncThunk(
  "adminSeller/detail",
  async (sellerId, { rejectWithValue }) => {
    try {
      const data = await adminService.getSellerDetail(sellerId);
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const approveSeller = createAsyncThunk(
  "adminSeller/approve",
  async (sellerId, { rejectWithValue }) => {
    try {
      await adminService.approveSeller(sellerId);
      return sellerId;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const rejectSeller = createAsyncThunk(
  "adminSeller/reject",
  async ({ sellerId, reason }, { rejectWithValue }) => {
    try {
      await adminService.rejectSeller(sellerId, reason);
      return { sellerId, reason };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);
