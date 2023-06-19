"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');

class AppsRoutes {
  

  constructor() {
    this.router = _express.Router.call(void 0, );
    this.routes();
  }

   routes() {
    this.router.get('/', (req, res) => {
      return res.send('Hello World!');
    });
  }
}

exports. default = new AppsRoutes().router;