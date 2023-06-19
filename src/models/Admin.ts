import { v4 as uuid } from 'uuid';

interface IAdmin {
  id?: string;
  userId: string;
  actions?: Action[];
  active?: boolean;
  permissions?: Permission[];
  since?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

class Admin implements IAdmin {
  id: string;
  userId: string;
  actions: Action[];
  active: boolean;
  permissions: Permission[];
  since: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor({ id, userId, actions, active, permissions, since, createdAt, updatedAt }: IAdmin) {
    this.id = id || uuid();
    this.userId = userId;
    this.actions = actions || [];
    this.active = active || false;
    this.permissions = permissions || [];
    this.since = since || new Date();
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  public getId = (): string => this.id;

  public getUserId = (): string => this.userId;

  public getActions = (): Action[] => this.actions;
  public setActions = (actions: Action[]): void => {
    this.actions = actions;
    this.setUpdatedAt();
  }

  public getActive = (): boolean => this.active;
  public setActive = (active: boolean): void => {
    this.active = active;
    this.setUpdatedAt();
  }

  public getPermissions = (): Permission[] => this.permissions;
  public setPermission = (permissions: Permission[]): void => {
    this.permissions ? this.permissions = [...this.permissions, ...permissions] : this.permissions = permissions;
    this.setUpdatedAt();
  }
  public removePermission = (permission: Permission): void => {
    this.permissions = this.permissions.filter((p) => p.getId() !== permission.getId());
    this.setUpdatedAt();
  }

  public getSince = (): Date => this.since;
  public setSince = (since: Date): void => {
    this.since = since;
    this.setUpdatedAt();
  }

  public getCreatedAt = (): Date => this.createdAt;

  public getUpdatedAt = (): Date => this.updatedAt;
  public setUpdatedAt = (): void => { this.updatedAt = new Date(); }
}

interface IAction {
  id?: string;
  name: string;
  date?: Date;
  url?: string;
  dados?: string;
}

class Action {
  id: string;
  name: string;
  date?: Date;
  url?: string;
  dados?: string;
  
  constructor({ id, name, date, url, dados }: IAction) {
    this.id = id || uuid();
    this.name = name;
    this.date = date || new Date();
    this.url = url;
    this.dados = dados;
  }

  public getId = (): string => this.id;

  public getName = (): string => this.name;
  public setName = (name: string): void => { this.name = name; }

  public getDate = (): Date => this.date || new Date();
  public setDate = (date: Date): void => { this.date = date; }

  public getUrl = (): string => this.url || '';
  public setUrl = (url: string): void => { this.url = url; }

  public getDados = (): string => this.dados || '';
  public setDados = (dados: string): void => { this.dados = dados; }
}

interface IPermission {
  id?: string;
  name: string;
  description: string;
}

class Permission {
  id: string;
  name: string;
  description: string;

  constructor({ id, name, description }: IPermission) {
    this.id = id || uuid();
    this.name = name;
    this.description = description;
  }

  public getId = (): string => this.id;

  public getName = (): string => this.name;
  public setName = (name: string): void => { this.name = name; }

  public getDescription = (): string => this.description;
  public setDescription = (description: string): void => { this.description = description; }
}

class Admins {
  admins: Admin[];

  constructor(admins: Admin[]) {
    this.admins = admins;
  }

  public getAdmins = (): Admin[] => this.admins;

  public getAdmin = (id: string): Admin | null => this.admins.find(admin => admin.getId() === id) || null;
}

export { Admin, Admins };