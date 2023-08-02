import { v4 as uuid } from 'uuid';
import App from '../App';
import { Class, Discipline } from './Discipline';

interface IPeriod {
  readonly id?: string;
  name: string;
  icon?: string;
  credits?: number;
  workload?: number;
  workloadCompleted?: number;
  progress?: number;
  status: string;
  disciplines?: Discipline[];
  cra?: number;
  mc?: number;
  iech?: number;
  iepl?: number;
  iea?: number;
  readonly createdAt?: Date;
  updatedAt?: Date;
}

class Period implements IPeriod {
  id: string;
  name: string;
  icon: string;
  credits: number;
  workload: number;
  workloadCompleted: number;
  progress: number;
  status: string;
  disciplines: Discipline[];
  cra: number;
  mc: number;
  iech: number;
  iepl: number;
  iea: number;
  createdAt: Date;
  updatedAt: Date;

  constructor({ id, name, icon, credits, workload, workloadCompleted, progress, status, disciplines, cra, mc, iech, iepl, iea, createdAt, updatedAt }: IPeriod) {
    this.id = id || uuid();
    this.name = name;
    this.icon = icon || '&#128218;';
    this.credits = credits || 0;
    this.workload = workload || 0;
    this.workloadCompleted = workloadCompleted || 0;
    this.progress = progress || 0;
    this.status = status || 'studying';
    this.disciplines = disciplines || [];
    this.cra = cra || 0;
    this.mc = mc || 0;
    this.iech = iech || 0;
    this.iepl = iepl || 0;
    this.iea = iea || 0;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  public addDiscipline(discipline: Discipline) {
    this.disciplines.push(discipline);
  }

  public removeDiscipline(disciplineId: string) {
    this.disciplines = this.disciplines.filter(discipline => discipline.id !== disciplineId);
    this.setWorkloadAndCredits();
  }

  public updateDiscipline(discipline: Discipline) {
    this.disciplines = this.disciplines.map(d => d.id === discipline.id ? discipline : d);
    this.setWorkloadAndCredits();
  }

  public updatePeriod(period: Period) {
    this.name = period.name;
    this.icon = period.icon;
    this.credits = period.credits;
    this.workload = period.workload;
    this.status = period.status;
    this.disciplines = period.disciplines;
    this.cra = period.cra;
    this.mc = period.mc;
    this.iech = period.iech;
    this.iepl = period.iepl;
    this.iea = period.iea;
    this.updatedAt = new Date();
  }

  public getId(): string {
    return this.id;
  }

  public getName = (): string => this.name
  public getIcon = (): string => this.icon
  public getCredits = (): number => this.credits
  public getWorkload = (): number => this.workload
  public getWorkloadCompleted = (): number => this.workloadCompleted
  public getProgress = (): number => this.progress
  public getStatus = (): string => this.status
  public getDisciplines = (): Discipline[] => this.disciplines
  public getDiscipline = (id: string): Discipline => this.disciplines.filter(discipline => discipline.id === id)[0];
  public getCra = (): number => this.cra
  public getMc = (): number => this.mc
  public getIech = (): number => this.iech
  public getIepl = (): number => this.iepl
  public getIea = (): number => this.iea
  public getCreatedAt = (): Date => this.createdAt
  public getUpdatedAt = (): Date => this.updatedAt

  public setName = (name: string): string => this.name = name
  public setIcon = (icon: string): string => this.icon = icon
  public setCredits = (credits: number): number => this.credits = credits
  public setWorkload = (workload: number): number => this.workload = workload
  public setWorkloadCompleted = (workloadCompleted: number): number => this.workloadCompleted = workloadCompleted
  public setProgress = (progress: number): number => this.progress = progress
  public setStatus = (status: string): string => this.status = status
  public setDiscipline = (discipline: Discipline) => {
    this.disciplines.push(discipline);
    this.setWorkloadAndCredits();
  }

  public deleteDiscipline = (id: string): void => {
    this.disciplines = this.disciplines.filter(discipline => discipline.id !== id);
    this.setWorkloadAndCredits();
  }

  public setWorkloadAndCredits = (): void => {
    this.workload = Number(this.disciplines.reduce((acc, d) => {
      let discipline = new Discipline(d);
      return acc + Number(discipline.getWorkload());
    }, 0));

    this.credits = this.disciplines.reduce((acc, d) => {
      let discipline = new Discipline(d);
      return acc + Number(discipline.getCredits());
    }, 0);

    this.workloadCompleted = Number(this.disciplines.reduce((acc, d) => {
      let discipline = new Discipline(d);
      return acc + Number(discipline.getWorkloadCompleted());
    }, 0));

    this.progress = Number(this.workloadCompleted / this.workload * 100);
  }

  public setCra = (cra: number): number => this.cra = cra
  public setMc = (mc: number): number => this.mc = mc
  public setIech = (iech: number): number => this.iech = iech
  public setIepl = (iepl: number): number => this.iepl = iepl
  public setIea = (iea: number): number => this.iea = iea
  public setUpdatedAt = (updatedAt: Date): Date => this.updatedAt = new Date();

  getPeriod(id: string): Period | null {
    return this.id === id ? this : null;
  }

  public setClass = (classs: Class, disciplineId: string, unityId: string): void => {
    let discipline = new Discipline(App.get('discipline'));

    if (disciplineId) {
      this.disciplines = this.disciplines.map(d => {
        if (d.id === disciplineId) {
          discipline.unities = discipline.unities.map(u => {
            if (u.id === unityId) u.classes.push(classs);
            return u;
          });
        }
        
        return d;
      });
    }

    this.setWorkloadAndCredits();
  }

  public removeClass = (classId: string, disciplineId: string, unityId: string): void => {
    let discipline = new Discipline(this.getDiscipline(disciplineId));
    discipline.deleteClass(unityId, classId);
  }

}

export { Period };