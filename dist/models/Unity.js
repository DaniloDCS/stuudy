"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _uuid = require('uuid');
var _Class = require('./Class');









class Unity  {
  
  
  
  
  

  constructor({ id, title, classes, createdAt, updatedAt }) {;Unity.prototype.__init.call(this);Unity.prototype.__init2.call(this);Unity.prototype.__init3.call(this);Unity.prototype.__init4.call(this);Unity.prototype.__init5.call(this);Unity.prototype.__init6.call(this);Unity.prototype.__init7.call(this);
    this.id = id || _uuid.v4.call(void 0, );
    this.title = title;
    this.classes = classes || [];
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

   __init() {this.getId = () => this.id || ""}

   __init2() {this.getClasses = () => this.classes}

   __init3() {this.getClassById = (id) => {
    return this.classes.filter((c) => c.id === id)[0];
  }}

   __init4() {this.getWorkloadCompleted = () => {
    return this.classes.reduce(
      (a, c) => a + Number(new (0, _Class.Class)(c).getQuantity()),
      0
    );
  }}

   __init5() {this.deleteClassById = (id) => {
    this.classes = this.classes.filter((c) => c.id !== id);
  }}

   __init6() {this.updateClassById = (id, _class) => {
    this.classes = this.classes.map((c) => {
      if (c.id === id) return _class;
      else return c;
    });
  }}

   __init7() {this.setClasses = (classes) => {
    this.classes.push(classes);

    this.classes = this.classes.sort((a, b) => {
      return (
        new Date(new (0, _Class.Class)(a).getDate()).getTime() -
        new Date(new (0, _Class.Class)(b).getDate()).getTime()
      );
    });
  }}
}

exports.Unity = Unity;