"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _App = require('../App'); var _App2 = _interopRequireDefault(_App);

var _connection = require('../database/connection');
var _Notify = require('../models/Notify');
var _Friend = require('../models/Friend');
var _User = require('../models/User');

class FriendsRoutes {
  

  constructor() {
    this.router = _express.Router.call(void 0, );
    this.routes();
  }

   routes() {
    this.router.get('/', async (req, res) => {
      const user = new (0, _User.User)(_App2.default.get("user"));

      const { data: friends, error: errorFriends } = await _connection.connection.from("Friends").select("id, messages, from:sender(*), to:recipient(*)").or(`recipient.eq.${user.getId()},and(sender.eq.${user.getId()})`).order("updatedAt", { ascending: false });
      if (errorFriends) return res.status(500).json({ message: 'Erro ao buscar amigos', errorFriends, status: 500 });

      const { data: sends, error: errorSends } = await _connection.connection.from("Solicitations").select("id, from:senderId(*), to:recipientId(*)").eq("senderId", user.getId());
      if (errorSends) return res.status(500).json({ message: 'Erro ao buscar amigos', errorSends });

      const { data: reicived, error: errorReicived } = await _connection.connection.from("Solicitations").select("id, from:senderId(*), to:recipientId(*)").eq("recipientId", user.getId());
      if (errorReicived) return res.status(500).json({ message: 'Erro ao buscar amigos', errorReicived });

      return res.render('pages/friends', { title: 'Seus amigos', user, friends, sends, reicived });
    });

    this.router.post('/send/solicitation/:id', async (req, res) => {
      const { id } = req.params;
      const user = new (0, _User.User)(_App2.default.get("user"));

      let { body: findAccount, error: errorFindAccount } = await _connection.connection.from('Users').select('*').match({ id }) ;
      if (errorFindAccount) return res.status(500).json({ message: 'Erro ao enviar solicitação', error: errorFindAccount, status: 500 });

      const account = new (0, _User.User)(findAccount[0]);

      let solicitation = new (0, _Friend.FriendSolictation)({
        senderId: user.getId(),
        recipientId: account.getId(),
      });

      let { data: dataSolicitation, error: errorSolicitation } = await _connection.connection.from('Solicitations').insert(solicitation);
      if (errorSolicitation) return res.status(500).json({ message: 'Erro ao enviar solicitação', error: errorSolicitation, status: 500 });

      let notify = new (0, _Notify.Notify)({
        title: '<h3>Novo pedido de amizade de ' + user.getName() + '</h3>',
        content: `<p> Olá, ${account.getFirstName()}, ${user.getName()} enviou um pedido de amizade para você! <br> <a href="/friends/solicitation/accept/${user.getId()}/${solicitation.getId()}">Aceitar</a> | <a href="/friends/solicitation/deny/${user.getId()}/${solicitation.getId()}">Recusar</a></p>`,
      });
      
      let { data: olds, error: errorOlds } = await _connection.connection.from('Notifies').select('*').match({ userId: account.getId() }) ;
      if (errorOlds) return res.status(500).json({ message: 'Erro ao enviar solicitação', error: errorOlds, status: 500 });

      let notifies = new (0, _Notify.Notifies)(olds[0]);
      notifies.setNotify(notify);

      let { data: dataNotify, error: errorNotify } = await _connection.connection.from('Notifies').update(notifies).match({ userId: account.getId() });
      if (errorNotify) return res.status(500).json({ message: 'Erro ao enviar solicitação', error: errorNotify, status: 500 });

      return res.status(200).json({ message: 'Solicitação enviada', status: 200 });
    });

    this.router.put('/solicitation/:option/:solicitationId', async (req, res) => {
      const { option, solicitationId } = req.params;
      const user = new (0, _User.User)(_App2.default.get("user"));

      let { body: findSolicitation, error: errorFindSolicitation } = await _connection.connection.from('Solicitations').select('*, recipient:recipientId(*), sender:senderId(*)').match({ id: solicitationId }) ;
      if (errorFindSolicitation) return res.status(500).json({ message: 'Erro ao responder a solicitação', error: errorFindSolicitation, status: 500 });

      const solicitation = new (0, _Friend.FriendSolictation)(findSolicitation[0]);

      let { data: dataSolicitation, error: errorSolicitation } = await _connection.connection.from('Solicitations').delete().match({ id: solicitationId });
      if (errorSolicitation) return res.status(500).json({ message: 'Erro ao responder a solicitação', error: errorSolicitation, status: 500 });
      
      if (option === 'cancel' || option === 'refuse') return res.status(200).json({ message: 'Solicitação recusada', status: 200 });

      let friend = new (0, _Friend.Friend)({
        recipient: solicitation.getRecipientId(),
        sender: solicitation.getSenderId(),
      });

      let { data: dataFriend, error: errorFriend } = await _connection.connection.from('Friends').insert(friend);
      if (errorFriend) return res.status(500).json({ message: 'Erro ao responder a solicitação', error: errorFriend, status: 500 });

      let account = solicitation.getRecipientId() === user.getId() ? new (0, _User.User)(findSolicitation[0].sender) : new (0, _User.User)(findSolicitation[0].recipient);

      let notify = new (0, _Notify.Notify)({
        title: '<h3> ' + user.getFirstName() + ' aceitou seu pedido de amizade</h3>',
        content: `<p> Olá, ${account.getFirstName()}, ${user.getFirstName()} aceitou seu pedido de amizade!`,
      });

      let { data: olds, error: errorOlds } = await _connection.connection.from('Notifies').select('*').match({ userId: account.getId() }) ;
      if (errorOlds) return res.status(500).json({ message: 'Erro ao enviar notificação', error: errorOlds, status: 500 });

      let notifies = new (0, _Notify.Notifies)(olds[0]);
      notifies.setNotify(notify);

      let { data: dataNotify, error: errorNotify } = await _connection.connection.from('Notifies').update(notifies).match({ userId: account.getId() });
      if (errorNotify) return res.status(500).json({ message: 'Erro ao enviar notificação', error: errorNotify, status: 500 });
      
      return res.status(200).json({ message: 'Solicitação responsida', status: 200, user });
    });  

    this.router.get('/friend/bloq/:id', async (req, res) => {
      const { id } = req.params;
      const user = new (0, _User.User)(_App2.default.get("user"));

      return res.status(200).json({ message: 'Esta função ainda não foi implementada!', status: 200 });
    });

    this.router.get('/chat/:id', async (req, res) => {
      const { id } = req.params;
      const user = new (0, _User.User)(_App2.default.get("user"));

      const { data: chat, error: errorChat } = await _connection.connection.from("Friends").select("*, from:sender(*), to:recipient(*)").match({ id }) ;
      if (errorChat) return res.status(500).json({ message: 'Erro ao buscar chat', errorChat, status: 500 });

      const friends = new (0, _Friend.Friend)({
        id: chat[0].id,
        recipient: chat[0].recipient,
        sender: chat[0].sender,
        messages: chat[0].messages,
        senderIsBlocked: chat[0].senderIsBlocked,
        recipientIsBlocked: chat[0].recipientIsBlocked,
        createdAt: chat[0].createdAt,
        updatedAt: chat[0].updatedAt
      });

      friends.readMessages(user.getId());

      await _connection.connection.from("Friends").update(friends).match({ id });

      return res.render('pages/chat', { title: 'Chat', user, chat });
    });   

    this.router.post('/send/message/:id', async (req, res) => {
      const { id } = req.params;
      const { content } = req.body;
      const user = new (0, _User.User)(_App2.default.get("user"));

      const { data: chatSearch, error: errorChat } = await _connection.connection.from("Friends").select("*").match({ id }) ;
      if (errorChat) return res.status(500).json({ message: 'Erro ao buscar chat', errorChat, status: 500 });

      let message = new (0, _Friend.Message)({
        content: content,
        sendBy: user.getId()
      });

      let chat = new (0, _Friend.Friend)(chatSearch[0]);
      chat.setMessage(message);

      const { data: chatUpdate, error: errorChatUpdate } = await _connection.connection.from("Friends").update(chat).match({ id });
      if (errorChatUpdate) return res.status(500).json({ message: 'Erro ao enviar mensagem', errorChatUpdate, status: 500 });
      
      return res.status(200).json({ message: 'Mensagem enviada', status: 200 });
    });
  }
}

exports. default = new FriendsRoutes().router;