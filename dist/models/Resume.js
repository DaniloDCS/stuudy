"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _uuid = require('uuid');









class Resume  {
  
  
  
  
  

  constructor({ id, title, content, createdAt, updatedAt }) {;Resume.prototype.__init.call(this);Resume.prototype.__init2.call(this);Resume.prototype.__init3.call(this);Resume.prototype.__init4.call(this);Resume.prototype.__init5.call(this);Resume.prototype.__init6.call(this);Resume.prototype.__init7.call(this);
    this.id = id || _uuid.v4.call(void 0, );
    this.title = title;
    this.content = content;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

   __init() {this.getId = () => this.id || ""}
   __init2() {this.getTitle = () => this.title || ""}
   __init3() {this.getContent = () => this.content || ""}
   __init4() {this.getCreatedAt = () => this.createdAt || new Date()}
   __init5() {this.getUpdatedAt = () => this.updatedAt || new Date()}

   __init6() {this.setTitle = (title) => (this.title = title)}
   __init7() {this.setContent = (content) => (this.content = content)}
}

exports.Resume = Resume;