import { v4 as uuid } from "uuid";

interface IReminder {
  readonly id?: string;
  title: string;
  content: string;
  status?: string;
  concludedAt?: Date | null;
  readonly createdAt?: Date;
  updatedAt?: Date;
}

class Reminder implements IReminder {
  readonly id?: string;
  title: string;
  content: string;
  status: string;
  concludedAt?: Date | null;
  readonly createdAt?: Date;
  updatedAt?: Date;

  constructor({
    id,
    title,
    content,
    status,
    concludedAt,
    createdAt,
    updatedAt,
  }: IReminder) {
    this.id = id || uuid();
    this.title = title;
    this.content = content;
    this.status = status || "pending";
    this.concludedAt = concludedAt || null;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  public getId = (): string => this.id || "";
  public getTitle = (): string => this.title || "";
  public getContent = (): string => this.content || "";
  public getStatus = (): string => this.status || "";
  public getConcludedAt = (): Date | null => this.concludedAt || null;
  public getCreatedAt = (): Date => this.createdAt || new Date();
  public getUpdatedAt = (): Date => this.updatedAt || new Date();

  public setTitle = (title: string) => (this.title = title);
  public setContent = (content: string) => (this.content = content);
  public setStatus = (status: string) => (this.status = status);
  public setConcludedAt = (concludedAt: Date | null) =>
    (this.concludedAt = concludedAt);
}

export { Reminder, IReminder };
