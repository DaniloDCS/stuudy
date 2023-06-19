import { Router, Request, Response } from 'express';
import App from '../App';
import { connection } from '../database/connection';
import { Notifies, Notify } from '../models/Notify';
import { Support, Supports, Response as Reply } from '../models/Support';
import { User, Users } from '../models/User';

class AdminsRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.get('/', async (req: Request, res: Response) => {
      const user = new User(App.get("user"));

      const { data: listOfUsers, error: errorUsers } = await connection.from('Users').select('*');
      if (errorUsers) return res.status(500).json({ message: 'Usuários não encontrados', error: errorUsers });

      const users: Users = new Users(listOfUsers.map((user: any) => new User(user)));

      const { data: listOfSupports, error: errorSupports } = await connection.from('Supports').select('*, user:userId(*), attending:attendingBy(*), concluded:concludedBy(*)').limit(100);
      if (errorSupports) return res.status(500).json({ message: 'Suportes não encontrados', error: errorSupports });

      return res.render('admin/home', { title: 'Admin', user, users, supports: listOfSupports });
    });

    this.router.post('/send-all', async (req: Request, res: Response) => {
      const admin = new User(App.get("user"));
      const { title, content } = req.body;

      const { data: listOfUsers, error: errorUsers } = await connection.from('Users').select('*');
      if (errorUsers) return res.status(500).json({ message: 'Usuários não encontrados', error: errorUsers });

      const users: Users = new Users(listOfUsers.map((user: any) => new User(user)));

      const notify = new Notify({
        title,
        content,
        by: `<a href="/u/${admin.getUsername()}" target="__blank">${admin.getUsername()} of team Stuudy</a>`,
        status: false,
      });

      users.getUsers().forEach(async (user: User) => {
        const { data: listOfNotifies, error: errorNotifies } = await connection.from('Notifies').select('*').match({ userId: user.getId() });
        if (errorNotifies) return res.status(500).json({ message: 'Notificações não encontradas', error: errorNotifies });

        const notifies = new Notifies({
          userId: user.getId(),
          notifies: listOfNotifies[0]?.notifies.map((notify: any) => new Notify(notify)) || [],
        });

        notifies.setNotify(notify);

        const { data: update, error: errorUpdate } = await connection.from('Notifies').update(notifies).match({ userId: user.getId() });
        if (errorUpdate) return res.status(500).json({ message: 'Erro ao atualizar notificações', error: errorUpdate });
      });

      return res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
    });

    this.router.get('/users', async (req: Request, res: Response) => {
      const { body } = await connection.from("Users").select("*").limit(10) as any;

      if (!body.length) return res.status(404).json({ message: 'Não há registros!' });

      const users = new Users(body);

      return res.render('admin/users', { title: 'Administração', users });
    });

    this.router.put('/turn-admin/:id', async (req: Request, res: Response) => {
      const { id } = req.params;

      const { body } = await connection.from("Users").select("*").match({ id }).limit(1) as any;

      if (!body.length) return res.status(404).json({ message: 'Usuário não encontrado' });

      const user = new User(body[0]);
      user.setAdmin(!user.getAdmin());

      const { body: update, error } = await connection.from("Users").update(user).match({ id });

      if (error) return res.status(500).json({ message: 'Erro ao atualizar usuário', error });

      return res.status(200).json({ message: 'Usuário atualizado com sucesso!', status: 'success' });
    });

    this.router.get('/user/:username', async (req: Request, res: Response) => {
      const { username } = req.params;

      const { body } = await connection.from("Users").select("*").match({ username }).limit(1) as any;

      if (!body.length) return res.status(404).json({ message: 'Usuário não encontrado' });

      const user = new User(body[0]);

      return res.render('admin/user', { title: user.getUsername(), user });
    });

    this.router.get('/supports', async (req: Request, res: Response) => {
      const { body } = await connection.from("Supports").select("*").limit(100) as any;

      if (!body.length) return res.status(404).json({ message: 'Não há registros!' });

      const supports = new Supports(body);

      return res.render('admin/supports', { title: 'Cenral de suporte', supports });
    });

    this.router.get('/support/:id', async (req: Request, res: Response) => {
      const { id } = req.params;
      const user = new User(App.get('user'));

      const { body, error } = await connection.from("Supports").select('*, user:userId(id, name, email, username, avatar), attending:attendingBy(*), concluded:concludedBy(*)').match({ id }).limit(1);
      if (error) return res.status(404).json({ message: 'Suporte não encontrado' });

      const support = new Support(body[0]);
      support.readResponse();

      await connection.from("Supports").update(support).match({ id });

      return res.render('admin/support', { title: 'Central de ajuda', user, support: body[0] });
    });

    this.router.post('/support/:id/reply', async (req: Request, res: Response) => {
      const { id } = req.params;
      const { reply } = req.body;
      const user = new User(App.get('user'));

      const { body, error } = await connection.from("Supports").select("*, user:userId(*), attending:attendingBy(*), concluded:concludedBy(*)").match({ id }).limit(1);

      if (error) return res.status(404).json({ message: 'Suporte não encontrado' });

      const support = new Support(body[0]);
      support.setResponse(new Reply({
        userId: user.getId(),
        response: reply,
        author: 'support-team'
      }));

      const { error: errorUpdate } = await connection.from("Supports").update(support).match({ id });
      if (errorUpdate) return res.status(500).json({ message: 'Erro ao responder suporte' });

      const accountUser = new User(body[0].user);

      let notify = new Notify({
        title: '<h3> Há uma nova mensagem sobre seu suporte! </h3>',
        content: `<p> Olá ${accountUser.getFirstName()}, ${user.getFirstName()} respondeu seu suporte!
        <br> <br> <a href="/support/${id}"> Clique aqui para verificar </a>
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

    this.router.put('/finish/:id/', async (req: Request, res: Response) => {
      const { id } = req.params;
      const user = new User(App.get('user'));

      const { body, error } = await connection.from("Supports").select("*, user:userId(*), attending:attendingBy(*), concluded:concludedBy(*)").match({ id }).limit(1);
      if (error) return res.status(404).json({ message: 'Suporte não encontrado' });

      const support = new Support(body[0]);
      support.finish(user.getId());

      const { error: errorUpdate } = await connection.from("Supports").update(support).match({ id });
      if (errorUpdate) return res.status(500).json({ message: 'Erro ao concluir suporte' });

      const accountUser = new User(body[0].user);

      let notify = new Notify({
        title: '<h3> Atualização: seu suporte foi atendido! </h3>',
        content: `<p> Olá ${accountUser.getFirstName()}, seu suporte foi concluído e finalizado!
        <br> <br> <a href="/support/${id}"> Clique aqui para verificar </a>
        </p>`,
      })

      const { data: olds, error: errorOlds } = await connection.from("Notifies").select("*").match({ userId: accountUser.getId() });
      if (errorOlds) return res.status(500).json({ message: 'Erro ao selecionar notificações' });

      const oldNotifies = new Notifies({ ...olds[0] });
      oldNotifies.setNotify(notify);

      const { error: errorUpdateNotify } = await connection.from("Notifies").update(oldNotifies).match({ userId: accountUser.getId() });
      if (errorUpdateNotify) return res.status(500).json({ message: 'Erro ao atualizar notificações' });

      return res.status(200).json({ message: 'Suporte concluído com sucesso', status: 'success' });
    });

    this.router.put('/attending/:id', async (req: Request, res: Response) => {
      const { id } = req.params;
      const user = new User(App.get('user'));

      const { body, error } = await connection.from("Supports").select("*, user:userId(*), attending:attendingBy(*), concluded:concludedBy(*)").match({ id }).limit(1);

      if (error) return res.status(404).json({ message: 'Suporte não encontrado' });

      const support = new Support(body[0]);
      support.attending(user.getId());


      const { body: update, error: errorUpdate } = await connection.from("Supports").update(support).match({ id });
      if (errorUpdate) return res.status(500).json({ message: 'Erro ao atualizar suporte' });

      const accountUser = new User(body[0].user);

      let notify = new Notify({
        title: '<h3> Atualização: seu suporte está sendo atendido </h3>',
        content: `<p> Olá ${accountUser.getFirstName()}, seu suporte está sendo atendido por um de nossos administradores.
        <br> <br> <a href="/support/${id}"> Clique aqui para acopanhar </a>
        </p>`,
      })

      const { data: olds, error: errorOlds } = await connection.from("Notifies").select("*").match({ userId: accountUser.getId() });
      if (errorOlds) return res.status(500).json({ message: 'Erro ao selecionar notificações' });

      const oldNotifies = new Notifies({ ...olds[0] });
      oldNotifies.setNotify(notify);

      const { error: errorUpdateNotify } = await connection.from("Notifies").update(oldNotifies).match({ userId: accountUser.getId() });
      if (errorUpdateNotify) return res.status(500).json({ message: 'Erro ao enviar notificação' });

      return res.status(200).redirect('/admin/support' + id);
    });
  }
}

export default new AdminsRoutes().router;