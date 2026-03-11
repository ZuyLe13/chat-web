import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Messages } from "../types/message";
import type { User } from "../types/user";

interface MessageState {
  currentUser: User | null
  contacts: User[]
  messages: Messages[]
  activeContactId: number | null

  setActiveContact: (id: number) => void
  addMessage: (message: Messages) => void
}

export const useMessageStore = create<MessageState>()(
  persist(
    (set, get) => ({
      currentUser: { id: 1, name: 'Admin', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin' },
      contacts: [],
      messages: [],
      activeContactId: null,

      setActiveContact: (id: number) => {
        set({ activeContactId: id })
        const currentMessages = get().messages;
        const updatedMessages = currentMessages.map(message =>
          (message.senderId === id && !message.isRead) ? { ...message, isRead: true } : message
        );
        set({ messages: updatedMessages });
      },

      addMessage: (message: Messages) => set((state) => ({
        messages: [...state.messages, message]
      })),
    }),
    {
      name: 'chat-storage', // unique name for localStorage key
    }
  )
);
