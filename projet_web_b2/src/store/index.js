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
    indexPagination: state.indexPagination,
    vendeurSelect: state.vendeurSelect,
    cart: state.cart
  })
})

const store = new Vuex.Store({
  state: {
    currentUser: null,
    produits: null,
    productDetail: null,
    indexPagination: 0,
    listeVendeurs: null,
    stocksVendeur: null,
    vendeurSelect: { data: { nom: "Choix du vendeur" } },
    profiles: null,
    cart: []
  },
  mutations: {
    addToCart(state, val) {
      let vendeurProduct = state.cart.find(product => product.value.data.idVendeur == val.value.data.idVendeur)

      if (!vendeurProduct && state.cart.length > 0) {
        alert("Vous ne pouvez pas mélanger les article de différent vendeur dans votre panier. \n Si vous souhaiter àjouter cet article, il faudra vider votre panier des articles de vendeurs différent.")
      } else {
        let productExist = state.cart.find(product => product.value.data.idProduit == val.value.data.idProduit)
        if (productExist) {
          productExist.qte++;
        } else {
          state.cart.push(val);
        }
      }
    },

    setQteProductCart(state, val) {
      let index = state.cart.indexOf(val.productSet);

      state.cart[index].qte = val.newValue
    },

    removeFromCart(state, val) {
      let index = state.cart.indexOf(val);
      state.cart.splice(index, 1);
    },
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
    setVendeurSelect(state, val) {
      state.vendeurSelect = val;
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
      }).then(() => {
        state.produits = listeProduits;
      });
    },
    updateProfiles(state) {
      let listeProfiles = []
      firebase.db.collection("profiles").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          listeProfiles.push({ id: doc.id, data: doc.data() })
        });
      }).then(() => {
        state.profiles = listeProfiles;
      });
    },
    updateVendeurs(state) {
      let listeVendeurs = new Object();
      firebase.db.collection("vendeur").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          listeVendeurs[doc.id] = { id: doc.id, data: doc.data() };
        });
      }).then(() => {
        state.listeVendeurs = listeVendeurs;
      });
    },
    updateStockVendeur(state, val) {
      let listeStocks = [];

      firebase.db.collection("stock").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().vendeur.id == val) {
            const idStock = doc.id;
            const idProduitSelect = doc.data().produit.id;
            const nbrStock = doc.data().nbrStock;
            const price = parseFloat(doc.data().prix).toFixed(2);
            const qte = doc.data().quantite;

            doc.data().produit.get().then(querySnapshot => {
              listeStocks.push({
                id: idStock, data: {
                  idProduit: idProduitSelect,
                  idVendeur: val,
                  stock: nbrStock,
                  quantite: qte,
                  prix: price,
                  dataProduit: querySnapshot.data()

                }
              });
            });
          }

        })
      }).then(() => {
        state.stocksVendeur = listeStocks;
      });
    },
  },
  actions: {

  },
  modules: {
  },
  plugins: [vuexLocalStorage.plugin]
})


export default store
