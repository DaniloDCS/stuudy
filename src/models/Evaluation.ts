import { v4 as uuid } from "uuid";
import { Question } from "./Question";

interface IEvaluation {
  readonly id?: string;
  title: string;
  description: string;
  questions: Question[];
  note?: number;
  bulletinId?: string;
  readonly createdAt?: Date;
  updatedAt?: Date;
}

class Evaluation implements IEvaluation {
  readonly id?: string;
  title: string;
  description: string;
  questions: Question[];
  note?: number;
  bulletinId?: string;
  readonly createdAt?: Date;
  updatedAt?: Date;

  constructor({
    id,
    title,
    description,
    questions,
    note,
    bulletinId,
    createdAt,
    updatedAt,
  }: IEvaluation) {
    this.id = id || uuid();
    this.title = title;
    this.description = description;
    this.questions = questions || [];
    this.note = note;
    this.bulletinId = bulletinId;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }


  public getId = (): string => this.id || "";
  public getTitle = (): string => this.title || "";
  public getDescription = (): string => this.description || "";
  public getQuestions = (): Question[] => this.questions || [];
  public getNote = (): number => this.note || 0;
  public getBulletinId = (): string => this.bulletinId || "";
  public getCreatedAt = (): Date => this.createdAt || new Date();
  public getUpdatedAt = (): Date => this.updatedAt || new Date();

  public getQuestionById = (id: string): Question => this.questions.filter((q: Question) => q.id === id)[0];
  public deleteQuestionById = (id: string) => this.questions = this.questions.filter((q: Question) => q.id !== id);
  public updateQuestionById = (id: string, question: Question) => this.questions = this.questions.map((q: Question) => q.id === id ? question : q);

  public setTitle = (title: string) => this.title = title;
  public setDescription = (description: string) => this.description = description;
  public setQuestions = (question: Question) => this.questions.push(question);
  public setNote = (note: number) => this.note = note;
  public setBulletinId = (bulletinId: string) => this.bulletinId = bulletinId;
}

export { Evaluation, IEvaluation };