webpackJsonp([10],{"2WH3":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=n("FEeN"),a=n("//Fk"),r=n.n(a),i=n("KGw9"),c={namespaced:!0,state:{nickname:"",password:"",account:""},mutations:{setField:function(e,t){var n=t.name,s=t.value;e[n]=s}},actions:{register:function(e){var t=e.commit,n=e.state,s={nickname:n.nickname,password:n.password};return Object(i.b)("register",s).then(function(e){return t("setField",{name:"account",value:e.data.account}),r.a.resolve(e)}).catch(function(e){return console.log(e,"err"),r.a.reject(e)})}},modulename:"register"},o=n("IcnI"),u={components:{pageView:s.a},data:function(){return{}},created:function(){this.registerModule()},computed:{stepStyle:function(){return{width:33.3333*this.$route.meta.step+"%"}}},methods:{registerModule:function(){o.a.registerModule(c.modulename,c)}}},l={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"register"},[t("div",{staticClass:"step-line"},[t("div",{staticClass:"step-progress",style:this.stepStyle})]),t("page-view")],1)},staticRenderFns:[]};var d=n("VU/8")(u,l,!1,function(e){n("a+w9")},null,null);t.default=d.exports},"a+w9":function(e,t){}});
//# sourceMappingURL=10.b0cf189fe9c046c6d21c.js.map