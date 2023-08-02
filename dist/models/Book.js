"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _uuid = require('uuid');









class Book  {
  
  
  
  
  

  constructor({ id, title, link, createdAt, updatedAt }) {;Book.prototype.__init.call(this);Book.prototype.__init2.call(this);Book.prototype.__init3.call(this);Book.prototype.__init4.call(this);Book.prototype.__init5.call(this);Book.prototype.__init6.call(this);Book.prototype.__init7.call(this);Book.prototype.__init8.call(this);
    this.id = id || _uuid.v4.call(void 0, );
    this.title = title;
    this.link = link;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

   __init() {this.getId = () => this.id || ""}
   __init2() {this.getTitle = () => this.title || ""}
   __init3() {this.getLink = () => this.link || ""}
   __init4() {this.getCreatedAt = () => this.createdAt || new Date()}
   __init5() {this.getUpdatedAt = () => this.updatedAt || new Date()}

   __init6() {this.setTitle = (title) => (this.title = title)}
   __init7() {this.setLink = (link) => (this.link = link)}
   __init8() {this.setUpdatedAt = () => (this.updatedAt = new Date())}
}

exports.Book = Book;