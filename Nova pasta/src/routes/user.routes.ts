import { Router, Request, Response } from 'express';
import App from '../App';
import { authenticate } from "../database/authenticate";
import { connection } from '../database/connection';
import { Notifies } from '../models/Notify';
import { Support, Supports, Response as Reply } from '../models/Support';
import { User } from '../models/User';

class UserRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.post('/settings', async (req: Request, res: Response) => {
      const { file } = req;
      const { username, name, biography } = req.body;

      if (file) console.log(file);

      return res.render('pages/settings', { title: 'Settings' });
    });

    this.router.put('/notify/:id', async (req: Request, res: Response) => {
      const { id } = req.params;
      const user = new User(App.get("user"));

      const { body } = await connection.from("Notifies").select("*").match({ userId: user.getId() }).limit(1) as any;
      if (!body.length) return res.status(404).json({ message: 'Notificações não encontradas' });

      const notifies = new Notifies(body[0]);
      notifies.readById(id);

      const { body: update, error } = await connection.from("Notifies").update(notifies).match({ userId: user.getId() });
      if (error) return res.status(500).json({ message: 'Erro ao atualizar notificações', error });

      return res.status(200).json({ message: 'Notificação atualizada com sucesso', status: 'success' });
    });

    this.router.put('/theme', async (req: Request, res: Response) => {
      const { theme } = req.body;
      const user = new User(App.get("user"));

      user.setTheme(theme);

      const { error } = await connection.from("Users").update(user).match({ id: user.getId() });
      if (error) return res.status(500).json({ message: 'Erro ao atualizar tema', error });

      App.set('user', user);

      return res.status(200).json({ message: 'Tema atualizado com sucesso', status: 'success' });
    });
  }

}

export default new UserRoutes().router;