'use strict';

var co = require('co');
var Gitter = require('../');
var config = require('./config.json');

function reporter(type) {
  return function(msg) {
    console.log(`[${type}]: `, msg);
  };
}

co(function*() {
  var gitter = new Gitter(config.GITTER_TOKEN);
  gitter.on('chatMessages', reporter('chatMessages'));
  gitter.on('users', reporter('users'));
  gitter.on('events', reporter('events'));

  return gitter.listen();
})
.then(function(results) {
  console.log('done');
  console.log(results);
}, function(err) {
  console.error('error');
  console.error(err);
});
