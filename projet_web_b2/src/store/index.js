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
    productDetail: state.productDetail,
    indexPagination: state.indexPagination
  })
})

const store = new Vuex.Store({
  state: {
    currentUser: null,
    produits: null,
    productDetail: null,
    indexPagination: 0,
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
    setProductDetail(state, val) {
      state.productDetail = val;
    },
    setIndexPagination(state, val) {
      state.indexPagination = val;
    },
    updateProduits(state) {
      let listeProduits = []
      firebase.db.collection("produits").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          listeProduits.push({ id: doc.id, data: doc.data() })
        });
        state.produits = listeProduits;
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
