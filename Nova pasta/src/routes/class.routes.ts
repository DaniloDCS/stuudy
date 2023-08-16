import { Router, Request, Response } from "express";
import App from "../App";

import { connection } from "../database/connection";

import { Course } from "../models/Course";
import { Period } from "../models/Period";
import { Discipline } from "../models/Discipline";
import { Class } from "../models/Class";
import { User } from "../models/User";
import { Unity } from "../models/Unity";

class ClassRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.post("/create", async (req: Request, res: Response) => {
      const { title, content, quantity, date, IWasPresent, type, unityId } =
        req.body;

      if (!title || !content || !quantity || !date)
        return res.redirect("/discipline/#item-1");

      if (!App.get("course")) return res.redirect("/courses");
      if (!App.get("period")) return res.redirect("/course");
      if (!App.get("discipline")) return res.redirect("/period");

      const user = new User(App.get("user")),
        course = new Course(App.get("course")),
        period = new Period(App.get("period")),
        discipline = new Discipline(App.get("discipline"));

      const class_ = new Class({
        title,
        content,
        quantity,
        date,
        IWasPresent,
        type,
      });

      discipline.setClass(unityId, class_);
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

      return res.redirect(`/discipline/d/${discipline.getId()}/#item-1`);
    });

    this.router.post("/update/:id", async (req: Request, res: Response) => {
      const hash = "item-1";

      const {
        title,
        content,
        quantity,
        date,
        IWasPresent,
        type,
        unityId,
        oldUnityId,
      } = req.body;

      const { id } = req.params;

      if (!id || !unityId || !oldUnityId)
        return res.redirect("/discipline/#" + hash);

      if (!App.get("course")) return res.redirect("/courses");
      if (!App.get("period")) return res.redirect("/course");
      if (!App.get("discipline")) return res.redirect("/period");

      const user = new User(App.get("user")),
        course = new Course(App.get("course")),
        period = new Period(App.get("period")),
        discipline = new Discipline(App.get("discipline")),
        unity = new Unity(discipline.getUnity(oldUnityId)),
        classEditing = new Class(unity.getClassById(id));

      if (!classEditing) return res.redirect("/discipline/#" + hash);

      if (title) classEditing.setTitle(title);
      if (content) classEditing.setContent(content);
      if (quantity) classEditing.setQuantity(Number(quantity));
      if (date) classEditing.setDate(date);
      if (IWasPresent) classEditing.setIWasPresent(IWasPresent);
      if (type) classEditing.setType(type);

      if (oldUnityId !== unityId) {
        discipline.deleteClassById(oldUnityId, id);
        discipline.setClass(unityId, classEditing);
      } else {
        discipline.updateClassById(unityId, classEditing);
      }

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

      return res.redirect("/discipline/#" + hash);
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
        discipline = new Discipline(App.get("discipline")),
        unityId = discipline.getUnityIdByClassId(id);

      if (!unityId) return res.redirect("/discipline/#item-1");

      const unity = new Unity(discipline.getUnity(unityId));
      unity.deleteClassById(id);
      discipline.updateUnitiesById(unityId, unity);
      period.updateDiscipline(discipline);
      course.updatePeriod(period);
      course.setWorkloadAndCredits();

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

      return res.redirect("/discipline/d/" + discipline.getId());
    });

    this.router.post("/editing", async (req: Request, res: Response) => {
      const { content, disciplineId, classId, unityId } = req.body;

      if (!content || !disciplineId || !classId || !unityId)
        return res.status(400).json({ message: "Dados inválidos" });

      if (!App.get("course")) return res.redirect("/courses");
      if (!App.get("period")) return res.redirect("/course");
      if (!App.get("discipline")) return res.redirect("/period");

      const user = new User(App.get("user")),
        course = new Course(App.get("course")),
        period = new Period(App.get("period")),
        discipline = new Discipline(App.get("discipline")),
        unity = new Unity(discipline.getUnity(unityId));

      const classEditing = new Class(unity.getClassById(classId));

      classEditing.setContent(content);
      unity.updateClassById(classId, classEditing);
      discipline.updateUnitiesById(unityId, unity);
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

export default new ClassRoutes().router;
