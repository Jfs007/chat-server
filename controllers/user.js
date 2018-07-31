const User = require('../models/db-user');
const Friend = require('../models/db-linkman')
const { asyncify, errorinfo, genAccount, resSend } = require('../util/misc');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_KEY, SOURCE_ADDRESS, AVATAR_PATH } = require('../conf/common-conf');
module.exports = {
  // 验证用户
  async verifyUser(userInfo) {
    let { password, account } = userInfo;
    let user = await User.findOne({ account });
    if(!user) {
      return resSend({ message: '密码或者用户名错误', code: -1 });
    }
    //  是否匹配
    let isMatch = await asyncify(bcrypt.compare)(password, user.password);
    if(isMatch) {
      let exp = Math.floor((new Date().getTime()) / 1000) + 30*3600;
      let verify = jwt.sign({ user: user.account, exp: exp, _id: user._id }, JWT_KEY);
      return resSend({ data: { token: verify } });
    }else {
      return resSend({message: '密码或者用户名错误', code: -1});
    }
  },
  
  // 创建用户
  async createUser(userInfo) {
    let { password, nickname } = userInfo;
    let salt = await asyncify(bcrypt.genSalt)(10);
    password = await asyncify(bcrypt.hash)(password, salt);
    console.log(userInfo, 'userInfo')
    // 先暂时随机一个数
    let account = genAccount();
    let user = await User.create({
      nickname,
      password,
      account,
      avatar: SOURCE_ADDRESS + AVATAR_PATH + 'avatar' + Math.ceil(Math.random() * 4) + '.jpg'
    });
    await user.save();
    return resSend({
      data: {
        account: user.account
      }
    })
  },
  
  // 拉取用户信息 登陆 -->
  async getUserInfo(info) {
    let { account, id, token } = info;
    let condi = account ? { account }: { _id: id };
    let user = await User.findOne(condi);
    let isFriend = await Friend.findOne({
      friend: user._id,
      owner: token._id
    })
    return resSend({ data: { user, isFriend } });
  },
  async getUser(info) {
    let { keyword } = info;
    let user = await User.find( 
      {
        $or: [ //多条件，数组
          { nickname: { $regex: keyword } },
          { account: { $regex: keyword } }
        ]
      }
    );
    return resSend({ data: user });
  },
  async updateUser(info) {
    let { token } = info; 
    let userid = token._id;
    let user = await User.update({
      _id: userid
    }, {
      $set: {
        email: info.email,
        nickname: info.nickname,
        sex: info.sex,
        birthday: info.birthday,
        avatar: info.avatar,
        signature: info.signature
      }
    });
    return resSend();
  },
  // 是否是好友
  // async is

  
}