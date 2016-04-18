'use strict';

const ApiController = require('./api_controller');
// const tracker = require('../models/tracker');
const config = require('../config/environment');
// const co = require('co');
const fs = require('fs');
const etag = require('etag');
const path = require('path');
const Q = require('q');

class LogServerApi extends ApiController {

  /**
   * @param {ctx} object Koa context
   * @returns {promise}
   */
  getLog (ctx) {
    const logFile = config.tracker.logFile;

    const def = Q.defer();
    fs.stat(logFile, def.makeNodeResolver());
    return def.promise
      .then((stats) => {
        if (!stats) return null;
        if (!stats.isFile()) return stats;

        const fileSize = stats.size - 1; // we will remove tracing comma (,)
        ctx.response.status = 200;
        ctx.response.lastModified = stats.mtime;
        ctx.response.length = fileSize;
        ctx.response.type = path.extname(logFile);
        ctx.response.attachment(path.basename(logFile));

        if (!ctx.response.etag) {
          ctx.response.etag = etag(stats, { weak: true });
        }

        const fresh = ctx.request.fresh;
        if (fresh) {
          ctx.response.status = 304;
        } else {
          // @todo obalit do pole!!!!!
          ctx.body = fs.createReadStream(logFile, { start: 0, end: fileSize });
        }

        return stats;
      });
  }
}

module.exports = LogServerApi;
