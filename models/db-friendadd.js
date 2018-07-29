// 好友请求/添加表
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const friendadd = new Schema({
  // 创建日期 发起添加
  createdAt: {
    type: Date,
    default: Date.now()
  },
  timestamp: {
    type: Number,
    default: Date.now()
  },
  // 是否同意，，0未处理 1同意 2拒绝
  acceptStatus: {
    type: Number,
    default: 0
  },
  // 验证信息
  authInfo: {
    type: String,
    default: ''
  },
  // 备注
  remark: {
    type: String,
    default: ''
  },
  // 添加来源 0 好友搜索  1 来自群
  origin: {
    type: Number,
    default: 0
  },
  // 创建人(添加者)
  creater: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  // 添加人
  addPeople: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  // 该表处理结束后的日期 同意/拒绝
  dealWithEndAt: {
    type: Date,
    default: Date.now()
  }
});
module.exports = mongoose.model('friendadd', friendadd);