import { Router, Request, Response } from 'express';
import App from '../App';
import { authenticate } from "../database/authenticate";
import { connection } from '../database/connection';
import { Notifies, Notify } from '../models/Notify';
import { Support, Supports, Response as Reply } from '../models/Support';
import { User } from '../models/User';

class SupportRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {

    this.router.get('/', authenticate().auth, async (req: Request, res: Response) => {
      const user = new User(App.get("user"));

      const { body, error } = await connection.from("Supports").select("*, user:userId(id, name, email, username, avatar), attending:attendingBy(id, name, username, avatar, email), concluded:concludedBy(id, name, username, avatar, email)").match({ userId: user.getId() });

      if (error) return res.status(404).json({ message: 'Usuário não encontrado' });

      return res.render('pages/supports', { title: 'Central de ajuda', user, supports: body });
    });

    this.router.post('/register', async (req: Request, res: Response) => {
      const { title, description }: { title: string, description: string } = req.body;
      const user = new User(App.get("user"));

      if (!title || !description) return res.status(404).json({ message: 'Preencha todos os campos' });

      const support = new Support({ title, description, userId: user.getId() });

      const { body, error } = await connection.from("Supports").insert(support);

      if (error) return res.status(404).json({ message: 'Não foi possível criar o suporte', error });

      let adminsIDs: string[] = [];

      const { body: admins, error: errorAdmins } = await connection.from("Users").select("*").match({ admin: true });
      if (errorAdmins) return res.status(404).json({ message: 'Não foi possível enviar notificação para os admins', error: errorAdmins });

      adminsIDs = admins.map((admin: any) => admin.id);
      let random = Math.floor(Math.random() * adminsIDs.length);

      const accountUser = new User(admins.filter((admin: any) => admin.id === adminsIDs[random])[0]);

      let notify = new Notify({
        title: '<h3> Há uma nova solicitação de suporte! </h3>',
        content: `<p> Olá ${accountUser.getFirstName()}, ${user.getFirstName()} enviou uma solcitação de suporte!
        <br> <br> <a href="/admin/support/${support.getId()}"> Clique aqui para verificar </a>
        </p>`,
      })

      const { data: olds, error: errorOlds } = await connection.from("Notifies").select("*").match({ userId: accountUser.getId() });
      if (errorOlds) return res.status(500).json({ message: 'Erro ao selecionar notificações' });

      const oldNotifies = new Notifies({ ...olds[0] });
      oldNotifies.setNotify(notify);

      const { error: errorUpdateNotify } = await connection.from("Notifies").update(oldNotifies).match({ userId: accountUser.getId() });
      if (errorUpdateNotify) return res.status(500).json({ message: 'Erro ao atualizar notificações' });

      return res.status(200).redirect('/support');
    });

    this.router.get('/:id', async (req: Request, res: Response) => {
      const { id } = req.params;
      const user = new User(App.get("user"));

      const { body, error } = await connection.from("Supports").select("*, user:userId(id, name, email, username, avatar), attending:attendingBy(id, name, username, avatar, email), concluded:concludedBy(id, name, username, avatar, email)").match({ id }).limit(1);

      if (error) return res.status(404).json({ message: 'Suporte não encontrado' })

      const support = new Support(body[0]);
      support.readResponse();

      await connection.from("Supports").update(support).match({ id });

      return res.render('pages/support', { title: 'Central de ajuda', user, support: body[0] });
    });

    this.router.put('/reply/:id/', async (req: Request, res: Response) => {
      const { id } = req.params;
      const { reply } = req.body;
      const user = new User(App.get('user'));

      const { body, error } = await connection.from("Supports").select("*, user:userId(*), attending:attendingBy(*), concluded:concludedBy(*)").match({ id }).limit(1);

      if (error) return res.status(404).json({ message: 'Suporte não encontrado' });

      const support = new Support(body[0]);
      support.setResponse(new Reply({
        userId: user.getId(),
        response: reply
      }))

      const { error: errorUpdate } = await connection.from("Supports").update(support).match({ id });
      if (errorUpdate) return res.status(500).json({ message: 'Erro ao responder suporte' });

      const accountUser = new User(body[0].attending);

      let notify = new Notify({
        title: '<h3> Há uma nova mensagem no support! </h3>',
        content: `<p> Olá ${accountUser.getFirstName()}, ${user.getFirstName()} respondeu no suporte!
        <br> <br> <a href="/admin/support/${id}"> Clique aqui para verificar </a>
        </p>`,
      })

      const { data: olds, error: errorOlds } = await connection.from("Notifies").select("*").match({ userId: accountUser.getId() });
      if (errorOlds) return res.status(500).json({ message: 'Erro ao selecionar notificações' });

      const oldNotifies = new Notifies({ ...olds[0] });
      oldNotifies.setNotify(notify);

      const { error: errorUpdateNotify } = await connection.from("Notifies").update(oldNotifies).match({ userId: accountUser.getId() });
      if (errorUpdateNotify) return res.status(500).json({ message: 'Erro ao atualizar notificações' });

      return res.status(200).json({ message: 'Suporte respondido com sucesso', status: 'success' });
    });
  }

}

export default new SupportRoutes().router;