
const user = require('../controllers/user');
const online = require('../controllers/online');
const { resSend, parseToken } = require('../util/misc');

module.exports = function (socket) {
  // 注册
  socket.on('register', async (info, cb) => {
    let rs = await user.createUser(info);
    cb(rs);
  });
  // 登陆
  socket.on('login', async (info, cb) => {
    let rs = await user.verifyUser(info);
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
  })
};