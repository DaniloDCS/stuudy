import { Router, Request, Response } from "express";
import App from "../App";
import { authenticate } from "../database/authenticate";
import { connection } from "../database/connection";
import { Notifies, Notify } from "../models/Notify";
import { Support, Supports } from "../models/Support";
import { User } from "../models/User";

class OthersRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.get("/", async (req: Request, res: Response) => {
      return res.render("authenticate", { title: "Acesse sua conta" });
    });

    this.router.get(
      "/dashboard",
      authenticate().auth,
      async (req: Request, res: Response) => {
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
          .select("id, recipient, sender, from:sender(id, name, username, email, avatar, accesses), to:recipient(id, name, username, email, avatar, accesses)").or(`recipient.eq.${user.getId()},and(sender.eq.${user.getId()})`).order("updatedAt", { ascending: false })
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

        return res.render("pages/dashboard", {
          title: "Área de trabalho",
          user,
          notifies,
          supports,
          friends,
          todos,
        });
      }
    );

    this.router.get(
      "/courses",
      authenticate().auth,
      async (req: Request, res: Response) => {
        const user = new User(App.get("user"));

        const { data: courses, error } = await connection
          .from("Courses")
          .select("*")
          .match({ userId: user.getId() });

        return res.render("pages/courses", {
          title: "Cursos",
          user,
          courses,
        });
      }
    );

    this.router.get("/u/:username", async (req: Request, res: Response) => {
      const { username } = req.params;

      const { body } = (await connection
        .from("Users")
        .select("*")
        .match({ username })
        .limit(1)) as any;

      if (!body.length)
        return res.status(404).json({ message: "Usuário não encontrado" });

      const user = new User(body[0]);

      if (App.get("user")) {
        const me = new User(App.get("user"));

        if (me.getId() === user.getId()) return res.redirect("/me");
      } else {
        return res.render("pages/user", {
          title: username,
          account: user,
          user: false,
          isMyFriend: "not authenticated",
        });
      }

      const me = new User(App.get("user"));
      let isMyFriend = "not friends",
        relation = "";

      const { data: searchFriend, error: errorSearchFriend } = await connection
        .from("Friends")
        .select("id, from:sender(*), to:recipient(*)")
        .eq("recipient", user.getId())
        .eq("sender", me.getId());
      if (errorSearchFriend)
        return res
          .status(500)
          .json({ message: "Erro ao buscar amigos", errorSearchFriend });

      const { data: searchFriend2, error: errorSearchFriend2 } =
        await connection
          .from("Friends")
          .select("id, from:sender(*), to:recipient(*)")
          .eq("recipient", me.getId())
          .eq("sender", user.getId());
      if (errorSearchFriend2)
        return res
          .status(500)
          .json({ message: "Erro ao buscar amigos", errorSearchFriend2 });

      if (searchFriend.length > 0 || searchFriend2.length > 0) {
        isMyFriend = "friends";

        if (searchFriend.length > 0) relation = searchFriend[0].id;
        else if (searchFriend2.length > 0) relation = searchFriend2[0].id;
      } else if (searchFriend.length === 0 && searchFriend2.length === 0) {
        const { data: sendRequest, error: errorFriendRequest } =
          await connection
            .from("Solicitations")
            .select("*, from:senderId(*), to:recipientId(*)")
            .eq("recipientId", me.getId())
            .eq("senderId", user.getId());
        if (errorFriendRequest)
          return res.status(500).json({
            message: "Erro ao buscar solicitações de amizade",
            error: errorFriendRequest,
          });

        const { data: reciveRequest2, error: errorFriendRequest2 } =
          await connection
            .from("Solicitations")
            .select("*, from:senderId(*), to:recipientId(*)")
            .eq("recipientId", user.getId())
            .eq("senderId", me.getId());
        if (errorFriendRequest2)
          return res.status(500).json({
            message: "Erro ao buscar solicitações de amizade",
            error: errorFriendRequest,
          });

        if (sendRequest.length > 0) {
          isMyFriend = "friendship request received";
          relation = sendRequest[0].id;
        } else if (reciveRequest2.length > 0) {
          isMyFriend = "friendship request sent";
          relation = reciveRequest2[0].id;
        } else isMyFriend = "not friends";
      } else {
        isMyFriend = "not friends";
      }

      return res.render("pages/user", {
        title: username,
        account: user,
        user: me,
        relation,
        isMyFriend,
      });
    });

    this.router.get(
      "/me",
      authenticate().auth,
      async (req: Request, res: Response) => {
        const { username } = App.get("user");

        const { body } = (await connection
          .from("Users")
          .select("*")
          .match({ username })
          .limit(1)) as any;

        if (!body.length)
          return res.status(404).json({ message: "Usuário não encontrado" });

        const user = new User(body[0]);

        return res.render("pages/me", { title: "Meu perfil", user });
      }
    );

    this.router.get(
      "/chat",
      authenticate().auth,
      async (req: Request, res: Response) => {
        const user = new User(App.get("user"));

        return res.render("pages/chat", { title: "Chat", user });
      }
    );
  }
}

export default new OthersRoutes().router;
