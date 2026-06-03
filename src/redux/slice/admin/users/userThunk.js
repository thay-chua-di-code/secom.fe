import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminService } from "../../../../service/adminService";

export const fetchAdminUsers = createAsyncThunk(
  "adminUsers/fetchAdminUsers",
  async ({ pageNumber = 1, pageSize = 20 }, thunkAPI) => {
    try {
      const res = await adminService.getUsers(pageNumber, pageSize);     
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Fetch users failed",
      );
    }
  },
);
