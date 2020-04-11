<template>
  <div class="row">
    <div class="col s12 m10 l8 offset-l2 offset-m1">
      <div class="card horizontal">
        <div class="card-image">
          <img :src="product.data.image" style="widht: 50em, height: 50em" />
        </div>
        <div class="card-stacked">
          <div class="card-content">
            <div>
              <p class="alignleft">{{product.data.nom}}</p>
              <p class="alignright">Product Price</p>
            </div>
            <div style="clear: both;">
              <hr />
              <p>
                <span class="quantity-title">Quantité:</span>NumberProduct
              </p>
              <hr />
              <p class="description-title">Description :</p>
            </div>
            <p>{{product.data.description}}</p>
            <div class="card-action">
              <div class="input-field col s3">
                <input value id="quantity" type="number" class="validate" min="0" max="10" />
                <label class="active" for="quantity">Quantité :</label>
              </div>
              <a class="waves-effect btn">
                <i class="material-icons left">add</i>Ajouter au panier
              </a>
            </div>
          </div>
        </div>
      </div>
      <router-link class="waves-effect waves-light btn green" to="/boutique">
        <i class="material-icons left">keyboard_backspace</i>
        Retour dans la boutique
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "detailsProduct",
  computed: {
    product: function() {
      return this.$store.state.productDetail;
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