import { v4 as uuid } from 'uuid';

interface IQuestion {
  readonly id?: string;
  title: string;
  content: string;
  value?: number;
  type: string;
}

class Question implements IQuestion {
  readonly id?: string;
  title: string;
  content: string;
  value?: number;
  type: string;

  constructor({ id, title, content, value, type }: IQuestion) {
    this.id = id || uuid();
    this.title = title;
    this.content = content;
    this.value = value;
    this.type = type;
  }
}

export { Question, IQuestion };