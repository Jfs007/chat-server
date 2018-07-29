

const { resSend, parseToken } = require('../util/misc');
const friend = require('../controllers/friend');
const friendadd = require('../controllers/friendadd');
const systems = require('../controllers/systems');
// const systems = require('../controllers/systems');
module.exports = function(socket) {
  socket.on('addFriend', (info, cb) => {
    parseToken(info).then(async info => {
      let rs = await friendadd.addFriend(info);
      socket.to(info.to).emit('friendRequest', rs);
      cb(rs);
    }).catch(err => {
      cb(resSend(err));
    })
  });
  socket.on('getFriendList', (info, cb) => {
    parseToken(info).then(async info => {
      let rs = await friend.getFriendList(info);
      cb(rs);
    }).catch(err => {
      cb(resSend(err));
    })
  });
  socket.on('getFriendRequest', (info, cb) => {
    parseToken(info).then(async info => {
      let rs = await friendadd.getFriendRequest(info);
      cb(rs);
    }).catch(err => {
      cb(resSend(err));
    })
  });
  socket.on('agreeFriend', (info, cb) => {
    parseToken(info).then(async info => {
      let rs = await friendadd.agreeFriend(info);
      // to 发送到请求者 from 同意请求的好友
      systems.friendAgreeNotice({ from: rs.data.from, to: rs.data.to }, socket);
      // let to = 
      // 发送到用户 
      socket.to(rs.data.to).emit('agreeFriend', {data: rs.data.id});
      cb(rs);
    }).catch(err => {
      cb(resSend(err));
    })
  });
  // socket.on('')
  // 
  socket.on('rejectFriend', (info, cb) => {
    parseToken(info).then(async info => {
      let rs = await friendadd.rejectFriend(info);
      socket.to(rs.data.to).emit('rejectFriend', { data: rs.data.id });
      cb(rs);
    }).catch(err => {
      cb(resSend(err));
    })
  });
  socket.on('getRequestDetail', (info, cb) => {
    parseToken(info).then(async info => {
      let rs = await friendadd.getRequestDetail(info);
      cb(rs);
    }).catch(err => {
      cb(resSend(err));
    })
  });

  

}