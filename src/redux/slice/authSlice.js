import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../service/authService";

const token = localStorage.getItem("token");

const initialState = {
  user: null,
  token: token || null,

  loading: false,
  error: null,

  isAuthenticated: !!token,
};

export const loginThunk = createAsyncThunk(
  "auth/login",

  async (payload, thunkAPI) => {
    try {
      const response = await authService.login(payload);

      /**
       * response example:
       * {
       *   accessToken: "...",
       *   user: {...}
       * }
       */

      localStorage.setItem("token", response.accessToken);

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
      state.isAuthenticated = false;

      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder

      /**
       * LOGIN PENDING
       */
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      /**
       * LOGIN SUCCESS
       */
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.token = action.payload.accessToken;

        state.user = action.payload.user;

        state.isAuthenticated = true;
      })

      /**
       * LOGIN FAILED
       */
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;

        state.isAuthenticated = false;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
