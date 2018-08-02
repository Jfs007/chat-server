
const socketFriendAdd = require('./friendadd');
const scoketMessage = require('./message');
const socketOnline = require('./online');
const socketUser = require('./user');
const socketRoom = require('./room');
module.exports = function(io) {
  io.on('connect', function(socket) {
    socketFriendAdd(socket);
    scoketMessage(socket);
    socketOnline(socket);
    socketUser(socket);
    socketRoom(socket);
  })
};


