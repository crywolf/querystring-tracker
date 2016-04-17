'use strict';

const KoaRouter = require('koa-router');
const api = require('../api');

const router = new KoaRouter();

router.get('/track', function *() {
  api.tracker.track(this);
});

module.exports = router;
