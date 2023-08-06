import { Router, Request, Response } from "express";
import { User } from "../models/User";
import { Notifies, Notify } from "../models/Notify";
import { connection } from "../database/connection";
import App from "../App";

class AppsRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.get("/", async (req: Request, res: Response) => {
      const user = new User(App.get("user"));

      const { data, error: erroNotifies } = await connection
        .from("Notifies")
        .select("*")
        .match({ userId: user.getId() });
      if (erroNotifies)
        return res.status(500).json({
          message: "Notificações não encontradas",
          error: erroNotifies,
        });

      const notifies = new Notifies({
        userId: user.getId(),
        notifies:
          data[0]?.notifies.map((notify: any) => new Notify(notify)) || [],
      });

      const { data: courses, error: errorCourses } = await connection
        .from("Courses")
        .select("*")
        .match({ userId: user.getId() });
      if (errorCourses)
        return res
          .status(500)
          .json({ message: "Erro ao buscar cursos", error: errorCourses });

      const { data: supports, error: errorSupports } = await connection
        .from("Supports")
        .select("*")
        .match({ userId: user.getId() });
      if (errorSupports)
        return res
          .status(500)
          .json({ message: "Erro ao buscar suportes", error: errorSupports });

      const { data: friends, error: errorFriends } = await connection
        .from("Friends")
        .select(
          "id, recipient, sender, from:sender(id, name, username, email, avatar, accesses), to:recipient(id, name, username, email, avatar, accesses)"
        )
        .or(`recipient.eq.${user.getId()},and(sender.eq.${user.getId()})`)
        .order("updatedAt", { ascending: false });
      if (errorFriends)
        return res
          .status(500)
          .json({ message: "Erro ao buscar amigos", error: errorFriends });

      let todos: any = [];

      courses.forEach((course: any) => {
        course.periods.forEach((period: any) => {
          period.disciplines.forEach((discipline: any) => {
            discipline.TODOs.forEach((todo: any) => {
              todos.push({
                course: {
                  id: course.id,
                  title: course.name,
                  icon: course.icon,
                },
                period: {
                  id: period.id,
                  title: period.name,
                },
                discipline: {
                  id: discipline.id,
                  title: discipline.name,
                  icon: discipline.icon,
                },
                todo,
              });
            });
          });
        });
      });

      todos = todos.sort((a: any, b: any) => {
        if (a.todo.finishIn > b.todo.finishIn) return 1;
        if (a.todo.finishIn < b.todo.finishIn) return -1;
        return 0;
      });

      return res.render("pages/apps", {
        title: "Aplicativos",
        user,
        notifies,
        supports,
        friends,
        todos,
      });
    });

    this.router.get("/:option", async (req: Request, res: Response) => {
      const user = new User(App.get("user"));

      const { data, error: erroNotifies } = await connection
        .from("Notifies")
        .select("*")
        .match({ userId: user.getId() });
      if (erroNotifies)
        return res.status(500).json({
          message: "Notificações não encontradas",
          error: erroNotifies,
        });

      const notifies = new Notifies({
        userId: user.getId(),
        notifies:
          data[0]?.notifies.map((notify: any) => new Notify(notify)) || [],
      });

      const { data: courses, error: errorCourses } = await connection
        .from("Courses")
        .select("*")
        .match({ userId: user.getId() });
      if (errorCourses)
        return res
          .status(500)
          .json({ message: "Erro ao buscar cursos", error: errorCourses });

      const { data: supports, error: errorSupports } = await connection
        .from("Supports")
        .select("*")
        .match({ userId: user.getId() });
      if (errorSupports)
        return res
          .status(500)
          .json({ message: "Erro ao buscar suportes", error: errorSupports });

      const { data: friends, error: errorFriends } = await connection
        .from("Friends")
        .select(
          "id, recipient, sender, from:sender(id, name, username, email, avatar, accesses), to:recipient(id, name, username, email, avatar, accesses)"
        )
        .or(`recipient.eq.${user.getId()},and(sender.eq.${user.getId()})`)
        .order("updatedAt", { ascending: false });
      if (errorFriends)
        return res
          .status(500)
          .json({ message: "Erro ao buscar amigos", error: errorFriends });

      let todos: any = [];

      courses.forEach((course: any) => {
        course.periods.forEach((period: any) => {
          period.disciplines.forEach((discipline: any) => {
            discipline.TODOs.forEach((todo: any) => {
              todos.push({
                course: {
                  id: course.id,
                  title: course.name,
                  icon: course.icon,
                },
                period: {
                  id: period.id,
                  title: period.name,
                },
                discipline: {
                  id: discipline.id,
                  title: discipline.name,
                  icon: discipline.icon,
                },
                todo,
              });
            });
          });
        });
      });

      todos = todos.sort((a: any, b: any) => {
        if (a.todo.finishIn > b.todo.finishIn) return 1;
        if (a.todo.finishIn < b.todo.finishIn) return -1;
        return 0;
      });

      const option = req.params.option;

      return res.render(`apps/${option}`, {
        title: option,
        user,
        notifies,
        supports,
        friends,
        todos,
      });
    });

  }
}

export default new AppsRoutes().router;
