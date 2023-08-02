import { v4 as uuid } from "uuid";

interface IClass {
  readonly id?: string;
  title: string;
  content: string;
  quantity: number;
  date: Date;
  IWasPresent?: boolean;
  type?: string;
  readonly createdAt?: Date;
  updatedAt?: Date;
}

class Class implements IClass {
  readonly id?: string;
  title: string;
  content: string;
  quantity: number;
  date: Date;
  IWasPresent: boolean;
  type: string;
  readonly createdAt?: Date;
  updatedAt?: Date;

  constructor({
    id,
    title,
    content,
    quantity,
    date,
    IWasPresent,
    type,
    createdAt,
    updatedAt,
  }: IClass) {
    this.id = id || uuid();
    this.title = title;
    this.content = content;
    this.quantity = quantity;
    this.date = date;
    this.IWasPresent = IWasPresent || false;
    this.type = type || "class";
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  public getId = (): string => this.id || "";
  public getTitle = (): string => this.title || "";
  public getContent = (): string => this.content || "";
  public getQuantity = (): number => this.quantity || 0;
  public getDate = (): Date => this.date || new Date();
  public getIWasPresent = (): boolean => this.IWasPresent || false;
  public getType = (): string => this.type || "";

  public setTitle = (title: string) => (this.title = title);
  public setContent = (content: string) => (this.content = content);
  public setQuantity = (quantity: number) => (this.quantity = quantity);
  public setDate = (date: Date) => (this.date = date);
  public setIWasPresent = (IWasPresent: boolean) =>
    (this.IWasPresent = IWasPresent);
  public setType = (type: string) => (this.type = type);
}

export { Class, IClass };