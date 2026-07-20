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
  const markedChatIdsRef = useRef(new Set());
  const hasAutoSelectedRef = useRef(false);
  const [aiMessages, setAiMessages] = useState([
    {
      id: "welcome",
      sender: "ai",
      text: "Hi 👋 I'm Secom AI. How can I help you today?",
      time: "Now",
    },
  ]);

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
      setSelectedConversation(conversations[0]);
      return;
    }

    const updatedConversation = conversations.find(
      (conversation) => conversation.id === selectedConversation.id,
    );

    if (updatedConversation && updatedConversation !== selectedConversation) {
      setSelectedConversation(updatedConversation);
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
    loadConversation(firstSellerConversation).catch((error) => {
      toast.error(error || "Cannot load chat");
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

  const handleSendAI = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: Date.now(),
      sender: "user",
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setAiMessages((prev) => [...prev, userMessage]);
    setAiLoading(true);

    try {
      const res = await aiService.chatAi(text);

      const aiMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: res.reply,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setAiMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setAiMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          sender: "ai",
          text: err.message,
          time: "Now",
        },
      ]);
    } finally {
      setAiLoading(false);
    }
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
          onSendSeller={handleSendSeller}
        />
      </div>
    </>
  );
};

export default ChatBox;
