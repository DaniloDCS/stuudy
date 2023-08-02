import App from "../App";

import { Router, Request, Response } from "express";
import { connection } from "../database/connection";

import { User } from "../models/User";
import { Course } from "../models/Course";
import { Period } from "../models/Period";
import { Discipline, Teacher } from "../models/Discipline";

function capitalizeFirstLetter(string: string) {
  if (!string) return "";

  return string
    .toLowerCase()
    .trim()
    .split(" ")
    .map((word) => {
      if (
        word === "de" ||
        word === "da" ||
        word === "do" ||
        word === "dos" ||
        word === "das" ||
        word === "e" ||
        word === "em"
      )
        return word;
      if (
        word === "i" ||
        word === "ii" ||
        word === "iii" ||
        word === "iv" ||
        word === "v"
      )
        return word.toUpperCase();
      return word[0].toUpperCase() + word.slice(1);
    })
    .join(" ");
}

class DisciplineRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.get("/d/:id", async (req: Request, res: Response) => {
      const { id } = req.params,
        user = new User(App.get("user"));

      if (!App.get("course")) return res.redirect("/courses");
      if (!App.get("period")) return res.redirect("/course");

      const course = new Course(App.get("course")),
        period = new Period(App.get("period")),
        discipline = new Discipline(period.getDiscipline(id));

      if (!discipline) return res.redirect("/period");

      App.set("discipline", discipline);

      return res.redirect("/discipline");
    });

    this.router.get("/", async (req: Request, res: Response) => {
      const user = new User(App.get("user"));

      if (!App.get("course")) return res.redirect("/courses");
      if (!App.get("period")) return res.redirect("/course");
      if (!App.get("discipline")) return res.redirect("/period");

      const course = new Course(App.get("course")),
        period = new Period(App.get("period")),
        discipline = new Discipline(App.get("discipline"));

      return res.render("pages/discipline", {
        title: discipline.getName(),
        user,
        course,
        period,
        discipline,
      });
    });

    this.router.get("/conclude", async (req: Request, res: Response) => {
      if (!App.get("course")) return res.redirect("/courses");
      if (!App.get("period")) return res.redirect("/course");
      if (!App.get("discipline")) return res.redirect("/period");

      const user = new User(App.get("user")),
        course = new Course(App.get("course")),
        period = new Period(App.get("period")),
        discipline = new Discipline(App.get("discipline"));

      if (discipline.getMedia() >= 7 && discipline.getMedia() <= 10)
        discipline.setStatus("Aprovado");
      else discipline.setStatus("Reprovado");

      period.updateDiscipline(discipline);
      course.updatePeriod(period);
      course.setWorkloadAndCredits();

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

      return res.redirect("/discipline/d/" + discipline.getId());
    });

    this.router.post("/update", async (req: Request, res: Response) => {
      const { name, icon, code, credits, workload, teachers } = req.body;

      if (!name || !code || !credits || !workload)
        return res.status(400).json({ message: "Dados inválidos" });
      if (!App.get("course")) return res.redirect("/courses");
      if (!App.get("period")) return res.redirect("/course");
      if (!App.get("discipline")) return res.redirect("/period");

      const user = new User(App.get("user")),
        course = new Course(App.get("course")),
        period = new Period(App.get("period")),
        discipline = new Discipline(App.get("discipline"));

      if (name) discipline.setName(capitalizeFirstLetter(name));
      if (icon) discipline.setIcon(icon);
      if (code) discipline.setCode(code);
      if (credits) discipline.setCredits(credits);
      if (workload) discipline.setWorkload(workload);
      if (teachers)
        discipline.setTeachers(
          teachers.map(
            (teacher: string) =>
              new Teacher({ name: capitalizeFirstLetter(teacher) })
          )
        );

      period.updateDiscipline(discipline);
      course.updatePeriod(period);
      course.setWorkloadAndCredits();

      const { data, error } = await connection
        .from("Courses")
        .update(course)
        .match({ id: course.getId(), userId: user.getId() })
        .single();
      if (error)
        return res
          .status(400)
          .json({ message: "Erro ao atualizar disciplina", error });

      App.set("course", course);
      App.set("period", period);
      App.set("discipline", discipline);

      return res.redirect("/discipline/d/" + discipline.getId());
    });

    this.router.post("/register", async (req: Request, res: Response) => {
      const { name, icon, code, credits, workload, teachers } = req.body;

      if (!name || !code || !credits || !workload)
        return res.status(400).json({ message: "Dados inválidos" });

      if (!App.get("course")) return res.redirect("/courses");
      if (!App.get("period")) return res.redirect("/course");

      const user = new User(App.get("user")),
        course = new Course(App.get("course")),
        period = new Period(App.get("period"));
      const discipline = new Discipline({
        name: capitalizeFirstLetter(name),
        icon,
        code,
        credits,
        workload,
        teachers: teachers.map(
          (teacher: string) =>
            new Teacher({ name: capitalizeFirstLetter(teacher) })
        ),
        periodId: period.getId(),
      });

      period.setDiscipline(discipline);
      course.updatePeriod(period);
      course.setWorkloadAndCredits();

      const { data, error } = await connection
        .from("Courses")
        .update(course)
        .match({ id: course.getId(), userId: user.getId() })
        .single();
      if (error)
        return res
          .status(400)
          .json({ message: "Erro ao cadastrar disciplina", error });

      App.set("course", course);
      App.set("period", period);
      App.set("discipline", discipline);

      return res.redirect("/discipline/d/" + discipline.getId());
    });

    this.router.get("/delete", async (req: Request, res: Response) => {
      if (!App.get("course")) return res.redirect("/courses");
      if (!App.get("period")) return res.redirect("/course");
      if (!App.get("discipline")) return res.redirect("/period");
      
      
      const user = new User(App.get("user")),
        course = new Course(App.get("course")),
        period = new Period(App.get("period")),
        discipline = new Discipline(App.get("discipline"));

      period.deleteDiscipline(discipline.getId());
      course.updatePeriod(period);
      course.setWorkloadAndCredits();

      const { data, error } = await connection
        .from("Courses")
        .update(course)
        .match({ id: course.getId(), userId: user.getId() })
        .single();
      if (error)
        return res
          .status(400)
          .json({ message: "Erro ao deletar disciplina", error });

      App.set("course", data);
      App.set("period", period);
      App.set("discipline", null);

      return res.redirect("/period/p/" + period.getId());
    });
  }
}

export default new DisciplineRoutes().router;
