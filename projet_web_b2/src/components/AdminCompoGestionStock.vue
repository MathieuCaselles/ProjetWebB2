<template>
  <div>
    <div class="row center-align">
      <div class="col s5 limiterProduits">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">Info Vendeur</span>
            <div class="row">
              <div class="row">
                <div class="col s6">
                  <p>{{ vendeur.data.nom }}</p>
                </div>
                <div class="col s6">
                  <p>{{ vendeur.data.adresse }}</p>
                </div>
                <div class="col s12">
                  <p>{{ vendeur.data.horaire }}</p>
                </div>
                <br />
                <div class="col s12 grey">
                  <p>{{ vendeur.data.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col s7 limiterProduits">
        <div class="col s4 m4" v-for="(product, index) in products" v-bind:key="index">
          <div class="card card-product">
            <div class="card-image">
              <img v-bind:src="product.data().image" />
              <span
                class="card-title black-text"
              >{{ product.data().nom }} / {{ product.data().type }}</span>
            </div>
            <div class="card-content card-content-product">
              <p>{{ product.data().description }}</p>
            </div>
            <div class="card-action">
              <div class="input-field col s6">
                <input type="text" ref="productsQuantite" />
                <label class="active" for="name">Quantitée :</label>
              </div>
              <div class="input-field col s6">
                <input type="text" ref="productsStock" />
                <label class="active">Nbr Stock restant :</label>
              </div>
              <div class="input-field col s6 offset-s3">
                <input type="text" ref="productsPrix" />
                <label class="active">Prix:</label>
              </div>
              <button
                class="btn waves-effect waves-light green"
                @click="addProductToVendeur(product.id, index)"
              >
                Ajouter
                <i class="material-icons right">add</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h2>Stock du vendeur :</h2>
    <div class="row">
      <div class="col s2 m2" v-for="(stock, index) in stockVendeur" v-bind:key="index">
        <div class="card card-product">
          <div class="card-image">
            <img v-bind:src="stock.data.dataProduit.image" />
            <span
              class="card-title black-text"
            >{{ stock.data.dataProduit.nom }} / {{ stock.data.dataProduit.type }}</span>
          </div>
          <div class="card-content card-content-product">
            <div class="input-field col s6">
              <input type="text" ref="vendeurQuantite" :value="stock.data.quantite" />
              <label class="active" for="name">Quantitée :</label>
            </div>
            <div class="input-field col s6">
              <input type="text" ref="vendeurStock" :value="stock.data.stock" />
              <label class="active">Stock:</label>
            </div>
            <div class="input-field col s6 offset-s3">
              <input type="text" ref="vendeurPrix" :value="stock.data.prix" />
              <label class="active">Prix:</label>
            </div>
            <br />
            <p>{{ stock.data.dataProduit.description }}</p>
          </div>
          <button
            class="btn waves-effect waves-light left"
            @click="updateProductVendeur(stock.id, index)"
          >
            Update
            <i class="material-icons right">loop</i>
          </button>

          <button class="btn waves-effect waves-light right red" @click="deleteProduct(stock.id)">
            Delete
            <i class="material-icons right">delete</i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { productsRef } from "@/firebase";
import { stockRef } from "@/firebase";
import { db } from "@/firebase";
export default {
  data() {
    return {
      product: {
        name: "",
        type: "",
        description: "",
        image: ""
      },
      products: []
    };
  },
  props: {
    vendeur: Object
  },
  created() {
    this.readData();
  },
  computed: {
    stockVendeur: function() {
      return this.$store.state.stocksVendeur;
    }
  },
  methods: {
    readData() {
      this.products = [];
      productsRef.get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
          this.products.push(doc);
        });
      });
    },
    addProductToVendeur(produitId, index) {
      stockRef
        .add({
          vendeur: db.doc(`/vendeur/${this.vendeur.id}`),
          produit: db.doc(`/produits/${produitId}`),
          quantite: this.$refs.productsQuantite[index].value,
          nbrStock: this.$refs.productsStock[index].value,
          prix: this.$refs.productsPrix[index].value
        })
        .then(() => {
          console.log("Document successfully deleted!");
          this.$store.commit("updateStockVendeur", this.vendeur.id);
        });
    },
    updateProductVendeur(stockId, index) {
      db.collection("stock")
        .doc(stockId)
        .update({
          quantite: this.$refs.vendeurQuantite[index].value,
          nbrStock: this.$refs.vendeurStock[index].value,
          prix: this.$refs.vendeurPrix[index].value
        })
        .then(() => {
          console.log("Document successfully deleted!");
          this.$store.commit("updateStockVendeur", this.vendeur.id);
        });
    },
    deleteProduct(stockId) {
      if (confirm("Voulez-vous vraiment supprimer ce produit ?")) {
        db.collection("stock")
          .doc(stockId)
          .delete()
          .then(() => {
            console.log("Document successfully deleted!");
            this.$store.commit("updateStockVendeur", this.vendeur.id);
          })
          .catch(function(error) {
            console.error("Error removing document: ", error);
          });
      }
    }
  }
};
</script>
<style>
.limiterProduits {
  max-height: 30em;
  margin: auto;
  overflow: auto;
}
textarea {
  height: 8rem !important;
}
.card .card-image img {
  height: 200px;
}
.card .card-content-product {
  height: 10em;
  overflow: auto;
}
</style>