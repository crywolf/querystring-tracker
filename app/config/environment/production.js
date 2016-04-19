'use strict';


// Testing specific configuration
// ==================================
module.exports = {
  redis: {
    options: process.env.REDISCLOUD_URL
  },

  logger: {
    consoleLevel: 'error'
  }
};
