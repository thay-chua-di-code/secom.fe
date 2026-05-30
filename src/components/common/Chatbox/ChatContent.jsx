import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";

const ChatContent = ({ selectedConversation, messages }) => {
  return (
    <div className="chat-content">
      {/* HEADER */}
      <div className="chat-content__header">
        <div className="shop-info">
          <img src={selectedConversation.avatar} alt="" />

          <div>
            <h4>{selectedConversation.name}</h4>

            <p>Đang hoạt động</p>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="chat-content__body">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
      </div>

      {/* FOOTER */}
      <ChatInput />
    </div>
  );
};

export default ChatContent;
