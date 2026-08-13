import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../service/authService";
import { setAuthToken } from "../../api/axiosClient";
const token = localStorage.getItem("token");
const refreshToken = localStorage.getItem("refreshToken");

const initialState = {
  token: token || null,
  refreshToken: refreshToken || null,
  role: null,
  loading: false,
  error: null,
  isAuthenticated: !!token,
};

const getAuthErrorMessage = (error) =>
  error.response?.data?.message || error.message || "Login failed";

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (payload, thunkAPI) => {
    try {
      const data = await authService.login(payload);

      setAuthToken(data.accessToken);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getAuthErrorMessage(error));
    }
  },
);

export const googleLoginThunk = createAsyncThunk(
  "auth/googleLogin",
  async (idToken, thunkAPI) => {
    try {
      const data = await authService.loginGoogle(idToken);

      setAuthToken(data.accessToken);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(getAuthErrorMessage(error));
    }
  },
);

const applyAuthSuccess = (state, action) => {
  state.loading = false;
  state.token = action.payload.accessToken;
  state.role = action.payload.role;
  state.refreshToken = action.payload.refreshToken;
  state.isAuthenticated = true;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.refreshToken = null;
      state.role = null;
      state.error = null;
      state.loading = false;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");

      setAuthToken(null);
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, applyAuthSuccess)
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(googleLoginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(googleLoginThunk.fulfilled, applyAuthSuccess)
      .addCase(googleLoginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
