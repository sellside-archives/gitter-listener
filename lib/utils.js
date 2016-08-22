'use strict';

var utils = require('lazy-cache')(require);
var fn = require;
require = utils;

/**
 * Lazily required module dependencies
 */

require('co');
require('component-emitter', 'Emitter');
require('extend-shallow', 'extend');
require('node-gitter', 'Gitter');
require = fn;

/**
 * Arrayify values
 */

utils.arrayify = function(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
};

/**
 * Expose `utils` modules
 */

module.exports = utils;
