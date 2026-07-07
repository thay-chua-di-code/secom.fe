import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatContent from "./ChatContent";
import { useDispatch, useSelector } from "react-redux";
import {
  getChatsThunk,
  getChatDetailThunk,
} from "../../../redux/slice/chatSlice";
import { aiService } from "../../../service/aiService";
import "./style.scss";

const ChatBox = () => {
  const { chats, currentChat, loading } = useSelector((state) => state.chat);

  const conversations = [
    {
      id: "ai",
      type: "ai",
      name: "Secom AI",
      sender: "ai",
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=SecomAI",
      text: "Hi 👋 I'm Secom AI. How can I help you today?",
      unread: 0,
    },

    ...(Array.isArray(chats)
      ? chats.filter(Boolean).map((chat, index) => ({
          ...chat,
          id: chat.id ?? `chat-${index}`,

          type: "seller",
        }))
      : []),
  ];

  const [open, setOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(
    conversations[0],
  );
  const dispatch = useDispatch();
  const [aiLoading, setAiLoading] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    {
      id: "welcome",
      sender: "ai",
      text: "Hi 👋 I'm Secom AI. How can I help you today?",
      time: "Now",
    },
  ]);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);

    if (conversation.type !== "ai") {
      dispatch(getChatDetailThunk(conversation.id));
    }
  };

  const messages =
    selectedConversation?.type === "ai"
      ? aiMessages
      : (currentChat?.messages ?? []);

  useEffect(() => {
    dispatch(
      getChatsThunk({
        pageNumber: 1,
        pageSize: 20,
      }),
    );
  }, [dispatch]);

  // Handle send message to AI
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

  // Handle send message to AI
  const handleSendSeller = () => {
    alert("hello");
  };
  return (
    <>
      {/* FLOAT BUTTON */}
      <button className="chat-toggle-btn" onClick={() => setOpen(true)}>
        <MessageCircle size={22} />

        <span className="hidden sm:block">Chat</span>
      </button>

      {/* CHATBOX */}
      <div
        className={`chatbox-container ${open ? "chatbox-container--open" : ""}`}
      >
        {/* SIDEBAR */}
        <ChatSidebar
          conversations={conversations}
          selectedConversation={selectedConversation}
          onSelectConversation={handleSelectConversation}
          setOpen={setOpen}
        />

        {/* CONTENT */}
        <ChatContent
          selectedConversation={selectedConversation}
          currentChat={messages}
          loading={selectedConversation.type === "ai" ? aiLoading : loading}
          onSendAI={handleSendAI}
          onSendSeller={handleSendSeller}
        />
      </div>
    </>
  );
};

export default ChatBox;
