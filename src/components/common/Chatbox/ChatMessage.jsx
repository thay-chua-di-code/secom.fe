const formatMessageTime = (message) => {
  if (message?.time) return message.time;
  if (!message?.createdAtUtc) return "";

  return new Date(message.createdAtUtc).toLocaleString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
  });
};

const ChatMessage = ({ message, isOwnMessage }) => {
  const text = message?.text ?? message?.content ?? "";

  return (
    <div
      className={`message-wrapper ${
        isOwnMessage ? "message-wrapper--user" : "message-wrapper--shop"
      }`}
    >
      <div
        className={`message ${
          isOwnMessage ? "message--user" : "message--shop"
        }`}
      >
        <p>{text}</p>

        <span>{formatMessageTime(message)}</span>
      </div>
    </div>
  );
};

export default ChatMessage;
