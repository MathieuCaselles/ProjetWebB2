<template>
<div class="col s4 m4">
          <div class="card">
            <div class="card-image">
              <img src="https://www.pokebip.com/pokedex-images/artworks/255.png">
              <span class="card-title">Yes</span>
            </div>
            <div class="card-content">
              <p> {{ heroeName }} </p>
            </div>
            <div class="card-action">
              <a href="#">This is a link</a>
            </div>
          </div>
        </div>
</template>
<script>
export default {
  name: 'Product',
  props: {
    msg: String,
    heroeName: String
  }
}
</script>