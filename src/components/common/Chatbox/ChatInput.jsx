import { SendHorizonal } from "lucide-react";

const ChatInput = () => {
  return (
    <div className="chat-content__footer">
      <input type="text" placeholder="Enter message..." />

      <button>
        <SendHorizonal size={20} />
      </button>
    </div>
  );
};

export default ChatInput;
