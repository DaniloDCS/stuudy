import { Router, Request, Response } from "express";
import App from "../App";

import { connection } from "../database/connection";

import { User } from "../models/User";
import { Doc } from "../models/Doc";

class ActivityRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.get("/new", async (req: Request, res: Response) => {
      const user = new User(App.get("user"));

      const doc = new Doc({ userId: user.getId() });

      const { data, error } = await connection.from("Docs").insert(doc);

      App.set("doc", doc);

      return res.redirect(`/docs/doc`);
    });

    this.router.get("/", async (req: Request, res: Response) => {
      const user = new User(App.get("user"));

      const { data, error } = await connection
        .from("Docs")
        .select("*")
        .match({ userId: user.getId() });

      return res.render("apps/docs", { title: 'Documents', docs: data, user });
    });

    this.router.get("/get/:id", async (req: Request, res: Response) => {
      const user = new User(App.get("user")),
        id = req.params.id;

      const { data, error } = await connection
        .from("Docs")
        .select("*")
        .match({ userId: user.getId(), id });
      if (error) return res.redirect("/docs");

      const doc = new Doc({
        id,
        userId: user.getId(),
        title: data[0].title,
        content: data[0].content,
      });

      App.set("doc", doc);

      return res.redirect(`/docs/doc`);
    });

    this.router.get("/doc", async (req: Request, res: Response) => {
      const user = new User(App.get("user"));

      if (!App.get("doc") || !user) return res.redirect("/docs");

      const doc = new Doc(App.get("doc"));

      return res.render("apps/doc", { title: doc.getTitle(), doc, user });
    });

    this.router.post("/update", async (req: Request, res: Response) => {
      const { id, title, content } = req.body;

      if (!id)
        return res.json({ message: "Dados inválidos" });

      const user = new User(App.get("user"));

      const doc = new Doc({ id, userId: user.getId(), title, content });

      const { data, error } = await connection.from("Docs").update(doc).match({ id });

      if (error)
        return res.json({
          status: "error",
          message: "Erro ao atualizar",
          error,
        });
      else
        App.set("doc", doc);
        return res.json({
          status: "success",
          message: "Atualizado com sucesso",
        });
    });

    this.router.get("/delete/:id", async (req: Request, res: Response) => {
      const { id } = req.params,
        user = new User(App.get("user"));

      if (!id) return res.redirect("/docs");

      const { data, error } = await connection
        .from("Docs")
        .delete()
        .match({ id, userId: user.getId() });

      if (error)
        return res
          .status(400)
          .json({ status: "error", message: "Erro ao deletar", error });

      return res.redirect(`/docs`);
    });
  }
}

export default new ActivityRoutes().router;
