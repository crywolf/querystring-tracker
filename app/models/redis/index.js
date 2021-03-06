'use strict';

const config = require('../../config/environment');
const Redis = require('ioredis');
const Q = require('q');
const log = require('../log').module('Redis');

const redisService = {

  /**
   * @type {Redis}
   */
  _client: null,

  /**
   * @returns {promise}
   */
  init () {
    const client = new Redis(config.redis.options);

    client.on('connect', () => {
      log.info('Connected to Redis.');
    });

    client.on('reconnecting', () => {
      log.info('Reconnecting to Redis...');
    });

    client.on('error', (err) => {
      log.error(err, 'Unable to connect to Redis');
      process.exit(1);
    });

    this._client = client;
    return new Q();
  },

  /**
   * @returns {Redis} Redis instance
   */
  getClient () {
    return this._client;
  }

};

module.exports = redisService;
