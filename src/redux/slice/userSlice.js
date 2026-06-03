import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "../../service/userService";

const initialState = {
  userInfo: {},
  addresses: [],
  loading: false,
  error: null,
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
      state.addresses = action.payload;
    },
    setAddresses: (state, action) => {
      state.addresses.push(action.payload);
    },
    updateDefaultAddress: (state, action) => {
      const updatedAddresses = state.addresses.map((address) => {
        if (address.id === action.payload) {
          return { ...address, isDefault: true };
        } else {
          return { ...address, isDefault: false };
        }
      });
      state.addresses = updatedAddresses;
    },
    updateAddress: (state, action) => {
      const updatedAddresses = state.addresses.map((address) => {
        if (address.id === action.payload.id) {
          return { ...address, ...action.payload };
        } else {
          return address;
        }
      });
      state.addresses = updatedAddresses;
    },
    deleteAddress: (state, action) => {
      state.addresses = state.addresses.filter(
        (address) => address.id !== action.payload,
      );
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
} = userSlice.actions;

export default userSlice.reducer;
