import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cartService } from "../../service/cartService";

/**
 * =========================
 * ERROR HANDLER
 * =========================
 */
const getErrorMessage = (error, fallbackMessage) => {
  const apiMessage = error.response?.data?.message;

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
      await cartService.addCartItem(payload);
      const cart = await cartService.getCart();
      return cart;
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
      const summaryResponse = await cartService.applyVoucher(code);
      const cartResponse = await cartService.getCart();

      return {
        summary: unwrapResponseData(summaryResponse),
        cart: cartResponse,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        getErrorMessage(error, "Failed to apply voucher"),
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
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        mapCartState(state, action.payload);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addCartItem.pending, (state) => {
        state.actionLoading = true;
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
      })
      .addCase(applyCartVoucher.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.checkoutSummary = action.payload?.summary || null;
        mapCartState(state, action.payload?.cart);
      })
      .addCase(applyCartVoucher.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      .addCase(calculateCheckoutSummary.pending, (state) => {
        state.actionLoading = true;
      })
      .addCase(calculateCheckoutSummary.fulfilled, (state, action) => {
        state.actionLoading = false;
        state.checkoutSummary = unwrapResponseData(action.payload);
      })
      .addCase(calculateCheckoutSummary.rejected, (state, action) => {
        state.actionLoading = false;
        state.error = action.payload;
      })

      .addCase(removeCartItem.pending, (state) => {
        state.actionLoading = true;
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
