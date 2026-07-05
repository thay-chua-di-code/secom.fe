import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "../../service/userService";

const initialState = {
  userInfo: {},
  shopFollowed: [],
  pagination: {
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
  },
  addresses: [],
  wishlist: [],
  loading: false,
  error: null,
};

const getApiErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.response?.data?.error ||
  error?.message ||
  "Cannot update wishlist. Please try again.";

const normalizeWishlistItems = (payload) => {
  const items = payload?.data?.items ?? payload?.items ?? payload;

  return Array.isArray(items) ? items : [];
};

export const getMyInfoThunk = createAsyncThunk(
  "user/getMyInfo",

  async (_, thunkAPI) => {
    try {
      const response = await userService.getMyInfo();
      console.log("Profile Thunk Resp:", response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message);
    }
  },
);

export const getWishlistThunk = createAsyncThunk(
  "user/getWishlist",
  async ({ page = 1, pageSize = 20 } = {}, thunkAPI) => {
    try {
      const response = await userService.getWishList({
        page,
        pageSize,
      });

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(getApiErrorMessage(error));
    }
  },
);

export const addWishlistThunk = createAsyncThunk(
  "user/addWishlist",
  async (productId, thunkAPI) => {
    try {
      await userService.addWishList(productId);
      return productId;
    } catch (error) {
      return thunkAPI.rejectWithValue(getApiErrorMessage(error));
    }
  },
);

export const deleteWishlistThunk = createAsyncThunk(
  "user/deleteWishlist",
  async (productId, thunkAPI) => {
    try {
      await userService.deleteWishList(productId);
      return productId;
    } catch (error) {
      return thunkAPI.rejectWithValue(getApiErrorMessage(error));
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    clearUserInfo: (state) => {
      state.userInfo = {};
    },
    updateUserInfo: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },

    getAddress: (state, action) => {
      state.addresses = Array.isArray(action.payload) ? action.payload : [];
    },
    setAddresses: (state, action) => {
      state.addresses.push(action.payload);
    },
    updateDefaultAddress: (state, action) => {
      const updatedAddresses = (state.addresses ?? []).map((address) => {
        if (address.id === action.payload) {
          return { ...address, isDefault: true };
        } else {
          return { ...address, isDefault: false };
        }
      });
      state.addresses = updatedAddresses;
    },
    updateAddress: (state, action) => {
      const updatedAddresses = (state.addresses ?? []).map((address) => {
        if (address.id === action.payload.id) {
          return { ...address, ...action.payload };
        } else {
          return address;
        }
      });
      state.addresses = updatedAddresses;
    },
    deleteAddress: (state, action) => {
      state.addresses = (state.addresses ?? []).filter(
        (address) => address.id !== action.payload,
      );
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    getFolloweShop: (state, action) => {
      state.shopFollowed = action.payload.items || [];
      state.pagination = {
        pageNumber: action.payload.pageNumber,
        pageSize: action.payload.pageSize,
        totalCount: action.payload.totalCount,
        totalPages: action.payload.totalPages,
      };
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(getMyInfoThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(getMyInfoThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
      })

      .addCase(getMyInfoThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })
      // ================= WISHLIST =================

      .addCase(getWishlistThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(getWishlistThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.wishlist = normalizeWishlistItems(action.payload);
      })

      .addCase(getWishlistThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= ADD =================

      .addCase(addWishlistThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(addWishlistThunk.fulfilled, (state, action) => {
        state.loading = false;

        const productId = action.payload;

        const wishlist = normalizeWishlistItems(state.wishlist);

        const existed = wishlist.some(
          (item) =>
            item.productId === productId ||
            item.id === productId ||
            item.product?.id === productId,
        );

        if (!existed) {
          wishlist.push({
            productId,
          });
        }

        state.wishlist = wishlist;
      })

      .addCase(addWishlistThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= DELETE =================

      .addCase(deleteWishlistThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteWishlistThunk.fulfilled, (state, action) => {
        state.loading = false;

        const productId = action.payload;

        state.wishlist = normalizeWishlistItems(state.wishlist).filter(
          (item) =>
            item.productId !== productId &&
            item.id !== productId &&
            item.product?.id !== productId,
        );
      })

      .addCase(deleteWishlistThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  clearUserInfo,
  updateUserInfo,
  getOrderHistory,
  getAddress,
  setAddresses,
  updateDefaultAddress,
  updateAddress,
  deleteAddress,
  getFolloweShop,
  setLoading,
  setError,
} = userSlice.actions;

export default userSlice.reducer;
