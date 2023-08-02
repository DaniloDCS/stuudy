"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _App = require('../App'); var _App2 = _interopRequireDefault(_App);

var _connection = require('../database/connection');

var _Course = require('../models/Course');
var _Period = require('../models/Period');
var _Discipline = require('../models/Discipline');
var _Class = require('../models/Class');
var _User = require('../models/User');
var _Unity = require('../models/Unity');

class ClassRoutes {
  

  constructor() {
    this.router = _express.Router.call(void 0, );
    this.routes();
  }

   routes() {
    this.router.post("/create", async (req, res) => {
      const { title, content, quantity, date, IWasPresent, type, unityId } =
        req.body;

      if (!title || !content || !quantity || !date)
        return res.redirect("/discipline/#item-1");

      if (!_App2.default.get("course")) return res.redirect("/courses");
      if (!_App2.default.get("period")) return res.redirect("/course");
      if (!_App2.default.get("discipline")) return res.redirect("/period");

      const user = new (0, _User.User)(_App2.default.get("user")),
        course = new (0, _Course.Course)(_App2.default.get("course")),
        period = new (0, _Period.Period)(_App2.default.get("period")),
        discipline = new (0, _Discipline.Discipline)(_App2.default.get("discipline"));

      const class_ = new (0, _Class.Class)({
        title,
        content,
        quantity,
        date,
        IWasPresent,
        type,
      });

      discipline.setClass(unityId, class_);
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

      return res.redirect(`/discipline/d/${discipline.getId()}/#item-1`);
    });

    this.router.post("/update/:id", async (req, res) => {
      const hash = "item-1";

      const {
        title,
        content,
        quantity,
        date,
        IWasPresent,
        type,
        unityId,
        oldUnityId,
      } = req.body;

      const { id } = req.params;

      if (!id || !unityId || !oldUnityId)
        return res.redirect("/discipline/#" + hash);

      if (!_App2.default.get("course")) return res.redirect("/courses");
      if (!_App2.default.get("period")) return res.redirect("/course");
      if (!_App2.default.get("discipline")) return res.redirect("/period");

      const user = new (0, _User.User)(_App2.default.get("user")),
        course = new (0, _Course.Course)(_App2.default.get("course")),
        period = new (0, _Period.Period)(_App2.default.get("period")),
        discipline = new (0, _Discipline.Discipline)(_App2.default.get("discipline")),
        unity = new (0, _Unity.Unity)(discipline.getUnity(oldUnityId)),
        classEditing = new (0, _Class.Class)(unity.getClassById(id));

      if (!classEditing) return res.redirect("/discipline/#" + hash);

      if (title) classEditing.setTitle(title);
      if (content) classEditing.setContent(content);
      if (quantity) classEditing.setQuantity(Number(quantity));
      if (date) classEditing.setDate(date);
      if (IWasPresent) classEditing.setIWasPresent(IWasPresent);
      if (type) classEditing.setType(type);

      if (oldUnityId !== unityId) {
        discipline.deleteClassById(oldUnityId, id);
        discipline.setClass(unityId, classEditing);
      } else {
        discipline.updateClassById(unityId, classEditing);
      }

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

      return res.redirect("/discipline/#" + hash);
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
        discipline = new (0, _Discipline.Discipline)(_App2.default.get("discipline")),
        unityId = discipline.getUnityIdByClassId(id);

      if (!unityId) return res.redirect("/discipline/#item-1");

      const unity = new (0, _Unity.Unity)(discipline.getUnity(unityId));
      unity.deleteClassById(id);
      discipline.updateUnitiesById(unityId, unity);
      period.updateDiscipline(discipline);
      course.updatePeriod(period);
      course.setWorkloadAndCredits();

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

      return res.redirect("/discipline/d/" + discipline.getId());
    });

    this.router.post("/editing", async (req, res) => {
      const { content, disciplineId, classId, unityId } = req.body;

      if (!content || !disciplineId || !classId || !unityId)
        return res.status(400).json({ message: "Dados inválidos" });

      if (!_App2.default.get("course")) return res.redirect("/courses");
      if (!_App2.default.get("period")) return res.redirect("/course");
      if (!_App2.default.get("discipline")) return res.redirect("/period");

      const user = new (0, _User.User)(_App2.default.get("user")),
        course = new (0, _Course.Course)(_App2.default.get("course")),
        period = new (0, _Period.Period)(_App2.default.get("period")),
        discipline = new (0, _Discipline.Discipline)(_App2.default.get("discipline")),
        unity = new (0, _Unity.Unity)(discipline.getUnity(unityId));

      const classEditing = new (0, _Class.Class)(unity.getClassById(classId));

      classEditing.setContent(content);
      unity.updateClassById(classId, classEditing);
      discipline.updateUnitiesById(unityId, unity);
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

exports. default = new ClassRoutes().router;
