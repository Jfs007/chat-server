let Friend = require('../models/db-linkman');
const { resSend } = require('../util/misc');
module.exports = {
  // 添加好友 双向的
  /**
   * 
   * @param {*} info { creater, addPeople }
   */
  async addFriend(info) {
    let { creater, addPeople } = info;
    // 添加者好友名单添加
    await Promise.all(
      [
        Friend.create({
          // _id: creater._id,
          remarkname: addPeople.nickname,
          owner: creater._id,
          friend: addPeople._id
        }),
        Friend.create({
          remarkname: creater.nickname,
          // _id: addPeople._id,
          owner: addPeople._id,
          friend: creater._id
        })
      ]
    )
    return resSend();
  },
  /**
   * 好友列表
   * @param {*} info { token }
   */
  async getFriendList(info) {
    let { token } = info;
    let id = token._id;
    let friendList = await Friend.find({
      owner: id
    }).populate({
      path: 'friend'
    });
    return resSend({
      data: friendList
    })
    
  },

  /**
   * 删除好友
   */

  async deleteFriend(info) {
    let { token, to } = info;
    let id = token._id;
    // 双向删除
    let friend = await Promise.all([
      Friend.findOne({
        owner: id, 
        friend: to
      }).remove(),
      Friend.findOne({
        owner: to,
        friend: id
      }).remove()
    ]);
    return resSend();
  },
  /**
   *  修改备注
   */
  async updateRemarkName(info) {
    let {token, to, remarkname } = info;
    let id = token._id;
    await Friend.update({ owner: id, friend: to}, 
      {
        $set: {
          remarkname
        }
      }
    )
    return resSend();
  },
  
}


//  