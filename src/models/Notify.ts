import { v4 as uuid } from 'uuid';

interface INotify {
  readonly id?: string;
  title: string;
  content: string;
  status?: boolean;
  by?: string;
  readAt?: Date | null;
  readonly createdAt?: Date;
  updatedAt?: Date;
}

class Notify implements INotify {
  readonly id: string;
  title: string;
  content: string;
  status: boolean;
  by: string;
  readAt: Date | null;
  readonly createdAt: Date;
  updatedAt: Date;

  constructor({ id, title, content, status, by, readAt, createdAt, updatedAt }: INotify) {
    this.id = id || uuid();
    this.title = title;
    this.content = content;
    this.status = status || false;
    this.by = by || '';
    this.readAt = readAt || null;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  public getId = (): string => this.id;

  public getTitle = (): string => this.title;

  public getcontent = (): string => this.content;

  public getStatus = (): boolean => this.status;
  public setStatus = (status: boolean): boolean => this.status = status;
  public toggleStatus = (): void => {
    this.status = !this.status
    this.setReadAt(new Date());
    this.setUpdatedAt();
  };

  public getBy = (): string => this.by;

  public getReadAt = (): Date | null => this.readAt;
  public setReadAt = (readAt: Date): Date => this.readAt = readAt;
    
  public getCreatedAt = (): Date => this.createdAt;

  public getUpdatedAt = (): Date => this.updatedAt; 
  public setUpdatedAt = (): Date => this.updatedAt = new Date();
}

interface INotifies {
  readonly id?: string;
  userId: string;
  notifies: Notify[];
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

class Notifies implements INotifies {
  readonly id: string;
  userId: string;
  notifies: Notify[];
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor({ id, userId, notifies, createdAt, updatedAt }: INotifies) {
    this.id = id || uuid();
    this.userId = userId;
    this.notifies = notifies || [];
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  public getNotifies = (): Notify[] => this.notifies;

  public setNotify(notify: Notify): void {
    this.notifies.push(notify);
    this.notifies = this.notifies.sort((a, b) => {
      const notifyA = new Notify(a);
      const notifyB = new Notify(b);

      return new Date(notifyB.getCreatedAt()).getTime() - new Date(notifyA.getCreatedAt()).getTime();
    });
  }

  public readNotify = (id: string): void => {
    this.notifies = this.notifies.map(notify => {
      const notification = new Notify(notify);
      if (notification.getId() === id) notification.toggleStatus();
      return notification;
    });
  }

  public readAll = (): void => {
    this.notifies = this.notifies.map(notify => { 
      const notification = new Notify(notify);
      notification.toggleStatus() 
      return notification;
    });
  }

  public readById = (id: string): void => {
    this.notifies = this.notifies.map(notify => {
      const notification = new Notify(notify);
      if (notification.getId() === id) notification.toggleStatus();
      return notification;
    });
  }

  public getNotifyById(id: string): Notify | undefined {
    return this.notifies.find(notify => new Notify(notify).getId() === id);
  }

  public deleteNotifyById(id: string): void {
    this.notifies = this.notifies.filter(notify => new Notify(notify).getId() !== id);
  }
}

export { Notify, Notifies };