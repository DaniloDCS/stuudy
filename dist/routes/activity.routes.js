"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _App = require('../App'); var _App2 = _interopRequireDefault(_App);

var _connection = require('../database/connection');

var _User = require('../models/User');
var _Course = require('../models/Course');
var _Period = require('../models/Period');
var _Discipline = require('../models/Discipline');
var _Activity = require('../models/Activity');
var _Question = require('../models/Question');

const item = "item-8";

class ActivityRoutes {
  

  constructor() {
    this.router = _express.Router.call(void 0, );
    this.routes();
  }

   routes() {
    this.router.post("/create", async (req, res) => {
      const { title, description, questions } =
        req.body;

      if (!title || !description || !questions)
        return res.redirect(`/discipline/#${item}`);

      if (!_App2.default.get("course")) return res.redirect("/courses");
      if (!_App2.default.get("period")) return res.redirect("/course");
      if (!_App2.default.get("discipline")) return res.redirect("/period");

      const user = new (0, _User.User)(_App2.default.get("user")),
        course = new (0, _Course.Course)(_App2.default.get("course")),
        period = new (0, _Period.Period)(_App2.default.get("period")),
        discipline = new (0, _Discipline.Discipline)(_App2.default.get("discipline"));

      const activity = new (0, _Activity.Activity)({
        title,
        description,
        questions: questions.map((question) => {
          return new (0, _Question.Question)({
            title: question.title,
            content: question.content,
            value: question.value,
            type: question.type,
          });
        })
      });

      discipline.setActivity(activity);
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
      const {
        title,
        description,
        questions
      } = req.body;

      const { id } = req.params;

      if (!id || !title || !description || !questions)
        return res.redirect(`/discipline/#${item}`);

      if (!_App2.default.get("course")) return res.redirect("/courses");
      if (!_App2.default.get("period")) return res.redirect("/course");
      if (!_App2.default.get("discipline")) return res.redirect("/period");

      const user = new (0, _User.User)(_App2.default.get("user")),
        course = new (0, _Course.Course)(_App2.default.get("course")),
        period = new (0, _Period.Period)(_App2.default.get("period")),
        discipline = new (0, _Discipline.Discipline)(_App2.default.get("discipline")),
        activityEditing = new (0, _Activity.Activity)(discipline.getActivityById(id));

      if (title) activityEditing.setTitle(title);
      if (description) activityEditing.setDescription(description);
      if (questions) questions.forEach((question) => activityEditing.setQuestion(question));

      discipline.updateActivityById(activityEditing.getId(), activityEditing);
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

      discipline.deleteActivityById(id);
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

    this.router.post("/editing", async (req, res) => {
      const { content, periodId, disciplineId, activityId } = req.body;

      if (!content || !disciplineId || !periodId || !activityId)
        return res.status(400).json({ message: "Dados inválidos" });

      if (!_App2.default.get("course")) return res.redirect("/courses");
      if (!_App2.default.get("period")) return res.redirect("/course");
      if (!_App2.default.get("discipline")) return res.redirect("/period");

      const user = new (0, _User.User)(_App2.default.get("user")),
        course = new (0, _Course.Course)(_App2.default.get("course")),
        period = new (0, _Period.Period)(_App2.default.get("period")),
        discipline = new (0, _Discipline.Discipline)(_App2.default.get("discipline"));

      const activityEditing = new (0, _Activity.Activity)(discipline.getActivityById(activityId));

      activityEditing.setDescription(content);
      discipline.updateActivityById(activityId, activityEditing);
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

exports. default = new ActivityRoutes().router;
