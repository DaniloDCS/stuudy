"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _uuid = require('uuid');












class Admin  {
  
  
  
  
  
  
  
  

  constructor({ id, userId, actions, active, permissions, since, createdAt, updatedAt }) {;Admin.prototype.__init.call(this);Admin.prototype.__init2.call(this);Admin.prototype.__init3.call(this);Admin.prototype.__init4.call(this);Admin.prototype.__init5.call(this);Admin.prototype.__init6.call(this);Admin.prototype.__init7.call(this);Admin.prototype.__init8.call(this);Admin.prototype.__init9.call(this);Admin.prototype.__init10.call(this);Admin.prototype.__init11.call(this);Admin.prototype.__init12.call(this);Admin.prototype.__init13.call(this);Admin.prototype.__init14.call(this);
    this.id = id || _uuid.v4.call(void 0, );
    this.userId = userId;
    this.actions = actions || [];
    this.active = active || false;
    this.permissions = permissions || [];
    this.since = since || new Date();
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

   __init() {this.getId = () => this.id}

   __init2() {this.getUserId = () => this.userId}

   __init3() {this.getActions = () => this.actions}
   __init4() {this.setActions = (actions) => {
    this.actions = actions;
    this.setUpdatedAt();
  }}

   __init5() {this.getActive = () => this.active}
   __init6() {this.setActive = (active) => {
    this.active = active;
    this.setUpdatedAt();
  }}

   __init7() {this.getPermissions = () => this.permissions}
   __init8() {this.setPermission = (permissions) => {
    this.permissions ? this.permissions = [...this.permissions, ...permissions] : this.permissions = permissions;
    this.setUpdatedAt();
  }}
   __init9() {this.removePermission = (permission) => {
    this.permissions = this.permissions.filter((p) => p.getId() !== permission.getId());
    this.setUpdatedAt();
  }}

   __init10() {this.getSince = () => this.since}
   __init11() {this.setSince = (since) => {
    this.since = since;
    this.setUpdatedAt();
  }}

   __init12() {this.getCreatedAt = () => this.createdAt}

   __init13() {this.getUpdatedAt = () => this.updatedAt}
   __init14() {this.setUpdatedAt = () => { this.updatedAt = new Date(); }}
}









class Action {
  
  
  
  
  
  
  constructor({ id, name, date, url, dados }) {;Action.prototype.__init15.call(this);Action.prototype.__init16.call(this);Action.prototype.__init17.call(this);Action.prototype.__init18.call(this);Action.prototype.__init19.call(this);Action.prototype.__init20.call(this);Action.prototype.__init21.call(this);Action.prototype.__init22.call(this);Action.prototype.__init23.call(this);
    this.id = id || _uuid.v4.call(void 0, );
    this.name = name;
    this.date = date || new Date();
    this.url = url;
    this.dados = dados;
  }

   __init15() {this.getId = () => this.id}

   __init16() {this.getName = () => this.name}
   __init17() {this.setName = (name) => { this.name = name; }}

   __init18() {this.getDate = () => this.date || new Date()}
   __init19() {this.setDate = (date) => { this.date = date; }}

   __init20() {this.getUrl = () => this.url || ''}
   __init21() {this.setUrl = (url) => { this.url = url; }}

   __init22() {this.getDados = () => this.dados || ''}
   __init23() {this.setDados = (dados) => { this.dados = dados; }}
}







class Permission {
  
  
  

  constructor({ id, name, description }) {;Permission.prototype.__init24.call(this);Permission.prototype.__init25.call(this);Permission.prototype.__init26.call(this);Permission.prototype.__init27.call(this);Permission.prototype.__init28.call(this);
    this.id = id || _uuid.v4.call(void 0, );
    this.name = name;
    this.description = description;
  }

   __init24() {this.getId = () => this.id}

   __init25() {this.getName = () => this.name}
   __init26() {this.setName = (name) => { this.name = name; }}

   __init27() {this.getDescription = () => this.description}
   __init28() {this.setDescription = (description) => { this.description = description; }}
}

class Admins {
  

  constructor(admins) {;Admins.prototype.__init29.call(this);Admins.prototype.__init30.call(this);
    this.admins = admins;
  }

   __init29() {this.getAdmins = () => this.admins}

   __init30() {this.getAdmin = (id) => this.admins.find(admin => admin.getId() === id) || null}
}

exports.Admin = Admin; exports.Admins = Admins;