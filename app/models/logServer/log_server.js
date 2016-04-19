'use strict';


const config = require('../../config/environment');
const Jsoner = require('./jsoner.js');
const fs = require('fs');
const etag = require('etag');
const path = require('path');
const Q = require('q');

class LogServer {

  /**
  * @param {ctx} object Koa context
  * @returns {promise}
  */
  streamLogFile (ctx) {
    const logFile = config.tracker.logFile;

    const jsoner = new Jsoner();

    const def = Q.defer();
    fs.stat(logFile, def.makeNodeResolver());
    return def.promise
      .then((stats) => {
        if (!stats) return null;
        if (!stats.isFile()) return stats;

        ctx.response.status = 200;
        ctx.response.lastModified = stats.mtime;
        // we will remove traling comma (,) and wrap it into array ([orig. log file content])
        const fileSize = stats.size + 1;
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
          const fileSizeWithoutLastComma = stats.size - 1;
          ctx.body = fs.createReadStream(
            logFile,
            { start: 0, end: (fileSizeWithoutLastComma - 1) }
          ).pipe(jsoner);
        }

        return ctx;
      });
  }

}

module.exports = LogServer;
