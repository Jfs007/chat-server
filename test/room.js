require('../models/db-server');
const User = require('../models/db-user');
const Room = require('../models/db-room');

const RoomMember = require('../models/db-roommember');
const room = require('../controllers/room');
const RoomHistory = require('../models/db-roomhistory');
const { saveRoomHistory } = require('../controllers/roomhistory');
const { getRoomUsers, getRoomInfo } = require('../controllers/room');
// Room.create({
//   name: '风继续吹'
// });

//
// console.log(RoomMember)

// room.joinRoom({
//   token: {
//     _id: '5b4ac722f56100c80497002e',
//   },
//   roomid: '5b62670e22e34d1706506ae0'
// });


// User.find({}).then(res => {
//   res.map(user => {
//     RoomMember.create({
//       user: user._id,
//       room: '5b62670e22e34d1706506ae0',
//       timestamp: Date.now(),
//       intoGroupAt: new Date()
//     });
//   })
// })
// getRoomUsers({
//   roomid: '5b62670e22e34d1706506ae0'
// }).then(ret => {
//   console.log(ret, 'ret')
// })


// getRoomInfo({
//   roomid: '5b62670e22e34d1706506ae0'
// }).then(ret => {
//   console.log(ret, 'ret')
// })


saveRoomHistory({
  token: {
    _id: '5b4ac722f56100c80497002e'
  },
  roomid: '5b62670e22e34d1706506ae0',
  content: '第n条消息1。。。。'
}).then(ret => {
  console.log(ret, 'ret')
})