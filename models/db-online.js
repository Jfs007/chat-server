/**
 * 用户在线表 
 * 
 * 
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const online = new Schema({
  
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  socket: String,
  timestamp: Number,
  // 上线时间
  onlineAt: {
    type: Date,
    default: Date.now()
  },
  // 下限
});
module.exports = mongoose.model('online', online);