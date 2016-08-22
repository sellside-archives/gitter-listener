'use strict';

var co = require('co');
var Gitter = require('../');

var config = {};

try {
  // this file is excluded from git. It just needs a property named `GITTER_TOKEN` with your gitter token.
  config = require('./config.json');
} catch (err) {
  console.error();
  console.error('To run the example, you need to create a `config.json` file in the `example` folder that looks like:');
  console.error();
  console.error(JSON.stringify({ GITTER_TOKEN: 'XXXXXXXXXX' }, null, 2));
  console.error();
  process.exit(1);
}

function reporter(type) {
  return function(msg, room, user) {
    console.log('[room]: ', room.name);
    console.log('[user]: ', user.displayName);
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
  console.log('connected');
}, function(err) {
  console.error('error');
  console.error(err);
});
