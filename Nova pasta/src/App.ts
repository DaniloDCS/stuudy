import express, { Application } from 'express';
import { json, urlencoded } from 'express';
import cors from 'cors';
import session from 'express-session';
import flash from 'express-flash';
import multer from 'multer';
import layouts from 'pug-layout';

import routes from './routes';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use('/public/', express.static('public/'));
    this.app.use('/fontawesome/', express.static('node_modules/@fortawesome/fontawesome-free/'));

    this.app.set('view engine', 'pug');
    const layout = layouts.Layout('views/layout.pug');

    this.app.use(session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }
    }));

    this.app.use(flash());

    this.app.use((req, res, next) => {
      res.locals.session = req.session;
      next();
    });
  }

  private routes(): void {
    this.app.use(routes);

    this.app.use((req, res) => {
      return res.status(404).render("pages/404", {
        message: req.flash("message")
      });
    });
  }
}

export default new App().app;