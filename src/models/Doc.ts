import { v4 as uuid } from "uuid";

interface IDoc {
  readonly id?: string;
  userId: string;
  title?: string;
  content?: string;
  updatedAt?: Date;
  createdAt?: Date;
}

class Doc implements IDoc {
  readonly id?: string;
  userId: string;
  title?: string;
  content?: string;
  updatedAt?: Date;
  createdAt?: Date;

  constructor({ id, userId, title, content, createdAt, updatedAt }: IDoc) {
    this.id = id || uuid();
    this.userId = userId;
    this.title = title || "Documento sem título";
    this.content = content || "";
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  public getId = (): string => this.id || "";
  public getUserId = (): string => this.userId || "";
  public getTitle = (): string => this.title || "";
  public getContent = (): string => this.content || "";
  public getCreatedAt = (): Date => this.createdAt || new Date();
  public getUpdatedAt = (): Date => this.updatedAt || new Date();

  public setTitle = (title: string) => (this.title = title);
  public setContent = (content: string) => {
    this.content = content;
    this.updatedAt = new Date();
  };
}
export { Doc, IDoc };
