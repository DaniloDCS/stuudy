"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var _uuid = require('uuid');


















class User  {
  
  
  
  
  
  
  
  
  
  
  
  
  
  

  constructor({ id, userId, avatar, username, name, birthday, biography, email, phone, admin, accesses, network, createdAt, updatedAt }) {;User.prototype.__init.call(this);User.prototype.__init2.call(this);User.prototype.__init3.call(this);User.prototype.__init4.call(this);User.prototype.__init5.call(this);User.prototype.__init6.call(this);User.prototype.__init7.call(this);User.prototype.__init8.call(this);User.prototype.__init9.call(this);User.prototype.__init10.call(this);User.prototype.__init11.call(this);User.prototype.__init12.call(this);User.prototype.__init13.call(this);User.prototype.__init14.call(this);User.prototype.__init15.call(this);User.prototype.__init16.call(this);User.prototype.__init17.call(this);User.prototype.__init18.call(this);User.prototype.__init19.call(this);User.prototype.__init20.call(this);User.prototype.__init21.call(this);User.prototype.__init22.call(this);User.prototype.__init23.call(this);User.prototype.__init24.call(this);User.prototype.__init25.call(this);User.prototype.__init26.call(this);User.prototype.__init27.call(this);User.prototype.__init28.call(this);User.prototype.__init29.call(this);
    this.id = id || _uuid.v4.call(void 0, );
    this.userId = userId;
    this.avatar = avatar || '/public/images/avatars/default.png';
    this.username = username;
    this.name = name;
    this.birthday = birthday || new Date('2000-01-01');
    this.biography = biography || 'Hello World!';
    this.email = email;
    this.phone = phone;
    this.admin = admin || false;
    this.accesses = accesses || [];
    this.network = network || [];
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

   __init() {this.getId = () => this.id}

   __init2() {this.getUserId = () => this.userId}

   __init3() {this.getUsername = () => this.username}
   __init4() {this.setUsername = (username) => {
    this.username = username;
    this.setUpdatedAt();
  }}

   __init5() {this.getAvatar = () => this.avatar}
   __init6() {this.setAvatar = (avatar) => {
    this.avatar = avatar;
    this.setUpdatedAt();
  }}

   __init7() {this.getName = () => this.name}
   __init8() {this.setName = (name) => {
    this.name = name;
    this.setUpdatedAt();
  }}

   __init9() {this.getBirthday = () => this.birthday}
   __init10() {this.setBirthday = (birthday) => {
    this.birthday = birthday;
    this.setUpdatedAt();
  }}

   __init11() {this.getBiography = () => this.biography}
   __init12() {this.setBiography = (biography) => {
    this.biography = biography;
    this.setUpdatedAt();
  }}

   __init13() {this.getEmail = () => this.email}
   __init14() {this.setEmail = (email) => {
    this.email = email;
    this.setUpdatedAt();
  }}

   __init15() {this.getPhone = () => this.phone}
   __init16() {this.setPhone = (phone) => {
    this.phone = phone;
    this.setUpdatedAt();
  }}

   __init17() {this.getAdmin = () => this.admin}
   __init18() {this.setAdmin = (admin) => {
    this.admin = admin;
    this.setUpdatedAt();
  }}

   __init19() {this.getAccesses = () => this.accesses}
   __init20() {this.setAccesses = (accesses) => {
    if (this.accesses.length > 9) this.accesses = this.accesses.slice(1, 10);
    if (accesses) this.accesses.push(accesses);
    this.setUpdatedAt();
  }}
   __init21() {this.setExitAccesses = (accesses) => {
    this.accesses = this.accesses.map((item) => {
      if (accesses && item.id === accesses.id) {
        item.exit = new Date();
        item.duration = item.calculateDuration();
      }
      return item;
    });

    this.setUpdatedAt();
  }}

   __init22() {this.getNetwork = () => this.network}
   __init23() {this.setNetwork = (network) => {
    this.network.push(network);
    this.setUpdatedAt();
  }}
   __init24() {this.removeNetwork = (network) => {
    this.network = this.network.filter((item) => item.id !== network.id);

    this.setUpdatedAt();
  }}

   __init25() {this.getCreatedAt = () => this.createdAt}

   __init26() {this.getUpdatedAt = () => this.updatedAt}
   __init27() {this.setUpdatedAt = () => {
    this.updatedAt = new Date();
  }}

   __init28() {this.getFirstName = () => this.name.split(' ')[0]}

   __init29() {this.update = (user) => {
    this.setAvatar(user.avatar || '/public/images/avatars/default.png');
    this.setUsername(user.username);
    this.setName(user.name);
    this.setBirthday(user.birthday || new Date('2000-01-01'));
    this.setBiography(user.biography || 'Hello World!');
    this.setEmail(user.email);
    this.setPhone(user.phone);
    this.setAdmin(user.admin || false);
  }}
}
















class Accesses  {
  
  
  





  
  
  
  

  constructor({ id, date, location, exit, machine, browser, duration }) {;Accesses.prototype.__init30.call(this);Accesses.prototype.__init31.call(this);
    this.id = id || _uuid.v4.call(void 0, );
    this.date = date || new Date();
    this.location = {
      country: _optionalChain([location, 'optionalAccess', _ => _.country]) || "undefined",
      state: _optionalChain([location, 'optionalAccess', _2 => _2.state]) || "undefined",
      city: _optionalChain([location, 'optionalAccess', _3 => _3.city]) || "undefined",
      ip: _optionalChain([location, 'optionalAccess', _4 => _4.ip]) || "undefined"
    }
    this.machine = machine || "undefined";
    this.browser = browser || "undefined";
    this.exit = exit || null;
    this.duration = this.calculateDuration();
  }

   __init30() {this.create = () => {
    return new Accesses({
      id: this.id,
      date: this.date,
      location: this.location,
      machine: this.machine,
      browser: this.browser,
      exit: this.exit,
      duration: this.duration
    });
  }}

   __init31() {this.calculateDuration = () => {
    if (!this.exit) return '0h 0min 0s';
    const duration = this.exit.getTime() - this.date.getTime();
    const hours = Math.floor(duration / 3600000);
    const minutes = Math.floor(duration / 60000);
    const seconds = ((duration % 60000) / 1000).toFixed(0);

    if (hours > 0) return `${hours}h ${minutes}min ${seconds}s`;
    if (minutes > 0) return `${minutes}min ${seconds}s`;
    return `${seconds}s`;
  }}
}

class Network {
  
  
  
  
  
  

  constructor({ id, url, visualization, visits, createdAt, updatedAt }) {;Network.prototype.__init32.call(this);Network.prototype.__init33.call(this);Network.prototype.__init34.call(this);Network.prototype.__init35.call(this);Network.prototype.__init36.call(this);Network.prototype.__init37.call(this);Network.prototype.__init38.call(this);Network.prototype.__init39.call(this);Network.prototype.__init40.call(this);Network.prototype.__init41.call(this);Network.prototype.__init42.call(this);
    this.id = id || _uuid.v4.call(void 0, );
    this.url = url;
    this.visualization = visualization || true;
    this.visits = visits || 0;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

   __init32() {this.create = () => {
    return new Network({
      id: this.id,
      url: this.url,
      visualization: this.visualization,
      visits: this.visits,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    });
  }}

   __init33() {this.getId = () => this.id}

   __init34() {this.getUrl = () => this.url}
   __init35() {this.setUrl = (url) => {
    this.url = url;
    this.setUpdatedAt();
  }}

   __init36() {this.getVisualization = () => this.visualization || true}
   __init37() {this.setVisualization = (visualization) => {
    this.visualization = visualization;
    this.setUpdatedAt();
  }}

   __init38() {this.getVisits = () => this.visits || 0}
   __init39() {this.setVisits = () => {
    this.visits = this.getVisits() + 1;
    this.setUpdatedAt();
  }}

   __init40() {this.getCreatedAt = () => this.createdAt}

   __init41() {this.getUpdatedAt = () => this.updatedAt}
   __init42() {this.setUpdatedAt = () => {
    this.updatedAt = new Date();
  }}
}

class Users {
  

  constructor(users) {;Users.prototype.__init43.call(this);Users.prototype.__init44.call(this);Users.prototype.__init45.call(this);Users.prototype.__init46.call(this);Users.prototype.__init47.call(this);
    this.users = users;
  }

   __init43() {this.getUsers = () => this.users}

   __init44() {this.getUser = (id) => this.users.find(user => user.getId() === id) || null}

   __init45() {this.getUserByUsername = (username) => this.users.find(user => user.getUsername() === username) || null}

   __init46() {this.getUserByEmail = (email) => this.users.find(user => user.getEmail() === email) || null}

   __init47() {this.getUserByPhone = (phone) => this.users.find(user => user.getPhone() === phone) || null}

}

exports.User = User; exports.Users = Users; exports.Accesses = Accesses;