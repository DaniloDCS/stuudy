"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _App = require('../App'); var _App2 = _interopRequireDefault(_App);

var _connection = require('../database/connection');

var _User = require('../models/User');
var _Course = require('../models/Course');
var _Period = require('../models/Period');
var _Discipline = require('../models/Discipline');
var _Work = require('../models/Work');

const item = "item-4";

class WorkRoutes {
  

  constructor() {
    this.router = _express.Router.call(void 0, );
    this.routes();
  }

   routes() {
    this.router.post("/create", async (req, res) => {
      const { title, content, note, link, bulletinId } = req.body;

      if (!title || !content || !note || !link || !bulletinId)
        return res.redirect(`/discipline/#${item}`);

      if (!_App2.default.get("course")) return res.redirect("/courses");
      if (!_App2.default.get("period")) return res.redirect("/course");
      if (!_App2.default.get("discipline")) return res.redirect("/period");

      const user = new (0, _User.User)(_App2.default.get("user")),
        course = new (0, _Course.Course)(_App2.default.get("course")),
        period = new (0, _Period.Period)(_App2.default.get("period")),
        discipline = new (0, _Discipline.Discipline)(_App2.default.get("discipline"));

      const work = new (0, _Work.Work)({
        title,
        content,
        note,
        link,
        bulletinId,
      });

      discipline.setWork(work);
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
      const { title, content, note, link, bulletinId } = req.body;

      const { id } = req.params;

      if (!id || !title || !content || !note || !link || !bulletinId)
        return res.redirect(`/discipline/#${item}`);

      if (!_App2.default.get("course")) return res.redirect("/courses");
      if (!_App2.default.get("period")) return res.redirect("/course");
      if (!_App2.default.get("discipline")) return res.redirect("/period");

      const user = new (0, _User.User)(_App2.default.get("user")),
        course = new (0, _Course.Course)(_App2.default.get("course")),
        period = new (0, _Period.Period)(_App2.default.get("period")),
        discipline = new (0, _Discipline.Discipline)(_App2.default.get("discipline")),
        workEditing = new (0, _Work.Work)(discipline.getWorkById(id));

      if (title) workEditing.setTitle(title);
      if (content) workEditing.setContent(content);
      if (note) workEditing.setNote(note);
      if (link) workEditing.setLink(link);
      if (bulletinId) workEditing.setBulletinId(bulletinId);

      discipline.updateWorkById(id, workEditing);
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

      discipline.deleteWorkById(id);
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

exports. default = new WorkRoutes().router;
