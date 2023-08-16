"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _uuid = require('uuid');












class Friend  {
  
  
  
  
  
  
  
  

  constructor({ id, recipient, sender, messages, senderIsBlocked, recipientIsBlocked, createdAt, updatedAt }) {;Friend.prototype.__init.call(this);Friend.prototype.__init2.call(this);Friend.prototype.__init3.call(this);Friend.prototype.__init4.call(this);Friend.prototype.__init5.call(this);Friend.prototype.__init6.call(this);Friend.prototype.__init7.call(this);Friend.prototype.__init8.call(this);Friend.prototype.__init9.call(this);Friend.prototype.__init10.call(this);Friend.prototype.__init11.call(this);Friend.prototype.__init12.call(this);Friend.prototype.__init13.call(this);Friend.prototype.__init14.call(this);Friend.prototype.__init15.call(this);Friend.prototype.__init16.call(this);
    this.id = id || _uuid.v4.call(void 0, );
    this.recipient = recipient;
    this.sender = sender;
    this.messages = messages || [];
    this.senderIsBlocked = senderIsBlocked || false;
    this.recipientIsBlocked = recipientIsBlocked || false;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

   __init() {this.getId = () => this.id}

   __init2() {this.getRecipient = () => this.recipient}

   __init3() {this.getSender = () => this.sender}

   __init4() {this.getMessages = () => this.messages}
   __init5() {this.setMessage = (message) => this.messages = [...this.messages, message]}

   __init6() {this.readMessages = (myId) => {
    this.messages = this.messages.map((message) => {
      let newMessage = new Message(message);
      if (newMessage.getSendBy() !== myId) newMessage.toggleRead();
      return newMessage;
    });

    this.setUpdatedAt();
  }}

   __init7() {this.removeReact = (react) => {
    this.messages = this.messages.map((message) => {
      let newMessage = new Message(message);
      let newRect = new React(react);
      if (newMessage.getSendBy() !== this.getRecipient()) newMessage.removeReact(newRect.getId());
      return newMessage;
    });
  }}

   __init8() {this.getSenderIsBlocked = () => this.senderIsBlocked}
   __init9() {this.setSenderIsBlocked = (senderIsBlocked) => this.senderIsBlocked = senderIsBlocked}
   __init10() {this.toggleSenderIsBlocked = () => {
    this.senderIsBlocked = !this.senderIsBlocked;
    this.setUpdatedAt();
  }}

   __init11() {this.getRecipientIsBlocked = () => this.recipientIsBlocked}
   __init12() {this.setRecipientIsBlocked = (recipientIsBlocked) => this.recipientIsBlocked = recipientIsBlocked}
   __init13() {this.toggleRecipientIsBlocked = () => {
    this.recipientIsBlocked = !this.recipientIsBlocked;
    this.setUpdatedAt();
  }}

   __init14() {this.getCreatedAt = () => this.createdAt}

   __init15() {this.getUpdatedAt = () => this.updatedAt}
   __init16() {this.setUpdatedAt = () => this.updatedAt = new Date()}
}












class Message  {
  
  
  
  
  
  
  
  

  constructor({ id, sendBy, content, read, readAt, reacts, createdAt, updatedAt }) {;Message.prototype.__init17.call(this);Message.prototype.__init18.call(this);Message.prototype.__init19.call(this);Message.prototype.__init20.call(this);Message.prototype.__init21.call(this);Message.prototype.__init22.call(this);Message.prototype.__init23.call(this);Message.prototype.__init24.call(this);Message.prototype.__init25.call(this);Message.prototype.__init26.call(this);Message.prototype.__init27.call(this);Message.prototype.__init28.call(this);Message.prototype.__init29.call(this);Message.prototype.__init30.call(this);Message.prototype.__init31.call(this);
    this.id = id || _uuid.v4.call(void 0, );
    this.sendBy = sendBy;
    this.content = content;
    this.read = read || false;
    this.readAt = readAt || null;
    this.reacts = reacts || [];
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

   __init17() {this.getId = () => this.id}

   __init18() {this.getSendBy = () => this.sendBy}

   __init19() {this.getContent = () => this.content}
   __init20() {this.setContent = (content) => this.content = content}

   __init21() {this.getRead = () => this.read}
   __init22() {this.setRead = (read) => this.read = read}
   __init23() {this.toggleRead = () => {
    this.read = !this.read;
    this.setReadAt(new Date());
    this.setUpdatedAt();
  }}

   __init24() {this.getReadAt = () => this.readAt}
   __init25() {this.setReadAt = (readAt) => this.readAt = readAt}

   __init26() {this.getReacts = () => this.reacts}
   __init27() {this.setReact = (react) => this.reacts.push(react)}
   __init28() {this.removeReact = (reactId) => this.reacts = this.reacts.filter(react => react.getId() !== reactId)}

   __init29() {this.getCreatedAt = () => this.createdAt}

   __init30() {this.getUpdatedAt = () => this.updatedAt}
   __init31() {this.setUpdatedAt = () => this.updatedAt = new Date()}
}









class React  {
  
  
  
  
  

  constructor({ id, sendBy, content, createdAt, updatedAt }) {;React.prototype.__init32.call(this);React.prototype.__init33.call(this);React.prototype.__init34.call(this);React.prototype.__init35.call(this);React.prototype.__init36.call(this);React.prototype.__init37.call(this);React.prototype.__init38.call(this);
    this.id = id || _uuid.v4.call(void 0, );
    this.sendBy = sendBy;
    this.content = content;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

   __init32() {this.getId = () => this.id}

   __init33() {this.getSendBy = () => this.sendBy}

   __init34() {this.getContent = () => this.content}
   __init35() {this.setContent = (content) => this.content = content}

   __init36() {this.getCreatedAt = () => this.createdAt}

   __init37() {this.getUpdatedAt = () => this.updatedAt}
   __init38() {this.setUpdatedAt = () => this.updatedAt = new Date()}
}










class FriendSolictation  {
  
  
  
  
  
  

  constructor({ id, senderId, recipientId, accepted, createdAt, updatedAt }) {;FriendSolictation.prototype.__init39.call(this);FriendSolictation.prototype.__init40.call(this);FriendSolictation.prototype.__init41.call(this);FriendSolictation.prototype.__init42.call(this);FriendSolictation.prototype.__init43.call(this);FriendSolictation.prototype.__init44.call(this);FriendSolictation.prototype.__init45.call(this);FriendSolictation.prototype.__init46.call(this);FriendSolictation.prototype.__init47.call(this);
    this.id = id || _uuid.v4.call(void 0, );
    this.senderId = senderId;
    this.recipientId = recipientId;
    this.accepted = accepted || false;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }

   __init39() {this.getId = () => this.id}

   __init40() {this.getSenderId = () => this.senderId}

   __init41() {this.getRecipientId = () => this.recipientId}

   __init42() {this.getAccepted = () => this.accepted}
   __init43() {this.setAccepted = (accepted) => this.accepted = accepted}
   __init44() {this.toggleAccepted = () => {
    this.accepted = !this.accepted;
    this.setUpdatedAt();
  }}

   __init45() {this.getCreatedAt = () => this.createdAt}

   __init46() {this.getUpdatedAt = () => this.updatedAt}
   __init47() {this.setUpdatedAt = () => this.updatedAt = new Date()}
}

exports.Friend = Friend; exports.Message = Message; exports.React = React; exports.FriendSolictation = FriendSolictation;
