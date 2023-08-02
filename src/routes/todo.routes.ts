import { Router, Request, Response } from "express";
import App from "../App";

import { connection } from "../database/connection";

import { User } from "../models/User";
import { Course } from "../models/Course";
import { Period } from "../models/Period";
import { Discipline } from "../models/Discipline";
import { TODO } from "../models/TODO";

const item = "item-9";

class TODORoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.post("/create", async (req: Request, res: Response) => {
      const { title, content, status, finishIn } = req.body;

      if (!title || !content || !status || !finishIn)
        return res.redirect(`/discipline/#${item}`);

      if (!App.get("course")) return res.redirect("/courses");
      if (!App.get("period")) return res.redirect("/course");
      if (!App.get("discipline")) return res.redirect("/period");

      const user = new User(App.get("user")),
        course = new Course(App.get("course")),
        period = new Period(App.get("period")),
        discipline = new Discipline(App.get("discipline"));

      const todo = new TODO({
        title,
        content,
        status,
        finishIn,
      });

      discipline.setTODO(todo);
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
        todoEditing = new TODO(discipline.getTodoById(id));

      if (title) todoEditing.setTitle(title);
      if (content) todoEditing.setContent(content);
      if (status) todoEditing.setStatus(status);
      if (concludedAt) todoEditing.setConcludedAt(concludedAt);
      
      discipline.updateTODOById(id, todoEditing);
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

      discipline.deleteTODOById(id);
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

    this.router.post("/editing", async (req: Request, res: Response) => {
      const { content, periodId, disciplineId, todoId } = req.body;

      if (!content || !disciplineId || !periodId || !todoId)
        return res.status(400).json({ message: "Dados inválidos" });

      if (!App.get("course")) return res.redirect("/courses");
      if (!App.get("period")) return res.redirect("/course");
      if (!App.get("discipline")) return res.redirect("/period");

      const user = new User(App.get("user")),
        course = new Course(App.get("course")),
        period = new Period(App.get("period")),
        discipline = new Discipline(App.get("discipline"));

      const todoEditing = new TODO(
        discipline.getTodoById(todoId)
      );

      todoEditing.setContent(content);
      discipline.updateTODOById(todoId, todoEditing);
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

export default new TODORoutes().router;
