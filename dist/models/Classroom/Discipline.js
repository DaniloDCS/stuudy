"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _uuid = require('uuid');
var _Unity = require('../Unity');

















class Discipline  {
  
  
  
  
  
  
  
  
  
  __init() {this.unities = []}
  
  
  

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
  }) {;Discipline.prototype.__init.call(this);Discipline.prototype.__init2.call(this);Discipline.prototype.__init3.call(this);Discipline.prototype.__init4.call(this);Discipline.prototype.__init5.call(this);Discipline.prototype.__init6.call(this);Discipline.prototype.__init7.call(this);Discipline.prototype.__init8.call(this);Discipline.prototype.__init9.call(this);Discipline.prototype.__init10.call(this);Discipline.prototype.__init11.call(this);Discipline.prototype.__init12.call(this);Discipline.prototype.__init13.call(this);Discipline.prototype.__init14.call(this);Discipline.prototype.__init15.call(this);Discipline.prototype.__init16.call(this);Discipline.prototype.__init17.call(this);Discipline.prototype.__init18.call(this);Discipline.prototype.__init19.call(this);Discipline.prototype.__init20.call(this);Discipline.prototype.__init21.call(this);Discipline.prototype.__init22.call(this);Discipline.prototype.__init23.call(this);Discipline.prototype.__init24.call(this);Discipline.prototype.__init25.call(this);Discipline.prototype.__init26.call(this);Discipline.prototype.__init27.call(this);Discipline.prototype.__init28.call(this);Discipline.prototype.__init29.call(this);Discipline.prototype.__init30.call(this);
    this.id = id || _uuid.v4.call(void 0, );
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

   __init2() {this.getId = () => this.id}

   __init3() {this.getName = () => this.name}

   __init4() {this.getIcon = () => this.icon}

   __init5() {this.getCode = () => this.code}

   __init6() {this.getWorkload = () => this.workload}

   __init7() {this.getWorkloadCompleted = () => this.workloadCompleted || 0}

   __init8() {this.getProgress = () => this.progress}

   __init9() {this.getMedia = () => this.media || 0}

   __init10() {this.getStatus = () => this.status}

   __init11() {this.getType = () => this.type}

   __init12() {this.getCreatedAt = () => this.createdAt}

   __init13() {this.getUpdatedAt = () => this.updatedAt}

   __init14() {this.setName = (name) => (this.name = name)}

   __init15() {this.setCode = (code) => (this.code = code)}

   __init16() {this.setIcon = (icon) => (this.icon = icon)}

   __init17() {this.setWorkload = (workload) => (this.workload = workload)}

   __init18() {this.setWorkloadCompleted = () => {
    this.workloadCompleted = this.unities.reduce(
      (acc, u) => acc + new (0, _Unity.Unity)(u).getWorkloadCompleted(),
      0
    );
  }}

   __init19() {this.setProgress = () => {
    this.progress = Number(
      (
        (Number(this.getWorkloadCompleted()) / Number(this.getWorkload())) *
        100
      ).toFixed(2)
    );
  }}

   __init20() {this.setStatus = (status) => (this.status = status)}

   __init21() {this.setType = (type) => (this.type = type)}


   __init22() {this.setUpdatedAt = () => (this.updatedAt = new Date())}

   __init23() {this.getUnities = () => this.unities}

   __init24() {this.getUnitiesById = (id) => {
    return this.unities.filter((u) => u.id === id)[0];
  }}

   __init25() {this.deleteUnitiesById = (id) => {
    this.unities = this.unities.filter((u) => u.id !== id);
  }}

   __init26() {this.updateUnitiesById = (id, unities) => {
    this.unities = this.unities.map((u) => {
      if (u.id === id) return unities;
      else return u;
    });
  }}

   __init27() {this.setUnities = (unities) => this.unities.push(unities)}

   __init28() {this.setNewUnity = () => {
    this.unities.push(
      new (0, _Unity.Unity)({
        title: `Unidade ${this.unities.length + 1}`,
      })
    );
  }}

   __init29() {this.getUnity = (id) => {
    return this.unities.filter((u) => u.id === id)[0];
  }}

   __init30() {this.deleteUnity = (id) => {
    this.unities = this.unities.filter((unity) => unity.id != id);

    this.setWorkloadCompleted();
    this.setProgress();
    this.setUpdatedAt();
  }}
}

class Teacher {
  
  

  constructor({ id, name }) {
    this.id = id || _uuid.v4.call(void 0, );
    this.name = name;
  }
}

exports.Discipline = Discipline; exports.Teacher = Teacher;
