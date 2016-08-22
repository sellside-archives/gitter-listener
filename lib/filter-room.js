'use strict';

module.exports = function findRoom(client) {
  if (typeof client.options.filter === 'function') {
    return client.options.filter;
  }

  var dm = client.options.dm || false;
  return function(room) {
    if (dm) return true;
    return room.oneToOne !== true;
  };
};
