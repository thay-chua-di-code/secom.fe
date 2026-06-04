import { createSlice } from "@reduxjs/toolkit";
import { fetchAdminUsers, banUser, unBanUser } from "./userThunk";

const initialState = {
  users: [],
  pageNumber: 1,
  pageSize: 10,
  totalCount: 0,
  totalPages: 0,
  loading: false,
  error: null,
};

const userAdminSlice = createSlice({
  name: "usersAdmin",
  initialState,

  reducers: {
    clearUsersState: (state) => {
      state.users = [];
      state.pageNumber = 1;
      state.pageSize = 10;
      state.totalCount = 0;
      state.totalPages = 0;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchAdminUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.loading = false;

        state.users = action.payload.items;
        state.pageNumber = action.payload.pageNumber;
        state.pageSize = action.payload.pageSize;
        state.totalCount = action.payload.totalCount;
        state.totalPages = action.payload.totalPages;
      })

      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Ban User
      .addCase(banUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(banUser.fulfilled, (state, action) => {
        state.loading = false;

        const user = state.users.find((u) => u.id === action.payload);

        if (user) {
          user.isLocked = true;
        }
      })

      .addCase(banUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UnBan User
      .addCase(unBanUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(unBanUser.fulfilled, (state, action) => {
        state.loading = false;

        const user = state.users.find((u) => u.id === action.payload);

        if (user) {
          user.isLocked = false;
        }
      })

      .addCase(unBanUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUsersState } = userAdminSlice.actions;

export default userAdminSlice.reducer;
