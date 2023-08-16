import { Router, Request, Response } from "express";
import App from "../App";
import { connection } from "../database/connection";
import { Course } from "../models/Course";
import { Period } from "../models/Period";
import { User } from "../models/User";

class PeriodRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.get("/p/:id", async (req: Request, res: Response) => {
      const { id } = req.params,
        user = new User(App.get("user"));

      if (!App.get("course")) return res.redirect("/courses");

      const course = new Course(App.get("course"));
      let period = course.getPeriod(id);

      if (!period) return res.redirect("/courses/");

      period = new Period(period);

      App.set("period", period);

      return res.redirect("/period");
    });

    this.router.get("/", async (req: Request, res: Response) => {
      const user = new User(App.get("user"));

      if (!App.get("course")) return res.redirect("/courses");
      if (!App.get("period")) return res.redirect("/course");

      const course = new Course(App.get("course")),
        period = App.get("period");

      return res.render("pages/period", {
        title: period.getName(),
        user,
        course,
        period,
      });
    });

    this.router.post("/register", async (req: Request, res: Response) => {
      const { name, icon, status } = req.body,
        user = new User(App.get("user")),
        course = new Course(App.get("course"));

      if (!name || !status || !course) return res.redirect("/course");

      const period = new Period({
        name,
        icon,
        status,
      });

      course.setPeriod(period);

      const { data, error } = await connection
        .from("Courses")
        .update(course)
        .match({ id: course.getId(), userId: user.getId() })
        .single();
      if (error)
        return res
          .status(400)
          .json({ message: "Erro ao cadastrar período", error });

      App.set("course", data);
      App.set("period", period);

      return res.redirect("/period");
    });

    this.router.post("/update", async (req: Request, res: Response) => {
      const { name, icon, status } = req.body;

      if (!App.get("course")) return res.redirect("/courses");
      if (!App.get("period")) return res.redirect("/course");

      const user = new User(App.get("user")),
        course = new Course(App.get("course"));

      let period = new Period(App.get("period"));

      if (name) period.setName(name);
      if (icon) period.setIcon(icon);
      if (status) period.setStatus(status);

      course.updatePeriod(period);

      const { data, error } = await connection
        .from("Courses")
        .update(course)
        .match({ id: course.getId(), userId: user.getId() })
        .single();
      if (error)
        return res
          .status(400)
          .json({ message: "Erro ao atualizar período", error });

      App.set("course", data);
      App.set("period", period);

      return res.redirect('/period/p/' + period.getId());
    });

    this.router.get("/delete", async (req: Request, res: Response) => {
      const user = new User(App.get("user"));

      if (!App.get("course")) return res.redirect("/courses");
      if (!App.get("period")) return res.redirect("/course");

      const course = new Course(App.get("course")),
       period = new Period(App.get("period"));

      course.deletePeriod(period.getId());

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
      App.set("period", {});

      return res.redirect("/course/c/" + course.getId());
    });

    this.router.get("/conclude", async (req: Request, res: Response) => {
      const user = new User(App.get("user"));

      if (!App.get("course")) return res.redirect("/courses");
      if (!App.get("period")) return res.redirect("/course");

      const course = new Course(App.get("course")),
        period = new Period(App.get("period"));

      period.setStatus("Concluído");
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
          .json({ message: "Erro ao remover período", error });

      App.set("course", data);
      App.set("period", period);

      return res.redirect("/course/c/" + course.getId());
    });
  }
}

export default new PeriodRoutes().router;
