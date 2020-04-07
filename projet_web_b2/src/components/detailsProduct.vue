<template>
<div class="row">
  <div class="col s4 m4">
    </div>
<div class="col s4 m4">
  <div class="card horizontal">
    <div class="card-image">
        <img src="https://picsum.photos/500">
    </div>
    <div class="card-stacked">
    <div class="card-content">
      <div>
        <p class="alignleft">Product Name</p>
        <p class="alignright">Product Price</p>
      </div>
      <div style="clear: both;"><hr><p><span class="quantity-title">Quantité: </span>NumberProduct</p><hr><p class="description-title">Description :</p></div>
      <p>Lorem Ipsum is simply dummy text of the printing and
        typesetting industry. Lorem Ipsum has been the industry's
        standard dummy text ever since the 1500s, when an unknown printer
        took a galley of type and scrambled it to make a type specimen book.
        It has survived not only five centuries, but also the leap into electronic typesetting,
        remaining essentially unchanged.</p>
    <div class="card-action">
      <div class="input-field col s3">
      <input value="" id="quantity" type="number" class="validate" min=0 max=10>
      <label class="active" for="quantity">Quantité :</label>
  </div>
  <a class="waves-effect btn"><i class="material-icons left">add</i>Ajouter au panier</a>
    </div>
    </div>
  </div>
</div>
</div>
</div>
</template>
<script>
export default {
  name: 'detailsProduct',
  props: {
    msg: String,
    heroeName: String
  }
}
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

.description-title{
  font-size:20px;
}

.quantity-title{
  font-size:20px;
}

.card .card-action {
    padding: 22px 0px 0px;
}

.card.horizontal .card-image img {
    height: 100%;
}

.card .card-content p {
    height: 62%;
}

.input-field.col label {
    left: 0.6rem;
}
</style>