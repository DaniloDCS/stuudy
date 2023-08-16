import { v4 as uuid } from "uuid";
import { Question } from "./Question";

interface IActivity {
  readonly id?: string;
  title: string;
  description: string;
  questions: Question[];
  readonly createdAt?: Date;
  updatedAt?: Date;
}

class Activity implements IActivity {
  readonly id?: string;
  title: string;
  description: string;
  questions: Question[];
  readonly createdAt?: Date;
  updatedAt?: Date;

  constructor({
    id,
    title,
    description,
    questions,
    createdAt,
    updatedAt,
  }: IActivity) {
    this.id = id || uuid();
    this.title = title;
    this.description = description;
    this.questions = questions || [];
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  public getId = (): string => this.id || "";
  public getTitle = (): string => this.title || "";
  public getDescription = (): string => this.description || "";
  public getQuestions = (): Question[] => this.questions || [];
  public getCreatedAt = (): Date => this.createdAt || new Date();
  public getUpdatedAt = (): Date => this.updatedAt || new Date();

  public getQuestionById = (id: string): Question =>
    this.questions.filter((q: Question) => q.id === id)[0];
  public deleteQuestionById = (id: string) =>
    (this.questions = this.questions.filter((q: Question) => q.id !== id));
  public updateQuestionById = (id: string, question: Question) =>
    (this.questions = this.questions.map((q: Question) =>
      q.id === id ? question : q
    ));

  public setTitle = (title: string) => (this.title = title);
  public setDescription = (description: string) =>
    (this.description = description);
  public setQuestion = (question: Question) => this.questions.push(question);
}
export { Activity, IActivity };
