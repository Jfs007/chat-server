const FriendAdd = require('../models/db-friendadd');
const Friend = require('../models/db-linkman');
const Private = require('../models/db-private');

const { resSend } = require('../util/misc');
module.exports = {
  // 添加朋友 发起
  async addFriend(info) {
    let { token, to, remark, origin, authInfo } = info;
    let from = token._id;
    let requestHasBeen = null;
    // 是否已经有该请求了
    try {
      requestHasBeen = await FriendAdd.findOne({
        creater: from,
        addPeople: to,
        acceptStatus: 0
      })
        .populate(
          { path: 'addPeople' }
        )
        .populate(
          { path: 'creater' }
        );
    } catch (error) {
      console.log(error)
    }
    
    if(requestHasBeen) {
      return resSend({ data: requestHasBeen });
    };
    await FriendAdd.create({
      creater: from,
      addPeople: to,
      remark,
      origin,
      authInfo
    });
    
    let friendadd =  await FriendAdd.findOne({
      creater: from,
      addPeople: to}).populate(
        { path: 'addPeople'}
      )
      .populate(
      { path: 'creater'}
      );
    // 返回好友列表
    return resSend( { data: friendadd });
  },

  async agreeFriend(info) {
    // 好友添加请求的id FriendAdd的主键id 被添加人的备注名
    let { id, remark } = info;
    
    // 查找并且填充用户信息
    let friendadd = await FriendAdd.findOne({
      _id: id
    })
    .populate(
      {
        select: 'nickname',
        path: 'creater'
      }
    )
    .populate(
      {
        select: 'nickname',
        path: 'addPeople'
      }
    );
    // 
    let { creater, addPeople } = friendadd;
    /// 添加好友
    // 添加者好友名单添加
    await Promise.all(
      [
        // 发起添加的人
        Friend.create({
          // _id: creater._id,
          remarkname: friendadd.remark|| addPeople.nickname ,
          owner: creater._id,
          friend: addPeople._id
        }),
        //  被添加的人
        Friend.create({
          remarkname: remark || creater.nickname,
          // _id: addPeople._id,
          owner: addPeople._id,
          friend: creater._id
        })
      ]
    );
    // 更新添加表状态
    await FriendAdd.update({ _id: id }, { $set: {
      dealWithEndAt: Date.now(),
      acceptStatus: 1
    }});
    
    // 返回好友添加请求表的id，，客户端可以根据id更新列表
    return resSend({ data: { id, from: addPeople._id, to: creater._id } });
  },
  // 残忍拒绝 不想添加你
  async rejectFriend(info) {
    let { id } = info;
    console.log('dasdfasdf', id)
    // 更新添加表状态
    await FriendAdd.update({ _id: id }, { $set: {
      dealWithEndAt: Date.now(),
      acceptStatus: 2
    }});
    let friendadd = await FriendAdd.findOne({
      _id: id
    })
    // 返回好友添加请求表的id，，客户端可以根据id更新列表
    return resSend({ data: { id, from: friendadd.addPeople, to: friendadd.creater } });
  },
  // 获取好友请求列表 
  async getFriendRequest(info) {
    let { token, limit } = info;
    limit = limit || 3
    // 他人发送的请求/向他人的请求
    let request_list = await FriendAdd.find({
    // 添加人是自己或者创建人是自己的表
      $or: [
        { addPeople: token._id }, 
        { creater: token._id }
      ],
      // timestamp: { '$lt': timestamp }
    }, null, 
      // 根据timesp序
      { sort: 'timestamp' })
    .populate(
      { path: 'addPeople' }
    )
    .populate(
      { path: 'creater' }
    );
    // 处理数据  
    return resSend({
      data: {
        request_list,
        account: token.user
      }
    })
  },
  async getRequestDetail(info) {
    // 好友请求表id
    let {id, token} = info;
    let userid = token._id;
    let request = await FriendAdd.findOne({
      // 添加人是自己或者创建人是自己的表
      _id: id,
    })
    .populate(
      { path: 'creater' }
    );
    // 
    let createrId = request.creater._id;
    let userFriend = await Friend.find({
      owner: userid,
    }, 'friend');
    let ids = userFriend.map(item => item.friend);
    let mutualFriend = await Friend.find({
      owner: createrId,
      friend: {$in: ids}
    });
    request = request.toObject();
    request.mutualFriend = mutualFriend;
    // 处理数据  
    return resSend({
      data: request
    })
  }

}