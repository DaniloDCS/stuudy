import { v4 as uuid } from 'uuid';

interface IPublish {
  readonly id?: string;
  title: string;
  content: string;
  status?: boolean;
  by?: string;
  reacts?: IReact[];
  comments?: IComment[];
  visible?: boolean;
  dennunciations?: IDennunciation[];
  readonly createdAt?: Date;
  updatedAt?: Date;
}

class Publish implements IPublish {
  readonly id: string;
  title: string;
  content: string;
  status: boolean;
  by: string;
  reacts: IReact[];
  comments: IComment[];
  visible: boolean;
  dennunciations: IDennunciation[];
  readonly createdAt: Date;
  updatedAt: Date;

  constructor({ id, title, content, status, by, reacts, comments, visible, dennunciations, createdAt, updatedAt }: IPublish) {
    this.id = id || uuid();
    this.title = title;
    this.content = content;
    this.status = status || false;
    this.by = by || '';
    this.reacts = reacts || [];
    this.comments = comments || [];
    this.visible = visible || true;
    this.dennunciations = dennunciations || [];
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  public getId = (): string => this.id;

  public getTitle = (): string => this.title;

  public getContent = (): string => this.content;

  public getStatus = (): boolean => this.status;
  public setStatus = (status: boolean): boolean => this.status = status;
  public toggleStatus = (): void => {
    this.status = !this.status
    this.setUpdatedAt();
  };

  public getBy = (): string => this.by;

  public getReacts = (): IReact[] => this.reacts;
  public setReacts = (reacts: IReact[]): IReact[] => this.reacts = reacts;
  public addReact = (react: IReact)=> this.reacts.push(react);
  public removeReact = (reactId: string) => {
    this.reacts = this.reacts.filter(react => react.id !== reactId);
  }

  public getComments = (): IComment[] => this.comments;
  public setComments = (comments: IComment[]): IComment[] => this.comments = comments;
  public addComment = (comment: IComment) => this.comments.push(comment);
  public removeComment = (commentId: string) => {
    this.comments = this.comments.filter(comment => comment.id !== commentId);
  }

  public getVisible = (): boolean => this.visible;
  public setVisible = (visible: boolean): boolean => this.visible = visible;
  public toggleVisible = (): void => {
    this.visible = !this.visible
    this.setUpdatedAt();
  };

  public getDennunciations = (): IDennunciation[] => this.dennunciations;
  public setDennunciations = (dennunciations: IDennunciation[]): IDennunciation[] => this.dennunciations = dennunciations;

  public getCreatedAt = (): Date => this.createdAt;

  public getUpdatedAt = (): Date => this.updatedAt;
  public setUpdatedAt = (): Date => this.updatedAt = new Date();
}

interface IPublications {
  readonly userId: string;
  publishes?: Publish[];
  readonly createdAt?: Date;
  updatedAt?: Date;
}

class Publications implements IPublications {
  readonly userId: string;
  publishes: Publish[];
  readonly createdAt: Date;
  updatedAt: Date;

  constructor({ userId, publishes, createdAt, updatedAt }: IPublications) {
    this.userId = userId;
    this.publishes = publishes || [];
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  public getUserId = (): string => this.userId;

  public getPublishes = (): Publish[] => this.publishes;
  public setPublishes = (publishes: Publish[]): Publish[] => this.publishes = publishes;
  public addPublish = (publish: Publish) => this.publishes.push(publish);
  public removePublish = (publishId: string) => {
    this.publishes = this.publishes.filter(publish => publish.id !== publishId);
  }

  public getCreatedAt = (): Date => this.createdAt;

  public getUpdatedAt = (): Date => this.updatedAt;
  public setUpdatedAt = (): Date => this.updatedAt = new Date();
}


interface IReact {
  readonly id?: string;
  by: string;
  type: string;
  readonly createdAt?: Date;
  updatedAt?: Date;
}

class React implements IReact {
  readonly id: string;
  by: string;
  type: string;
  readonly createdAt: Date;
  updatedAt: Date;

  constructor({ id, by, type, createdAt, updatedAt }: IReact) {
    this.id = id || uuid();
    this.by = by;
    this.type = type;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  public getId = (): string => this.id;

  public getBy = (): string => this.by;

  public getType = (): string => this.type;

  public getCreatedAt = (): Date => this.createdAt;

  public getUpdatedAt = (): Date => this.updatedAt;
  public setUpdatedAt = (): Date => this.updatedAt = new Date();
}

interface IComment {
  readonly id?: string;
  by: string;
  content: string;
  reacts?: IReact[];
  readonly createdAt?: Date;
}

class Comment implements IComment {
  readonly id: string;
  by: string;
  content: string;
  reacts: IReact[];
  readonly createdAt: Date;

  constructor({ id, by, content, reacts, createdAt }: IComment) {
    this.id = id || uuid();
    this.by = by;
    this.content = content;
    this.reacts = reacts || [];
    this.createdAt = createdAt || new Date();
  }

  public getId = (): string => this.id;

  public getBy = (): string => this.by;

  public getContent = (): string => this.content;

  public getReacts = (): IReact[] => this.reacts;
  public setReacts = (reacts: IReact[]): IReact[] => this.reacts = reacts;
  public addReact = (react: IReact) => this.reacts.push(react);
  public removeReact = (reactId: string) => {
    this.reacts = this.reacts.filter(react => react.id !== reactId);
  } 

  public getCreatedAt = (): Date => this.createdAt;
}

interface IDennunciation {
  readonly id?: string;
  by: string;
  readonly createdAt?: Date;
}

class Dennunciation implements IDennunciation {
  readonly id: string;
  by: string;
  readonly createdAt: Date;

  constructor({ id, by, createdAt }: IDennunciation) {
    this.id = id || uuid();
    this.by = by;
    this.createdAt = createdAt || new Date();
  }

  public getId = (): string => this.id;

  public getBy = (): string => this.by;

  public getCreatedAt = (): Date => this.createdAt;
}

export { Publish, Publications, React, Comment, Dennunciation };
