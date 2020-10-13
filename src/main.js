import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import './assets/sass/style.scss'

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')