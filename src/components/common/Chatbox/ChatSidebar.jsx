import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";

import ChatConversationItem from "./ChatConversationItem";

const ChatSidebar = ({
  conversations = [],
  selectedConversation,
  onSelectConversation,
  setOpen,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const sellerConversations = conversations.filter(
    (item) => item?.type !== "ai",
  );

  const filteredConversations = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();

    if (!keyword) return conversations.filter(Boolean);

    return conversations.filter((item) => {
      if (!item) return false;

      return (
        item.name?.toLowerCase().includes(keyword) ||
        item.lastMessage?.toLowerCase().includes(keyword) ||
        item.text?.toLowerCase().includes(keyword)
      );
    });
  }, [conversations, searchTerm]);

  return (
    <div className="chat-sidebar">
      <div className="chat-sidebar__header">
        <h3>
          Chat
          <span>({sellerConversations.length})</span>
        </h3>

        <button onClick={() => setOpen(false)}>
          <X size={18} />
        </button>
      </div>

      <div className="chat-sidebar__search">
        <Search size={18} />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="chat-sidebar__list">
        {filteredConversations.length === 0 ? (
          <div className="chat-empty">Cannot find chat conversation.</div>
        ) : (
          filteredConversations.map((item, index) => (
            <ChatConversationItem
              key={item.id ?? `conversation-${index}`}
              item={item}
              active={selectedConversation?.id === item.id}
              onClick={() => onSelectConversation(item)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;
