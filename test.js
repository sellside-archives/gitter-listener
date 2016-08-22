'use strict';

require('mocha');
var assert = require('assert');
var Gitter = require('./');

describe('gitter-listener', function() {
  it('should export a function', function() {
    assert.equal(typeof Gitter, 'function');
  });

  //TODO: mock the gitter api calls for testing
});
