"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _uuid = require('uuid');
















class Support  {
  
  
  
  
  
   
  
  
  
  
  
  

  constructor({ id, userId, title, description, status, concludedBy, attendingBy, concludedAt, responses, count, createdAt, updatedAt }) {;Support.prototype.__init.call(this);Support.prototype.__init2.call(this);Support.prototype.__init3.call(this);Support.prototype.__init4.call(this);Support.prototype.__init5.call(this);Support.prototype.__init6.call(this);Support.prototype.__init7.call(this);Support.prototype.__init8.call(this);Support.prototype.__init9.call(this);Support.prototype.__init10.call(this);Support.prototype.__init11.call(this);Support.prototype.__init12.call(this);Support.prototype.__init13.call(this);Support.prototype.__init14.call(this);Support.prototype.__init15.call(this);Support.prototype.__init16.call(this);Support.prototype.__init17.call(this);Support.prototype.__init18.call(this);Support.prototype.__init19.call(this);
    this.id = id || _uuid.v4.call(void 0, );
    this.userId = userId;
    this.title = title;
    this.description = description;
    this.status = status || 'pending';
    this.concludedBy = concludedBy || null;
    this.attendingBy = attendingBy || null;
    this.concludedAt = concludedAt || null;
    this.responses = responses || [];
    this.count = count || null;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

   __init() {this.getId = () => this.id}

   __init2() {this.getUserId = () => this.userId}

   __init3() {this.getTitle = () => this.title}

   __init4() {this.getDescription = () => this.description}

   __init5() {this.getStatus = () => this.status}
   __init6() {this.setStatus = (status) => this.status = status}

   __init7() {this.getConcludedBy = () => this.concludedBy}
   __init8() {this.setConcludedBy = (concludedBy) => this.concludedBy = concludedBy}

   __init9() {this.finish = (concludedBy) => {
    this.concludedBy = concludedBy;
    this.concludedAt = new Date();
    this.status = 'concluded';
  }}

   __init10() {this.attending = (attendingBy) => {
    this.status = 'attending';
    this.attendingBy = attendingBy;
  }}
  
   __init11() {this.getConcludedAt = () => this.concludedAt}
   __init12() {this.setConcludedAt = (concludedAt) => this.concludedAt = concludedAt}

   __init13() {this.getAttendingBy = () => this.attendingBy}
   __init14() {this.setAttendingBy = (attendingBy) => this.attendingBy = attendingBy}

   __init15() {this.getResponse = () => this.responses}
   __init16() {this.setResponse = (response) => {
    this.responses.push(response);
  }}

   __init17() {this.readResponse = () => {
    this.responses = this.responses.map(response => {
      let res = new Response(response);
      if (res.getUserId() !== this.getUserId()) res.setRead(true);
      return res;
    });
  }}

   __init18() {this.getCreatedAt = () => this.createdAt}

   __init19() {this.getUpdatedAt = () => this.updatedAt} 
}










class Response  {
  
  
  
  
  
  
  
  constructor({ id = _uuid.v4.call(void 0, ), userId, response, date = new Date(), author = "user", read = false }) {;Response.prototype.__init20.call(this);Response.prototype.__init21.call(this);Response.prototype.__init22.call(this);Response.prototype.__init23.call(this);Response.prototype.__init24.call(this);Response.prototype.__init25.call(this);Response.prototype.__init26.call(this);
    this.id = id;
    this.userId = userId;
    this.response = response;
    this.date = date;
    this.author = author;
    this.read = read;
  }

   __init20() {this.getRead = () => this.read}

   __init21() {this.setRead = (read) => this.read = read}

   __init22() {this.getDate = () => this.date}

   __init23() {this.getId = () => this.id}

   __init24() {this.getUserId = () => this.userId}

   __init25() {this.getResponse = () => this.response}

   __init26() {this.getAuthor = () => this.author}
}

class Supports {
  

  constructor(supports) {;Supports.prototype.__init27.call(this);
    this.supports = supports;
  }

   __init27() {this.getSupports = () => this.supports}
}

exports.Support = Support; exports.Supports = Supports; exports.Response = Response;