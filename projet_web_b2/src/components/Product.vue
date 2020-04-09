<template>
  <div class="col s6 m4 l3">
    <div class="card card-product small">
      <div class="card-image">
        <img :src="product.data.image" />
        <span class="card-title green">Yes</span>
      </div>
      <div class="card-content">
        <p>{{ product.data.nom}}</p>
      </div>
      <div class="card-action">
        <button v-on:click="oui(product)">Voir le produit</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Product",
  props: {
    product: Object,
    isOk: Boolean
  },
  methods: {
    oui: function(product) {
      this.$store.commit("setProductDetail", product);
      this.$router.push("/produit");
    }
  }
};
</script>

<style>
.card-product {
  width: 20em;
}
</style>