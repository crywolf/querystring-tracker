'use strict';

const Q = require('q');
const redis = require('../redis');
const log = require('../log').module('Tracker');

class Tracker {

  /**
   * @param {stream} fs.writeStream
   */
  constructor (stream) {
    this._stream = stream;
    this._redis = redis.getClient();
  }

  /**
   * @param {object} parsedQueryString Parsed query string as object
   * @returns {promise}
   */
  track (parsedQueryString) {
    const query = parsedQueryString;

    this._stream.write(JSON.stringify(parsedQueryString));
    this._stream.write(',');

    let result;
    if (query.count) {
      const count = parseInt(query.count, 10);
      result = this._redis.incrby('count', count).catch(err => {
        log.warn(err, 'Error incrementing value in Redis');
      });
    } else {
      result = new Q();
    }
    return result;
  }
}

module.exports = Tracker;
