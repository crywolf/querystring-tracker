'use strict';

const path = require('path');

// Testing specific configuration
// ==================================
module.exports = {
  // File to store parsed querystrings
  tracker: {
    deleteLogFileOnBootstrap: true,
    logFile: path.join(path.normalize(`${__dirname}/../../..`), 'log/testingTrackerLog.json')
  },

  redis: {
    flushDbOnBootsrap: true,
    options: {
      port: 6379,
      host: '127.0.0.1',
      db: 1
    }
  },

  logger: {
    consoleLevel: 'error'
  }
};
