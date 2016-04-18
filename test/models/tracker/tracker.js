'use strict';

const testUtil = require('../../testUtil');
const mocha = require('mocha');
const describe = mocha.describe;
const beforeEach = mocha.beforeEach;
const it = mocha.it;
const assert = require('assert');
const tracker = require('../../../app/models/tracker');
const redis = require('../../../app/models/redis');
const config = require('../../../app/config/environment');
const fs = require('fs');
const Q = require('q');


describe('Tracker', () => {

  testUtil.before(mocha);

  beforeEach(function *() {
    fs.truncateSync(config.tracker.logFile);

    const r = redis.getClient();
    yield r.set('count', 0);
  });

  const parsedQueryString = {
    foo: 'bar',
    baz: ['qux', 'quux'],
    corge: '',
    user: { name: { first: 'Tobi' }, email: 'tobi@example.com' },
    count: '2'
  };

  it('should save querystring into the file', function *() {
    yield tracker.track(parsedQueryString);

    return Q.nfcall(fs.stat, config.tracker.logFile)
      .then((stat) => {
        assert(stat.isFile(), `Log file ${config.tracker.logFile} does not exist!`);

        const stringLength = JSON.stringify(parsedQueryString).length + 1; // extra comma
        assert.equal(stringLength, stat.size);
      });
  });

  it('should increment Redis counter when "counter" parameter is present', function* () {
    const r = redis.getClient();

    const countBefore = yield r.get('count');
    assert.equal(parseInt(countBefore, 10), 0);

    yield tracker.track(parsedQueryString);

    const countAfter = yield r.get('count');
    assert.equal(
      parseInt(countAfter, 10),
      parseInt(countBefore, 10) + parseInt(parsedQueryString.count, 10)
    );
  });

  it('should not increment Redis counter when "counter" parameter is not present', function* () {

    const parsedQueryStringWithoutCount = Object.assign({}, parsedQueryString);
    delete parsedQueryStringWithoutCount.count;

    const r = redis.getClient();

    const countBefore = yield r.get('count');
    assert.equal(parseInt(countBefore, 10), 0);

    yield tracker.track(parsedQueryStringWithoutCount);

    const countAfter = yield r.get('count');
    assert.equal(parseInt(countAfter, 10), parseInt(countBefore, 10));
  });

  it('should not increment Redis counter when "counter" parameter is not a number', function* () {

    const parsedQueryStringWithStringCount = Object.assign({}, parsedQueryString);
    parsedQueryStringWithStringCount.count = 'notANumber';

    const r = redis.getClient();

    const countBefore = yield r.get('count');
    assert.equal(parseInt(countBefore, 10), 0);

    yield tracker.track(parsedQueryStringWithStringCount);

    const countAfter = yield r.get('count');
    assert.equal(parseInt(countAfter, 10), parseInt(countBefore, 10));
  });

});
