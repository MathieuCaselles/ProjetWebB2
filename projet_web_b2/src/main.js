import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'materialize-css/dist/css/materialize.min.css'
import 'material-design-icons/iconfont/material-icons.css'
const firebase = require('./firebase.js')

Vue.config.productionTip = false

let app
firebase.auth.onAuthStateChanged(() => {
  console.log(store.state.currentUser);
  console.log(store.state.productDetail);
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App)
    })
  }
})