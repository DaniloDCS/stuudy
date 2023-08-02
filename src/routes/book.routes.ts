import { Router, Request, Response } from "express";
import App from "../App";

import { connection } from "../database/connection";

import { User } from "../models/User";
import { Course } from "../models/Course";
import { Period } from "../models/Period";
import { Discipline } from "../models/Discipline";
import { Book } from "../models/Book";

const item = "item-6"; 

class BookRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.post("/create", async (req: Request, res: Response) => {
      const { title, link } = req.body;

      if (!title || !link)
        return res.redirect(`/discipline/#${item}`);

      if (!App.get("course")) return res.redirect("/courses");
      if (!App.get("period")) return res.redirect("/course");
      if (!App.get("discipline")) return res.redirect("/period");

      const user = new User(App.get("user")),
        course = new Course(App.get("course")),
        period = new Period(App.get("period")),
        discipline = new Discipline(App.get("discipline"));

      const book = new Book({
        title,
        link
      });

      discipline.setBook(book);
      period.updateDiscipline(discipline);
      course.updatePeriod(period);

      const { data, error } = await connection
        .from("Courses")
        .update(course)
        .match({ id: course.getId(), userId: user.getId() })
        .single();
      if (error)
        return res.status(400).json({ message: "Erro ao cadastrar", error });

      App.set("course", course);
      App.set("period", period);
      App.set("discipline", discipline);

      return res.redirect(`/discipline/#${item}`);
    });

    this.router.post("/update/:id", async (req: Request, res: Response) => {
      const { title, link } = req.body;

      const { id } = req.params;

      if (!id || !title || !link)
        return res.redirect(`/discipline/#${item}`);

      if (!App.get("course")) return res.redirect("/courses");
      if (!App.get("period")) return res.redirect("/course");
      if (!App.get("discipline")) return res.redirect("/period");

      const user = new User(App.get("user")),
        course = new Course(App.get("course")),
        period = new Period(App.get("period")),
        discipline = new Discipline(App.get("discipline")),
        bookEditing = new Book(discipline.getBookById(id));

      if (title) bookEditing.setTitle(title);
      if (link) bookEditing.setLink(link);

      discipline.updateBookById(id, bookEditing);
      period.updateDiscipline(discipline);
      course.updatePeriod(period);

      const { data, error } = await connection
        .from("Courses")
        .update(course)
        .match({ id: course.getId(), userId: user.getId() })
        .single();
      if (error)
        return res.status(400).json({ message: "Erro ao cadastrar", error });

      App.set("course", course);
      App.set("period", period);
      App.set("discipline", discipline);

      return res.redirect(`/discipline/#${item}`);
    });

    this.router.get("/delete/:id", async (req: Request, res: Response) => {
      const { id } = req.params;

      if (!id) return res.redirect("/discipline/#item-1");
      if (!App.get("course")) return res.redirect("/courses");
      if (!App.get("period")) return res.redirect("/course");
      if (!App.get("discipline")) return res.redirect("/period");

      const user = new User(App.get("user")),
        course = new Course(App.get("course")),
        period = new Period(App.get("period")),
        discipline = new Discipline(App.get("discipline"));

      discipline.deleteBookById(id);
      period.updateDiscipline(discipline);
      course.updatePeriod(period);

      const { data, error } = await connection
        .from("Courses")
        .update(course)
        .match({ id: course.getId(), userId: user.getId() })
        .single();

      if (error)
        return res.status(400).json({ message: "Erro ao deletar", error });

      App.set("course", course);
      App.set("period", period);
      App.set("discipline", discipline);

      return res.redirect(`/discipline/#${item}`);
    });
  }
}

export default new BookRoutes().router;
