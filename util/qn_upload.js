var qiniu = require("qiniu");
const conf = require('../conf/common-conf');

const ACCESS_KEY = conf.QN_AK;
const SECRET_KEY = conf.QN_SK;

//要上传的空间
let bucket = 'useravatar';
//构建上传策略函数
function uptoken(bucket, fileName) {
  var mac = new qiniu.auth.digest.Mac(ACCESS_KEY, SECRET_KEY);
  var putPolicy = new qiniu.rs.PutPolicy(
    {
      scope: bucket + ":" + fileName
    });
  return putPolicy.uploadToken(mac);
}

module.exports = async function(fileName, filePath) {
  //生成上传 Token
  let utoken = uptoken(bucket, fileName);
  var config = new qiniu.conf.Config();
  // 空间对应的机房
  config.zone = qiniu.zone.Zone_z0;
  var formUploader = new qiniu.form_up.FormUploader(config);
  var putExtra = new qiniu.form_up.PutExtra();
  return new Promise((resolve, reject) => {
    formUploader.putFile(utoken, fileName, filePath, putExtra, function (respErr,
      respBody, respInfo) {
      if (respErr) {
        throw respErr;
      }
      if (respInfo.statusCode == 200) {
        resolve(respBody)
      } else {
        reject(respErr)
      }
    });
  })
  
}
