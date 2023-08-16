"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _uuid = require('uuid');











class Bulletin  {
  
  
  
  
  
  
  

  constructor({
    id,
    title,
    value,
    weight,
    type,
    createdAt,
    updatedAt,
  }) {
    this.id = id || _uuid.v4.call(void 0, );
    this.title = title;
    this.value = value;
    this.weight = weight;
    this.type = type;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }
}

exports.Bulletin = Bulletin;