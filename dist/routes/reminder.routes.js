"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _App = require('../App'); var _App2 = _interopRequireDefault(_App);

var _connection = require('../database/connection');

var _User = require('../models/User');
var _Course = require('../models/Course');
var _Period = require('../models/Period');
var _Discipline = require('../models/Discipline');
var _Reminder = require('../models/Reminder');

const item = "item-7";

class ReminderRoutes {
  

  constructor() {
    this.router = _express.Router.call(void 0, );
    this.routes();
  }

   routes() {
    this.router.post("/create", async (req, res) => {
      const { title, content, status, concludedAt } = req.body;

      if (!title || !content || !status || !concludedAt)
        return res.redirect(`/discipline/#${item}`);

      if (!_App2.default.get("course")) return res.redirect("/courses");
      if (!_App2.default.get("period")) return res.redirect("/course");
      if (!_App2.default.get("discipline")) return res.redirect("/period");

      const user = new (0, _User.User)(_App2.default.get("user")),
        course = new (0, _Course.Course)(_App2.default.get("course")),
        period = new (0, _Period.Period)(_App2.default.get("period")),
        discipline = new (0, _Discipline.Discipline)(_App2.default.get("discipline"));

      const reminder = new (0, _Reminder.Reminder)({
        title,
        content,
        status,
        concludedAt,
      });

      discipline.setReminder(reminder);
      period.updateDiscipline(discipline);
      course.updatePeriod(period);

      const { data, error } = await _connection.connection
        .from("Courses")
        .update(course)
        .match({ id: course.getId(), userId: user.getId() })
        .single();
      if (error)
        return res.status(400).json({ message: "Erro ao cadastrar", error });

      _App2.default.set("course", course);
      _App2.default.set("period", period);
      _App2.default.set("discipline", discipline);

      return res.redirect(`/discipline/#${item}`);
    });

    this.router.post("/update/:id", async (req, res) => {
      const { title, content, status, concludedAt } = req.body;

      const { id } = req.params;

      if (!id || !title || !content || !status || !concludedAt)
        return res.redirect(`/discipline/#${item}`);

      if (!_App2.default.get("course")) return res.redirect("/courses");
      if (!_App2.default.get("period")) return res.redirect("/course");
      if (!_App2.default.get("discipline")) return res.redirect("/period");

      const user = new (0, _User.User)(_App2.default.get("user")),
        course = new (0, _Course.Course)(_App2.default.get("course")),
        period = new (0, _Period.Period)(_App2.default.get("period")),
        discipline = new (0, _Discipline.Discipline)(_App2.default.get("discipline")),
        reminderEditing = new (0, _Reminder.Reminder)(discipline.getReminderById(id));

      if (title) reminderEditing.setTitle(title);
      if (content) reminderEditing.setContent(content);
      if (status) reminderEditing.setStatus(status);
      if (concludedAt) reminderEditing.setConcludedAt(concludedAt);
      
      discipline.updateReminderById(id, reminderEditing);
      period.updateDiscipline(discipline);
      course.updatePeriod(period);

      const { data, error } = await _connection.connection
        .from("Courses")
        .update(course)
        .match({ id: course.getId(), userId: user.getId() })
        .single();
      if (error)
        return res.status(400).json({ message: "Erro ao cadastrar", error });

      _App2.default.set("course", course);
      _App2.default.set("period", period);
      _App2.default.set("discipline", discipline);

      return res.redirect(`/discipline/#${item}`);
    });

    this.router.get("/delete/:id", async (req, res) => {
      const { id } = req.params;

      if (!id) return res.redirect("/discipline/#item-1");
      if (!_App2.default.get("course")) return res.redirect("/courses");
      if (!_App2.default.get("period")) return res.redirect("/course");
      if (!_App2.default.get("discipline")) return res.redirect("/period");

      const user = new (0, _User.User)(_App2.default.get("user")),
        course = new (0, _Course.Course)(_App2.default.get("course")),
        period = new (0, _Period.Period)(_App2.default.get("period")),
        discipline = new (0, _Discipline.Discipline)(_App2.default.get("discipline"));

      discipline.deleteReminderById(id);
      period.updateDiscipline(discipline);
      course.updatePeriod(period);

      const { data, error } = await _connection.connection
        .from("Courses")
        .update(course)
        .match({ id: course.getId(), userId: user.getId() })
        .single();

      if (error)
        return res.status(400).json({ message: "Erro ao deletar", error });

      _App2.default.set("course", course);
      _App2.default.set("period", period);
      _App2.default.set("discipline", discipline);

      return res.redirect(`/discipline/#${item}`);
    });
  }
}

exports. default = new ReminderRoutes().router;
