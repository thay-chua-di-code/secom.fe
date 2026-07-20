import axiosClient from "../api/axiosClient";
import { API_ENDPOINTS } from "../api/endPoint";

const unwrapApiData = (response) => response?.data?.data ?? response?.data ?? response;

const getApiErrorMessage = (error, fallback) =>
  error?.response?.data?.message ||
  error?.response?.data?.error ||
  error?.message ||
  fallback;

/**
 * @typedef {Object} ChatListItemResponse
 * @property {string} chatId
 * @property {string} buyerId
 * @property {string} sellerId
 * @property {string | null} productId
 * @property {string | null} latestMessagePreview
 * @property {string | null} latestMessageAtUtc
 * @property {number} unreadCount
 */

/**
 * @typedef {Object} ChatThreadResponse
 * @property {string} chatId
 * @property {string} buyerId
 * @property {string} sellerId
 * @property {string} sellerName
 * @property {string | null} sellerAvatarUrl
 * @property {string} createdAtUtc
 * @property {string | null} lastMessageAtUtc
 * @property {boolean} isExisting
 */

/**
 * @typedef {Object} ChatMessageResponse
 * @property {string} messageId
 * @property {string} chatId
 * @property {string} senderId
 * @property {string} recipientId
 * @property {string} content
 * @property {boolean} isRead
 * @property {string} createdAtUtc
 */

/**
 * @typedef {Object} ChatDetailResponse
 * @property {string} chatId
 * @property {ChatMessageResponse[]} messages
 */

export const chatService = {
  async getChats({ page = 1, pageSize = 20 } = {}) {
    try {
      const response = await axiosClient.get(API_ENDPOINTS.CHATS.GET_CHATS, {
        params: { page, pageSize },
      });

      return unwrapApiData(response);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Cannot load chats"), {
        cause: error,
      });
    }
  },

  async createChatThread(payload) {
    try {
      const response = await axiosClient.post(
        API_ENDPOINTS.CHATS.CREATE_THREAD,
        payload,
      );

      return unwrapApiData(response);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Cannot create chat thread"), {
        cause: error,
      });
    }
  },

  async getChatById(chatId, { page = 1, pageSize = 50 } = {}) {
    try {
      const response = await axiosClient.get(
        API_ENDPOINTS.CHATS.GET_CHAT_DETAIL(chatId),
        { params: { page, pageSize } },
      );

      return unwrapApiData(response);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Cannot load chat detail"), {
        cause: error,
      });
    }
  },

  async sendMessage(chatId, data) {
    try {
      const response = await axiosClient.post(
        API_ENDPOINTS.CHATS.SEND_MESSAGE(chatId),
        data,
      );

      return unwrapApiData(response);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Cannot send message"), {
        cause: error,
      });
    }
  },

  async markAsRead(chatId) {
    try {
      const response = await axiosClient.patch(
        API_ENDPOINTS.CHATS.MARK_READ(chatId),
      );

      return unwrapApiData(response);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Cannot mark messages as read"), {
        cause: error,
      });
    }
  },
};
