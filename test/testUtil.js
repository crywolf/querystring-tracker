'use strict';

process.env.NODE_ENV = 'testing';

const app = require('koa')();
const request = require('co-supertest');

const testUtil = {

  _initialized: false,

  _app: null,

  _mocha: null,

  before (mocha) {
    this._initialize(mocha);
  },

  /**
   * @returns {Server} Koa HTTP server
   */
  app () {
    if (this._app === null) {
      this._app = app;

      const routes = require('../app/config/routes');
      this._app.use(routes.routes());
    }

    return this._app.listen();
  },

  request () {
    if (!this._initialized) {
      throw new Error('Mocha should be initialized!');
    }
    return request(this.app());
  },

  _initialize (mocha) {
    if (this._initialized) {
      return;
    }

    const self = this;
    this._mocha = mocha;

    mocha.before((done) => {
      require('../app/config/bootstrap')
        .then(() => {
          self._initialized = true;
          done();
        }, done);
    });
  }

};

module.exports = testUtil;
