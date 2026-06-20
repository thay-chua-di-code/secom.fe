import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminService } from "../../../../service/adminService";

export const fetchCategories = createAsyncThunk(
  "adminCategory/fetchCategories",
  async (params, { rejectWithValue }) => {
    try {
      return await adminService.getCategories(params);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories",
      );
    }
  },
);

export const createCategory = createAsyncThunk(
  "adminCategory/createCategory",
  async (payload, { rejectWithValue }) => {
    try {
      return await adminService.createCategory(payload);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create category",
      );
    }
  },
);

export const updateCategory = createAsyncThunk(
  "adminCategory/updateCategory",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      return await adminService.updateCategory({
        id,
        payload,
      });
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update category",
      );
    }
  },
);

export const deleteCategory = createAsyncThunk(
  "adminCategory/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      await adminService.deleteCategory(id);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete category",
      );
    }
  },
);
