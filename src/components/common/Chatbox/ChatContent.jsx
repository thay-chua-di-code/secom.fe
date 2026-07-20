import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import { Bot } from "lucide-react";
import { useEffect, useRef } from "react";
const ChatContent = ({
  selectedConversation,
  currentChat,
  currentUserId,
  loading,
  sending,
  onSendAI,
  onSendSeller,
}) => {
  const isAI = selectedConversation?.type === "ai";
  const aiObject = {
    text: currentChat?.text,
    sender: "ai",
    time: "Now",
  };
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [currentChat]);
  return (
    <div className="chat-content">
      {/* HEADER */}
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
      </div>

      {/* BODY */}
      <div className="chat-content__body">
        {isAI && (
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
              <button>📦 Order</button>
              <button>🛍️ Product</button>
              <button>🚚 Shipping</button>
              <button>🎁 Voucher</button>
            </div>

            <ChatMessage message={aiObject} />
          </div>
        )}

        {!isAI && !loading && currentChat?.length === 0 && (
          <div className="chat-empty">No messages yet.</div>
        )}

        {currentChat?.map((msg) => {
          const isOwnMessage = isAI
            ? msg.sender === "user"
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
            />
          );
        })}

        {loading && (
          <div className="typing">
            <span />
            <span />
            <span />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* FOOTER */}
      <ChatInput
        isAi={isAI}
        onSend={isAI ? onSendAI : onSendSeller}
        disabled={loading || sending}
      />
    </div>
  );
};

export default ChatContent;
