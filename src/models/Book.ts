import { v4 as uuid } from "uuid";

interface IBook {
  readonly id?: string;
  title: string;
  link: string;
  readonly createdAt?: Date;
  updatedAt?: Date;
}

class Book implements IBook {
  readonly id?: string;
  title: string;
  link: string;
  readonly createdAt?: Date;
  updatedAt?: Date;

  constructor({ id, title, link, createdAt, updatedAt }: IBook) {
    this.id = id || uuid();
    this.title = title;
    this.link = link;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  public getId = (): string => this.id || "";
  public getTitle = (): string => this.title || "";
  public getLink = (): string => this.link || "";
  public getCreatedAt = (): Date => this.createdAt || new Date();
  public getUpdatedAt = (): Date => this.updatedAt || new Date();

  public setTitle = (title: string) => (this.title = title);
  public setLink = (link: string) => (this.link = link);
  public setUpdatedAt = () => (this.updatedAt = new Date());
}

export { Book, IBook };