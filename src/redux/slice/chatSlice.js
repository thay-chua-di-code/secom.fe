import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { chatService } from "../../service/chatService";

const getApiError = (error) =>
  error?.response?.data?.message ||
  error?.response?.data?.error ||
  error?.message ||
  "Something went wrong";

export const getChatsThunk = createAsyncThunk(
  "chat/getChats",
  async (params, thunkAPI) => {
    try {
      const res = await chatService.getChats(params);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(getApiError(err));
    }
  },
);

export const getChatDetailThunk = createAsyncThunk(
  "chat/getChatDetail",
  async (chatId, thunkAPI) => {
    try {
      const res = await chatService.getChatById(chatId);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(getApiError(err));
    }
  },
);

export const sendMessageThunk = createAsyncThunk(
  "chat/sendMessage",
  async ({ chatId, data }, thunkAPI) => {
    try {
      const res = await chatService.sendMessage(chatId, data);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(getApiError(err));
    }
  },
);

export const markAsReadThunk = createAsyncThunk(
  "chat/markAsRead",
  async (chatId, thunkAPI) => {
    try {
      await chatService.markAsRead(chatId);
      return chatId;
    } catch (err) {
      return thunkAPI.rejectWithValue(getApiError(err));
    }
  },
);

const initialState = {
  chats: [],
  currentChat: null,
  pagination: {
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
  },

  loading: false,

  sending: false,

  error: null,
};

const chatSlice = createSlice({
  name: "chat",

  initialState,

  reducers: {
    addRealtimeMessage(state, action) {
      if (!state.currentChat) return;

      state.currentChat.messages.push(action.payload);
    },

    clearCurrentChat(state) {
      state.currentChat = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // ================= GET CHATS =================

      .addCase(getChatsThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(getChatsThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.chats = action.payload.items;
        state.pagination = action.payload.pagination;
      })

      .addCase(getChatsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= CHAT DETAIL =================

      .addCase(getChatDetailThunk.pending, (state) => {
        state.loading = true;
      })

      .addCase(getChatDetailThunk.fulfilled, (state, action) => {
        state.loading = false;

        state.currentChat = action.payload;
      })

      .addCase(getChatDetailThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ================= SEND =================

      .addCase(sendMessageThunk.pending, (state) => {
        state.sending = true;
      })

      .addCase(sendMessageThunk.fulfilled, (state, action) => {
        state.sending = false;

        if (state.currentChat) {
          state.currentChat.messages.push(action.payload);
        }
      })

      .addCase(sendMessageThunk.rejected, (state, action) => {
        state.sending = false;
        state.error = action.payload;
      })

      // ================= READ =================

      .addCase(markAsReadThunk.fulfilled, (state) => {
        if (!state.currentChat) return;

        state.currentChat.messages.forEach((m) => {
          m.isRead = true;
        });
      });
  },
});

export const { addRealtimeMessage, clearCurrentChat } = chatSlice.actions;

export default chatSlice.reducer;
