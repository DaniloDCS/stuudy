"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');

var _othersroutes = require('./routes/others.routes'); var _othersroutes2 = _interopRequireDefault(_othersroutes);
var _authenticationroutes = require('./routes/authentication.routes'); var _authenticationroutes2 = _interopRequireDefault(_authenticationroutes);
var _adminroutes = require('./routes/admin.routes'); var _adminroutes2 = _interopRequireDefault(_adminroutes);
var _appsroutes = require('./routes/apps.routes'); var _appsroutes2 = _interopRequireDefault(_appsroutes);
var _userroutes = require('./routes/user.routes'); var _userroutes2 = _interopRequireDefault(_userroutes);
var _supportroutes = require('./routes/support.routes'); var _supportroutes2 = _interopRequireDefault(_supportroutes);
var _friendroutes = require('./routes/friend.routes'); var _friendroutes2 = _interopRequireDefault(_friendroutes);
var _publishroutes = require('./routes/publish.routes'); var _publishroutes2 = _interopRequireDefault(_publishroutes);
var _courseroutes = require('./routes/course.routes'); var _courseroutes2 = _interopRequireDefault(_courseroutes);
var _periodroutes = require('./routes/period.routes'); var _periodroutes2 = _interopRequireDefault(_periodroutes);
var _disciplineroutes = require('./routes/discipline.routes'); var _disciplineroutes2 = _interopRequireDefault(_disciplineroutes);


var _history = require('../public/js/history'); '../public/js/history';

var _authenticate = require('./database/authenticate');
var _Course = require('./models/Course');
var _Period = require('./models/Period');

const { auth, onlyAdmins, connecting } = _authenticate.authenticate.call(void 0, );

class Routes {
  

  constructor() {
    this.router = _express.Router.call(void 0, );
    this.routes();
  }

   routes() {

    this.router.get('/history', (req, res) => {

      const course = new (0, _Course.Course)({
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

      _history.history.periods.forEach(period => {
        let newPeriod = new (0, _Period.Period)({
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

    this.router.post('/aaa', (req, res) => {
      return res.json(req.body);
    })

    this.router.use(connecting);
    this.router.use('/authenticate', _authenticationroutes2.default);
    this.router.use('/', _othersroutes2.default);

    this.router.use('/users', auth, _userroutes2.default);
    this.router.use('/admin', auth, onlyAdmins, _adminroutes2.default);
    this.router.use('/apps', auth, _appsroutes2.default);
    this.router.use('/support', auth, _supportroutes2.default);
    this.router.use('/friends', auth, _friendroutes2.default);
    this.router.use('/publish', auth, _publishroutes2.default);
    this.router.use('/courses', auth, _courseroutes2.default);
    this.router.use('/periods', auth, _periodroutes2.default);
    this.router.use('/disciplines', auth, _disciplineroutes2.default);

  }
}

exports. default = new Routes().router;


/**
 * 
 * 
*/