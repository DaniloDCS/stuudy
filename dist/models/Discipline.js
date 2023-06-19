"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _uuid = require('uuid');



























class Discipline  {
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  constructor({ id, name, icon, code, credits, workload, workloadCompleted, progress, media, status, type, teachers, periodId, bulletins, unities, evaluations, workers, activities, resumes, medias, TODOs, createdAt, updatedAt }) {;Discipline.prototype.__init.call(this);Discipline.prototype.__init2.call(this);Discipline.prototype.__init3.call(this);Discipline.prototype.__init4.call(this);Discipline.prototype.__init5.call(this);Discipline.prototype.__init6.call(this);Discipline.prototype.__init7.call(this);Discipline.prototype.__init8.call(this);Discipline.prototype.__init9.call(this);Discipline.prototype.__init10.call(this);Discipline.prototype.__init11.call(this);Discipline.prototype.__init12.call(this);Discipline.prototype.__init13.call(this);Discipline.prototype.__init14.call(this);Discipline.prototype.__init15.call(this);Discipline.prototype.__init16.call(this);Discipline.prototype.__init17.call(this);Discipline.prototype.__init18.call(this);Discipline.prototype.__init19.call(this);Discipline.prototype.__init20.call(this);Discipline.prototype.__init21.call(this);Discipline.prototype.__init22.call(this);Discipline.prototype.__init23.call(this);Discipline.prototype.__init24.call(this);Discipline.prototype.__init25.call(this);Discipline.prototype.__init26.call(this);Discipline.prototype.__init27.call(this);Discipline.prototype.__init28.call(this);Discipline.prototype.__init29.call(this);Discipline.prototype.__init30.call(this);Discipline.prototype.__init31.call(this);Discipline.prototype.__init32.call(this);Discipline.prototype.__init33.call(this);Discipline.prototype.__init34.call(this);Discipline.prototype.__init35.call(this);Discipline.prototype.__init36.call(this);Discipline.prototype.__init37.call(this);Discipline.prototype.__init38.call(this);Discipline.prototype.__init39.call(this);Discipline.prototype.__init40.call(this);Discipline.prototype.__init41.call(this);Discipline.prototype.__init42.call(this);Discipline.prototype.__init43.call(this);Discipline.prototype.__init44.call(this);Discipline.prototype.__init45.call(this);Discipline.prototype.__init46.call(this);Discipline.prototype.__init47.call(this);Discipline.prototype.__init48.call(this);Discipline.prototype.__init49.call(this);Discipline.prototype.__init50.call(this);Discipline.prototype.__init51.call(this);Discipline.prototype.__init52.call(this);Discipline.prototype.__init53.call(this);Discipline.prototype.__init54.call(this);Discipline.prototype.__init55.call(this);Discipline.prototype.__init56.call(this);Discipline.prototype.__init57.call(this);Discipline.prototype.__init58.call(this);Discipline.prototype.__init59.call(this);Discipline.prototype.__init60.call(this);Discipline.prototype.__init61.call(this);Discipline.prototype.__init62.call(this);Discipline.prototype.__init63.call(this);Discipline.prototype.__init64.call(this);Discipline.prototype.__init65.call(this);Discipline.prototype.__init66.call(this);Discipline.prototype.__init67.call(this);Discipline.prototype.__init68.call(this);Discipline.prototype.__init69.call(this);Discipline.prototype.__init70.call(this);Discipline.prototype.__init71.call(this);
    this.id = id || _uuid.v4.call(void 0, );
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

   __init16() {this.setName = (name) => this.name = name}

   __init17() {this.setCode = (code) => this.code = code}

   __init18() {this.setIcon = (icon) => this.icon = icon}

   __init19() {this.setCredits = (credits) => this.credits = credits}

   __init20() {this.setWorkload = (workload) => this.workload = workload}

   __init21() {this.setWorkloadCompleted = (workloadCompleted) => this.workloadCompleted = workloadCompleted}

   __init22() {this.setProgress = (progress) => this.progress = progress}

   __init23() {this.setStatus = (status) => this.status = status}

   __init24() {this.setType = (type) => this.type = type}

   __init25() {this.setTeachers = (teacher) => this.teachers.push(teacher)}

   __init26() {this.deleteTeacher = (teacher) => this.teachers = this.teachers.filter(t => t.name !== teacher.name)}

   __init27() {this.setPeriodId = (periodId) => this.periodId = periodId}

   __init28() {this.setUpdatedAt = () => this.updatedAt = new Date()}

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
      if (b.type === 'evaluation') {
        sum += Number(b.value) * Number(b.weight);
        weight += Number(b.weight);
      }
    });

    this.media = Number(((sum / weight) || 0).toFixed(1));

    this.bulletins = this.bulletins.map((b) => {
      if (b.type === 'media') b.value = this.media || 0;
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

   __init40() {this.setClass = (unityId, _class) => {
    this.unities = this.unities.map((u) => {
      const uu = new Unity(u);
      if (uu.id === unityId) {
        uu.setClasses(_class);
        this.workloadCompleted = Number(this.workloadCompleted) + Number(_class.quantity);
        this.progress = (Number(this.workloadCompleted) / Number(this.workload)) * 100;
      }
      return uu;
    });
  }}

   __init41() {this.deleteClass = (unityId, classId) => {
    this.unities = this.unities.map((u) => {
      if (u.id === unityId) u.deleteClassesById(classId);
      return u;
    });
  }}

   __init42() {this.getEvaluations = () => this.evaluations}

   __init43() {this.getEvaluationsById = (id) => {
    return this.evaluations.filter((e) => e.id === id)[0];
  }}

   __init44() {this.deleteEvaluationsById = (id) => {
    this.evaluations = this.evaluations.filter((e) => e.id !== id);
  }}

   __init45() {this.updateEvaluationsById = (id, evaluations) => {
    this.evaluations = this.evaluations.map((e) => {
      if (e.id === id) return evaluations;
      else return e;
    });
  }}

   __init46() {this.setEvaluations = (evaluations) => this.evaluations.push(evaluations)}

   __init47() {this.getWorkers = () => this.workers}

   __init48() {this.getWorkersById = (id) => {
    return this.workers.filter((w) => w.id === id)[0];
  }}

   __init49() {this.deleteWorkersById = (id) => {
    this.workers = this.workers.filter((w) => w.id !== id);
  }}

   __init50() {this.updateWorkersById = (id, workers) => {
    this.workers = this.workers.map((w) => {
      if (w.id === id) return workers;
      else return w;
    });
  }}

   __init51() {this.setWorkers = (workers) => this.workers.push(workers)}

   __init52() {this.getActivities = () => this.activities}

   __init53() {this.getActivitiesById = (id) => {
    return this.activities.filter((a) => a.id === id)[0];
  }}

   __init54() {this.deleteActivitiesById = (id) => {
    this.activities = this.activities.filter((a) => a.id !== id);
  }}

   __init55() {this.updateActivitiesById = (id, activities) => {
    this.activities = this.activities.map((a) => {
      if (a.id === id) return activities;
      else return a;
    });
  }}

   __init56() {this.setActivities = (activities) => this.activities.push(activities)}

   __init57() {this.getResumes = () => this.resumes}

   __init58() {this.getResumesById = (id) => {
    return this.resumes.filter((r) => r.id === id)[0];
  }}

   __init59() {this.deleteResumesById = (id) => {
    this.resumes = this.resumes.filter((r) => r.id !== id);
  }}

   __init60() {this.updateResumesById = (id, resumes) => {
    this.resumes = this.resumes.map((r) => {
      if (r.id === id) return resumes;
      else return r;
    });
  }}

   __init61() {this.setResumes = (resumes) => this.resumes.push(resumes)}

   __init62() {this.getMedias = () => this.medias}

   __init63() {this.getMediasById = (id) => {
    return this.medias.filter((m) => m.id === id)[0];
  }}

   __init64() {this.deleteMediasById = (id) => {
    this.medias = this.medias.filter((m) => m.id !== id);
  }}

   __init65() {this.updateMediasById = (id, medias) => {
    this.medias = this.medias.map((m) => {
      if (m.id === id) return medias;
      else return m;
    });
  }}

   __init66() {this.setMedias = (medias) => this.medias.push(medias)}

   __init67() {this.getTODOs = () => this.TODOs}

   __init68() {this.getTODOsById = (id) => {
    return this.TODOs.filter((T) => T.id === id)[0];
  }}

   __init69() {this.deleteTODOsById = (id) => {
    this.TODOs = this.TODOs.filter((t) => t.id !== id);
  }}

   __init70() {this.updateTODOsById = (id, TODOs) => {
    this.TODOs = this.TODOs.map((T) => {
      if (T.id === id) return TODOs;
      else return T;
    });
  }}

   __init71() {this.setTODOs = (TODOs) => this.TODOs.push(TODOs)}


}

class Teacher {
  
  

  constructor({ id, name }) {
    this.id = id || _uuid.v4.call(void 0, );
    this.name = name;
  }
}











class Bulletin  {
  
  
  
  
  
  
  

  constructor({ id, title, value, weight, type, createdAt, updatedAt }) {
    this.id = id || _uuid.v4.call(void 0, );
    this.title = title;
    this.value = value;
    this.weight = weight;
    this.type = type;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }
}









class Unity  {
  
  
  
  
  

  constructor({ id, title, classes, createdAt, updatedAt }) {;Unity.prototype.__init72.call(this);Unity.prototype.__init73.call(this);Unity.prototype.__init74.call(this);Unity.prototype.__init75.call(this);Unity.prototype.__init76.call(this);Unity.prototype.__init77.call(this);
    this.id = id || _uuid.v4.call(void 0, );
    this.title = title;
    this.classes = classes || [];
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

   __init72() {this.getId = () => this.id || ''}

   __init73() {this.getClasses = () => this.classes}

   __init74() {this.getClassesById = (id) => {
    return this.classes.filter((c) => c.id === id)[0];
  }}

   __init75() {this.deleteClassesById = (id) => {
    this.classes = this.classes.filter((c) => c.id !== id);
  }}

   __init76() {this.updateClassesById = (id, classes) => {

  }}

   __init77() {this.setClasses = (classes) => this.classes.push(classes)}
}














class Class  {
  
  
  
  
  
  
  
  
  
  

  constructor({ id, title, description, content, quantity, date, IWasPresent, type, createdAt, updatedAt }) {;Class.prototype.__init78.call(this);
    this.id = id || _uuid.v4.call(void 0, );
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

   __init78() {this.getId = () => this.id || ''}
}












class Evaluation  {
  
  
  
  
  
  
  
  

  constructor({ id, title, description, questions, note, bulletinId, createdAt, updatedAt }) {
    this.id = id || _uuid.v4.call(void 0, );
    this.title = title;
    this.description = description;
    this.questions = questions || [];
    this.note = note;
    this.bulletinId = bulletinId;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }
}









class Question  {
  
  
  
  
  

  constructor({ id, title, content, value, type }) {
    this.id = id || _uuid.v4.call(void 0, );
    this.title = title;
    this.content = content;
    this.value = value;
    this.type = type;
  }
}











class Work  {
  
  
  
  
  
  
  

  constructor({ id, title, content, note, bulletinId, createdAt, updatedAt }) {
    this.id = id || _uuid.v4.call(void 0, );
    this.title = title;
    this.content = content;
    this.note = note;
    this.bulletinId = bulletinId;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }
}










class Activity  {
  
  
  
  
  
  

  constructor({ id, title, description, questions, createdAt, updatedAt }) {
    this.id = id || _uuid.v4.call(void 0, );
    this.title = title;
    this.description = description;
    this.questions = questions || [];
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }
}









class Resume  {
  
  
  
  
  

  constructor({ id, title, content, createdAt, updatedAt }) {
    this.id = id || _uuid.v4.call(void 0, );
    this.title = title;
    this.content = content;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }
}










class Media  {
  
  
  
  
  
  

  constructor({ id, title, link, type, createdAt, updatedAt }) {
    this.id = id || _uuid.v4.call(void 0, );
    this.title = title;
    this.link = link;
    this.type = type;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }
}











class TODOs  {
  
  
  
  
  
  
  

  constructor({ id, title, content, status, concludedAt, createdAt, updatedAt }) {
    this.id = id || _uuid.v4.call(void 0, );
    this.title = title;
    this.content = content;
    this.status = status || 'pending';
    this.concludedAt = concludedAt || null;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }
}

exports.Discipline = Discipline; exports.Teacher = Teacher; exports.Unity = Unity; exports.Class = Class; exports.Evaluation = Evaluation; exports.Bulletin = Bulletin; exports.Question = Question; exports.Work = Work; exports.Activity = Activity; exports.Resume = Resume; exports.Media = Media; exports.TODOs = TODOs;