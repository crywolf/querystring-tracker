'use strict';

const TrackerApi = require('./tracker_api');
const LogServerApi = require('./log_server_api');

module.exports = {
  tracker: new TrackerApi(),
  logServer: new LogServerApi()
};
