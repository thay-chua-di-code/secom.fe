import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { notificationService } from "../../service/notificationService";

const initialState = {
  items: [],
  pagination: {
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
  },
  unreadCount: 0,
  loading: false,
  error: null,
};

export const getNotifications = createAsyncThunk(
  "notification/getNotifications",
  async (payload, thunkAPI) => {
    try {
      const response = await notificationService.getNotifications(payload);

      return response;
    } catch (e) {
      return thunkAPI.rejectWithValue(e?.message || "Get notifications failed");
    }
  },
);

export const markNotificationAsRead = createAsyncThunk(
  "notification/markAsRead",
  async (id, thunkAPI) => {
    try {
      await notificationService.markAsRead(id);

      return id;
    } catch (e) {
      return thunkAPI.rejectWithValue(e?.message || "Mark as read failed");
    }
  },
);

export const deleteNotification = createAsyncThunk(
  "notification/deleteNotification",
  async (id, thunkAPI) => {
    try {
      await notificationService.deleteNotification(id);

      return id;
    } catch (e) {
      return thunkAPI.rejectWithValue(
        e?.message || "Delete notification failed",
      );
    }
  },
);

const notificationSlice = createSlice({
  name: "notification",
  initialState,

  reducers: {
    resetNotificationState: () => initialState,

    addNotificationLocal: (state, action) => {
      state.items.unshift(action.payload);

      if (!action.payload.isRead) {
        state.unreadCount += 1;
      }
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(getNotifications.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getNotifications.fulfilled, (state, action) => {
        state.loading = false;
        const payload = action.payload?.data;
        state.items = payload?.items || [];
        state.pagination = {
          pageNumber: payload?.pageNumber || 1,
          pageSize: payload?.pageSize || 10,
          totalCount: payload?.totalCount || 0,
          totalPages: payload?.totalPages || 0,
        };

        state.unreadCount = state.items.filter((item) => !item.isRead).length;
      })

      .addCase(getNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(markNotificationAsRead.fulfilled, (state, action) => {
        const notification = state.items.find(
          (item) => item.id === action.payload,
        );

        if (notification && !notification.isRead) {
          notification.isRead = true;

          state.unreadCount -= 1;
        }
      })

      .addCase(deleteNotification.fulfilled, (state, action) => {
        const deletedNotification = state.items.find(
          (item) => item.id === action.payload,
        );
        if (deletedNotification && !deletedNotification.isRead) {
          state.unreadCount -= 1;
        }
        state.items = state.items.filter((item) => item.id !== action.payload);
        state.pagination.totalCount -= 1;
      });
  },
});

export const { resetNotificationState, addNotificationLocal } =
  notificationSlice.actions;

export default notificationSlice.reducer;
