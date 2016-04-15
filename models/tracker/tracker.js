'use strict';

const Q = require('q');
const Redis = require('ioredis');
const log = require('../log').module('Tracker');

class Tracker {

  /**
   * @param {stream} fs.writeStream
   */
  constructor (stream) {
    this._stream = stream;
  }

  /**
   * @param {object} parsedQueryString Parsed query string as object
   * @returns {promise}
   */
  track (parsedQueryString) {
    const query = parsedQueryString;

    this._stream.write(JSON.stringify(parsedQueryString));
    this._stream.write(',');

    const redis = new Redis();

    let result;
    if (query.count) {
      const count = parseInt(query.count, 10);
      result = redis.incrby('count', count).catch(err => {
        log.info(err, 'Error incrementing value in Redis');
      });
    } else {
      result = new Q();
    }
    return result;
  }
}

module.exports = Tracker;
