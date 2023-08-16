import { v4 as uuid } from "uuid";
import { Class, Discipline } from "./Discipline";
import { Period } from "./Period";

interface ICourse {
  id?: string;
  userId: string;
  name: string;
  icon?: string;
  description?: string;
  university?: string;
  location?: string;
  status?: string;
  level?: string;
  type?: string;
  startedIn?: Date;
  finishedIn?: Date;
  dados?: {
    cra?: number;
    mc?: number;
    iech?: number;
    iepl?: number;
    iea?: number;
    creditsInProgress?: number;
    creditsCompleted?: number;
    creditsPercentage?: number;
    workloadInProgress?: number;
    workloadCompleted?: number;
    workloadPercentage?: number;
    periodsCompleted?: number;
    disciplinesInProgress?: number;
    disciplinesCompleted?: number;
    disciplinesPercentage?: number;
  } | null;
  periods?: Period[];
  createdAt?: Date;
  updatedAt?: Date;
}

class Course implements ICourse {
  id: string;
  userId: string;
  name: string;
  icon: string;
  description: string;
  university: string;
  location: string;
  status: string;
  level: string;
  type: string;
  startedIn: Date;
  finishedIn: Date;
  dados: {
    cra?: number;
    mc?: number;
    iech?: number;
    iepl?: number;
    iea?: number;
    credits?: number;
    creditsInProgress?: number;
    creditsCompleted?: number;
    creditsPercentage?: number;
    workload?: number;
    workloadInProgress?: number;
    workloadCompleted?: number;
    workloadPercentage?: number;
    periodsCompleted?: number;
    disciplinesInProgress?: number;
    disciplinesCompleted?: number;
    disciplinesPercentage?: number;
  };
  periods: Period[];
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    userId,
    name,
    icon,
    description,
    university,
    location,
    status,
    level,
    type,
    startedIn,
    finishedIn,
    dados,
    periods,
    createdAt,
    updatedAt,
  }: ICourse) {
    this.id = id || uuid();
    this.userId = userId;
    this.name = name;
    this.icon = icon || "&#128218;";
    this.description = description || "";
    this.university = university || "";
    this.location = location || "";
    this.status = status || "";
    this.level = level || "";
    this.type = type || "";
    this.startedIn = startedIn || new Date();
    this.finishedIn = finishedIn || new Date();
    this.dados = dados || {
      cra: 0,
      mc: 0,
      iech: 0,
      iepl: 0,
      iea: 0,
      credits: 0,
      creditsInProgress: 0,
      creditsCompleted: 0,
      creditsPercentage: 0,
      workload: 0,
      workloadInProgress: 0,
      workloadCompleted: 0,
      periodsCompleted: 0,
      disciplinesInProgress: 0,
      disciplinesCompleted: 0,
      disciplinesPercentage: 0,
    };
    this.periods = periods || [];
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  public getId = (): string => this.id;

  public getUserId = (): string => this.userId;

  public getName = (): string => this.name;
  public setName = (name: string): void => {
    this.name = name;
    this.setUpdatedAt();
  };

  public getIcon = (): string => this.icon;
  public setIcon = (icon: string): void => {
    this.icon = icon;
    this.setUpdatedAt();
  };

  public getDescription = (): string => this.description;
  public setDescription = (description: string): void => {
    this.description = description;
    this.setUpdatedAt();
  };

  public getUniversity = (): string => this.university;
  public setUniversity = (university: string): void => {
    this.university = university;
    this.setUpdatedAt();
  };

  public getLocation = (): string => this.location;
  public setLocation = (location: string): void => {
    this.location = location;
    this.setUpdatedAt();
  };

  public getStatus = (): string => this.status;
  public setStatus = (status: string): void => {
    this.status = status;
    this.setUpdatedAt();
  };

  public getLevel = (): string => this.level;
  public setLevel = (level: string): void => {
    this.level = level;
    this.setUpdatedAt();
  };

  public getType = (): string => this.type;
  public setType = (type: string): void => {
    this.type = type;
    this.setUpdatedAt();
  };

  public getStartedIn = (): Date => this.startedIn;
  public setStartedIn = (startedIn: Date): void => {
    this.startedIn = startedIn;
    this.setUpdatedAt();
  };

  public getFinishedIn = (): Date => this.finishedIn;
  public setFinishedIn = (finishedIn: Date): void => {
    this.finishedIn = finishedIn;
    this.setUpdatedAt();
  };

  public getDados = (): {
    cra?: number;
    mc?: number;
    iech?: number;
    iepl?: number;
    iea?: number;
    credits?: number;
    creditsInProgress?: number;
    creditsCompleted?: number;
    creditsPercentage?: number;
    workload?: number;
    workloadInProgress?: number;
    workloadCompleted?: number;
    workloadPercentage?: number;
    periodsCompleted?: number;
    disciplinesInProgress?: number;
    disciplinesCompleted?: number;
    disciplinesPercentage?: number;
  } => this.dados;

  public setDados = (dados: {
    cra?: number;
    mc?: number;
    iech?: number;
    iepl?: number;
    iea?: number;
    credits?: number;
    creditsInProgress?: number;
    creditsCompleted?: number;
    creditsPercentage?: number;
    workload?: number;
    workloadInProgress?: number;
    workloadCompleted?: number;
    workloadPercentage?: number;
    periodsCompleted?: number;
    disciplinesInProgress?: number;
    disciplinesCompleted?: number;
    disciplinesPercentage?: number;
  }): void => {
    this.dados = dados;
    this.setUpdatedAt();
  };

  public getCra = (): number => this.dados.cra || 0;

  public setCra = () => {
    this.dados.cra = 0;
    this.setUpdatedAt();
  };

  public getMc = (): number => this.dados.mc || 0;

  public setMc = () => {
    this.dados.mc = 0;
    this.setUpdatedAt();
  };

  public getIech = (): number => this.dados.iech || 0;

  public setIech = () => {
    this.dados.iech = 0;
    this.setUpdatedAt();
  };

  public getIepl = (): number => this.dados.iepl || 0;

  public setIepl = () => {
    this.dados.iepl = 0;
    this.setUpdatedAt();
  };

  public getIea = (): number => this.dados.iea || 0;

  public setIea = () => {
    this.dados.iea = 0;
    this.setUpdatedAt();
  };

  public getCredits = (): number => this.dados.credits || 0;

  public setCredits = () => {
    this.dados.credits = 0;
    this.setUpdatedAt();
  };

  public getCreditsInProgress = (): number => this.dados.creditsInProgress || 0;

  public setCreditsInProgress = () => {
    this.dados.creditsInProgress = 0;
    this.setUpdatedAt();
  };

  public getCreditsCompleted = (): number => this.dados.creditsCompleted || 0;

  public setCreditsCompleted = () => {
    this.dados.creditsCompleted = 0;
    this.setUpdatedAt();
  };

  public getCreditsPercentage = (): number => this.dados.creditsPercentage || 0;

  public setCreditsPercentage = () => {
    this.dados.creditsPercentage = 0;
    this.setUpdatedAt();
  };

  public getWorkload = (): number => this.dados.workload || 0;

  public setWorkload = () => {
    this.dados.workload = 0;
    this.setUpdatedAt();
  };

  public getWorkloadInProgress = (): number =>
    this.dados.workloadInProgress || 0;

  public setWorkloadInProgress = () => {
    this.dados.workloadInProgress = 0;
    this.setUpdatedAt();
  };

  public getWorkloadCompleted = (): number => this.dados.workloadCompleted || 0;

  public setWorkloadCompleted = () => {
    this.dados.workloadCompleted = 0;
    this.setUpdatedAt();
  };

  public getWorkloadPercentage = (): number =>
    this.dados.workloadPercentage || 0;

  public setWorkloadPercentage = () => {
    this.dados.workloadPercentage = 0;
    this.setUpdatedAt();
  };

  public getPeriodsCompleted = (): number => this.dados.periodsCompleted || 0;

  public setPeriodsCompleted = () => {
    this.dados.periodsCompleted = 0;
    this.setUpdatedAt();
  };

  public getDisciplinesInProgress = (): number =>
    this.dados.disciplinesInProgress || 0;

  public setDisciplinesInProgress = () => {
    this.dados.disciplinesInProgress = 0;
    this.setUpdatedAt();
  };

  public getDisciplinesCompleted = (): number =>
    this.dados.disciplinesCompleted || 0;

  public setDisciplinesCompleted = () => {
    this.dados.disciplinesCompleted = 0;
    this.setUpdatedAt();
  };

  public getDisciplinesPercentage = (): number =>
    this.dados.disciplinesPercentage || 0;

  public setDisciplinesPercentage = () => {
    this.dados.disciplinesPercentage = 0;
    this.setUpdatedAt();
  };

  public getPeriods = (): Period[] => this.periods;
  public setPeriods = (periods: Period[]): void => {
    this.periods = periods;
    this.setUpdatedAt();
  };
  public deletePeriod = (id: string): void => {
    this.periods = this.periods.filter((p: Period) => p.id !== id);
    this.setWorkloadAndCredits();
    this.setUpdatedAt();
  };

  public getPeriod = (id: string): Period | null => {
    let pe = this.periods.find((p: Period) => {
      let myPeriod = new Period(p);
      if (myPeriod.getId() === id) return myPeriod;
    });

    if (!pe) return null;

    return new Period(pe);
  };

  public setPeriod = (period: Period): void => {
    this.periods.push(period);
    this.setUpdatedAt();
  };

  public updatePeriod = (period: Period): void => {
    this.periods = this.periods.map((p: Period) => {
      if (p.id === period.id) p = period;
      return p;
    });

    this.setUpdatedAt();
  };

  public cra = (periods: Period[]): number => {
    let Nm = 0,
      Ci = 0;

    periods.forEach((period: Period) => {
      period.disciplines.forEach((d: Discipline) => {
        const discipline = new Discipline(d);
        Nm += discipline.getMedia() * discipline.getWorkload();
        Ci += Number(discipline.getWorkload());
      });
    });

    return Number((Nm / Ci).toFixed(4)) || 0;
  };

  public mc = (periods: Period[]): number => {
    let Nm = 0,
      Ci = 0;

    periods.forEach((period: Period) => {
      period.disciplines.forEach((d: Discipline) => {
        const discipline = new Discipline(d);
        if (discipline.getStatus() == "Aprovado") {
          Nm += discipline.getMedia() * discipline.getWorkload();
          Ci += Number(discipline.getWorkload());
        }
      });
    });

    return Number((Nm / Ci).toFixed(4)) || 0;
  };

  public iech = (periods: Period[]): number => {
    let Np = 0,
      Ci = 0,
      Ci2 = 0,
      Nm = 0;

    periods.forEach((period: Period) => {
      period.disciplines.forEach((d: Discipline) => {
        const discipline = new Discipline(d);
        if (discipline.getStatus() == "Aprovado") {
          Np += discipline.getMedia() * discipline.getWorkload();
          Ci += Number(discipline.getWorkload());
        }

        Nm += Number(discipline.getMedia()) * Number(discipline.getWorkload());
        Ci2 += Number(discipline.getWorkload());
      });
    });

    return Number(((Np + Ci) / (Nm + Ci2)).toFixed(4)) || 0;
  };

  public iepl = (periods: Period[]): number => {
    let Na = 0,
      Ci = 0,
      p = 0,
      chm = 4050,
      dp = 10;

    periods.forEach((period: Period) => {
      if (new Period(period).getStatus() === "Concluído") p += 1;
    });

    periods.forEach((period: Period) => {
      period.disciplines.forEach((d: Discipline) => {
        const discipline = new Discipline(d);

        if (discipline.getStatus() == "Aprovado") {
          Na += discipline.getMedia() * discipline.getWorkload();
          Ci += Number(discipline.getWorkload());
        }
      });
    });

    return Number(((Na + Ci) / (p * (chm + dp))).toFixed(4)) || 0;
  };

  public iea = (periods: Period[]): number => {
    return Number(
      (
        this.mc(this.periods) *
        this.iech(this.periods) *
        this.iepl(this.periods)
      ).toFixed(4)
    ) || 0;
  };

  public setWorkloadAndCredits = (): void => {
    function percent(a: number, b: number): number {
      return Number(((Number(a) / Number(b)) * 100).toFixed(2));
    }

    this.dados.workload =
      this.periods.reduce((acc: number, p: Period) => {
        const period = new Period(p);
        return acc + Number(period.getWorkload());
      }, 0) || 0;

    this.dados.credits =
      this.periods.reduce((acc: number, p: Period) => {
        const period = new Period(p);
        return acc + Number(period.getCredits());
      }, 0) || 0;

    this.dados.workloadCompleted =
      this.periods.reduce((acc: number, p: Period) => {
        const period = new Period(p);
        return acc + Number(period.getWorkloadCompleted());
      }, 0) || 0;

    this.dados.workloadInProgress =
      this.periods.reduce((acc: number, p: Period) => {
        const period = new Period(p);
        if (period.getStatus() === "Em curso")
          period.disciplines.forEach((d: Discipline) => {
            let discipline = new Discipline(d);
            if (discipline.getStatus() === "studying")
              return acc + Number(period.workload);
          });
        return acc;
      }, 0) || 0;

    this.dados.creditsCompleted =
      this.periods.reduce((acc: number, p: Period) => {
        const period = new Period(p);
        period.disciplines.forEach((d: Discipline) => {
          d = new Discipline(d);
          if (d.getStatus() === "Aprovado") acc += Number(d.getCredits());
        });

        return acc;
      }, 0) || 0;

    this.dados.creditsPercentage =
      percent(this.dados.creditsCompleted, this.dados.credits) || 0;

    this.dados.creditsInProgress =
      this.periods.reduce((acc: number, p: Period) => {
        const period = new Period(p);
        period.disciplines.forEach((d: Discipline) => {
          d = new Discipline(d);
          if (d.getStatus() === "studying") acc += Number(d.getCredits());
        });

        return Number(acc.toFixed(2));
      }, 0) || 0;

    let periodsCompleted = 0;

    this.dados.disciplinesCompleted = this.periods.reduce(
      (acc: number, p: Period) => {
        const period = new Period(p);

        if (period.status === "Concluído") periodsCompleted += 1;

        period.disciplines.forEach((d: Discipline) => {
          d = new Discipline(d);
          if (d.getStatus() === "Aprovado") acc += 1;
        });

        return acc;
      },
      0
    );

    this.dados.periodsCompleted = periodsCompleted;

    this.dados.disciplinesInProgress =
      this.periods.reduce((acc: number, p: Period) => {
        const period = new Period(p);
        period.disciplines.forEach((d: Discipline) => {
          d = new Discipline(d);
          if (d.getStatus() === "studying") acc += 1;
        });

        return acc;
      }, 0) || 0;

    this.dados.disciplinesPercentage =
      percent(
        this.dados.disciplinesCompleted,
        this.dados.disciplinesCompleted + this.dados.disciplinesInProgress
      ) || 0;

    this.dados.workloadPercentage =
      percent(this.dados.workloadCompleted, this.dados.workload) || 0;

    this.dados.cra = this.cra(this.periods);

    this.dados.mc = this.mc(this.periods);

    this.dados.iech = this.iech(this.periods);

    this.dados.iepl = this.iepl(this.periods);

    this.dados.iea = this.iea(this.periods);

    this.setUpdatedAt();
  };

  public setDiscipline = (discipline: Discipline): void => {
    let period = this.getPeriod(discipline.getPeriodId());

    if (period) {
      period = new Period(period);
      period.setDiscipline(discipline);
      period.setWorkloadAndCredits();
      this.updatePeriod(period);
    }

    this.periods.forEach((p: Period) => {
      const period = new Period(p);
      period.disciplines.sort((a: Discipline, b: Discipline) => {
        a = new Discipline(a);
        b = new Discipline(b);

        if (a.getName() > b.getName()) return 1;
        if (a.getName() < b.getName()) return -1;
        return 0;
      });
    });

    this.setWorkloadAndCredits();
    this.setUpdatedAt();
  };

  public updateDiscipline = (discipline: Discipline): void => {
    let period = this.getPeriod(discipline.getPeriodId());

    if (period) {
      period = new Period(period);
      period.updateDiscipline(discipline);
      period.setWorkloadAndCredits();

      this.updatePeriod(period);
    }

    this.setWorkloadAndCredits();
    this.setUpdatedAt();
  };

  public setClass = (
    classs: Class,
    periodId: string,
    disciplineId: string,
    unityId: string
  ): void => {
    let period = this.periods?.find((p: Period) => {
      if (p.id === periodId) return p;
    });

    if (period) {
      period.setClass(classs, disciplineId, unityId);
      period.setWorkloadAndCredits();
      this.updatePeriod(period);
      this.setWorkloadAndCredits();
      this.setUpdatedAt();
    }
  };

  public deleteDiscipline = (id: string, periodId: string): void => {
    let period = this.getPeriod(periodId);

    if (period) {
      period = new Period(period);

      period.removeDiscipline(id);
      this.updatePeriod(period);
      this.setWorkloadAndCredits();
    }

    this.setWorkloadAndCredits();
    this.setUpdatedAt();
  };

  public deleteClass = (
    id: string,
    disciplineId: string,
    periodId: string,
    unityId: string
  ): void => {
    let period = this.getPeriod(periodId);

    if (period) {
      period = new Period(period);
      period.removeClass(id, disciplineId, unityId);
      this.updatePeriod(period);
      this.setWorkloadAndCredits();
    }

    this.setWorkloadAndCredits();
    this.setUpdatedAt();
  };

  public getCreatedAt = (): Date => this.createdAt;

  public getUpdatedAt = (): Date => this.updatedAt;
  public setUpdatedAt = (): void => {
    this.updatedAt = new Date();
  };
}

export { ICourse, Course };
