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
    this.router.get('/', async (req, res) => {
      const user = new (0, _User.User)(_App2.default.get('user'));

      const { data: courses, error } = await _connection.connection.from('Courses').select('*').match({ userId: user.getId() });

      return res.render('pages/courses', {
        title: 'Cursos',
        user,
        courses
      });
    });

    this.router.get('/course/:id', async (req, res) => {
      const user = new (0, _User.User)(_App2.default.get('user'));
      const { id } = req.params;

      const { data: courses, error } = await _connection.connection.from('Courses').select('*').match({ id, userId: user.getId() });
      if (error) return res.redirect('/courses');

      const course = new (0, _Course.Course)(courses[0]);
      _App2.default.set('course', course);

      return res.render('pages/course', {
        title: course.getName(),
        user,
        course
      });
    });

    this.router.post('/register', async (req, res) => {
      const user = new (0, _User.User)(_App2.default.get('user'));
      const { name, icon, description, university, location, status, level, type, startedIn, finishedIn } = req.body;

      if (!name || !icon || !description || !university || !location || !status || !level || !type || !startedIn || !finishedIn) return res.json({ error: 'Preencha todos os campos!' });

      const course = new (0, _Course.Course)({ name, icon, description, university, location, status, level, type, startedIn, finishedIn, userId: user.getId() });
      const { data: newCourse, error: courseError } = await _connection.connection.from('Courses').insert(course);

      if (courseError) return res.json({ error: courseError });

      return res.redirect('/courses/course/' + course.getId());
    });

    this.router.delete('/delete/:id', async (req, res) => {
      const { id } = req.params;
      const { data: courses, error: coursesError } = await _connection.connection.from('Courses').delete().match({ id });
      return res.redirect('/courses');
    });

    this.router.put('/edit/:id', async (req, res) => {
      const { id } = req.params;
      const { userId, name, icon, description, university, location, status, level, type, startedIn, finishedIn } = req.body;
      const user = new (0, _User.User)(_App2.default.get('user'));

      const { data: courses, error: coursesError } = await _connection.connection.from('Courses').update({ userId, name, icon, description, university, location, status, level, type, startedIn, finishedIn }).match({ id });
      if (coursesError) return res.render('pages/courses', { title: 'Courses', user, courses, error: coursesError });

      return res.redirect('/courses');
    });
  }
}

exports. default = new CourseRoutes().router;