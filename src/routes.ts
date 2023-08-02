import { Router, Request, Response } from "express";

import OthersRoutes from "./routes/others.routes";
import AuthenticateRoutes from "./routes/authentication.routes";
import AdminRoutes from "./routes/admin.routes";
import AppsRoutes from "./routes/apps.routes";
import UsersRoutes from "./routes/user.routes";
import SupportRoutes from "./routes/support.routes";
import FriendsRoutes from "./routes/friend.routes";
import PublishRoutes from "./routes/publish.routes";
import CourseRoutes from "./routes/course.routes";
import PeriodRoutes from "./routes/period.routes";
import DisciplineRoutes from "./routes/discipline.routes";
import UnityRoutes from "./routes/unity.routes";
import ClassRoutes from "./routes/class.routes";
import BulletinRoutes from "./routes/bulletin.routes";
import WorkRoutes from "./routes/work.routes";
import ActivityRoutes from "./routes/activity.routes";
import EvaluationRoutes from "./routes/evaluation.routes";
import BookRoutes from "./routes/book.routes";
import ResumeRoutes from "./routes/resume.routes";
import ReminderRoutes from "./routes/reminder.routes";
import TODORoutes from "./routes/todo.routes";

import { authenticate } from "./database/authenticate";
import { User } from "./models/User";
import App from "./App";
import { connection } from "./database/connection";
import { Book } from "./models/Book";
import { Class } from "./models/Class";
import { Course } from "./models/Course";
import { Period } from "./models/Period";
import { Discipline } from "./models/Discipline";
const { auth, onlyAdmins, connecting } = authenticate();

class Routes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.get("/rich", (req: Request, res: Response) => {
      return res.render("pages/rich", {
        title: "Rich Text Editor",
      });
    });

    this.router.use(connecting);
    this.router.use("/authenticate", AuthenticateRoutes);
    this.router.use("/", OthersRoutes);

    this.router.use("/users", auth, UsersRoutes);
    this.router.use("/admin", auth, onlyAdmins, AdminRoutes);
    this.router.use("/apps", auth, AppsRoutes);
    this.router.use("/support", auth, SupportRoutes);
    this.router.use("/friends", auth, FriendsRoutes);
    this.router.use("/publish", auth, PublishRoutes);
    this.router.use("/course", auth, CourseRoutes);
    this.router.use("/period", auth, PeriodRoutes);
    this.router.use("/discipline", auth, DisciplineRoutes);
    this.router.use("/unity", auth, UnityRoutes);
    this.router.use("/class", auth, ClassRoutes);
    this.router.use("/bulletin", auth, BulletinRoutes);
    this.router.use("/work", auth, WorkRoutes);
    this.router.use("/activity", auth, ActivityRoutes);
    this.router.use("/evaluation", auth, EvaluationRoutes);
    this.router.use("/book", auth, BookRoutes);
    this.router.use("/resume", auth, ResumeRoutes);
    this.router.use("/reminder", auth, ReminderRoutes);
    this.router.use("/TODO", auth, TODORoutes);

    this.router.post("/search", auth, async (req: Request, res: Response) => {
      const { search } = req.body;
      const user = new User(App.get("user")),
        course = new Course(App.get("course"));

      if (!search || !user || !course) return res.redirect("/");

      const classes: any[] = [],
        books: any[] = [];

      course.periods.forEach((period: Period) => {
        period.disciplines.forEach((discipline: Discipline) => {
          discipline.unities.forEach((unity) =>            
            unity.classes ? classes.push(...unity.classes.map((c) => {
              c.courseId = course.id;
              c.periodId = period.id;
              c.disciplineId = discipline.id;
              c.unityId = unity.id;
              return c;
            })) : null
          );

          if (discipline.books) books.push(...discipline.books);
        });
      });

      let classesResult: Class[] = classes,
        booksResult: Book[] = books;

      if (classes.length > 0) {
        classesResult = classes.filter((classe) => {
          if (classe?.content?.toLowerCase().includes(search.toLowerCase()))
            return classe;
        });
      }

      if (books.length > 0) {
        booksResult = books.filter((book) => {
          if (book?.title?.toLowerCase().includes(search.toLowerCase()))
            return book;
        });
      }

      return res.json({ classes: classesResult, books: booksResult });
    });
  }
}

export default new Routes().router;
