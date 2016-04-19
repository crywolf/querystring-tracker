'use strict';

const testUtil = require('../testUtil');
const mocha = require('mocha');
const before = mocha.before;
const describe = mocha.describe;
const it = mocha.it;
const assert = require('assert');


describe('Log Server API', () => {

  testUtil.before(mocha);

  before(function *() {
    // eslint-disable-next-line max-len
    const querystring = 'pokus[key1]=cosi&lavor=true&cislo=235&foo=bar&baz=qux&baz=quux&corge&user[name][first]=Tobi&user[email]=tobi@example.com&count=2';
    yield testUtil.request()
      .get(`/track?${querystring}`);
  });

  it('GET /get-log should return valid JSON log file', function *() {
    const response = yield testUtil.request()
      .get('/get-log')
      .end();

    assert.equal(response.status, 200);
    assert.equal(response.headers['content-type'], 'application/json; charset=utf-8');
    assert.equal(response.headers['content-length'], '172');
    // eslint-disable-next-line max-len
    assert.equal(response.headers['content-disposition'], 'attachment; filename="testingTrackerLog.json"');
  });

});
