"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var _express = require('express');
var _App = require('../App'); var _App2 = _interopRequireDefault(_App);
var _connection = require('../database/connection');
var _Notify = require('../models/Notify');
var _Support = require('../models/Support');
var _User = require('../models/User');

class AdminsRoutes {
  

  constructor() {
    this.router = _express.Router.call(void 0, );
    this.routes();
  }

   routes() {
    this.router.get('/', async (req, res) => {
      const user = new (0, _User.User)(_App2.default.get("user"));

      const { data: listOfUsers, error: errorUsers } = await _connection.connection.from('Users').select('*');
      if (errorUsers) return res.status(500).json({ message: 'Usuários não encontrados', error: errorUsers });

      const users = new (0, _User.Users)(listOfUsers.map((user) => new (0, _User.User)(user)));

      const { data: listOfSupports, error: errorSupports } = await _connection.connection.from('Supports').select('*, user:userId(*), attending:attendingBy(*), concluded:concludedBy(*)').limit(100);
      if (errorSupports) return res.status(500).json({ message: 'Suportes não encontrados', error: errorSupports });

      return res.render('admin/home', { title: 'Admin', user, users, supports: listOfSupports });
    });

    this.router.post('/send-all', async (req, res) => {
      const admin = new (0, _User.User)(_App2.default.get("user"));
      const { title, content } = req.body;

      const { data: listOfUsers, error: errorUsers } = await _connection.connection.from('Users').select('*');
      if (errorUsers) return res.status(500).json({ message: 'Usuários não encontrados', error: errorUsers });

      const users = new (0, _User.Users)(listOfUsers.map((user) => new (0, _User.User)(user)));

      const notify = new (0, _Notify.Notify)({
        title,
        content,
        by: `<a href="/u/${admin.getUsername()}" target="__blank">${admin.getUsername()} of team Stuudy</a>`,
        status: false,
      });

      users.getUsers().forEach(async (user) => {
        const { data: listOfNotifies, error: errorNotifies } = await _connection.connection.from('Notifies').select('*').match({ userId: user.getId() });
        if (errorNotifies) return res.status(500).json({ message: 'Notificações não encontradas', error: errorNotifies });

        const notifies = new (0, _Notify.Notifies)({
          userId: user.getId(),
          notifies: _optionalChain([listOfNotifies, 'access', _ => _[0], 'optionalAccess', _2 => _2.notifies, 'access', _3 => _3.map, 'call', _4 => _4((notify) => new (0, _Notify.Notify)(notify))]) || [],
        });

        notifies.setNotify(notify);

        const { data: update, error: errorUpdate } = await _connection.connection.from('Notifies').update(notifies).match({ userId: user.getId() });
        if (errorUpdate) return res.status(500).json({ message: 'Erro ao atualizar notificações', error: errorUpdate });
      });

      return res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
    });

    this.router.get('/users', async (req, res) => {
      const { body } = await _connection.connection.from("Users").select("*").limit(10) ;

      if (!body.length) return res.status(404).json({ message: 'Não há registros!' });

      const users = new (0, _User.Users)(body);

      return res.render('admin/users', { title: 'Administração', users });
    });

    this.router.put('/turn-admin/:id', async (req, res) => {
      const { id } = req.params;

      const { body } = await _connection.connection.from("Users").select("*").match({ id }).limit(1) ;

      if (!body.length) return res.status(404).json({ message: 'Usuário não encontrado' });

      const user = new (0, _User.User)(body[0]);
      user.setAdmin(!user.getAdmin());

      const { body: update, error } = await _connection.connection.from("Users").update(user).match({ id });

      if (error) return res.status(500).json({ message: 'Erro ao atualizar usuário', error });

      return res.status(200).json({ message: 'Usuário atualizado com sucesso!', status: 'success' });
    });

    this.router.get('/user/:username', async (req, res) => {
      const { username } = req.params;

      const { body } = await _connection.connection.from("Users").select("*").match({ username }).limit(1) ;

      if (!body.length) return res.status(404).json({ message: 'Usuário não encontrado' });

      const user = new (0, _User.User)(body[0]);

      return res.render('admin/user', { title: user.getUsername(), user });
    });

    this.router.get('/supports', async (req, res) => {
      const { body } = await _connection.connection.from("Supports").select("*").limit(100) ;

      if (!body.length) return res.status(404).json({ message: 'Não há registros!' });

      const supports = new (0, _Support.Supports)(body);

      return res.render('admin/supports', { title: 'Cenral de suporte', supports });
    });

    this.router.get('/support/:id', async (req, res) => {
      const { id } = req.params;
      const user = new (0, _User.User)(_App2.default.get('user'));

      const { body, error } = await _connection.connection.from("Supports").select('*, user:userId(id, name, email, username, avatar), attending:attendingBy(*), concluded:concludedBy(*)').match({ id }).limit(1);
      if (error) return res.status(404).json({ message: 'Suporte não encontrado' });

      const support = new (0, _Support.Support)(body[0]);
      support.readResponse();

      await _connection.connection.from("Supports").update(support).match({ id });

      return res.render('admin/support', { title: 'Central de ajuda', user, support: body[0] });
    });

    this.router.post('/support/:id/reply', async (req, res) => {
      const { id } = req.params;
      const { reply } = req.body;
      const user = new (0, _User.User)(_App2.default.get('user'));

      const { body, error } = await _connection.connection.from("Supports").select("*, user:userId(*), attending:attendingBy(*), concluded:concludedBy(*)").match({ id }).limit(1);

      if (error) return res.status(404).json({ message: 'Suporte não encontrado' });

      const support = new (0, _Support.Support)(body[0]);
      support.setResponse(new (0, _Support.Response)({
        userId: user.getId(),
        response: reply,
        author: 'support-team'
      }));

      const { error: errorUpdate } = await _connection.connection.from("Supports").update(support).match({ id });
      if (errorUpdate) return res.status(500).json({ message: 'Erro ao responder suporte' });

      const accountUser = new (0, _User.User)(body[0].user);

      let notify = new (0, _Notify.Notify)({
        title: '<h3> Há uma nova mensagem sobre seu suporte! </h3>',
        content: `<p> Olá ${accountUser.getFirstName()}, ${user.getFirstName()} respondeu seu suporte!
        <br> <br> <a href="/support/${id}"> Clique aqui para verificar </a>
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

    this.router.put('/finish/:id/', async (req, res) => {
      const { id } = req.params;
      const user = new (0, _User.User)(_App2.default.get('user'));

      const { body, error } = await _connection.connection.from("Supports").select("*, user:userId(*), attending:attendingBy(*), concluded:concludedBy(*)").match({ id }).limit(1);
      if (error) return res.status(404).json({ message: 'Suporte não encontrado' });

      const support = new (0, _Support.Support)(body[0]);
      support.finish(user.getId());

      const { error: errorUpdate } = await _connection.connection.from("Supports").update(support).match({ id });
      if (errorUpdate) return res.status(500).json({ message: 'Erro ao concluir suporte' });

      const accountUser = new (0, _User.User)(body[0].user);

      let notify = new (0, _Notify.Notify)({
        title: '<h3> Atualização: seu suporte foi atendido! </h3>',
        content: `<p> Olá ${accountUser.getFirstName()}, seu suporte foi concluído e finalizado!
        <br> <br> <a href="/support/${id}"> Clique aqui para verificar </a>
        </p>`,
      })

      const { data: olds, error: errorOlds } = await _connection.connection.from("Notifies").select("*").match({ userId: accountUser.getId() });
      if (errorOlds) return res.status(500).json({ message: 'Erro ao selecionar notificações' });

      const oldNotifies = new (0, _Notify.Notifies)({ ...olds[0] });
      oldNotifies.setNotify(notify);

      const { error: errorUpdateNotify } = await _connection.connection.from("Notifies").update(oldNotifies).match({ userId: accountUser.getId() });
      if (errorUpdateNotify) return res.status(500).json({ message: 'Erro ao atualizar notificações' });

      return res.status(200).json({ message: 'Suporte concluído com sucesso', status: 'success' });
    });

    this.router.put('/attending/:id', async (req, res) => {
      const { id } = req.params;
      const user = new (0, _User.User)(_App2.default.get('user'));

      const { body, error } = await _connection.connection.from("Supports").select("*, user:userId(*), attending:attendingBy(*), concluded:concludedBy(*)").match({ id }).limit(1);

      if (error) return res.status(404).json({ message: 'Suporte não encontrado' });

      const support = new (0, _Support.Support)(body[0]);
      support.attending(user.getId());


      const { body: update, error: errorUpdate } = await _connection.connection.from("Supports").update(support).match({ id });
      if (errorUpdate) return res.status(500).json({ message: 'Erro ao atualizar suporte' });

      const accountUser = new (0, _User.User)(body[0].user);

      let notify = new (0, _Notify.Notify)({
        title: '<h3> Atualização: seu suporte está sendo atendido </h3>',
        content: `<p> Olá ${accountUser.getFirstName()}, seu suporte está sendo atendido por um de nossos administradores.
        <br> <br> <a href="/support/${id}"> Clique aqui para acopanhar </a>
        </p>`,
      })

      const { data: olds, error: errorOlds } = await _connection.connection.from("Notifies").select("*").match({ userId: accountUser.getId() });
      if (errorOlds) return res.status(500).json({ message: 'Erro ao selecionar notificações' });

      const oldNotifies = new (0, _Notify.Notifies)({ ...olds[0] });
      oldNotifies.setNotify(notify);

      const { error: errorUpdateNotify } = await _connection.connection.from("Notifies").update(oldNotifies).match({ userId: accountUser.getId() });
      if (errorUpdateNotify) return res.status(500).json({ message: 'Erro ao enviar notificação' });

      return res.status(200).redirect('/admin/support' + id);
    });
  }
}

exports. default = new AdminsRoutes().router;