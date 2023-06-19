"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _uuid = require('uuid');
var _App = require('../App'); var _App2 = _interopRequireDefault(_App);
var _Discipline = require('./Discipline');




















class Period  {
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  constructor({ id, name, icon, credits, workload, workloadCompleted, progress, status, disciplines, cra, mc, iech, iepl, iea, createdAt, updatedAt }) {;Period.prototype.__init.call(this);Period.prototype.__init2.call(this);Period.prototype.__init3.call(this);Period.prototype.__init4.call(this);Period.prototype.__init5.call(this);Period.prototype.__init6.call(this);Period.prototype.__init7.call(this);Period.prototype.__init8.call(this);Period.prototype.__init9.call(this);Period.prototype.__init10.call(this);Period.prototype.__init11.call(this);Period.prototype.__init12.call(this);Period.prototype.__init13.call(this);Period.prototype.__init14.call(this);Period.prototype.__init15.call(this);Period.prototype.__init16.call(this);Period.prototype.__init17.call(this);Period.prototype.__init18.call(this);Period.prototype.__init19.call(this);Period.prototype.__init20.call(this);Period.prototype.__init21.call(this);Period.prototype.__init22.call(this);Period.prototype.__init23.call(this);Period.prototype.__init24.call(this);Period.prototype.__init25.call(this);Period.prototype.__init26.call(this);Period.prototype.__init27.call(this);Period.prototype.__init28.call(this);Period.prototype.__init29.call(this);Period.prototype.__init30.call(this);Period.prototype.__init31.call(this);Period.prototype.__init32.call(this);Period.prototype.__init33.call(this);Period.prototype.__init34.call(this);
    this.id = id || _uuid.v4.call(void 0, );
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

   addDiscipline(discipline) {
    this.disciplines.push(discipline);
  }

   removeDiscipline(disciplineId) {
    this.disciplines = this.disciplines.filter(discipline => discipline.id !== disciplineId);
    this.setWorkloadAndCredits();
  }

   updateDiscipline(discipline) {
    this.disciplines = this.disciplines.map(d => d.id === discipline.id ? discipline : d);
  }

   updatePeriod(period) {
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

   getId() {
    return this.id;
  }

   __init() {this.getName = () => this.name}
   __init2() {this.getIcon = () => this.icon}
   __init3() {this.getCredits = () => this.credits}
   __init4() {this.getWorkload = () => this.workload}
   __init5() {this.getWorkloadCompleted = () => this.workloadCompleted}
   __init6() {this.getProgress = () => this.progress}
   __init7() {this.getStatus = () => this.status}
   __init8() {this.getDisciplines = () => this.disciplines}
   __init9() {this.getDiscipline = (id) => this.disciplines.filter(discipline => discipline.id === id)[0]}
   __init10() {this.getCra = () => this.cra}
   __init11() {this.getMc = () => this.mc}
   __init12() {this.getIech = () => this.iech}
   __init13() {this.getIepl = () => this.iepl}
   __init14() {this.getIea = () => this.iea}
   __init15() {this.getCreatedAt = () => this.createdAt}
   __init16() {this.getUpdatedAt = () => this.updatedAt}

   __init17() {this.setName = (name) => this.name = name}
   __init18() {this.setIcon = (icon) => this.icon = icon}
   __init19() {this.setCredits = (credits) => this.credits = credits}
   __init20() {this.setWorkload = (workload) => this.workload = workload}
   __init21() {this.setWorkloadCompleted = (workloadCompleted) => this.workloadCompleted = workloadCompleted}
   __init22() {this.setProgress = (progress) => this.progress = progress}
   __init23() {this.setStatus = (status) => this.status = status}
   __init24() {this.setDiscipline = (discipline) => {
    this.disciplines.push(discipline);
    this.setWorkloadAndCredits();
  }}

   __init25() {this.deleteDiscipline = (id) => {
    this.disciplines = this.disciplines.filter(discipline => discipline.id !== id);
    this.setWorkloadAndCredits();
  }}

   __init26() {this.setWorkloadAndCredits = () => {
    this.workload = Number(this.disciplines.reduce((acc, d) => {
      let discipline = new (0, _Discipline.Discipline)(d);
      return acc + Number(discipline.getWorkload());
    }, 0));

    this.credits = this.disciplines.reduce((acc, d) => {
      let discipline = new (0, _Discipline.Discipline)(d);
      return acc + Number(discipline.getCredits());
    }, 0);

    this.workloadCompleted = Number(this.disciplines.reduce((acc, d) => {
      let discipline = new (0, _Discipline.Discipline)(d);
      return acc + Number(discipline.getWorkloadCompleted());
    }, 0));
  }}

   __init27() {this.setCra = (cra) => this.cra = cra}
   __init28() {this.setMc = (mc) => this.mc = mc}
   __init29() {this.setIech = (iech) => this.iech = iech}
   __init30() {this.setIepl = (iepl) => this.iepl = iepl}
   __init31() {this.setIea = (iea) => this.iea = iea}
   __init32() {this.setUpdatedAt = (updatedAt) => this.updatedAt = new Date()}

  getPeriod(id) {
    return this.id === id ? this : null;
  }

   __init33() {this.setClass = (classs, disciplineId, unityId) => {
    let discipline = new (0, _Discipline.Discipline)(_App2.default.get('discipline'));

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
  }}

   __init34() {this.removeClass = (classId, disciplineId, unityId) => {
    let discipline = new (0, _Discipline.Discipline)(this.getDiscipline(disciplineId));
    discipline.deleteClass(unityId, classId);
  }}

}

exports.Period = Period;