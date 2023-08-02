import { v4 as uuid } from "uuid";

interface IWork {
  readonly id?: string;
  title: string;
  content: string;
  note?: number;
  link?: string;
  bulletinId?: string;
  readonly createdAt?: Date;
  updatedAt?: Date;
}

class Work implements IWork {
  readonly id?: string;
  title: string;
  content: string;
  link?: string;
  note?: number;
  bulletinId?: string;
  readonly createdAt?: Date;
  updatedAt?: Date;

  constructor({
    id,
    title,
    content,
    note,
    link,
    bulletinId,
    createdAt,
    updatedAt,
  }: IWork) {
    this.id = id || uuid();
    this.title = title;
    this.content = content;
    this.link = link;
    this.note = note;
    this.bulletinId = bulletinId;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  public getId = (): string => this.id || "";
  public getTitle = (): string => this.title || "";
  public getContent = (): string => this.content || "";
  public getLink = (): string => this.link || "";
  public getNote = (): number => this.note || 0;
  public getCreatedAt = (): Date => this.createdAt || new Date();
  public getUpdatedAt = (): Date => this.updatedAt || new Date();

  public setTitle = (title: string) => this.title = title;
  public setContent = (content: string) => this.content = content;
  public setLink = (link: string) => this.link = link;
  public setNote = (note: number) => this.note = note;
  public setBulletinId = (bulletinId: string) => this.bulletinId = bulletinId;
}

export { Work, IWork };