require('../models/db-server');
const Private = require('../models/db-private');
const User = require('../models/db-user');
let { savePrivateMsg, getPrivateList } = require('../controllers/private');



// 5b489bb7b89c53acf9a04375   5b489bb7b89c53acf9a04376
// savePrivateMsg({
//   token: {
//     _id: '5b489bb7b89c53acf9a04375',
//   },
//   to: '5b489bb7b89c53acf9a04376',
//   content: '第5消息'
// }).then(res => {
//   console.log(res)
// })
// savePrivateMsg({
//   token: {
//     _id: '5b489bb7b89c53acf9a04376',
//   },
//   to: '5b489bb7b89c53acf9a04375',
//   content: '0第4消息'
// }).then(res => {
//   console.log(res)
// })

getPrivateList( { 
  limit: 3,
  token: {
    _id: '5b489bb7b89c53acf9a04376'
  },
  to: '5b489bb7b89c53acf9a04375'
}).then((ret) => {
  console.log(ret)
})