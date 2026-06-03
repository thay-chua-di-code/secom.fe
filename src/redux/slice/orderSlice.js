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

export const fetchMyOrdersThunk = createAsyncThunk(
  "order/fetchMyOrders",
  async (_, thunkAPI) => {
    try {
      const res = await orderService.getMyOrders();
      console.log("Result of order: ", res);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Get orders failed",
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
        state.orders = action.payload.data;
        state.pagination = {
          pageNumber: action.payload.pageNumber,
          pageSize: action.payload.pageSize,
          totalCount: action.payload.totalCount,
          totalPages: action.payload.totalPages,
        };
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
