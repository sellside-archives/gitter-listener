'use strict';

var co = require('co');
var Gitter = require('node-gitter');
var extend = require('extend-shallow');
var Emitter = require('component-emitter');

// polyfill the User class
require('./lib/user');
var findRoom = require('./lib/find-room');
var subscribe = require('./lib/subscribe');

/**
 * Creates a client that listens for gitter events.
 *
 * ```js
 * var client = Client(process.env.GITTER_TOKEN);
 * ```
 *
 * @param {String} `token` Gitter token from [the gitter developer apps page](https://developer.gitter.im/apps).
 * @param {Object} `options` Additional options to pass along to [node-gitter]
 * @api public
 */

function Client(token, options) {
  if (!(this instanceof Client)) {
    return new Client(token, options);
  }
  Emitter(this);

  this.options = extend({}, options);
  this.gitter = new Gitter(token, this.options);
}

/**
 * Tell the client to start listening for gitter events. Setup any event listeners for the events before starting the client.
 *
 * ```js
 * client.on('chatMessages', console.log);
 * client.on('users', console.log);
 * client.on('events', console.log);
 * ```
 *
 * @param  {Array} `rooms` Optional array of rooms to listen to. If empty, the client will use all the rooms the gitter user has previously joined. The gitter user is the user associated with the token used above.
 * @return {Promise} Returns a promise that will resolve to a boolean when the client has finished setting up listeners.
 * @api public
 */

Client.prototype.listen = function(rooms) {
  var self = this;
  return co(function*() {
    var user = yield self.gitter.currentUser();
    rooms = arrayify(rooms);
    if (!rooms.length) {
      rooms = yield user.rooms();
    }

    rooms = yield rooms.map(findRoom(self));
    return yield rooms.map(subscribe(self))
      then(function(results) {
        return true;
      }, function(err) {
        throw err;
      });
  });
};

/**
 * Expose Client
 */

module.exports = Client;

function arrayify(val) {
  return val ? (Array.isArray(val) ? val : [val]) : [];
}
