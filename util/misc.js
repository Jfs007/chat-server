
const { JWT_KEY } = require('../conf/common-conf');
const jwt = require('jsonwebtoken');
module.exports = {
  asyncify(fn) {
    return async function(...args) {
      return new Promise(( resolve, reject ) => {
        fn(...args, function(err, data) {
          if(err) { reject(err); return; }
          else {
            resolve(data);
          } 
        });
      });
    }
  },
  errorinfo(msg) {
    return {
      isError: true,
      msg
    }
  },
  resSend(info = {}) {
    let defaults = {
      code: 0,
      message: 'ok',
      data: []
    }
    return Object.assign(defaults, info)
  },
  parseToken(info, cb) {
    return new Promise((resolve, reject) => {
      try {
        info.token = jwt.verify(info.token, JWT_KEY);
        resolve(info);
      } catch (err) {
        reject({code: 1001, message: 'token过期'});
      }
    })
  },
  genAccount() {
    return Math.floor(Math.random() * 8 + 1)+ (Number(new Date()) + '').split('').reverse().slice(0, 5).join('')+ Math.floor(Math.random()*89999+10000)
  }
}