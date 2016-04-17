'use strict';

process.env.NODE_ENV = 'testing';

const koa = require('koa');

const testUtil = {

  _initialized: false,

  _app: null,

  _mocha: null,

  before (mocha) {
    this._initialize(mocha);
  },

  /**
   *
   * @returns {*|exports}
   */
  app () {
    if (this._app === null) {
      this._app = koa();

      const api = require('../app/api');
      this._app.use(api);
    }

    return this._app;
  },

  // request () {
  //   if (!this._initialized) {
  //     throw new Error('Mocha should be initialized!');
  //   }
  //   return request(this.app());
  // },

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
