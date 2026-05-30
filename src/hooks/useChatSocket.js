import { useEffect } from "react";

import {
  connectChatSocket,
  disconnectChatSocket,
  onReceiveMessage,
} from "../services/websocket/chatSocket";

export const useChatSocket = (
  token,
  onMessage
) => {
  useEffect(() => {
    if (!token) return;

    connectChatSocket(token);

    onReceiveMessage(onMessage);

    return () => {
      disconnectChatSocket();
    };
  }, [token]);
};