const formatMessageTime = (message) => {
  if (message?.time) return message.time;
  const dateValue = message?.createdAtUtc || message?.createdAt;
  if (!dateValue) return "";

  return new Date(dateValue).toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
  });
};

const ChatMessage = ({ message, isOwnMessage, onRetry }) => {
  const text = message?.text ?? message?.content ?? "";
  const isSending = message?.status === "sending";
  const isFailed = message?.status === "failed";
  const isAssistantAiMessage = !isOwnMessage && message?.role === "assistant";

  return (
    <div
      className={`message-wrapper ${
        isOwnMessage ? "message-wrapper--user" : "message-wrapper--shop"
      }`}
    >
      <div
        className={`message ${
          isOwnMessage ? "message--user" : "message--shop"
        } ${isFailed ? "message--failed" : ""}`}
      >
        {isSending ? (
          <div className="typing typing--inline" aria-label="AI is replying">
            <span />
            <span />
            <span />
          </div>
        ) : (
          isAssistantAiMessage ? (
            <AiMessageContent
              content={text}
              productReferences={message?.productReferences ?? []}
            />
          ) : (
            <p>{text}</p>
          )
        )}

        <div className="message__meta">
          <span>{isSending ? "Replying..." : formatMessageTime(message)}</span>
          {isFailed && onRetry && (
            <button type="button" onClick={() => onRetry(message)}>
              Retry
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
import AiMessageContent from "./AiMessageContent";
