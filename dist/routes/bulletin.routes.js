"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _App = require('../App'); var _App2 = _interopRequireDefault(_App);

var _connection = require('../database/connection');

var _Course = require('../models/Course');
var _Period = require('../models/Period');
var _Discipline = require('../models/Discipline');
var _User = require('../models/User');
var _Bulletin = require('../models/Bulletin');

class BulletinRoutes {
  

  constructor() {
    this.router = _express.Router.call(void 0, );
    this.routes();
  }

   routes() {
    this.router.post("/", async (req, res) => {
      const notes = req.body;

      if (!_App2.default.get("course")) return res.redirect("/courses");
      if (!_App2.default.get("period")) return res.redirect("/course");
      if (!_App2.default.get("discipline")) return res.redirect("/period");
      if (!notes) return res.redirect("/discipline/#item-2");

      const user = new (0, _User.User)(_App2.default.get("user")),
        course = new (0, _Course.Course)(_App2.default.get("course")),
        period = new (0, _Period.Period)(_App2.default.get("period")),
        discipline = new (0, _Discipline.Discipline)(_App2.default.get("discipline"));

      const bulletins = Object.keys(notes).map((note) => {
        let bulletin = notes[note];
        return new (0, _Bulletin.Bulletin)({
          title: bulletin.title,
          value: bulletin.value,
          weight: bulletin.weight,
          type: bulletin.type,
        });
      });

      discipline.updateBulletins(bulletins);
      period.updateDiscipline(discipline);
      course.updatePeriod(period);
      course.setWorkloadAndCredits();

      const { data, error } = await _connection.connection
        .from("Courses")
        .update(course)
        .match({ id: course.getId(), userId: user.getId() })
        .single();
      if (error)
        return res.status(400).json({ message: "Erro ao atualizar", error });

      _App2.default.set("course", course);
      _App2.default.set("period", period);
      _App2.default.set("discipline", discipline);

      return res.redirect("/discipline/#item-2");
    });
  }
}

exports. default = new BulletinRoutes().router;
