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
      return await chatService.getChats(params);
    } catch (err) {
      return thunkAPI.rejectWithValue(getApiError(err));
    }
  },
);

export const getChatDetailThunk = createAsyncThunk(
  "chat/getChatDetail",
  async ({ chatId, page = 1, pageSize = 50 }, thunkAPI) => {
    try {
      return await chatService.getChatById(chatId, { page, pageSize });
    } catch (err) {
      return thunkAPI.rejectWithValue(getApiError(err));
    }
  },
);

export const sendMessageThunk = createAsyncThunk(
  "chat/sendMessage",
  async ({ chatId, data }, thunkAPI) => {
    try {
      return await chatService.sendMessage(chatId, data);
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

  markingRead: false,

  error: null,
};

const chatSlice = createSlice({
  name: "chat",

  initialState,

  reducers: {
    addRealtimeMessage(state, action) {
      if (!state.currentChat) return;

      state.currentChat.messages = [
        ...(state.currentChat.messages ?? []),
        action.payload,
      ];
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

        const payload = action.payload ?? {};

        state.chats = Array.isArray(payload.items) ? payload.items : [];
        state.pagination = {
          pageNumber: payload.pageNumber ?? 1,
          pageSize: payload.pageSize ?? 20,
          totalCount: payload.totalCount ?? 0,
          totalPages: payload.totalPages ?? 0,
        };
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
          const messages = state.currentChat.messages ?? [];
          const messageExists = messages.some(
            (message) => message.messageId === action.payload?.messageId,
          );

          if (!messageExists) {
            state.currentChat.messages = [...messages, action.payload];
          }
        }

        const chatIndex = state.chats.findIndex(
          (chat) => chat.chatId === action.payload?.chatId,
        );

        if (chatIndex >= 0) {
          state.chats[chatIndex].latestMessagePreview = action.payload?.content;
          state.chats[chatIndex].latestMessageAtUtc =
            action.payload?.createdAtUtc;
        }
      })

      .addCase(sendMessageThunk.rejected, (state, action) => {
        state.sending = false;
        state.error = action.payload;
      })

      // ================= READ =================

      .addCase(markAsReadThunk.pending, (state) => {
        state.markingRead = true;
      })

      .addCase(markAsReadThunk.fulfilled, (state, action) => {
        state.markingRead = false;

        if (!state.currentChat) return;

        (state.currentChat.messages ?? []).forEach((m) => {
          m.isRead = true;
        });

        const chat = state.chats.find((item) => item.chatId === action.payload);

        if (chat) {
          chat.unreadCount = 0;
        }
      })

      .addCase(markAsReadThunk.rejected, (state, action) => {
        state.markingRead = false;
        state.error = action.payload;
      });
  },
});

export const { addRealtimeMessage, clearCurrentChat } = chatSlice.actions;

export default chatSlice.reducer;
