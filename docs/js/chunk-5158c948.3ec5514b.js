(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5158c948"],{1780:function(t,e,a){"use strict";var s=a("3594"),r=a.n(s);r.a},3594:function(t,e,a){},"4f6b":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"CheckFavSpot"},[a("App_bar"),[a("v-container",{},[a("v-row",{attrs:{align:"center"}},[a("v-col",{attrs:{align:"center"}},[a("v-card",[a("v-container",{staticClass:"pa-2"},[a("v-toolbar",{attrs:{dark:"",dense:"",flat:"",color:"#778899"}},[a("v-row",{attrs:{justify:"center"}},[a("v-card-title",[t._v(" 選択された候補 ")])],1)],1),a("v-card-text",[a("v-row",{attrs:{align:"center"}},[a("v-col",{attrs:{cols:"12"}},[t._v(" "+t._s(t.selectedFavSpot.name)+" ")])],1),a("v-divider"),a("v-row",{attrs:{align:"center"}},[a("v-col",{attrs:{cols:"12"}},[t._v(" "+t._s(t.selectedFavSpot.address)+" ")])],1)],1)],1)],1),a("v-spacer"),a("v-spacer"),a("v-row",{attrs:{align:"center"}},[a("v-col",{attrs:{cols:"6"}},[a("v-btn",{staticClass:"text-center",attrs:{rounded:"",color:"#0461cd",dark:""},on:{click:function(e){return t.$router.go(-1)}}},[t._v("戻る")])],1),a("v-col",{attrs:{cols:"6"}},[a("v-btn",{staticClass:"text-center",attrs:{rounded:"",color:"#0461cd",dark:""},on:{click:t.postSelectedSpot}},[t._v("登録する")])],1)],1)],1)],1),a("v-spacer")],1)]],2)},r=[],o=(a("b0c0"),a("6129")),n={name:"CheckFavSpot",components:{App_bar:o["a"]},props:{selectedFavSpot:{}},mounted:function(){console.dir(this.selectedFavSpot)},data:function(){return{}},methods:{postSelectedSpot:function(){var t=this,e={Authorization:"JWT "+this.$store.getters.getToken},a={name:this.selectedFavSpot.name,address:this.selectedFavSpot.address,lat:parseFloat(this.selectedFavSpot.lat),lon:parseFloat(this.selectedFavSpot.lon),code:this.selectedFavSpot.code};this.$axios.post("//nakano2021seminar.pythonanywhere.com/accounts/setting/favspot",a,{headers:e}).then((function(){t.$router.push({name:"FavoriteSpot"})})).catch((function(t){console.log("エラーになっちゃった..@postSelectedSpot"),t.response.status}))}}},c=n,i=(a("1780"),a("2877")),l=a("6544"),d=a.n(l),v=a("8336"),p=a("b0af"),u=a("99d9"),h=a("62ad"),f=a("a523"),S=a("ce7e"),b=a("0fd9"),F=a("2fa4"),m=a("71d9"),w=Object(i["a"])(c,s,r,!1,null,"1cd2d837",null);e["default"]=w.exports;d()(w,{VBtn:v["a"],VCard:p["a"],VCardText:u["c"],VCardTitle:u["d"],VCol:h["a"],VContainer:f["a"],VDivider:S["a"],VRow:b["a"],VSpacer:F["a"],VToolbar:m["a"]})},"8ce9":function(t,e,a){},ce7e:function(t,e,a){"use strict";var s=a("5530"),r=(a("8ce9"),a("7560"));e["a"]=r["a"].extend({name:"v-divider",props:{inset:Boolean,vertical:Boolean},render:function(t){var e;return this.$attrs.role&&"separator"!==this.$attrs.role||(e=this.vertical?"vertical":"horizontal"),t("hr",{class:Object(s["a"])({"v-divider":!0,"v-divider--inset":this.inset,"v-divider--vertical":this.vertical},this.themeClasses),attrs:Object(s["a"])({role:"separator","aria-orientation":e},this.$attrs),on:this.$listeners})}})}}]);
//# sourceMappingURL=chunk-5158c948.3ec5514b.js.map