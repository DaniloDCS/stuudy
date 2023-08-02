"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _uuid = require('uuid');












class TODO  {
  
  
  
  
  
  
  
  

  constructor({
    id,
    title,
    content,
    status,
    finishIn,
    concludedAt,
    createdAt,
    updatedAt,
  }) {;TODO.prototype.__init.call(this);TODO.prototype.__init2.call(this);TODO.prototype.__init3.call(this);TODO.prototype.__init4.call(this);TODO.prototype.__init5.call(this);TODO.prototype.__init6.call(this);TODO.prototype.__init7.call(this);TODO.prototype.__init8.call(this);TODO.prototype.__init9.call(this);TODO.prototype.__init10.call(this);TODO.prototype.__init11.call(this);TODO.prototype.__init12.call(this);TODO.prototype.__init13.call(this);
    this.id = id || _uuid.v4.call(void 0, );
    this.title = title;
    this.content = content;
    this.status = status || "pending";
    this.finishIn = finishIn || null;
    this.concludedAt = concludedAt || null;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

   __init() {this.getId = () => this.id || ""}
   __init2() {this.getTitle = () => this.title || ""}
   __init3() {this.getContent = () => this.content || ""}
   __init4() {this.getStatus = () => this.status || ""}
   __init5() {this.getFinishIn = () => this.finishIn || null}
   __init6() {this.getConcludedAt = () => this.concludedAt || null}
   __init7() {this.getCreatedAt = () => this.createdAt || new Date()}
   __init8() {this.getUpdatedAt = () => this.updatedAt || new Date()}

   __init9() {this.setTitle = (title) => this.title = title}
   __init10() {this.setContent = (content) => this.content = content}
   __init11() {this.setFinishIn = (finishIn) => this.finishIn = finishIn}
   __init12() {this.setStatus = (status) => this.status = status}
   __init13() {this.setConcludedAt = (concludedAt) => this.concludedAt = concludedAt}
}

exports.TODO = TODO;