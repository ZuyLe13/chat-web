import { Search, Send, MoreVertical, Phone, Video, Copy, Trash2, X, ChevronLeft } from 'lucide-react';
import { useMessageStore } from '../stores/useMessageStore';
import { useEffect, useRef, useState, useMemo } from 'react';
import { formatTime } from '../utils/formatTime';

const DUMMY_USERS = [
  { id: 2, name: 'Alice Cooper', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice' },
  { id: 3, name: 'Bob Singer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob' },
  { id: 4, name: 'Charlie Day', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie' },
  { id: 5, name: 'Diana Prince', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Diana' },
  { id: 6, name: 'Eve Adams', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Eve' },
  { id: 7, name: 'Frank Miller', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Frank' },
  { id: 8, name: 'Grace Hopper', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Grace' },
  { id: 9, name: 'Hank Pym', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hank' },
];

const AUTO_REPLIES = [
  "Hello!", "How are you?", "Sure, sounds good!", "Haha 😂",
  "Hmm, let me think about that...", "No way! Really? 😮",
  "I'll get back to you on that.", "Makes sense to me 👍",
  "Absolutely!", "Okay 😄",
];

const messageType = {
  SENT: 'sent',
  RECEIVED: 'received'
}

const ChatPage = () => {
  const {
    activeContactId,
    setActiveContact,
    addMessage,
    deleteMessage,
    messages
  } = useMessageStore()
  const [message, setMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [openMenuId, setOpenMenuId] = useState<number | null>(null)
  const [showChat, setShowChat] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, activeContactId, isTyping])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    setActiveContact(DUMMY_USERS[0].id)
  }, [])

  const handleActiveContact = (id: number) => {
    setActiveContact(id)
    setShowChat(true)
  }

  const handleSendMessages = (text: string) => {
    const message = {
      id: Math.floor(Math.random() * 1000000),
      text: text,
      senderId: 1,
      receiverId: activeContactId ?? 0,
      timestamp: new Date(),
      isRead: false
    }
    addMessage(message)

    // Auto-reply simulation
    const delay = 1000 + Math.random() * 1000
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      const reply = {
        id: Math.floor(Math.random() * 1000000),
        text: AUTO_REPLIES[Math.floor(Math.random() * AUTO_REPLIES.length)],
        senderId: activeContactId ?? 0,
        receiverId: 1,
        timestamp: new Date(),
        isRead: true
      }
      addMessage(reply)
    }, delay)
  }

  const activeMessages = useMemo(() =>
    messages.filter((msg) =>
      (msg.senderId === 1 && msg.receiverId === activeContactId) ||
      (msg.senderId === activeContactId && msg.receiverId === 1)
    ), [messages, activeContactId]);

  const lastMessagesMap = useMemo(() => {
    const map: Record<number, any> = {};
    messages.forEach(msg => {
      const otherId = msg.senderId === 1 ? msg.receiverId : msg.senderId;
      if (!map[otherId] || new Date(msg.timestamp) > new Date(map[otherId].timestamp)) {
        map[otherId] = msg;
      }
    });
    return map;
  }, [messages]);

  const filteredUsers = useMemo(() =>
    DUMMY_USERS.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    ), [searchQuery]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!message.trim()) return;
    handleSendMessages(message)
    setMessage("")
  }

  return (
    <div className={`chat-container ${showChat ? 'show-chat' : ''}`}>
      {/* List User / Left Section */}
      <div className="chat-sidebar">
        <div className="chat-search">
          <Search className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
              <X size={16} />
            </button>
          )}
        </div>
        <div className="chat-user-list">
          {filteredUsers.map((user) => {
            const lastMessage = lastMessagesMap[user.id];

            return (
              <div
                onClick={() => handleActiveContact(user.id)}
                className={activeContactId === user.id ? 'chat-user-item active' : 'chat-user-item'}
                key={user.id}
              >
                <img src={user.avatar} alt={user.name} />
                <div className="chat-user-info" style={{ overflow: 'hidden' }}>
                  <h4>{user.name}</h4>
                  {lastMessage && (
                    <p className='last-message'>
                      {lastMessage.senderId === 1 ? 'You: ' : ``}
                      {lastMessage.text}
                    </p>
                  )}
                </div>
                <div className="chat-user-meta">
                  {lastMessage && <span>{formatTime(lastMessage.timestamp)}</span>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Chat / Right Section */}
      <div className="chat-main">
        <div className="chat-header">
          <div className="chat-header-info">
            <button className="chat-back-btn" onClick={() => setShowChat(false)}>
              <ChevronLeft size={24} />
            </button>
            <img src={DUMMY_USERS.find(user => user.id === activeContactId)?.avatar} alt="Active Contact" />
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
          {activeMessages.length === 0 ? (
            <div className="no-messages">
              No messages yet. Say hello!
            </div>
          ) : (
            activeMessages.map(msg => (
              <div key={msg.id} className={`message ${msg.senderId === 1 ? messageType.SENT : messageType.RECEIVED}`}>
                <div className="message-bubble">
                  <div className="message-content">
                    {msg.text}
                  </div>
                  <div className="msg-menu-wrap" ref={openMenuId === msg.id ? menuRef : null}>
                    <button
                      className="msg-menu-btn"
                      onClick={() => setOpenMenuId(openMenuId === msg.id ? null : msg.id)}
                    >
                      <MoreVertical size={15} />
                    </button>
                    {openMenuId === msg.id && (
                      <div className={`msg-dropdown ${msg.senderId === 1 ? messageType.SENT : messageType.RECEIVED}`}>
                        <button onClick={() => { navigator.clipboard.writeText(msg.text); setOpenMenuId(null); }}>
                          <Copy size={13} /> Copy
                        </button>
                        <button className="danger" onClick={() => { deleteMessage(msg.id); setOpenMenuId(null); }}>
                          <Trash2 size={13} /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="message-time">
                  {formatTime(msg.timestamp)}
                </div>
              </div>
            ))
          )}
          {isTyping && (
            <div className="message received">
              <div className="message-content typing-indicator">
                <span className="typing-dot" />
                <span className="typing-dot" />
                <span className="typing-dot" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
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
