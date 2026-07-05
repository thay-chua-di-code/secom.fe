import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import ChatSidebar from "./ChatSidebar";
import ChatContent from "./ChatContent";
import { useDispatch, useSelector } from "react-redux";
import {
  getChatsThunk,
  getChatDetailThunk,
} from "../../../redux/slice/chatSlice";

import "./style.scss";

const conversations = [
  {
    id: 1,
    name: "Titanus Store",
    avatar: "https://i.pravatar.cc/150?img=1",
    lastMessage: "Xin chào bạn 👋",
    time: "10:30",
    unread: 2,
  },
  {
    id: 2,
    name: "Secom Official",
    avatar: "https://i.pravatar.cc/150?img=2",
    lastMessage: "Đơn hàng đang được xử lý",
    time: "09:12",
    unread: 0,
  },
  {
    id: 3,
    name: "MemoryZone",
    avatar: "https://i.pravatar.cc/150?img=3",
    lastMessage: "Sản phẩm còn hàng nhé",
    time: "Hôm qua",
    unread: 5,
  },
];

const messages = [
  {
    id: 1,
    sender: "shop",
    text: "Xin chào 👋 Shop có thể hỗ trợ gì cho bạn?",
    time: "10:30",
  },
  {
    id: 2,
    sender: "user",
    text: "Mình muốn hỏi về sản phẩm.",
    time: "10:31",
  },
];

const ChatBox = () => {
  const [open, setOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(
    conversations[0],
  );
  const dispatch = useDispatch();
  const { chats, currentChat, loading } = useSelector((state) => state.chat);

  const handleSelectConversation = (conversation) => {
    dispatch(getChatDetailThunk(conversation.id));
  };
  useEffect(() => {
    dispatch(
      getChatsThunk({
        pageNumber: 1,
        pageSize: 20,
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    if (chats.length > 0 && !currentChat) {
      dispatch(getChatDetailThunk(chats[0].id));
    }
  }, [dispatch, chats, currentChat]);
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
          setSelectedConversation={setSelectedConversation}
          setOpen={setOpen}
        />

        {/* CONTENT */}
        <ChatContent
          selectedConversation={selectedConversation}
          messages={messages}
        />
      </div>
    </>
  );
};

export default ChatBox;
