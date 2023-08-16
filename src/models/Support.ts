import { v4 as uuid } from 'uuid';

interface ISupport {
  readonly id?: string;
  userId: string;
  title: string;
  description: string;
  status?: string;
  concludedBy?: string | null;
  attendingBy?: string | null;
  concludedAt?: Date | null;
  responses?: Response[];
  count?: number | null;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

class Support implements ISupport {
  readonly id: string;
  userId: string;
  title: string;
  description: string;
  status: string;
  concludedBy: string | null; 
  attendingBy: string | null;
  concludedAt: Date | null;
  responses: Response[];
  count: number | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  constructor({ id, userId, title, description, status, concludedBy, attendingBy, concludedAt, responses, count, createdAt, updatedAt }: ISupport) {
    this.id = id || uuid();
    this.userId = userId;
    this.title = title;
    this.description = description;
    this.status = status || 'pending';
    this.concludedBy = concludedBy || null;
    this.attendingBy = attendingBy || null;
    this.concludedAt = concludedAt || null;
    this.responses = responses || [];
    this.count = count || null;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  public getId = (): string => this.id;

  public getUserId = (): string => this.userId;

  public getTitle = (): string => this.title;

  public getDescription = (): string => this.description;

  public getStatus = (): string => this.status;
  public setStatus = (status: string): string => this.status = status;

  public getConcludedBy = (): string | null => this.concludedBy;
  public setConcludedBy = (concludedBy: string): string => this.concludedBy = concludedBy;

  public finish = (concludedBy: string): void => {
    this.concludedBy = concludedBy;
    this.concludedAt = new Date();
    this.status = 'concluded';
  }

  public attending = (attendingBy: string): void => {
    this.status = 'attending';
    this.attendingBy = attendingBy;
  }
  
  public getConcludedAt = (): Date | null => this.concludedAt;
  public setConcludedAt = (concludedAt: Date): Date => this.concludedAt = concludedAt;

  public getAttendingBy = (): string | null => this.attendingBy;
  public setAttendingBy = (attendingBy: string): string => this.attendingBy = attendingBy;

  public getResponse = (): Response[] => this.responses;
  public setResponse = (response: Response): void => {
    this.responses.push(response);
  }

  public readResponse = (): void => {
    this.responses = this.responses.map(response => {
      let res = new Response(response);
      if (res.getUserId() !== this.getUserId()) res.setRead(true);
      return res;
    });
  }

  public getCreatedAt = (): Date => this.createdAt;

  public getUpdatedAt = (): Date => this.updatedAt; 
}

interface IResponse {
  id?: string;
  userId: string;
  response: string;
  date?: Date;
  author?: string;
  read?: boolean;
}

class Response implements IResponse {
  id: string;
  userId: string;
  response: string;
  date: Date;
  author: string;
  read: boolean;
  
  constructor({ id = uuid(), userId, response, date = new Date(), author = "user", read = false }: IResponse) {
    this.id = id;
    this.userId = userId;
    this.response = response;
    this.date = date;
    this.author = author;
    this.read = read;
  }

  public getRead = (): boolean => this.read;

  public setRead = (read: boolean): boolean => this.read = read;

  public getDate = (): Date => this.date;

  public getId = (): string => this.id;

  public getUserId = (): string => this.userId;

  public getResponse = (): string => this.response;

  public getAuthor = (): string => this.author;
}

class Supports {
  supports: Support[];

  constructor(supports: Support[]) {
    this.supports = supports;
  }

  public getSupports = (): Support[] => this.supports;
}

export { Support, Supports, Response };