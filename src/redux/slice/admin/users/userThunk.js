import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminService } from "../../../../service/adminService";

export const fetchAdminUsers = createAsyncThunk(
  "adminUsers/fetchAdminUsers",
  async ({ pageNumber = 1, pageSize = 20, searchTerm } = {}, thunkAPI) => {
    try {
      const res = await adminService.getUsers(pageNumber, pageSize, searchTerm);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Fetch users failed",
      );
    }
  },
);

export const banUser = createAsyncThunk(
  "usersAdmin/banUser",
  async (id, thunkAPI) => {
    try {
      await adminService.banUser(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);
export const unBanUser = createAsyncThunk(
  "usersAdmin/unBanUser",
  async (id, thunkAPI) => {
    try {
      await adminService.unBanUser(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);
