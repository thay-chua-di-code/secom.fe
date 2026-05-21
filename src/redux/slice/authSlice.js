import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../service/authService";
const initialState = {
  token: "",
  user: null,
  pending: false,
  error: null,
};

export const loginThunk = createAsyncThunk(
  "auth/login",

  async (payload, thunkAPI) => {
    try {
      const response = await authService.login(payload);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout: (state) => {
      state.user = null;

      state.token = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(loginThunk.pending, (state) => {
        state.loading = true;

        state.error = null;
      })

      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.token = action.payload.accessToken;

        state.user = action.payload.user;
      })

      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
