import { createSlice } from "@reduxjs/toolkit";
import { fetchOrders, fetchOrderDetail } from "./orderThunk";
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
  detailLoading: false,
  error: null,
};

const adminOrderSlice = createSlice({
  name: "ordersAdmin",
  initialState,
  reducers: {
    clearOrderDetail(state) {
      state.orderDetail = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ================= Orders =================

      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.items;
        state.pagination = {
          pageNumber: action.payload.pageNumber,
          pageSize: action.payload.pageSize,
          totalCount: action.payload.totalCount,
          totalPages: action.payload.totalPages,
        };
      })

      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= Detail =================

      .addCase(fetchOrderDetail.pending, (state) => {
        state.detailLoading = true;
        state.orderDetail = null;
        state.error = null;
      })

      .addCase(fetchOrderDetail.fulfilled, (state, action) => {
        state.detailLoading = false;
        state.orderDetail = action.payload;
      })

      .addCase(fetchOrderDetail.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderDetail } = adminOrderSlice.actions;

export default adminOrderSlice.reducer;
