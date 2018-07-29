require('../models/db-server');
const User = require('../models/db-user');
const Friend = require('../models/db-linkman');
const friendadd = require('../models/db-friendadd');
let { getFriendList } = require('../controllers/friend');
// 添加好友
// addFriend({
//   userId: '5b457917d8957668c5abbd21',
//   friendId: '5b457917d8957668c5abbd23',
// });
// addFriend({
//   userId: '5b457917d8957668c5abbd21',
//   friendId: '5b457917d8957668c5abbd23',
// });
// addFriend({
//   userId: '5b457917d8957668c5abbd21',
//   friendId: '5b457917d8957668c5abbd24',
// });
// addFriend({
//   userId: '5b457917d8957668c5abbd24',
//   friendId: '5b457917d8957668c5abbd21',
// });

// 同意/拒绝好友
// acceptFriend({
//   id: '5b4591ddac678a6d831a0b68'
// });
// rejectFriend({
//   id: '5b458b07d702d06bfe85ac8d'
// })
// acceptFriend({
//   id: '5b458b07d702d06bfe85ac8c'
// })
// acceptFriend({
//   id: '5b458b07d702d06bfe85ac8e'
// })
// acceptFriend({
//   id: '5b457a7238da3d690dc847aa'
// })

// 获取好友列表
// getFriendList({
//   id: '5b457917d8957668c5abbd21'
// })

getFriendList({
  token: {
    _id: '5b489bb7b89c53acf9a04374'
  }
}).then(ret => {
  console.log(ret.data)
})

