<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Yo" />
  </div>
</template>

<script>
import Vue from "vue";
// Définition d'un nouveau composant appelé `button-counter`
Vue.component("button-counter", {
  data: function() {
    return {
      count: 0
    };
  },
  template:
    '<button v-on:click="count++">Vous m\'avez cliqué {{ count }} fois.</button>'
});

// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  }
};
</script>
