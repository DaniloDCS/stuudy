"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _uuid = require('uuid');













class Evaluation  {
  
  
  
  
  
  
  
  

  constructor({
    id,
    title,
    description,
    questions,
    note,
    bulletinId,
    createdAt,
    updatedAt,
  }) {;Evaluation.prototype.__init.call(this);Evaluation.prototype.__init2.call(this);Evaluation.prototype.__init3.call(this);Evaluation.prototype.__init4.call(this);Evaluation.prototype.__init5.call(this);Evaluation.prototype.__init6.call(this);Evaluation.prototype.__init7.call(this);Evaluation.prototype.__init8.call(this);Evaluation.prototype.__init9.call(this);Evaluation.prototype.__init10.call(this);Evaluation.prototype.__init11.call(this);Evaluation.prototype.__init12.call(this);Evaluation.prototype.__init13.call(this);Evaluation.prototype.__init14.call(this);Evaluation.prototype.__init15.call(this);Evaluation.prototype.__init16.call(this);
    this.id = id || _uuid.v4.call(void 0, );
    this.title = title;
    this.description = description;
    this.questions = questions || [];
    this.note = note;
    this.bulletinId = bulletinId;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }


   __init() {this.getId = () => this.id || ""}
   __init2() {this.getTitle = () => this.title || ""}
   __init3() {this.getDescription = () => this.description || ""}
   __init4() {this.getQuestions = () => this.questions || []}
   __init5() {this.getNote = () => this.note || 0}
   __init6() {this.getBulletinId = () => this.bulletinId || ""}
   __init7() {this.getCreatedAt = () => this.createdAt || new Date()}
   __init8() {this.getUpdatedAt = () => this.updatedAt || new Date()}

   __init9() {this.getQuestionById = (id) => this.questions.filter((q) => q.id === id)[0]}
   __init10() {this.deleteQuestionById = (id) => this.questions = this.questions.filter((q) => q.id !== id)}
   __init11() {this.updateQuestionById = (id, question) => this.questions = this.questions.map((q) => q.id === id ? question : q)}

   __init12() {this.setTitle = (title) => this.title = title}
   __init13() {this.setDescription = (description) => this.description = description}
   __init14() {this.setQuestions = (question) => this.questions.push(question)}
   __init15() {this.setNote = (note) => this.note = note}
   __init16() {this.setBulletinId = (bulletinId) => this.bulletinId = bulletinId}
}

exports.Evaluation = Evaluation;