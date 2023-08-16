"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _App = require('../App'); var _App2 = _interopRequireDefault(_App);

var _connection = require('../database/connection');

var _User = require('../models/User');
var _Doc = require('../models/Doc');

class ActivityRoutes {
  

  constructor() {
    this.router = _express.Router.call(void 0, );
    this.routes();
  }

   routes() {
    this.router.get("/new", async (req, res) => {
      const user = new (0, _User.User)(_App2.default.get("user"));

      const doc = new (0, _Doc.Doc)({ userId: user.getId() });

      const { data, error } = await _connection.connection.from("Docs").insert(doc);

      _App2.default.set("doc", doc);

      return res.redirect(`/docs/doc`);
    });

    this.router.get("/", async (req, res) => {
      const user = new (0, _User.User)(_App2.default.get("user"));

      const { data, error } = await _connection.connection
        .from("Docs")
        .select("*")
        .match({ userId: user.getId() });

      return res.render("apps/docs", { title: 'Documents', docs: data, user });
    });

    this.router.get("/get/:id", async (req, res) => {
      const user = new (0, _User.User)(_App2.default.get("user")),
        id = req.params.id;

      const { data, error } = await _connection.connection
        .from("Docs")
        .select("*")
        .match({ userId: user.getId(), id });
      if (error) return res.redirect("/docs");

      const doc = new (0, _Doc.Doc)({
        id,
        userId: user.getId(),
        title: data[0].title,
        content: data[0].content,
      });

      _App2.default.set("doc", doc);

      return res.redirect(`/docs/doc`);
    });

    this.router.get("/doc", async (req, res) => {
      const user = new (0, _User.User)(_App2.default.get("user"));

      if (!_App2.default.get("doc") || !user) return res.redirect("/docs");

      const doc = new (0, _Doc.Doc)(_App2.default.get("doc"));

      return res.render("apps/doc", { title: doc.getTitle(), doc, user });
    });

    this.router.post("/update", async (req, res) => {
      const { id, title, content } = req.body;

      if (!id)
        return res.json({ message: "Dados inválidos" });

      const user = new (0, _User.User)(_App2.default.get("user"));

      const doc = new (0, _Doc.Doc)({ id, userId: user.getId(), title, content });

      const { data, error } = await _connection.connection.from("Docs").update(doc).match({ id });

      if (error)
        return res.json({
          status: "error",
          message: "Erro ao atualizar",
          error,
        });
      else
        _App2.default.set("doc", doc);
        return res.json({
          status: "success",
          message: "Atualizado com sucesso",
        });
    });

    this.router.get("/delete/:id", async (req, res) => {
      const { id } = req.params,
        user = new (0, _User.User)(_App2.default.get("user"));

      if (!id) return res.redirect("/docs");

      const { data, error } = await _connection.connection
        .from("Docs")
        .delete()
        .match({ id, userId: user.getId() });

      if (error)
        return res
          .status(400)
          .json({ status: "error", message: "Erro ao deletar", error });

      return res.redirect(`/docs`);
    });
  }
}

exports. default = new ActivityRoutes().router;
