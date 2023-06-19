"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);

var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _expresssession = require('express-session'); var _expresssession2 = _interopRequireDefault(_expresssession);
var _expressflash = require('express-flash'); var _expressflash2 = _interopRequireDefault(_expressflash);

var _puglayout = require('pug-layout'); var _puglayout2 = _interopRequireDefault(_puglayout);

var _routes = require('./routes'); var _routes2 = _interopRequireDefault(_routes);

class App {
  

  constructor() {
    this.app = _express2.default.call(void 0, );
    this.config();
    this.routes();
  }

   config() {
    this.app.use(_express.json.call(void 0, ));
    this.app.use(_express.urlencoded.call(void 0, { extended: true }));
    this.app.use(_cors2.default.call(void 0, ));
    this.app.use('/public/', _express2.default.static('public/'));
    this.app.use('/fontawesome/', _express2.default.static('node_modules/@fortawesome/fontawesome-free/'));

    this.app.set('view engine', 'pug');
    const layout = _puglayout2.default.Layout('views/layout.pug');

    this.app.use(_expresssession2.default.call(void 0, {
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }
    }));

    this.app.use(_expressflash2.default.call(void 0, ));

    this.app.use((req, res, next) => {
      res.locals.session = req.session;
      next();
    });
  }

   routes() {
    this.app.use(_routes2.default);

    this.app.use((req, res) => {
      return res.status(404).render("pages/404", {
        message: req.flash("message")
      });
    });
  }
}

exports. default = new App().app;