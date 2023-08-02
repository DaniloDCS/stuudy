import { v4 as uuid } from "uuid";
import { Unity } from "../Unity";

interface IDiscipline {
  readonly id?: string;
  name: string;
  icon?: string;
  code: string;
  workload: number;
  workloadCompleted?: number;
  progress?: number;
  media?: number;
  status?: string;
  unities?: Unity[];
  type?: string; 
  readonly createdAt?: Date;
  updatedAt?: Date;
}

class Discipline implements IDiscipline {
  id: string;
  name: string;
  icon: string;
  code: string;
  workload: number;
  workloadCompleted?: number;
  progress: number;
  media?: number;
  status: string;
  unities: Unity[] = [];
  type: string;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    name,
    icon,
    code,
    workload,
    workloadCompleted,
    progress,
    media,
    unities,
    status,
    type,
    createdAt,
    updatedAt,
  }: IDiscipline) {
    this.id = id || uuid();
    this.name = name;
    this.icon = icon || "&#128218;";
    this.code = code || "";
    this.workload = workload;
    this.workloadCompleted = workloadCompleted || 0;
    this.progress = progress || 0;
    this.media = media || 0;
    this.status = status || "studying";
    this.type = type || "obligatory";
    this.unities = unities || [];
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  public getId = (): string => this.id;

  public getName = (): string => this.name;

  public getIcon = (): string => this.icon;

  public getCode = (): string => this.code;

  public getWorkload = (): number => this.workload;

  public getWorkloadCompleted = (): number => this.workloadCompleted || 0;

  public getProgress = (): number => this.progress;

  public getMedia = (): number => this.media || 0;

  public getStatus = (): string => this.status;

  public getType = (): string => this.type;

  public getCreatedAt = (): Date => this.createdAt;

  public getUpdatedAt = (): Date => this.updatedAt;

  public setName = (name: string) => (this.name = name);

  public setCode = (code: string) => (this.code = code);

  public setIcon = (icon: string) => (this.icon = icon);

  public setWorkload = (workload: number) => (this.workload = workload);

  public setWorkloadCompleted = () => {
    this.workloadCompleted = this.unities.reduce(
      (acc: number, u: Unity) => acc + new Unity(u).getWorkloadCompleted(),
      0
    );
  };

  public setProgress = () => {
    this.progress = Number(
      (
        (Number(this.getWorkloadCompleted()) / Number(this.getWorkload())) *
        100
      ).toFixed(2)
    );
  };

  public setStatus = (status: string) => (this.status = status);

  public setType = (type: string) => (this.type = type);


  public setUpdatedAt = () => (this.updatedAt = new Date());

  public getUnities = (): Unity[] => this.unities;

  public getUnitiesById = (id: string): Unity => {
    return this.unities.filter((u: Unity) => u.id === id)[0];
  };

  public deleteUnitiesById = (id: string) => {
    this.unities = this.unities.filter((u: Unity) => u.id !== id);
  };

  public updateUnitiesById = (id: string, unities: Unity) => {
    this.unities = this.unities.map((u: Unity) => {
      if (u.id === id) return unities;
      else return u;
    });
  };

  public setUnities = (unities: Unity) => this.unities.push(unities);

  public setNewUnity = () => {
    this.unities.push(
      new Unity({
        title: `Unidade ${this.unities.length + 1}`,
      })
    );
  };

  public getUnity = (id: string): Unity => {
    return this.unities.filter((u: Unity) => u.id === id)[0];
  };

  public deleteUnity = (id: string) => {
    this.unities = this.unities.filter((unity) => unity.id != id);

    this.setWorkloadCompleted();
    this.setProgress();
    this.setUpdatedAt();
  };
}

class Teacher {
  id?: string;
  name: string;

  constructor({ id, name }: { id?: string; name: string }) {
    this.id = id || uuid();
    this.name = name;
  }
}

export { IDiscipline, Discipline, Teacher };
