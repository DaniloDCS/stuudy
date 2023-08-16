"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _uuid = require('uuid');











class Activity  {
  
  
  
  
  
  

  constructor({
    id,
    title,
    description,
    questions,
    createdAt,
    updatedAt,
  }) {;Activity.prototype.__init.call(this);Activity.prototype.__init2.call(this);Activity.prototype.__init3.call(this);Activity.prototype.__init4.call(this);Activity.prototype.__init5.call(this);Activity.prototype.__init6.call(this);Activity.prototype.__init7.call(this);Activity.prototype.__init8.call(this);Activity.prototype.__init9.call(this);Activity.prototype.__init10.call(this);Activity.prototype.__init11.call(this);Activity.prototype.__init12.call(this);
    this.id = id || _uuid.v4.call(void 0, );
    this.title = title;
    this.description = description;
    this.questions = questions || [];
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

   __init() {this.getId = () => this.id || ""}
   __init2() {this.getTitle = () => this.title || ""}
   __init3() {this.getDescription = () => this.description || ""}
   __init4() {this.getQuestions = () => this.questions || []}
   __init5() {this.getCreatedAt = () => this.createdAt || new Date()}
   __init6() {this.getUpdatedAt = () => this.updatedAt || new Date()}

   __init7() {this.getQuestionById = (id) =>
    this.questions.filter((q) => q.id === id)[0]}
   __init8() {this.deleteQuestionById = (id) =>
    (this.questions = this.questions.filter((q) => q.id !== id))}
   __init9() {this.updateQuestionById = (id, question) =>
    (this.questions = this.questions.map((q) =>
      q.id === id ? question : q
    ))}

   __init10() {this.setTitle = (title) => (this.title = title)}
   __init11() {this.setDescription = (description) =>
    (this.description = description)}
   __init12() {this.setQuestion = (question) => this.questions.push(question)}
}
exports.Activity = Activity;
