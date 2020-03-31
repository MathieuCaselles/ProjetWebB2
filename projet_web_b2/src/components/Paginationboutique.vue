<template>
        <li>
            <a href="#" @click.prevent="updateCurrent(page_index)">
            {{ page_index }}
            </a>
        </li>
</template>


<script>
export default {
  name: 'Paginationboutique',
  props: {
    page_index: Number,
  },
  computed: {
    current: Number
  },
  methods: {
        updateCurrent: function (i) {
          document.getElementById(this.current).className = "waves-effect"; 
          this.current = i
          document.getElementById(i).className = "active";
  },
}
}
</script>