'use strict';

const config = require('../config/environment');
const Q = require('q');
const co = require('co');
const redis = require('../models/redis');
const tracker = require('../models/tracker');

module.exports = co(function *() {

  yield Q.all([
    redis.init(),
    tracker.init()
  ]);

  if (config.redis.flushDbOnBootsrap) {
    yield redis.getClient().flushdb();
  }

});
