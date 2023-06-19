"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _App = require('../App'); var _App2 = _interopRequireDefault(_App);
var _connection = require('../database/connection');
var _Course = require('../models/Course');
var _Period = require('../models/Period');
var _Discipline = require('../models/Discipline');
var _User = require('../models/User');



class DisciplineRoutes {
  

  constructor() {
    this.router = _express.Router.call(void 0, );
    this.routes();
  }

   routes() {

    this.router.get('/discipline/:id', async (req, res) => {
      const { id } = req.params;
      const user = new (0, _User.User)(_App2.default.get('user'));

      const course = new (0, _Course.Course)(_App2.default.get('course'));
      const period = new (0, _Period.Period)(_App2.default.get('period'));
      const discipline = new (0, _Discipline.Discipline)(period.getDiscipline(id));

      _App2.default.set('discipline', discipline);

      return res.render('pages/discipline', { title: discipline.getName(), user, course, period, discipline });
    });

    this.router.post('/discipline/register', async (req, res) => {
      const { id } = req.params;
      const { name, icon, code, credits, workload, teachers } = req.body;

      function capitalizeFirstLetter(string) {
        return string.split(' ').map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
      }

      const user = new (0, _User.User)(_App2.default.get('user'));
      const course = new (0, _Course.Course)(_App2.default.get('course'));
      let period = new (0, _Period.Period)(_App2.default.get('period'));

      const discipline = new (0, _Discipline.Discipline)({
        name: capitalizeFirstLetter(name), 
        icon, code, credits, workload, 
        teachers: teachers.map((teacher) => capitalizeFirstLetter(teacher)),
        periodId: period.getId()
      });

      course.setDiscipline(discipline);
      period = new (0, _Period.Period)(course.getPeriod(period.getId()) || period);

      const { data, error } = await _connection.connection.from('Courses').update(course).match({ id: course.getId(), userId: user.getId() }).single();
      if (error) return res.status(400).json({ message: 'Erro ao cadastrar disciplina', error });

      _App2.default.set('course', course);
      _App2.default.set('period', period);

      return res.redirect(`/disciplines/discipline/${discipline.getId()}`);
    });

    this.router.post('/discipline/:id/update', async (req, res) => {
      const { id } = req.params;
      const { disciplineId, name, icon, code, credits, workload, teachers } = req.body;
      const user = new (0, _User.User)(_App2.default.get('user'));
      const course = new (0, _Course.Course)(_App2.default.get('course'));

      let period = new (0, _Period.Period)(course.getPeriod(id) || _App2.default.get('period'));
      const discipline = new (0, _Discipline.Discipline)({ id: disciplineId, name, icon, code, credits, workload, teachers, periodId: period.getId() });

      course.updateDiscipline(discipline);
      period = new (0, _Period.Period)(course.getPeriod(id) || _App2.default.get('period'));

      const { data, error } = await _connection.connection.from('Courses').update(course).match({ id: course.getId(), userId: user.getId() }).single();
      if (error) return res.status(400).json({ message: 'Erro ao atualizar disciplina', error });

      _App2.default.set('course', course);
      _App2.default.set('period', period);

      return res.redirect(`/disciplines/discipline/${discipline.getId()}`);
    });

    this.router.get('/discipline/:id/:periodId/delete', async (req, res) => {
      const { id, periodId } = req.params;
      const user = new (0, _User.User)(_App2.default.get('user'));
      const course = new (0, _Course.Course)(_App2.default.get('course'));

      course.deleteDiscipline(id, periodId);

      let period = new (0, _Period.Period)(course.getPeriod(_App2.default.get('period').id) || _App2.default.get('period'));

      const { data, error } = await _connection.connection.from('Courses').update(course).match({ id: course.getId(), userId: user.getId() }).single();
      if (error) return res.status(400).json({ message: 'Erro ao deletar disciplina', error });

      _App2.default.set('course', data);
      _App2.default.set('period', period);

      return res.redirect(`/periods/period/${period.getId()}`);
    });

    this.router.post('/discipline/:option/register', async (req, res) => {
      const { option } = req.params;
      const user = new (0, _User.User)(_App2.default.get('user'));
      const course = new (0, _Course.Course)(_App2.default.get('course'));
      const period = new (0, _Period.Period)(_App2.default.get('period'));
      const discipline = new (0, _Discipline.Discipline)(_App2.default.get('discipline'));

      if (!course || !period || !discipline) return res.status(400).json({ message: 'Erro ao cadastrar' });

      if (option === 'class') {
        const { title, description, content, quantity, date, IWasPresent, type, unityId } = req.body;
        const _class = new (0, _Discipline.Class)({ title, description, content, quantity, date, IWasPresent, type });
        discipline.setClass(unityId, _class);
      } else if (option === 'evaluation') {
        const { title, description, questions, note, bulletinId } = req.body;
        const evaluation = new (0, _Discipline.Evaluation)({ title, description, questions, note, bulletinId });
        discipline.setEvaluations(evaluation);
      } else if (option === 'activity') {
        const { title, description, questions, bulletinId } = req.body;
        const activity = new (0, _Discipline.Activity)({ title, description, questions });
        discipline.setActivities(activity);
      } else if (option === 'bulletin') {
        const { title, value, weight, type } = req.body;
        const bulletin = new (0, _Discipline.Bulletin)({ title, value, weight, type });
        discipline.setBulletins(bulletin);
      } else if (option === 'media') {
        const { title, link, type } = req.body;
        const media = new (0, _Discipline.Media)({ title, link, type });
        discipline.setMedias(media);
      } else if (option === 'work') {
        const { title, content, note, bulletinId } = req.body;
        const work = new (0, _Discipline.Work)({ title, content, note, bulletinId });
        discipline.setWorkers(work);
      } else if (option === 'resume') {
        const { title, content } = req.body;
        const resume = new (0, _Discipline.Resume)({ title, content });
        discipline.setResumes(resume);
      } else if (option === 'todo') {
        const { title, content, status } = req.body;
        const todo = new (0, _Discipline.TODOs)({ title, content, status });
        discipline.setTODOs(todo);
      } else if (option === 'unity') {
        const { title } = req.body;
        const unity = new (0, _Discipline.Unity)({ title });
        discipline.setUnities(unity);
      } else {
        return res.status(400).json({ message: 'Opção inválida' });
      }

      course.updateDiscipline(discipline);
      const { data, error } = await _connection.connection.from('Courses').update(course).match({ id: course.getId(), userId: user.getId() }).single();
      if (error) return res.status(400).json({ message: 'Erro ao cadastrar', error });

      _App2.default.set('course', course);
      _App2.default.set('period', period);
      _App2.default.set('discipline', discipline);

      return res.redirect(`/disciplines/discipline/${discipline.getId()}`);
    });

    this.router.post('/bulletins/update', async (req, res) => {
      const notes = req.body;
      const user = new (0, _User.User)(_App2.default.get('user'));
      const course = new (0, _Course.Course)(_App2.default.get('course'));
      const period = new (0, _Period.Period)(_App2.default.get('period'));
      let discipline = new (0, _Discipline.Discipline)(_App2.default.get('discipline'));

      const bulletins = Object.keys(notes).map((note) => {
        let bulletin = notes[note];
        return new (0, _Discipline.Bulletin)({ title: bulletin.title, value: bulletin.value, weight: bulletin.weight, type: bulletin.type });
      });

      discipline = discipline.updateBulletins(bulletins);
      course.updateDiscipline(discipline);
      
      const { data, error } = await _connection.connection.from('Courses').update(course).match({ id: course.getId(), userId: user.getId() }).single();
      if (error) return res.status(400).json({ message: 'Erro ao atualizar', error });

      _App2.default.set('course', course);
      _App2.default.set('period', period);
      _App2.default.set('discipline', discipline);

      return res.redirect(`/disciplines/discipline/${discipline.getId()}`);
    });
  }
}

exports. default = new DisciplineRoutes().router;