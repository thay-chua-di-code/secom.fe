import socketClient from "./socket";
import { SOCKET_EVENTS } from "./socketEvents";

export const connectChatSocket = (token) => {
  socketClient.connect(`ws://localhost:8080/chat?token=${token}`);
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
