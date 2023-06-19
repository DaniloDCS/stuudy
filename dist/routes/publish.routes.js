"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');







class PublishRoutes {
  

  constructor() {
    this.router = _express.Router.call(void 0, );
    this.routes();
  }

   routes() {
    this.router.get('/', async (req, res) => {
      return res.render('pages/publishes', { title: 'Timeline' });
    });
  }
}

exports. default = new PublishRoutes().router;