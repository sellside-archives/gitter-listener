'use strict';

var utils = require('./utils');

module.exports = function findRoom(client) {
  return function(room) {
    return utils.co(function*() {
      if (typeof room === 'object') {
        return yield client.gitter.rooms.find(room.id);
      }
      return yield client.gitter.rooms.findByUri(room);
    });
  };
};
