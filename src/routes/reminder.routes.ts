import { Router, Request, Response } from "express";
import App from "../App";

import { connection } from "../database/connection";

import { User } from "../models/User";
import { Course } from "../models/Course";
import { Period } from "../models/Period";
import { Discipline } from "../models/Discipline";
import { Reminder } from "../models/Reminder";

const item = "item-7";

class ReminderRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.post("/create", async (req: Request, res: Response) => {
      const { title, content, status, concludedAt } = req.body;

      if (!title || !content || !status || !concludedAt)
        return res.redirect(`/discipline/#${item}`);

      if (!App.get("course")) return res.redirect("/courses");
      if (!App.get("period")) return res.redirect("/course");
      if (!App.get("discipline")) return res.redirect("/period");

      const user = new User(App.get("user")),
        course = new Course(App.get("course")),
        period = new Period(App.get("period")),
        discipline = new Discipline(App.get("discipline"));

      const reminder = new Reminder({
        title,
        content,
        status,
        concludedAt,
      });

      discipline.setReminder(reminder);
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
      const { title, content, status, concludedAt } = req.body;

      const { id } = req.params;

      if (!id || !title || !content || !status || !concludedAt)
        return res.redirect(`/discipline/#${item}`);

      if (!App.get("course")) return res.redirect("/courses");
      if (!App.get("period")) return res.redirect("/course");
      if (!App.get("discipline")) return res.redirect("/period");

      const user = new User(App.get("user")),
        course = new Course(App.get("course")),
        period = new Period(App.get("period")),
        discipline = new Discipline(App.get("discipline")),
        reminderEditing = new Reminder(discipline.getReminderById(id));

      if (title) reminderEditing.setTitle(title);
      if (content) reminderEditing.setContent(content);
      if (status) reminderEditing.setStatus(status);
      if (concludedAt) reminderEditing.setConcludedAt(concludedAt);
      
      discipline.updateReminderById(id, reminderEditing);
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

      discipline.deleteReminderById(id);
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

export default new ReminderRoutes().router;
