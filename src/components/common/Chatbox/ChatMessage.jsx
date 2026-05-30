const ChatMessage = ({ message }) => {
  return (
    <div
      className={`message-wrapper ${
        message.sender === "user"
          ? "message-wrapper--user"
          : "message-wrapper--shop"
      }`}
    >
      <div
        className={`message ${
          message.sender === "user" ? "message--user" : "message--shop"
        }`}
      >
        <p>{message.text}</p>

        <span>{message.time}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
