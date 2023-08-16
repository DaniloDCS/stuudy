"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _uuid = require('uuid');












class Work  {
  
  
  
  
  
  
  
  

  constructor({
    id,
    title,
    content,
    note,
    link,
    bulletinId,
    createdAt,
    updatedAt,
  }) {;Work.prototype.__init.call(this);Work.prototype.__init2.call(this);Work.prototype.__init3.call(this);Work.prototype.__init4.call(this);Work.prototype.__init5.call(this);Work.prototype.__init6.call(this);Work.prototype.__init7.call(this);Work.prototype.__init8.call(this);Work.prototype.__init9.call(this);Work.prototype.__init10.call(this);Work.prototype.__init11.call(this);Work.prototype.__init12.call(this);
    this.id = id || _uuid.v4.call(void 0, );
    this.title = title;
    this.content = content;
    this.link = link;
    this.note = note;
    this.bulletinId = bulletinId;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

   __init() {this.getId = () => this.id || ""}
   __init2() {this.getTitle = () => this.title || ""}
   __init3() {this.getContent = () => this.content || ""}
   __init4() {this.getLink = () => this.link || ""}
   __init5() {this.getNote = () => this.note || 0}
   __init6() {this.getCreatedAt = () => this.createdAt || new Date()}
   __init7() {this.getUpdatedAt = () => this.updatedAt || new Date()}

   __init8() {this.setTitle = (title) => this.title = title}
   __init9() {this.setContent = (content) => this.content = content}
   __init10() {this.setLink = (link) => this.link = link}
   __init11() {this.setNote = (note) => this.note = note}
   __init12() {this.setBulletinId = (bulletinId) => this.bulletinId = bulletinId}
}

exports.Work = Work;