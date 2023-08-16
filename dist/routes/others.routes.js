"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var _express = require('express');
var _App = require('../App'); var _App2 = _interopRequireDefault(_App);
var _authenticate = require('../database/authenticate');
var _connection = require('../database/connection');
var _Notify = require('../models/Notify');

var _User = require('../models/User');

class OthersRoutes {
  

  constructor() {
    this.router = _express.Router.call(void 0, );
    this.routes();
  }

   routes() {
    this.router.get("/", async (req, res) => {
      return res.render("authenticate", { title: "Acesse sua conta" });
    });

    this.router.get(
      "/dashboard",
      _authenticate.authenticate.call(void 0, ).auth,
      async (req, res) => {
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
          .select("id, recipient, sender, from:sender(id, name, username, email, avatar, accesses), to:recipient(id, name, username, email, avatar, accesses)").or(`recipient.eq.${user.getId()},and(sender.eq.${user.getId()})`).order("updatedAt", { ascending: false })
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

        return res.render("pages/dashboard", {
          title: "Área de trabalho",
          user,
          notifies,
          supports,
          friends,
          todos,
        });
      }
    );

    this.router.get(
      "/courses",
      _authenticate.authenticate.call(void 0, ).auth,
      async (req, res) => {
        const user = new (0, _User.User)(_App2.default.get("user"));

        const { data: courses, error } = await _connection.connection
          .from("Courses")
          .select("*")
          .match({ userId: user.getId() });

        return res.render("pages/courses", {
          title: "Cursos",
          user,
          courses,
        });
      }
    );

    this.router.get("/u/:username", async (req, res) => {
      const { username } = req.params;

      const { body } = (await _connection.connection
        .from("Users")
        .select("*")
        .match({ username })
        .limit(1)) ;

      if (!body.length)
        return res.status(404).json({ message: "Usuário não encontrado" });

      const user = new (0, _User.User)(body[0]);

      if (_App2.default.get("user")) {
        const me = new (0, _User.User)(_App2.default.get("user"));

        if (me.getId() === user.getId()) return res.redirect("/me");
      } else {
        return res.render("pages/user", {
          title: username,
          account: user,
          user: false,
          isMyFriend: "not authenticated",
        });
      }

      const me = new (0, _User.User)(_App2.default.get("user"));
      let isMyFriend = "not friends",
        relation = "";

      const { data: searchFriend, error: errorSearchFriend } = await _connection.connection
        .from("Friends")
        .select("id, from:sender(*), to:recipient(*)")
        .eq("recipient", user.getId())
        .eq("sender", me.getId());
      if (errorSearchFriend)
        return res
          .status(500)
          .json({ message: "Erro ao buscar amigos", errorSearchFriend });

      const { data: searchFriend2, error: errorSearchFriend2 } =
        await _connection.connection
          .from("Friends")
          .select("id, from:sender(*), to:recipient(*)")
          .eq("recipient", me.getId())
          .eq("sender", user.getId());
      if (errorSearchFriend2)
        return res
          .status(500)
          .json({ message: "Erro ao buscar amigos", errorSearchFriend2 });

      if (searchFriend.length > 0 || searchFriend2.length > 0) {
        isMyFriend = "friends";

        if (searchFriend.length > 0) relation = searchFriend[0].id;
        else if (searchFriend2.length > 0) relation = searchFriend2[0].id;
      } else if (searchFriend.length === 0 && searchFriend2.length === 0) {
        const { data: sendRequest, error: errorFriendRequest } =
          await _connection.connection
            .from("Solicitations")
            .select("*, from:senderId(*), to:recipientId(*)")
            .eq("recipientId", me.getId())
            .eq("senderId", user.getId());
        if (errorFriendRequest)
          return res.status(500).json({
            message: "Erro ao buscar solicitações de amizade",
            error: errorFriendRequest,
          });

        const { data: reciveRequest2, error: errorFriendRequest2 } =
          await _connection.connection
            .from("Solicitations")
            .select("*, from:senderId(*), to:recipientId(*)")
            .eq("recipientId", user.getId())
            .eq("senderId", me.getId());
        if (errorFriendRequest2)
          return res.status(500).json({
            message: "Erro ao buscar solicitações de amizade",
            error: errorFriendRequest,
          });

        if (sendRequest.length > 0) {
          isMyFriend = "friendship request received";
          relation = sendRequest[0].id;
        } else if (reciveRequest2.length > 0) {
          isMyFriend = "friendship request sent";
          relation = reciveRequest2[0].id;
        } else isMyFriend = "not friends";
      } else {
        isMyFriend = "not friends";
      }

      return res.render("pages/user", {
        title: username,
        account: user,
        user: me,
        relation,
        isMyFriend,
      });
    });

    this.router.get(
      "/me",
      _authenticate.authenticate.call(void 0, ).auth,
      async (req, res) => {
        const { username } = _App2.default.get("user");

        const { body } = (await _connection.connection
          .from("Users")
          .select("*")
          .match({ username })
          .limit(1)) ;

        if (!body.length)
          return res.status(404).json({ message: "Usuário não encontrado" });

        const user = new (0, _User.User)(body[0]);

        return res.render("pages/me", { title: "Meu perfil", user });
      }
    );

    this.router.get(
      "/chat",
      _authenticate.authenticate.call(void 0, ).auth,
      async (req, res) => {
        const user = new (0, _User.User)(_App2.default.get("user"));

        return res.render("pages/chat", { title: "Chat", user });
      }
    );
  }
}

exports. default = new OthersRoutes().router;
