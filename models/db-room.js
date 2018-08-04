const mongoose = require('mongoose')
const { SOURCE_ADDRESS, AVATAR_PATH } = require('../conf/common-conf');
const Schema = mongoose.Schema;
const room = new Schema({
  name: {
    type: String,
    require: true
  },
  inviteLink: String,
  roomNo:String, 
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
  }],
  creater: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  lastMessage: Number,
  bulletin: {
    type: String,
    default: '群主没有留下任何公告'
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  avatar: {
    type: String,
    default: SOURCE_ADDRESS + AVATAR_PATH + 'avatar5' + '.png'
  },
  recentlyActive: {
    type: Date,
    default: new Date()
  }

});
module.exports = mongoose.model('room', room);

