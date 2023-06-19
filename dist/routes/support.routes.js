"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _App = require('../App'); var _App2 = _interopRequireDefault(_App);
var _authenticate = require('../database/authenticate');
var _connection = require('../database/connection');
var _Notify = require('../models/Notify');
var _Support = require('../models/Support');
var _User = require('../models/User');

class SupportRoutes {
  

  constructor() {
    this.router = _express.Router.call(void 0, );
    this.routes();
  }

   routes() {

    this.router.get('/', _authenticate.authenticate.call(void 0, ).auth, async (req, res) => {
      const user = new (0, _User.User)(_App2.default.get("user"));

      const { body, error } = await _connection.connection.from("Supports").select("*, user:userId(id, name, email, username, avatar), attending:attendingBy(id, name, username, avatar, email), concluded:concludedBy(id, name, username, avatar, email)").match({ userId: user.getId() });

      if (error) return res.status(404).json({ message: 'Usuário não encontrado' });

      return res.render('pages/supports', { title: 'Central de ajuda', user, supports: body });
    });

    this.router.post('/register', async (req, res) => {
      const { title, description } = req.body;
      const user = new (0, _User.User)(_App2.default.get("user"));

      if (!title || !description) return res.status(404).json({ message: 'Preencha todos os campos' });

      const support = new (0, _Support.Support)({ title, description, userId: user.getId() });

      const { body, error } = await _connection.connection.from("Supports").insert(support);

      if (error) return res.status(404).json({ message: 'Não foi possível criar o suporte', error });

      let adminsIDs = [];

      const { body: admins, error: errorAdmins } = await _connection.connection.from("Users").select("*").match({ admin: true });
      if (errorAdmins) return res.status(404).json({ message: 'Não foi possível enviar notificação para os admins', error: errorAdmins });

      adminsIDs = admins.map((admin) => admin.id);
      let random = Math.floor(Math.random() * adminsIDs.length);

      const accountUser = new (0, _User.User)(admins.filter((admin) => admin.id === adminsIDs[random])[0]);

      let notify = new (0, _Notify.Notify)({
        title: '<h3> Há uma nova solicitação de suporte! </h3>',
        content: `<p> Olá ${accountUser.getFirstName()}, ${user.getFirstName()} enviou uma solcitação de suporte!
        <br> <br> <a href="/admin/support/${support.getId()}"> Clique aqui para verificar </a>
        </p>`,
      })

      const { data: olds, error: errorOlds } = await _connection.connection.from("Notifies").select("*").match({ userId: accountUser.getId() });
      if (errorOlds) return res.status(500).json({ message: 'Erro ao selecionar notificações' });

      const oldNotifies = new (0, _Notify.Notifies)({ ...olds[0] });
      oldNotifies.setNotify(notify);

      const { error: errorUpdateNotify } = await _connection.connection.from("Notifies").update(oldNotifies).match({ userId: accountUser.getId() });
      if (errorUpdateNotify) return res.status(500).json({ message: 'Erro ao atualizar notificações' });

      return res.status(200).redirect('/support');
    });

    this.router.get('/:id', async (req, res) => {
      const { id } = req.params;
      const user = new (0, _User.User)(_App2.default.get("user"));

      const { body, error } = await _connection.connection.from("Supports").select("*, user:userId(id, name, email, username, avatar), attending:attendingBy(id, name, username, avatar, email), concluded:concludedBy(id, name, username, avatar, email)").match({ id }).limit(1);

      if (error) return res.status(404).json({ message: 'Suporte não encontrado' })

      const support = new (0, _Support.Support)(body[0]);
      support.readResponse();

      await _connection.connection.from("Supports").update(support).match({ id });

      return res.render('pages/support', { title: 'Central de ajuda', user, support: body[0] });
    });

    this.router.put('/reply/:id/', async (req, res) => {
      const { id } = req.params;
      const { reply } = req.body;
      const user = new (0, _User.User)(_App2.default.get('user'));

      const { body, error } = await _connection.connection.from("Supports").select("*, user:userId(*), attending:attendingBy(*), concluded:concludedBy(*)").match({ id }).limit(1);

      if (error) return res.status(404).json({ message: 'Suporte não encontrado' });

      const support = new (0, _Support.Support)(body[0]);
      support.setResponse(new (0, _Support.Response)({
        userId: user.getId(),
        response: reply
      }))

      const { error: errorUpdate } = await _connection.connection.from("Supports").update(support).match({ id });
      if (errorUpdate) return res.status(500).json({ message: 'Erro ao responder suporte' });

      const accountUser = new (0, _User.User)(body[0].attending);

      let notify = new (0, _Notify.Notify)({
        title: '<h3> Há uma nova mensagem no support! </h3>',
        content: `<p> Olá ${accountUser.getFirstName()}, ${user.getFirstName()} respondeu no suporte!
        <br> <br> <a href="/admin/support/${id}"> Clique aqui para verificar </a>
        </p>`,
      })

      const { data: olds, error: errorOlds } = await _connection.connection.from("Notifies").select("*").match({ userId: accountUser.getId() });
      if (errorOlds) return res.status(500).json({ message: 'Erro ao selecionar notificações' });

      const oldNotifies = new (0, _Notify.Notifies)({ ...olds[0] });
      oldNotifies.setNotify(notify);

      const { error: errorUpdateNotify } = await _connection.connection.from("Notifies").update(oldNotifies).match({ userId: accountUser.getId() });
      if (errorUpdateNotify) return res.status(500).json({ message: 'Erro ao atualizar notificações' });

      return res.status(200).json({ message: 'Suporte respondido com sucesso', status: 'success' });
    });
  }

}

exports. default = new SupportRoutes().router;