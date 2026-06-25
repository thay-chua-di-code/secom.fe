import axiosClient from "../../api/axiosClient";

export const chatService = {
  getChats: (params) =>
    axiosClient.get("/api/chats", {
      params,
    }),

  getChatById: (chatId) => axiosClient.get(`/api/chats/${chatId}`),

  sendMessage: (chatId, data) =>
    axiosClient.post(`/api/chats/${chatId}/messages`, data),

  markAsRead: (chatId) =>
    axiosClient.patch(`/api/chats/${chatId}/messages/read`),
};
