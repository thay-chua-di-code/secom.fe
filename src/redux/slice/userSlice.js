import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "../../service/userService";

const initialState = {
  userInfo: {},
  orderHistory: [],
  loading: false,
  error: null,
};

export const getMyInfoThunk = createAsyncThunk(
  "user/getMyInfo",

  async (_, thunkAPI) => {
    try {
      const response = await userService.getMyInfo();

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
    getOrderHistory: (state, action) => {
      state.orderHistory = action.payload;
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

export const { clearUserInfo, updateUserInfo, getOrderHistory } = userSlice.actions;

export default userSlice.reducer;
