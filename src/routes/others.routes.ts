import { Router, Request, Response } from 'express';
import App from '../App';
import { authenticate } from '../database/authenticate';
import { connection } from '../database/connection';
import { Notifies, Notify } from '../models/Notify';
import { Support, Supports } from '../models/Support';
import { User } from '../models/User';

class OthersRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.get('/', async (req: Request, res: Response) => {
      return res.render('pages/authenticate', { title: 'Acesse sua conta' });
    });

    this.router.get('/dashboard', authenticate().auth, async (req: Request, res: Response) => {
      const user = new User(App.get("user"));

      const { data, error: erroNotifies } = await connection.from('Notifies').select('*').match({ userId: user.getId() });
      if (erroNotifies) return res.status(500).json({ message: 'Notificações não encontradas', error: erroNotifies });

      const notifies = new Notifies({
        userId: user.getId(),
        notifies: data[0]?.notifies.map((notify: any) => new Notify(notify)) || []
      });

      return res.render('pages/dashboard', { title: 'Área de trabalho', user, notifies });
    });

    this.router.get('/u/:username', async (req: Request, res: Response) => {
      const { username } = req.params;
      
      const { body } = await connection.from("Users").select("*").match({ username }).limit(1) as any;

      if (!body.length) return res.status(404).json({ message: 'Usuário não encontrado' });

      const user = new User(body[0]);

      if (App.get("user")) {
        const me = new User(App.get("user"));

        if (me.getId() === user.getId()) return res.redirect('/me');

      } else {
        return res.render('pages/user', { title: username, account: user, user: false, isMyFriend: "not authenticated" });
      }

      const me = new User(App.get("user"));
      let isMyFriend = "not friends",
        relation = "";

      const { data: searchFriend, error: errorSearchFriend } = await connection.from("Friends").select("id, from:sender(*), to:recipient(*)").eq("recipient", user.getId()).eq("sender", me.getId());
      if (errorSearchFriend) return res.status(500).json({ message: 'Erro ao buscar amigos', errorSearchFriend });

      const { data: searchFriend2, error: errorSearchFriend2 } = await connection.from("Friends").select("id, from:sender(*), to:recipient(*)").eq("recipient", me.getId()).eq("sender", user.getId());
      if (errorSearchFriend2) return res.status(500).json({ message: 'Erro ao buscar amigos', errorSearchFriend2 });

      if (searchFriend.length > 0 || searchFriend2.length > 0) {
        isMyFriend = "friends";

        if (searchFriend.length > 0) relation = searchFriend[0].id;
        else if (searchFriend2.length > 0) relation = searchFriend2[0].id;

      } else if (searchFriend.length === 0 && searchFriend2.length === 0) {
        const { data: sendRequest, error: errorFriendRequest } = await connection.from("Solicitations").select("*, from:senderId(*), to:recipientId(*)").eq("recipientId", me.getId()).eq("senderId", user.getId());
        if (errorFriendRequest) return res.status(500).json({ message: 'Erro ao buscar solicitações de amizade', error: errorFriendRequest });

        const { data: reciveRequest2, error: errorFriendRequest2 } = await connection.from("Solicitations").select("*, from:senderId(*), to:recipientId(*)").eq("recipientId", user.getId()).eq("senderId", me.getId());
        if (errorFriendRequest2) return res.status(500).json({ message: 'Erro ao buscar solicitações de amizade', error: errorFriendRequest });

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

      return res.render('pages/user', { title: username, account: user, user: me, relation, isMyFriend });
    });

    this.router.get('/me', authenticate().auth, async (req: Request, res: Response) => {
      const { username } = App.get("user");

      const { body } = await connection.from("Users").select("*").match({ username }).limit(1) as any;

      if (!body.length) return res.status(404).json({ message: 'Usuário não encontrado' });

      const user = new User(body[0]);

      return res.render('pages/me', { title: 'Meu perfil', user });
    });

    this.router.get('/chat', authenticate().auth, async (req: Request, res: Response) => {
      const user = new User(App.get("user"));

      return res.render('pages/chat', { title: 'Chat', user });
    });
  }
}

export default new OthersRoutes().router;