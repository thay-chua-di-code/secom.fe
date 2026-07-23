import { MessageCircle } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import toast from "react-hot-toast";
import ChatSidebar from "./ChatSidebar";
import ChatContent from "./ChatContent";
import { useDispatch, useSelector } from "react-redux";
import {
  getChatsThunk,
  getChatDetailThunk,
  markAsReadThunk,
  sendMessageThunk,
} from "../../../redux/slice/chatSlice";
import { aiService } from "../../../service/aiService";
import "./style.scss";

const formatChatTime = (dateString) => {
  if (!dateString) return "";

  return new Date(dateString).toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
  });
};

const normalizeChatListItem = (chat, index) => ({
  ...chat,
  id: chat.chatId ?? chat.id ?? `chat-${index}`,
  type: "seller",
  name: chat.sellerName || chat.shopName || `Seller ${chat.sellerId ?? ""}`,
  avatar:
    chat.sellerAvatarUrl ||
    chat.avatar ||
    "https://api.dicebear.com/7.x/initials/svg?seed=Seller",
  lastMessage: chat.latestMessagePreview || "No messages yet",
  text: chat.latestMessagePreview || "No messages yet",
  time: formatChatTime(chat.latestMessageAtUtc),
  unread: chat.unreadCount ?? 0,
});

const createMessageId = () => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random()}`;
};

const formatAiTime = (dateString) =>
  new Date(dateString).toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
  });

const toAiHistory = (messages) =>
  messages
    .filter(
      (item) =>
        item.id !== "welcome" &&
        item.status !== "failed" &&
        item.status !== "sending" &&
        item.content?.trim().length > 0,
    )
    .slice(-20)
    .map(({ role, content }) => ({
      role,
      content,
    }));

const ChatBox = () => {
  const { chats, currentChat, loading, sending } = useSelector(
    (state) => state.chat,
  );
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const currentUserId = useSelector(
    (state) =>
      state.user.userInfo?.userId ||
      state.user.userInfo?.id ||
      state.user.userInfo?.sub,
  );

  const conversations = useMemo(
    () => [
      {
        id: "ai",
        type: "ai",
        name: "Secom AI",
        sender: "ai",
        avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=SecomAI",
        text: "Hi 👋 I'm Secom AI. How can I help you today?",
        lastMessage: "Hi 👋 I'm Secom AI. How can I help you today?",
        unread: 0,
      },
      ...(Array.isArray(chats)
        ? chats.filter(Boolean).map((chat, index) =>
            normalizeChatListItem(chat, index),
          )
        : []),
    ],
    [chats],
  );

  const [open, setOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(
    conversations[0],
  );
  const dispatch = useDispatch();
  const [aiLoading, setAiLoading] = useState(false);
  const aiAbortControllerRef = useRef(null);
  const markedChatIdsRef = useRef(new Set());
  const hasAutoSelectedRef = useRef(false);
  const [aiMessages, setAiMessages] = useState([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi 👋 I'm Secom AI. How can I help you today?",
      createdAt: new Date().toISOString(),
      status: "sent",
    },
  ]);

  useEffect(() => {
    return () => {
      aiAbortControllerRef.current?.abort();
    };
  }, []);

  const fetchChatList = useCallback(() => {
    if (!isAuthenticated) return undefined;

    return dispatch(
      getChatsThunk({
        page: 1,
        pageSize: 20,
      }),
    );
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    fetchChatList();
  }, [fetchChatList]);

  useEffect(() => {
    if (open) {
      fetchChatList();
      return;
    }

    hasAutoSelectedRef.current = false;
  }, [fetchChatList, open]);

  useEffect(() => {
    if (!selectedConversation) {
      queueMicrotask(() => {
        setSelectedConversation(conversations[0]);
      });
      return;
    }

    const updatedConversation = conversations.find(
      (conversation) => conversation.id === selectedConversation.id,
    );

    if (updatedConversation && updatedConversation !== selectedConversation) {
      queueMicrotask(() => {
        setSelectedConversation(updatedConversation);
      });
    }
  }, [conversations, selectedConversation]);

  const loadConversation = useCallback(
    async (conversation) => {
      setSelectedConversation(conversation);

      if (conversation.type === "ai") return;

      await dispatch(
        getChatDetailThunk({
          chatId: conversation.id,
          page: 1,
          pageSize: 50,
        }),
      ).unwrap();

      if (!markedChatIdsRef.current.has(conversation.id)) {
        markedChatIdsRef.current.add(conversation.id);
        await dispatch(markAsReadThunk(conversation.id)).unwrap();
        fetchChatList();
      }
    },
    [dispatch, fetchChatList],
  );

  useEffect(() => {
    if (!open || hasAutoSelectedRef.current) return;

    const firstSellerConversation = conversations.find(
      (conversation) => conversation.type !== "ai",
    );

    if (!firstSellerConversation) return;

    hasAutoSelectedRef.current = true;
    queueMicrotask(() => {
      loadConversation(firstSellerConversation).catch((error) => {
        toast.error(error || "Cannot load chat");
      });
    });
  }, [conversations, loadConversation, open]);

  const handleSelectConversation = (conversation) => {
    loadConversation(conversation).catch((error) => {
      toast.error(error || "Cannot load chat");
    });
  };

  useEffect(() => {
    const handleOpenChat = async (event) => {
      const chatId = event.detail?.chatId;

      if (!chatId) return;

      setOpen(true);

      const existingConversation = conversations.find(
        (conversation) => conversation.id === chatId,
      );
      const conversation =
        existingConversation ||
        normalizeChatListItem(
          {
            chatId,
            sellerId: event.detail?.sellerId,
            sellerName: event.detail?.sellerName,
            sellerAvatarUrl: event.detail?.sellerAvatarUrl,
            latestMessagePreview: "No messages yet",
            unreadCount: 0,
          },
          0,
        );

      await loadConversation(conversation);
      fetchChatList();
    };

    window.addEventListener("secom:open-chat", handleOpenChat);

    return () => {
      window.removeEventListener("secom:open-chat", handleOpenChat);
    };
  }, [conversations, fetchChatList, loadConversation]);

  const sellerMessages = useMemo(
    () =>
      [...(currentChat?.messages ?? [])].sort(
        (firstMessage, secondMessage) =>
          new Date(firstMessage.createdAtUtc ?? 0).getTime() -
          new Date(secondMessage.createdAtUtc ?? 0).getTime(),
      ),
    [currentChat?.messages],
  );
  const messages =
    selectedConversation?.type === "ai" ? aiMessages : sellerMessages;

  const sendAiMessage = async (text, historySource) => {
    const content = text.trim();

    if (!content || aiLoading) return;

    const createdAt = new Date().toISOString();
    const userMessage = {
      id: createMessageId(),
      role: "user",
      content,
      createdAt,
      time: formatAiTime(createdAt),
      status: "sent",
    };
    const loadingMessage = {
      id: createMessageId(),
      role: "assistant",
      content: "",
      createdAt: new Date().toISOString(),
      status: "sending",
    };
    const history = toAiHistory(historySource);
    const abortController = new AbortController();

    aiAbortControllerRef.current?.abort();
    aiAbortControllerRef.current = abortController;

    setAiLoading(true);
    setAiMessages([...historySource, userMessage, loadingMessage]);

    try {
      const response = await aiService.chatAi(
        {
          message: content,
          history,
        },
        abortController.signal,
      );
      const responseCreatedAt = response.generatedAtUtc || new Date().toISOString();

      const aiMessage = {
        id: loadingMessage.id,
        role: "assistant",
        content: response.message,
        createdAt: responseCreatedAt,
        time: formatAiTime(responseCreatedAt),
        model: response.model,
        status: "sent",
      };

      setAiMessages((prev) =>
        prev.map((message) =>
          message.id === loadingMessage.id ? aiMessage : message,
        ),
      );
    } catch (error) {
      if (abortController.signal.aborted) return;

      const failedMessage = {
        id: loadingMessage.id,
        role: "assistant",
        content: error.message || "Không gửi được tin nhắn AI.",
        createdAt: new Date().toISOString(),
        status: "failed",
        retryText: content,
      };

      setAiMessages((prev) =>
        prev.map((message) =>
          message.id === loadingMessage.id ? failedMessage : message,
        ),
      );
      toast.error(failedMessage.content);
    } finally {
      if (aiAbortControllerRef.current === abortController) {
        aiAbortControllerRef.current = null;
        setAiLoading(false);
      }
    }
  };

  const handleSendAI = async (text) => {
    await sendAiMessage(text, aiMessages);
  };

  const handleRetryAI = async (failedMessage) => {
    if (!failedMessage?.retryText || aiLoading) return;

    const historyWithoutFailed = aiMessages.filter(
      (message) => message.id !== failedMessage.id,
    );
    setAiMessages(historyWithoutFailed);
    await sendAiMessage(failedMessage.retryText, historyWithoutFailed);
  };

  const handleSendSeller = async (text) => {
    const content = text.trim();

    if (!selectedConversation?.id || !content || sending) return;

    try {
      await dispatch(
        sendMessageThunk({
          chatId: selectedConversation.id,
          data: { content },
        }),
      ).unwrap();

      dispatch(
        getChatDetailThunk({
          chatId: selectedConversation.id,
          page: 1,
          pageSize: 50,
        }),
      );
      fetchChatList();
    } catch (error) {
      toast.error(error || "Cannot send message");
      throw error;
    }
  };

  return (
    <>
      <button className="chat-toggle-btn" onClick={() => setOpen(true)}>
        <MessageCircle size={22} />

        <span className="hidden sm:block">Chat</span>
      </button>

      <div
        className={`chatbox-container ${open ? "chatbox-container--open" : ""}`}
      >
        <ChatSidebar
          conversations={conversations}
          selectedConversation={selectedConversation}
          onSelectConversation={handleSelectConversation}
          setOpen={setOpen}
        />

        <ChatContent
          selectedConversation={selectedConversation}
          currentChat={messages}
          currentUserId={currentUserId}
          loading={selectedConversation?.type === "ai" ? aiLoading : loading}
          sending={sending}
          onSendAI={handleSendAI}
          onRetryAI={handleRetryAI}
          onSendSeller={handleSendSeller}
        />
      </div>
    </>
  );
};

export default ChatBox;
