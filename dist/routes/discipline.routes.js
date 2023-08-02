"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _App = require('../App'); var _App2 = _interopRequireDefault(_App);

var _express = require('express');
var _connection = require('../database/connection');

var _User = require('../models/User');
var _Course = require('../models/Course');
var _Period = require('../models/Period');
var _Discipline = require('../models/Discipline');

function capitalizeFirstLetter(string) {
  if (!string) return "";

  return string
    .toLowerCase()
    .trim()
    .split(" ")
    .map((word) => {
      if (
        word === "de" ||
        word === "da" ||
        word === "do" ||
        word === "dos" ||
        word === "das" ||
        word === "e" ||
        word === "em"
      )
        return word;
      if (
        word === "i" ||
        word === "ii" ||
        word === "iii" ||
        word === "iv" ||
        word === "v"
      )
        return word.toUpperCase();
      return word[0].toUpperCase() + word.slice(1);
    })
    .join(" ");
}

class DisciplineRoutes {
  

  constructor() {
    this.router = _express.Router.call(void 0, );
    this.routes();
  }

   routes() {
    this.router.get("/d/:id", async (req, res) => {
      const { id } = req.params,
        user = new (0, _User.User)(_App2.default.get("user"));

      if (!_App2.default.get("course")) return res.redirect("/courses");
      if (!_App2.default.get("period")) return res.redirect("/course");

      const course = new (0, _Course.Course)(_App2.default.get("course")),
        period = new (0, _Period.Period)(_App2.default.get("period")),
        discipline = new (0, _Discipline.Discipline)(period.getDiscipline(id));

      if (!discipline) return res.redirect("/period");

      _App2.default.set("discipline", discipline);

      return res.redirect("/discipline");
    });

    this.router.get("/", async (req, res) => {
      const user = new (0, _User.User)(_App2.default.get("user"));

      if (!_App2.default.get("course")) return res.redirect("/courses");
      if (!_App2.default.get("period")) return res.redirect("/course");
      if (!_App2.default.get("discipline")) return res.redirect("/period");

      const course = new (0, _Course.Course)(_App2.default.get("course")),
        period = new (0, _Period.Period)(_App2.default.get("period")),
        discipline = new (0, _Discipline.Discipline)(_App2.default.get("discipline"));

      return res.render("pages/discipline", {
        title: discipline.getName(),
        user,
        course,
        period,
        discipline,
      });
    });

    this.router.get("/conclude", async (req, res) => {
      if (!_App2.default.get("course")) return res.redirect("/courses");
      if (!_App2.default.get("period")) return res.redirect("/course");
      if (!_App2.default.get("discipline")) return res.redirect("/period");

      const user = new (0, _User.User)(_App2.default.get("user")),
        course = new (0, _Course.Course)(_App2.default.get("course")),
        period = new (0, _Period.Period)(_App2.default.get("period")),
        discipline = new (0, _Discipline.Discipline)(_App2.default.get("discipline"));

      if (discipline.getMedia() >= 7 && discipline.getMedia() <= 10)
        discipline.setStatus("Aprovado");
      else discipline.setStatus("Reprovado");

      period.updateDiscipline(discipline);
      course.updatePeriod(period);
      course.setWorkloadAndCredits();

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

      return res.redirect("/discipline/d/" + discipline.getId());
    });

    this.router.post("/update", async (req, res) => {
      const { name, icon, code, credits, workload, teachers } = req.body;

      if (!name || !code || !credits || !workload)
        return res.status(400).json({ message: "Dados inválidos" });
      if (!_App2.default.get("course")) return res.redirect("/courses");
      if (!_App2.default.get("period")) return res.redirect("/course");
      if (!_App2.default.get("discipline")) return res.redirect("/period");

      const user = new (0, _User.User)(_App2.default.get("user")),
        course = new (0, _Course.Course)(_App2.default.get("course")),
        period = new (0, _Period.Period)(_App2.default.get("period")),
        discipline = new (0, _Discipline.Discipline)(_App2.default.get("discipline"));

      if (name) discipline.setName(capitalizeFirstLetter(name));
      if (icon) discipline.setIcon(icon);
      if (code) discipline.setCode(code);
      if (credits) discipline.setCredits(credits);
      if (workload) discipline.setWorkload(workload);
      if (teachers)
        discipline.setTeachers(
          teachers.map(
            (teacher) =>
              new (0, _Discipline.Teacher)({ name: capitalizeFirstLetter(teacher) })
          )
        );

      period.updateDiscipline(discipline);
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
          .json({ message: "Erro ao atualizar disciplina", error });

      _App2.default.set("course", course);
      _App2.default.set("period", period);
      _App2.default.set("discipline", discipline);

      return res.redirect("/discipline/d/" + discipline.getId());
    });

    this.router.post("/register", async (req, res) => {
      const { name, icon, code, credits, workload, teachers } = req.body;

      if (!name || !code || !credits || !workload)
        return res.status(400).json({ message: "Dados inválidos" });

      if (!_App2.default.get("course")) return res.redirect("/courses");
      if (!_App2.default.get("period")) return res.redirect("/course");

      const user = new (0, _User.User)(_App2.default.get("user")),
        course = new (0, _Course.Course)(_App2.default.get("course")),
        period = new (0, _Period.Period)(_App2.default.get("period"));
      const discipline = new (0, _Discipline.Discipline)({
        name: capitalizeFirstLetter(name),
        icon,
        code,
        credits,
        workload,
        teachers: teachers.map(
          (teacher) =>
            new (0, _Discipline.Teacher)({ name: capitalizeFirstLetter(teacher) })
        ),
        periodId: period.getId(),
      });

      period.setDiscipline(discipline);
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
          .json({ message: "Erro ao cadastrar disciplina", error });

      _App2.default.set("course", course);
      _App2.default.set("period", period);
      _App2.default.set("discipline", discipline);

      return res.redirect("/discipline/d/" + discipline.getId());
    });

    this.router.get("/delete", async (req, res) => {
      if (!_App2.default.get("course")) return res.redirect("/courses");
      if (!_App2.default.get("period")) return res.redirect("/course");
      if (!_App2.default.get("discipline")) return res.redirect("/period");
      
      
      const user = new (0, _User.User)(_App2.default.get("user")),
        course = new (0, _Course.Course)(_App2.default.get("course")),
        period = new (0, _Period.Period)(_App2.default.get("period")),
        discipline = new (0, _Discipline.Discipline)(_App2.default.get("discipline"));

      period.deleteDiscipline(discipline.getId());
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
          .json({ message: "Erro ao deletar disciplina", error });

      _App2.default.set("course", data);
      _App2.default.set("period", period);
      _App2.default.set("discipline", null);

      return res.redirect("/period/p/" + period.getId());
    });
  }
}

exports. default = new DisciplineRoutes().router;
