import { createSlice } from "@reduxjs/toolkit";

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
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage(state, action) {
      state.messages.push(action.payload);
    },

    setMessages(state, action) {
      state.messages = action.payload;
    },
  },
});

export const { addMessage, setMessages } = chatSlice.actions;

export default chatSlice.reducer;
