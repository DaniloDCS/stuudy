"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _App = require('../App'); var _App2 = _interopRequireDefault(_App);

var _connection = require('../database/connection');
var _Notify = require('../models/Notify');

var _User = require('../models/User');

class UserRoutes {
  

  constructor() {
    this.router = _express.Router.call(void 0, );
    this.routes();
  }

   routes() {
    this.router.post('/settings', async (req, res) => {
      const { file } = req;
      const { username, name, biography } = req.body;

      if (file) console.log(file);

      return res.render('pages/settings', { title: 'Settings' });
    });

    this.router.put('/notify/:id', async (req, res) => {
      const { id } = req.params;
      const user = new (0, _User.User)(_App2.default.get("user"));

      const { body } = await _connection.connection.from("Notifies").select("*").match({ userId: user.getId() }).limit(1) ;
      if (!body.length) return res.status(404).json({ message: 'Notificações não encontradas' });

      const notifies = new (0, _Notify.Notifies)(body[0]);
      notifies.readById(id);

      const { body: update, error } = await _connection.connection.from("Notifies").update(notifies).match({ userId: user.getId() });
      if (error) return res.status(500).json({ message: 'Erro ao atualizar notificações', error });

      return res.status(200).json({ message: 'Notificação atualizada com sucesso', status: 'success' });
    });
  }

}

exports. default = new UserRoutes().router;