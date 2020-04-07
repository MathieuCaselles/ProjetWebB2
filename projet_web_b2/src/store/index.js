import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist';
const firebase = require('../firebase.js');
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
    produits: null,
    indexPagination: 1
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
    setIndexPagination(state, val) {
      state.indexPagination = val;
    },
    updateProduits(state) {
      state.produits = []
      firebase.db.collection("produits").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          state.produits.push({ id: doc.id, data: doc.data() })
        });
      });
    }
  },
  actions: {

  },
  modules: {
  },
  plugins: [vuexLocalStorage.plugin]
})


export default store
