"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _App = require('../App'); var _App2 = _interopRequireDefault(_App);

var _connection = require('../database/connection');

var _Course = require('../models/Course');
var _Period = require('../models/Period');
var _Discipline = require('../models/Discipline');
var _Resume = require('../models/Resume');
var _User = require('../models/User');

const item = "item-5";

class ResumeRoutes {
  

  constructor() {
    this.router = _express.Router.call(void 0, );
    this.routes();
  }

   routes() {
    this.router.post("/create", async (req, res) => {
      const { title, content } = req.body;

      if (!title || !content)
        return res.redirect(`/discipline/#${item}`);

      if (!_App2.default.get("course")) return res.redirect("/courses");
      if (!_App2.default.get("period")) return res.redirect("/course");
      if (!_App2.default.get("discipline")) return res.redirect("/period");

      const user = new (0, _User.User)(_App2.default.get("user")),
        course = new (0, _Course.Course)(_App2.default.get("course")),
        period = new (0, _Period.Period)(_App2.default.get("period")),
        discipline = new (0, _Discipline.Discipline)(_App2.default.get("discipline"));

      const resume = new (0, _Resume.Resume)({
        title,
        content        
      });

      discipline.setResume(resume);
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

      return res.redirect(`/discipline/${item}`);
    });

    this.router.post("/update/:id", async (req, res) => {
      const { title, content } = req.body;

      const { id } = req.params;

      if (!id || !title || !content)
        return res.redirect(`/discipline/#${item}`);

      if (!_App2.default.get("course")) return res.redirect("/courses");
      if (!_App2.default.get("period")) return res.redirect("/course");
      if (!_App2.default.get("discipline")) return res.redirect("/period");

      const user = new (0, _User.User)(_App2.default.get("user")),
        course = new (0, _Course.Course)(_App2.default.get("course")),
        period = new (0, _Period.Period)(_App2.default.get("period")),
        discipline = new (0, _Discipline.Discipline)(_App2.default.get("discipline")),
        resumeEditing = new (0, _Resume.Resume)(discipline.getResumeById(id));

      if (title) resumeEditing.setTitle(title);
      if (content) resumeEditing.setContent(content);

      discipline.updateResumeById(id, resumeEditing);
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

      return res.redirect(`/discipline/${item}`);
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

      discipline.deleteResumeById(id);
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

      return res.redirect(`/discipline/${item}`);
    });

    this.router.post("/editing", async (req, res) => {
      const { content, periodId, disciplineId, resumeId } = req.body;

      if (!content || !disciplineId || !periodId || !resumeId)
        return res.status(400).json({ message: "Dados inválidos" });

      if (!_App2.default.get("course")) return res.redirect("/courses");
      if (!_App2.default.get("period")) return res.redirect("/course");
      if (!_App2.default.get("discipline")) return res.redirect("/period");

      const user = new (0, _User.User)(_App2.default.get("user")),
        course = new (0, _Course.Course)(_App2.default.get("course")),
        period = new (0, _Period.Period)(_App2.default.get("period")),
        discipline = new (0, _Discipline.Discipline)(_App2.default.get("discipline"));

      const resumeEditing = new (0, _Resume.Resume)(discipline.getResumeById(resumeId));

      resumeEditing.setContent(content);
      discipline.updateResumeById(resumeId, resumeEditing);
      period.updateDiscipline(discipline);
      course.updatePeriod(period);

      const { data, error } = await _connection.connection
        .from("Courses")
        .update(course)
        .match({ id: course.getId(), userId: user.getId() });

      if (error)
        return res.status(400).json({ message: "Erro ao atualizar", error });

      _App2.default.set("course", course);
      _App2.default.set("period", period);
      _App2.default.set("discipline", discipline);

      return res.status(200).json({ message: "Atualizado com sucesso" });
    });
  }
}

exports. default = new ResumeRoutes().router;
