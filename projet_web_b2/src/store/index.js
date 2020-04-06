import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist';

Vue.use(Vuex)

const vuexLocalStorage = new VuexPersist({
  key: 'vuex', // The key to store the state on in the storage provider.
  storage: window.localStorage,
  reducer: state => ({
    currentUser: state.currentUser,
  })
})

const store = new Vuex.Store({
  state: {
    currentUser: null,
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocalStorage.plugin]
})


export default store
