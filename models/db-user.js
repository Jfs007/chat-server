
/**
 * 用户表
 * 
 */
const { SOURCE_ADDRESS, AVATAR_PATH }= require('../conf/common-conf');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = new Schema({
  nickname: String,
  password: String,
  account: String,
  status: String,
  email: String,
  rooms: [{
    type: Schema.Types.ObjectId,
    ref: 'room'
  }],
  friend: [{
    type: Schema.Types.ObjectId,
    ref: 'friend'
  }],
  // friend: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'friend'
  // }],
  sex: {
    type: Number,
    default: 0
  },
  birthday: String,
  signature: String,
  onlineState: String,
  onlineDevice: {
    type: Number,
    default: 0,
  },
  
  lastOnlineTime: {
    type: Number,
    default: Date.now()
  },
  device: {
    type: String,
    default: 'PC'
  },
  avatar: {
    type: String,
    default: SOURCE_ADDRESS + AVATAR_PATH + 'avatar'+Math.ceil(Math.random()*4) + '.jpg'
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
  
})
module.exports = mongoose.model('user', user);
