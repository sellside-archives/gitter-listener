'use strict';

var co = require('co');

var types = [
  'chatMessages',
  'events',
  'users'
];

module.exports = function subscribe(client) {
  return function(room) {
    co(function*() {
      var user = yield client.gitter.currentUser();
      var listener = listen.bind(client, room, user);

      if (room.unreadItems) {
        var unread = yield user.getUnread(room.id);
        yield user.markAsRead(room.id, unread.chat);
      }

      types.forEach(listener);
      return room.subscribe();
    });
  };
};

function listen(room, user, type) {
  var client = this;
  room.on(type, function(msg) {
    if (type === 'chatMessages' && msg.operation === 'create' && msg.model.unread === true) {
      user.markAsRead(room.id, [msg.model.id]);
    }
    client.emit(type, msg);
  });
}
