import { Search, X } from "lucide-react";

import ChatConversationItem from "./ChatConversationItem";

const ChatSidebar = ({
  conversations = [],
  selectedConversation,
  onSelectConversation,
  setOpen,
}) => {
  const sellerConversations = conversations.filter(
    (item) => item?.type !== "ai",
  );

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
        <input type="text" placeholder="Tìm kiếm..." />
      </div>

      <div className="chat-sidebar__list">
        {conversations.filter(Boolean).length === 0 && (
          <div className="chat-empty">No conversations yet.</div>
        )}

        {conversations.filter(Boolean).map((item, index) => (
          <ChatConversationItem
            key={item.id ?? `conversation-${index}`}
            item={item}
            active={selectedConversation?.id === item.id}
            onClick={() => onSelectConversation(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatSidebar;
