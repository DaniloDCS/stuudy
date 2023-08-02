"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _uuid = require('uuid');













class Class  {
  
  
  
  
  
  
  
  
  

  constructor({
    id,
    title,
    content,
    quantity,
    date,
    IWasPresent,
    type,
    createdAt,
    updatedAt,
  }) {;Class.prototype.__init.call(this);Class.prototype.__init2.call(this);Class.prototype.__init3.call(this);Class.prototype.__init4.call(this);Class.prototype.__init5.call(this);Class.prototype.__init6.call(this);Class.prototype.__init7.call(this);Class.prototype.__init8.call(this);Class.prototype.__init9.call(this);Class.prototype.__init10.call(this);Class.prototype.__init11.call(this);Class.prototype.__init12.call(this);Class.prototype.__init13.call(this);
    this.id = id || _uuid.v4.call(void 0, );
    this.title = title;
    this.content = content;
    this.quantity = quantity;
    this.date = date;
    this.IWasPresent = IWasPresent || false;
    this.type = type || "class";
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

   __init() {this.getId = () => this.id || ""}
   __init2() {this.getTitle = () => this.title || ""}
   __init3() {this.getContent = () => this.content || ""}
   __init4() {this.getQuantity = () => this.quantity || 0}
   __init5() {this.getDate = () => this.date || new Date()}
   __init6() {this.getIWasPresent = () => this.IWasPresent || false}
   __init7() {this.getType = () => this.type || ""}

   __init8() {this.setTitle = (title) => (this.title = title)}
   __init9() {this.setContent = (content) => (this.content = content)}
   __init10() {this.setQuantity = (quantity) => (this.quantity = quantity)}
   __init11() {this.setDate = (date) => (this.date = date)}
   __init12() {this.setIWasPresent = (IWasPresent) =>
    (this.IWasPresent = IWasPresent)}
   __init13() {this.setType = (type) => (this.type = type)}
}

exports.Class = Class;