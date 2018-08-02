// 开启数据库
require('../models/db-server');
const User =  require('../models/db-user');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../conf/common-conf');
function parseToken(info) {
  return new Promise((resolve, reject) => {
    try {
      info.token = jwt.verify(info.token, JWT_KEY);
      resolve(info);
    } catch (err) {
      reject('ERROR1001');
    }
  })
}

let { createUser, verifyUser, getUserInfo, getUser } = require('../controllers/user');
User.updateMany({
  // _id: '5b4ac772f56100c804970033'
}, { $set: { rooms: ['5b62670e22e34d1706506ae0'] } }).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})


// createUser({password: 'sjd', nickname: 'd......'});
// 创建用户
// for(let i = 0; i< 10; i++) {
//   createUser({ password: 'sjf1996', nickname: 'tom'+ i });
// }
// createUser({ password: 'sjfd12', nickname: 'tomasdasdd' });


// 用户验证
// verifyUser({ password: 'sjf1996', account: '64018296231' } ).then(ret => {
//   console.log(ret)
//   // let info = await parseToken(ret);

// }).catch(err => {
//   console.log('err', err)
// })
// token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjQwMTgyOTYyMzEiLCJleHAiOjE1MzE0NjQ5NTgsImlhdCI6MTUzMTQ2NDk0OH0.C4zPxKUVYd4FzZISLynxKCLDRTAxa1aTw6JpqnXfPEA

// parseToken({ 
//   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjQwMTgyOTYyMzEiLCJleHAiOjE1MzE1OTIzNzcsIl9pZCI6IjViNDg0Y2UwNjY3NGQ1YTNiMDRjNWJhZiIsImlhdCI6MTUzMTQ4NDM3N30.lW0_cNxLuf-c1Cav1mJXwjYQoH2R96op4AYRrzCGSzg'}).then(
//     async info => {
//       let rs = await getUserInfo(info);
//       console.log(rs, '', info)
//     }
//   );


// getUser({
//   keyword: '64491167090'
// })
// .then(ret => {
//   console.log(ret, 'ret')
// })




