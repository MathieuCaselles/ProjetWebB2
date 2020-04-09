<template>
  <div id="app">
    <div class="row">
      <Product
        v-for="(product, index) in listeProduits"
        v-bind:key="index"
        v-bind:product="product"
        v-show="setPaginate(index)"
      />
    </div>
    <div id="pagination">
      <ul class="pagination center" ref="indexPage">
        <li
          v-for="index in nbrPageReel"
          v-bind:key="index"
          v-bind:id="index"
          class="waves-effect"
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

export default {
  name: "Boutique",
  components: {
    Product
  },
  created() {
    this.$store.commit("updateProduits");
  },
  mounted: function() {
    this.firstUpdtatePaginate();
  },
  data() {
    return {
      current: 1,
      products: [],
      paginate: 6,
      paginate_total: 1,
    };
  },
  computed: {
    // get only
    listeProduits: function() {
      return this.$store.state.produits;
    },
    nbrPageReel: function() {
      if (this.listeProduits == null) {
        return 1;
      }
      return Math.ceil(this.listeProduits.length / this.paginate);
    }
  },
  methods: {
    setPaginate: function(i) {
      const currentPage = this.$store.state.indexPagination + 1;
      if (currentPage == 1) {
        return i < this.paginate;
      } else {
        return (
          i >= this.paginate * (currentPage - 1) &&
          i < currentPage * this.paginate
        );
      }
    },

    updateCurrent: function(i) {
      const currentPage = this.$store.state.indexPagination;
      this.$refs.indexPage.children[currentPage].className = "waves-effect";
      this.$store.commit("setIndexPagination", i);
      this.$refs.indexPage.children[i].className = "active green";
    },

    firstUpdtatePaginate: function() {
      if (this.$refs.indexPage == undefined) {
        setTimeout(() => {
          return this.firstUpdtatePaginate();
        }, 10);
      }
      const currentPage = this.$store.state.indexPagination;
      return this.updateCurrent(currentPage);
    }
  }
};
</script>

