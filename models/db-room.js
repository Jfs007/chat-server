const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const room = new Schema({
  name: {
    type: String,
    require: true
  },
  inviteLink: String,
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
  }
});
module.exports = mongoose.model('room', room);

