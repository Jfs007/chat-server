

const { resSend, parseToken } = require('../util/misc');
const friendadd = require('../controllers/friendadd');
const private = require('../controllers/private');
module.exports = function(socket) {
  // 获取某个房间私聊消息记录
  socket.on('getPrivateMsg', (info, cb) => {
    parseToken(info).then(async info => {
      let rs = await private.getPrivateList(info);
      cb(rs);
    }).catch(err => {
      cb(resSend(err));
    })
  });
  // 获取某个群聊的消息记录
  socket.on('getRoomMsg', (info, cb) => {
    
  });
  // 拉取私聊房间的
  socket.on('getPrivateRoomInfo', (info, cb) => {
    parseToken(info).then(async info => {
      let rs = await private.getPrivateInfo(info);
      cb(rs);
    }).catch(err => {
      cb(resSend(err));
    })
  });
  // 拉取非私聊房间消息
  socket.on('getRoomInfo', (info, cb) => {

  })

  // 读取消息
  socket.on('readPrivateMsg', (info, cb) => {
    parseToken(info).then(async info => {
      let rs = await private.readMsg(info);
      // socket
      cb(rs);
    }).catch(err => {
      cb(resSend(err));
    })
  });
  // 接受新消息
  socket.on('privateMessage', (info, cb) => {
    parseToken(info).then(async info => {
      let to = info.to;
      let rs = await private.savePrivateMsg(info);
      // 发送消息到用户 
      socket.to(to).emit('message.private', rs);
      cb(rs);
    }).catch(err => {
      cb(resSend(err));
    })
  });
  socket.on('getUnReadPrivate', (info, cb) => {
    parseToken(info).then(async info => {
      let rs = await private.getUnReadPrivate(info);
      cb(rs);
    }).catch(err => {
      cb(resSend(err));
    })
  });
 
}