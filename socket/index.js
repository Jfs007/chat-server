
// const jwt = require('jsonwebtoken');
// const { resSend, parseToken } = require('../util/misc');
// const { JWT_KEY } = require('../conf/common-conf');
// const user = require('../controllers/user');
// const friend = require('../controllers/friend');
// const friendadd = require('../controllers/friendadd');
// const private = require('../controllers/private');
// const online =require('../controllers/online');
const socketFriendAdd = require('./friendadd');
const scoketMessage = require('./message');
const socketOnline = require('./online');
const socketUser = require('./user');


module.exports = function(io) {
  io.on('connect', function(socket) {
    socketFriendAdd(socket);
    scoketMessage(socket);
    socketOnline(socket);
    socketUser(socket);
  })
};


