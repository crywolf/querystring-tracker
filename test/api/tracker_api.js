'use strict';

const testUtil = require('../testUtil');
const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it;

describe('Tracker API', () => {

  testUtil.before(mocha);

  it('GET /track should return 200 OK', function *() {
    yield testUtil.request()
      .get('/track')
      .expect(200);
  });

  it('GET /track with querystring should return 200 OK', function *() {
    yield testUtil.request()
      .get('/track?count=1')
      .expect(200);
  });

  it('GET /nonexistentUrl should return 404 Not Found', function *() {
    yield testUtil.request()
      .get('/nonexistentUrl')
      .expect(404);
  });
});
