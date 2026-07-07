import { SendHorizonal } from "lucide-react";
import { useState } from "react";

const ChatInput = ({ isAi, onSend, disabled = false }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    const text = message.trim();

    if (!text || disabled) return;

    onSend?.(text);

    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-content__footer">
      <input
        type="text"
        value={message}
        placeholder={isAi ? "Ask Secom AI anything..." : "Enter message..."}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
      />

      <button onClick={handleSend} disabled={!message.trim() || disabled}>
        <SendHorizonal size={20} />
      </button>
    </div>
  );
};

export default ChatInput;
