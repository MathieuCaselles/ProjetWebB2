<template>
<div id='app'>
<div class="row">
    <Product
    v-for="(product, index) in products"
    v-bind:key="index"
    v-bind:productName= product.name
    v-bind:product= product
    v-show="setPaginate(index)"/>
</div>
<div id="pagination">
      <ul class="pagination center">
          <Paginationboutique
           class="waves-effect"
           v-for="page_index in paginate_total"
           v-bind:key="page_index"
           v-bind:id="page_index"
           v-bind:page_index="page_index"
           v-bind:current="current"
           />
      </ul>
    </div>
  </div>
</template>

<script>
import Product from "@/components/Product.vue";
import Paginationboutique from "@/components/Paginationboutique.vue";

export default {
  name: "Boutique",
  components: {
    Product,
    Paginationboutique
  },
  created() {
      this.paginate_total = Math.ceil(this.products.length/this.paginate);
      },
  data(){
      return {
        current: 1,
          products: [
            { name: 'Wolverine', universe: 'Marvel'},
            { name: 'Batman', universe: 'DC' },
            { name: 'Beast', universe: 'Marvel'},
            { name: 'Superman', universe: 'DC' },
            { name: 'Wonder Woman', universe: 'DC' },
            { name: 'Iceman', universe: 'Marvel'},
            { name: 'Black Panther', universe: 'Marvel'},
            { name: 'Beast Boy', universe: 'DC' },
            { name: 'Captain America', universe: 'Marvel'},
            { name: 'Hawkgirl', universe: 'DC' },
            { name: 'Cyclops', universe: 'Marvel'},
            { name: 'Green Lantern', universe: 'DC' },
            { name: 'Thor', universe: 'Marvel'},
            { name: 'Flash', universe: 'DC' },
            { name: 'Spider-man', universe: 'Marvel'},
            { name: 'Martian Manhunter', universe: 'DC' },
            { name: 'Nightwing', universe: 'DC' },
            { name: 'Raven', universe: 'DC' },
            { name: 'Hulk', universe: 'Marvel'},
            { name: 'Shehulk', universe: 'Marvel'}
        ],
        paginate: 3,
        paginate_total: 0,
        isOk: false
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
    }
  }
};
</script>