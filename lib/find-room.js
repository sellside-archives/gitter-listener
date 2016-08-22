'use strict';

var co = require('co');

module.exports = function findRoom(client) {
  return function(room) {
    return co(function*() {
      if (typeof room === 'object') {
        return yield client.gitter.rooms.find(room.id);
      }
      return yield client.gitter.rooms.findByUri(room);
    });
  };
};
