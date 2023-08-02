"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _App = require('../App'); var _App2 = _interopRequireDefault(_App);
var _connection = require('../database/connection');
var _User = require('../models/User');
var _Course = require('../models/Course');

class CourseRoutes {
  

  constructor() {
    this.router = _express.Router.call(void 0, );
    this.routes();
  }

   routes() {
    this.router.get('/c/:id', async (req, res) => {
      const user = new (0, _User.User)(_App2.default.get('user'));
      const { id } = req.params;

      const { data: courses, error } = await _connection.connection.from('Courses').select('*').match({ id, userId: user.getId() });
      if (error) return res.redirect('/courses');

      const course = new (0, _Course.Course)(courses[0]);
      _App2.default.set('course', course);

      return res.redirect('/course');
    });

    this.router.get("/", async (req, res) => {
      if (!_App2.default.get("course")) return res.redirect("/courses");

      const user = new (0, _User.User)(_App2.default.get("user"));
      const course = new (0, _Course.Course)(_App2.default.get("course"));

      return res.render("pages/course", {
        title: course.getName(),
        user,
        course,
      });
    });

    this.router.get("/delete/", async (req, res) => {
      if (!_App2.default.get("course")) return res.redirect("/courses");

      const user = new (0, _User.User)(_App2.default.get("user"));
      const course = new (0, _Course.Course)(_App2.default.get("course"));

      const { data, error } = await _connection.connection
        .from("Courses")
        .delete()
        .match({ id: course.getId(), userId: user.getId() });
        
      if (error) return res.json({ error });

      _App2.default.set("course", null);

      return res.redirect("/courses");
    });

    this.router.post("/update", async (req, res) => {
      if (!_App2.default.get("course")) return res.redirect("/courses");

      const user = new (0, _User.User)(_App2.default.get("user"));
      const {
        name,
        icon,
        description,
        university,
        location,
        status,
        level,
        type,
        startedIn,
        finishedIn,
      } = req.body;

      const course = new (0, _Course.Course)(_App2.default.get("course"));

      if (name) course.setName(name);
      if (icon) course.setIcon(icon);
      if (description) course.setDescription(description);
      if (university) course.setUniversity(university);
      if (location) course.setLocation(location);
      if (status) course.setStatus(status);
      if (level) course.setLevel(level);
      if (type) course.setType(type);
      if (startedIn) course.setStartedIn(startedIn);
      if (finishedIn) course.setFinishedIn(finishedIn);

      const { data: newCourse, error: courseError } = await _connection.connection
        .from("Courses")
        .update(course)
        .match({ id: course.getId(), userId: user.getId() });

      if (courseError) return res.json({ error: courseError });

      _App2.default.set("course", course);

      return res.redirect("/course");
    });

    this.router.post('/register', async (req, res) => {
      const user = new (0, _User.User)(_App2.default.get('user'));
      const { name, icon, description, university, location, status, level, type, startedIn, finishedIn } = req.body;

      if (!name || !icon || !description || !university || !location || !status || !level || !type || !startedIn || !finishedIn) return res.json({ error: 'Preencha todos os campos!' });

      const course = new (0, _Course.Course)({ name, icon, description, university, location, status, level, type, startedIn, finishedIn, userId: user.getId() });
      const { data: newCourse, error: courseError } = await _connection.connection.from('Courses').insert(course);

      if (courseError) return res.json({ error: courseError });

      _App2.default.set('course', course);

      return res.redirect('/course');
    });

    this.router.get("/conclude", async (req, res) => {
      const user = new (0, _User.User)(_App2.default.get("user"));

      if (!_App2.default.get("course")) return res.redirect("/courses");

      const course = new (0, _Course.Course)(_App2.default.get("course"));	

      course.setStatus("Concluído");
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

      return res.redirect("/course/c/" + course.getId());
    });
  }
}

exports. default = new CourseRoutes().router;