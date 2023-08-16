import { Router, Request, Response } from 'express';
import App from '../App';
import { authenticate } from '../database/authenticate';
import { connection } from '../database/connection';
import { Notifies, Notify } from '../models/Notify';
import { Support, Supports } from '../models/Support';
import { User } from '../models/User';

class PublishRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.get('/', async (req: Request, res: Response) => {
      return res.render('pages/publishes', { title: 'Timeline' });
    });
  }
}

export default new PublishRoutes().router;