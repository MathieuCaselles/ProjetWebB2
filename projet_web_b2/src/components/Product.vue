<template>
  <div class="col s6 m4 l3 xl2">
    <div class="card small">
      <div class="card-image">
        <img :src="product.data.dataProduit.image" class="imageSize" />
      </div>
      <div class="card-content">
        <p class="left">{{ product.data.dataProduit.nom}}</p>
        <p class="left">: {{ product.data.quantite}}</p>
        <p class="right">{{ product.data.prix}} €</p>
      </div>
      <div class="card-action">
        <a @click="checkProduit(product)" class="btn green">Voir le produit</a>
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
    checkProduit: function(product) {
      this.$store.commit("setProductDetail", product);
      this.$router.push("/produit");
    }
  }
};
</script>

<style>
.imageSize {
  width: 15em;
  height: 15em;
}
</style>