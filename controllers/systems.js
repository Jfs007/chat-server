const FriendAdd = require('../models/db-friendadd');
const Friend = require('../models/db-linkman');
const Private = require('../models/db-private');
const Room = require('../models/db-room');
const User =require('../models/db-user');
const room = require('./room');
const { resSend } = require('../util/misc');

const RoomHistory = require('../models/db-roomhistory');

const conf = require('../conf/common-conf')

module.exports = {
  // 好友同意通知
  async friendAgreeNotice(info, socket) {
    let { from, to } = info;
    // 系统消息 from 被请求者的消息， to 发起请求者的消息
    let [fromMsg, toMsg] = await Promise.all([
      // 被请求者 该好友同意请求
      Private.create({
        user: from,
        friend: to,
        creater: to,
        // 发送者消息状态 已读
        status: 0,
        content: '你们已经成功加为好友',
        msgType: 1,
        timestamp: Date.now()
      }),
      Private.create({
        user: to,
        friend: from,
        creater: from,
        // 接收者消息状态 未读
        status: 0,
        content: '你们已经成功加为好友',
        msgType: 1,
        timestamp: Date.now()
      }),
    ]);
    socket.to(from).emit('message.private', resSend({ data: fromMsg }));
    socket.to(to).emit('message.private', resSend({ data: toMsg }));
    // return resSend({data: { fromMsg, toMsg }})
  },
  // 加入默认房间
  async joinPresetRoom(userid, socket) {
    let [tRoom, tUser] = await Promise.all([
      Room.findOne({
        name: conf.NORMAL_ROOM.NAME
      }),
      User.findOne({
        _id: userid
      })
    ]);
    if(!tRoom) {
      tRoom = await Room.create({
        name: conf.NORMAL_ROOM.NAME
      })
    }
    let roomid = tRoom._id;
    // 如果在了不再加入
    if (tUser.rooms.indexOf(+roomid)> -1) {
      return resSend()
    };
    let rs = await room.joinRoom({
      userid,
      roomid
    });
    let nickname = tUser.nickname;
    let history = await RoomHistory.create({
      roomid: roomid,
      creater: userid,
      // xxx 加入了本群
      content: nickname,
      msgType: 1
    });
    // 接受群聊
    socket.join(roomid);
    // 推送昂消息
    socket.broadcast.to(roomid).emit('message.room', resSend({ data: history }));
    resSend({data: rs});
  }

  


}