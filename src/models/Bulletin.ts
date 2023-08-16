import { v4 as uuid } from 'uuid';

interface IBulletin {
  readonly id?: string;
  title: string;
  value: number;
  weight: number;
  type: string;
  readonly createdAt?: Date;
  updatedAt?: Date;
}

class Bulletin implements IBulletin {
  readonly id?: string;
  title: string;
  value: number;
  weight: number;
  type: string;
  readonly createdAt?: Date;
  updatedAt?: Date;

  constructor({
    id,
    title,
    value,
    weight,
    type,
    createdAt,
    updatedAt,
  }: IBulletin) {
    this.id = id || uuid();
    this.title = title;
    this.value = value;
    this.weight = weight;
    this.type = type;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }
}

export { Bulletin, IBulletin };