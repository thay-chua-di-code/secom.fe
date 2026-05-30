// ChatSidebar.jsx

import { Search, X } from "lucide-react";

import ChatConversationItem from "./ChatConversationItem";

const ChatSidebar = ({
  conversations,
  selectedConversation,
  setSelectedConversation,
  setOpen,
}) => {
  return (
    <div className="chat-sidebar">
      {/* HEADER */}
      <div className="chat-sidebar__header">
        <h3>
          Chat
          <span>
            ({conversations.reduce((total, item) => total + item.unread, 0)})
          </span>
        </h3>

        <button onClick={() => setOpen(false)}>
          <X size={18} />
        </button>
      </div>

      {/* SEARCH */}
      <div className="chat-sidebar__search">
        <Search size={18} />

        <input type="text" placeholder="Tìm kiếm..." />
      </div>

      {/* LIST */}
      <div className="chat-sidebar__list">
        {conversations.map((item) => (
          <ChatConversationItem
            key={item.id}
            item={item}
            active={selectedConversation.id === item.id}
            onClick={() => setSelectedConversation(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
