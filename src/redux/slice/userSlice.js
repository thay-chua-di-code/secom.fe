import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "../../service/userService";

const initialState = {
  userInfo: null,
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

  initialState,

  reducers: {
    clearUserInfo: (state) => {
      state.userInfo = null;
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

export const { clearUserInfo } = userSlice.actions;

export default userSlice.reducer;
