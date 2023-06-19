import { Router, Request, Response } from 'express';
import App from '../App';
import { connection } from '../database/connection';
import { User } from '../models/User';
import { Course, ICourse } from '../models/Course';

class CourseRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.get('/', async (req: Request, res: Response) => {
      const user = new User(App.get('user'));

      const { data: courses, error } = await connection.from('Courses').select('*').match({ userId: user.getId() });

      return res.render('pages/courses', {
        title: 'Cursos',
        user,
        courses
      });
    });

    this.router.get('/course/:id', async (req: Request, res: Response) => {
      const user = new User(App.get('user'));
      const { id } = req.params;

      const { data: courses, error } = await connection.from('Courses').select('*').match({ id, userId: user.getId() });
      if (error) return res.redirect('/courses');

      const course = new Course(courses[0]);
      App.set('course', course);

      return res.render('pages/course', {
        title: course.getName(),
        user,
        course
      });
    });

    this.router.post('/register', async (req: Request, res: Response) => {
      const user = new User(App.get('user'));
      const { name, icon, description, university, location, status, level, type, startedIn, finishedIn } = req.body;

      if (!name || !icon || !description || !university || !location || !status || !level || !type || !startedIn || !finishedIn) return res.json({ error: 'Preencha todos os campos!' });

      const course = new Course({ name, icon, description, university, location, status, level, type, startedIn, finishedIn, userId: user.getId() });
      const { data: newCourse, error: courseError } = await connection.from('Courses').insert(course);

      if (courseError) return res.json({ error: courseError });

      return res.redirect('/courses/course/' + course.getId());
    });

    this.router.delete('/delete/:id', async (req: Request, res: Response) => {
      const { id } = req.params;
      const { data: courses, error: coursesError } = await connection.from('Courses').delete().match({ id });
      return res.redirect('/courses');
    });

    this.router.put('/edit/:id', async (req: Request, res: Response) => {
      const { id } = req.params;
      const { userId, name, icon, description, university, location, status, level, type, startedIn, finishedIn }: ICourse = req.body;
      const user = new User(App.get('user'));

      const { data: courses, error: coursesError } = await connection.from('Courses').update({ userId, name, icon, description, university, location, status, level, type, startedIn, finishedIn }).match({ id });
      if (coursesError) return res.render('pages/courses', { title: 'Courses', user, courses, error: coursesError });

      return res.redirect('/courses');
    });
  }
}

export default new CourseRoutes().router;