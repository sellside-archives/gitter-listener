'use strict';

var User = require('node-gitter/lib/users');

if (typeof User.prototype.getUnread !== 'function') {

  /**
   * Polyfill method for getting all unreadItems from a room.
   * This code is based on the internal `markAsUnread` method.
   *
   * ```js
   * user.getUnread('1234')
   *   .then(function(data) {
   *     console.log(data);
   * //=> {
   * //=>   chat: [ ... ],   // array of unread chat messages
   * //=>   mention: [ ... ] // array of unread mention messages
   * //=> }
   *   }, function(err) {
   *     console.error('err', err);
   *   });
   * ```
   *
   * @param {String} `roomId` Id of the room to get unread items from.
   * @param {Function} `cb` Optional callback function. This method returns a promise by default.
   * @api public
   */

  User.prototype.getUnread = function(roomId, cb) {
    var resourcePath = this.path + '/' + this.id + '/rooms/' + roomId + '/unreadItems';
    var resource = this.client.get(resourcePath);
    return cb ? resource.nodeify(cb) : resource;
  };
}


module.exports = User;
