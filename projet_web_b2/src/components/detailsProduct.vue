<template>
  <div class="row">
    <div class="col s12 m10 l8 offset-l2 offset-m1">
      <div class="card horizontal">
        <div class="card-image">
          <img :src="product.data.dataProduit.image" style="widht: 50em, height: 50em" />
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <div>
              <p class="alignleft">{{product.data.dataProduit.nom}}</p>
              <p class="alignright">{{product.data.prix}} €</p>
            </div>
            <div style="clear: both;">
              <hr />
              <p class="description-title">Description :</p>
            </div>
            <p>{{product.data.dataProduit.description}}</p>
            <div class="card-action">
              <AddToCart :stockProduct="product" />
            </div>
          </div>
        </div>
      </div>
      <a class="waves-effect waves-light btn green" @click="goToShop">
        <i class="material-icons left">keyboard_backspace</i>
        Retour dans la boutique
      </a>
    </div>
  </div>
</template>
<script>
import AddToCart from "@/components/AddToCart.vue";

export default {
  name: "detailsProduct",
  components: {
    AddToCart
  },
  computed: {
    product: function() {
      return this.$store.state.productDetail;
    }
  },
  methods: {
    goToShop() {
      if (this.$router.currentRoute.path != "/boutique") {
        this.$router.push("/boutique");
      }
    }
  }
};
</script>
<style>
.alignleft {
  float: left;
  font-size: 20px;
}
.alignright {
  float: right;
  font-size: 20px;
}

.description-title {
  font-size: 20px;
}

.quantity-title {
  font-size: 20px;
}

.card .card-action {
  padding: 22px 0px 0px;
}

.card .card-content p {
  height: 62%;
}

.input-field.col label {
  left: 0.6rem;
}
</style>