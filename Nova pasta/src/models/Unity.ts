import { v4 as uuid } from "uuid";
import { Class } from "./Class";

interface IUnity {
  readonly id?: string;
  title: string;
  classes?: Class[];
  readonly createdAt?: Date;
  updatedAt?: Date;
}

class Unity implements IUnity {
  readonly id?: string;
  title: string;
  classes: Class[];
  readonly createdAt?: Date;
  updatedAt?: Date;

  constructor({ id, title, classes, createdAt, updatedAt }: IUnity) {
    this.id = id || uuid();
    this.title = title;
    this.classes = classes || [];
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  public getId = (): string => this.id || "";

  public getClasses = (): Class[] => this.classes;

  public getClassById = (id: string): Class => {
    return this.classes.filter((c: Class) => c.id === id)[0];
  };

  public getWorkloadCompleted = (): number => {
    return this.classes.reduce(
      (a: number, c: Class) => a + Number(new Class(c).getQuantity()),
      0
    );
  };

  public deleteClassById = (id: string) => {
    this.classes = this.classes.filter((c: Class) => c.id !== id);
  };

  public updateClassById = (id: string, _class: Class) => {
    this.classes = this.classes.map((c: Class) => {
      if (c.id === id) return _class;
      else return c;
    });
  };

  public setClasses = (classes: Class) => {
    this.classes.push(classes);

    this.classes = this.classes.sort((a: Class, b: Class) => {
      return (
        new Date(new Class(a).getDate()).getTime() -
        new Date(new Class(b).getDate()).getTime()
      );
    });
  };
}

export { Unity, IUnity };