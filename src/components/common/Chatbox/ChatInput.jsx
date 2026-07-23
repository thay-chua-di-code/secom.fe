import { SendHorizonal } from "lucide-react";
import { useState } from "react";

const MAX_MESSAGE_LENGTH = 4000;

const ChatInput = ({ isAi, onSend, disabled = false }) => {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const trimmedMessage = message.trim();
  const isDisabled = disabled || isSending;

  const handleSend = async () => {
    const text = message.trim();

    if (!text || isDisabled) return;

    try {
      setIsSending(true);
      await onSend?.(text);
      setMessage("");
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.nativeEvent?.isComposing) return;

    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-content__footer">
      <div className="chat-input-wrapper">
        <textarea
          value={message}
          placeholder={isAi ? "Ask Secom AI anything..." : "Enter message..."}
          onChange={(event) => setMessage(event.target.value.slice(0, MAX_MESSAGE_LENGTH))}
          onKeyDown={handleKeyDown}
          disabled={isDisabled}
          rows={1}
          maxLength={MAX_MESSAGE_LENGTH}
        />
        {isAi && (
          <span className="chat-input-counter">
            {message.length}/{MAX_MESSAGE_LENGTH}
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={handleSend}
        disabled={!trimmedMessage || isDisabled}
        aria-label={isAi ? "Send AI message" : "Send message"}
      >
        <SendHorizonal size={20} />
      </button>
    </div>
  );
};

export default ChatInput;
