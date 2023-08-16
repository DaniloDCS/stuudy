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
    this.router.get('/c/:id', async (req: Request, res: Response) => {
      const user = new User(App.get('user'));
      const { id } = req.params;

      const { data: courses, error } = await connection.from('Courses').select('*').match({ id, userId: user.getId() });
      if (error) return res.redirect('/courses');

      const course = new Course(courses[0]);
      App.set('course', course);

      return res.redirect('/course');
    });

    this.router.get("/", async (req: Request, res: Response) => {
      if (!App.get("course")) return res.redirect("/courses");

      const user = new User(App.get("user"));
      const course = new Course(App.get("course"));

      return res.render("pages/course", {
        title: course.getName(),
        user,
        course,
      });
    });

    this.router.get("/delete/", async (req: Request, res: Response) => {
      if (!App.get("course")) return res.redirect("/courses");

      const user = new User(App.get("user"));
      const course = new Course(App.get("course"));

      const { data, error } = await connection
        .from("Courses")
        .delete()
        .match({ id: course.getId(), userId: user.getId() });
        
      if (error) return res.json({ error });

      App.set("course", null);

      return res.redirect("/courses");
    });

    this.router.post("/update", async (req: Request, res: Response) => {
      if (!App.get("course")) return res.redirect("/courses");

      const user = new User(App.get("user"));
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

      const course = new Course(App.get("course"));

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

      const { data: newCourse, error: courseError } = await connection
        .from("Courses")
        .update(course)
        .match({ id: course.getId(), userId: user.getId() });

      if (courseError) return res.json({ error: courseError });

      App.set("course", course);

      return res.redirect("/course");
    });

    this.router.post('/register', async (req: Request, res: Response) => {
      const user = new User(App.get('user'));
      const { name, icon, description, university, location, status, level, type, startedIn, finishedIn } = req.body;

      if (!name || !icon || !description || !university || !location || !status || !level || !type || !startedIn || !finishedIn) return res.json({ error: 'Preencha todos os campos!' });

      const course = new Course({ name, icon, description, university, location, status, level, type, startedIn, finishedIn, userId: user.getId() });
      const { data: newCourse, error: courseError } = await connection.from('Courses').insert(course);

      if (courseError) return res.json({ error: courseError });

      App.set('course', course);

      return res.redirect('/course');
    });

    this.router.get("/conclude", async (req: Request, res: Response) => {
      const user = new User(App.get("user"));

      if (!App.get("course")) return res.redirect("/courses");

      const course = new Course(App.get("course"));	

      course.setStatus("Concluído");
      course.setWorkloadAndCredits();

      const { data, error } = await connection
        .from("Courses")
        .update(course)
        .match({ id: course.getId(), userId: user.getId() })
        .single();
      if (error)
        return res
          .status(400)
          .json({ message: "Erro ao remover período", error });

      App.set("course", data);

      return res.redirect("/course/c/" + course.getId());
    });
  }
}

export default new CourseRoutes().router;