webpackJsonp([16],{0:function(e,n){},"3hby":function(e,n){},FEeN:function(e,n,t){"use strict";var i={data:function(){return{transitionName:"page-view-fade"}},props:{transition:""},created:function(){this.transition&&(this.transitionName=this.transition)},watch:{$route:function(e,n){if(!this.transition)return"tier"in e.meta&&"tier"in n.meta?void(e.meta.tier>n.meta.tier?this.transitionName="page-view-in":this.transitionName="page-view-out"):(console.log(".."),void(this.transitionName="page-view-fade"));this.transitionName=this.transition}}},a={render:function(){var e=this.$createElement,n=this._self._c||e;return n("transition",{attrs:{name:this.transitionName}},[n("router-view",{staticClass:"page-view"})],1)},staticRenderFns:[]};var r=t("VU/8")(i,a,!1,function(e){t("3hby")},"data-v-0ba331a9",null);n.a=r.exports},IcnI:function(e,n,t){"use strict";var i=t("bOdI"),a=t.n(i),r=t("NYxO"),s=t("7+uW"),o=t("Xxa5"),c=t.n(o),u=t("exGp"),m=t.n(u),d=t("KGw9"),p={namespaced:!0,state:{userInfo:{}},mutations:{setUserInfo:function(e,n){e.userInfo=n}},actions:{online:function(e){var n=this,t=e.commit;return m()(c.a.mark(function e(){var i,a;return c.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(d.b)("online");case 3:i=e.sent,a=i.data,t("setUserInfo",a),e.next=10;break;case 8:e.prev=8,e.t0=e.catch(0);case 10:case"end":return e.stop()}},e,n,[[0,8]])}))()}},modulename:"user"};s.a.use(r.a);n.a=new r.a.Store({modules:a()({},p.modulename,p)})},KGw9:function(e,n,t){"use strict";var i=t("//Fk"),a=t.n(i),r=t("woOf"),s=t.n(r),o="127.0.0.1",c="3000",u="/chat",m=t("DmT9"),d=t.n(m),p=t("YaEn");t.d(n,"a",function(){return f}),t.d(n,"b",function(){return g});var f=d()("ws://"+o+":"+c,{path:u}),g=function(e,n){return n=s()({token:localStorage.getItem("_token")},n),new a.a(function(t,i){f.emit(e,n,function(e){var n=e.code;0===n?t(e):(1001===n&&p.a.push({name:"login"}),i(e))})})}},LjIZ:function(e,n){},MVsu:function(e,n){var t,i,a,r,s;t=document,i=window,a=t.documentElement,r="orientationchange"in i?"orientationchange":"resize",s=function(){var e=a.clientWidth;void 0!==e&&(a.style.fontSize=e/480*20+"px")},void 0!==t.addEventListener&&(i.addEventListener(r,s,!1),t.addEventListener("DOMContentLoaded",s,!1))},Mtrv:function(e,n){},NHnr:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=t("7+uW"),a=(t("QKVV"),t("cmpb"),t("kOCM"),t("tmRx"),t("Mtrv"),{name:"App",components:{pageView:t("FEeN").a},data:function(){return{direction:"forward"}},created:function(){}}),r={render:function(){var e=this.$createElement,n=this._self._c||e;return n("div",{attrs:{id:"app"}},[n("page-view")],1)},staticRenderFns:[]};var s=t("VU/8")(a,r,!1,function(e){t("LjIZ")},null,null).exports,o=t("YaEn"),c=t("IcnI");o.a.beforeEach(function(e,n,t){var i=localStorage.getItem("_token"),a=e.meta.requireSignin;i||!a?!i||a?(c.a.dispatch("user/online"),t()):t({name:"messages"}):t({name:"login"})});t("MVsu");(function(e){var n,t="xxSys",i=navigator.userAgent,a=(i.toLowerCase(),!!i.match(/AppleWebKit.*Mobile.*/)),r=!!i.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),s=i.indexOf("Android")>-1||i.indexOf("Adr")>-1;if(a){if(r)return"IOS";if(s)return"Android"}else n=navigator.platform.toLowerCase(),t=(/mac/i.test(n)?"MAC":/win/i.test(n)?"WIN":/linux/i.test(n)?"Linux":void 0)||t})(),(navigator.browserLanguage||navigator.language).toLowerCase();var u=t("v5o6"),m=t.n(u);i.a.config.productionTip=!1,m.a.attach(document.body),new i.a({el:"#app",router:o.a,store:c.a,components:{App:s},template:"<App/>"})},QKVV:function(e,n){},YaEn:function(e,n,t){"use strict";var i=t("7+uW"),a=t("/ocq"),r=function(e){return function(n){return t("msXg")("./"+e+".vue")}};i.a.use(a.a);var s=new a.a({routes:[{path:"/messages",name:"messages",component:r("messages/index"),meta:{requireSignin:!0}},{path:"/chat/:id",name:"chat",component:r("messages/chat"),meta:{requireSignin:!0}},{path:"/linkman",name:"linkman",component:r("linkman/index"),meta:{tier:0,requireSignin:!0}},{path:"/addfriend",name:"addfriend",component:r("linkman/addfriend"),meta:{tier:1,requireSignin:!0}},{path:"/newfriend",name:"newfriend",component:r("linkman/newfriend"),meta:{tier:2,requireSignin:!0}},{path:"/usercard/:account",name:"usercard",component:r("linkman/usercard"),meta:{tier:2,requireSignin:!0}},{path:"/",name:"index",component:r("index"),meta:{to:!0,requireSignin:!0}},{path:"/login",name:"login",component:r("login"),meta:{tier:0}},{path:"/register",name:"register",redirect:"/register/nickname",children:[{path:"success",name:"register_success",component:r("register/register-success"),meta:{tier:3,step:3}},{path:"nickname",name:"register_nickname",component:r("register/register-nickname"),meta:{step:1,tier:1}},{path:"password",name:"register_password",component:r("register/register-password"),meta:{step:2,tier:2}}],component:r("register/index")},{path:"*",redirect:"/messages"}]});n.a=s},cmpb:function(e,n){},kOCM:function(e,n){},msXg:function(e,n,t){var i={"./index.vue":["8/c5",7],"./linkman/addfriend.vue":["YAxa",2,0],"./linkman/index.vue":["dBQb",3,0],"./linkman/newfriend.vue":["YwSZ",0,9],"./linkman/searchuser.vue":["XgIB",6],"./linkman/usercard.vue":["IX/t",14],"./login.vue":["Ntyz",12],"./messages/chat.vue":["BBQh",4,0],"./messages/index.vue":["3RZ2",1,0],"./register/index.vue":["2WH3",10],"./register/register-nickname.vue":["yRJU",11],"./register/register-password.vue":["wtqL",5],"./register/register-success.vue":["Y80b",8],"./search.vue":["JDFc",13]};function a(e){var n=i[e];return n?Promise.all(n.slice(1).map(t.e)).then(function(){return t(n[0])}):Promise.reject(new Error("Cannot find module '"+e+"'."))}a.keys=function(){return Object.keys(i)},a.id="msXg",e.exports=a},tmRx:function(e,n){}},["NHnr"]);
//# sourceMappingURL=app.65287c1572f700e00046.js.map