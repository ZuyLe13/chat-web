export interface Messages {
  id: number;
  text: string;
  senderId: number;
  receiverId: number;
  timestamp: Date;
  isRead: boolean;
}