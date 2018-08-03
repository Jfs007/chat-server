
const user = require('../controllers/user');
const online = require('../controllers/online');
const { resSend, parseToken } = require('../util/misc');
const systems = require('../controllers/systems');
module.exports = function (socket) {
  // 注册
  socket.on('register', async (info, cb) => {
    let rs = await user.createUser(info);
    cb(rs);
  });
  // 登录
  socket.on('login', async (info, cb) => {
    let rs = await user.verifyUser(info);
    if(rs.code!== -1) systems.joinPresetRoom(rs.data._id, socket);
    cb(rs);
  });

  // 获取用户信息 
  /**
   * info {}
   * 
   * 
   */
  socket.on('getUserInfo', (info, cb) => {
    parseToken(info).then(async info => {
      let rs = await user.getUserInfo(info);
      cb(rs);
    }).catch(err => {
      cb(resSend(err));
    })
  });
  socket.on('searchUser', (info, cb) => {
    parseToken(info).then(async info => {
      let rs = await user.getUser(info);
      cb(rs)
    }).catch(err => {
      cb(resSend(err));
    })
  });
  socket.on('updateUser', (info, cb) => {
    parseToken(info).then(async info => {
      let rs = await user.updateUser(info);
      cb(rs)
    }).catch(err => {
      cb(resSend(err));
    })
  });
  // 拉取房间列表
  socket.on('getRoomList', (info, cb) => {
    parseToken(info).then(async info => {
      let rs = await user.getRoomList(info);
      let rooms = rs.data.rooms;
      rooms.map(room => {
        // 加入房间
        socket.join(room._id);
      });
      cb(rs)
    }).catch(err => {
      cb(resSend(err));
    })
  })
};