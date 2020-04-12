<template>
  <div>
    <div class="row center-align">
      <div class="col s6 offset-s3">
        <div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">Ajouter un produit</span>
            <div class="row">
              <form class="col s12">
                <div class="row">
                  <div class="input-field col s6">
                    <input id="name" type="text" v-model="product.name" />
                    <label class="active" for="name">Nom du produit :</label>
                  </div>
                  <div class="input-field col s6">
                    <input id="type" type="text" v-model="product.type" />
                    <label class="active">Type de produit :</label>
                  </div>
                  <div class="input-field col s6 offset-s3">
                    <input id="image" type="text" v-model="product.image" />
                    <label class="active">Image du produit : :</label>
                  </div>
                  <div class="input-field col s12">
                    <textarea
                      id="description"
                      class="materialize-textarea"
                      v-model="product.description"
                    ></textarea>
                    <label class="active">Description du produit :</label>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="card-action">
            <button class="btn waves-effect waves-light" @click="addProduct()">
              Submit
              <i class="material-icons right">send</i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col s2 m2" v-for="(product, index) in products" v-bind:key="index">
        <div class="card card-product" v-if="!product.data.edit">
          <div class="card-image">
            <img v-bind:src="product.data.image" />
            <span class="card-title black-text">{{ product.data.nom }} / {{ product.data.type }}</span>
          </div>
          <div class="card-content card-content-product">
            <p>{{ product.data.description }}</p>
          </div>
          <div class="card-action">
            <button
              class="btn-small waves-effect waves-light blue"
              @click="editProduct(product.id)"
            >
              edit
              <i class="material-icons right">edit</i>
            </button>
            <button
              class="btn-small waves-effect waves-light red"
              @click="deleteProduct(product.id)"
            >
              Delete
              <i class="material-icons right">delete</i>
            </button>
          </div>
        </div>
        <div class="card card-product" v-else>
          <div class="card card-product">
            <div class="card-image">
              <img v-bind:src="product.data.image" />
              <span class="card-title black-text">{{ product.data.nom }} / {{ product.data.type }}</span>
            </div>
            <div class="card-content card-content-product">
              <input type="text" v-model="product.name" />
              <input type="text" v-model="product.type" />
              <input type="text" v-model="product.image" />
              <label for="description" class="active">Description</label>
              <textarea type="text" v-model="product.description" />
            </div>
            <div class="card-action">
              <button class="btn-small waves-effect waves-light blue" @click="saveEdit(product)">
                Save
                <i class="material-icons right">save</i>
              </button>
              <button
                class="btn-small waves-effect waves-light red"
                @click="cancelEdit(product.id)"
              >
                Cancel
                <i class="material-icons right">cancel</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { productsRef } from "@/firebase";

export default {
  data() {
    return {
      product: {
        name: "",
        type: "",
        description: "",
        image: "",
        edit: ""
      },
      editedProduct: {
        name: "",
        type: "",
        description: "",
        image: "",
        edit: ""
      }
    };
  },
  computed: {
    products: function() {
      return this.$store.state.produits;
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
    addProduct() {
      productsRef.add({
        nom: this.product.name,
        type: this.product.type,
        description: this.product.description,
        image: this.product.image,
        edit: false
      });
      this.readData();
      this.resetEntries();
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
    editProduct(doc) {
      productsRef
        .doc(doc)
        .update({ edit: true })
        .then(() => {
          this.$store.commit("updateProduits");
        });
    },
    resetEntries() {
      this.product.name = "";
      this.product.type = "";
      this.product.image = "";
      this.product.description = "";
    },
    cancelEdit(doc) {
      productsRef
        .doc(doc)
        .update({ edit: false })
        .then(() => {
          this.$store.commit("updateProduits");
        });
    },
    saveEdit(product) {
      const key = product.id;
      productsRef
        .doc(key)
        .update({
          nom: product.name,
          type: product.type,
          image: product.image,
          description: product.description,
          edit: false
        })
        .then(() => {
          this.$store.commit("updateProduits");
        });
    }
  },
  created() {
    this.$store.commit("updateProduits");
  }
};
</script>
<style>
textarea {
  height: 8rem !important;
}

.card .card-image img {
  height: 200px;
  overflow: hidden;
}

.card .card-content-product {
  height: 300px;
  overflow: auto;
}

.waves-effect {
  margin: 1px;
}
</style>