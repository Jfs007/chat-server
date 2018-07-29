require('../models/db-server');
const User = require('../models/db-user');
const Friend = require('../models/db-linkman');
const friendadd = require('../models/db-friendadd');
let { addFriend, agreeFriend, getFriendRequest } = require('../controllers/friendadd');


// addFriend({
//   token: {
//     _id: '5b489c9dfa1471adbc340ea1'
//   },
//   to: '5b489bb7b89c53acf9a04374'
// })

agreeFriend({ id: '5b4ac793f56100c804970035' }).then(ret => {
  console.log(ret)
})


// getFriendRequest({
//   token: {
//     _id: '5b489bb7b89c53acf9a04374'
//   }
// }).then(ret => {
//   console.log(ret.data.fr_list_to.length,
  
//     ret.data.fr_list_from.length
//   )
// })