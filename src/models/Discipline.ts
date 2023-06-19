import { v4 as uuid } from 'uuid';

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
  unities?: Unity[]
  evaluations?: Evaluation[];
  workers?: Work[];
  activities?: Activity[];
  resumes?: Resume[];
  medias?: Media[];
  TODOs?: TODOs[];
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
  unities: Unity[]
  evaluations: Evaluation[];
  workers: Work[];
  activities: Activity[];
  resumes: Resume[];
  medias: Media[];
  TODOs: TODOs[];
  createdAt: Date;
  updatedAt: Date;

  constructor({ id, name, icon, code, credits, workload, workloadCompleted, progress, media, status, type, teachers, periodId, bulletins, unities, evaluations, workers, activities, resumes, medias, TODOs, createdAt, updatedAt }: IDiscipline) {
    this.id = id || uuid();
    this.name = name;
    this.icon = icon || '&#128218;';
    this.code = code || '';
    this.credits = credits;
    this.workload = workload;
    this.workloadCompleted = workloadCompleted || 0;
    this.progress = progress || 0;
    this.media = media || 0;
    this.status = status || 'studying';
    this.type = type || 'obligatory';
    this.teachers = teachers || [];
    this.periodId = periodId;
    this.unities = unities || [];
    this.evaluations = evaluations || [];
    this.workers = workers || [];
    this.activities = activities || [];
    this.resumes = resumes || [];
    this.medias = medias || [];
    this.TODOs = TODOs || [];
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();

    let numberOfBulletins = this.credits < 4 ? 2 : this.credits >= 4 && this.credits <= 6 ? 3 : 4;
    numberOfBulletins += 2;

    this.bulletins = bulletins || new Array(numberOfBulletins).fill(0).map((_, index) => {
      const weight = 1;
      const value = 0;
      const title = index < numberOfBulletins - 2 ? `Avaliação ${index + 1}` : index === numberOfBulletins - 2 ? 'Média' : 'Exame Final';
      const type = index < numberOfBulletins - 2 ? `evaluation` : index === numberOfBulletins - 2 ? 'media' : 'final';

      return new Bulletin({ title, value, weight, type });
    });

    numberOfBulletins -= 2;
    this.unities = unities || new Array(numberOfBulletins).fill(0).map((_, index) => {
      const title = `Unidade ${index + 1}`;
      const weight = 1;
      const value = 0;
      const type = 'unity';

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

  public setName = (name: string) => this.name = name;

  public setCode = (code: string) => this.code = code;

  public setIcon = (icon: string) => this.icon = icon;

  public setCredits = (credits: number) => this.credits = credits;

  public setWorkload = (workload: number) => this.workload = workload;

  public setWorkloadCompleted = (workloadCompleted: number) => this.workloadCompleted = workloadCompleted;

  public setProgress = (progress: number) => this.progress = progress;

  public setStatus = (status: string) => this.status = status;

  public setType = (type: string) => this.type = type;

  public setTeachers = (teacher: Teacher) => this.teachers.push(teacher);

  public deleteTeacher = (teacher: Teacher) => this.teachers = this.teachers.filter(t => t.name !== teacher.name);

  public setPeriodId = (periodId: string) => this.periodId = periodId;

  public setUpdatedAt = () => this.updatedAt = new Date();

  public getBulletins = (): Bulletin[] => this.bulletins;

  public getBulletinsById = (id: string): Bulletin => {
    return this.bulletins.filter((b: Bulletin) => b.id === id)[0];
  }

  public deleteBulletinsById = (id: string) => {
    this.bulletins = this.bulletins.filter((b: Bulletin) => b.id !== id);
  }

  public updateBulletinsById = (id: string, bulletin: Bulletin) => {
    this.bulletins = this.bulletins.map((b: Bulletin) => {
      if (b.id === id) return bulletin;
      else return b;
    });
  }

  public setBulletins = (bulletins: Bulletin) => this.bulletins.push(bulletins);

  public updateBulletins = (notes: Bulletin[]) => {

    this.bulletins = notes;

    // calcular média
    let sum = 0;
    let weight = 0;

    this.bulletins.forEach((b: Bulletin) => {
      if (b.type === 'evaluation') {
        sum += Number(b.value) * Number(b.weight);
        weight += Number(b.weight);
      }
    });

    this.media = Number(((sum / weight) || 0).toFixed(1));

    this.bulletins = this.bulletins.map((b: Bulletin) => {
      if (b.type === 'media') b.value = this.media || 0;
      return b;
    });

    return this;
  }

  public getUnities = (): Unity[] => this.unities;

  public getUnitiesById = (id: string): Unity => {
    return this.unities.filter((u: Unity) => u.id === id)[0];
  }

  public deleteUnitiesById = (id: string) => {
    this.unities = this.unities.filter((u: Unity) => u.id !== id);
  }

  public updateUnitiesById = (id: string, unities: Unity) => {
    this.unities = this.unities.map((u: Unity) => {
      if (u.id === id) return unities;
      else return u;
    });
  }

  public setUnities = (unities: Unity) => this.unities.push(unities);

  public setClass = (unityId: string, _class: Class) => {
    this.unities = this.unities.map((u: Unity) => {
      const uu = new Unity(u);
      if (uu.id === unityId) {
        uu.setClasses(_class);
        this.workloadCompleted = Number(this.workloadCompleted) + Number(_class.quantity);
        this.progress = (Number(this.workloadCompleted) / Number(this.workload)) * 100;
      }
      return uu;
    });
  }

  public deleteClass = (unityId: string, classId: string) => {
    this.unities = this.unities.map((u: Unity) => {
      if (u.id === unityId) u.deleteClassesById(classId);
      return u;
    });
  }

  public getEvaluations = (): Evaluation[] => this.evaluations;

  public getEvaluationsById = (id: string): Evaluation => {
    return this.evaluations.filter((e: Evaluation) => e.id === id)[0];
  }

  public deleteEvaluationsById = (id: string) => {
    this.evaluations = this.evaluations.filter((e: Evaluation) => e.id !== id);
  }

  public updateEvaluationsById = (id: string, evaluations: Evaluation) => {
    this.evaluations = this.evaluations.map((e: Evaluation) => {
      if (e.id === id) return evaluations;
      else return e;
    });
  }

  public setEvaluations = (evaluations: Evaluation) => this.evaluations.push(evaluations);

  public getWorkers = (): Work[] => this.workers;

  public getWorkersById = (id: string): Work => {
    return this.workers.filter((w: Work) => w.id === id)[0];
  }

  public deleteWorkersById = (id: string) => {
    this.workers = this.workers.filter((w: Work) => w.id !== id);
  }

  public updateWorkersById = (id: string, workers: Work) => {
    this.workers = this.workers.map((w: Work) => {
      if (w.id === id) return workers;
      else return w;
    });
  }

  public setWorkers = (workers: Work) => this.workers.push(workers);

  public getActivities = (): Activity[] => this.activities;

  public getActivitiesById = (id: string): Activity => {
    return this.activities.filter((a: Activity) => a.id === id)[0];
  }

  public deleteActivitiesById = (id: string) => {
    this.activities = this.activities.filter((a: Activity) => a.id !== id);
  }

  public updateActivitiesById = (id: string, activities: Activity) => {
    this.activities = this.activities.map((a: Activity) => {
      if (a.id === id) return activities;
      else return a;
    });
  }

  public setActivities = (activities: Activity) => this.activities.push(activities);

  public getResumes = (): Resume[] => this.resumes;

  public getResumesById = (id: string): Resume => {
    return this.resumes.filter((r: Resume) => r.id === id)[0];
  }

  public deleteResumesById = (id: string) => {
    this.resumes = this.resumes.filter((r: Resume) => r.id !== id);
  }

  public updateResumesById = (id: string, resumes: Resume) => {
    this.resumes = this.resumes.map((r: Resume) => {
      if (r.id === id) return resumes;
      else return r;
    });
  }

  public setResumes = (resumes: Resume) => this.resumes.push(resumes);

  public getMedias = (): Media[] => this.medias;

  public getMediasById = (id: string): Media => {
    return this.medias.filter((m: Media) => m.id === id)[0];
  }

  public deleteMediasById = (id: string) => {
    this.medias = this.medias.filter((m: Media) => m.id !== id);
  }

  public updateMediasById = (id: string, medias: Media) => {
    this.medias = this.medias.map((m: Media) => {
      if (m.id === id) return medias;
      else return m;
    });
  }

  public setMedias = (medias: Media) => this.medias.push(medias);

  public getTODOs = (): TODOs[] => this.TODOs;

  public getTODOsById = (id: string): TODOs => {
    return this.TODOs.filter((T: TODOs) => T.id === id)[0];
  }

  public deleteTODOsById = (id: string) => {
    this.TODOs = this.TODOs.filter((t: TODOs) => t.id !== id);
  }

  public updateTODOsById = (id: string, TODOs: TODOs) => {
    this.TODOs = this.TODOs.map((T: TODOs) => {
      if (T.id === id) return TODOs;
      else return T;
    });
  }

  public setTODOs = (TODOs: TODOs) => this.TODOs.push(TODOs);


}

class Teacher {
  id?: string;
  name: string;

  constructor({ id, name }: { id?: string, name: string }) {
    this.id = id || uuid();
    this.name = name;
  }
}

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

  constructor({ id, title, value, weight, type, createdAt, updatedAt }: IBulletin) {
    this.id = id || uuid();
    this.title = title;
    this.value = value;
    this.weight = weight;
    this.type = type;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }
}

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

  public getId = (): string => this.id || '';

  public getClasses = (): Class[] => this.classes;

  public getClassesById = (id: string): Class => {
    return this.classes.filter((c: Class) => c.id === id)[0];
  }

  public deleteClassesById = (id: string) => {
    this.classes = this.classes.filter((c: Class) => c.id !== id);
  }

  public updateClassesById = (id: string, classes: Class) => {

  }

  public setClasses = (classes: Class) => this.classes.push(classes);
}

interface IClass {
  readonly id?: string;
  title: string;
  description: string;
  content: string;
  quantity: number;
  date: Date;
  IWasPresent?: boolean;
  type?: string;
  readonly createdAt?: Date;
  updatedAt?: Date;
}

class Class implements IClass {
  readonly id?: string;
  title: string;
  description: string;
  content: string;
  quantity: number;
  date: Date;
  IWasPresent: boolean;
  type: string;
  readonly createdAt?: Date;
  updatedAt?: Date;

  constructor({ id, title, description, content, quantity, date, IWasPresent, type, createdAt, updatedAt }: IClass) {
    this.id = id || uuid();
    this.title = title;
    this.description = description;
    this.content = content;
    this.quantity = quantity;
    this.date = date;
    this.IWasPresent = IWasPresent || false;
    this.type = type || 'class';
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

  public getId = (): string => this.id || '';
}

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

  constructor({ id, title, description, questions, note, bulletinId, createdAt, updatedAt }: IEvaluation) {
    this.id = id || uuid();
    this.title = title;
    this.description = description;
    this.questions = questions || [];
    this.note = note;
    this.bulletinId = bulletinId;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }
}

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

interface IWork {
  readonly id?: string;
  title: string;
  content: string;
  note?: number;
  bulletinId?: string;
  readonly createdAt?: Date;
  updatedAt?: Date;
}

class Work implements IWork {
  readonly id?: string;
  title: string;
  content: string;
  note?: number;
  bulletinId?: string;
  readonly createdAt?: Date;
  updatedAt?: Date;

  constructor({ id, title, content, note, bulletinId, createdAt, updatedAt }: IWork) {
    this.id = id || uuid();
    this.title = title;
    this.content = content;
    this.note = note;
    this.bulletinId = bulletinId;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }
}

interface IActivity {
  readonly id?: string;
  title: string;
  description: string;
  questions: Question[];
  readonly createdAt?: Date;
  updatedAt?: Date
}

class Activity implements IActivity {
  readonly id?: string;
  title: string;
  description: string;
  questions: Question[];
  readonly createdAt?: Date;
  updatedAt?: Date;

  constructor({ id, title, description, questions, createdAt, updatedAt }: IActivity) {
    this.id = id || uuid();
    this.title = title;
    this.description = description;
    this.questions = questions || [];
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }
}

interface IResume {
  readonly id?: string;
  title: string;
  content: string;
  readonly createdAt?: Date;
  updatedAt?: Date;
}

class Resume implements IResume {
  readonly id?: string;
  title: string;
  content: string;
  readonly createdAt?: Date;
  updatedAt?: Date;

  constructor({ id, title, content, createdAt, updatedAt }: IResume) {
    this.id = id || uuid();
    this.title = title;
    this.content = content;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }
}

interface IMedia {
  readonly id?: string;
  title: string;
  link: string;
  type: string;
  readonly createdAt?: Date;
  updatedAt?: Date;
}

class Media implements IMedia {
  readonly id?: string;
  title: string;
  link: string;
  type: string;
  readonly createdAt?: Date;
  updatedAt?: Date;

  constructor({ id, title, link, type, createdAt, updatedAt }: IMedia) {
    this.id = id || uuid();
    this.title = title;
    this.link = link;
    this.type = type;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }
}

interface ITODOs {
  readonly id?: string;
  title: string;
  content: string;
  status?: string;
  concludedAt?: Date | null;
  readonly createdAt?: Date;
  updatedAt?: Date;
}

class TODOs implements ITODOs {
  readonly id?: string;
  title: string;
  content: string;
  status: string;
  concludedAt?: Date | null;
  readonly createdAt?: Date;
  updatedAt?: Date;

  constructor({ id, title, content, status, concludedAt, createdAt, updatedAt }: ITODOs) {
    this.id = id || uuid();
    this.title = title;
    this.content = content;
    this.status = status || 'pending';
    this.concludedAt = concludedAt || null;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }
}

export { Discipline, Teacher, Unity, Class, Evaluation, Bulletin, Question, Work, Activity, Resume, Media, TODOs };