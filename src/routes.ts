import { Router, Request, Response } from 'express';

import OthersRoutes from './routes/others.routes';
import AuthenticateRoutes from './routes/authentication.routes';
import AdminRoutes from './routes/admin.routes';
import AppsRoutes from './routes/apps.routes';
import UsersRoutes from './routes/user.routes';
import SupportRoutes from './routes/support.routes';
import FriendsRoutes from './routes/friend.routes';
import PublishRoutes from './routes/publish.routes';
import CourseRoutes from './routes/course.routes';
import PeriodRoutes from './routes/period.routes';
import DisciplineRoutes from './routes/discipline.routes';


import { history } from '../public/js/history'; '../public/js/history';

import { authenticate } from './database/authenticate';
import { Course } from './models/Course';
import { Period } from './models/Period';
import { Class, Discipline, Teacher, Unity } from './models/Discipline';
const { auth, onlyAdmins, connecting } = authenticate();

class Routes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private routes(): void {

    this.router.get('/history', (req: Request, res: Response) => {

      const course = new Course({
        id: "08acaa45-1a00-41f4-b8ac-756d0e0aa4ee",
        userId: "4c3e0c48-41f5-48a5-8deb-d6b3087723c8",
        name: "Enfermagem",
        icon: "📚",
        description: "Melhor curso do mundo! 🌎💖",
        university: "UFCG - CES",
        location: "Cuité - PB",
        status: "studying",
        level: "Superior",
        type: "Bachelor",
        startedIn: new Date("2022-05-02"),
        finishedIn: new Date("2023-01-31"),
        createdAt: new Date("2023-01-10 16:30:35"),
        updatedAt: new Date("2023-01-10 16:30:35")
      });

      history.periods.forEach(period => {
        let newPeriod = new Period({
          id: period.id,
          name: period.name,
          icon: period.icon,
          status: period.status,
          createdAt: new Date(period.createdAt),
          updatedAt: new Date(period.updatedAt),
          credits: 0,
          workload: 0,
        });

        course.setPeriod(newPeriod);
      });

      return res.json(course);
    });

    this.router.post('/aaa', (req: Request, res: Response) => {
      return res.json(req.body);
    })

    this.router.use(connecting);
    this.router.use('/authenticate', AuthenticateRoutes);
    this.router.use('/', OthersRoutes);

    this.router.use('/users', auth, UsersRoutes);
    this.router.use('/admin', auth, onlyAdmins, AdminRoutes);
    this.router.use('/apps', auth, AppsRoutes);
    this.router.use('/support', auth, SupportRoutes);
    this.router.use('/friends', auth, FriendsRoutes);
    this.router.use('/publish', auth, PublishRoutes);
    this.router.use('/courses', auth, CourseRoutes);
    this.router.use('/periods', auth, PeriodRoutes);
    this.router.use('/disciplines', auth, DisciplineRoutes);

  }
}

export default new Routes().router;


/**
 * 
 * 
*/