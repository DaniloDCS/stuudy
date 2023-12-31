"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);
var _os = require('os'); var _os2 = _interopRequireDefault(_os);

var _express = require('express');
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _upload = require('../database/upload');
var _browserdetect = require('browser-detect'); var _browserdetect2 = _interopRequireDefault(_browserdetect);

var _authenticate = require('../database/authenticate');
const { uploadController } = _authenticate.authenticate.call(void 0, );

var _connection = require('../database/connection');
var _User = require('../models/User');
var _App = require('../App'); var _App2 = _interopRequireDefault(_App);
var _Notify = require('../models/Notify');

class AuthenticateRoutes {
  

  constructor() {
    this.router = _express.Router.call(void 0, );
    this.routes();
  }

   routes() {
    this.router.post('/signin', async (req, res) => {
      const { email, password } = req.body;
      let username = email;

      if (!email || !password) return res.redirect('/');

      if (email.startsWith('@')) {
        const { data: search, error: errorSearch } = await _connection.connection.from('Users').select('*').match({ username: email }).limit(1);
        if (errorSearch) return res.status(500).redirect('/');

        if (!search.length) return res.redirect('/');
        username = search[0].email;
      }

      const user = await _connection.connection.auth.signIn({ email: username, password });
      if (!user) return res.redirect('/');

      const { body, error } = await _connection.connection.from("Users").select("*").match({ userId: _optionalChain([user, 'access', _ => _.user, 'optionalAccess', _2 => _2.id]) }).limit(1);
      if (error) return res.status(500).json({ message: 'Usuário não encontrado', error });

      const userme = new (0, _User.User)(body[0]);
      userme.setAccesses(new (0, _User.Accesses)({
        date: new Date(),
        location: {
          country: req.ip,
          state: req.ip,
          city: req.ip,
          ip: req.socket.remoteAddress
        },
        browser: _browserdetect2.default.call(void 0, req.headers['user-agent']).name,
        machine: _os2.default.hostname() + ' - ' + _os2.default.platform() + ' - ' + _os2.default.arch() + ' - ' + _os2.default.release()
      }))

      _App2.default.set('user', userme);

      const { error: errorUpdate } = await _connection.connection.from('Users').update(userme).match({ id: userme.getId() });
      if (errorUpdate) return res.status(500).json({ message: 'Usuário não atualizado', error: errorUpdate });
      return res.redirect('/dashboard');
    });

    this.router.post('/signup', _multer2.default.call(void 0, _upload.upload.config).single('avatar'), uploadController, async (req, res) => {
      const { email, password, name, username, phone } = req.body;
      const file = req.file;

      if (!file) return res.status(500).json({ message: 'Imagem não encontrada', error: 'Error' });

      const { error, user } = await _connection.connection.auth.signUp({ email, password }, {
        data: {
          name,
          username,
          phone
        }
      });

      if (error) res.status(500).json({ message: 'Usuário não cadastrado!', error });

      const { user: login, error: errorLogin } = await _connection.connection.auth.signIn({ email, password });

      if (errorLogin) res.status(500).json({ message: 'Usuário não logado!', error: errorLogin });

      const { error: errorUpload, data: avatar } = await _connection.connection.storage.from('avatars').upload(`/avatar-${_optionalChain([user, 'optionalAccess', _3 => _3.id])}-${file.filename}`, _fs2.default.readFileSync(file.path), {
        cacheControl: '3600',
        upsert: false
      });

      _fs2.default.unlinkSync(file.path);

      if (errorUpload) return res.status(500).json({ message: 'Avatar não enviado!', error: errorUpload });

      const userme = new (0, _User.User)({
        userId: _optionalChain([user, 'optionalAccess', _4 => _4.id]) ,
        email,
        name,
        username,
        phone,
        avatar: `https://mbyavrokefpjmmtpdpnb.supabase.co/storage/v1/object/public/${_optionalChain([avatar, 'optionalAccess', _5 => _5.Key])}`,
        accesses: [
          new (0, _User.Accesses)({
            date: new Date(),
            location: {
              country: req.ip,
              state: req.ip,
              city: req.ip,
              ip: req.socket.remoteAddress
            },
            browser: _browserdetect2.default.call(void 0, req.headers['user-agent']).name,
            machine: _os2.default.hostname() + ' - ' + _os2.default.platform() + ' - ' + _os2.default.arch() + ' - ' + _os2.default.release()
          })
        ]
      });

      const { data: register, error: errorRegister } = await _connection.connection.from('Users').insert(userme);
      if (errorRegister) return res.status(500).json({ message: 'Usuário não cadastrado!', error: errorRegister });

      const notify = new (0, _Notify.Notifies)({
        userId: userme.getId(),
        notifies: [new (0, _Notify.Notify)({
          title: `<h3>Nossas boas vindas ao Stuudy!</h3>`,
          content: `<p>Olá ${userme.name}, <br> É ótimo saber saber que você se juntou à nossa equipe, isso me deixa muito feliz. Então, desejo boas vindas ao Stuudy! Desfrute de todo e mais um pouco e facililite sua vida academica! </p>`,
          by: `<a href="/u/@danilo" target="__blank">At.te Danilo Costa - Stuudy Developer</a>`,
        })]
      });

      const { data: registerNotify, error: errorRegisterNotify } = await _connection.connection.from('Notifies').upsert(notify);
      if (errorRegisterNotify) return res.status(500).json({ message: 'Notificações não cadastradas!', error: errorRegisterNotify });

      const { data: dataCreator, error: errorCreator } = await _connection.connection.from('Users').select('id').match({ username: '@danilo' });
      if (errorCreator) return res.status(500).json({ message: 'Criador não encontrado!', error: errorCreator });

      const creator = dataCreator[0].id;

      const newUser = new (0, _Notify.Notify)({
        title: `<h3>Um novo usuário acaba de se registrar!</h3>`,
        content: `<p>Olá Danilo, <br> ${userme.getName()} se cadastrou no Stuudy, então é bom você dar uma olhada nele! Aqui está o link: <a href="/u/${userme.getUsername()}">${userme.name}</a></p>`,
        by: `<a href="/u/@danilo" target="__blank">At.te Danilo Costa - Stuudy Developer</a>`
      })

      const { data: olds, error: errorOlds } = await _connection.connection.from('Notifies').select('notifies').match({ userId: creator });
      if (errorOlds) return res.status(500).json({ message: 'Notificações não encontradas!', error: errorOlds });

      const oldsNotifies = new (0, _Notify.Notifies)({ ...olds[0] });
      oldsNotifies.setNotify(newUser);

      const { data: registerNewUser, error: errorRegisterNewUser } = await _connection.connection.from('Notifies').update(oldsNotifies).match({ userId: creator });
      if (errorRegisterNewUser) return res.status(500).json({ message: 'Notificações não cadastradas!', error: errorRegisterNewUser });

      _App2.default.set('user', userme);

      return res.status(200).redirect('/dashboard');
    });

    this.router.get('/signout', async (req, res) => {
      req.session.destroy((err) => {
        if (err) return res.status(500).json({ error: err });
      });

      const user = new (0, _User.User)(_App2.default.get('user'));
      let lastAccess = user.accesses[user.accesses.length - 1];
      user.setExitAccesses(new (0, _User.Accesses)({ ...lastAccess }));

      const { error } = await _connection.connection.from('Users').update(user).match({ userId: user.userId });
      if (error) return res.status(500).json({ message: 'Usuário não atualizado', error });

      const exit = await _connection.connection.auth.signOut();
      if (exit) return res.status(200).redirect('/');
      else return res.status(500).json({ error: 'Error' });
    });

    this.router.put('/update', async (req, res) => {
      const { email, password } = req.body;
      const user = await _connection.connection.auth.update({ email, password });

      if (user) res.status(200).json({ message: 'Usuário atualizado com sucesso' });
      else res.status(500).json({ message: 'Usuário não atualizado!', error: 'Error' });
    });

    this.router.post('/forgot', async (req, res) => {
      const { email } = req.body;
      const user = await _connection.connection.auth.api.resetPasswordForEmail(email);

      if (user) res.status(200).json({ message: 'Usuário atualizado com sucesso' });
      else res.status(500).json({ message: 'Usuário não atualizado!', error: 'Error' });
    });

    this.router.delete('/delete', async (req, res) => {
      const { id } = req.body;
      const user = await _connection.connection.auth.api.deleteUser(id);

      if (user) res.status(200).json({ message: 'Usuário removido com sucesso' });
      else res.status(500).json({ message: 'Usuário não removido!', error: 'Error' });
    });
  }
}

exports. default = new AuthenticateRoutes().router;