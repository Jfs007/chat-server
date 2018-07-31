let qnUpload = require('../util/qn_upload');
// 上传


async function qu() {
  try {
    let ret = await qnUpload('aaa.jpg', '../public/avatar1.jpg');
    console.log(ret, 'ret')
  } catch (error) {
    console.log(error)
  }
};
qu();
