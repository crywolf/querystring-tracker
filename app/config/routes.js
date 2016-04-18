'use strict';

const KoaRouter = require('koa-router');
const api = require('../api');

const router = new KoaRouter();

router.get('/track', function *() {
  api.tracker.track(this);
});

router.get('/get-log', function *() {
  yield api.logServer.getLog(this);
});

module.exports = router;
