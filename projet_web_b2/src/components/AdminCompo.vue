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
                                <input id="name" type="text" v-model="product.name">
                                <label class="active" for="name">Nom du produit :</label>
                            </div>
                            <div class="input-field col s6">
                                <input id="type" type="text" v-model="product.type">
                                <label class="active">Type de produit :</label>
                            </div>
                            <div class="input-field col s6 offset-s3">
                                <input id="image" type="text" v-model="product.image">
                                <label class="active">Image du produit : :</label>
                            </div>
                            <div class="input-field col s12">
                                <textarea id="description" class="materialize-textarea" v-model="product.description"></textarea>
                                <label class="active">Description du produit :</label>
                            </div>
                        </div>
                        </form>
                    </div>
                </div>
                <div class="card-action">
                    <button class="btn waves-effect waves-light" @click="submitProduct()">Submit
                        <i class="material-icons right">send</i>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
    <div class="col s3 m3" v-for="(product, index) in products" v-bind:key="index">
      <div class="card card-product">
        <div class="card-image">
          <img v-bind:src="product.data().image">
          <span class="card-title black-text">{{ product.data().nom }}</span>
        </div>
        <div class="card-content">
          {{ product.data().type }}
        </div>
        <div class="card-action">
          <button class="btn waves-effect waves-light" @click="deleteProduct(product.id)">Delete<i class="material-icons right">delete</i></button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { productsRef } from '@/firebase';

export default {
    data(){
        return{
            product:{
                name:"",
                type: "",
                description: "",
                image: "",
            },
            products:[]

        }
    },
    methods:{
        readData(){
            this.products = []
            productsRef.get().then((querySnapshot) =>{
            querySnapshot.forEach((doc) => {
            this.products.push(doc)
            })
        })
        },
        submitProduct(){
            productsRef.add({nom: this.product.name, type: this.product.type, description: this.product.description, image: this.product.image});
            this.readData();
        },
        deleteProduct(doc){
            if(confirm("Voulez-vous vraiment supprimer ce produit ?")){
                productsRef.doc(doc).delete().then(function() {
                    console.log("Document successfully deleted!");
                }).catch(function(error) {
                    console.error("Error removing document: ", error);
                });
            }
            this.readData();
        }
    },
    created(){
        this.readData();
    }
}
</script>
<style>
textarea {
    height: 8rem !important;
}
.card-product {
 width:400px;
}
</style>