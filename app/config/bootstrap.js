'use strict';

const config = require('../config/environment');
const Q = require('q');
const co = require('co');
const redis = require('../models/redis');
const redisPublisher = require('../models/redis/publisher');
const redisSubscriber = require('../models/redis/subscriber');
const tracker = require('../models/tracker');
const fs = require('fs');
const log = require('../models/log').module('Bootstrap');

module.exports = co(function *() {

  if (config.tracker.deleteLogFileOnBootstrap) {
    try {
      yield Q.nfcall(fs.unlink, config.tracker.logFile);
    } catch (err) {
      log.info(err);
    }
  }

  yield Q.all([
    redis.init(),
    redisPublisher.init(),
    redisSubscriber.init(),
    tracker.init()
  ]);

  if (config.redis.flushDbOnBootsrap) {
    yield redis.getClient().flushdb();
  }

});
