'use strict';

const path = require('path');

// All configurations will extend these options
// ============================================
const all = {
  env: process.env.NODE_ENV || 'development',

  // Root path of the server
  root: path.normalize(`${__dirname}/../..`),

  // Server port
  port: process.env.PORT || 5000,

  // File to store parsed querystrings
  trackerLogFile: path.join(path.normalize(`${__dirname}/../..`), 'log/trackerLog.json')
};

let environmentConfig;
try {
  environmentConfig = require(`./${all.env}`);
} catch (error) {
  throw new Error(`Missing /config/environment/${all.env}.js file`);
}

// Export the config object based on the NODE_ENV
// ==============================================
const config = Object.assign(all, environmentConfig || {});

module.exports = config;
