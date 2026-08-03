import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cartService } from "../../service/cartService";

/**
 * =========================
 * ERROR HANDLER
 * =========================
 */
const getErrorMessage = (error, fallbackMessage) => {
  const apiMessage =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message;

  if (typeof apiMessage === "string" && apiMessage.trim()) {
    return apiMessage;
  }

  return fallbackMessage;
};

/**
 * =========================
 * UNWRAP RESPONSE (BE SAFE)
 * BE: { success, message, data }
 * =========================
 */
const unwrapResponseData = (payload) => {
  return payload?.data ?? payload ?? null;
};

/**
 * =========================
 * NORMALIZE CART DATA
 * =========================
 */
const mapCartState = (state, payload) => {
  const cartData = unwrapResponseData(payload);

  state.cart = cartData
    ? {
        ...cartData,
        items: Array.isArray(cartData.items) ? cartData.items : [],
      }
    : null;

  // optional derived fields (safe fallback)
  state.items = Array.isArray(cartData?.items) ? cartData.items : [];
  state.voucherCode = cartData?.voucherCode ?? null;
  state.subtotal = cartData?.subtotal ?? 0;
  state.discountAmount = cartData?.discountAmount ?? 0;
  state.finalTotal = cartData?.finalTotal ?? 0;
};

/**
 * =========================
 * THUNKS
 * =========================
 */

// FETCH CART
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      return await cartService.getCart();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Failed to fetch cart"),
      );
    }
  },
);

// ADD CART ITEM
export const addCartItem = createAsyncThunk(
  "cart/addCartItem",
  async (payload, thunkAPI) => {
    try {
      return await cartService.addCartItem(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Failed to add item to cart"),
      );
    }
  },
);

// UPDATE QUANTITY
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ cartItemId, quantity }, thunkAPI) => {
    try {
      await cartService.updateCartItemQuantity(cartItemId, quantity);
      return await cartService.getCart();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Failed to update cart item quantity"),
      );
    }
  },
);

// APPLY VOUCHER
export const applyCartVoucher = createAsyncThunk(
  "cart/applyCartVoucher",
  async (code, thunkAPI) => {
    try {
      return await cartService.applyVoucher(code);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Cannot apply voucher. Please try again."),
      );
    }
  },
);

export const removeCartVoucher = createAsyncThunk(
  "cart/removeCartVoucher",
  async (_, thunkAPI) => {
    try {
      return await cartService.removeVoucher();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Cannot remove voucher. Please try again."),
      );
    }
  },
);

// CHECKOUT
export const calculateCheckoutSummary = createAsyncThunk(
  "cart/calculateCheckoutSummary",
  async (_, thunkAPI) => {
    try {
      return await cartService.calculateCheckout();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Failed to calculate checkout summary"),
      );
    }
  },
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (cartItemId, thunkAPI) => {
    try {
      await cartService.deleteCartItem(cartItemId);
      return await cartService.getCart();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Failed to remove item"),
      );
    }
  },
);

/**
 * =========================
 * INITIAL STATE
 * =========================
 */
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

/**
 * =========================
 * SLICE
 * =========================
 */
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
      state.loading = false;
      state.actionLoading = false;
      state.error = null;
    },

    setVoucherCode: (state, action) => {
      state.voucherCode = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.error = null;
        mapCartState(state, action.payload);
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
        mapCartState(state, action.payload);
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
        mapCartState(state, action.payload);
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
        const summary = unwrapResponseData(action.payload);

        state.actionLoading = false;
        state.checkoutSummary = summary;
        state.voucherCode = summary?.voucherCode ?? state.voucherCode;
        state.subtotal = summary?.subtotal ?? state.subtotal;
        state.discountAmount = summary?.discountAmount ?? 0;
        state.finalTotal = summary?.finalTotal ?? state.finalTotal;

        if (Array.isArray(summary?.items)) {
          state.items = summary.items;
        }
      })
      .addCase(applyCartVoucher.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      .addCase(removeCartVoucher.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(removeCartVoucher.fulfilled, (state, action) => {
        const summary = unwrapResponseData(action.payload);

        state.actionLoading = false;
        state.voucherCode = null;
        state.discountAmount = 0;

        if (summary?.items || summary?.subtotal !== undefined || summary?.finalTotal !== undefined) {
          state.checkoutSummary = summary;
          state.subtotal = summary?.subtotal ?? state.subtotal;
          state.finalTotal = summary?.finalTotal ?? state.subtotal;
          if (Array.isArray(summary?.items)) {
            state.items = summary.items;
          }
        }
      })
      .addCase(removeCartVoucher.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      .addCase(calculateCheckoutSummary.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(calculateCheckoutSummary.fulfilled, (state, action) => {
        const summary = unwrapResponseData(action.payload);

        state.actionLoading = false;
        state.checkoutSummary = summary;
        state.voucherCode = summary?.voucherCode ?? state.voucherCode;
        state.subtotal = summary?.subtotal ?? state.subtotal;
        state.discountAmount = summary?.discountAmount ?? 0;
        state.finalTotal = summary?.finalTotal ?? state.finalTotal;

        if (Array.isArray(summary?.items)) {
          state.items = summary.items;
        }
      })
      .addCase(calculateCheckoutSummary.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      .addCase(removeCartItem.pending, (state) => {
        state.actionLoading = true;
        state.error = null;
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.actionLoading = false;
        mapCartState(state, action.payload);
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCart, setVoucherCode } = cartSlice.actions;

export default cartSlice.reducer;
