import { v4 as uuid } from "uuid";
import { Reminder } from "./Reminder";
import { Book } from "./Book";
import { TODO } from "./TODO";
import { Resume } from "./Resume";
import { Activity } from "./Activity";
import { Work } from "./Work";
import { Evaluation } from "./Evaluation";
import { Class } from "./Class";
import { Unity } from "./Unity";
import { Bulletin } from "./Bulletin";

interface IDiscipline {
  readonly id?: string;
  name: string;
  icon?: string;
  code: string;
  credits: number;
  workload: number;
  workloadCompleted?: number;
  progress?: number;
  media?: number;
  status?: string;
  type?: string;
  teachers: Teacher[];
  periodId: string;
  bulletins?: Bulletin[];
  unities?: Unity[];
  evaluations?: Evaluation[];
  workers?: Work[];
  activities?: Activity[];
  resumes?: Resume[];
  TODOs?: TODO[];
  books?: Book[];
  reminders?: Reminder[];
  readonly createdAt?: Date;
  updatedAt?: Date;
}

class Discipline implements IDiscipline {
  id: string;
  name: string;
  icon: string;
  code: string;
  credits: number;
  workload: number;
  workloadCompleted?: number;
  progress: number;
  media?: number;
  status: string;
  type: string;
  teachers: Teacher[];
  periodId: string;
  bulletins: Bulletin[];
  unities: Unity[];
  evaluations: Evaluation[];
  workers: Work[];
  activities: Activity[];
  resumes: Resume[];
  TODOs: TODO[];
  books: Book[];
  reminders: Reminder[];
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    name,
    icon,
    code,
    credits,
    workload,
    workloadCompleted,
    progress,
    media,
    status,
    type,
    teachers,
    periodId,
    bulletins,
    unities,
    evaluations,
    workers,
    activities,
    resumes,
    TODOs,
    books,
    reminders,
    createdAt,
    updatedAt,
  }: IDiscipline) {
    this.id = id || uuid();
    this.name = name;
    this.icon = icon || "&#128218;";
    this.code = code || "";
    this.credits = credits;
    this.workload = workload;
    this.workloadCompleted = workloadCompleted || 0;
    this.progress = progress || 0;
    this.media = media || 0;
    this.status = status || "studying";
    this.type = type || "obligatory";
    this.teachers = teachers || [];
    this.periodId = periodId;
    this.unities = unities || [];
    this.evaluations = evaluations || [];
    this.workers = workers || [];
    this.activities = activities || [];
    this.resumes = resumes || [];
    this.TODOs = TODOs || [];
    this.books = books || [];
    this.reminders = reminders || [];
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();

    let numberOfBulletins =
      this.credits < 4 ? 2 : this.credits >= 4 && this.credits <= 6 ? 3 : 4;
    numberOfBulletins += 2;

    this.bulletins =
      bulletins ||
      new Array(numberOfBulletins).fill(0).map((_, index) => {
        const weight = 1;
        const value = 0;
        const title =
          index < numberOfBulletins - 2
            ? `Avaliação ${index + 1}`
            : index === numberOfBulletins - 2
            ? "Média"
            : "Exame Final";
        const type =
          index < numberOfBulletins - 2
            ? `evaluation`
            : index === numberOfBulletins - 2
            ? "media"
            : "final";

        return new Bulletin({ title, value, weight, type });
      });

    numberOfBulletins -= 2;
    this.unities =
      unities ||
      new Array(numberOfBulletins).fill(0).map((_, index) => {
        const title = `Unidade ${index + 1}`;
        const weight = 1;
        const value = 0;
        const type = "unity";

        return new Unity({ title });
      });
  }

  public getId = (): string => this.id;

  public getName = (): string => this.name;

  public getIcon = (): string => this.icon;

  public getCode = (): string => this.code;

  public getCredits = (): number => this.credits;

  public getWorkload = (): number => this.workload;

  public getWorkloadCompleted = (): number => this.workloadCompleted || 0;

  public getProgress = (): number => this.progress;

  public getMedia = (): number => this.media || 0;

  public getStatus = (): string => this.status;

  public getType = (): string => this.type;

  public getTeachers = (): object => this.teachers;

  public getPeriodId = (): string => this.periodId;

  public getCreatedAt = (): Date => this.createdAt;

  public getUpdatedAt = (): Date => this.updatedAt;

  public setName = (name: string) => (this.name = name);

  public setCode = (code: string) => (this.code = code);

  public setIcon = (icon: string) => (this.icon = icon);

  public setCredits = (credits: number) => (this.credits = credits);

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

  public setTeachers = (teacher: Teacher) => this.teachers.push(teacher);

  public deleteTeacher = (teacher: Teacher) =>
    (this.teachers = this.teachers.filter((t) => t.name !== teacher.name));

  public setPeriodId = (periodId: string) => (this.periodId = periodId);

  public setUpdatedAt = () => (this.updatedAt = new Date());

  public getBulletins = (): Bulletin[] => this.bulletins;

  public getBulletinsById = (id: string): Bulletin => {
    return this.bulletins.filter((b: Bulletin) => b.id === id)[0];
  };

  public deleteBulletinsById = (id: string) => {
    this.bulletins = this.bulletins.filter((b: Bulletin) => b.id !== id);
  };

  public updateBulletinsById = (id: string, bulletin: Bulletin) => {
    this.bulletins = this.bulletins.map((b: Bulletin) => {
      if (b.id === id) return bulletin;
      else return b;
    });
  };

  public setBulletins = (bulletins: Bulletin) => this.bulletins.push(bulletins);

  public updateBulletins = (notes: Bulletin[]) => {
    this.bulletins = notes;

    // calcular média
    let sum = 0;
    let weight = 0;

    this.bulletins.forEach((b: Bulletin) => {
      if (b.type === "evaluation") {
        sum += Number(b.value) * Number(b.weight);
        weight += Number(b.weight);
      }
    });

    this.media = Number((sum / weight || 0).toFixed(1));

    this.bulletins = this.bulletins.map((b: Bulletin) => {
      if (b.type === "media") b.value = this.media || 0;
      return b;
    });

    return this;
  };

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

  public getClassById = (id: string): Class | null => {
    let class_: any = {};

    this.unities.forEach((u: Unity) => {
      const unity = new Unity(u);
      const c = unity.getClassById(id);
      if (c) class_ = new Class(c);
    });

    return class_;
  };

  public setClass = (unityId: string, _class: Class) => {
    this.unities = this.unities.map((u: Unity) => {
      const uu = new Unity(u);

      if (uu.id === unityId) uu.setClasses(_class);

      return uu;
    });

    this.setWorkloadCompleted();
    this.setProgress();
  };

  public deleteClassById = (unityId: string, classId: string) => {
    this.unities = this.unities.map((u: Unity) => {
      if (u.id === unityId) u.deleteClassById(classId);
      return u;
    });
  };

  public getUnityIdByClassId = (classId: string): string => {
    let id: string = "";
    this.unities.forEach((u: Unity) => {
      if (new Unity(u).getClassById(classId)) id = u.id || "";
    });

    return id;
  };

  public updateClassById = (unityId: string, _class: Class) => {
    this.unities = this.unities.map((u: Unity) => {
      let unity = new Unity(u);
      if (unity.getId() === unityId)
        unity.updateClassById(_class.getId(), _class);
      return unity;
    });
  };

  public getEvaluations = (): Evaluation[] => this.evaluations;

  public getEvaluationById = (id: string): Evaluation => {
    return this.evaluations.filter((e: Evaluation) => e.id === id)[0];
  };

  public deleteEvaluationById = (id: string) => {
    this.evaluations = this.evaluations.filter((e: Evaluation) => e.id !== id);
  };

  public updateEvaluationById = (id: string, evaluation: Evaluation) => {
    this.evaluations = this.evaluations.map((e: Evaluation) => {
      if (e.id === id) return evaluation;
      else return e;
    });
  };

  public setEvaluation = (evaluation: Evaluation) =>
    this.evaluations.push(evaluation);

  public getWorkers = (): Work[] => this.workers;

  public getWorkById = (id: string): Work => {
    return this.workers.filter((w: Work) => w.id === id)[0];
  };

  public deleteWorkById = (id: string) => {
    this.workers = this.workers.filter((w: Work) => w.id !== id);
  };

  public updateWorkById = (id: string, workers: Work) => {
    this.workers = this.workers.map((w: Work) => {
      if (w.id === id) return workers;
      else return w;
    });
  };

  public setWork = (workers: Work) => this.workers.push(workers);

  public getActivities = (): Activity[] => this.activities;

  public deleteActivityById = (id: string) => {
    this.activities = this.activities.filter((a: Activity) => a.id !== id);
  };

  public updateActivityById = (id: string, activities: Activity) => {
    this.activities = this.activities.map((a: Activity) => {
      if (a.id === id) return activities;
      else return a;
    });
  };

  public setActivity = (activity: Activity) => this.activities.push(activity);

  public getActivityById = (id: string): Activity => {
    return this.activities.filter((a: Activity) => a.id === id)[0];
  };

  public getResumes = (): Resume[] => this.resumes;

  public getResumeById = (id: string): Resume => {
    return this.resumes.filter((r: Resume) => r.id === id)[0];
  };

  public deleteResumeById = (id: string) => {
    this.resumes = this.resumes.filter((r: Resume) => r.id !== id);
  };

  public updateResumeById = (id: string, resumes: Resume) => {
    this.resumes = this.resumes.map((r: Resume) => {
      if (r.id === id) return resumes;
      else return r;
    });
  };

  public setResume = (resumes: Resume) => this.resumes.push(resumes);

  public getTODOs = (): TODO[] => this.TODOs;

  public getTodoById = (id: string): TODO => {
    return this.TODOs.filter((T: TODO) => T.id === id)[0];
  };

  public deleteTODOById = (id: string) => {
    this.TODOs = this.TODOs.filter((t: TODO) => t.id !== id);
  };

  public updateTODOById = (id: string, TODOs: TODO) => {
    this.TODOs = this.TODOs.map((T: TODO) => {
      if (T.id === id) return TODOs;
      else return T;
    });
  };

  public setTODO = (TODO: TODO) => {
    this.TODOs.push(TODO);
    // order by date: the most recent first
    this.TODOs = this.TODOs.sort((a: TODO, b: TODO) => {
      if (!a.finishIn) a.finishIn = a.concludedAt
      if (!b.finishIn) b.finishIn = b.concludedAt
      return Number(new Date(a.finishIn)) - Number(new Date(b.finishIn));
    });
  }

  public setBook = (book: Book) => this.books.push(book);

  public getBooks = (): Book[] => this.books;

  public getBookById = (id: string): Book => {
    return this.books.filter((b: Book) => b.id === id)[0];
  };

  public deleteBookById = (id: string) => {
    this.books = this.books.filter((b: Book) => b.id !== id);
  };

  public updateBookById = (id: string, books: Book) => {
    this.books = this.books.map((b: Book) => {
      if (b.id === id) return books;
      else return b;
    });
  };

  public setTeacher = (teacher: Teacher) => this.teachers.push(teacher);

  public getTeachersById = (id: string): Teacher => {
    return this.teachers.filter((t: Teacher) => t.id === id)[0];
  };

  public deleteTeachersById = (id: string) => {
    this.teachers = this.teachers.filter((t: Teacher) => t.id !== id);
  };

  public updateTeachersById = (id: string, teachers: Teacher) => {
    this.teachers = this.teachers.map((t: Teacher) => {
      if (t.id === id) return teachers;
      else return t;
    });
  };

  public getReminders = (): Reminder[] => this.reminders;

  public getReminderById = (id: string): Reminder => {
    return this.reminders.filter((r: Reminder) => r.id === id)[0];
  };

  public deleteReminderById = (id: string) => {
    this.reminders = this.reminders.filter((r: Reminder) => r.id !== id);
  };

  public updateReminderById = (id: string, reminders: Reminder) => {
    this.reminders = this.reminders.map((r: Reminder) => {
      if (r.id === id) return reminders;
      else return r;
    });
  };

  public setReminder = (reminder: Reminder) => this.reminders.push(reminder);
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
