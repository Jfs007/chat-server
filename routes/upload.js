var express = require('express');
var router = express.Router();
var path = require('path');
let qnUplad = require('../util/qn_upload');
let conf = require('../conf/common-conf');
let user = require('../controllers/user');
let { parseToken, resSend } = require('../util/misc')


var multer = require('multer');
var upload = multer({ dest: 'tmp/image' })
var any = upload.any();


/**
 * 头像上传部分
 */
router.post('/avatar', any, async function (req, res, next) {
  if(!req.files.length) {
    res.json(resSend({code: -1, message: '没有图片资源'}))
    return void 0;
  };
  let headers = req.headers;
  let token = headers._token;
  parseToken({token}).then(async ret => {
    let {_id} = ret.token;
    let AVATAR_PATH = conf.AVATAR_PATH;
    // 后缀名
    let extname = path.extname(req.files[0].originalname);
    // 文件名
    let name = AVATAR_PATH + _id + extname;
    // 文件路径
    let filepath = req.files[0].path;
    // 上传七牛
    let u_ret = await qnUplad(name, filepath);
    // 更新头像
    let userres = await user.uploadAvatar({ token: ret.token, avatar: conf.SOURCE_ADDRESS+ u_ret.key  });
    res.json(userres);
  }).catch(err => {
    res.send(resSend(err));
  })
});


module.exports = router;