'use strict';

const stream = require('stream');

class Jsoner extends stream.Transform {

  constructor () {
    super();
    this._flag = false;
  }

  _transform (chunk, encoding, next) {
    let data = chunk.toString();

    if (this._flag === false) {
      data = '[' + data; // eslint-disable-line prefer-template
      this._flag = true;
    }
    this.push(data);

    next();
  }

  _flush (done) {
    this.push(']');
    done();
  }

}

module.exports = Jsoner;
