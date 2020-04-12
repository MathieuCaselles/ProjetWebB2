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
                class="btn waves-effect waves-light"
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
            <p>{{ stock.data.stock }} restant.</p>
            <p>{{ stock.data.quantite }}</p>
            <p>{{ stock.data.prix }} €</p>
            <br />
            <p>{{ stock.data.dataProduit.description }}</p>
          </div>
          <div class="card-action">
            <button class="btn waves-effect waves-light" @click="debugTest">
              Update
              <i class="material-icons right">loop</i>
            </button>

            <button class="btn waves-effect waves-light" @click="debugTest">
              Delete
              <i class="material-icons right">delete</i>
            </button>
          </div>
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
    debugTest() {
      console.log(this.$store.state.stocksVendeur);
    },
    addProduct() {
      productsRef.add({
        nom: this.product.name,
        type: this.product.type,
        description: this.product.description,
        image: this.product.image
      });
      this.readData();
      this.resetEntries();
    },
    addProductToVendeur(produitId, index) {
      stockRef.add({
        vendeur: db.doc(`/vendeur/${this.vendeur.id}`),
        produit: db.doc(`/produits/${produitId}`),
        quantite: this.$refs.productsQuantite[index].value,
        nbrStock: this.$refs.productsStock[index].value,
        prix: this.$refs.productsPrix[index].value
      });
      this.$store.commit("updateStockVendeur", this.vendeur.id);
      console.log(
        produitId,
        this.vendeur.id,
        this.$refs.productsQuantite[index].value,
        this.$refs.productsStock[index].value,
        this.$refs.productsPrix[index].value
      );
    },
    deleteProduct(doc) {
      if (confirm("Voulez-vous vraiment supprimer ce produit ?")) {
        productsRef
          .doc(doc)
          .delete()
          .then(function() {
            console.log("Document successfully deleted!");
          })
          .catch(function(error) {
            console.error("Error removing document: ", error);
          });
      }
      this.readData();
    },
    resetEntries() {
      this.product.name = "";
      this.product.type = "";
      this.product.image = "";
      this.product.description = "";
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
