import { NextFunction, Request, Response } from 'express';
import dns from 'dns';

import { connection } from './connection';
import App from '../App';
import { User } from '../models/User';

function authenticate() {
  return {
    auth: (req: Request, res: Response, next: NextFunction) => {
      authenticate().connecting(req, res, () => {
        const authenticated = connection.auth.session() ? true : false;

        if (authenticated) return next();
        //return res.status(401).json({ message: 'Ops! Autentique-se primeiro para poder acessar o sisema!' });
        return res.status(401).redirect('/');
      });
    },
    onlyAdmins: (req: Request, res: Response, next: NextFunction) => {
      authenticate().auth(req, res, () => {
        const user = new User(App.get("user"));

        if (user.getAdmin()) return next();
        return res.status(401).json({ message: 'Ops! Você não pode acessar está funcionalidade, pois você não é um adiminstrador!' });
      });
    },
    connecting: (req: Request, res: Response, next: NextFunction) => {
      dns.lookup('google.com', (err) => {
        if (err && err.code === 'ENOTFOUND') return res.status(501).json({ message: 'Ops! Você deve conectar-se com à internet para continuar!' });
        return next();
      });
    },
    uploadController: (req: Request, res: Response, next: NextFunction) => {
      const { file } = req;

      if (!file) return res.status(400).json({ message: 'Ops! Você deve selecionar um arquivo para continuar!' });
      return next();
    }
  }
}

export { authenticate };