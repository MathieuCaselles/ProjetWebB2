<template>
<div class="col s4 m4">
  <div class="card">
    <div class="card-image">
      <img src="https://www.pokebip.com/pokedex-images/artworks/255.png">
      <span class="card-title">Yes</span>
    </div>
    <div class="card-content">
      <p> {{ productName }} </p>
    </div>
    <div class="card-action">
      <button v-on:click="oui(product.name)">Voir le produit</button>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'Product',
  props: {
    productName: String,
    product: Object,
    isOk: Boolean
  },
  methods: {
    oui: function(product){
      console.log(product)
    }
  }
}
</script>