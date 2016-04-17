'use strict';

const winston = require('winston');
const config = require('../../config/environment');
winston.level = config.logger.consoleLevel;

module.exports = winston;

module.exports.module = (moduleName, logger) => { // eslint-disable-line arrow-body-style

  return {

    name: `[${moduleName.toUpperCase()}]`,
    logger: (logger || winston),

    error (err, metaData) {
      metaData = this._prepareMetaData(metaData);
      this.logger.error(err, metaData);
    },

    warn (err, metaData) {
      metaData = this._prepareMetaData(metaData);
      this.logger.warn(err, metaData);
    },

    info (err, metaData) {
      metaData = this._prepareMetaData(metaData);
      this.logger.info(err, metaData);
    },

    _prepareMetaData (metaData) {
      metaData = (metaData || {});
      if (typeof metaData === 'string') {
        metaData = { description: metaData };
      }
      metaData.module = this.name;
      return metaData;
    }

  };

};
