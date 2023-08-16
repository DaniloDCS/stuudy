import { v4 as uuid } from "uuid";

interface IResume {
  readonly id?: string;
  title: string;
  content: string;
  readonly createdAt?: Date;
  updatedAt?: Date;
}

class Resume implements IResume {
  readonly id?: string;
  title: string;
  content: string;
  readonly createdAt?: Date;
  updatedAt?: Date;

  constructor({ id, title, content, createdAt, updatedAt }: IResume) {
    this.id = id || uuid();
    this.title = title;
    this.content = content;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  public getId = (): string => this.id || "";
  public getTitle = (): string => this.title || "";
  public getContent = (): string => this.content || "";
  public getCreatedAt = (): Date => this.createdAt || new Date();
  public getUpdatedAt = (): Date => this.updatedAt || new Date();

  public setTitle = (title: string) => (this.title = title);
  public setContent = (content: string) => (this.content = content);
}

export { Resume, IResume };