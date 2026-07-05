import axiosClient from "../api/axiosClient";

export const chatService = {
  getChats(params) {
    return axiosClient.get("/chats", {
      params,
    });
  },

  getChatById(chatId) {
    return axiosClient.get(`/chats/${chatId}`);
  },

  sendMessage(chatId, data) {
    return axiosClient.post(`/chats/${chatId}/messages`, data);
  },

  markAsRead(chatId) {
    return axiosClient.patch(`/chats/${chatId}/messages/read`);
  },
};
