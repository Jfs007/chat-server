webpackJsonp([9],{"9eOK":function(t,e){},YwSZ:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=s("woOf"),i=s.n(n),a=s("wpmv"),c=s("KGw9"),r={components:{hdBar:a.a},data:function(){return{request_list:[],account:""}},created:function(){var t=this;Object(c.b)("getFriendRequest").then(function(e){console.log(e,"data"),t.account=e.data.account,t.request_list=t.exec(t.account,e.data.request_list)})},methods:{exec:function(t,e){return e.map(function(e){var s=e.addPeople.account===t;return i()(e,{user:s?e.creater:e.addPeople,isFrom:s})})},agree:function(t,e){0===t&&Object(c.b)("agreeFriend",{id:e}).then(function(t){console.log(t)})}},filters:{}},o={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"new-friend"},[s("hd-bar",{staticClass:"messages-hd-bar",attrs:{"title-name":"新朋友"}},[s("span",{attrs:{slot:"sec-l"},on:{click:function(e){t.$router.go(-1)}},slot:"sec-l"},[s("span",{staticClass:"iconfont icon-fanhui"}),s("span",[t._v("联系人")])]),s("div",{attrs:{slot:"sec-r"},slot:"sec-r"},[s("span",{on:{click:function(e){t.$router.push({name:"addfriend"})}}},[t._v("添加")])])]),s("div",{staticClass:"main"},[s("div",{staticClass:"friend-notice"},[t._m(0),s("div",{staticClass:"user-list friend-notice__user-list"},t._l(t.request_list,function(e){return s("div",{staticClass:"user-list__item user-list__item_bt"},[s("div",{staticClass:"user-list__avatar"}),s("div",{staticClass:"user-list__info center-info"},[s("div",{staticClass:"center-info__nickname"},[t._v(t._s(e.user.nickname))]),s("div",{staticClass:"center-info__notice"},[t._v(" "+t._s(e.isFrom?"我是"+e.user.nickname:"已发送验证"))])]),s("div",{staticClass:"user-list__r-info"},[e.isFrom?s("div",{staticClass:"ui-btn",on:{click:function(s){t.agree(e.acceptStatus,e._id)}}},[t._v(t._s(1===e.acceptStatus?"已同意":"同意"))]):s("span",[t._v(t._s(1===e.acceptStatus?"已同意":"等待验证"))])])])})),t._m(1)])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"friend-notice__header"},[e("span",[this._v("好友通知")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"friend-notice__more"},[e("span",[this._v("更多      ")])])}]};var u=s("VU/8")(r,o,!1,function(t){s("9eOK")},"data-v-3d405cfb",null);e.default=u.exports}});
//# sourceMappingURL=9.943a9f9ab6969bb35222.js.map