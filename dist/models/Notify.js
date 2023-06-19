"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _uuid = require('uuid');












class Notify  {
  
  
  
  
  
  
  
  

  constructor({ id, title, content, status, by, readAt, createdAt, updatedAt }) {;Notify.prototype.__init.call(this);Notify.prototype.__init2.call(this);Notify.prototype.__init3.call(this);Notify.prototype.__init4.call(this);Notify.prototype.__init5.call(this);Notify.prototype.__init6.call(this);Notify.prototype.__init7.call(this);Notify.prototype.__init8.call(this);Notify.prototype.__init9.call(this);Notify.prototype.__init10.call(this);Notify.prototype.__init11.call(this);Notify.prototype.__init12.call(this);
    this.id = id || _uuid.v4.call(void 0, );
    this.title = title;
    this.content = content;
    this.status = status || false;
    this.by = by || '';
    this.readAt = readAt || null;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

   __init() {this.getId = () => this.id}

   __init2() {this.getTitle = () => this.title}

   __init3() {this.getcontent = () => this.content}

   __init4() {this.getStatus = () => this.status}
   __init5() {this.setStatus = (status) => this.status = status}
   __init6() {this.toggleStatus = () => {
    this.status = !this.status
    this.setReadAt(new Date());
    this.setUpdatedAt();
  }}

   __init7() {this.getBy = () => this.by}

   __init8() {this.getReadAt = () => this.readAt}
   __init9() {this.setReadAt = (readAt) => this.readAt = readAt}
    
   __init10() {this.getCreatedAt = () => this.createdAt}

   __init11() {this.getUpdatedAt = () => this.updatedAt} 
   __init12() {this.setUpdatedAt = () => this.updatedAt = new Date()}
}









class Notifies  {
  
  
  
  
  

  constructor({ id, userId, notifies, createdAt, updatedAt }) {;Notifies.prototype.__init13.call(this);Notifies.prototype.__init14.call(this);Notifies.prototype.__init15.call(this);Notifies.prototype.__init16.call(this);
    this.id = id || _uuid.v4.call(void 0, );
    this.userId = userId;
    this.notifies = notifies || [];
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

   __init13() {this.getNotifies = () => this.notifies}

   setNotify(notify) {
    this.notifies.push(notify);
    this.notifies = this.notifies.sort((a, b) => {
      const notifyA = new Notify(a);
      const notifyB = new Notify(b);

      return new Date(notifyB.getCreatedAt()).getTime() - new Date(notifyA.getCreatedAt()).getTime();
    });
  }

   __init14() {this.readNotify = (id) => {
    this.notifies = this.notifies.map(notify => {
      const notification = new Notify(notify);
      if (notification.getId() === id) notification.toggleStatus();
      return notification;
    });
  }}

   __init15() {this.readAll = () => {
    this.notifies = this.notifies.map(notify => { 
      const notification = new Notify(notify);
      notification.toggleStatus() 
      return notification;
    });
  }}

   __init16() {this.readById = (id) => {
    this.notifies = this.notifies.map(notify => {
      const notification = new Notify(notify);
      if (notification.getId() === id) notification.toggleStatus();
      return notification;
    });
  }}

   getNotifyById(id) {
    return this.notifies.find(notify => new Notify(notify).getId() === id);
  }

   deleteNotifyById(id) {
    this.notifies = this.notifies.filter(notify => new Notify(notify).getId() !== id);
  }
}

exports.Notify = Notify; exports.Notifies = Notifies;