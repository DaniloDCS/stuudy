"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _uuid = require('uuid');















class Publish  {
  
  
  
  
  
  
  
  
  
  
  

  constructor({ id, title, content, status, by, reacts, comments, visible, dennunciations, createdAt, updatedAt }) {;Publish.prototype.__init.call(this);Publish.prototype.__init2.call(this);Publish.prototype.__init3.call(this);Publish.prototype.__init4.call(this);Publish.prototype.__init5.call(this);Publish.prototype.__init6.call(this);Publish.prototype.__init7.call(this);Publish.prototype.__init8.call(this);Publish.prototype.__init9.call(this);Publish.prototype.__init10.call(this);Publish.prototype.__init11.call(this);Publish.prototype.__init12.call(this);Publish.prototype.__init13.call(this);Publish.prototype.__init14.call(this);Publish.prototype.__init15.call(this);Publish.prototype.__init16.call(this);Publish.prototype.__init17.call(this);Publish.prototype.__init18.call(this);Publish.prototype.__init19.call(this);Publish.prototype.__init20.call(this);Publish.prototype.__init21.call(this);Publish.prototype.__init22.call(this);Publish.prototype.__init23.call(this);
    this.id = id || _uuid.v4.call(void 0, );
    this.title = title;
    this.content = content;
    this.status = status || false;
    this.by = by || '';
    this.reacts = reacts || [];
    this.comments = comments || [];
    this.visible = visible || true;
    this.dennunciations = dennunciations || [];
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

   __init() {this.getId = () => this.id}

   __init2() {this.getTitle = () => this.title}

   __init3() {this.getContent = () => this.content}

   __init4() {this.getStatus = () => this.status}
   __init5() {this.setStatus = (status) => this.status = status}
   __init6() {this.toggleStatus = () => {
    this.status = !this.status
    this.setUpdatedAt();
  }}

   __init7() {this.getBy = () => this.by}

   __init8() {this.getReacts = () => this.reacts}
   __init9() {this.setReacts = (reacts) => this.reacts = reacts}
   __init10() {this.addReact = (react)=> this.reacts.push(react)}
   __init11() {this.removeReact = (reactId) => {
    this.reacts = this.reacts.filter(react => react.id !== reactId);
  }}

   __init12() {this.getComments = () => this.comments}
   __init13() {this.setComments = (comments) => this.comments = comments}
   __init14() {this.addComment = (comment) => this.comments.push(comment)}
   __init15() {this.removeComment = (commentId) => {
    this.comments = this.comments.filter(comment => comment.id !== commentId);
  }}

   __init16() {this.getVisible = () => this.visible}
   __init17() {this.setVisible = (visible) => this.visible = visible}
   __init18() {this.toggleVisible = () => {
    this.visible = !this.visible
    this.setUpdatedAt();
  }}

   __init19() {this.getDennunciations = () => this.dennunciations}
   __init20() {this.setDennunciations = (dennunciations) => this.dennunciations = dennunciations}

   __init21() {this.getCreatedAt = () => this.createdAt}

   __init22() {this.getUpdatedAt = () => this.updatedAt}
   __init23() {this.setUpdatedAt = () => this.updatedAt = new Date()}
}








class Publications  {
  
  
  
  

  constructor({ userId, publishes, createdAt, updatedAt }) {;Publications.prototype.__init24.call(this);Publications.prototype.__init25.call(this);Publications.prototype.__init26.call(this);Publications.prototype.__init27.call(this);Publications.prototype.__init28.call(this);Publications.prototype.__init29.call(this);Publications.prototype.__init30.call(this);Publications.prototype.__init31.call(this);
    this.userId = userId;
    this.publishes = publishes || [];
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

   __init24() {this.getUserId = () => this.userId}

   __init25() {this.getPublishes = () => this.publishes}
   __init26() {this.setPublishes = (publishes) => this.publishes = publishes}
   __init27() {this.addPublish = (publish) => this.publishes.push(publish)}
   __init28() {this.removePublish = (publishId) => {
    this.publishes = this.publishes.filter(publish => publish.id !== publishId);
  }}

   __init29() {this.getCreatedAt = () => this.createdAt}

   __init30() {this.getUpdatedAt = () => this.updatedAt}
   __init31() {this.setUpdatedAt = () => this.updatedAt = new Date()}
}










class React  {
  
  
  
  
  

  constructor({ id, by, type, createdAt, updatedAt }) {;React.prototype.__init32.call(this);React.prototype.__init33.call(this);React.prototype.__init34.call(this);React.prototype.__init35.call(this);React.prototype.__init36.call(this);React.prototype.__init37.call(this);
    this.id = id || _uuid.v4.call(void 0, );
    this.by = by;
    this.type = type;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

   __init32() {this.getId = () => this.id}

   __init33() {this.getBy = () => this.by}

   __init34() {this.getType = () => this.type}

   __init35() {this.getCreatedAt = () => this.createdAt}

   __init36() {this.getUpdatedAt = () => this.updatedAt}
   __init37() {this.setUpdatedAt = () => this.updatedAt = new Date()}
}









class Comment  {
  
  
  
  
  

  constructor({ id, by, content, reacts, createdAt }) {;Comment.prototype.__init38.call(this);Comment.prototype.__init39.call(this);Comment.prototype.__init40.call(this);Comment.prototype.__init41.call(this);Comment.prototype.__init42.call(this);Comment.prototype.__init43.call(this);Comment.prototype.__init44.call(this);Comment.prototype.__init45.call(this);
    this.id = id || _uuid.v4.call(void 0, );
    this.by = by;
    this.content = content;
    this.reacts = reacts || [];
    this.createdAt = createdAt || new Date();
  }

   __init38() {this.getId = () => this.id}

   __init39() {this.getBy = () => this.by}

   __init40() {this.getContent = () => this.content}

   __init41() {this.getReacts = () => this.reacts}
   __init42() {this.setReacts = (reacts) => this.reacts = reacts}
   __init43() {this.addReact = (react) => this.reacts.push(react)}
   __init44() {this.removeReact = (reactId) => {
    this.reacts = this.reacts.filter(react => react.id !== reactId);
  }} 

   __init45() {this.getCreatedAt = () => this.createdAt}
}







class Dennunciation  {
  
  
  

  constructor({ id, by, createdAt }) {;Dennunciation.prototype.__init46.call(this);Dennunciation.prototype.__init47.call(this);Dennunciation.prototype.__init48.call(this);
    this.id = id || _uuid.v4.call(void 0, );
    this.by = by;
    this.createdAt = createdAt || new Date();
  }

   __init46() {this.getId = () => this.id}

   __init47() {this.getBy = () => this.by}

   __init48() {this.getCreatedAt = () => this.createdAt}
}

exports.Publish = Publish; exports.Publications = Publications; exports.React = React; exports.Comment = Comment; exports.Dennunciation = Dennunciation;
