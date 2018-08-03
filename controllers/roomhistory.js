const RoomHistory = require('../models/db-roomhistory')
const { resSend } = require('../util/misc');
const User = require('../models/db-user')
module.exports =  {
  // 保存群聊天记录 
  async saveRoomHistory(info) {
    let { token, roomid, content, type } = info;
    let userid = token._id;
    
    let [history, user] = await Promise.all([
      RoomHistory.create({
        creater: userid,
        roomid,
        content,
        timestamp: Date.now(),
        createAt: new Date(),
        type
      }),
      User.findOne({
        _id: userid
      })
    ]);
    history = history.toObject();
    history.creater = user;
    // ObjectId
    // history.roomid = roomid;
    return resSend({data: history});
  },
  // 私聊消息列表
  async getRoomHistory(info) {
    // token 时间戳 私聊对象id 限制条数
    let { timestamp, roomid, limit } = info;
    timestamp = timestamp || Date.now();
    limit = limit || 10;
    let roomHistory = await RoomHistory.find({
      roomid,
      // 获得小于传入的时间戳的数据
      timestamp: { '$lt': timestamp },
    }, null,
      // 根据id降序，获取limit条数目的数据
      {
        sort: '-_id',
        limit
      }).populate({
        path: 'creater'
      }).then((info) => {
        // 反序
        return info.reverse();
      })
    // .populate({
    //   path: 'user',
    //   // select: '_id nickname avatar account'
    // }).populate({
    //   path: 'friend',
    //   // select: '_id nickname avatar account'
    // })
    return resSend({ data: roomHistory })
  },
}