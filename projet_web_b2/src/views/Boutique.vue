<template>
  <div id="app">
    <infoVendeur />
    <div class="row">
      <Product
        v-for="(product, index) in listeProduits"
        v-bind:key="index"
        v-bind:product="product"
        v-show="setPaginate(index)"
      />
    </div>
    <div id="pagination">
      <ul class="pagination center">
        <li
          v-for="index in nbrPageReel"
          v-bind:key="index"
          v-bind:id="index"
          v-bind:class="index == currentPage ? 'active green' : 'waves-effect'"
          v-bind:current="current"
          @click="updateCurrent(index-1)"
        >
          <a>{{ index }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Product from "@/components/Product.vue";
import infoVendeur from "@/components/infoVendeur.vue";

export default {
  name: "Boutique",
  components: {
    Product,
    infoVendeur
  },
  data() {
    return {
      current: 1,
      products: [],
      paginate: 12,
      paginate_total: 1
    };
  },
  computed: {
    // get only
    listeProduits: function() {
      return this.$store.state.stocksVendeur;
    },
    nbrPageReel: function() {
      if (this.listeProduits == null) {
        return 1;
      }
      return Math.ceil(this.listeProduits.length / this.paginate);
    },
    currentPage: function() {
      return this.$store.state.indexPagination + 1;
    }
  },
  methods: {
    setPaginate: function(i) {
      if (this.currentPage == 1) {
        return i < this.paginate;
      } else {
        return (
          i >= this.paginate * (this.currentPage - 1) &&
          i < this.currentPage * this.paginate
        );
      }
    },

    updateCurrent: function(i) {
      this.$store.commit("setIndexPagination", i);
    }
  }
};
</script>

