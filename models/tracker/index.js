'use strict';

const Tracker = require('./tracker');
const fs = require('fs');
const config = require('../../config/environment');

const TrackerService = {

  /**
   * @type {Tracker}
   */
  _tracker: null,

  init () {
    const loqStream = fs.createWriteStream(config.trackerLogFile, { flags: 'a' });
    this._tracker = new Tracker(loqStream);
  },

  /**
   * @param {object} parsedQueryString Parsed query string as object
   * @returns {promise}
   */
  track (parsedQueryString) {
    return this._tracker.track(parsedQueryString);
  }
};

module.exports = TrackerService;
