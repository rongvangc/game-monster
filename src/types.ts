type User = {
  _id?: string;
  displayName: string;
  email: string;
  photoURL?: string;
};

type Room = {
  _id: string;
  name: string;
  userIds: User[];
  createdBy: string;
  admin: string;
  count: number;
  createdAt?: Date;
};

type CreateRoomType = {
  name: string;
  userIds: string[];
  createdBy: string;
  admin: string;
};

type UpdatedRoom = {
  roomId: string;
  count: number;
};

type Message = {
  roomId: string;
  content: string;
  senderId: string;
  recipientIds: string[];
  createdAt?: Date;
};

type MessageReceiver = {
  roomId: string;
  content: string;
  senderId: User;
  recipientIds: User[];
  createdAt?: Date;
};

type MessageRecipient = {
  messageId: string;
  recipientId: string;
  isRead: boolean;
  createdAt?: Date;
};

type ReadMessageData = {
  roomId: string;
  userId: string;
};
