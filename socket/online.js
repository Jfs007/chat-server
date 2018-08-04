
const { resSend, parseToken } = require('../util/misc');
const online = require('../controllers/online');

module.exports = function(socket) {
  socket.on('disconnect', async () => {
    // console.log('disconnect');
    let rs = await online.offLine({ socket });
    let { friends, userid } = rs.data;
    if(friends) {
      friends.map((friend) => {
        socket.to(friend.friend).emit('offline', { userid })
      })
    }
    return true;
  });
  // 用户上线
  socket.on('online', (info, cb) => {
    parseToken(info).then(async info => {
      let rs = await online.onLine(Object.assign(info, { socket }));
      cb(rs);
    }).catch(err => {
      cb(resSend(err));
    })
  });
  // 用户下线
  socket.on('offline', async (info, cb) => {
    console.log('offline')
    try {
      let rs = await online.offLine({ socket });
      cb(rs);
    } catch (error) {
      cb(resSend({message: error, code: -1}));
    }
  });
}