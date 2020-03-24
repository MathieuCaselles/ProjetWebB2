import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
const firebase = require('./firebase.js')

Vue.config.productionTip = false

let app
firebase.auth.onAuthStateChanged(user => {
  if (!user) {
    console.log("User is undifined")
  }
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App)
    })
  }
})