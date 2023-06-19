import { v4 as uuid } from 'uuid';

interface IFriend {
  readonly id?: string;
  recipient: string;
  sender: string;
  messages?: Message[];
  senderIsBlocked?: boolean;
  recipientIsBlocked?: boolean;
  readonly createdAt?: Date;
  updatedAt?: Date;
}

class Friend implements IFriend {
  readonly id: string;
  recipient: string;
  sender: string;
  messages: Message[];
  senderIsBlocked: boolean;
  recipientIsBlocked: boolean;
  readonly createdAt: Date;
  updatedAt: Date;

  constructor({ id, recipient, sender, messages, senderIsBlocked, recipientIsBlocked, createdAt, updatedAt }: IFriend) {
    this.id = id || uuid();
    this.recipient = recipient;
    this.sender = sender;
    this.messages = messages || [];
    this.senderIsBlocked = senderIsBlocked || false;
    this.recipientIsBlocked = recipientIsBlocked || false;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  public getId = (): string => this.id;

  public getRecipient = (): string => this.recipient;

  public getSender = (): string => this.sender;

  public getMessages = (): Message[] => this.messages;
  public setMessage = (message: Message): Message[] => this.messages = [...this.messages, message];

  public readMessages = (myId: string): void => {
    this.messages = this.messages.map((message) => {
      let newMessage = new Message(message);
      if (newMessage.getSendBy() !== myId) newMessage.toggleRead();
      return newMessage;
    });

    this.setUpdatedAt();
  };

  public removeReact = (react: React): void => {
    this.messages = this.messages.map((message) => {
      let newMessage = new Message(message);
      let newRect = new React(react);
      if (newMessage.getSendBy() !== this.getRecipient()) newMessage.removeReact(newRect.getId());
      return newMessage;
    });
  };

  public getSenderIsBlocked = (): boolean => this.senderIsBlocked;
  public setSenderIsBlocked = (senderIsBlocked: boolean): boolean => this.senderIsBlocked = senderIsBlocked;
  public toggleSenderIsBlocked = (): void => {
    this.senderIsBlocked = !this.senderIsBlocked;
    this.setUpdatedAt();
  };

  public getRecipientIsBlocked = (): boolean => this.recipientIsBlocked;
  public setRecipientIsBlocked = (recipientIsBlocked: boolean): boolean => this.recipientIsBlocked = recipientIsBlocked;
  public toggleRecipientIsBlocked = (): void => {
    this.recipientIsBlocked = !this.recipientIsBlocked;
    this.setUpdatedAt();
  };

  public getCreatedAt = (): Date => this.createdAt;

  public getUpdatedAt = (): Date => this.updatedAt;
  public setUpdatedAt = (): Date => this.updatedAt = new Date();
}

interface IMessage {
  readonly id?: string;
  sendBy: string;
  content: string;
  read?: boolean;
  readAt?: Date | null;
  reacts?: React[];
  readonly createdAt?: Date;
  updatedAt?: Date;
}

class Message implements IMessage {
  readonly id: string;
  sendBy: string;
  content: string;
  read: boolean;
  readAt: Date | null;
  reacts: React[];
  readonly createdAt: Date;
  updatedAt: Date;

  constructor({ id, sendBy, content, read, readAt, reacts, createdAt, updatedAt }: IMessage) {
    this.id = id || uuid();
    this.sendBy = sendBy;
    this.content = content;
    this.read = read || false;
    this.readAt = readAt || null;
    this.reacts = reacts || [];
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  public getId = (): string => this.id;

  public getSendBy = (): string => this.sendBy;

  public getContent = (): string => this.content;
  public setContent = (content: string): string => this.content = content;

  public getRead = (): boolean => this.read;
  public setRead = (read: boolean): boolean => this.read = read;
  public toggleRead = (): void => {
    this.read = !this.read;
    this.setReadAt(new Date());
    this.setUpdatedAt();
  };

  public getReadAt = (): Date | null => this.readAt;
  public setReadAt = (readAt: Date): Date => this.readAt = readAt;

  public getReacts = (): React[] => this.reacts;
  public setReact = (react: React) => this.reacts.push(react);
  public removeReact = (reactId: string) => this.reacts = this.reacts.filter(react => react.getId() !== reactId);

  public getCreatedAt = (): Date => this.createdAt;

  public getUpdatedAt = (): Date => this.updatedAt;
  public setUpdatedAt = (): Date => this.updatedAt = new Date();
}

interface IReact {
  readonly id?: string;
  sendBy: string;
  content: string;
  readonly createdAt?: Date;
  updatedAt?: Date;
}

class React implements IReact {
  readonly id: string;
  sendBy: string;
  content: string;
  readonly createdAt: Date;
  updatedAt: Date;

  constructor({ id, sendBy, content, createdAt, updatedAt }: IReact) {
    this.id = id || uuid();
    this.sendBy = sendBy;
    this.content = content;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  public getId = (): string => this.id;

  public getSendBy = (): string => this.sendBy;

  public getContent = (): string => this.content;
  public setContent = (content: string): string => this.content = content;

  public getCreatedAt = (): Date => this.createdAt;

  public getUpdatedAt = (): Date => this.updatedAt;
  public setUpdatedAt = (): Date => this.updatedAt = new Date();
}

interface IFriendSolictation {
  readonly id?: string;
  senderId: string;
  recipientId: string;
  accepted?: boolean;
  readonly createdAt?: Date;
  updatedAt?: Date;
}

class FriendSolictation implements IFriendSolictation {
  readonly id: string;
  senderId: string;
  recipientId: string;
  accepted: boolean;
  readonly createdAt: Date;
  updatedAt: Date;

  constructor({ id, senderId, recipientId, accepted, createdAt, updatedAt }: IFriendSolictation) {
    this.id = id || uuid();
    this.senderId = senderId;
    this.recipientId = recipientId;
    this.accepted = accepted || false;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  public getId = (): string => this.id;

  public getSenderId = (): string => this.senderId;

  public getRecipientId = (): string => this.recipientId;

  public getAccepted = (): boolean => this.accepted;
  public setAccepted = (accepted: boolean): boolean => this.accepted = accepted;
  public toggleAccepted = (): void => {
    this.accepted = !this.accepted;
    this.setUpdatedAt();
  };

  public getCreatedAt = (): Date => this.createdAt;

  public getUpdatedAt = (): Date => this.updatedAt;
  public setUpdatedAt = (): Date => this.updatedAt = new Date();
}

export { Friend, Message, React, FriendSolictation };
