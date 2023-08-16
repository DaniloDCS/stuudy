import fs from 'fs';
import os from 'os';

import { Router, Request, Response } from 'express';
import multer from 'multer';
import { upload } from '../database/upload';
import browser from 'browser-detect';

import { authenticate } from '../database/authenticate';
const { uploadController } = authenticate();

import { connection } from '../database/connection';
import { Accesses, User } from '../models/User';
import App from '../App';
import { Notifies, Notify } from '../models/Notify';

class AuthenticateRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.post('/signin', async (req: Request, res: Response) => {
      const { email, password } = req.body;
      let username = email;

      if (!email || !password) return res.redirect('/');

      if (email.startsWith('@')) {
        const { data: search, error: errorSearch } = await connection.from('Users').select('*').match({ username: email }).limit(1);
        if (errorSearch) return res.status(500).redirect('/');

        if (!search.length) return res.redirect('/');
        username = search[0].email;
      }

      const user = await connection.auth.signIn({ email: username, password });
      if (!user) return res.redirect('/');

      const { body, error } = await connection.from("Users").select("*").match({ userId: user.user?.id }).limit(1);
      if (error) return res.status(500).json({ message: 'Usuário não encontrado', error });

      const userme = new User(body[0]);
      userme.setAccesses(new Accesses({
        date: new Date(),
        location: {
          country: req.ip,
          state: req.ip,
          city: req.ip,
          ip: req.socket.remoteAddress
        },
        browser: browser(req.headers['user-agent']).name,
        machine: os.hostname() + ' - ' + os.platform() + ' - ' + os.arch() + ' - ' + os.release()
      }))

      App.set('user', userme);

      const { error: errorUpdate } = await connection.from('Users').update(userme).match({ id: userme.getId() });
      if (errorUpdate) return res.status(500).json({ message: 'Usuário não atualizado', error: errorUpdate });
      return res.redirect('/dashboard');
    });

    this.router.post('/signup', multer(upload.config).single('avatar'), uploadController, async (req: Request, res: Response) => {
      const { email, password, name, username, phone }: { email: string, password: string, name: string, username: string, phone: string } = req.body;
      const file = req.file;

      if (!file) return res.status(500).json({ message: 'Imagem não encontrada', error: 'Error' });

      const { error, user } = await connection.auth.signUp({ email, password }, {
        data: {
          name,
          username,
          phone
        }
      });

      if (error) res.status(500).json({ message: 'Usuário não cadastrado!', error });

      const { user: login, error: errorLogin } = await connection.auth.signIn({ email, password });

      if (errorLogin) res.status(500).json({ message: 'Usuário não logado!', error: errorLogin });

      const { error: errorUpload, data: avatar } = await connection.storage.from('avatars').upload(`/avatar-${user?.id}-${file.filename}`, fs.readFileSync(file.path), {
        cacheControl: '3600',
        upsert: false
      });

      fs.unlinkSync(file.path);

      if (errorUpload) return res.status(500).json({ message: 'Avatar não enviado!', error: errorUpload });

      const userme = new User({
        userId: user?.id as string,
        email,
        name,
        username,
        phone,
        avatar: `https://mbyavrokefpjmmtpdpnb.supabase.co/storage/v1/object/public/${avatar?.Key}`,
        accesses: [
          new Accesses({
            date: new Date(),
            location: {
              country: req.ip,
              state: req.ip,
              city: req.ip,
              ip: req.socket.remoteAddress
            },
            browser: browser(req.headers['user-agent']).name,
            machine: os.hostname() + ' - ' + os.platform() + ' - ' + os.arch() + ' - ' + os.release()
          })
        ]
      });

      const { data: register, error: errorRegister } = await connection.from('Users').insert(userme);
      if (errorRegister) return res.status(500).json({ message: 'Usuário não cadastrado!', error: errorRegister });

      const notify = new Notifies({
        userId: userme.getId(),
        notifies: [new Notify({
          title: `<h3>Nossas boas vindas ao Stuudy!</h3>`,
          content: `<p>Olá ${userme.name}, <br> É ótimo saber saber que você se juntou à nossa equipe, isso me deixa muito feliz. Então, desejo boas vindas ao Stuudy! Desfrute de todo e mais um pouco e facililite sua vida academica! </p>`,
          by: `<a href="/u/@danilo" target="__blank">At.te Danilo Costa - Stuudy Developer</a>`,
        })]
      });

      const { data: registerNotify, error: errorRegisterNotify } = await connection.from('Notifies').upsert(notify);
      if (errorRegisterNotify) return res.status(500).json({ message: 'Notificações não cadastradas!', error: errorRegisterNotify });

      const { data: dataCreator, error: errorCreator } = await connection.from('Users').select('id').match({ username: '@danilo' });
      if (errorCreator) return res.status(500).json({ message: 'Criador não encontrado!', error: errorCreator });

      const creator = dataCreator[0].id;

      const newUser = new Notify({
        title: `<h3>Um novo usuário acaba de se registrar!</h3>`,
        content: `<p>Olá Danilo, <br> ${userme.getName()} se cadastrou no Stuudy, então é bom você dar uma olhada nele! Aqui está o link: <a href="/u/${userme.getUsername()}">${userme.name}</a></p>`,
        by: `<a href="/u/@danilo" target="__blank">At.te Danilo Costa - Stuudy Developer</a>`
      })

      const { data: olds, error: errorOlds } = await connection.from('Notifies').select('notifies').match({ userId: creator });
      if (errorOlds) return res.status(500).json({ message: 'Notificações não encontradas!', error: errorOlds });

      const oldsNotifies = new Notifies({ ...olds[0] });
      oldsNotifies.setNotify(newUser);

      const { data: registerNewUser, error: errorRegisterNewUser } = await connection.from('Notifies').update(oldsNotifies).match({ userId: creator });
      if (errorRegisterNewUser) return res.status(500).json({ message: 'Notificações não cadastradas!', error: errorRegisterNewUser });

      App.set('user', userme);

      return res.status(200).redirect('/dashboard');
    });

    this.router.get('/signout', async (req: Request, res: Response) => {
      req.session.destroy((err) => {
        if (err) return res.status(500).json({ error: err });
      });

      const user = new User(App.get('user'));
      let lastAccess = user.accesses[user.accesses.length - 1];
      user.setExitAccesses(new Accesses({ ...lastAccess }));

      const { error } = await connection.from('Users').update(user).match({ userId: user.userId });
      if (error) return res.status(500).json({ message: 'Usuário não atualizado', error });

      const exit = await connection.auth.signOut();
      if (exit) return res.status(200).redirect('/');
      else return res.status(500).json({ error: 'Error' });
    });

    this.router.put('/update', async (req: Request, res: Response) => {
      const { email, password } = req.body;
      const user = await connection.auth.update({ email, password });

      if (user) res.status(200).json({ message: 'Usuário atualizado com sucesso' });
      else res.status(500).json({ message: 'Usuário não atualizado!', error: 'Error' });
    });

    this.router.post('/forgot', async (req: Request, res: Response) => {
      const { email } = req.body;
      const user = await connection.auth.api.resetPasswordForEmail(email);

      if (user) res.status(200).json({ message: 'Usuário atualizado com sucesso' });
      else res.status(500).json({ message: 'Usuário não atualizado!', error: 'Error' });
    });

    this.router.delete('/delete', async (req: Request, res: Response) => {
      const { id } = req.body;
      const user = await connection.auth.api.deleteUser(id);

      if (user) res.status(200).json({ message: 'Usuário removido com sucesso' });
      else res.status(500).json({ message: 'Usuário não removido!', error: 'Error' });
    });
  }
}

export default new AuthenticateRoutes().router;