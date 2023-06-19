import { Router, Request, Response } from 'express';
import App from '../App';
import { connection } from '../database/connection';
import { Course } from '../models/Course';
import { Period } from '../models/Period';
import { User } from '../models/User';

class PeriodRoutes {
	public router: Router;

	constructor() {
		this.router = Router();
		this.routes();
	}

	private routes(): void {

		this.router.get('/period/:id', async (req: Request, res: Response) => {
			const { id } = req.params;
			const user = new User(App.get('user'));

			const { data, error } = await connection.from('Courses').select('*').match({ userId: user.getId() }).single();
			if (error) return res.status(400).json({ message: 'Erro ao buscar curso', error });

			const course = new Course(data);
			const period = new Period(course.getPeriod(id));

			if (period.getId() === undefined) return res.redirect('/courses/course/' + course.getId());

			App.set('period', period);

			return res.render('pages/period', { title: period.getName(), user, course, period });
		});

		this.router.post('/period/register', async (req: Request, res: Response) => {
			const { name, credits, workload, status, disciplines  } = req.body;
			const user = new User(App.get('user'));
			const course = new Course(App.get('course'));

			let period = new Period({ name, credits, workload, status, disciplines });
			course.setPeriod(period);

			period = new Period(course.getPeriod(period.getId()));

			const { data, error } = await connection.from('Courses').update(course).match({ id: course.getId(), userId: user.getId() }).single();
			if (error) return res.status(400).json({ message: 'Erro ao cadastrar período', error });

			App.set('course', data);
			App.set('period', period);

			return res.redirect(`/periods/period/${period.getId()}`);
		});		

		this.router.post('/period/update', async (req: Request, res: Response) => {
			const { id, name, credits, workload, status, disciplines  } = req.body;
			const user = new User(App.get('user'));
			const course = new Course(App.get('course'));

			let period = new Period({ id, name, credits, workload, status, disciplines });
			course.updatePeriod(period);

			period = new Period(course.getPeriod(id));

			const { data, error } = await connection.from('Courses').update(course).match({ id: course.getId(), userId: user.getId() }).single();
			if (error) return res.status(400).json({ message: 'Erro ao atualizar período', error });

			App.set('course', data);
			App.set('period', period);

			return res.redirect(`/periods/period/${period.getId()}`);
		});

		this.router.post('/period/delete', async (req: Request, res: Response) => {
			const { id } = req.body;
			const user = new User(App.get('user'));
			const course = new Course(App.get('course'));

			course.deletePeriod(id);

			const { data, error } = await connection.from('Courses').update(course).match({ id: course.getId(), userId: user.getId() }).single();
			if (error) return res.status(400).json({ message: 'Erro ao remover período', error });

			App.set('course', data);
			App.set('period', {});

			return res.redirect('/course/' + course.getId());
		});
		
	}

}

export default new PeriodRoutes().router;