import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sellerService } from "../../../../service/sellerService";

export const getSellerOrdersThunk = createAsyncThunk(
  "sellerOrder/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await sellerService.getOrdersSeller();
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const confirmOrderThunk = createAsyncThunk(
  "sellerOrder/confirmShipping",
  async (orderId, thunkAPI) => {
    try {
      const res = await sellerService.confirmOrderShipping(orderId);
      return {
        orderId,
        ...res,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const confirmOrderDeliveredThunk = createAsyncThunk(
  "sellerOrder/confirmDelivered",
  async (orderId, thunkAPI) => {
    try {
      const res = await sellerService.confirmOrderDelivered(orderId);
      return {
        orderId,
        ...res,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

export const updateSellerOrderStatusThunk = createAsyncThunk(
  "sellerOrder/updateStatus",
  async ({ orderId, status }, thunkAPI) => {
    try {
      const res = await sellerService.updateOrderStatus(orderId, status);
      return {
        orderId,
        status,
        ...res,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message,
      );
    }
  },
);

const initialState = {
  orders: [],
  loading: false,
  error: "",
  loaded: false,
  confirmLoading: false,
  confirmSuccess: false,
  confirmMessage: "",
  confirmError: "",
  statusLoading: false,
  statusError: "",
};

const sellerOrderSlice = createSlice({
  name: "sellerOrder",
  initialState,
  reducers: {
    clearSellerOrders(state) {
      state.orders = [];
      state.loaded = false;
      state.error = "";
    },

    resetSellerOrderCache(state) {
      state.loaded = false;
    },
    resetConfirmState(state) {
      state.confirmLoading = false;
      state.confirmSuccess = false;
      state.confirmMessage = "";
      state.confirmError = "";
    },
  },

  extraReducers: (builder) => {
    builder

      // ===== Get Orders =====

      .addCase(getSellerOrdersThunk.pending, (state) => {
        state.loading = true;
        state.error = "";
      })

      .addCase(getSellerOrdersThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.loaded = true;
      })

      .addCase(getSellerOrdersThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ===== Confirm Order =====
      .addCase(confirmOrderThunk.pending, (state) => {
        state.confirmLoading = true;
        state.confirmSuccess = false;
        state.confirmError = "";
        state.confirmMessage = "";
      })

      .addCase(confirmOrderThunk.fulfilled, (state, action) => {
        state.confirmLoading = false;
        state.confirmSuccess = action.payload.success;
        state.confirmMessage = action.payload.message;
      })

      .addCase(confirmOrderThunk.rejected, (state, action) => {
        state.confirmLoading = false;
        state.confirmSuccess = false;
        state.confirmError = action.payload;
      })

      .addCase(confirmOrderDeliveredThunk.pending, (state) => {
        state.confirmLoading = true;
        state.confirmSuccess = false;
        state.confirmError = "";
        state.confirmMessage = "";
      })
      .addCase(confirmOrderDeliveredThunk.fulfilled, (state, action) => {
        state.confirmLoading = false;
        state.confirmSuccess = action.payload.success;
        state.confirmMessage = action.payload.message;
      })
      .addCase(confirmOrderDeliveredThunk.rejected, (state, action) => {
        state.confirmLoading = false;
        state.confirmSuccess = false;
        state.confirmError = action.payload;
      })

      // ===== Update Status =====
      .addCase(updateSellerOrderStatusThunk.pending, (state) => {
        state.statusLoading = true;
        state.statusError = "";
      })
      .addCase(updateSellerOrderStatusThunk.fulfilled, (state, action) => {
        state.statusLoading = false;

        const order = state.orders.find(
          (x) => (x.orderId || x.id) === action.payload.orderId,
        );

        if (order) {
          order.status = action.payload.status;
        }
      })
      .addCase(updateSellerOrderStatusThunk.rejected, (state, action) => {
        state.statusLoading = false;
        state.statusError = action.payload;
      });
  },
});

export const { clearSellerOrders, resetSellerOrderCache, resetConfirmState } =
  sellerOrderSlice.actions;

export default sellerOrderSlice.reducer;
