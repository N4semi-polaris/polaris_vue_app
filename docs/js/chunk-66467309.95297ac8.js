(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-66467309"],{"669d":function(t,s,e){"use strict";e.r(s);var o=function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{staticClass:"OutputList"},[e("App_bar"),e("v-toolbar",{attrs:{flat:""}},[e("v-toolbar-title",{staticClass:"marginBarLR"},[t._v(" 検索結果"),e("span",{staticClass:"ml-3"},[t._v("全"+t._s(t.results.length)+"件")])])],1),e("v-sheet",{attrs:{color:"#f5f5f5",height:"15px"}}),t.isShow?e("Loading"):t._e(),t.noResults?[e("v-col",{attrs:{align:"center"}},[t._v("該当なし")])]:t._e(),t.isShow?t._e():[e("v-list",{attrs:{shaped:""}},[t._l(t.results,(function(s,o){return[e("v-list-item",{key:s.index,on:{click:function(e){return t.toListDetails(s)}}},[e("v-list-item-content",[e("v-row",{attrs:{"no-gutters":"",align:"center"}},[e("v-col",{attrs:{cols:"1"}},[e("span",{staticClass:"marginIdLR"},[e("v-list-item-title",[t._v(t._s(o+1))])],1)]),e("v-col",{staticClass:"ml-4",attrs:{cols:"8"}},[e("v-list-item-title",{domProps:{textContent:t._s(s.name)}}),e("v-list-item-title",{domProps:{textContent:t._s(s.taskname)}}),e("v-list-item-subtitle",{domProps:{textContent:t._s(s.genre)}}),e("v-list-item-subtitle",{domProps:{textContent:t._s(s.station)}})],1)],1)],1)],1)]}))],2)]],2)},i=[],r=e("53ca"),l=e("6129"),n=e("3a5e"),a={name:"OutputList",components:{App_bar:l["a"],Loading:n["a"]},data:function(){return{hit_num:0,results:[],model:-1,isShow:!0,noResults:!1,URL:"//nakano2021seminar.pythonanywhere.com/recommend/"}},mounted:function(){if(console.log("this.$store.getters.getlistResult: "+this.$store.getters.getlistResult),console.dir(this.$store.getters.getIsResult),console.log("this.$store.getters.getlistResult.length: "+this.$store.getters.getlistResult.length),0==this.$store.getters.getlistResult.length)1==this.$route.query.type?this.URL=this.URL+"tasks/"+this.$route.query.bk:2==this.$route.query.type?this.URL=this.URL+"spots/"+this.$route.query.bk:3==this.$route.query.type&&(this.URL=this.URL+"restaurants/"+this.$route.query.bk),console.log("this.URL: "+this.URL),this.getData(this.URL);else if("該当なし"==this.$store.getters.getlistResult.status)this.noResults=!0;else{for(var t in this.results=this.$store.getters.getlistResult,console.log("this.results: "),console.dir(this.results),this.results)console.dir(this.results[t]),console.log("this.results"+t+".sections: "),console.dir(this.results[t].sections);this.isShow=!1}},methods:{getData:function(t){var s=this,e={Authorization:"JWT "+this.$store.getters.getToken};console.log("this.$route.query.bkの型@GET: "+Object(r["a"])(this.$route.query.bk)),console.log("URL: "+t),console.log("URLの型: "+Object(r["a"])(t)),console.log("headers:"+e),this.$axios.get(t,{data:{},headers:e}).then((function(t){for(var e in s.$store.commit("setListResult",t.data),t.data)s.results[e]=t.data[e],console.dir(s.results[e]);0!=t.data.length&&"該当なし"!=t.data.status||(s.noResults=!0),s.isShow=!1})).catch((function(t){console.log("エラーになっちゃった..:＠getData"),t.response.status}))},toListDetails:function(t){this.$store.commit("setSelectedResult",t,this.$route.query.type),1==this.$route.query.type?this.$router.push({name:"ListDetails1"}):2==this.$route.query.type?this.$router.push({name:"ListDetails2"}):3==this.$route.query.type&&this.$router.push({name:"ListDetails3"})}}},u=a,h=(e("e8a0"),e("2877")),c=e("6544"),g=e.n(c),d=e("62ad"),m=e("8860"),p=e("da13"),L=e("5d23"),R=e("0fd9"),$=e("8dd9"),v=e("71d9"),b=e("2a7f"),f=Object(h["a"])(u,o,i,!1,null,"1b7814cb",null);s["default"]=f.exports;g()(f,{VCol:d["a"],VList:m["a"],VListItem:p["a"],VListItemContent:L["a"],VListItemSubtitle:L["b"],VListItemTitle:L["c"],VRow:R["a"],VSheet:$["a"],VToolbar:v["a"],VToolbarTitle:b["a"]})},e28b:function(t,s,e){},e8a0:function(t,s,e){"use strict";var o=e("e28b"),i=e.n(o);i.a}}]);
//# sourceMappingURL=chunk-66467309.95297ac8.js.map