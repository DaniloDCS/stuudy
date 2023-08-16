"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var _express = require('express');
var _User = require('../models/User');
var _Notify = require('../models/Notify');
var _connection = require('../database/connection');
var _App = require('../App'); var _App2 = _interopRequireDefault(_App);

class AppsRoutes {
  

  constructor() {
    this.router = _express.Router.call(void 0, );
    this.routes();
  }

   routes() {
    this.router.get("/", async (req, res) => {
      const user = new (0, _User.User)(_App2.default.get("user"));

      const { data, error: erroNotifies } = await _connection.connection
        .from("Notifies")
        .select("*")
        .match({ userId: user.getId() });
      if (erroNotifies)
        return res.status(500).json({
          message: "Notificações não encontradas",
          error: erroNotifies,
        });

      const notifies = new (0, _Notify.Notifies)({
        userId: user.getId(),
        notifies:
          _optionalChain([data, 'access', _ => _[0], 'optionalAccess', _2 => _2.notifies, 'access', _3 => _3.map, 'call', _4 => _4((notify) => new (0, _Notify.Notify)(notify))]) || [],
      });

      const { data: courses, error: errorCourses } = await _connection.connection
        .from("Courses")
        .select("*")
        .match({ userId: user.getId() });
      if (errorCourses)
        return res
          .status(500)
          .json({ message: "Erro ao buscar cursos", error: errorCourses });

      const { data: supports, error: errorSupports } = await _connection.connection
        .from("Supports")
        .select("*")
        .match({ userId: user.getId() });
      if (errorSupports)
        return res
          .status(500)
          .json({ message: "Erro ao buscar suportes", error: errorSupports });

      const { data: friends, error: errorFriends } = await _connection.connection
        .from("Friends")
        .select(
          "id, recipient, sender, from:sender(id, name, username, email, avatar, accesses), to:recipient(id, name, username, email, avatar, accesses)"
        )
        .or(`recipient.eq.${user.getId()},and(sender.eq.${user.getId()})`)
        .order("updatedAt", { ascending: false });
      if (errorFriends)
        return res
          .status(500)
          .json({ message: "Erro ao buscar amigos", error: errorFriends });

      let todos = [];

      courses.forEach((course) => {
        course.periods.forEach((period) => {
          period.disciplines.forEach((discipline) => {
            discipline.TODOs.forEach((todo) => {
              todos.push({
                course: {
                  id: course.id,
                  title: course.name,
                  icon: course.icon,
                },
                period: {
                  id: period.id,
                  title: period.name,
                },
                discipline: {
                  id: discipline.id,
                  title: discipline.name,
                  icon: discipline.icon,
                },
                todo,
              });
            });
          });
        });
      });

      todos = todos.sort((a, b) => {
        if (a.todo.finishIn > b.todo.finishIn) return 1;
        if (a.todo.finishIn < b.todo.finishIn) return -1;
        return 0;
      });

      return res.render("pages/apps", {
        title: "Aplicativos",
        user,
        notifies,
        supports,
        friends,
        todos,
      });
    });

    this.router.get("/:option", async (req, res) => {
      const user = new (0, _User.User)(_App2.default.get("user"));

      const { data, error: erroNotifies } = await _connection.connection
        .from("Notifies")
        .select("*")
        .match({ userId: user.getId() });
      if (erroNotifies)
        return res.status(500).json({
          message: "Notificações não encontradas",
          error: erroNotifies,
        });

      const notifies = new (0, _Notify.Notifies)({
        userId: user.getId(),
        notifies:
          _optionalChain([data, 'access', _5 => _5[0], 'optionalAccess', _6 => _6.notifies, 'access', _7 => _7.map, 'call', _8 => _8((notify) => new (0, _Notify.Notify)(notify))]) || [],
      });

      const { data: courses, error: errorCourses } = await _connection.connection
        .from("Courses")
        .select("*")
        .match({ userId: user.getId() });
      if (errorCourses)
        return res
          .status(500)
          .json({ message: "Erro ao buscar cursos", error: errorCourses });

      const { data: supports, error: errorSupports } = await _connection.connection
        .from("Supports")
        .select("*")
        .match({ userId: user.getId() });
      if (errorSupports)
        return res
          .status(500)
          .json({ message: "Erro ao buscar suportes", error: errorSupports });

      const { data: friends, error: errorFriends } = await _connection.connection
        .from("Friends")
        .select(
          "id, recipient, sender, from:sender(id, name, username, email, avatar, accesses), to:recipient(id, name, username, email, avatar, accesses)"
        )
        .or(`recipient.eq.${user.getId()},and(sender.eq.${user.getId()})`)
        .order("updatedAt", { ascending: false });
      if (errorFriends)
        return res
          .status(500)
          .json({ message: "Erro ao buscar amigos", error: errorFriends });

      let todos = [];

      courses.forEach((course) => {
        course.periods.forEach((period) => {
          period.disciplines.forEach((discipline) => {
            discipline.TODOs.forEach((todo) => {
              todos.push({
                course: {
                  id: course.id,
                  title: course.name,
                  icon: course.icon,
                },
                period: {
                  id: period.id,
                  title: period.name,
                },
                discipline: {
                  id: discipline.id,
                  title: discipline.name,
                  icon: discipline.icon,
                },
                todo,
              });
            });
          });
        });
      });

      todos = todos.sort((a, b) => {
        if (a.todo.finishIn > b.todo.finishIn) return 1;
        if (a.todo.finishIn < b.todo.finishIn) return -1;
        return 0;
      });

      const option = req.params.option;

      return res.render(`apps/${option}`, {
        title: option,
        user,
        notifies,
        supports,
        friends,
        todos,
      });
    });

  }
}

exports. default = new AppsRoutes().router;
