"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _App = require('../App'); var _App2 = _interopRequireDefault(_App);
var _connection = require('../database/connection');
var _Course = require('../models/Course');
var _Period = require('../models/Period');
var _User = require('../models/User');

class PeriodRoutes {
	

	constructor() {
		this.router = _express.Router.call(void 0, );
		this.routes();
	}

	 routes() {

		this.router.get('/period/:id', async (req, res) => {
			const { id } = req.params;
			const user = new (0, _User.User)(_App2.default.get('user'));

			const { data, error } = await _connection.connection.from('Courses').select('*').match({ userId: user.getId() }).single();
			if (error) return res.status(400).json({ message: 'Erro ao buscar curso', error });

			const course = new (0, _Course.Course)(data);
			const period = new (0, _Period.Period)(course.getPeriod(id));

			if (period.getId() === undefined) return res.redirect('/courses/course/' + course.getId());

			_App2.default.set('period', period);

			return res.render('pages/period', { title: period.getName(), user, course, period });
		});

		this.router.post('/period/register', async (req, res) => {
			const { name, credits, workload, status, disciplines  } = req.body;
			const user = new (0, _User.User)(_App2.default.get('user'));
			const course = new (0, _Course.Course)(_App2.default.get('course'));

			let period = new (0, _Period.Period)({ name, credits, workload, status, disciplines });
			course.setPeriod(period);

			period = new (0, _Period.Period)(course.getPeriod(period.getId()));

			const { data, error } = await _connection.connection.from('Courses').update(course).match({ id: course.getId(), userId: user.getId() }).single();
			if (error) return res.status(400).json({ message: 'Erro ao cadastrar período', error });

			_App2.default.set('course', data);
			_App2.default.set('period', period);

			return res.redirect(`/periods/period/${period.getId()}`);
		});		

		this.router.post('/period/update', async (req, res) => {
			const { id, name, credits, workload, status, disciplines  } = req.body;
			const user = new (0, _User.User)(_App2.default.get('user'));
			const course = new (0, _Course.Course)(_App2.default.get('course'));

			let period = new (0, _Period.Period)({ id, name, credits, workload, status, disciplines });
			course.updatePeriod(period);

			period = new (0, _Period.Period)(course.getPeriod(id));

			const { data, error } = await _connection.connection.from('Courses').update(course).match({ id: course.getId(), userId: user.getId() }).single();
			if (error) return res.status(400).json({ message: 'Erro ao atualizar período', error });

			_App2.default.set('course', data);
			_App2.default.set('period', period);

			return res.redirect(`/periods/period/${period.getId()}`);
		});

		this.router.post('/period/delete', async (req, res) => {
			const { id } = req.body;
			const user = new (0, _User.User)(_App2.default.get('user'));
			const course = new (0, _Course.Course)(_App2.default.get('course'));

			course.deletePeriod(id);

			const { data, error } = await _connection.connection.from('Courses').update(course).match({ id: course.getId(), userId: user.getId() }).single();
			if (error) return res.status(400).json({ message: 'Erro ao remover período', error });

			_App2.default.set('course', data);
			_App2.default.set('period', {});

			return res.redirect('/course/' + course.getId());
		});
		
	}

}

exports. default = new PeriodRoutes().router;