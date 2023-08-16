"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _uuid = require('uuid');











class Reminder  {
  
  
  
  
  
  
  

  constructor({
    id,
    title,
    content,
    status,
    concludedAt,
    createdAt,
    updatedAt,
  }) {;Reminder.prototype.__init.call(this);Reminder.prototype.__init2.call(this);Reminder.prototype.__init3.call(this);Reminder.prototype.__init4.call(this);Reminder.prototype.__init5.call(this);Reminder.prototype.__init6.call(this);Reminder.prototype.__init7.call(this);Reminder.prototype.__init8.call(this);Reminder.prototype.__init9.call(this);Reminder.prototype.__init10.call(this);Reminder.prototype.__init11.call(this);
    this.id = id || _uuid.v4.call(void 0, );
    this.title = title;
    this.content = content;
    this.status = status || "pending";
    this.concludedAt = concludedAt || null;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

   __init() {this.getId = () => this.id || ""}
   __init2() {this.getTitle = () => this.title || ""}
   __init3() {this.getContent = () => this.content || ""}
   __init4() {this.getStatus = () => this.status || ""}
   __init5() {this.getConcludedAt = () => this.concludedAt || null}
   __init6() {this.getCreatedAt = () => this.createdAt || new Date()}
   __init7() {this.getUpdatedAt = () => this.updatedAt || new Date()}

   __init8() {this.setTitle = (title) => (this.title = title)}
   __init9() {this.setContent = (content) => (this.content = content)}
   __init10() {this.setStatus = (status) => (this.status = status)}
   __init11() {this.setConcludedAt = (concludedAt) =>
    (this.concludedAt = concludedAt)}
}

exports.Reminder = Reminder;
