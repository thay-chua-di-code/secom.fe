import { createAsyncThunk } from "@reduxjs/toolkit";
import { adminService } from "../../../../service/adminService";
export const fetchOrders = createAsyncThunk(
  "adminOrder/fetchOrders",
  async (params, thunkAPI) => {
    try {
      const response = await adminService.getOrdersByAdmin(params);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Cannot fetch orders",
      );
    }
  },
);

export const fetchOrderDetail = createAsyncThunk(
  "adminOrder/fetchOrderDetail",
  async (id, thunkAPI) => {
    try {
      const response = await adminService.getOrderDetail(id);

      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Cannot fetch order detail",
      );
    }
  },
);
