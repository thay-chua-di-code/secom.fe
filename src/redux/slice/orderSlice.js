import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { orderService } from "../../service/orderService";

const initialState = {
  orders: [],
  orderDetail: null,
  pagination: {
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
  },
  loading: false,
  error: null,
};

const getOrderItems = (payload) => {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.data?.items)) return payload.data.items;
  return [];
};

const getPagination = (payload) => ({
  pageNumber: payload?.pageNumber || payload?.data?.pageNumber || 1,
  pageSize: payload?.pageSize || payload?.data?.pageSize || 10,
  totalCount:
    payload?.totalCount || payload?.data?.totalCount || getOrderItems(payload).length,
  totalPages: payload?.totalPages || payload?.data?.totalPages || 1,
});

export const fetchMyOrdersThunk = createAsyncThunk(
  "order/fetchMyOrders",
  async (_, thunkAPI) => {
    try {
      const res = await orderService.getMyOrders();
      return res.data ?? res.Data ?? res;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.message || "Get orders failed",
      );
    }
  },
);

export const fetchOrderDetailThunk = createAsyncThunk(
  "order/fetchOrderDetail",
  async (orderId, thunkAPI) => {
    try {
      const response = await orderService.getOrderDetail(orderId);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Fetch order detail failed",
      );
    }
  },
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    clearOrderState: (state) => {
      state.orders = [];
      state.orderDetail = null;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchMyOrdersThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = getOrderItems(action.payload);
        state.pagination = getPagination(action.payload);
      })
      .addCase(fetchMyOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchOrderDetailThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrderDetailThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orderDetail = action.payload.data;
      })
      .addCase(fetchOrderDetailThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderState } = orderSlice.actions;

export default orderSlice.reducer;
