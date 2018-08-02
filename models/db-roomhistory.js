/**
 * 群聊天记录
 * 
 * 
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const roomhistory = new Schema({
  // 消息主体
  content: String,
  // 消息发送者
  creater: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  // 房间的id
  roomid: {
    type: Schema.Types.ObjectId,
    ref: 'room'
  },
  // 消息状态管理 0 未读 1 已读 2 删除
  status: {
    type: Number,
    default: 0
  },
  createAt: {
    type: Date,
    default: Date.now()
  },
  // 消息类型 0 好友消息 1 系统消息
  msgType: {
    type: Number,
    default: 0
  },
  // 默认text
  type: {
    type: String,
    default: 'text'
  },
  timestamp: Number
});
module.exports = mongoose.model('roomhistory', roomhistory);