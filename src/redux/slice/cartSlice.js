import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cartService } from "../../service/cartService";

const getErrorMessage = (error, fallbackMessage) => {
  const apiMessage = error.response?.data?.message;

  if (typeof apiMessage === "string" && apiMessage.trim()) {
    return apiMessage;
  }

  return fallbackMessage;
};

const mapCartState = (state, cartData) => {
  state.cart = cartData || null;
  state.items = cartData?.items || [];
  state.voucherCode = cartData?.voucherCode || null;
  state.subtotal = cartData?.subtotal || 0;
  state.discountAmount = cartData?.discountAmount || 0;
  state.finalTotal = cartData?.finalTotal || 0;
};

export const fetchCart = createAsyncThunk("cart/fetchCart", async (_, thunkAPI) => {
  try {
    const response = await cartService.getCart();
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error, "Failed to fetch cart"));
  }
});

export const addCartItem = createAsyncThunk("cart/addCartItem", async (payload, thunkAPI) => {
  try {
    const response = await cartService.addCartItem(payload);
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(getErrorMessage(error, "Failed to add item to cart"));
  }
});

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ cartItemId, quantity }, thunkAPI) => {
    try {
      const response = await cartService.updateCartItemQuantity(cartItemId, quantity);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Failed to update cart item quantity"),
      );
    }
  },
);

export const applyCartVoucher = createAsyncThunk(
  "cart/applyCartVoucher",
  async (code, thunkAPI) => {
    try {
      const summaryResponse = await cartService.applyVoucher(code);
      const cartResponse = await cartService.getCart();

      return {
        summary: summaryResponse.data || null,
        cart: cartResponse.data || null,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(getErrorMessage(error, "Failed to apply voucher"));
    }
  },
);

export const calculateCheckoutSummary = createAsyncThunk(
  "cart/calculateCheckoutSummary",
  async (_, thunkAPI) => {
    try {
      const response = await cartService.calculateCheckout();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Failed to calculate checkout summary"),
      );
    }
  },
);

const initialState = {
  cart: null,
  items: [],
  checkoutSummary: null,
  voucherCode: null,
  subtotal: 0,
  discountAmount: 0,
  finalTotal: 0,
  loading: false,
  actionLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart = null;
      state.items = [];
      state.checkoutSummary = null;
      state.voucherCode = null;
      state.subtotal = 0;
      state.discountAmount = 0;
      state.finalTotal = 0;
      state.error = null;
    },
    setVoucherCode: (state, action) => {
      state.voucherCode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        mapCartState(state, action.payload?.data || null);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addCartItem.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(addCartItem.fulfilled, (state, action) => {
        state.actionLoading = false;
        mapCartState(state, action.payload?.data || null);
      })
      .addCase(addCartItem.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.actionLoading = false;
        mapCartState(state, action.payload?.data || null);
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })
      .addCase(applyCartVoucher.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(applyCartVoucher.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.checkoutSummary = action.payload?.summary || null;
        mapCartState(state, action.payload?.cart || null);
      })
      .addCase(applyCartVoucher.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })
      .addCase(calculateCheckoutSummary.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(calculateCheckoutSummary.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.checkoutSummary = action.payload?.data || null;
      })
      .addCase(calculateCheckoutSummary.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCart, setVoucherCode } = cartSlice.actions;

export default cartSlice.reducer;
