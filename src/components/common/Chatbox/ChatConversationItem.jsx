const ChatConversationItem = ({ item, active, onClick }) => {
  return (
    <div
      className={`conversation-item ${active ? "active" : ""}`}
      onClick={onClick}
    >
    
      <div className="conversation-item__avatar">
        <img src={item.avatar} alt={item.name} />

        {item.unread > 0 && <span className="unread-dot" />}
      </div>

     
      <div className="conversation-item__content">
        <div className="conversation-item__top">
          <h4>{item.name}</h4>

          <span>{item.time}</span>
        </div>

        <div className="conversation-item__bottom">
          <p>{item.lastMessage}</p>

          {item.unread > 0 && <div className="count">{item.unread}</div>}
        </div>
      </div>
    </div>
  );
};

export default ChatConversationItem;
