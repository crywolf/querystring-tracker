'use strict';

const Q = require('q');
const co = require('co');
const redis = require('../models/redis');
const tracker = require('../models/tracker');

module.exports = co(function *() {

  yield Q.all([
    redis.init(),
    tracker.init()
  ]);

});
