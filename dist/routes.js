"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }var _express = require('express');

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
var _unityroutes = require('./routes/unity.routes'); var _unityroutes2 = _interopRequireDefault(_unityroutes);
var _classroutes = require('./routes/class.routes'); var _classroutes2 = _interopRequireDefault(_classroutes);
var _bulletinroutes = require('./routes/bulletin.routes'); var _bulletinroutes2 = _interopRequireDefault(_bulletinroutes);
var _workroutes = require('./routes/work.routes'); var _workroutes2 = _interopRequireDefault(_workroutes);
var _activityroutes = require('./routes/activity.routes'); var _activityroutes2 = _interopRequireDefault(_activityroutes);
var _evaluationroutes = require('./routes/evaluation.routes'); var _evaluationroutes2 = _interopRequireDefault(_evaluationroutes);
var _bookroutes = require('./routes/book.routes'); var _bookroutes2 = _interopRequireDefault(_bookroutes);
var _resumeroutes = require('./routes/resume.routes'); var _resumeroutes2 = _interopRequireDefault(_resumeroutes);
var _reminderroutes = require('./routes/reminder.routes'); var _reminderroutes2 = _interopRequireDefault(_reminderroutes);
var _todoroutes = require('./routes/todo.routes'); var _todoroutes2 = _interopRequireDefault(_todoroutes);
var _docroutes = require('./routes/doc.routes'); var _docroutes2 = _interopRequireDefault(_docroutes);

var _authenticate = require('./database/authenticate');
var _User = require('./models/User');
var _App = require('./App'); var _App2 = _interopRequireDefault(_App);



var _Course = require('./models/Course');


const { auth, onlyAdmins, connecting } = _authenticate.authenticate.call(void 0, );

class Routes {
  

  constructor() {
    this.router = _express.Router.call(void 0, );
    this.routes();
  }

   routes() {
    this.router.get("/rich", (req, res) => {
      return res.render("pages/rich", {
        title: "Rich Text Editor",
      });
    });

    this.router.use(connecting);
    this.router.use("/authenticate", _authenticationroutes2.default);
    this.router.use("/", _othersroutes2.default);

    this.router.use("/users", auth, _userroutes2.default);
    this.router.use("/admin", auth, onlyAdmins, _adminroutes2.default);
    this.router.use("/apps", auth, _appsroutes2.default);
    this.router.use("/support", auth, _supportroutes2.default);
    this.router.use("/friends", auth, _friendroutes2.default);
    this.router.use("/publish", auth, _publishroutes2.default);
    this.router.use("/course", auth, _courseroutes2.default);
    this.router.use("/period", auth, _periodroutes2.default);
    this.router.use("/discipline", auth, _disciplineroutes2.default);
    this.router.use("/unity", auth, _unityroutes2.default);
    this.router.use("/class", auth, _classroutes2.default);
    this.router.use("/bulletin", auth, _bulletinroutes2.default);
    this.router.use("/work", auth, _workroutes2.default);
    this.router.use("/activity", auth, _activityroutes2.default);
    this.router.use("/evaluation", auth, _evaluationroutes2.default);
    this.router.use("/book", auth, _bookroutes2.default);
    this.router.use("/resume", auth, _resumeroutes2.default);
    this.router.use("/reminder", auth, _reminderroutes2.default);
    this.router.use("/TODO", auth, _todoroutes2.default);
    this.router.use("/docs", auth, _docroutes2.default); 

    this.router.post("/search", auth, async (req, res) => {
      const { search } = req.body;
      const user = new (0, _User.User)(_App2.default.get("user")),
        course = new (0, _Course.Course)(_App2.default.get("course"));

      if (!search || !user || !course) return res.redirect("/");

      const classes = [],
        books = [];

      course.periods.forEach((period) => {
        period.disciplines.forEach((discipline) => {
          discipline.unities.forEach((unity) =>            
            unity.classes ? classes.push(...unity.classes.map((c) => {
              c.courseId = course.id;
              c.periodId = period.id;
              c.disciplineId = discipline.id;
              c.unityId = unity.id;
              return c;
            })) : null
          );

          if (discipline.books) books.push(...discipline.books);
        });
      });

      let classesResult = classes,
        booksResult = books;

      if (classes.length > 0) {
        classesResult = classes.filter((classe) => {
          if (_optionalChain([classe, 'optionalAccess', _ => _.content, 'optionalAccess', _2 => _2.toLowerCase, 'call', _3 => _3(), 'access', _4 => _4.includes, 'call', _5 => _5(search.toLowerCase())]))
            return classe;
        });
      }

      if (books.length > 0) {
        booksResult = books.filter((book) => {
          if (_optionalChain([book, 'optionalAccess', _6 => _6.title, 'optionalAccess', _7 => _7.toLowerCase, 'call', _8 => _8(), 'access', _9 => _9.includes, 'call', _10 => _10(search.toLowerCase())]))
            return book;
        });
      }

      return res.json({ classes: classesResult, books: booksResult });
    });
  }
}

exports. default = new Routes().router;
