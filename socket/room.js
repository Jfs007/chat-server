

const { resSend, parseToken } = require('../util/misc');
const room = require('../controllers/room');
const roomHistory = require('../controllers/roomhistory');
// const 
// const 
// 房间
module.exports = function (socket) {
  // 拉取房间的信息
  socket.on('getRoomInfo', (info, cb) => {
    parseToken(info).then(async info => {
      let rs = await room.getRoomInfo(info);
      cb(rs);
    }).catch(err => {
      cb(resSend(err));
    })
  });
  socket.on('getRoomUsers', (info, cb) => {
    parseToken(info).then(async info => {
      let rs = await room.getRoomUsers(info);
      cb(rs);
    }).catch(err => {
      cb(resSend(err));
    })
  });
  
  // 接受房间消息
  socket.on('roomMessage', (info, cb) => {
    parseToken(info).then(async info => {
      // token, roomid, content
      let rs = await roomHistory.saveRoomHistory(info);
      // 推送消息
      socket.broadcast.to(info.roomid).emit('message.room', rs);
      cb(rs);
    })
  });
  socket.on('getRoomHistory', (info, cb) => {
    parseToken(info).then(async info => {
      // token, roomid, content
      let rs = await roomHistory.getRoomHistory(info);
      // 推送消息
      // socket.broadcast.to(info.roomid).emit('message.room', rs);
      cb(rs);
    })
  })
}