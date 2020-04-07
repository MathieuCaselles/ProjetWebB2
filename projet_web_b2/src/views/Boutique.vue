<template>
  <div id="app">
    <div class="row">
      <Product
        v-for="(product, index) in products"
        v-bind:key="index"
        v-bind:productName="product.name"
        v-bind:product="product"
        v-show="setPaginate(index)"
      />
    </div>
    <div id="pagination">
      <ul class="pagination center" ref="indexPage">
        <li
          v-for="index in paginate_total"
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
    <button @click="updateCurrent(1)">TestProduit</button>
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
    this.paginate_total = Math.ceil(this.products.length / this.paginate);
  },
  mounted: function() {
    this.$nextTick(function() {
      this.$store.commit("updateProduits");
    });
  },
  data() {
    return {
      current: 1,
      products: [
        { name: "Wolverine", universe: "Marvel" },
        { name: "Batman", universe: "DC" },
        { name: "Beast", universe: "Marvel" },
        { name: "Superman", universe: "DC" },
        { name: "Wonder Woman", universe: "DC" },
        { name: "Iceman", universe: "Marvel" },
        { name: "Black Panther", universe: "Marvel" },
        { name: "Beast Boy", universe: "DC" },
        { name: "Captain America", universe: "Marvel" },
        { name: "Hawkgirl", universe: "DC" },
        { name: "Cyclops", universe: "Marvel" },
        { name: "Green Lantern", universe: "DC" },
        { name: "Thor", universe: "Marvel" },
        { name: "Flash", universe: "DC" },
        { name: "Spider-man", universe: "Marvel" },
        { name: "Martian Manhunter", universe: "DC" },
        { name: "Nightwing", universe: "DC" },
        { name: "Raven", universe: "DC" },
        { name: "Hulk", universe: "Marvel" },
        { name: "Shehulk", universe: "Marvel" }
      ],
      paginate: 3,
      paginate_total: 0,
      isOk: false
    };
  },
  computed: {
    // get only
    listeProduits: function() {
      return this.$store.state.produits;
    }
  },
  methods: {
    setPaginate: function(i) {
      this.current = 1;
      if (this.current == 1) {
        return i < this.paginate;
      } else {
        return (
          i >= this.paginate * (this.current - 1) &&
          i < this.current * this.paginate
        );
      }
    },

    logProduit: function() {
      this.listeProduits.forEach(element => {
        console.log(element.id);
        console.log(element.data.nom);
        console.log(element.data.type);
        console.log(element.data.description);
        console.log(element.data.image);
      });
      console.log(this.listeProduits);
    },

    updateCurrent: function(i) {
      const currentPage = this.$store.state.indexPagination;
      this.$refs.indexPage.children[currentPage].className = "waves-effect";
      this.$store.commit("setIndexPagination", i);
      this.$refs.indexPage.children[i].className = "active";
    }
  }
};
</script>