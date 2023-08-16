import { v4 as uuid } from "uuid";

interface IUser {
  readonly id?: string;
  readonly userId: string;
  avatar?: string;
  username: string;
  name: string;
  birthday?: Date;
  biography?: string;
  email: string;
  phone: string;
  admin?: boolean;
  theme?: string;
  accesses?: Accesses[];
  network?: Network[];
  createdAt?: Date;
  updatedAt?: Date;
}

class User implements IUser {
  readonly id: string;
  readonly userId: string;
  avatar: string;
  username: string;
  name: string;
  birthday: Date;
  biography: string;
  email: string;
  phone: string;
  admin: boolean;
  theme: string;
  accesses: Accesses[];
  network: Network[];
  readonly createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    userId,
    avatar,
    username,
    name,
    birthday,
    biography,
    email,
    phone,
    admin,
    theme,
    accesses,
    network,
    createdAt,
    updatedAt,
  }: IUser) {
    this.id = id || uuid();
    this.userId = userId;
    this.avatar = avatar || "/public/images/avatars/default.png";
    this.username = username;
    this.name = name;
    this.birthday = birthday || new Date("2000-01-01");
    this.biography = biography || "Hello World!";
    this.email = email;
    this.phone = phone;
    this.admin = admin || false;
    this.theme = theme || "theme-blue";
    this.accesses = accesses || [];
    this.network = network || [];
    this.createdAt = createdAt || new Date();
    this.updatedAt = new Date();
  }

  public getId = (): string => this.id;

  public getUserId = (): string => this.userId;

  public getUsername = (): string => this.username;
  public setUsername = (username: string): void => {
    this.username = username;
    this.setUpdatedAt();
  };

  public getAvatar = (): string => this.avatar;
  public setAvatar = (avatar: string): void => {
    this.avatar = avatar;
    this.setUpdatedAt();
  };

  public getName = (): string => this.name;
  public setName = (name: string): void => {
    this.name = name;
    this.setUpdatedAt();
  };

  public getBirthday = (): Date => this.birthday;
  public setBirthday = (birthday: Date): void => {
    this.birthday = birthday;
    this.setUpdatedAt();
  };

  public getBiography = (): string => this.biography;
  public setBiography = (biography: string): void => {
    this.biography = biography;
    this.setUpdatedAt();
  };

  public getEmail = (): string => this.email;
  public setEmail = (email: string): void => {
    this.email = email;
    this.setUpdatedAt();
  };

  public getPhone = (): string => this.phone;
  public setPhone = (phone: string): void => {
    this.phone = phone;
    this.setUpdatedAt();
  };

  public getAdmin = (): boolean => this.admin;
  public setAdmin = (admin: boolean): void => {
    this.admin = admin;
    this.setUpdatedAt();
  };

  public getTheme = (): string => this.theme;
  public setTheme = (theme: string): void => {
    this.theme = theme;
    this.setUpdatedAt();
  };

  public getAccesses = (): Accesses[] => this.accesses;
  public setAccesses = (accesses: Accesses | null): void => {
    if (this.accesses.length > 9) this.accesses = this.accesses.slice(1, 10);
    if (accesses) this.accesses.push(accesses);
    this.setUpdatedAt();
  };
  public setExitAccesses = (accesses: Accesses | null): void => {
    this.accesses = this.accesses.map((item: Accesses) => {
      if (accesses && item.id === accesses.id) {
        item.exit = new Date();
        item.duration = item.calculateDuration();
      }
      return item;
    });

    this.setUpdatedAt();
  };

  public getNetwork = (): Network[] => this.network;
  public setNetwork = (network: Network): void => {
    this.network.push(network);
    this.setUpdatedAt();
  };
  public removeNetwork = (network: Network): void => {
    this.network = this.network.filter(
      (item: Network) => item.id !== network.id
    );

    this.setUpdatedAt();
  };

  public getCreatedAt = (): Date => this.createdAt;

  public getUpdatedAt = (): Date => this.updatedAt;
  public setUpdatedAt = (): void => {
    this.updatedAt = new Date();
  };

  public getFirstName = (): string => this.name.split(" ")[0];

  public update = (user: IUser): void => {
    this.setAvatar(user.avatar || "/public/images/avatars/default.png");
    this.setUsername(user.username);
    this.setName(user.name);
    this.setBirthday(user.birthday || new Date("2000-01-01"));
    this.setBiography(user.biography || "Hello World!");
    this.setEmail(user.email);
    this.setPhone(user.phone);
    this.setAdmin(user.admin || false);
  };
}

interface IAccesses {
  id?: string;
  date: Date;
  location?: {
    country?: string;
    state?: string;
    city?: string;
    ip?: string;
  };
  browser?: string;
  machine?: string;
  exit?: Date | null;
  duration?: string | null;
}

class Accesses implements IAccesses {
  id: string;
  date: Date;
  location: {
    country?: string;
    state?: string;
    city?: string;
    ip: string;
  };
  browser: string;
  machine: string;
  exit: Date | null;
  duration?: string | null;

  constructor({
    id,
    date,
    location,
    exit,
    machine,
    browser
  }: IAccesses) {
    this.id = id || uuid();
    this.date = date || new Date();
    this.location = {
      country: location?.country || "undefined",
      state: location?.state || "undefined",
      city: location?.city || "undefined",
      ip: location?.ip || "undefined",
    };
    this.machine = machine || "undefined";
    this.browser = browser || "undefined";
    this.exit = exit || null;
    this.duration = this.calculateDuration();
  }

  public create = (): Accesses => {
    return new Accesses({
      id: this.id,
      date: this.date,
      location: this.location,
      machine: this.machine,
      browser: this.browser,
      exit: this.exit,
      duration: this.duration,
    });
  };

  public calculateDuration = (): string => {
    if (!this.exit) return "0h 0min 0s";
    const duration = this.exit.getTime() - this.date.getTime();
    const hours = Math.floor(duration / 3600000);
    const minutes = Math.floor(duration / 60000);
    const seconds = ((duration % 60000) / 1000).toFixed(0);

    if (hours > 0) return `${hours}h ${minutes}min ${seconds}s`;
    if (minutes > 0) return `${minutes}min ${seconds}s`;
    return `${seconds}s`;
  };
}

class Network {
  id: string;
  url: string;
  visualization?: boolean;
  visits?: number;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    url,
    visualization,
    visits,
    createdAt,
    updatedAt,
  }: {
    id: string;
    url: string;
    visualization?: boolean;
    visits?: number;
    createdAt?: Date;
    updatedAt?: Date;
  }) {
    this.id = id || uuid();
    this.url = url;
    this.visualization = visualization || true;
    this.visits = visits || 0;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  public create = (): Network => {
    return new Network({
      id: this.id,
      url: this.url,
      visualization: this.visualization,
      visits: this.visits,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  };

  public getId = (): string => this.id;

  public getUrl = (): string => this.url;
  public setUrl = (url: string): void => {
    this.url = url;
    this.setUpdatedAt();
  };

  public getVisualization = (): boolean => this.visualization || true;
  public setVisualization = (visualization: boolean): void => {
    this.visualization = visualization;
    this.setUpdatedAt();
  };

  public getVisits = (): number => this.visits || 0;
  public setVisits = (): void => {
    this.visits = this.getVisits() + 1;
    this.setUpdatedAt();
  };

  public getCreatedAt = (): Date => this.createdAt;

  public getUpdatedAt = (): Date => this.updatedAt;
  public setUpdatedAt = (): void => {
    this.updatedAt = new Date();
  };
}

class Users {
  users: User[];

  constructor(users: User[]) {
    this.users = users;
  }

  public getUsers = (): User[] => this.users;

  public getUser = (id: string): User | null =>
    this.users.find((user) => user.getId() === id) || null;

  public getUserByUsername = (username: string): User | null =>
    this.users.find((user) => user.getUsername() === username) || null;

  public getUserByEmail = (email: string): User | null =>
    this.users.find((user) => user.getEmail() === email) || null;

  public getUserByPhone = (phone: string): User | null =>
    this.users.find((user) => user.getPhone() === phone) || null;
}

export { User, Users, Accesses };
