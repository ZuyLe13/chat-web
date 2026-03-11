import { Search, Send, MoreVertical, Phone, Video } from 'lucide-react';
import { useMessageStore } from '../stores/useMessageStore';
import { useEffect, useState } from 'react';

const DUMMY_USERS = [
  {
    id: 2,
    name: 'Alice Cooper',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
    lastMessage: 'See you tomorrow!',
    time: '10:30 AM',
    unread: 2
  },
  {
    id: 3,
    name: 'Bob Singer',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
    lastMessage: 'Thanks for the help.',
    time: 'Yesterday',
    unread: 0
  },
  {
    id: 4,
    name: 'Charlie Day',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
    lastMessage: 'Let me check on that...',
    time: 'Tuesday',
    unread: 0
  },
  {
    id: 5,
    name: 'Diana Prince',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diana',
    lastMessage: 'Are we still on for lunch?',
    time: 'Monday',
    unread: 1
  },
];

const ChatPage = () => {
  const {
    activeContactId,
    setActiveContact,
    addMessage,
    messages
  } = useMessageStore()
  const [message, setMessage] = useState('')

  useEffect(() => {
    setActiveContact(DUMMY_USERS[0].id)
  }, [])

  const handleActiveContact = (id: number) => {
    setActiveContact(id)
  }

  const handleSendMessages = (text: string) => {
    const message = {
      id: Math.floor(Math.random() * 1000),
      text: text,
      senderId: 1,
      receiverId: activeContactId ?? 0,
      timestamp: new Date(),
      isRead: false
    }
    addMessage(message)
  }

  const activeMessages = messages.filter((msg) =>
    (msg.senderId === 1 && msg.receiverId === activeContactId) ||
    (msg.senderId === activeContactId && msg.receiverId === 1)
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!message.trim()) return;
    handleSendMessages(message)
    setMessage("")
  }

  return (
    <div className="chat-container">
      {/* List User / Left Section */}
      <div className="chat-sidebar">
        <div className="chat-search">
          <Search className="search-icon" size={18} />
          <input type="text" placeholder="Search users..." />
        </div>
        <div className="chat-user-list">
          {DUMMY_USERS.map((user) => (
            <div
              onClick={() => handleActiveContact(user.id)}
              className={activeContactId === user.id ? 'chat-user-item active' : 'chat-user-item'}
              key={user.id}
            >
              <img src={user.avatar} alt={user.name} />
              <div className="chat-user-info">
                <h4>{user.name}</h4>
                <p>{user.lastMessage}</p>
              </div>
              <div className="chat-user-meta">
                <span>{user.time}</span>
                {user.unread > 0 && <span className="unread-badge">{user.unread}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat / Right Section */}
      <div className="chat-main">
        <div className="chat-header">
          <div className="chat-header-info">
            <img src={DUMMY_USERS.find(user => user.id === activeContactId)?.avatar} alt="Alice Cooper" />
            <div>
              <h3>{DUMMY_USERS.find(user => user.id === activeContactId)?.name}</h3>
              <span className="online-status">Online</span>
            </div>
          </div>
          <div className="chat-header-actions">
            <button><Phone size={20} /></button>
            <button><Video size={20} /></button>
            <button><MoreVertical size={20} /></button>
          </div>
        </div>
        <div className="chat-messages">
          {activeMessages.map(msg => (
            <div key={msg.id} className={`message ${msg.senderId === 1 ? 'sent' : 'received'}`}>
              <div className="message-content">
                {msg.text}
              </div>
              <div className="message-time">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          ))}
        </div>
        <form className="chat-input-area" onSubmit={handleSubmit}>
          <input
            value={message}
            placeholder="Type a message..."
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type='submit' className="send-btn">
            <Send size={20} />
          </button>
        </form>
      </div>
    </div>
  )
}

export default ChatPage
