"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _uuid = require('uuid');









class Question  {
  
  
  
  
  

  constructor({ id, title, content, value, type }) {
    this.id = id || _uuid.v4.call(void 0, );
    this.title = title;
    this.content = content;
    this.value = value;
    this.type = type;
  }
}

exports.Question = Question;