var rf = require("fs");
module.exports = {
  unlink(name) {
    rf.unlink(name, function (error, data) {

      console.log("文件删除成功", error);
    });
  }
}