/**
 * 私聊
 * 
 * private 
 * 
 * 
 * 
 * 
 * 
 */
let Private = require('../models/db-private');
let User = require('../models/db-user')
let Friend = require('../models/db-linkman')
const { resSend } = require('../util/misc');
module.exports = {
  // 更新读消息 
  async readMsg(info) {
    let { to, token } = info;
    // timestamp = timestamp || Date.now();
    let from = token._id;
    // 所有未读的更新为已读
    await Private.updateMany({
      user: from,
      friend: to,
      // timestamp: { '$lt': timestamp },
      status: 0
    }, {
      $set: {
        status: 1
      }
    });
  
    return resSend();
  },

  // 保存消息数据
  async savePrivateMsg(info) {
    let { to, token, content } = info;
    let from = token._id;
    // 保留两份数据
    let [fromMsg, toMsg] = await Promise.all([
      Private.create({
        user: from,
        friend: to,
        creater: from,
        // 发送者消息状态 已读
        status: 1,
        content,
        timestamp: Date.now()
      }),
      Private.create({
        user: to,
        friend: from,
        creater: from,
        // 接收者消息状态 未读
        status: 0,
        content,
        timestamp: Date.now()
      }),
    ]);
    // 判断是否创建
    return resSend({ data: fromMsg });
  },
  // 私聊消息列表
  async getPrivateList(info) {
    // token 时间戳 私聊对象id 限制条数
    let { token, timestamp, to, limit } = info;
    timestamp = timestamp || Date.now();
    limit = limit || 10;
    let from = token._id;
    let privateList = await Private.find({
      $or: [{ creater: from }, { creater: to }],
      user: from,
      friend: to,
      // 获得小于传入的时间戳的数据
      timestamp: { '$lt': timestamp },
    }, null, 
    // 根据id降序，获取limit条数目的数据
    { 
      sort: '-_id', 
      limit
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
    return resSend({data: privateList})
  },
  // 根据id拉取私聊房间信息
  async getPrivateInfo(info) {
    let { id, token } = info;
    let userid = token._id;
    // let user = await User.findOne({
    //   _id: id
    // }
    // // 'avatar nickname _id ' 
    // )

    let frined = await Friend.findOne({
      owner: userid,
      friend: id
    }).populate({
      path: 'friend'
    });
    return resSend({
      data: frined
    })
  },
  async getUnReadPrivate(info) {
    let { token } = info;
    let from = token._id;
    let unReadPrivate = await Private.find({
      user: from,
      status: 0 
      },
    )
    .populate({
      path: 'user',
      // select: '_id nickname avatar account'
    }).populate({
      path: 'friend',
      // select: '_id nickname avatar account'
    });
    return resSend({
      data: unReadPrivate
    })
  }

}


/**
 * 
 * a-b  -b 
 * 
 * b-a -b 
 * 
 * a-b
 * 
 * b-a
 * 
 * a-b
 * b-a
 * 
 * 
 * 
 */