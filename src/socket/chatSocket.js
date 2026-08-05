import socketClient from "./socket";
import { SOCKET_EVENTS } from "./socketEvents";
import { CHAT_SOCKET_URL } from "../config/api";

export const connectChatSocket = (token) => {
  const separator = CHAT_SOCKET_URL.includes("?") ? "&" : "?";
  socketClient.connect(`${CHAT_SOCKET_URL}${separator}token=${token}`);
};

export const sendMessage = (message) => {
  socketClient.send(SOCKET_EVENTS.CHAT_MESSAGE, message);
};

export const sendTyping = (data) => {
  socketClient.send(SOCKET_EVENTS.USER_TYPING, data);
};

export const onReceiveMessage = (callback) => {
  socketClient.subscribe(SOCKET_EVENTS.CHAT_MESSAGE, callback);
};

export const onTyping = (callback) => {
  socketClient.subscribe(SOCKET_EVENTS.USER_TYPING, callback);
};

export const disconnectChatSocket = () => {
  socketClient.disconnect();
};
