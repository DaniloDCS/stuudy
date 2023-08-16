import { Router, Request, Response } from "express";
import App from "../App";

import { connection } from "../database/connection";

import { Course } from "../models/Course";
import { Period } from "../models/Period";
import { Discipline } from "../models/Discipline";
import { User } from "../models/User";
import { Bulletin } from "../models/Bulletin";

class BulletinRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.post("/", async (req: Request, res: Response) => {
      const notes = req.body;

      if (!App.get("course")) return res.redirect("/courses");
      if (!App.get("period")) return res.redirect("/course");
      if (!App.get("discipline")) return res.redirect("/period");
      if (!notes) return res.redirect("/discipline/#item-2");

      const user = new User(App.get("user")),
        course = new Course(App.get("course")),
        period = new Period(App.get("period")),
        discipline = new Discipline(App.get("discipline"));

      const bulletins = Object.keys(notes).map((note: any) => {
        let bulletin = notes[note];
        return new Bulletin({
          title: bulletin.title,
          value: bulletin.value,
          weight: bulletin.weight,
          type: bulletin.type,
        });
      });

      discipline.updateBulletins(bulletins);
      period.updateDiscipline(discipline);
      course.updatePeriod(period);
      course.setWorkloadAndCredits();

      const { data, error } = await connection
        .from("Courses")
        .update(course)
        .match({ id: course.getId(), userId: user.getId() })
        .single();
      if (error)
        return res.status(400).json({ message: "Erro ao atualizar", error });

      App.set("course", course);
      App.set("period", period);
      App.set("discipline", discipline);

      return res.redirect("/discipline/#item-2");
    });
  }
}

export default new BulletinRoutes().router;
