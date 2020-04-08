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
                                <input id="name" type="text" v-model="name">
                                <label class="active" for="name">Nom du produit :</label>
                            </div>
                            <div class="input-field col s6">
                                <input id="type" type="text" v-model="type">
                                <label class="active">Type de produit :</label>
                            </div>
                            <div class="input-field col s6 offset-s3">
                                <input id="image" type="text" v-model="image">
                                <label class="active">Image du produit : :</label>
                            </div>
                            <div class="input-field col s12">
                                <textarea id="description" class="materialize-textarea" v-model="description"></textarea>
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
</div>
</template>

<script>
import { productsRef } from '@/firebase';

export default {
    data(){
        return{
            name:"",
            type: "",
            description: "",
            image: ""

        }
    },
    methods:{
        submitProduct(){
            productsRef.add({nom: this.name, type: this.type, description: this.description, image: this.image})
        }
    },
    firebase:{
        products: productsRef,
    }
}
</script>
<style>
textarea {
    height: 8rem !important;
}
</style>