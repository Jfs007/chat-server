/**
 * 上
 */
 let Online = require('../models/db-online');
 let User = require('../models/db-user');
 let Frinend = require('../models/db-linkman');
 const { resSend } = require('../util/misc');
 module.exports = {
   async onLine(info) {
    let { token, socket, device } = info;
    let id = token._id;
     console.log(socket.id, 'onLine');
     let [online, user] = await Promise.all([
      // 创建上线 
      Online.create({ socket: socket.id, user: id }),
      User.findOne({ _id: id })
    ]);
    user.device = device;
    user.onlineDevice++
    user.save();
    /**
     * 处理多端登录，， 是否跳掉
     */
    // online
    socket.join(id);
    // 返回用户信息
    return resSend({data: user});
   },
   async offLine(info) {
    let {socket} = info; 
    let online = await Online.findOne({
      socket: socket.id
    });
    if(!online) return resSend({data: {}})
    await online.remove();
    let userid = online.user;
    // 查询好友
    let friends = await Frinend.find({
      owner: userid
    });
    // 
    let user = await User.findOne({
      _id: userid
    });
    
    user.onlineDevice--;
    user.lastOnlineTime = Date.now();
     console.log(user.lastOnlineTime, '....')
    // 不await直接处理掉
    user.save();
    return resSend({ data: { friends, userid } });
   }
 }