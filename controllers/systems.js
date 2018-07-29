const FriendAdd = require('../models/db-friendadd');
const Friend = require('../models/db-linkman');
const Private = require('../models/db-private')
const { resSend } = require('../util/misc');
module.exports = {
  // 好友同意通知
  async friendAgreeNotice(info, socket) {
    let { from, to } = info;
    // 系统消息 from 被请求者的消息， to 发起请求者的消息
    let [fromMsg, toMsg] = await Promise.all([
      // 被请求者 该好友同意请求
      Private.create({
        user: from,
        friend: to,
        creater: to,
        // 发送者消息状态 已读
        status: 0,
        content: '你们已经成功加为好友',
        msgType: 1,
        timestamp: Date.now()
      }),
      Private.create({
        user: to,
        friend: from,
        creater: from,
        // 接收者消息状态 未读
        status: 0,
        content: '你们已经成功加为好友',
        msgType: 1,
        timestamp: Date.now()
      }),
    ]);
    socket.to(from).emit('message', resSend({ data: fromMsg }));
    socket.to(to).emit('message', resSend({ data: toMsg }));
    // return resSend({data: { fromMsg, toMsg }})
  }


}