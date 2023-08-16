import { Router, Request, Response } from 'express';

class AppsRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {
    this.router.get('/', (req: Request, res: Response) => {
      return res.send('Hello World!');
    });
  }
}

export default new AppsRoutes().router;