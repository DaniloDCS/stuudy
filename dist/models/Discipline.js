"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _uuid = require('uuid');







var _Class = require('./Class');
var _Unity = require('./Unity');
var _Bulletin = require('./Bulletin');




























class Discipline  {
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

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
  }) {;Discipline.prototype.__init.call(this);Discipline.prototype.__init2.call(this);Discipline.prototype.__init3.call(this);Discipline.prototype.__init4.call(this);Discipline.prototype.__init5.call(this);Discipline.prototype.__init6.call(this);Discipline.prototype.__init7.call(this);Discipline.prototype.__init8.call(this);Discipline.prototype.__init9.call(this);Discipline.prototype.__init10.call(this);Discipline.prototype.__init11.call(this);Discipline.prototype.__init12.call(this);Discipline.prototype.__init13.call(this);Discipline.prototype.__init14.call(this);Discipline.prototype.__init15.call(this);Discipline.prototype.__init16.call(this);Discipline.prototype.__init17.call(this);Discipline.prototype.__init18.call(this);Discipline.prototype.__init19.call(this);Discipline.prototype.__init20.call(this);Discipline.prototype.__init21.call(this);Discipline.prototype.__init22.call(this);Discipline.prototype.__init23.call(this);Discipline.prototype.__init24.call(this);Discipline.prototype.__init25.call(this);Discipline.prototype.__init26.call(this);Discipline.prototype.__init27.call(this);Discipline.prototype.__init28.call(this);Discipline.prototype.__init29.call(this);Discipline.prototype.__init30.call(this);Discipline.prototype.__init31.call(this);Discipline.prototype.__init32.call(this);Discipline.prototype.__init33.call(this);Discipline.prototype.__init34.call(this);Discipline.prototype.__init35.call(this);Discipline.prototype.__init36.call(this);Discipline.prototype.__init37.call(this);Discipline.prototype.__init38.call(this);Discipline.prototype.__init39.call(this);Discipline.prototype.__init40.call(this);Discipline.prototype.__init41.call(this);Discipline.prototype.__init42.call(this);Discipline.prototype.__init43.call(this);Discipline.prototype.__init44.call(this);Discipline.prototype.__init45.call(this);Discipline.prototype.__init46.call(this);Discipline.prototype.__init47.call(this);Discipline.prototype.__init48.call(this);Discipline.prototype.__init49.call(this);Discipline.prototype.__init50.call(this);Discipline.prototype.__init51.call(this);Discipline.prototype.__init52.call(this);Discipline.prototype.__init53.call(this);Discipline.prototype.__init54.call(this);Discipline.prototype.__init55.call(this);Discipline.prototype.__init56.call(this);Discipline.prototype.__init57.call(this);Discipline.prototype.__init58.call(this);Discipline.prototype.__init59.call(this);Discipline.prototype.__init60.call(this);Discipline.prototype.__init61.call(this);Discipline.prototype.__init62.call(this);Discipline.prototype.__init63.call(this);Discipline.prototype.__init64.call(this);Discipline.prototype.__init65.call(this);Discipline.prototype.__init66.call(this);Discipline.prototype.__init67.call(this);Discipline.prototype.__init68.call(this);Discipline.prototype.__init69.call(this);Discipline.prototype.__init70.call(this);Discipline.prototype.__init71.call(this);Discipline.prototype.__init72.call(this);Discipline.prototype.__init73.call(this);Discipline.prototype.__init74.call(this);Discipline.prototype.__init75.call(this);Discipline.prototype.__init76.call(this);Discipline.prototype.__init77.call(this);Discipline.prototype.__init78.call(this);Discipline.prototype.__init79.call(this);Discipline.prototype.__init80.call(this);Discipline.prototype.__init81.call(this);Discipline.prototype.__init82.call(this);Discipline.prototype.__init83.call(this);Discipline.prototype.__init84.call(this);Discipline.prototype.__init85.call(this);Discipline.prototype.__init86.call(this);
    this.id = id || _uuid.v4.call(void 0, );
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

        return new (0, _Bulletin.Bulletin)({ title, value, weight, type });
      });

    numberOfBulletins -= 2;
    this.unities =
      unities ||
      new Array(numberOfBulletins).fill(0).map((_, index) => {
        const title = `Unidade ${index + 1}`;
        const weight = 1;
        const value = 0;
        const type = "unity";

        return new (0, _Unity.Unity)({ title });
      });
  }

   __init() {this.getId = () => this.id}

   __init2() {this.getName = () => this.name}

   __init3() {this.getIcon = () => this.icon}

   __init4() {this.getCode = () => this.code}

   __init5() {this.getCredits = () => this.credits}

   __init6() {this.getWorkload = () => this.workload}

   __init7() {this.getWorkloadCompleted = () => this.workloadCompleted || 0}

   __init8() {this.getProgress = () => this.progress}

   __init9() {this.getMedia = () => this.media || 0}

   __init10() {this.getStatus = () => this.status}

   __init11() {this.getType = () => this.type}

   __init12() {this.getTeachers = () => this.teachers}

   __init13() {this.getPeriodId = () => this.periodId}

   __init14() {this.getCreatedAt = () => this.createdAt}

   __init15() {this.getUpdatedAt = () => this.updatedAt}

   __init16() {this.setName = (name) => (this.name = name)}

   __init17() {this.setCode = (code) => (this.code = code)}

   __init18() {this.setIcon = (icon) => (this.icon = icon)}

   __init19() {this.setCredits = (credits) => (this.credits = credits)}

   __init20() {this.setWorkload = (workload) => (this.workload = workload)}

   __init21() {this.setWorkloadCompleted = () => {
    this.workloadCompleted = this.unities.reduce(
      (acc, u) => acc + new (0, _Unity.Unity)(u).getWorkloadCompleted(),
      0
    );
  }}

   __init22() {this.setProgress = () => {
    this.progress = Number(
      (
        (Number(this.getWorkloadCompleted()) / Number(this.getWorkload())) *
        100
      ).toFixed(2)
    );
  }}

   __init23() {this.setStatus = (status) => (this.status = status)}

   __init24() {this.setType = (type) => (this.type = type)}

   __init25() {this.setTeachers = (teacher) => this.teachers.push(teacher)}

   __init26() {this.deleteTeacher = (teacher) =>
    (this.teachers = this.teachers.filter((t) => t.name !== teacher.name))}

   __init27() {this.setPeriodId = (periodId) => (this.periodId = periodId)}

   __init28() {this.setUpdatedAt = () => (this.updatedAt = new Date())}

   __init29() {this.getBulletins = () => this.bulletins}

   __init30() {this.getBulletinsById = (id) => {
    return this.bulletins.filter((b) => b.id === id)[0];
  }}

   __init31() {this.deleteBulletinsById = (id) => {
    this.bulletins = this.bulletins.filter((b) => b.id !== id);
  }}

   __init32() {this.updateBulletinsById = (id, bulletin) => {
    this.bulletins = this.bulletins.map((b) => {
      if (b.id === id) return bulletin;
      else return b;
    });
  }}

   __init33() {this.setBulletins = (bulletins) => this.bulletins.push(bulletins)}

   __init34() {this.updateBulletins = (notes) => {
    this.bulletins = notes;

    // calcular média
    let sum = 0;
    let weight = 0;

    this.bulletins.forEach((b) => {
      if (b.type === "evaluation") {
        sum += Number(b.value) * Number(b.weight);
        weight += Number(b.weight);
      }
    });

    this.media = Number((sum / weight || 0).toFixed(1));

    this.bulletins = this.bulletins.map((b) => {
      if (b.type === "media") b.value = this.media || 0;
      return b;
    });

    return this;
  }}

   __init35() {this.getUnities = () => this.unities}

   __init36() {this.getUnitiesById = (id) => {
    return this.unities.filter((u) => u.id === id)[0];
  }}

   __init37() {this.deleteUnitiesById = (id) => {
    this.unities = this.unities.filter((u) => u.id !== id);
  }}

   __init38() {this.updateUnitiesById = (id, unities) => {
    this.unities = this.unities.map((u) => {
      if (u.id === id) return unities;
      else return u;
    });
  }}

   __init39() {this.setUnities = (unities) => this.unities.push(unities)}

   __init40() {this.setNewUnity = () => {
    this.unities.push(
      new (0, _Unity.Unity)({
        title: `Unidade ${this.unities.length + 1}`,
      })
    );
  }}

   __init41() {this.getUnity = (id) => {
    return this.unities.filter((u) => u.id === id)[0];
  }}

   __init42() {this.deleteUnity = (id) => {
    this.unities = this.unities.filter((unity) => unity.id != id);

    this.setWorkloadCompleted();
    this.setProgress();
    this.setUpdatedAt();
  }}

   __init43() {this.getClassById = (id) => {
    let class_ = {};

    this.unities.forEach((u) => {
      const unity = new (0, _Unity.Unity)(u);
      const c = unity.getClassById(id);
      if (c) class_ = new (0, _Class.Class)(c);
    });

    return class_;
  }}

   __init44() {this.setClass = (unityId, _class) => {
    this.unities = this.unities.map((u) => {
      const uu = new (0, _Unity.Unity)(u);

      if (uu.id === unityId) uu.setClasses(_class);

      return uu;
    });

    this.setWorkloadCompleted();
    this.setProgress();
  }}

   __init45() {this.deleteClassById = (unityId, classId) => {
    this.unities = this.unities.map((u) => {
      if (u.id === unityId) u.deleteClassById(classId);
      return u;
    });
  }}

   __init46() {this.getUnityIdByClassId = (classId) => {
    let id = "";
    this.unities.forEach((u) => {
      if (new (0, _Unity.Unity)(u).getClassById(classId)) id = u.id || "";
    });

    return id;
  }}

   __init47() {this.updateClassById = (unityId, _class) => {
    this.unities = this.unities.map((u) => {
      let unity = new (0, _Unity.Unity)(u);
      if (unity.getId() === unityId)
        unity.updateClassById(_class.getId(), _class);
      return unity;
    });
  }}

   __init48() {this.getEvaluations = () => this.evaluations}

   __init49() {this.getEvaluationById = (id) => {
    return this.evaluations.filter((e) => e.id === id)[0];
  }}

   __init50() {this.deleteEvaluationById = (id) => {
    this.evaluations = this.evaluations.filter((e) => e.id !== id);
  }}

   __init51() {this.updateEvaluationById = (id, evaluation) => {
    this.evaluations = this.evaluations.map((e) => {
      if (e.id === id) return evaluation;
      else return e;
    });
  }}

   __init52() {this.setEvaluation = (evaluation) =>
    this.evaluations.push(evaluation)}

   __init53() {this.getWorkers = () => this.workers}

   __init54() {this.getWorkById = (id) => {
    return this.workers.filter((w) => w.id === id)[0];
  }}

   __init55() {this.deleteWorkById = (id) => {
    this.workers = this.workers.filter((w) => w.id !== id);
  }}

   __init56() {this.updateWorkById = (id, workers) => {
    this.workers = this.workers.map((w) => {
      if (w.id === id) return workers;
      else return w;
    });
  }}

   __init57() {this.setWork = (workers) => this.workers.push(workers)}

   __init58() {this.getActivities = () => this.activities}

   __init59() {this.deleteActivityById = (id) => {
    this.activities = this.activities.filter((a) => a.id !== id);
  }}

   __init60() {this.updateActivityById = (id, activities) => {
    this.activities = this.activities.map((a) => {
      if (a.id === id) return activities;
      else return a;
    });
  }}

   __init61() {this.setActivity = (activity) => this.activities.push(activity)}

   __init62() {this.getActivityById = (id) => {
    return this.activities.filter((a) => a.id === id)[0];
  }}

   __init63() {this.getResumes = () => this.resumes}

   __init64() {this.getResumeById = (id) => {
    return this.resumes.filter((r) => r.id === id)[0];
  }}

   __init65() {this.deleteResumeById = (id) => {
    this.resumes = this.resumes.filter((r) => r.id !== id);
  }}

   __init66() {this.updateResumeById = (id, resumes) => {
    this.resumes = this.resumes.map((r) => {
      if (r.id === id) return resumes;
      else return r;
    });
  }}

   __init67() {this.setResume = (resumes) => this.resumes.push(resumes)}

   __init68() {this.getTODOs = () => this.TODOs}

   __init69() {this.getTodoById = (id) => {
    return this.TODOs.filter((T) => T.id === id)[0];
  }}

   __init70() {this.deleteTODOById = (id) => {
    this.TODOs = this.TODOs.filter((t) => t.id !== id);
  }}

   __init71() {this.updateTODOById = (id, TODOs) => {
    this.TODOs = this.TODOs.map((T) => {
      if (T.id === id) return TODOs;
      else return T;
    });
  }}

   __init72() {this.setTODO = (TODO) => {
    this.TODOs.push(TODO);
    // order by date: the most recent first
    this.TODOs = this.TODOs.sort((a, b) => {
      if (!a.finishIn) a.finishIn = a.concludedAt
      if (!b.finishIn) b.finishIn = b.concludedAt
      return Number(new Date(a.finishIn)) - Number(new Date(b.finishIn));
    });
  }}

   __init73() {this.setBook = (book) => this.books.push(book)}

   __init74() {this.getBooks = () => this.books}

   __init75() {this.getBookById = (id) => {
    return this.books.filter((b) => b.id === id)[0];
  }}

   __init76() {this.deleteBookById = (id) => {
    this.books = this.books.filter((b) => b.id !== id);
  }}

   __init77() {this.updateBookById = (id, books) => {
    this.books = this.books.map((b) => {
      if (b.id === id) return books;
      else return b;
    });
  }}

   __init78() {this.setTeacher = (teacher) => this.teachers.push(teacher)}

   __init79() {this.getTeachersById = (id) => {
    return this.teachers.filter((t) => t.id === id)[0];
  }}

   __init80() {this.deleteTeachersById = (id) => {
    this.teachers = this.teachers.filter((t) => t.id !== id);
  }}

   __init81() {this.updateTeachersById = (id, teachers) => {
    this.teachers = this.teachers.map((t) => {
      if (t.id === id) return teachers;
      else return t;
    });
  }}

   __init82() {this.getReminders = () => this.reminders}

   __init83() {this.getReminderById = (id) => {
    return this.reminders.filter((r) => r.id === id)[0];
  }}

   __init84() {this.deleteReminderById = (id) => {
    this.reminders = this.reminders.filter((r) => r.id !== id);
  }}

   __init85() {this.updateReminderById = (id, reminders) => {
    this.reminders = this.reminders.map((r) => {
      if (r.id === id) return reminders;
      else return r;
    });
  }}

   __init86() {this.setReminder = (reminder) => this.reminders.push(reminder)}
}

class Teacher {
  
  

  constructor({ id, name }) {
    this.id = id || _uuid.v4.call(void 0, );
    this.name = name;
  }
}

exports.Discipline = Discipline; exports.Teacher = Teacher;
