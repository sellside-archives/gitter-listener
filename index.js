'use strict';

var Gitter = require('node-gitter');
var extend = require('extend-shallow');

// polyfill the User class
require('./lib/user');
var findRoom = require('./lib/find-room');
var subscribe = require('./lib/subscribe');

function Client(token, options) {
  if (!(this instanceof Client)) {
    return new Client(token, options);
  }

  this.options = extend({}, options);
  this.gitter = new Gitter(token, this.options);
}

Client.prototype.listen = function(rooms) {
  return co(function*() {
    var user = yield this.gitter.currentUser();
    rooms = arrayify(rooms);
    if (!rooms.length) {
      rooms = yield this.user.rooms();
    }

    rooms = yield rooms.map(findRoom(this));
    return yield rooms.map(subscribe(this))
      then(function(results) {
        console.log(results);
      }, function(err) {
        throw err;
      });
  });
};

/**
 * Expose Client
 */

module.exports = Client;
