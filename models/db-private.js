/**
 * 私聊的消息
 * 
 * 
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const private = new Schema({
  // 消息主体
  content: String,

  // 一条消息需要保存两份，，所以再保留一个创建者发送者id，，user，friend分别给两个人
  // 消息创建者
  creater: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  // 用户的id
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  // 盆友的id
  friend: {
    type: Schema.Types.ObjectId,
    ref: 'user'
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
  
  
  timestamp: Number
});
module.exports = mongoose.model('private', private);