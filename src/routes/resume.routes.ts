import { Router, Request, Response } from "express";
import App from "../App";

import { connection } from "../database/connection";

import { Course } from "../models/Course";
import { Period } from "../models/Period";
import { Discipline } from "../models/Discipline";
import { Resume } from "../models/Resume";
import { User } from "../models/User";

const item = "item-5";

class ResumeRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.post("/create", async (req: Request, res: Response) => {
      const { title, content } = req.body;

      if (!title || !content)
        return res.redirect(`/discipline/#${item}`);

      if (!App.get("course")) return res.redirect("/courses");
      if (!App.get("period")) return res.redirect("/course");
      if (!App.get("discipline")) return res.redirect("/period");

      const user = new User(App.get("user")),
        course = new Course(App.get("course")),
        period = new Period(App.get("period")),
        discipline = new Discipline(App.get("discipline"));

      const resume = new Resume({
        title,
        content        
      });

      discipline.setResume(resume);
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

      return res.redirect(`/discipline/${item}`);
    });

    this.router.post("/update/:id", async (req: Request, res: Response) => {
      const { title, content } = req.body;

      const { id } = req.params;

      if (!id || !title || !content)
        return res.redirect(`/discipline/#${item}`);

      if (!App.get("course")) return res.redirect("/courses");
      if (!App.get("period")) return res.redirect("/course");
      if (!App.get("discipline")) return res.redirect("/period");

      const user = new User(App.get("user")),
        course = new Course(App.get("course")),
        period = new Period(App.get("period")),
        discipline = new Discipline(App.get("discipline")),
        resumeEditing = new Resume(discipline.getResumeById(id));

      if (title) resumeEditing.setTitle(title);
      if (content) resumeEditing.setContent(content);

      discipline.updateResumeById(id, resumeEditing);
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

      return res.redirect(`/discipline/${item}`);
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

      discipline.deleteResumeById(id);
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

      return res.redirect(`/discipline/${item}`);
    });

    this.router.post("/editing", async (req: Request, res: Response) => {
      const { content, periodId, disciplineId, resumeId } = req.body;

      if (!content || !disciplineId || !periodId || !resumeId)
        return res.status(400).json({ message: "Dados inválidos" });

      if (!App.get("course")) return res.redirect("/courses");
      if (!App.get("period")) return res.redirect("/course");
      if (!App.get("discipline")) return res.redirect("/period");

      const user = new User(App.get("user")),
        course = new Course(App.get("course")),
        period = new Period(App.get("period")),
        discipline = new Discipline(App.get("discipline"));

      const resumeEditing = new Resume(discipline.getResumeById(resumeId));

      resumeEditing.setContent(content);
      discipline.updateResumeById(resumeId, resumeEditing);
      period.updateDiscipline(discipline);
      course.updatePeriod(period);

      const { data, error } = await connection
        .from("Courses")
        .update(course)
        .match({ id: course.getId(), userId: user.getId() });

      if (error)
        return res.status(400).json({ message: "Erro ao atualizar", error });

      App.set("course", course);
      App.set("period", period);
      App.set("discipline", discipline);

      return res.status(200).json({ message: "Atualizado com sucesso" });
    });
  }
}

export default new ResumeRoutes().router;
