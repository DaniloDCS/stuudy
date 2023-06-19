import { Router, Request, Response } from 'express';
import App from '../App';
import { connection } from '../database/connection';
import { Course } from '../models/Course';
import { Period } from '../models/Period';
import { Discipline } from '../models/Discipline';
import { User } from '../models/User';

import { Unity, Class, Bulletin, Evaluation, Question, Work, Activity, Resume, Media, TODOs } from '../models/Discipline';

class DisciplineRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {

    this.router.get('/discipline/:id', async (req: Request, res: Response) => {
      const { id } = req.params;
      const user = new User(App.get('user'));

      const course = new Course(App.get('course'));
      const period = new Period(App.get('period'));
      const discipline = new Discipline(period.getDiscipline(id));

      App.set('discipline', discipline);

      return res.render('pages/discipline', { title: discipline.getName(), user, course, period, discipline });
    });

    this.router.post('/discipline/register', async (req: Request, res: Response) => {
      const { id } = req.params;
      const { name, icon, code, credits, workload, teachers } = req.body;

      function capitalizeFirstLetter(string: string) {
        return string.split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
      }

      const user = new User(App.get('user'));
      const course = new Course(App.get('course'));
      let period = new Period(App.get('period'));

      const discipline = new Discipline({
        name: capitalizeFirstLetter(name), 
        icon, code, credits, workload, 
        teachers: teachers.map((teacher: string) => capitalizeFirstLetter(teacher)),
        periodId: period.getId()
      });

      course.setDiscipline(discipline);
      period = new Period(course.getPeriod(period.getId()) || period);

      const { data, error } = await connection.from('Courses').update(course).match({ id: course.getId(), userId: user.getId() }).single();
      if (error) return res.status(400).json({ message: 'Erro ao cadastrar disciplina', error });

      App.set('course', course);
      App.set('period', period);

      return res.redirect(`/disciplines/discipline/${discipline.getId()}`);
    });

    this.router.post('/discipline/:id/update', async (req: Request, res: Response) => {
      const { id } = req.params;
      const { disciplineId, name, icon, code, credits, workload, teachers } = req.body;
      const user = new User(App.get('user'));
      const course = new Course(App.get('course'));

      let period = new Period(course.getPeriod(id) || App.get('period'));
      const discipline = new Discipline({ id: disciplineId, name, icon, code, credits, workload, teachers, periodId: period.getId() });

      course.updateDiscipline(discipline);
      period = new Period(course.getPeriod(id) || App.get('period'));

      const { data, error } = await connection.from('Courses').update(course).match({ id: course.getId(), userId: user.getId() }).single();
      if (error) return res.status(400).json({ message: 'Erro ao atualizar disciplina', error });

      App.set('course', course);
      App.set('period', period);

      return res.redirect(`/disciplines/discipline/${discipline.getId()}`);
    });

    this.router.get('/discipline/:id/:periodId/delete', async (req: Request, res: Response) => {
      const { id, periodId } = req.params;
      const user = new User(App.get('user'));
      const course = new Course(App.get('course'));

      course.deleteDiscipline(id, periodId);

      let period = new Period(course.getPeriod(App.get('period').id) || App.get('period'));

      const { data, error } = await connection.from('Courses').update(course).match({ id: course.getId(), userId: user.getId() }).single();
      if (error) return res.status(400).json({ message: 'Erro ao deletar disciplina', error });

      App.set('course', data);
      App.set('period', period);

      return res.redirect(`/periods/period/${period.getId()}`);
    });

    this.router.post('/discipline/:option/register', async (req: Request, res: Response) => {
      const { option } = req.params;
      const user = new User(App.get('user'));
      const course = new Course(App.get('course'));
      const period = new Period(App.get('period'));
      const discipline = new Discipline(App.get('discipline'));

      if (!course || !period || !discipline) return res.status(400).json({ message: 'Erro ao cadastrar' });

      if (option === 'class') {
        const { title, description, content, quantity, date, IWasPresent, type, unityId } = req.body;
        const _class = new Class({ title, description, content, quantity, date, IWasPresent, type });
        discipline.setClass(unityId, _class);
      } else if (option === 'evaluation') {
        const { title, description, questions, note, bulletinId } = req.body;
        const evaluation = new Evaluation({ title, description, questions, note, bulletinId });
        discipline.setEvaluations(evaluation);
      } else if (option === 'activity') {
        const { title, description, questions, bulletinId } = req.body;
        const activity = new Activity({ title, description, questions });
        discipline.setActivities(activity);
      } else if (option === 'bulletin') {
        const { title, value, weight, type } = req.body;
        const bulletin = new Bulletin({ title, value, weight, type });
        discipline.setBulletins(bulletin);
      } else if (option === 'media') {
        const { title, link, type } = req.body;
        const media = new Media({ title, link, type });
        discipline.setMedias(media);
      } else if (option === 'work') {
        const { title, content, note, bulletinId } = req.body;
        const work = new Work({ title, content, note, bulletinId });
        discipline.setWorkers(work);
      } else if (option === 'resume') {
        const { title, content } = req.body;
        const resume = new Resume({ title, content });
        discipline.setResumes(resume);
      } else if (option === 'todo') {
        const { title, content, status } = req.body;
        const todo = new TODOs({ title, content, status });
        discipline.setTODOs(todo);
      } else if (option === 'unity') {
        const { title } = req.body;
        const unity = new Unity({ title });
        discipline.setUnities(unity);
      } else {
        return res.status(400).json({ message: 'Opção inválida' });
      }

      course.updateDiscipline(discipline);
      const { data, error } = await connection.from('Courses').update(course).match({ id: course.getId(), userId: user.getId() }).single();
      if (error) return res.status(400).json({ message: 'Erro ao cadastrar', error });

      App.set('course', course);
      App.set('period', period);
      App.set('discipline', discipline);

      return res.redirect(`/disciplines/discipline/${discipline.getId()}`);
    });

    this.router.post('/bulletins/update', async (req: Request, res: Response) => {
      const notes = req.body;
      const user = new User(App.get('user'));
      const course = new Course(App.get('course'));
      const period = new Period(App.get('period'));
      let discipline = new Discipline(App.get('discipline'));

      const bulletins = Object.keys(notes).map((note: any) => {
        let bulletin = notes[note];
        return new Bulletin({ title: bulletin.title, value: bulletin.value, weight: bulletin.weight, type: bulletin.type });
      });

      discipline = discipline.updateBulletins(bulletins);
      course.updateDiscipline(discipline);
      
      const { data, error } = await connection.from('Courses').update(course).match({ id: course.getId(), userId: user.getId() }).single();
      if (error) return res.status(400).json({ message: 'Erro ao atualizar', error });

      App.set('course', course);
      App.set('period', period);
      App.set('discipline', discipline);

      return res.redirect(`/disciplines/discipline/${discipline.getId()}`);
    });
  }
}

export default new DisciplineRoutes().router;