// 群

let Online = require('../models/db-online');
let User = require('../models/db-user');
let Room = require('../models/db-room');
const RoomMember = require('../models/db-roommember');
const { resSend } = require('../util/misc');

module.exports = {
  // 加入房间
  async joinRoom(info) {
    let { userid, roomid } = info;
    let user = await User.findOne({
      _id: userid,
    });
    
    if (!user.rooms.includes(roomid)) {
      // 用户加入
      user.rooms.push(roomid);
      // 房间添加该成员
      RoomMember.create({
        user: userid,
        room: roomid,
        timestamp: Date.now(),
        intoGroupAt: new Date()
      });
    }
    user.save();
    resSend({
      data: ''
    })
  },
  // 获取房间信息
  async getRoomInfo(info) {
    let { roomid } = info;
    let rooms = await Room.findOne({
      _id: roomid
    });
    return resSend({
      data: rooms
    })
  },
  
  async getRoomUsers(info) {
    let { roomid, limit } = info;
    
    let total = 0;
    let roomUsers = await RoomMember.find({
      room: roomid
    }, null, {
        sort: '-memberClass'
    }).populate({
      path: 'user'
    }).then((ret) => {
      total = ret.length;
      if(!limit) return ret;
      return ret.slice(0, limit)
    })
    return resSend({
      data: 
        { roomUsers, total }
      })
  },
  
}