/**
 * 房间成员列表项
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const roommember = new Schema({
  // 用户
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  // 外键 群id
  room: {
    type: Schema.Types.ObjectId,
    ref: 'room'
  },
  // 成员类型  普通人 0  管理员 1 群主 2
  memberClass: {
    type: Number,
    default: 0
  },
  // 进群时间
  intoGroupAt: {
    type: Date,
    default: new Date()
  },
  timestamp: Number,
  // 是否被禁言 0 没有 1 有
  isShutUp: {
    type: Date, 
    default: 0
  },
  


});
module.exports = mongoose.model('roommember', roommember);