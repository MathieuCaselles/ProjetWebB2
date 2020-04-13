<template>
  <div>
    <a class="waves-effect btn" @click="addToCart">
      <i class="material-icons left">add</i>Ajouter au panier
    </a>
  </div>
</template>

<script>
export default {
  name: "addToCart",
  props: {
    stockProduct: Object
  },
  methods: {
    addToCart() {
      this.$store.commit("addToCart", { qte: 1, value: this.stockProduct });
      this.$router.push("/panier");
      console.log(this.$store.state.cart);
    }
  }
};
</script>