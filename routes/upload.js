var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: 'tmp/image' })
var any = upload.any();
let qnUplad = require('../util/qn_upload');
let conf = require('../conf/common-conf');
let { parseToken, resSend } = require('../util/misc')
/* GET users listing. */
/**
 * 头像上传部分
 */
router.post('/avatar', any, async function (req, res, next) {
  if(!req.files) {
    res.json(resSend({code: -1, message: '没有图片资源'}))
    return void 0;
  };
  let AVATAR_PATH = conf.AVATAR_PATH;
  let name = AVATAR_PATH + req.files[0].originalname;
  let path = req.files[0].path;
  let ret = await qnUplad(name, path);
  res.json(resSend({ data: ret }));
});


module.exports = router;