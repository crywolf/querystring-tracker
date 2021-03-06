'use strict';

const Tracker = require('./tracker');
const fs = require('fs');
const config = require('../../config/environment');
const Q = require('q');

const trackerService = {

  /**
   * @type {Tracker}
   */
  _tracker: null,

  /**
   * @returns {promise}
   */
  init () {
    const logStream = fs.createWriteStream(config.tracker.logFile, { flags: 'a' });
    this._tracker = new Tracker(logStream);
    return new Q();
  },

  /**
   * @param {object} parsedQueryString Parsed query string as object
   * @returns {promise}
   */
  track (parsedQueryString) {
    return this._tracker.track(parsedQueryString);
  }

};

module.exports = trackerService;
