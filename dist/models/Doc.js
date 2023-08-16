"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _uuid = require('uuid');










class Doc  {
  
  
  
  
  
  

  constructor({ id, userId, title, content, createdAt, updatedAt }) {;Doc.prototype.__init.call(this);Doc.prototype.__init2.call(this);Doc.prototype.__init3.call(this);Doc.prototype.__init4.call(this);Doc.prototype.__init5.call(this);Doc.prototype.__init6.call(this);Doc.prototype.__init7.call(this);Doc.prototype.__init8.call(this);
    this.id = id || _uuid.v4.call(void 0, );
    this.userId = userId;
    this.title = title || "Documento sem título";
    this.content = content || "";
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

   __init() {this.getId = () => this.id || ""}
   __init2() {this.getUserId = () => this.userId || ""}
   __init3() {this.getTitle = () => this.title || ""}
   __init4() {this.getContent = () => this.content || ""}
   __init5() {this.getCreatedAt = () => this.createdAt || new Date()}
   __init6() {this.getUpdatedAt = () => this.updatedAt || new Date()}

   __init7() {this.setTitle = (title) => (this.title = title)}
   __init8() {this.setContent = (content) => {
    this.content = content;
    this.updatedAt = new Date();
  }}
}
exports.Doc = Doc;
