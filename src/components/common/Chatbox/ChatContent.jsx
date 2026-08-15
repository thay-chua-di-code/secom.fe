import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { Bot, X } from "lucide-react";
import { useEffect, useRef } from "react";

const ChatContent = ({
  selectedConversation,
  currentChat,
  currentUserId,
  loading,
  sending,
  onSendAI,
  onRetryAI,
  onSendSeller,
  onClose,
}) => {
  const isAI = selectedConversation?.type === "ai";
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [currentChat, loading]);

  return (
    <div className="chat-content">
      <div className={`chat-content__header ${isAI ? "chat-ai-header" : ""}`}>
        <div className="shop-info">
          {isAI ? (
            <div className="ai-avatar">
              <Bot size={22} />
            </div>
          ) : (
            <img src={selectedConversation.avatar} alt="" />
          )}

          <div>
            <h4>{selectedConversation.name}</h4>
            <p>{isAI ? "AI Assistant • Always ready to help" : "Is active"}</p>
          </div>
        </div>

        <div className="chat-header-actions">
          <button
            type="button"
            aria-label="Close chat popup"
            title="Close chat"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      <div className="chat-content__body">
        {isAI && currentChat?.length <= 1 && (
          <div className="ai-welcome">
            <div className="ai-welcome__icon">
              <Bot size={40} />
            </div>

            <h2>Hi 👋</h2>

            <p>
              I'm <strong>Secom AI</strong>.
              <br />I can help you about:
            </p>

            <div className="quick-actions">
              <button type="button">📦 Order</button>
              <button type="button">🛍️ Product</button>
              <button type="button">🚚 Shipping</button>
              <button type="button">🎁 Voucher</button>
            </div>
          </div>
        )}

        {!isAI && !loading && currentChat?.length === 0 && (
          <div className="chat-empty">No messages yet.</div>
        )}

        {currentChat?.map((msg) => {
          const isOwnMessage = isAI
            ? msg.role === "user" || msg.sender === "user"
            : Boolean(
                currentUserId &&
                  msg.senderId &&
                  String(msg.senderId).toLowerCase() ===
                    String(currentUserId).toLowerCase(),
              );

          return (
            <ChatMessage
              key={msg.messageId || msg.id}
              message={msg}
              isOwnMessage={isOwnMessage}
              onRetry={isAI ? onRetryAI : undefined}
            />
          );
        })}

        {loading && !isAI && (
          <div className="typing">
            <span />
            <span />
            <span />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <ChatInput
        isAi={isAI}
        onSend={isAI ? onSendAI : onSendSeller}
        disabled={loading || sending}
      />
    </div>
  );
};

export default ChatContent;
