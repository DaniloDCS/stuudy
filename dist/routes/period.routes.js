"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _App = require('../App'); var _App2 = _interopRequireDefault(_App);
var _connection = require('../database/connection');
var _Course = require('../models/Course');
var _Period = require('../models/Period');
var _User = require('../models/User');

class PeriodRoutes {
  

  constructor() {
    this.router = _express.Router.call(void 0, );
    this.routes();
  }

   routes() {
    this.router.get("/p/:id", async (req, res) => {
      const { id } = req.params,
        user = new (0, _User.User)(_App2.default.get("user"));

      if (!_App2.default.get("course")) return res.redirect("/courses");

      const course = new (0, _Course.Course)(_App2.default.get("course"));
      let period = course.getPeriod(id);

      if (!period) return res.redirect("/courses/");

      period = new (0, _Period.Period)(period);

      _App2.default.set("period", period);

      return res.redirect("/period");
    });

    this.router.get("/", async (req, res) => {
      const user = new (0, _User.User)(_App2.default.get("user"));

      if (!_App2.default.get("course")) return res.redirect("/courses");
      if (!_App2.default.get("period")) return res.redirect("/course");

      const course = new (0, _Course.Course)(_App2.default.get("course")),
        period = _App2.default.get("period");

      return res.render("pages/period", {
        title: period.getName(),
        user,
        course,
        period,
      });
    });

    this.router.post("/register", async (req, res) => {
      const { name, icon, status } = req.body,
        user = new (0, _User.User)(_App2.default.get("user")),
        course = new (0, _Course.Course)(_App2.default.get("course"));

      if (!name || !status || !course) return res.redirect("/course");

      const period = new (0, _Period.Period)({
        name,
        icon,
        status,
      });

      course.setPeriod(period);

      const { data, error } = await _connection.connection
        .from("Courses")
        .update(course)
        .match({ id: course.getId(), userId: user.getId() })
        .single();
      if (error)
        return res
          .status(400)
          .json({ message: "Erro ao cadastrar período", error });

      _App2.default.set("course", data);
      _App2.default.set("period", period);

      return res.redirect("/period");
    });

    this.router.post("/update", async (req, res) => {
      const { name, icon, status } = req.body;

      if (!_App2.default.get("course")) return res.redirect("/courses");
      if (!_App2.default.get("period")) return res.redirect("/course");

      const user = new (0, _User.User)(_App2.default.get("user")),
        course = new (0, _Course.Course)(_App2.default.get("course"));

      let period = new (0, _Period.Period)(_App2.default.get("period"));

      if (name) period.setName(name);
      if (icon) period.setIcon(icon);
      if (status) period.setStatus(status);

      course.updatePeriod(period);

      const { data, error } = await _connection.connection
        .from("Courses")
        .update(course)
        .match({ id: course.getId(), userId: user.getId() })
        .single();
      if (error)
        return res
          .status(400)
          .json({ message: "Erro ao atualizar período", error });

      _App2.default.set("course", data);
      _App2.default.set("period", period);

      return res.redirect('/period/p/' + period.getId());
    });

    this.router.get("/delete", async (req, res) => {
      const user = new (0, _User.User)(_App2.default.get("user"));

      if (!_App2.default.get("course")) return res.redirect("/courses");
      if (!_App2.default.get("period")) return res.redirect("/course");

      const course = new (0, _Course.Course)(_App2.default.get("course")),
       period = new (0, _Period.Period)(_App2.default.get("period"));

      course.deletePeriod(period.getId());

      const { data, error } = await _connection.connection
        .from("Courses")
        .update(course)
        .match({ id: course.getId(), userId: user.getId() })
        .single();
      if (error)
        return res
          .status(400)
          .json({ message: "Erro ao remover período", error });

      _App2.default.set("course", data);
      _App2.default.set("period", {});

      return res.redirect("/course/c/" + course.getId());
    });

    this.router.get("/conclude", async (req, res) => {
      const user = new (0, _User.User)(_App2.default.get("user"));

      if (!_App2.default.get("course")) return res.redirect("/courses");
      if (!_App2.default.get("period")) return res.redirect("/course");

      const course = new (0, _Course.Course)(_App2.default.get("course")),
        period = new (0, _Period.Period)(_App2.default.get("period"));

      period.setStatus("Concluído");
      course.updatePeriod(period);
      course.setWorkloadAndCredits();

      const { data, error } = await _connection.connection
        .from("Courses")
        .update(course)
        .match({ id: course.getId(), userId: user.getId() })
        .single();
      if (error)
        return res
          .status(400)
          .json({ message: "Erro ao remover período", error });

      _App2.default.set("course", data);
      _App2.default.set("period", period);

      return res.redirect("/course/c/" + course.getId());
    });
  }
}

exports. default = new PeriodRoutes().router;
