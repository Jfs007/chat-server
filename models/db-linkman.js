// 联系人好友表
const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const linkman = new Schema({
  // 添加日期
  addAt: {
    type: Date,
    default: Date.now()
  },
  // 备注名
  remarkname: String,
  // 好友id
  friend: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  // group id
  group: {
    type: Schema.Types.ObjectId,
    ref: 'group'
  },
  // 拥有者 id
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  }
  
});
module.exports = mongoose.model('linkman', linkman);

